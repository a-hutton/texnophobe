grammar Texnophobe;

start: math EOF;

math:
	'raw(' (.)*? ')'																		# mathRaw
	| '$' (.)*? '$'                                                                         # mathRaw
	| NEGATION child = math																	# mathNot
	| (token)+																				# mathToken
	| first = math operator = SIMPLEOPERATOR last = math									# mathSimpleOperator
	| SIMPLEOPERATOR																		# mathSingleSimpleOperator
	| '_/' base = token? '(' child = math ')'												# mathRoot
	| firstOperand = math operator = SCRIPTOPERATOR '(' secondOperand = math ')'			# mathScript
	| '(' firstOperand = math ')' operator = SCRIPTOPERATOR '(' secondOperand = math ')'	# mathScript
	| '(' firstOperand = math ')' operator = SCRIPTOPERATOR secondOperand = math			# mathScript
	| firstOperand = math operator = SCRIPTOPERATOR secondOperand = math					# mathScript
	| caseLine (BR caseLine)+																# mathCondFunction
	| first = math (WS | BR+) last = math													# mathSplit
	| '"' (.)*? '"'																			# mathRawText
	| operand = math brackets																# mathBracketsOp
	| child = brackets																		# mathBrackets
	| first = vectorLine ((BR | WS)* recurse = vectorLine)*									# mathMatrix;

caseLine:
	WS? '{' WS? content = math WS? '|' WS? condition = math;

brackets:
	opening = '(' first = math (',' WS? math)* closing = ')'
	| opening = '{' first = math (',' WS? math)* closing = '}'
	| opening = '[[' first = math (',' WS? math)* closing = ']]'
	| opening = '[' first = math (',' WS? math)* closing = ']'
	| opening = '<' first = math (',' WS? math)* closing = '>';

vectorLine:
	opening = '[' vectorChildren ']'
	| opening = '(' vectorChildren ')';

vectorChildren: (recurse = math '  ')* last = math # vectorChild;

token:
	word = WORDTOKEN	# tokenReservedWord
	| letter = LETTER	# tokenLetter
	| number = NUMBER	# tokenNumber
	| '-' token			# tokenNegation
	| PRIME				# tokenPrime;

LETTER: CAPITAL | LOWERCASE | SPECIALCHARACTER | GREEKLETTER;
CAPITAL: [A-Z];
LOWERCASE: [a-z];
NUMBER: (DIGIT | '.')+;
WS: [ \t]+;
BR: '\r\n' | '\n';
fragment DIGIT: [0-9];
NEGATION: [!¬];

// script operators are operators that affect the rendering of other tokens/parts of the maths
SCRIPTOPERATOR: '^' | '_' | '/';

SIMPLEOPERATOR:
	'+'
	| '-'
	| '*'
	| '%'
	| '='
	| '>'
	| '<'
	| ':'
	| '|'
	| REPLACEOPERATOR;

// simple operators that need replacing with a symbol
REPLACEOPERATOR: // assignment/equality:
	':='
	| NOT [=<>]
	| NOT? '>='
	| NOT? '<='
	| NOT? '=='
	// arrows:
	| '->'
	| '-->'
	| '=>'
	| '==>'
	| '<-'
	| '<--'
	| '<==' // FIXME - how to do <= as arrow not less than equal?
	| '<->'
	| '<=>'
	| '<-->'
	| '<==>'
	// logical operators:
	| '&&'
	| '||'
	// sets:
	| '{}'
	| '{&'
	| '{|'
	| 'in'
	| '\\'
	| '//'
	| NOT? '{<'
	| NOT? ('{>' | '>}')
	| NOT? '{<='
	| NOT? ('{>=' | '>=}')
	// misc:
	| '+-'
	| 'forall'
	| 'exists'
	| '|-'
	| '|=';

fragment NOT: [!/];

WORDTOKEN:
	'if'
	| 'then'
	| 'else'
	| 'otherwise'
	| 'min'
	| 'max'
	| 'sin'
	| 'cos';

SPECIALCHARACTER: '|' CAPITAL | '~' (CAPITAL | LOWERCASE);

SEMI: ';';
PRIME: '\'';

GREEKLETTER:
	[aA]'lpha'
	| [bB]'eta'
	| [gG]'amma'
	| [dD]'elta'
	| [eE]'psilon'
	| [zZ]'eta'
	| [eE]'ta'
	| [tT]'heta'
	| [iI]'ota'
	| [kK]'appa'
	| [lL]'ambda'
	| [mM]'u'
	| [nN]'u'
	| [xX]'i'
	| [oO]'micron'
	| [pP]'i'
	| [rR]'ho'
	| [sS]'igma'
	| [tT]'au'
	| [uU]'psilon'
	| [pP]'hi'
	| [cC]'hi'
	| [pP]'si'
	| [oO]'mega';
