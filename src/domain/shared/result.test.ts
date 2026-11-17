import { describe, expect, it } from "vitest";
import { err, ok, type Result } from "./result";

function parsePositive(input: number): Result<number, "not_positive"> {
  return input > 0 ? ok(input) : err("not_positive");
}

describe("Result", () => {
  it("carries the value on success", () => {
    const result = parsePositive(3);
    expect(result).toEqual({ ok: true, value: 3 });
  });

  it("carries the error on failure", () => {
    const result = parsePositive(-1);
    expect(result).toEqual({ ok: false, error: "not_positive" });
  });

  it("narrows by the `ok` discriminant", () => {
    const result = parsePositive(5);
    if (!result.ok) throw new Error("expected success");
    // After narrowing, `value` is typed as number — no cast needed.
    expect(result.value + 1).toBe(6);
  });
});
