import * as assert from "assert";
import { generateLatex } from "../generator";

describe("Latex Generation", () => {
  it("can do basic fractions", () => {
    const original = "x := x+1/x-2";
    const expected = "x \\coloneqq \\frac{x + 1 }{x -2 } ";
    const actual = generateLatex(original);
    assert.equal(actual, expected);
  });
  it("can do the quadratic formula", () => {
    const original = "x := (-b +- _/(b^2 -4ac))/(2a)";
    const expected =
      "x \\coloneqq \\frac{-b \\pm \\sqrt{b ^{2 } -4 a c } }{2 a } ";
    const actual = generateLatex(original);
    assert.equal(actual, expected);
  });
  it("can do my semantics notes", () => {
    const original = `(~B[[b]] sigma = "false")/(("if b then " c_1 " else " c_2 " fi", sigma) -> (c_2, sigma))`;
    const expected = `\\frac{\\mathcal{B} \\textlbrackdbl b \\textrbrackdbl \\sigma = \\text{false} }{\\left(\\text{if b then } c _{1 } \\text{ else } c _{2 } \\text{ fi} , \\sigma \\right) \\to \\left(c _{2 } , \\sigma \\right) } `;
    const actual = generateLatex(original);
    assert.equal(actual, expected);
  });
  it("works with matrices", () => {
    const original = `X = (1  0  0)
    (0  1  0)
    (0  0  1)`;
    const expected = `X = 
\\begin{pmatrix}
  1 & 0 & 0 \\\\
  0 & 1 & 0 \\\\
  0 & 0 & 1 \\\\
\\end{pmatrix}
`;
    const actual = generateLatex(original);
    assert.equal(actual, expected);
  });
  it("doesn't mess up brackets", () => {
    const original = `(A && B) = ¬A || ¬B`;
    const expected = `\\left(A \\land B \\right) = \\overline{A }\\lor \\overline{B }`;
    const actual = generateLatex(original);
    assert.equal(actual, expected);
  });
  it("can do case functions", () => {
    const original = `f(x) = { 1/x    | if x >= 1
       { 0      | if x = 0
       { -1     | if x <= -1`;
    const expected = `f \\left(x \\right) = 
\\begin{cases}
\\frac{1 }{x } & \\text{if } x \\geq 1  \\\\
0 & \\text{if } x = 0  \\\\
-1 & \\text{if } x \\leq -1  \\\\
\\end{cases}\n`;
    const actual = generateLatex(original);
    assert.equal(actual, expected);
  });
});
