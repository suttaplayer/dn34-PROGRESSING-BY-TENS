/*
purpose: represents a cause and effect relationship 
created by:
    1. notebooklm: for documenting the causal relationships applied in the patternBuildingBlocksJson["Causal-Table"] & patternBuildingBlocksJson["Cause-&-Effect"] sections
    2. user: to inject causal relationships that are to be applied in the userDirectExperienceJson["Causal-Table"] & userDirectExperienceJson["Cause-&-Effect"] sections

    eg1 {"cause": "shame", "effect": "heedful"},
        => shame leads to heedful

    eg2. {"not-cause":true, "cause": "conviction", "cannot": true, "effect": "remembers it"},
        => not [having] conviction cannot lead to remembers it
*/
export type CauseAndEffectJson = {
    "not-cause"?: boolean,      /* boolean value indicating inverse of the causal reference (default: boolean|null)*/
    "cause": string,            /* string of the cause in lowercase (eg. "admirable friendship")*/
    "cannot"?: boolean,         /* boolean value indicating an impossible causal relationship (default: boolean|null)*/
    "skips-to"?: boolean,       /* boolean value indicating causation with missing links between causal relationship (default: boolean|null)*/
    "co-arised-with"?: boolean, /* boolean value indicating co-arising together causal relationship (default: boolean|null)*/
    "not-effect"?: boolean,     /* boolean value indicating inverse of the effect reference (default: boolean|null)*/
    "effect": string,           /* string of the effect in lowercase (eg. "conviction")*/
}

/*
purpose: represents the valid category keys for the dhammas in the "progressing by tens" framework
specified by:
    1. notebooklm: for querying use in the helper utilities and config
    2. user: for specifying the category key in the userPatternRequestJson
*/
export type CategoryKey = "helpful" | "developed" | "comprehended" | "abandoned" | "decline" | "distinction" | "penetrate" | "arise" | "known" | "realised";

/*
purpose: represents a reference in the "progressing by tens" framework to 1 of the 100 dhammas 
specified by:
    1. notebooklm: for querying use in the helper utilities and config
    2. user: for specifying the dhamma progression in the userPatternRequestJson
*/
export type ProgressionReferenceJson = {
    "progressionIndex": number, /* 1-based progression index reference in: Which [three] dhammas are very helpful */
    "categoryKey": CategoryKey, /* category key reference in: Which three dhammas are very [helpful]  */
}

/*
purpose: represents the target audience for the dhamma in the "progressing by tens" framework
created by:
    1. notebooklm: when trying the comprehend the problem
notes;
    - conviction-dhamma-follower: a person who will die as a stream-enterer at end of their life
    - stream-enterer: a person who has attained stream-entry
    - once-returner: a person who has attained once-returning
    - non-returner: a person who has attained non-returning
    - one-in-training: a person who is any of ["stream-enterer" , "once-returner" , "non-returner"]
*/
export type  AudienceKey = "conviction-dhamma-follower" | "stream-enterer" | "once-returner" | "non-returner" | "one-in-training";

/*
purpose: represents a subject in the "progressing by tens" framework. note, there are 100 dhamma in framework, but there are 550 subject in total.
         subject_count = (1*10)+(2*10)+(3*10)+(4*10)+(5*10)+(6*10)+(7*10)+(8*10)+(9*10)+(10*10) = 550
specified by:
    1. notebooklm: when trying the comprehend the problem
*/
export type ProgressionByTensSubjectJson = {
    "name": string,                     /* subject name (eg. "people of integrity") */
    "focus"?: string[],                 /* focus area (eg. ["associating"]) */
    "enter-from-state": string,         /* from internal|external state (eg. "stress") */
    "exit-to-state": string,            /* to internal|external state (eg. "effluent-free") */
    "target-audience": AudienceKey[],   /* subject's audience (eg. ["conviction-dhamma-follower", "stream-enterer", "once-returner"]) */
}

/*
purpose: represents the one of the 100 dhammas from the "progressing by tens" framework
created by: notebooklm based on user query specifying: {"progressionIndex": <number>, "categoryKey": <string>}

eg, 'Which three dhammas are very helpful? Associating with people of integrity, listening to the True Dhamma, practicing the Dhamma in accordance with the Dhamma: These three dhammas are very helpful.

progressionByTensContextJson = { 
    "progressionIndex": 3,
    "categoryKey": "helpful",
    ""pattern-name": "Factors for stream-entry",
    "subject": [
        {
            "name": "people of integrity",
            "focus": ["associating"],
            "enter-from-state": "stress",
            "exit-to-state": "effluent-free",
            "target-audience": ["conviction-dhamma-follower", "one-in-training"]
        }, {
            "name": "True Dhamma",
            "focus": ["listening"],
            "enter-from-state": "stress",
            "exit-to-state": "effluent-free",
            "target-audience": ["conviction-dhamma-follower", "one-in-training"]
        }, {
            "name": "practicing the Dhamma",
            "focus": ["in accordance with the Dhamma"],
            "enter-from-state": "stress",
            "exit-to-state": "effluent-free",
            "target-audience": ["conviction-dhamma-follower", "stream-enterer", "once-returner"]
        }
    ]
}
*/
export type ProgressionByTensContextJson = ProgressionReferenceJson &{
    "pattern-name": string, 
    "subject": ProgressionByTensSubjectJson[], 
}

export const progressionByTensContextJson: ProgressionByTensContextJson = { 
    "progressionIndex": -1, 
    "categoryKey": "helpful",
    "pattern-name": "",
    "subject": []
}

/*
purpose: represents a PlantUML diagram used for process view, concepts & relationships, state transitions, and resulting context sections
created by: notebooklm
*/
export type PlantUMLDiagram = string;

/*
purpose: represents all building blocks for the pattern complete pattern devoid of quotations
created by: notebooklm
*/
export type PatternBuildingBlocksJson = {
    "Problem": string, /* string of the problem statement */
    "Causal-Table": CauseAndEffectJson[], /* array of causeAndEffectJson objects (full table) */
    "Solution": {
        "Step-by-Step": string[], /* array of process step strings (this is a flattened representation of Process View) */
        "Cause-&-Effect": CauseAndEffectJson[], /* array of causeAndEffectJson objects (solution only) */
        "Process View": PlantUMLDiagram[], /* array of PlantUML Activity Diagram strings */
        "Concepts & Relationships": PlantUMLDiagram[], /* array of PlantUML Class Diagram strings */
        "State Transitions": PlantUMLDiagram[], /* array of PlantUML State Diagram strings */
    },
    "Context": string[], /* array of requisite condition/invariant strings */
    "Forces": string[], /* array of design constraint/influence strings */
    "Rationale": string, /* string of the rationale statement */
    "Resulting Context": PlantUMLDiagram[], /* array of PlantUML Mindmap Diagram strings */
    "Related Patterns": string[], /* array of related pattern-name strings */
    "Case-studies": string[], /* array of individual's name reference strings */
    "Simile": string[], /* array of simile name reference strings */
}
export const patternBuildingBlocksJson: PatternBuildingBlocksJson = {
    "Problem": "",
    "Causal-Table": [],
    "Solution": {
        "Step-by-Step": [],
        "Cause-&-Effect": [],
        "Process View": [],
        "Concepts & Relationships": [],
        "State Transitions": [],
    },
    "Context": [],
    "Forces": [],
    "Rationale": "",
    "Resulting Context": [],
    "Related Patterns": [],
    "Case-studies": [],
    "Simile": [],
}

/*  
purpose: shortest quotation expression that can be used as a determinant for a view point 
created by:
    1. notebooklm: for substantiating any claims as to why the resultant building block are such
    2. user: for substantiating any counter claims as to why the resultant building block should be otherwise
*/
export type DeterminantQuotationString = string


/*
purpose: represents the determining quotations which contributed to influencing each resultant pattern section of patternBuildingBlocksJson
created by: notebooklm
*/
export type PatternQuotationsJson = {
    "Problem": DeterminantQuotationString[], 
    "Solution": {
        "Step-by-Step": DeterminantQuotationString[], 
        "Cause-&-Effect": DeterminantQuotationString[], 
        "Process View": DeterminantQuotationString[], 
        "Concepts & Relationships": DeterminantQuotationString[], 
        "State Transitions": DeterminantQuotationString[], 
    },
    "Context": DeterminantQuotationString[], 
    "Forces": DeterminantQuotationString[], 
    "Rationale": DeterminantQuotationString[], 
    "Resulting Context": DeterminantQuotationString[], 
    "Related Patterns": DeterminantQuotationString[], 
    "Case-studies": DeterminantQuotationString[], 
    "Simile": DeterminantQuotationString[], 
}
export const patternQuotationsJson: PatternQuotationsJson = {
    "Problem": [],
    "Solution": {
        "Step-by-Step": [],
        "Cause-&-Effect": [],
        "Process View": [],
        "Concepts & Relationships": [],
        "State Transitions": []
    },
    "Context": [],
    "Forces": [],
    "Rationale": [],
    "Resulting Context": [],
    "Related Patterns": [],
    "Case-studies": [],
    "Simile": []
}

/*
purpose: represents the full payload of the conceptualised pattern devoid of specific media formatting
created by: notebooklm
*/
export type PatternResponseJson = {
    "context": ProgressionByTensContextJson,   
    "building-blocks": PatternBuildingBlocksJson,
    "quotations": PatternQuotationsJson
}
export const patternResponseJson: PatternResponseJson = {
    "context": progressionByTensContextJson,
    "building-blocks": patternBuildingBlocksJson,
    "quotations": patternQuotationsJson
}

/*
purpose: represents the influential factors the expert wants to notebooklm to apply to specific pattern sections
created by: user
*/
export type UserInfluentialFactorsJson = {
    "factors"?: string[], /* unsubstantiated factors to inject into notebooklm's awareness for a work task */
    "determinant-quotations"?: DeterminantQuotationString[] /* DeterminantQuotationStrings to inject into notebooklm's awareness for a work task */
}

/*
purpose: represents the overall influential container of factors the expert wants to notebooklm to apply to specific pattern sections
created by: user and submitted as part of the userPatternRequestJson in the initiating user query

note: CauseAndEffectJson objects are only applied to work tasks "Causal-Table" and "Cause-&-Effect"
*/
export type UserDirectExperienceJson = {
    "Problem"?: UserInfluentialFactorsJson,
    "Causal-Table"?: CauseAndEffectJson[],        /* full table additions */
    "Solution"?: {
        "Cause-&-Effect"?: CauseAndEffectJson[],  /* (solution only additions */
        "Step-by-Step"?: UserInfluentialFactorsJson,
        "Process View"?: UserInfluentialFactorsJson,
        "Concepts & Relationships"?: UserInfluentialFactorsJson,
        "State Transitions"?: UserInfluentialFactorsJson,
    },
    "Context"?: UserInfluentialFactorsJson,
    "Forces"?: UserInfluentialFactorsJson,
    "Rationale"?: UserInfluentialFactorsJson,
    "Resulting Context"?: UserInfluentialFactorsJson,
    "Related Patterns"?: UserInfluentialFactorsJson,
    "Case-studies"?: UserInfluentialFactorsJson,
    "Simile"?: UserInfluentialFactorsJson,
}

/*
purpose: represents the parameterised pattern request with optional direct experience to be injected into the pattern generation
created by: user and submitted in the initiating user query
*/
export type UserPatternRequestJson = ProgressionReferenceJson &{
    "directExperience"?: UserDirectExperienceJson;
}