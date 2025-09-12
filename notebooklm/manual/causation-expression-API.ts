import { RelationType } from './pattern-API.js'
export type PatternCategory = 'Direct Causation & Cessation' | 'Implicit Causation' | 'Purpose & Means' | 'Interdependent Co-arising' | 'Correlation' | 'Cessation';

export type CausalExpression = {
    pattern: string;
    category: PatternCategory;
    relation: RelationType;
    parseTransform: {
        thisGroup: number;
        thatGroup: number;
        transformThis?: string;
        transformThat?: string;
        notThis?: boolean;
        notThat?: boolean;
        cannot?: boolean;
        cyclic?: boolean;
    };
    example: string;
    notes: string;
};

export const CausalExpressions: CausalExpression[] = [
    // Direct Causation & Cessation
    {
        pattern: '(.*?) leads to (.*?)(?:\\.)?',
        category: 'Direct Causation & Cessation',
        relation: 3,
        parseTransform: { thisGroup: 1, thatGroup: 2 },
        example: "Greed leads to suffering.",
        notes: "Direct, explicit cause-effect statements."
    },
    {
        pattern: '(.*?) results in (.*?)(?:\\.)?',
        category: 'Direct Causation & Cessation',
        relation: 3,
        parseTransform: { thisGroup: 1, thatGroup: 2 },
        example: "Good actions result in happiness.",
        notes: "Direct, explicit cause-effect statements, often for outcomes."
    },
    {
        pattern: '(.*?) brings about (.*?)(?:\\.)?',
        category: 'Direct Causation & Cessation',
        relation: 3,
        parseTransform: { thisGroup: 1, thatGroup: 2 },
        example: "Diligent practice brings about wisdom.",
        notes: "Direct, explicit cause-effect statements."
    },
    {
        pattern: '(.*?) causes (.*?)(?:\\.)?',
        category: 'Direct Causation & Cessation',
        relation: 4,
        parseTransform: { thisGroup: 1, thatGroup: 2 },
        example: "Ignorance causes suffering.",
        notes: "General causal link, potentially stronger or more fundamental than 'leads to'."
    },
    {
        pattern: '(.*?) comes into play with (.*?) as their condition',
        category: 'Direct Causation & Cessation',
        relation: 2,
        parseTransform: { thisGroup: 2, thatGroup: 1 },
        example: "Evil qualities come into play with wrong view as their condition.",
        notes: "Identifies a condition for a state to arise."
    },
    {
        pattern: '(.*?) go to the culmination of their development',
        category: 'Direct Causation & Cessation',
        relation: 3,
        parseTransform: { thisGroup: 0, thatGroup: 1, transformThis: "${thisGroupText} (developed)", transformThat: "${thatGroupText} (culminated)" },
        example: "Skillful qualities go to the culmination of their development.",
        notes: "Implies a causal journey to completion."
    },
    {
        pattern: '(.*?) is abandoned, its root destroyed',
        category: 'Cessation',
        relation: 3,
        parseTransform: { thisGroup: 0, notThat: true, thatGroup: 1, transformThat: "${thisGroupText} (remaining)" },
        example: "Greed is abandoned, its root destroyed.",
        notes: "Explicit statement of cessation/abandonment."
    },
    {
        pattern: '(.*?) ceases without trace',
        category: 'Cessation',
        relation: 3,
        parseTransform: { thisGroup: 0, thatGroup: 1, transformThat: "${thisGroupText} (absent)" },
        example: "Unskillful habits cease without trace.",
        notes: "Explicit statement of complete cessation."
    },
    {
        pattern: '(.*?) does not remain there, does not linger there',
        category: 'Cessation',
        relation: 3,
        parseTransform: { thisGroup: 0, thatGroup: 1, transformThat: "${thisGroupText} (absent)" },
        example: "Whatever action that was done in a measurable way does not remain there, does not linger there.",
        notes: "Implies the non-persistence of a state or action due to a prior cause."
    },
    {
        pattern: '(.*?) is released from effluents through lack of clinging or sustenance',
        category: 'Cessation',
        relation: 3,
        parseTransform: { thisGroup: 0, thatGroup: 1, transformThat: "effluents (absent)" }, // Generalize 'effluents' for 'that'
        example: "Mind is released from effluents through lack of clinging or sustenance.",
        notes: "Specific form of liberation."
    },
    {
        pattern: '(.*?) will be abandoned or grow weaker',
        category: 'Cessation',
        relation: 3,
        parseTransform: { thisGroup: 0, thatGroup: 1, notThat: true, transformThat: "${thisGroupText} (active)" },
        example: "Youth's intoxication with youth will either be entirely abandoned or grow weaker.",
        notes: "Indicates a reduction or cessation of a negative quality."
    },
    // Interdependent Co-arising
    {
        pattern: 'From (.*?) as a requisite condition come (.*?)(?:\\.)?',
        category: 'Interdependent Co-arising',
        relation: 1,
        parseTransform: { thisGroup: 1, thatGroup: 2 },
        example: "From ignorance as a requisite condition come fabrications.",
        notes: "Standard Dependent Co-arising pattern, emphasizing 'requisite condition'."
    },
    {
        pattern: 'From the cessation of (.*?) comes the cessation of (.*?)(?:\\.)?',
        category: 'Interdependent Co-arising',
        relation: 1,
        parseTransform: { thisGroup: 1, thatGroup: 2, transformThis: "cessation of ${thisGroupText}", transformThat: "cessation of ${thatGroupText}" },
        example: "From the cessation of ignorance comes the cessation of fabrications.",
        notes: "Standard Dependent Co-arising pattern for cessation."
    },
    {
        pattern: 'When this is, that is\\.(?:\\s*From the arising of this comes the arising of that\\.)?',
        category: 'Interdependent Co-arising',
        relation: 1,
        parseTransform: { thisGroup: 0, thatGroup: 0 }, // Requires resolver to infer 'this' and 'that' from context, or to be the start of a chain
        example: "When this is, that is. From the arising of this comes the arising of that.",
        notes: "Generic Dependent Co-arising introductory phrase. Resolver needs to follow subsequent statements."
    },
    {
        pattern: 'When this isn\'t, that isn\'t\\.(?:\\s*From the cessation of this comes the cessation of that\\.)?',
        category: 'Interdependent Co-arising',
        relation: 1,
        parseTransform: { thisGroup: 0, thatGroup: 0 }, // Requires resolver to infer 'this' and 'that' from context, or to be the start of a chain
        example: "When this isn't, that isn't. From the cessation of this comes the cessation of that.",
        notes: "Generic Dependent Co-arising introductory phrase for cessation. Resolver needs to follow subsequent statements."
    },
    // Purpose & Means
    {
        pattern: '(.*?) is the path of practice for the cessation of (.*?)(?:\\.)?',
        category: 'Purpose & Means',
        relation: 2,
        parseTransform: { thisGroup: 1, thatGroup: 2, transformThat: "cessation of ${thatGroupText}" },
        example: "The noble eightfold path is the path of practice for the cessation of stress.",
        notes: "Explicitly states a practice as a means to an end."
    },
    {
        pattern: '(.*?) is the path leading to the unfabricated',
        category: 'Purpose & Means',
        relation: 2,
        parseTransform: { thisGroup: 1, thatGroup: 0, transformThat: "the unfabricated" },
        example: "Mindfulness immersed in the body is the path leading to the unfabricated.",
        notes: "Explicitly states a practice as a means to the unfabricated."
    },
    {
        pattern: '(.*?) has (.*?) as its purpose, (.*?) as its reward',
        category: 'Purpose & Means',
        relation: 3,
        parseTransform: { thisGroup: 1, thatGroup: 2 }, // The 'reward' (group 3) is redundant with 'purpose' (group 2) for the 'that' value.
        example: "Skillful virtues have freedom from remorse as its purpose, freedom from remorse as its reward.",
        notes: "Clear chain linking X to Y, with Y also being the reward. Captures the primary cause and immediate effect."
    },
    // Implicit Causation
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
    {
        pattern: 'It is in the nature of things that (.*?) arises in (.*?)(?:\\.)?',
        category: 'Direct Causation & Cessation',
        relation: 3,
        parseTransform: { thisGroup: 2, thatGroup: 1 },
        example: "It is in the nature of things that freedom from remorse arises in a person endowed with virtue, consummate in virtue.",
        notes: "Captures a natural, inherent causal arising of a state within a person/state."
    },
    // Other common patterns
    {
        pattern: '(.*?) makes his mind dispassionate with regard to (.*?)',
        category: 'Purpose & Means',
        relation: 2,
        parseTransform: { thisGroup: 1, thatGroup: 2, transformThat: "${thatGroupText} (dispassionate)" },
        example: "He makes his mind dispassionate with regard to phenomena that are conducive to passion.",
        notes: "Identifies the action of cultivating dispassion towards certain phenomena."
    },
    {
        pattern: '(.*?) liberates his mind with regard to (.*?)',
        category: 'Purpose & Means',
        relation: 2,
        parseTransform: { thisGroup: 1, thatGroup: 2, transformThat: "${thatGroupText} (liberated from)" },
        example: "He liberates his mind with regard to phenomena that are conducive to liberation.",
        notes: "Identifies the action of liberating the mind from certain phenomena."
    },
    {
        pattern: '(.*?) touches right release',
        category: 'Direct Causation & Cessation',
        relation: 3,
        parseTransform: { thisGroup: 1, thatGroup: 0, transformThat: "right release" },
        example: "He touches right release.",
        notes: "Direct outcome of a practice, leading to liberation."
    },
    {
        pattern: '(.*?) purges away (.*?)',
        category: 'Cessation',
        relation: 3,
        parseTransform: { thisGroup: 1, thatGroup: 2, notThat: true, transformThat: "${thatGroupText} (present)" },
        example: "Right view purges away wrong view.",
        notes: "Describes the removal of unskillful qualities by skillful ones."
    }
];

// Placeholder for other types if they were in the original file, omitted for brevity.
// export type ThisOrThatConditionalityJson = ...
// export type ThisOrThatConditionalitySuttaRefJson = ...