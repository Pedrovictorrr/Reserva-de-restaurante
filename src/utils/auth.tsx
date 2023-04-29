

export function isAuthenticated(token: string | undefined): boolean {
  return !!token;
}