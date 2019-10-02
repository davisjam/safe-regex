// TypeScript Version: 3.5.2

interface Options {
  limit: number;
}

declare function safeRegex<T>(regex: RegExp, opts?: Options | T): void;

export = safeRegex;
