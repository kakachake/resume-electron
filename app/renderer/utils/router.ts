import { compile } from 'path-to-regexp';

export function compilePath(
  route: string,
  params?: {
    [key: string]: string;
  }
) {
  const toPath = compile(route, { encode: encodeURIComponent });
  return toPath(params);
}

export function isHttpOrHttps(link: string): boolean {
  return /^https?:\/\//.test(link.toLowerCase());
}
