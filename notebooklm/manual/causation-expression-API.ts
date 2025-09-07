import { CausalRelationJson } from "./pattern-API.ts"; // Assuming pattern-API.ts is in the same directory or accessible

/**
 * Defines how to extract and transform captured groups from a regex match into CausalRelationJson properties.
 */
export type CausalParseTransform = {
    /** The index of the capture group for the 'this' (cause) term. (1-based index, 0 for inference from context). */
    thisGroup: number;
    /** The index of the capture group for the 'that' (effect) term. (1-based index, 0 for inference from context). */
    thatGroup: number;
    /** Optional, string literal or template for the 'this' term if transformation is needed.
     *  Use ${thisGroupText} and ${thatGroupText} for original captured group content.
     *  Use ${captureGroup(N)} for specific capture group N from the regex match (1-based).
     */
    transformThis?: string;
    /** Optional, string literal or template for the 'that' term if transformation is needed.
     *  Use ${thisGroupText} and ${thatGroupText} for original captured group content.
     *  Use ${captureGroup(N)} for specific capture group N from the regex match (1-based).
     */
    transformThat?: string;
};

/**
 * Represents a codified causal expression identifier from the Suttas.
 * This structure helps in programmatically identifying and interpreting causal relationships.
 */
export interface CausalExpression {
    /** The regex pattern to match within a quotation. `(.*?)` will be used for capturing the `_` placeholders.
     *  Ensure regex groups are non-greedy `(.*?)` unless specifically needed.
     */
    pattern: string;
    /** The category of this causal expression (e.g., 'Direct Causation'). */
    category: CausalCategory;
    /** The strength of the causal relation, mapping to CausalRelationJson.relation. */
    relation: CausalRelationJson['relation'];
    /** True if the 'this' component (cause) is implicitly negated (e.g., "lack of _"). */
    notThis?: boolean;
    /** True if the 'that' component (effect) is implicitly negated (e.g., "_ prevents _"). */
    notThat?: boolean;
    /** True if the causal relationship itself is one of impossibility. */
    cannot?: boolean;
    /** Defines how to extract and transform the captured groups into the 'this' and 'that' for CausalRelationJson.
     *  `thisGroup` and `thatGroup` refer to the index of the regex capture groups (1-based). `0` means the value needs to be inferred from surrounding context by the resolver.
     */
    parseTransform: CausalParseTransform;
    /** A brief example to illustrate the pattern. */
    example: string;
    /** Any specific notes or instructions for parsing this pattern, particularly for multi-part 'that' values or inference. */
    notes?: string;
}

/**
 * Defines the categories of causal relationships as derived from Sutta analysis.
 */
export type CausalCategory =
    'Direct Causation' |
    'Conditions & Prerequisites' |
    'Constitutive & Determinative' |
    'Cessation' |
    'Purpose & Means' |
    'Implicit Causation' |
    'Meta-Causation' |
    'Illustrative Causation'; // <-- Added 'Illustrative Causation'

/**
 * A collection of all codified causal expression identifiers.
 * This array serves as the executable guide for discovering causal relationships.
 */
export const CausalExpressionGuide: CausalExpression[] = [
    // 1. Direct Causation (A leads to B) - relation: 3
    {
        pattern: '(.*?) is a cause for the origination of (.*?)',
        category: 'Direct Causation',
        relation: 3,
        parseTransform: { thisGroup: 1, thatGroup: 2 },
        example: "Greed is a cause for the origination of actions",
    },
    {
        pattern: '(.*?) causes for the origination of (.*?)',
        category: 'Direct Causation',
        relation: 3,
        parseTransform: { thisGroup: 1, thatGroup: 2 },
        example: "Greed causes for the origination of actions",
    },
    {
        pattern: 'From (.*?) comes (.*?)',
        category: 'Direct Causation',
        relation: 3,
        parseTransform: { thisGroup: 1, thatGroup: 2 },
        example: "From ignorance as a requisite condition come fabrications",
    },
    {
        pattern: '(.*?) brings (.*?) into play',
        category: 'Direct Causation',
        relation: 3,
        parseTransform: { thisGroup: 1, thatGroup: 2 },
        example: "A monk attending inappropriately brings unarisen effluents into play",
    },
    {
        pattern: '(.*?) come into play',
        category: 'Implicit Causation',
        relation: 3,
        parseTransform: { thisGroup: 0, thatGroup: 1, transformThat: "origination of ${thatGroupText}" },
        example: "Stress come into play",
        notes: "When 'X come into play' is matched, 'X' is the 'that'. The 'this' (cause) must be inferred from the immediate preceding context by the resolver.",
    },
    {
        pattern: '(.*?) is born',
        category: 'Implicit Causation',
        relation: 3,
        parseTransform: { thisGroup: 0, thatGroup: 1, transformThat: "birth of ${thatGroupText}" },
        example: "Rapture is born",
        notes: "When 'X is born' is matched, 'X' is the 'that'. The 'this' (cause) must be inferred from the immediate preceding context by the resolver.",
    },
    {
        pattern: '(.*?) arise',
        category: 'Implicit Causation',
        relation: 3,
        parseTransform: { thisGroup: 0, thatGroup: 1, transformThat: "arising of ${thatGroupText}" },
        example: "unarisen skillful qualities arise",
        notes: "When 'X arise' is matched, 'X' is the 'that'. The 'this' (cause) must be inferred from the immediate preceding context by the resolver.",
    },
    {
        pattern: '(.*?) produces (.*?)',
        category: 'Direct Causation',
        relation: 3,
        parseTransform: { thisGroup: 1, thatGroup: 2 },
        example: "One immersed in ignorance produces a corresponding state of existence",
    },
    {
        pattern: '(.*?) ripens in (.*?)',
        category: 'Direct Causation',
        relation: 3,
        parseTransform: { thisGroup: 1, thatGroup: 2 },
        example: "Effluents that defile… that ripen in stress",
    },
    {
        pattern: '(.*?) leads to (.*?)',
        category: 'Direct Causation',
        relation: 3,
        parseTransform: { thisGroup: 1, thatGroup: 2 },
        example: "These qualities, when adopted & carried out, lead to harm & to suffering",
    },
    {
        pattern: '(.*?) makes (.*?)',
        category: 'Direct Causation',
        relation: 3,
        parseTransform: { thisGroup: 1, thatGroup: 2 },
        example: "The enlightened are makers of light",
    },
    {
        pattern: '(.*?) engenders (.*?)',
        category: 'Direct Causation',
        relation: 3,
        parseTransform: { thisGroup: 1, thatGroup: 2 },
        example: "The Tathāgata… engenders the path (previously) unengendered",
    },
    {
        pattern: '(.*?) causes (.*?) to rise',
        category: 'Direct Causation',
        relation: 3,
        parseTransform: { thisGroup: 1, thatGroup: 2 },
        example: "Ignorance ebbing causes fabrications to rise",
    },
    // NEW: Sequential Conditional Link (e.g., "Being X, one is Y")
    {
        pattern: '(?:Being|Having) (.*?), one is (.*?)',
        category: 'Direct Causation',
        relation: 3,
        parseTransform: { thisGroup: 1, thatGroup: 2 },
        example: "Being heedful, one is capable of abandoning apathy",
        notes: "Captures direct causal link when one state/quality leads to another. Often appears in longer sequential chains. The 'that' group may contain multiple comma-separated items (e.g., 'apathy, hard to correct, & evil friendship') that need to be parsed into individual CausalRelationJson entries by the resolver.",
    },

    // 2. Conditions & Prerequisites (A enables B)
    {
        pattern: '(.*?) as a requisite condition',
        category: 'Conditions & Prerequisites',
        relation: 1,
        parseTransform: { thisGroup: 1, thatGroup: 0 },
        example: "Ignorance as a requisite condition",
        notes: "When 'X as a requisite condition' is matched, 'X' is the 'this'. The 'that' (effect) must be inferred from the immediate subsequent context by the resolver.",
    },
    {
        pattern: '(.*?) conditioned by (.*?)',
        category: 'Conditions & Prerequisites',
        relation: 1,
        parseTransform: { thisGroup: 2, thatGroup: 1 },
        example: "Contact conditioned by name-&-form",
    },
    {
        pattern: '(.*?) dependent on (.*?)',
        category: 'Conditions & Prerequisites',
        relation: 1,
        parseTransform: { thisGroup: 2, thatGroup: 1 },
        example: "Eye-consciousness dependent on the eye & forms",
    },
    {
        pattern: '(.*?) is rooted in (.*?)',
        category: 'Conditions & Prerequisites',
        relation: 2,
        parseTransform: { thisGroup: 2, thatGroup: 1 },
        example: "All phenomena are rooted in desire",
    },
    {
        pattern: '(.*?) provides the occasion for (.*?)',
        category: 'Conditions & Prerequisites',
        relation: 1,
        parseTransform: { thisGroup: 1, thatGroup: 2 },
        example: "Things in the past provide the occasion for desire & passion",
    },
    {
        pattern: '(.*?) is supported by (.*?)',
        category: 'Conditions & Prerequisites',
        relation: 1,
        parseTransform: { thisGroup: 2, thatGroup: 1 },
        example: "Consciousness is supported by fabrications",
    },
    {
        pattern: '(.*?) as a support for (.*?)',
        category: 'Conditions & Prerequisites',
        relation: 1,
        parseTransform: { thisGroup: 1, thatGroup: 2 },
        example: "Acts of merit as a support for beings in their after-death world",
    },
    {
        pattern: '(.*?) hindered by (.*?) & fettered by (.*?)',
        category: 'Conditions & Prerequisites',
        relation: 3,
        notThat: true, // X & Y hinder Z implies X & Y prevent Z (positive outcome)
        parseTransform: { thisGroup: 2, thatGroup: 1, transformThis: "${captureGroup(2)} & ${captureGroup(3)}", transformThat: "liberation of ${thatGroupText}" },
        example: "Beings hindered by ignorance & fettered by craving",
        notes: "The 'this' is a combined 'ignorance & craving'. The 'that' is the implicit prevented positive outcome. The 'this' group may contain multiple comma-separated items.",
    },
    {
        pattern: '(.*?) enables (.*?)',
        category: 'Conditions & Prerequisites',
        relation: 1,
        parseTransform: { thisGroup: 1, thatGroup: 2 },
        example: "Appropriate attention enables the arising of right view",
    },
    {
        pattern: '(.*?) conditions (.*?)',
        category: 'Conditions & Prerequisites',
        relation: 1,
        parseTransform: { thisGroup: 1, thatGroup: 2 },
        example: "Ignorance conditions fabrications",
    },
    {
        pattern: '(.*?) is a requisite for (.*?)',
        category: 'Conditions & Prerequisites',
        relation: 1,
        parseTransform: { thisGroup: 1, thatGroup: 2 },
        example: "Conviction is a requisite for hearing the true Dhamma",
    },
    {
        pattern: '(.*?) is a foundation for (.*?)',
        category: 'Conditions & Prerequisites',
        relation: 2,
        parseTransform: { thisGroup: 1, thatGroup: 2 },
        example: "Appropriate attention is a foundation for the factors for awakening",
    },
    {
        pattern: '(.*?) is a prerequisite for (.*?)',
        category: 'Conditions & Prerequisites',
        relation: 1,
        parseTransform: { thisGroup: 1, thatGroup: 2 },
        example: "Conviction is a prerequisite for hearing the true Dhamma",
    },
    { // NEW: Food / Nourishment
        pattern: '(.*?) is food for (.*?)',
        category: 'Conditions & Prerequisites',
        relation: 2,
        parseTransform: { thisGroup: 1, thatGroup: 2 },
        example: "'The five hindrances,' it should be said, 'is food for ignorance'",
    },
    {
        pattern: '(.*?) nourishes (.*?)',
        category: 'Conditions & Prerequisites',
        relation: 2,
        parseTransform: { thisGroup: 1, thatGroup: 2 },
        example: "Hearing the True Dhamma nourishes conviction",
    },
    { // NEW: Conducive
        pattern: '(.*?) conducive to (.*?)',
        category: 'Conditions & Prerequisites',
        relation: 1,
        parseTransform: { thisGroup: 1, thatGroup: 2 },
        example: "Six perceptions conducive to penetration",
    },
    { // NEW: Basis / Fundamental
        pattern: '(.*?) is the basis of (.*?)',
        category: 'Conditions & Prerequisites',
        relation: 2,
        parseTransform: { thisGroup: 1, thatGroup: 2 },
        example: "Well-purified virtue & views made straight is the basis of skillful mental qualities",
    },
    {
        pattern: '(.*?) is fundamental to (.*?)',
        category: 'Conditions & Prerequisites',
        relation: 2,
        parseTransform: { thisGroup: 1, thatGroup: 2 },
        example: "Right understanding is fundamental to liberation",
    },

    // 3. Constitutive & Determinative Relationships
    {
        pattern: '(.*?) is (?:called )?(the )?(.*?)', // Captures definition (A is B)
        category: 'Constitutive & Determinative',
        relation: 0,
        parseTransform: { thisGroup: 1, thatGroup: 3 },
        example: "The ending of passion... This is called the unfabricated.",
        notes: "Matches defining statements (A is B). For 'A is called B', A is 'this', B is 'that'.",
    },
    {
        pattern: '(.*?) constitutes (.*?)',
        category: 'Constitutive & Determinative',
        relation: 0,
        parseTransform: { thisGroup: 1, thatGroup: 2 },
        example: "This constitutes the path.",
    },
    {
        pattern: '(.*?) defines (.*?)',
        category: 'Constitutive & Determinative',
        relation: 0,
        parseTransform: { thisGroup: 1, thatGroup: 2 },
        example: "This defines right view.",
    },
    {
        pattern: '(.*?) is what differentiates (.*?) in terms of (.*?)',
        category: 'Constitutive & Determinative',
        relation: 3,
        parseTransform: { thisGroup: 1, thatGroup: 2, transformThat: "${thatGroupText} in terms of ${captureGroup(3)}" },
        example: "Action is what differentiates beings in terms of baseness & excellence",
    },
    {
        pattern: '(.*?) co-arises with (.*?)',
        category: 'Constitutive & Determinative',
        relation: 0,
        parseTransform: { thisGroup: 1, thatGroup: 2 },
        example: "Dependent co-arising co-arises with the Dhamma",
    },
    {
        pattern: '(.*?) is characterised by (.*?)',
        category: 'Constitutive & Determinative',
        relation: 0,
        parseTransform: { thisGroup: 1, thatGroup: 2 },
        example: "The mind is characterised by its defilements",
    },
    {
        pattern: '(.*?) is an indicator of (.*?)',
        category: 'Constitutive & Determinative',
        relation: 0,
        parseTransform: { thisGroup: 1, thatGroup: 2 },
        example: "Aroused practice is an indicator of conviction",
    },
    {
        pattern: 'Whoever sees (.*?) sees (.*?)',
        category: 'Constitutive & Determinative',
        relation: 0,
        parseTransform: { thisGroup: 1, thatGroup: 2 },
        example: "Whoever sees dependent co-arising sees the Dhamma",
        notes: "This pattern implies mutual dependence; the parser should ideally generate both (X,Y) and (Y,X) relations.",
    },

    // 4. Cessation (Absence of A leads to absence of B) - relation: 3 (often with negation)
    {
        pattern: 'From the fading of (.*?) is there (.*?) release',
        category: 'Cessation',
        relation: 3,
        parseTransform: { thisGroup: 1, thatGroup: 2, transformThat: "${thatGroupText} release" },
        example: "From the fading of passion is there awareness-release",
    },
    {
        pattern: 'From the cessation of (.*?) comes the cessation of (.*?)',
        category: 'Cessation',
        relation: 3,
        parseTransform: { thisGroup: 1, thatGroup: 2 },
        example: "From the cessation of ignorance comes the cessation of fabrications",
    },
    {
        pattern: '(.*?) is abandoned',
        category: 'Cessation',
        relation: 3,
        parseTransform: { thisGroup: 1, thatGroup: 1, transformThis: "abandoning ${thisGroupText}", transformThat: "cessation of ${thatGroupText}" },
        example: "Unskillful qualities are abandoned",
        notes: "Assumes the act of abandoning is the cause, and cessation is the effect. The 'this' group may contain multiple comma-separated items.",
    },
    {
        pattern: '(.*?) is destroyed',
        category: 'Cessation',
        relation: 3,
        parseTransform: { thisGroup: 1, thatGroup: 1, transformThis: "destroying ${thisGroupText}", transformThat: "cessation of ${thatGroupText}" },
        example: "The root of effluents is destroyed",
        notes: "The 'this' group may contain multiple comma-separated items.",
    },
    {
        pattern: '(.*?) is cut through',
        category: 'Cessation',
        relation: 3,
        parseTransform: { thisGroup: 1, thatGroup: 1, transformThis: "cutting through ${thisGroupText}", transformThat: "cessation of ${thatGroupText}" },
        example: "Despairs are cut through",
        notes: "The 'this' group may contain multiple comma-separated items.",
    },
    {
        pattern: '(.*?) guards (.*?)',
        category: 'Cessation',
        relation: 3,
        notThat: true,
        parseTransform: { thisGroup: 1, thatGroup: 2, transformThat: "harm to ${thatGroupText}" },
        example: "Shame & compunction guard the world",
        notes: "Interpreted as: X causes *no* harm to Y (or prevents harm to Y).",
    },
    {
        pattern: '(.*?) protects (.*?)',
        category: 'Cessation',
        relation: 3,
        notThat: true,
        parseTransform: { thisGroup: 1, thatGroup: 2, transformThat: "harm to ${thatGroupText}" },
        example: "Good conduct protects oneself",
    },
    {
        pattern: '(.*?) prevents (.*?)',
        category: 'Cessation',
        relation: 3,
        notThat: true,
        parseTransform: { thisGroup: 1, thatGroup: 2 },
        example: "Mindfulness prevents the arising of hindrances",
    },
    {
        pattern: 'Lack of (.*?) prevents (.*?)',
        category: 'Cessation',
        relation: 3,
        notThis: true,
        notThat: true,
        parseTransform: { thisGroup: 1, thatGroup: 2 },
        example: "Lack of developing mindfulness prevents mind release from effluents",
    },
    {
        pattern: 'Without (.*?) impossible for (.*?)',
        category: 'Cessation',
        relation: 3,
        notThis: true,
        cannot: true,
        notThat: true,
        parseTransform: { thisGroup: 1, thatGroup: 2, transformThat: "achieving ${thatGroupText}" },
        example: "Without abandoning three things, impossible for abandoning self-identification views",
        notes: "The 'that' group may contain multiple comma-separated items.",
    },
    // NEW: Sequential Conditional Link (e.g., "Being X, one is incapable of abandoning Y")
    {
        pattern: '(?:Being|Having) (.*?), one is incapable of abandoning (.*?)',
        category: 'Cessation',
        relation: 3,
        cannot: true,
        parseTransform: { thisGroup: 1, thatGroup: 2, transformThat: "abandoning ${thatGroupText}" },
        example: "Being heedless, one is incapable of abandoning apathy",
        notes: "Captures a cause (X) leading to an inability to achieve a cessation (abandoning Y). The 'that' refers to the action of abandoning, which is unachievable. The 'that' group may contain multiple comma-separated items that need to be parsed into individual CausalRelationJson entries.",
    },
    // NEW: Sequential Conditional Link (e.g., "Being X, one is incapable of Y")
    {
        pattern: '(?:Being|Having) (.*?), one is incapable of (.*?)',
        category: 'Cessation',
        relation: 3,
        cannot: true,
        parseTransform: { thisGroup: 1, thatGroup: 2, transformThat: "achieving ${thatGroupText}" },
        example: "Being heedless, one is incapable of right practice",
        notes: "Captures a cause (X) leading to an inability to achieve an outcome (Y). The 'that' group may contain multiple comma-separated items that need to be parsed into individual CausalRelationJson entries.",
    },
    // NEW: Sequential Conditional Link (e.g., "Without abandoning X, one is incapable of abandoning Y")
    {
        pattern: 'Without abandoning (.*?), one is incapable of abandoning (.*?)',
        category: 'Cessation',
        relation: 3,
        notThis: true,
        cannot: true,
        parseTransform: { thisGroup: 1, thatGroup: 2, transformThis: "abandoning ${thisGroupText}", transformThat: "abandoning ${thatGroupText}" },
        example: "Without abandoning restlessness, one is incapable of abandoning a lack of restraint",
        notes: "Captures that a failure to abandon X makes it impossible to achieve abandoning Y. The 'that' group may contain multiple comma-separated items that need to be parsed into individual CausalRelationJson entries.",
    },
    // NEW: Sequential Conditional Link (e.g., "Without abandoning X, one is incapable of Y")
    {
        pattern: 'Without abandoning (.*?), one is incapable of (.*?)',
        category: 'Cessation',
        relation: 3,
        notThis: true,
        cannot: true,
        parseTransform: { thisGroup: 1, thatGroup: 2, transformThis: "abandoning ${thisGroupText}", transformThat: "achieving ${thatGroupText}" },
        example: "Without abandoning unskillful qualities, one is incapable of realizing unbinding",
        notes: "Captures that a failure to abandon X makes it impossible to achieve Y. The 'that' group may contain multiple comma-separated items that need to be parsed into individual CausalRelationJson entries.",
    },
    {
        pattern: '(.*?) is not destined for future arising',
        category: 'Cessation',
        relation: 3,
        notThat: true,
        parseTransform: { thisGroup: 0, thatGroup: 1, transformThis: "cessation of ${thatGroupText}", transformThat: "future arising of ${thatGroupText}" },
        example: "The effluents are not destined for future arising",
        notes: "Assumes an implicit 'cessation' as the cause for 'not destined for future arising'. 'X' is the thing that is not destined to arise. The cause of this non-arising is its cessation, which needs to be inferred by the resolver.",
    },

    // 5. Purpose & Means (A for B) - relation: 2
    {
        pattern: 'for the purpose of (.*?)',
        category: 'Purpose & Means',
        relation: 2,
        parseTransform: { thisGroup: 0, thatGroup: 1, transformThis: "action", transformThat: "${thatGroupText}" },
        example: "For the purpose of crossing over the flood",
        notes: "The 'this' (the action/means) must be inferred from the context or a meta-parsing step by the resolver.",
    },
    {
        pattern: 'for the (.*?) of (.*?)',
        category: 'Purpose & Means',
        relation: 2,
        parseTransform: { thisGroup: 0, thatGroup: 2, transformThis: "action for the ${captureGroup(1)} of ${captureGroup(2)}", transformThat: "${captureGroup(1)} of ${captureGroup(2)}" },
        example: "For the purification of beings",
        notes: "The 'this' is the implied action, the 'that' is the stated purpose. The 'that' group may contain multiple comma-separated items.",
    },
    {
        pattern: 'by means of (.*?)',
        category: 'Purpose & Means',
        relation: 2,
        parseTransform: { thisGroup: 1, thatGroup: 0, transformThat: "achieved outcome" },
        example: "Mind is cleansed by means of proper technique",
        notes: "The 'this' is the 'means', the 'that' is the 'implied outcome' from context by the resolver.",
    },
    {
        pattern: 'through (.*?)',
        category: 'Purpose & Means',
        relation: 2,
        parseTransform: { thisGroup: 1, thatGroup: 0, transformThat: "achieved outcome" },
        example: "Through right gnosis is release",
        notes: "The 'this' is the 'means', the 'that' is the 'implied outcome' from context by the resolver.",
    },
    {
        pattern: '(.*?) is the path leading to (.*?)',
        category: 'Purpose & Means',
        relation: 2,
        parseTransform: { thisGroup: 1, thatGroup: 2 },
        example: "The noble eightfold path is the path leading to cessation of effluents",
    },
    {
        pattern: '(.*?) is the way leading to (.*?)',
        category: 'Purpose & Means',
        relation: 2,
        parseTransform: { thisGroup: 1, thatGroup: 2 },
        example: "Mindfulness immersed in the body is the way leading to the unfabricated",
    },
    // Prescriptive statements (Implicit Causation)
    {
        pattern: '(.*?) should be done',
        category: 'Implicit Causation',
        relation: 2,
        parseTransform: { thisGroup: 1, thatGroup: 1, transformThis: "doing ${thisGroupText}", transformThat: "positive outcome of ${thatGroupText}" },
        example: "Develop what is skillful should be done",
        notes: "The 'this' is the implied action (e.g., 'developing skillful'), the 'that' is the implied positive outcome. The 'that' group may contain multiple comma-separated items.",
    },
    {
        pattern: '(.*?) should be made to arise',
        category: 'Implicit Causation',
        relation: 2,
        parseTransform: { thisGroup: 1, thatGroup: 1, transformThis: "making ${thisGroupText} arise", transformThat: "arising of ${thatGroupText}" },
        example: "Skillful qualities should be made to arise",
        notes: "The 'that' group may contain multiple comma-separated items.",
    },
    {
        pattern: '(.*?) should be developed',
        category: 'Implicit Causation',
        relation: 2,
        parseTransform: { thisGroup: 1, thatGroup: 1, transformThis: "developing ${thisGroupText}", transformThat: "${thatGroupText} (developed)" },
        example: "What is skillful should be developed",
        notes: "The 'that' group may contain multiple comma-separated items.",
    },
    {
        pattern: '(.*?) should be pursued',
        category: 'Implicit Causation',
        relation: 2,
        parseTransform: { thisGroup: 1, thatGroup: 1, transformThis: "pursuing ${thisGroupText}", transformThat: "${thatGroupText} (achieved)" },
        example: "Equanimity should be pursued",
        notes: "The 'that' group may contain multiple comma-separated items.",
    },
    {
        pattern: '(.*?) should be comprehended',
        category: 'Implicit Causation',
        relation: 2,
        parseTransform: { thisGroup: 1, thatGroup: 1, transformThis: "comprehending ${thisGroupText}", transformThat: "${thatGroupText} (understood)" },
        example: "Stress should be comprehended",
        notes: "The 'that' group may contain multiple comma-separated items.",
    },
    {
        pattern: '(.*?) should be abandoned',
        category: 'Implicit Causation',
        relation: 2,
        parseTransform: { thisGroup: 1, thatGroup: 1, transformThis: "abandoning ${thisGroupText}", transformThat: "cessation of ${thatGroupText}" },
        example: "What is unskillful should be abandoned",
        notes: "The 'that' group may contain multiple comma-separated items.",
    },
    {
        pattern: '(.*?) should be directly known',
        category: 'Implicit Causation',
        relation: 2,
        parseTransform: { thisGroup: 1, thatGroup: 1, transformThis: "directly knowing ${thisGroupText}", transformThat: "${thatGroupText} (directly known)" },
        example: "Stress should be directly known",
        notes: "The 'that' group may contain multiple comma-separated items.",
    },
    {
        pattern: 'train (?:oneself|yourselves) (.*?)',
        category: 'Implicit Causation',
        relation: 2,
        parseTransform: { thisGroup: 1, thatGroup: 1, transformThis: "training in ${thisGroupText}", transformThat: "${thisGroupText} (achieved/developed)" },
        example: "Train yourselves no I-making conceit-obsession",
        notes: "The 'this' is the practice, the 'that' is the outcome. The 'that' group may contain multiple comma-separated items.",
    },

    // Meta-Causation (Parsing Strategies / Inferred Causation)
    {
        pattern: '(.*?)…(.*?)', // General pattern for ellipsis. More specific logic needed in resolver.
        category: 'Meta-Causation',
        relation: 3, // Assuming strong causal steps in a chain
        parseTransform: { thisGroup: 1, thatGroup: 2, transformThis: "${thisGroupText}", transformThat: "${thatGroupText}" }, // Placeholder transform, actual logic is in resolver
        example: "hearing Dhamma… remembering it… penetrating the meaning…",
        notes: "This indicates a parsing strategy: identify segments between ellipses as causal steps (this -> that). The resolver needs to handle dynamic splitting and linking, often creating multiple CausalRelationJson entries. The 'this' and 'that' here are just two consecutive elements, but the full chain needs to be handled by the resolver.",
    },
    {
        pattern: 'rhetorical question implying causation',
        category: 'Implicit Causation',
        relation: 3,
        parseTransform: { thisGroup: 0, thatGroup: 0 }, // Requires full LM inference/text_analysis
        example: "If Nanda did not guard the doors of his senses... how would he be able to follow the holy life, perfect & pure?",
        notes: "The resolver needs to identify the rhetorical question and infer the underlying causal statement (e.g., 'Not guarding senses prevents holy life'). This is an inference task for the LM.",
    },
    {
        pattern: 'simile illustrates causation',
        category: 'Illustrative Causation',
        relation: 3, // Similes often illustrate strong causal principles
        parseTransform: { thisGroup: 0, thatGroup: 0 }, // Requires full LM interpretation/text_analysis
        example: "Just as if a white cloth with stains removed would rightly take dye...",
        notes: "The resolver needs to identify similes and then extract the *causal principle* they illustrate, which would then be represented as other CausalExpressions. This is an interpretation task for the LM.",
    },
    {
        pattern: 'explicit sequential chain indicator', // This is for parser strategy, not a direct regex match.
        category: 'Meta-Causation',
        relation: 3,
        parseTransform: { thisGroup: 0, thatGroup: 0 }, // Placeholder, needs specific parser logic
        example: "Listening well increases learning. What is learned increases discernment. Through discernment one knows the goal. When known, the goal brings bliss.",
        notes: "This indicates a parsing strategy: identify explicit step-by-step causal sentences in a sequence and break them into individual this -> that links. Requires sentence-level parsing and linking by the resolver.",
    },
];