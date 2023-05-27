import { CharStream, CommonTokenStream } from "antlr4";
import TexnophobeLexer from "./parser/generated/TexnophobeLexer.js";
import TexnophobeParser from "./parser/generated/TexnophobeParser.js";
import { LatexVisitor } from "./parser/LatexVisitor.js";

const inputMath = `x`;
const chars = new CharStream(inputMath);
const lexer = new TexnophobeLexer(chars);
const tokens = new CommonTokenStream(lexer);
const parser = new TexnophobeParser(tokens);
const tree = parser.start();
const visitor = new LatexVisitor();
const result = visitor.visit(tree)[0];

console.log(result);
