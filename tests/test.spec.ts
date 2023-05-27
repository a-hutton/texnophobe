import * as assert from "assert";
import { generateLatex } from "../generator";

describe("Latex Generation", () => {
  it("can do basic fractions", () => {
    const original = "x := x+1/x-2";
    const expected = "x \\coloneqq \\frac{x + 1 }{x -2 } ";
    const actual = generateLatex(original);
    assert.equal(expected, actual);
  });
  it("can do the quadratic formula", () => {
    const original = "x := (-b +- _/(b^2 -4ac))/(2a)";
    const expected =
      "x \\coloneqq \\frac{-b \\pm \\sqrt{b ^{2 } -4 a c } }{2 a } ";
    const actual = generateLatex(original);
    assert.equal(expected, actual);
  });
});
