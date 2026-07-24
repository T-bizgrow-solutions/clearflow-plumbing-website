/**
 * Create a Linear project for ClearFlow Plumbing Website.
 *
 * Requires in .env.local:
 *   LINEAR_API_KEY=lin_api_...
 *   LINEAR_TEAM_ID=...  (optional — uses first team if omitted)
 *   LINEAR_PROJECT_NAME=... (optional — default ClearFlow Plumbing Website)
 *
 * Usage:
 *   node scripts/create-linear-project.mjs teams
 *   node scripts/create-linear-project.mjs
 *   node scripts/create-linear-project.mjs create-project
 */

import { readFileSync } from 'node:fs';

const API_URL = 'https://api.linear.app/graphql';
const DEFAULT_PROJECT_NAME = 'ClearFlow Plumbing Website';

function loadEnvLocal() {
  try {
    const raw = readFileSync('.env.local', 'utf8');
    for (const line of raw.split('\n')) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) continue;
      const eq = trimmed.indexOf('=');
      if (eq === -1) continue;
      const key = trimmed.slice(0, eq).trim();
      const value = trimmed.slice(eq + 1).trim();
      if (process.env[key] === undefined) process.env[key] = value;
    }
  } catch {
    // .env.local optional if vars exported in shell
  }
}

async function linear(query, variables = {}) {
  const apiKey = process.env.LINEAR_API_KEY?.trim();
  if (!apiKey) {
    throw new Error('LINEAR_API_KEY is not set. Add it to .env.local (see .env.example).');
  }

  const res = await fetch(API_URL, {
    method: 'POST',
    headers: {
      Authorization: apiKey,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query, variables }),
  });

  const json = await res.json();
  if (json.errors?.length) {
    throw new Error(json.errors.map((e) => e.message).join('; '));
  }
  return json.data;
}

async function listTeams() {
  const data = await linear(`query { teams { nodes { id name key } } }`);
  return data.teams.nodes;
}

async function createProject(teamIds) {
  const name = process.env.LINEAR_PROJECT_NAME?.trim() || DEFAULT_PROJECT_NAME;
  const description = [
    'Marketing site for ClearFlow Plumbing & Maintenance (Sydney / NSW).',
    '',
    'Repo: https://github.com/T-bizgrow-solutions/clearflow-plumbing-website',
    'Stack: Vite, React, Vercel, n8n contact webhook, Sentry.',
  ].join('\n');

  const data = await linear(
    `mutation CreateProject($input: ProjectCreateInput!) {
      projectCreate(input: $input) {
        success
        project { id name url slugId }
      }
    }`,
    {
      input: {
        name,
        description,
        teamIds,
        color: '#009fe3',
      },
    },
  );

  return data.projectCreate;
}

async function main() {
  loadEnvLocal();

  const mode = process.argv[2];
  if (mode === 'teams') {
    const teams = await listTeams();
    if (!teams.length) {
      console.error('No teams found in your Linear workspace.');
      process.exit(1);
    }
    console.log('Linear teams:');
    for (const t of teams) {
      console.log(`  ${t.key.padEnd(8)} ${t.name}  (${t.id})`);
    }
    return;
  }

  if (mode && mode !== 'create-project') {
    console.error('Usage: node scripts/create-linear-project.mjs [teams|create-project]');
    process.exit(1);
  }

  let teamId = process.env.LINEAR_TEAM_ID?.trim();
  if (!teamId) {
    const teams = await listTeams();
    if (!teams.length) {
      console.error('No teams found.');
      process.exit(1);
    }
    if (teams.length > 1) {
      console.error('Multiple teams found. Set LINEAR_TEAM_ID in .env.local. Run: npm run linear:teams');
      for (const t of teams) {
        console.error(`  ${t.key} — ${t.name} — ${t.id}`);
      }
      process.exit(1);
    }
    teamId = teams[0].id;
    console.log(`Using team: ${teams[0].name} (${teams[0].key})`);
  }

  const result = await createProject([teamId]);
  if (!result.success || !result.project) {
    console.error('Failed to create project.');
    process.exit(1);
  }

  console.log('Created Linear project:');
  console.log(`  Name: ${result.project.name}`);
  console.log(`  URL:  ${result.project.url}`);
  console.log(`  ID:   ${result.project.id}`);
}

main().catch((err) => {
  console.error(err instanceof Error ? err.message : err);
  process.exit(1);
});
