/**
 * Sync GitHub issue labels from scripts/github-labels.json to the remote repo.
 * Idempotent — safe to re-run. Requires gh CLI (authenticated).
 *
 * Usage:
 *   node scripts/sync-github-labels.mjs
 *   node scripts/sync-github-labels.mjs --dry-run
 *   node scripts/sync-github-labels.mjs --repo owner/name
 */
import { execSync, spawnSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const configPath = join(root, 'scripts/github-labels.json');

const args = process.argv.slice(2);
const dryRun = args.includes('--dry-run');
const repoArgIndex = args.indexOf('--repo');
const repoOverride = repoArgIndex !== -1 ? args[repoArgIndex + 1] : null;

function run(command, { ignoreError = false } = {}) {
  if (dryRun) {
    console.log(`[dry-run] ${command}`);
    return { status: 0, stdout: '', stderr: '' };
  }
  const result = spawnSync(command, {
    shell: true,
    encoding: 'utf8',
    stdio: ['ignore', 'pipe', 'pipe'],
  });
  if (result.status !== 0 && !ignoreError) {
    const err = result.stderr?.trim() || result.stdout?.trim() || `exit ${result.status}`;
    throw new Error(`${command}\n  → ${err}`);
  }
  return result;
}

function ghAvailable() {
  try {
    execSync('gh --version', { stdio: 'ignore' });
    return true;
  } catch {
    return false;
  }
}

function resolveRepo() {
  if (repoOverride) return repoOverride;
  if (process.env.GITHUB_REPO) return process.env.GITHUB_REPO;

  const remote = execSync('git remote get-url origin', {
    cwd: root,
    encoding: 'utf8',
  }).trim();

  const match = remote.match(/github\.com[:/]([^/]+)\/([^/.]+)/);
  if (!match) {
    throw new Error(
      'Could not parse owner/repo from git remote. Use --repo owner/name or set GITHUB_REPO.',
    );
  }
  return `${match[1]}/${match[2]}`;
}

function labelExists(repo, name) {
  const result = run(`gh label list --repo "${repo}" --limit 200`, { ignoreError: true });
  if (result.status !== 0) return false;
  const lines = (result.stdout || '').split('\n');
  return lines.some((line) => line.startsWith(`${name}\t`) || line.startsWith(`${name} `));
}

function shellEscape(value) {
  return `'${value.replace(/'/g, `'\\''`)}'`;
}

function main() {
  if (!ghAvailable()) {
    console.error('Error: gh CLI is not installed. Install from https://cli.github.com/');
    process.exit(1);
  }

  try {
    run('gh auth status');
  } catch {
    console.error('Error: gh is not authenticated. Run: gh auth login');
    process.exit(1);
  }

  const repo = resolveRepo();
  const config = JSON.parse(readFileSync(configPath, 'utf8'));
  const summary = { synced: 0, renamed: 0, removed: 0, skipped: 0, errors: [] };

  console.log(`Syncing labels to ${repo}${dryRun ? ' (dry-run)' : ''}…\n`);

  for (const { from, to } of config.renames ?? []) {
    try {
      if (!labelExists(repo, from)) {
        console.log(`  rename: skip "${from}" (not found)`);
        summary.skipped++;
        continue;
      }
      if (labelExists(repo, to)) {
        console.log(`  rename: skip "${from}" → "${to}" (target already exists)`);
        summary.skipped++;
        continue;
      }
      run(
        `gh api -X PATCH "repos/${repo}/labels/${encodeURIComponent(from)}" -f new_name="${to.replace(/"/g, '\\"')}"`,
      );
      console.log(`  renamed: "${from}" → "${to}"`);
      summary.renamed++;
    } catch (err) {
      summary.errors.push(`rename ${from}→${to}: ${err.message}`);
      console.error(`  rename failed: "${from}" → "${to}": ${err.message}`);
    }
  }

  for (const label of config.labels) {
    const { name, color, description } = label;
    try {
      run(
        `gh label create ${shellEscape(name)} --repo "${repo}" --color "${color}" --description ${shellEscape(description)} --force`,
      );
      console.log(`  synced: ${name}`);
      summary.synced++;
    } catch (err) {
      summary.errors.push(`sync ${name}: ${err.message}`);
      console.error(`  sync failed: ${name}: ${err.message}`);
    }
  }

  for (const name of config.remove ?? []) {
    try {
      if (!labelExists(repo, name)) {
        console.log(`  remove: skip "${name}" (not found)`);
        summary.skipped++;
        continue;
      }
      run(`gh label delete ${shellEscape(name)} --repo "${repo}" --yes`);
      console.log(`  removed: ${name}`);
      summary.removed++;
    } catch (err) {
      summary.errors.push(`remove ${name}: ${err.message}`);
      console.error(`  remove failed: ${name}: ${err.message}`);
    }
  }

  console.log('\n--- Summary ---');
  console.log(`  Synced:  ${summary.synced}`);
  console.log(`  Renamed: ${summary.renamed}`);
  console.log(`  Removed: ${summary.removed}`);
  console.log(`  Skipped: ${summary.skipped}`);
  if (summary.errors.length) {
    console.log(`  Errors:  ${summary.errors.length}`);
    process.exit(1);
  }
  console.log('\nDone.');
}

main();
