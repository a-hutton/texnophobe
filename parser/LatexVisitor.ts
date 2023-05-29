import {
  getDoubleLetter,
  getFancyChar,
  getGreekLetter,
  operators,
} from "./LatexOperators";
import {
  BracketsContext,
  CaseLineContext,
  MathBracketsContext,
  MathBracketsOpContext,
  MathCondFunctionContext,
  MathMatrixContext,
  MathNotContext,
  MathRawContext,
  MathRawTextContext,
  MathRootContext,
  MathScriptContext,
  MathSimpleOperatorContext,
  MathSingleSimpleOperatorContext,
  MathSplitContext,
  MathTokenContext,
  TokenLetterContext,
  TokenNegationContext,
  TokenNumberContext,
  TokenReservedWordContext,
  VectorChildContext,
  VectorLineContext,
} from "./generated/TexnophobeParser";
import NewMathVisitor from "./generated/TexnophobeVisitor";

export class LatexVisitor extends NewMathVisitor<string> {
  #currentBracketOpening: string = "";

  visitMathRaw = (ctx: MathRawContext) => {
    const fullText = ctx.getText();
    if (fullText.startsWith("$") && fullText.endsWith("$")) {
      return fullText.substring(1, fullText.length - 1) + " ";
    } else {
      return ctx.getText().substring(4, ctx.getText().length - 1) + " ";
    }
  };

  visitMathNot = (ctx: MathNotContext) => {
    return "\\overline{" + this.visit(ctx._child) + "}";
  };

  visitMathToken = (ctx: MathTokenContext) => {
    let res = "";
    for (const token of ctx.token_list()) {
      res += this.visit(token);
    }
    return res;
  };

  visitMathSimpleOperator = (ctx: MathSimpleOperatorContext) => {
    const first = this.visit(ctx._first);
    const last = this.visit(ctx._last);
    const operator = this.#getSimpleOperator(ctx._operator.text);
    return first + operator + last;
  };

  visitMathSingleSimpleOperator = (ctx: MathSingleSimpleOperatorContext) => {
    return this.#getSimpleOperator(ctx.getText());
  };

  visitMathRoot = (ctx: MathRootContext) => {
    let command = "\\sqrt";
    if (ctx._base != null) {
      command += `[${this.visit(ctx._base)}]`;
    }
    return command + "{" + this.visit(ctx._child) + "} ";
  };

  visitMathScript = (ctx: MathScriptContext) => {
    const firstToken = this.visit(ctx._firstOperand);
    const secondToken = this.visit(ctx._secondOperand);
    const operatorToken = ctx._operator.text;

    switch (operatorToken) {
      case "^":
        return `${firstToken}^{${secondToken}} `;
      case "_":
        return `${firstToken}_{${secondToken}} `;
      case "/":
        return `\\frac{${firstToken}}{${secondToken}} `;
      default:
        return `Error: '${ctx.getText()}' `;
    }
  };

  visitMathCondFunction = (ctx: MathCondFunctionContext) => {
    let command = "\n\\begin{cases}\n";
    for (const child of ctx.caseLine_list()) {
      command += this.visit(child);
    }
    command += "\\end{cases}\n";
    return command;
  };

  visitMathSplit = (ctx: MathSplitContext) => {
    return this.visit(ctx._first) + this.visit(ctx._last);
  };

  visitMathRawText = (ctx: MathRawTextContext) => {
    let verbatimText = ctx.getText().substring(1, ctx.getText().length - 1);
    verbatimText = verbatimText.replaceAll("{", "\\{");
    verbatimText = verbatimText.replaceAll("}", "\\}");
    return `\\text{${verbatimText}} `;
  };

  visitMathBracketsOp = (ctx: MathBracketsOpContext) => {
    return this.visit(ctx._operand) + this.visit(ctx.brackets());
  };

  visitMathBrackets = (ctx: MathBracketsContext) => {
    return this.visit(ctx._child);
  };

  visitMathMatrix = (ctx: MathMatrixContext) => {
    let children = "";
    for (const child of ctx.vectorLine_list()) {
      children += this.visit(child);
    }
    let command = "matrix";

    switch (this.#currentBracketOpening) {
      case "[":
        command = "bmatrix";
        break;
      case "(":
        command = "pmatrix";
        break;
      default:
        break;
    }
    return `\n\\begin{${command}}\n${children}\\end{${command}}\n`;
  };

  visitCaseLine = (ctx: CaseLineContext) => {
    return `${this.visit(ctx._content)}& ${this.visit(ctx._condition)} \\\\\n`;
  };

  visitBrackets = (ctx: BracketsContext) => {
    const opening = ctx._opening.text;
    let openingCommand: string;
    let closingCommand: string;
    switch (opening) {
      case "(":
        openingCommand = "\\left(";
        closingCommand = "\\right)";
        break;
      case "[":
        openingCommand = "\\left[";
        closingCommand = "\\right]";
        break;
      case "[[":
        // TODO make work with mathjax/obsidian and latex (stmaryrd double brackets)
        openingCommand = "\\textlbrackdbl ";
        closingCommand = "\\textrbrackdbl";
        break;
      case "{":
        openingCommand = "\\left\\{";
        closingCommand = "\\right\\}";
        break;
      case "<":
        openingCommand = "\\left\\langle ";
        closingCommand = "\\right\\rangle ";
        break;
      default:
        openingCommand = opening;
        closingCommand = opening;
    }
    let children = this.visit(ctx._first);
    for (const child of ctx.math_list()) {
      if (child === ctx._first) continue;
      children += `, ${this.visit(child)}`;
    }
    return `${openingCommand}${children}${closingCommand} `;
  };

  visitVectorLine = (ctx: VectorLineContext) => {
    let opening = ctx._opening.text;
    switch (opening) {
      case "(":
        this.#currentBracketOpening = "(";
        break;
      case "[":
        this.#currentBracketOpening = "[";
        break;
    }
    return this.visit(ctx.vectorChildren()) + "\\\\\n";
  };

  visitVectorChild = (ctx: VectorChildContext) => {
    let recursed = "  ";
    for (let i = 0; i < ctx.math_list().length; i++) {
      const child = ctx.math_list()[i];
      if (i !== 0) {
        recursed += "& ";
      }
      recursed += this.visit(child);
    }
    return recursed;
  };

  visitTokenReservedWord = (ctx: TokenReservedWordContext) => {
    const original = ctx.getText();
    let word = `\\${original}`;
    if (
      original === "if" ||
      original === "else" ||
      original === "then" ||
      original === "otherwise"
    ) {
      word = `text{${original} }`;
    }

    return `\\${word} `;
  };

  visitTokenLetter = (ctx: TokenLetterContext) => {
    const letter = ctx.getText();
    // if single char, or single char and a -
    if (letter.length == 1) {
      return letter + " ";
    }
    if (letter[0] === "|") {
      return getDoubleLetter(letter.substring(1)) + " ";
    } else if (letter[0] === "~") {
      return getFancyChar(letter.substring(1)) + " ";
    } else {
      return getGreekLetter(letter) + " ";
    }
  };

  visitTokenNumber = (ctx: TokenNumberContext) => {
    return ctx.getText() + " ";
  };

  visitTokenNegation = (ctx: TokenNegationContext) => {
    return `-${this.visit(ctx.token())}`;
  };

  visitTokenPrime = () => {
    return "^{\\prime} ";
  };

  #getSimpleOperator(input: string): string {
    if (input.length === 1 && input !== "\\") {
      return input + " ";
    } else {
      return operators[input] + " " ?? `Error: '${input}'`;
    }
  }
}
