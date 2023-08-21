import { ConfigProgrammatic } from "@oruga-ui/oruga-next";

export function getDefault<T>(path: string, defaultValue: T): T {
  return getValueByPath(getOptions(), path, defaultValue);
}

export const getOptions = ConfigProgrammatic.getOptions;

/**
 * Get value of an object property/path even if it's nested
 */
export function getValueByPath<T>(obj: any, path: string, defaultValue: T): T {
  const value = path
    .split(".")
    .reduce(
      (o: any, i: string) => (typeof o !== "undefined" ? o[i] : undefined),
      obj,
    );
  return typeof value !== "undefined" ? value : defaultValue;
}
