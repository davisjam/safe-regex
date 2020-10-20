// TypeScript Version: 3.5.2

interface Options {
  limit: number;
}

declare function safeRegex<T>(regex: RegExp | string | T, options?: Options): boolean;

export = safeRegex;
