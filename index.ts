import { CharStream, CommonTokenStream } from "antlr4";
import TexnophobeLexer from "./parser/generated/TexnophobeLexer.js";
import TexnophobeParser from "./parser/generated/TexnophobeParser.js";
import { LatexVisitor } from "./parser/LatexVisitor.js";
import { generateLatex } from "./generator.js";

const input = `x := (-b +- _/(b^2-4ac))/(2a)`;
const result = generateLatex(input);

console.log(result);
