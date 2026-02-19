// SPDX-FileCopyrightText: 2026 Oscar Bender-Stone <oscar-bender-stone@protonmail.com>
// SPDX-FileContributor: Gemini (Google) 
// SPDX-License-Identifier: MIT

/**
 * @file Unofficial tree-sitter grammar for the Dafny language.
 * @author Oscar Bender-Stone <oscar-bender-stone@protonmail.com>
 * @license MIT
 */

export default grammar({
  name: 'dafny',

  extras: $ => [
    /\s/,
    $.comment,
  ],

  conflicts: $ => [
    [$._type, $._primary_expression], 
    [$._assignment_lhs, $._primary_expression], 
    [$.block, $.set_display], 
    [$.formal_parameter, $.tuple_type], 
    [$.match_statement, $.match_expression] 
  ],

  word: $ => $.identifier,

  rules: {
    source_file: $ => repeat($._definition),

    _definition: $ => choice(
      $.module_definition,
      $.class_definition,
      $.trait_definition,
      $.datatype_definition,
      $.newtype_definition,
      $.type_synonym,
      $.iterator_definition,
      $.method_definition,
      $.function_definition,
      $.lemma_definition,
      $.const_definition,
      $.import_declaration,
      $.export_declaration
    ),

    // --- Keywords as Nodes (Fixes Highlighting) ---
    // Defining these as alias rules ensures they can be targeted if anonymous strings fail
    kwd_export: $ => 'export',
    kwd_provides: $ => 'provides',
    kwd_reveals: $ => 'reveals',
    kwd_witness: $ => 'witness',
    
    // Modifiers
    _modifiers: $ => repeat1(choice('ghost', 'static', 'opaque')),

    // --- High Level Declarations ---

    module_definition: $ => seq(
      optional('abstract'),
      'module',
      optional($.attributes),
      $.identifier,
      optional(seq('refines', $.identifier)),
      '{',
      repeat($._definition),
      '}'
    ),

    export_declaration: $ => seq(
      $.kwd_export,
      optional($.identifier), 
      repeat(seq(choice($.kwd_provides, $.kwd_reveals), sep1($.identifier, ',')))
    ),

    class_definition: $ => seq(
      'class',
      optional($.attributes),
      $.identifier,
      optional($.type_parameters),
      optional(seq('extends', sep1($._type, ','))),
      '{',
      repeat($._class_member),
      '}'
    ),

    trait_definition: $ => seq(
      'trait',
      optional($.attributes),
      $.identifier,
      optional($.type_parameters),
      optional(seq('extends', sep1($._type, ','))),
      '{',
      repeat($._class_member),
      '}'
    ),

    _class_member: $ => choice(
      $.method_definition,
      $.function_definition,
      $.const_definition,
      $.var_decl
    ),

    datatype_definition: $ => seq(
      choice('datatype', 'codatatype'),
      optional($.attributes),
      $.identifier,
      optional($.type_parameters),
      '=',
      sep1($.datatype_constructor, '|')
    ),

    datatype_constructor: $ => seq(
      optional($.attributes),
      $.identifier,
      optional($.parameters)
    ),

    newtype_definition: $ => seq(
      'newtype',
      optional($.attributes),
      $.identifier,
      '=',
      choice(
        $.identifier,
        seq($.identifier, '|', $._expression)
      )
    ),

    type_synonym: $ => seq(
      'type',
      optional($.attributes),
      $.identifier,
      optional($.type_parameters),
      optional(seq('=', $._type)),
      repeat($.verification_clause)
    ),

    iterator_definition: $ => seq(
      'iterator',
      optional($.attributes),
      $.identifier,
      optional($.type_parameters),
      $.parameters,
      optional($.yields_clause),
      repeat($.verification_clause),
      $.block
    ),

    method_definition: $ => seq(
      optional($._modifiers),
      choice('method', 'constructor'),
      optional($.attributes),
      $.identifier,
      optional($.type_parameters),
      $.parameters,
      optional($.returns_clause),
      repeat($.verification_clause),
      choice($.block, ';')
    ),

    function_definition: $ => seq(
      optional($._modifiers),
      choice('function', 'predicate', 'twostate function', 'twostate predicate', 'least predicate', 'greatest predicate'),
      optional($.attributes),
      $.identifier,
      optional($.type_parameters),
      $.parameters,
      optional(seq(':', $._type)),
      repeat($.verification_clause),
      choice($.block, ';')
    ),

    lemma_definition: $ => seq(
      optional($._modifiers),
      choice('lemma', 'least lemma', 'greatest lemma'),
      optional($.attributes),
      $.identifier,
      optional($.type_parameters),
      $.parameters,
      optional($.returns_clause),
      repeat($.verification_clause),
      $.block
    ),

    const_definition: $ => seq(
      optional($._modifiers),
      'const',
      optional($.attributes),
      $.identifier,
      optional(seq(':', $._type)),
      optional(seq(
        choice(':=', ':|'), 
        $._expression,
        optional(seq($.kwd_witness, $._expression))
      )),
      optional(';')
    ),

    import_declaration: $ => seq(
      'import',
      optional('opened'),
      choice(
        $.identifier,
        seq($.identifier, '=', $.identifier)
      )
    ),

    // --- Clauses & Parameters ---

    type_parameters: $ => seq('<', sep1($.identifier, ','), '>'),

    parameters: $ => seq('(', sep($.formal_parameter, ','), ')'),
    
    formal_parameter: $ => seq(
        optional('ghost'),
        optional(seq($.identifier, ':')), 
        $._type
    ),

    returns_clause: $ => seq('returns', '(', sep($.formal_parameter, ','), ')'),
    
    yields_clause: $ => seq('yields', '(', sep($.formal_parameter, ','), ')'),

    verification_clause: $ => seq(
      choice('requires', 'ensures', 'modifies', 'reads', 'decreases', 'invariant', 'reveals', 'provides'),
      $._expression
    ),

    attributes: $ => repeat1(choice(
        seq('{:', $.identifier, optional(sep1($._expression, ',')), '}'), 
        seq('@', $.identifier, optional(seq('(', sep($._expression, ','), ')')))
    )),

    // --- Statements ---

    block: $ => seq('{', repeat($._statement), '}'),

    _statement: $ => choice(
      $.block,
      $.var_decl,
      $.assignment,
      $.labeled_statement,
      $.if_statement,
      $.while_statement,
      $.match_statement,
      $.assert_statement,
      $.assume_statement,
      $.expect_statement,
      $.reveal_statement,
      $.calc_statement,
      $.modify_statement,
      $.print_statement,
      $.return_statement,
      $.yield_statement,
      $.break_statement,
      $.continue_statement,
      $.forall_statement,
      $._expression_statement
    ),

    labeled_statement: $ => seq('label', $.identifier, ':', $._statement),

    var_decl: $ => seq(
      optional('ghost'),
      'var',
      sep1($.identifier, ','),
      optional(seq(':', $._type)),
      optional(seq(
        choice(':=', ':|'), 
        $._expression,
        optional(seq($.kwd_witness, $._expression))
      )),
      optional(';')
    ),

    assignment: $ => seq(
      sep1($._assignment_lhs, ','),
      choice(':=', ':|'),
      sep1($._expression, ','),
      optional(';')
    ),

    _assignment_lhs: $ => choice(
        $.identifier,
        seq($._primary_expression, '.', $.identifier),
        seq($._primary_expression, '[', sep1($._expression, ','), ']')
    ),

    if_statement: $ => seq(
        'if',
        choice($._expression, seq($.identifier, choice(':', ':|'), $._expression)), 
        $.block,
        optional(seq('else', choice($.block, $.if_statement)))
    ),

    while_statement: $ => seq(
      'while',
      $._expression,
      repeat($.verification_clause),
      $.block
    ),

    match_statement: $ => seq(
      'match', $._expression,
      optional(seq('into', $.identifier)),
      '{',
      repeat($.case_clause),
      '}'
    ),

    case_clause: $ => seq(
        'case', 
        choice($.identifier, seq($.identifier, '(', sep($.identifier, ','), ')')), 
        '=>', 
        repeat($._statement)
    ),

    assert_statement: $ => seq('assert', optional(seq($.identifier, ':')), $._expression, ';'),
    assume_statement: $ => seq('assume', optional(seq($.identifier, ':')), $._expression, ';'),
    expect_statement: $ => seq('expect', $._expression, optional(seq(',', $._expression)), ';'),
    reveal_statement: $ => seq('reveal', sep1($._expression, ','), ';'),

    print_statement: $ => seq('print', sep($._expression, ','), ';'),
    return_statement: $ => seq('return', optional(sep($._expression, ',')), ';'),
    yield_statement: $ => seq('yield', optional(sep($._expression, ',')), ';'),
    break_statement: $ => seq('break', optional($.identifier), ';'),
    continue_statement: $ => seq('continue', optional($.identifier), ';'),

    modify_statement: $ => seq('modify', sep1($._expression, ','), optional($.block), ';'),

    calc_statement: $ => seq(
        'calc',
        optional($.calc_op),
        '{',
        $._expression, 
        repeat($.calc_step),
        '}',
        ';'
    ),

    calc_op: $ => choice('==', '<', '>', '<=', '>='),
    
    calc_step: $ => seq(
      $.calc_op,
      optional($.block), // Hint block
      $._expression
    ),

    forall_statement: $ => seq(
        'forall',
        sep1($.formal_parameter, ','),
        optional(seq('|', $._expression)),
        repeat($.verification_clause),
        $.block
    ),

    _expression_statement: $ => seq($._expression, ';'),

    // --- Expressions ---

    _expression: $ => choice(
      $._primary_expression,
      $.binary_expression,
      $.unary_expression,
      $.quantifier_expression,
      $.set_comprehension,
      $.map_comprehension,
      $.if_expression,
      $.match_expression,
      $.lambda_expression,
      $.tuple_expression
    ),

    _primary_expression: $ => choice(
      $.identifier,
      $.number,
      $.string,
      $.char,
      $.boolean,
      $.null_literal,
      $.this_literal,
      $.call_expression,
      $.seq_display,
      $.set_display,
      $.map_display,
      seq('(', $._expression, ')'),
      seq('(', ')') // Unit
    ),

    tuple_expression: $ => seq(
        '(', $._expression, ',', sep1($._expression, ','), ')'
    ),

    binary_expression: $ => choice(
      prec.left(1, seq($._expression, '<==>', $._expression)),
      prec.right(2, seq($._expression, '==>', $._expression)),
      prec.left(2, seq($._expression, '<==', $._expression)),
      prec.left(3, seq($._expression, '||', $._expression)),
      prec.left(4, seq($._expression, '&&', $._expression)),
      prec.left(5, choice(
        seq($._expression, '==', $._expression),
        seq($._expression, '!=', $._expression),
        seq($._expression, '<', $._expression),
        seq($._expression, '<=', $._expression),
        seq($._expression, '>', $._expression),
        seq($._expression, '>=', $._expression),
        seq($._expression, 'in', $._expression),
        seq($._expression, '!in', $._expression),
        seq($._expression, '!!', $._expression) 
      )),
      prec.left(6, choice(
        seq($._expression, '+', $._expression),
        seq($._expression, '-', $._expression)
      )),
      prec.left(7, choice(
        seq($._expression, '*', $._expression),
        seq($._expression, '/', $._expression),
        seq($._expression, '%', $._expression)
      )),
    ),

    unary_expression: $ => prec(10, choice(
        seq('!', $._expression),
        seq('-', $._expression)
    )),

    quantifier_expression: $ => prec.right(seq(
      choice('forall', 'exists'),
      sep1($.formal_parameter, ','),
      '::',
      $._expression
    )),

    lambda_expression: $ => prec.right(seq(
        choice(
            seq('(', sep($.formal_parameter, ','), ')'),
            $.identifier
        ),
        '=>',
        $._expression
    )),

    if_expression: $ => prec.right(seq(
        'if', $._expression, 'then', $._expression, 'else', $._expression
    )),

    match_expression: $ => seq(
        'match', $._expression, '{',
        repeat(seq('case', $.identifier, optional(seq('(', sep($.identifier, ','), ')')), '=>', $._expression)),
        '}'
    ),

    set_comprehension: $ => prec.right(seq(
        choice('set', 'iset'),
        sep1($.formal_parameter, ','),
        '|',
        $._expression,
        optional(seq('::', $._expression))
    )),

    map_comprehension: $ => prec.right(seq(
        choice('map', 'imap'),
        sep1($.formal_parameter, ','),
        '|',
        $._expression,
        '::',
        $._expression
    )),

    seq_display: $ => seq('[', sep($._expression, ','), ']'),
    set_display: $ => seq('{', sep($._expression, ','), '}'),
    map_display: $ => seq(choice('map', 'imap'), '[', sep($.map_pair, ','), ']'),
    
    map_pair: $ => seq($._expression, ':=', $._expression),

    call_expression: $ => prec(11, seq(
        $.identifier, 
        optional(seq('<', sep1($._type, ','), '>')), 
        '(', sep($._expression, ','), ')'
    )),

    // --- Types ---
    _type: $ => choice(
        $.primitive_type,
        $.collection_type,
        $.identifier,
        $.tuple_type
    ),

    primitive_type: $ => choice(
        'int', 'bool', 'string', 'real', 'char', 'nat', 'object', 
        'ORDINAL',
        /bv\d+/
    ),

    collection_type: $ => choice(
        seq(choice('set', 'iset', 'multiset', 'seq'), '<', $._type, '>'),
        seq(choice('map', 'imap'), '<', $._type, ',', $._type, '>'),
        seq('array', optional(seq('<', $._type, '>'))),
        /array[2-9]\d*/
    ),
    
    tuple_type: $ => seq('(', sep1($._type, ','), ')'),

    // --- Primitives ---
    
    identifier: $ => /[a-zA-Z_?][a-zA-Z0-9_?']*/,
    
    number: $ => /\d+/,
    
    string: $ => choice(
      /"[^"\\\n]*(\\.[^"\\\n]*)*"/,
      /@"(""|[^"])*"/
    ),

    char: $ => /'[^']*'/,

    boolean: $ => choice('true', 'false'),
    null_literal: $ => 'null',
    this_literal: $ => 'this',

    comment: $ => token(choice(
      seq('//', /.*/),
      seq('/*', /[^*]*\*+([^/*][^*]*\*+)*/, '/')
    )),
  }
});

function sep(rule, separator) {
  return optional(sep1(rule, separator));
}

function sep1(rule, separator) {
  return seq(rule, repeat(seq(separator, rule)));
}
