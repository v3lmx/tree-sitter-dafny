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
  "opaque"
  "provides"
  "reveals"
  "twostate function"
  "twostate predicate"
  "least predicate"
  "greatest predicate"
  "least lemma"
  "greatest lemma"
] @keyword

;; Named keyword nodes (defined as named rules in grammar.js)
(kwd_export) @keyword
(kwd_provides) @keyword
(kwd_reveals) @keyword
(kwd_witness) @keyword

[
  "if"
  "then"
  "else"
  "while"
  "for"
  "to"
  "downto"
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
  "by"
  "into"
  "new"
  "old"
  "fresh"
  "unchanged"
  "as"
  "is"
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
  ":=" ":|" "::" "in" "!in" "!!" ":-"
  "->" "-->" "~>"
  ".."
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
(arrow_type ["->" "-->" "~>"] @type)
(generic_type (identifier) @type)
(qualified_type (identifier) @type)
(type_synonym (identifier) @type)
(class_definition (identifier) @type)
(trait_definition (identifier) @type)
(datatype_definition (identifier) @type)
(datatype_constructor (identifier) @constructor)
(newtype_definition (identifier) @type)

;; Identifiers
(module_definition (identifier) @namespace)
(import_declaration (identifier) @namespace)
(qualified_name (identifier) @namespace)

(method_definition (identifier) @function.method)
(function_definition (identifier) @function)
(lemma_definition (identifier) @function)
(iterator_definition (identifier) @function)

(call_expression (_) @function.call
  (#match? @function.call "^[a-zA-Z]"))
(member_expression "." (identifier) @variable.other.member)

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
