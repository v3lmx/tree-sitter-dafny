; SPDX-FileCopyrightText: 2026 Oscar Bender-Stone <oscar-bender-stone@protonmail.com>
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
  "const"
  "import"
  "opened"
  "var"
  "refines"
  "extends"
  "abstract"
  "ghost"
  "static"
  "opaque"
  "provides"
  "reveals"
] @keyword

;; Named keyword nodes (defined as named rules in grammar.js)
(kwd_export) @keyword
(kwd_provides) @keyword
(kwd_reveals) @keyword

[
  "method"
  "function"
  "predicate"
  "lemma"
  "constructor"
  "twostate function"
  "twostate predicate"
  "least predicate"
  "greatest predicate"
  "least lemma"
  "greatest lemma"
] @keyword.function

[
  "if"
  "then"
  "else"
  "match"
  "case"
] @keyword.conditional

[
  "while"
  "for"
  "to"
  "downto"
  "break"
  "continue"
] @keyword.repeat

[
  "return"
  "yield"
  "returns"
  "yields"
] @keyword.return

[
  "requires"
  "ensures"
  "modifies"
  "reads"
  "decreases"
  "invariant"
] @keyword.modifier

;; witness is a named node (kwd_witness) in the grammar
(kwd_witness) @keyword.modifier

[
  "assert"
  "assume"
  "expect"
  "reveal"
  "calc"
  "modify"
  "label"
  "print"
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
  "in"
  "!in"
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
  ":=" ":|" "::" "!!" ":-"
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
(type_synonym (identifier) @type.definition)
(class_definition (identifier) @type)
(trait_definition (identifier) @type)
(datatype_definition (identifier) @type)
(datatype_constructor (identifier) @constructor)
(newtype_definition (identifier) @type)

;; Identifiers
(module_definition (identifier) @module)
(import_declaration (identifier) @module)
(qualified_name (identifier) @module)

(method_definition (identifier) @function.method)
(function_definition (identifier) @function)
(lemma_definition (identifier) @function)
(iterator_definition (identifier) @function)

(call_expression (_) @function.call
  (#match? @function.call "^[a-zA-Z]"))
(member_expression "." (identifier) @property)

(const_definition (identifier) @constant)
(var_decl (identifier) @variable)
(formal_parameter (identifier) @variable.parameter)

;; Attributes
(attributes (identifier) @attribute)

;; Literals
(number) @number
(string) @string
(char) @character
(boolean) @boolean
(null_literal) @constant.builtin
(this_literal) @variable.builtin

;; Comments
(comment) @comment
