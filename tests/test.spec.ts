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
  it("can do my semantics notes", () => {
    const original = `(~B[[b]] sigma = "false")/(("if b then " c_1 " else " c_2 " fi", sigma) -> (c_2, sigma))`;
    const expected = `\\frac{\\mathcal{B} \\textlbrackdbl b , b \\textrbrackdbl \\sigma = \\text{false} }{\\left(\\text{if b then } c _{1 } \\text{ else } c _{2 } \\text{ fi} , \\text{if b then } c _{1 } \\text{ else } c _{2 } \\text{ fi} , \\sigma \\right) \\to \\left(c _{2 } , c _{2 } , \\sigma \\right) } `;
    const actual = generateLatex(original);
    assert.equal(expected, actual);
  });
});
