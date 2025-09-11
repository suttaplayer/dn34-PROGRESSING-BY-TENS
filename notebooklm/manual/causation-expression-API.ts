/*
* purpose: A comprehensive guide for identifying and interpreting causal expressions in Dhamma Suttas.
* This file codifies various linguistic patterns into structured causal relationships.
* created by: notebooklm (through collaboration with user)
* generatedDate: 2024-03-02
*/

export type RelationType = 0 | 1 | 2 | 3; // 0: Constitutive & Determinative, 1: Conditions & Prerequisites, 2: Purpose & Means, 3: Direct Causation & Cessation

export interface ThisOrThatConditionalityJson {
  notThis?: boolean; // boolean value indicating inverse of the cause reference (default: boolean|null)
  this: string; // string of the cause in lowercase (eg. "ignorance")
  relation: RelationType; // number indicating the type of causal relationship (0: Constitutive, 1: Prerequisite, 2: Means/Purpose, 3: Direct Causation)
  cannot?: boolean; // boolean value indicating an impossibility in the causal link (default: boolean|null)
  notThat?: boolean; // boolean value indicating inverse of the effect reference (default: boolean|null)
  that: string; // string of the effect in lowercase (eg. "conviction")
  intermediaries?: string[]; // array of string of the intermediate links in the causal chain
  cyclic?: boolean; // boolean value indicating "that" has a return causal influence on "this"
  quotationIndicies?: [string, ...number[]]; // string[] of the source file name and line number(s) of the directly associated quote where this/that relationships was derived from
  transformThis?: string;
  transformThat?: string;
}

/**
* Represents a codified causal expression identifier from the Suttas.
* This structure helps in programmatically identifying and interpreting causal relationships.
*/
export interface CausalExpression {
  /** The regex pattern to match within a quotation. `(.*?)` will be used for capturing the `_` placeholders.
   * Ensure regex groups are non-greedy `(.*?)` unless specifically needed.
   */
  pattern: string;
  /** The category of this causal expression (e.g., 'Direct Causation'). */
  category: string;
  /** The numeric representation of the causal relation type. */
  relation: RelationType;
  /** Optional: Indicates if the 'this' part of the relation is negated. */
  notThis?: boolean;
  /** Optional: Indicates if the relation itself implies impossibility. */
  cannot?: boolean;
  /** Optional: Indicates if the 'that' part of the relation is negated. */
  notThat?: boolean;
  /** Optional: Transformations to apply to captured groups to form 'this' and 'that'. */
  parseTransform?: {
    thisGroup: number;
    thatGroup: number;
    transformThis?: string;
    transformThat?: string;
  };
  /** An example quotation that matches this pattern. */
  example: string;
  /** Notes for interpretation or specific handling. */
  notes?: string;
}

export const CausalExpressionGuide: CausalExpression[] = [
  // Direct Causation
  {
    pattern: '(.*?) is a cause for the origination of (.*?)',
    category: 'Direct Causation',
    relation: 3,
    parseTransform: { thisGroup: 1, thatGroup: 2, transformThat: "origination of ${thatGroupText}" },
    example: "Greed is a cause for the origination of actions",
    notes: "Captures direct causation where 'X is a cause for the origination of Y'."
  },
  {
    pattern: 'From (?:the cessation of )?(.*?) comes (?:the cessation of )?(.*?)',
    category: 'Direct Causation',
    relation: 3,
    parseTransform: { thisGroup: 1, thatGroup: 2, transformThis: "cessation of ${thisGroupText}", transformThat: "cessation of ${thatGroupText}" },
    example: "From the cessation of ignorance comes the cessation of fabrications",
    notes: "Captures cessation chains, where the cessation of X causes the cessation of Y."
  },
  {
    pattern: '(.*?) destroys (.*?)',
    category: 'Direct Causation',
    relation: 3,
    parseTransform: { thisGroup: 1, thatGroup: 2 },
    example: "Greed destroys the person of evil awareness",
    notes: "X causes the destruction of Y."
  },
  {
    pattern: '(.*?) (?:is born|arises)',
    category: 'Direct Causation',
    relation: 3,
    parseTransform: { thisGroup: 0, thatGroup: 1, transformThis: "${thatGroupText} (conditions)", transformThat: "arising of ${thatGroupText}" }, // 'this' implies conditioning factor
    example: "Joy is born",
    notes: "Captures the arising of a state, inferring a preceding cause from context."
  },

  // Conditions & Prerequisites
  {
    pattern: '(.*?) as (?:their )?requisite condition',
    category: 'Conditions & Prerequisites',
    relation: 1,
    parseTransform: { thisGroup: 1, thatGroup: 0, transformThat: "${thatGroupText}" },
    example: "Aging & death come from birth as their requisite condition",
    notes: "X is a requisite condition for Y. The order is Y from X."
  },
  {
    pattern: '(.*?) conducive to (?:the )?(.*?)',
    category: 'Conditions & Prerequisites',
    relation: 1,
    parseTransform: { thisGroup: 1, thatGroup: 2 },
    example: "Six perceptions conducive to penetration",
    notes: "X is conducive to Y."
  },
  {
    pattern: '(.*?) supported by (.*?)',
    category: 'Conditions & Prerequisites',
    relation: 1,
    parseTransform: { thisGroup: 2, thatGroup: 1 },
    example: "Right view supported by virtue",
    notes: "Y is supported by X, implying X is a prerequisite for Y."
  },
  {
    pattern: '(.*?) has its food: (.*?)',
    category: 'Conditions & Prerequisites',
    relation: 1,
    parseTransform: { thisGroup: 2, thatGroup: 1 },
    example: "Ignorance has its food: the five hindrances",
    notes: "X provides 'food' (sustenance/condition) for Y."
  },
  {
    pattern: '(.*?) is an obstacle to (.*?)',
    category: 'Conditions & Prerequisites',
    relation: 1,
    notThis: true, // X is an obstacle implies X prevents Y
    parseTransform: { thisGroup: 1, thatGroup: 2, transformThat: "attainment of ${thatGroupText}" },
    example: "Gains, offerings, & fame are an obstacle to the attainment of release",
    notes: "X is an obstacle to Y, implying X prevents Y."
  },

  // Purpose & Means
  {
    pattern: '(.*?) is the path of practice leading to (?:the )?(.*?)',
    category: 'Purpose & Means',
    relation: 2,
    parseTransform: { thisGroup: 1, thatGroup: 2 },
    example: "This is the path of practice leading to the cessation of stress",
    notes: "X is the path/means to achieve Y."
  },
  {
    pattern: '(?:for the )?(.*?)—in other words, (?:the )?(.*?)',
    category: 'Purpose & Means',
    relation: 2,
    parseTransform: { thisGroup: 2, thatGroup: 1 },
    example: "For the purification of beings—in other words, the four establishings of mindfulness",
    notes: "X is the means to achieve Y (where X is the 'in other words' part, Y is the purpose)."
  },
  {
    pattern: '(?:is )?(.*?) (?:for the purpose of|leading to|conducive to) (?:the )?(.*?)',
    category: 'Purpose & Means',
    relation: 2,
    parseTransform: { thisGroup: 1, thatGroup: 2 },
    example: "Dhamma taught for the purpose of crossing over",
    notes: "X is done for the purpose of Y."
  },
  {
    pattern: 'by means of (.*?)',
    category: 'Purpose & Means',
    relation: 2,
    parseTransform: { thisGroup: 1, thatGroup: 0, transformThat: "achieved outcome" }, // Placeholder, resolver needs to infer 'that'
    example: "Mind is cleansed by means of proper technique",
    notes: "The 'this' is the 'means', the 'that' is the 'implied outcome' from context by the resolver."
  },

  // Implicit Causation (Actions/Practices that lead to outcomes)
  {
    pattern: '(.*?) should be developed',
    category: 'Implicit Causation',
    relation: 2,
    parseTransform: { thisGroup: 1, thatGroup: 1, transformThis: "developing ${thisGroupText}", transformThat: "${thatGroupText} (developed)" },
    example: "What is skillful should be developed",
    notes: "The 'this' is the practice, the 'that' is the outcome. Applies to lists."
  },
  {
    pattern: '(.*?) should be pursued',
    category: 'Implicit Causation',
    relation: 2,
    parseTransform: { thisGroup: 1, thatGroup: 1, transformThis: "pursuing ${thisGroupText}", transformThat: "${thatGroupText} (pursued)" },
    example: "Exertion should be pursued",
    notes: "The 'this' is the practice, the 'that' is the outcome. Applies to lists."
  },
  {
    pattern: '(.*?) should be abandoned',
    category: 'Implicit Causation',
    relation: 2,
    parseTransform: { thisGroup: 1, thatGroup: 1, transformThis: "abandoning ${thisGroupText}", transformThat: "cessation of ${thatGroupText}" },
    example: "What is unskillful should be abandoned",
    notes: "The 'this' is the act, the 'that' is the outcome. Applies to lists."
  },
  {
    pattern: '(.*?) should be directly known',
    category: 'Implicit Causation',
    relation: 2,
    parseTransform: { thisGroup: 1, thatGroup: 1, transformThis: "directly knowing ${thisGroupText}", transformThat: "${thisGroupText} (directly known)" },
    example: "Stress should be directly known",
    notes: "The 'this' is the cognitive action, the 'that' is the object known."
  },
  {
    pattern: '(.*?) you should train yourselves',
    category: 'Implicit Causation',
    relation: 2,
    parseTransform: { thisGroup: 1, thatGroup: 0, transformThis: "training for ${thisGroupText}", transformThat: "desired outcome" }, // Placeholder, resolver needs to infer 'that'
    example: "Our minds will be unaffected... that's how you should train yourselves",
    notes: "The 'this' is the training, the 'that' is the implied outcome."
  },

  // Cessation Patterns
  {
    pattern: '(.*?) is abandoned',
    category: 'Cessation',
    relation: 3,
    parseTransform: { thisGroup: 0, thatGroup: 0, transformThis: "abandoning ${thisGroupText}", transformThat: "cessation of ${thisGroupText}" },
    example: "Unskillful qualities are abandoned",
    notes: "Assumes the act of abandoning is the cause, and cessation is the effect."
  },
  {
    pattern: '(.*?) is destroyed',
    category: 'Cessation',
    relation: 3,
    parseTransform: { thisGroup: 0, thatGroup: 0, transformThis: "destroying ${thisGroupText}", transformThat: "cessation of ${thisGroupText}" },
    example: "The fetters are destroyed",
    notes: "Assumes the act of destroying is the cause, and cessation is the effect."
  },
  {
    pattern: '(?:Without abandoning|A lack of abandoning) (.*?), (?:one is incapable of|it is impossible for) abandoning (.*?)',
    category: 'Cessation',
    relation: 3,
    notThis: true,
    cannot: true,
    parseTransform: { thisGroup: 1, thatGroup: 2, transformThis: "abandoning ${thisGroupText}", transformThat: "abandoning ${thatGroupText}" },
    example: "Without abandoning restlessness, one is incapable of abandoning a lack of restraint",
    notes: "Failure to abandon X makes it impossible to abandon Y."
  },
  {
    pattern: '(?:Without abandoning|A lack of abandoning) (.*?), (?:one is incapable of|it is impossible for) (.*?)',
    category: 'Cessation',
    relation: 3,
    notThis: true,
    cannot: true,
    parseTransform: { thisGroup: 1, thatGroup: 2, transformThis: "abandoning ${thisGroupText}", transformThat: "achieving ${thatGroupText}" },
    example: "Without abandoning unskillful qualities, one is incapable of realizing unbinding",
    notes: "Failure to abandon X makes it impossible to achieve Y."
  },

  // NEW: Negative Causation Patterns (Previously missing patterns are now included here)
  {
    pattern: '(?:Lack of|Not) (.*?) (?:prevents|does not lead to|is not conducive to) (.*?)',
    category: 'Negative Causation',
    relation: 3,
    notThis: true,
    notThat: true,
    parseTransform: { "thisGroup": 1, "thatGroup": 2, "transformThis": "${thisGroupText}", "transformThat": "${thatGroupText}" },
    example: "Lack of understanding prevents going beyond transmigration",
    notes: "Captures that the absence of X leads to the absence of Y, or prevents Y. Implicitly 'not this' causes 'not that'."
  },
  {
    pattern: '(.*?) (?:does not lead to|is not conducive to) (.*?)',
    category: 'Negative Causation',
    relation: 3,
    notThat: true,
    parseTransform: { "thisGroup": 1, "thatGroup": 2, "transformThis": "${thisGroupText}", "transformThat": "${thatGroupText}" },
    example: "Delusion does not lead to unbinding",
    notes: "Captures situations where a factor actively hinders or prevents an outcome, implying a negative causal link to the 'that' state."
  },
  {
    pattern: '(?:Defiled by|Overcome with) (.*?), (?:the mind is not released|discernment does not develop)',
    category: 'Negative Causation',
    relation: 3,
    notThat: true,
    parseTransform: {
      thisGroup: 1,
      thatGroup: 0,
      transformThis: "${thisGroupText}",
      transformThat: "${captureGroup(0).includes('mind is not released') ? 'release' : 'discernment developing'}"
    },
    example: "Defiled by ignorance, discernment does not develop",
    notes: "Captures defilements preventing release or discernment development."
  },

  // Meta-Causation (Parsing Strategies / Inferred Causation)
  {
    pattern: '(.*?)…(.*?)', // General pattern for ellipsis. Resolver needs to handle dynamic splitting.
    category: 'Meta-Causation',
    relation: 3, // Assuming strong causal steps in a chain
    parseTransform: { thisGroup: 1, thatGroup: 2 },
    example: "hearing Dhamma… remembering it… penetrating the meaning…",
    notes: "This indicates a parsing strategy: identify segments between ellipses as causal steps (this -> that). The resolver needs to handle dynamic splitting and linking, often creating multiple ThisOrThatConditionalityJson entries. The 'this' and 'that' here are just two consecutive elements, but the full chain needs to be handled by the resolver."
  },
  {
    pattern: 'rhetorical question implying causation',
    category: 'Implicit Causation',
    relation: 3, // Assuming strong causal steps
    parseTransform: { thisGroup: 0, thatGroup: 0 }, // Resolver to infer this/that from context
    example: "What do you think? Is form constant or inconstant?",
    notes: "Placeholder for rhetorical questions where the expected answer implies a causal relationship."
  }
];