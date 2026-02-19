; SPDX-FileCopyrightText: 2026 Oscar Bender-Stone <oscar-bender-stone@protonmail.com>
; SPDX-License-Identifier: MIT

; Scopes
[
  (module_definition)
  (class_definition)
  (trait_definition)
  (datatype_definition)
  (method_definition)
  (function_definition)
  (lemma_definition)
  (iterator_definition)
] @local.scope

; Definitions
(method_definition
  (identifier) @local.definition.method)

(function_definition
  (identifier) @local.definition.function)

(lemma_definition
  (identifier) @local.definition.function)

(const_definition
  (identifier) @local.definition.constant)

(var_decl
  (identifier) @local.definition.var)

(formal_parameter
  (identifier) @local.definition.parameter)

; References
(identifier) @local.reference
