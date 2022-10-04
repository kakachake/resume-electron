export function isHttpOrHttps(link: string): boolean {
  return /^https?:\/\//.test(link.toLowerCase());
}
