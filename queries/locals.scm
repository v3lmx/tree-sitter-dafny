; SPDX-FileCopyrightText: 2026 Oscar Bender-Stone <oscar-bender-stone@protonmail.com>
; SPDX-License-Identifier: MIT

;; Scopes
(module_definition) @local.scope
(class_definition) @local.scope
(trait_definition) @local.scope
(method_definition) @local.scope
(function_definition) @local.scope
(lemma_definition) @local.scope
(iterator_definition) @local.scope
(block) @local.scope
(if_statement) @local.scope
(while_statement) @local.scope
(for_statement) @local.scope
(match_statement) @local.scope
(forall_statement) @local.scope
(quantifier_expression) @local.scope
(lambda_expression) @local.scope
(set_comprehension) @local.scope
(map_comprehension) @local.scope

;; Definitions
(var_decl (identifier) @local.definition)
(const_definition (identifier) @local.definition)
(formal_parameter (identifier) @local.definition)

;; References
(identifier) @local.reference
