export function normalizePath(pathname: string) {
  const path = pathname.replace(/\/$/, '');
  return path === '' ? '/' : path;
}

export function isActiveNavPath(currentPath: string, matchPath?: string) {
  if (!matchPath) return false;
  if (matchPath === '/') return currentPath === '/';
  return currentPath === matchPath || currentPath.startsWith(`${matchPath}/`);
}
