; SPDX-FileCopyrightText: 2026 Oscar Bender-Stone <oscar-bender-stone@protonmail.com>
; SPDX-FileContributor: Gemini (Google) 
; SPDX-License-Identifier: MIT

;; Keywords
[
  "module"
  "class"
  "trait"
  "datatype"
  "codatatype"
  "newtype"
  "type"
  "iterator"
  "method"
  "function"
  "predicate"
  "lemma"
  "constructor"
  "const"
  "import"
  "opened"
  "var"
  "refines"
  "extends"
  "returns"
  "yields"
  "abstract"
  "static"
  "ghost"
  "witness"
  "export"
  "provides"
  "reveals"
] @keyword

[
  "if"
  "then"
  "else"
  "while"
  "match"
  "case"
  "break"
  "continue"
  "return"
  "yield"
  "print"
] @keyword.control

[
  "requires"
  "ensures"
  "modifies"
  "reads"
  "decreases"
  "invariant"
] @keyword.function

[
  "assert"
  "assume"
  "expect"
  "reveal"
  "calc"
  "modify"
  "label"
] @keyword

[
  "forall"
  "exists"
  "set"
  "iset"
  "map"
  "imap"
  "seq"
  "multiset"
] @keyword.operator

;; Operators
[
  "==" "!=" "<" "<=" ">" ">="
  "&&" "||" "==>" "<==" "<==>"
  "+" "-" "*" "/" "%"
  ":=" ":|" "::" "in" "!in" "!!"
] @operator

;; Punctuation
[
  ";"
  ","
  "."
  ":"
  "|"
  "="
  "=>"
] @punctuation.delimiter

[
  "(" ")"
  "{" "}"
  "[" "]"
  "<" ">"
] @punctuation.bracket

;; Types
(primitive_type) @type.builtin
(collection_type) @type.builtin
(tuple_type) @type
(type_synonym (identifier) @type)
(class_definition (identifier) @type)
(trait_definition (identifier) @type)
(datatype_definition (identifier) @type)
(datatype_constructor (identifier) @constructor)
(newtype_definition (identifier) @type)

;; Identifiers
(module_definition (identifier) @namespace)
(import_declaration (identifier) @namespace)

(method_definition (identifier) @function.method)
(function_definition (identifier) @function)
(lemma_definition (identifier) @function)
(iterator_definition (identifier) @function)

(call_expression (identifier) @function.call)

(const_definition (identifier) @constant)
(var_decl (identifier) @variable)
(formal_parameter (identifier) @variable.parameter)

;; Attributes
(attributes (identifier) @attribute)

;; Literals
(number) @constant.numeric
(string) @string
(char) @string.special
(boolean) @constant.builtin
(null_literal) @constant.builtin
(this_literal) @variable.builtin

;; Comments
(comment) @comment
