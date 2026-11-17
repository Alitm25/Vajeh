/**
 * A value that is either a success (`ok: true`) or an expected failure (`ok: false`).
 *
 * Domain functions return `Result` for failures the caller is expected to handle
 * (invalid file, forbidden transition). Truly unexpected bugs still throw.
 */
export type Result<T, E> =
  { readonly ok: true; readonly value: T } | { readonly ok: false; readonly error: E };

export function ok<T>(value: T): Result<T, never> {
  return { ok: true, value };
}

export function err<E>(error: E): Result<never, E> {
  return { ok: false, error };
}
