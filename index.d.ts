interface Options {
  limit: number;
}

declare function safeRegex<T>(regex: RegExp, opts?: Options | T): void;

export = safeRegex;
