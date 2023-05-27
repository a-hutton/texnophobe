export const operators: { [key: string]: string } = {
  "||": "\\lor",
  "<=": "\\leq",
  "!==": "\\not\\equiv",
  "!{<": "\\not\\subset",
  "!{>": "\\not\\supset",
  "{&": "\\cap",
  "/==": "\\not\\equiv",
  "/{<": "\\not\\subset",
  "/{>": "\\not\\supset",
  "/>=}": "\\not\\supseteq",
  "-->": "\\longrightarrow",
  "==>": "\\Longrightarrow",
  ">=}": "\\supseteq",
  "!>=": "\\ngeq",
  "==": "\\equiv",
  "=>": "\\Rightarrow",
  "{<": "\\subset",
  "{>": "\\supset",
  in: "\\in",
  "!{>=": "\\not\\supseteq",
  "/>=": "\\ngeq",
  "->": "\\to",
  "|-": "\\vdash",
  "/{<=": "\\not\\subseteq",
  "!<": "\\nltr",
  "!=": "\\neq",
  "<": "\\lt",
  "!>": "\\ngtr",
  "{<=": "\\subseteq",
  ">": "\\gt",
  ">=": "\\geq",
  "&&": "\\land",
  "|=": "\\vDash",
  ":=": "\\coloneqq",
  "!>=}": "\\not\\supseteq",
  "<--": "\\longleftarrow",
  "<==": "\\Longleftarrow",
  "\\": "\\setminus",
  "<=>": "\\Leftrightarrow",
  "//": "/",
  "!>}": "\\not\\supset",
  "{|": "\\cup",
  "!<=": "\\nleq",
  "{}": "\\emptyset",
  "+-": "\\pm",
  forall: "\\forall",
  "!{<=": "\\not\\subseteq",
  "/<": "\\nltr",
  "<->": "\\leftrightarrow",
  "/=": "\\neq",
  "/>}": "\\not\\supset",
  "/>": "\\ngtr",
  "/<=": "\\nleq",
  "<-": "\\gets",
  "<-->": "\\longleftrightarrow",
  exists: "\\exists",
  "{>=": "\\supseteq",
  "/{>=": "\\not\\supseteq",
  "<==>": "\\Longleftrightarrow",
  ">}": "\\supset",
};

export function getFancyChar(letter: String) {
  return "\\mathcal{" + letter + "}";
}

export function getDoubleLetter(letter: String) {
  return "\\mathbb{" + letter + "}";
}

export function getGreekLetter(letter: String) {
  if (letter === "phi") letter = "varphi"; // use the better, more consistent one
  return "\\" + letter;
}
