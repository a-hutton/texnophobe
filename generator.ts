import { CharStream, CommonTokenStream } from "antlr4";
import TexnophobeLexer from "./parser/generated/TexnophobeLexer";
import TexnophobeParser from "./parser/generated/TexnophobeParser";
import { LatexVisitor } from "./parser/LatexVisitor";

export function generateLatex(original: string): string {
  const chars = new CharStream(original);
  const lexer = new TexnophobeLexer(chars);
  const tokens = new CommonTokenStream(lexer);
  const parser = new TexnophobeParser(tokens);
  const tree = parser.start();
  const visitor = new LatexVisitor();
  const result = visitor.visit(tree)[0];
  return result;
}
