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
export type SubjectJson = {
    "name": string,                     /* subject name (eg. "people of integrity") */
    "focus"?: string[],                 /* focus area (eg. ["associating"]) */
    "enter-from-state": string,         /* from internal|external state (eg. "stress") */
    "exit-to-state": string,            /* to internal|external state (eg. "effluent-free") */
    "target-audience": AudienceKey[],   /* subject's audience (eg. ["conviction-dhamma-follower", "stream-enterer", "once-returner"]) */
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
export type ReferenceJson = {
    "progressionIndex": number, /* 1-based progression index reference in: Which [three] dhammas are very helpful */
    "categoryKey": CategoryKey, /* category key reference in: Which three dhammas are very [helpful]  */
}

/*
purpose: represents the one of the 100 dhammas from the "progressing by tens" framework
created by: notebooklm based on user query specifying: {"progressionIndex": <number>, "categoryKey": <string>}

eg, 'Which three dhammas are very helpful? Associating with people of integrity, listening to the True Dhamma, practicing the Dhamma in accordance with the Dhamma: These three dhammas are very helpful.

scopeJson = { 
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
export type ScopeJson = ReferenceJson &{
    "pattern-name": string, 
    "subject": SubjectJson[], 
}
export const scopeJson: ScopeJson = { 
    "progressionIndex": -1, 
    "categoryKey": "helpful",
    "pattern-name": "",
    "subject": []
}

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
    "co-arised-with"?: boolean, /* boolean value indicating co-arising together (with no order criticality between cause/effect) causal relationship (default: boolean|null)*/
    "not-effect"?: boolean,     /* boolean value indicating inverse of the effect reference (default: boolean|null)*/
    "effect": string,           /* string of the effect in lowercase (eg. "conviction")*/
    "quotation-index"?: number, /* number of the array index position of the directly associated quote where this cause and effect relationship was derived from */
}

/*
purpose: represents a PlantUML diagram used for process view, concepts & relationships, state transitions, and resulting context sections
created by: notebooklm
*/
export type PlantUMLDiagramText = string;

/*
purpose: represents a work task as the property name of the following types: PatternBuildingBlocksJson, PatternQuotationsJson, UserDirectExperienceJson
*/
export type RootWorkTaskKey = "Problem" | "Causal-Table" | "Context" | "Forces" | "Rationale" | "Resulting Context" | "Related Patterns" | "Case-studies" | "Simile";
export type SolutionWorkTaskKey = "Step-by-Step" | "Cause-&-Effect" | "Process View" | "Concepts & Relationships" | "State Transitions";

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
        "Process View": PlantUMLDiagramText[], /* array of PlantUML Activity Diagram strings */
        "Concepts & Relationships": PlantUMLDiagramText[], /* array of PlantUML Class Diagram strings */
        "State Transitions": PlantUMLDiagramText[], /* array of PlantUML State Diagram strings */
    },
    "Context": string[], /* array of requisite condition/invariant strings */
    "Forces": string[], /* array of design constraint/influence strings */
    "Rationale": string, /* string of the rationale statement */
    "Resulting Context": PlantUMLDiagramText[], /* array of PlantUML Mindmap Diagram strings */
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
    "Causal-Table": DeterminantQuotationString[], 
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
    "Causal-Table": [],
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
    "scope": ScopeJson,   
    "building-blocks": PatternBuildingBlocksJson,
    "quotations": PatternQuotationsJson
}
export const patternResponseJson: PatternResponseJson = {
    "scope": scopeJson,
    "building-blocks": patternBuildingBlocksJson,
    "quotations": patternQuotationsJson
}

/*
purpose: represents the resultant search tuple where the "cause-&-effect-table" entries are linked to "quotation-sheet" entries via "quotation-index"
created by: notebooklm

const result: CausalTableResultJson = {}
result["quotation-sheet"][result["cause-&-effect-table"][0]["quotation-index"]] // is the actual quotation for the causal relationship
*/
export type CausalTableResultJson = {
    "cause-&-effect-table": CauseAndEffectJson[],
    "quotation-sheet": DeterminantQuotationString[]
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
export type UserPatternRequestJson = ReferenceJson &{
    "directExperience"?: UserDirectExperienceJson;
}

type Progressions = [string, string, string, string, string, string, string, string, string, string]; // one, two, three, ..., ten

type CategoryCollection = {
    "helpful": Progressions;
    "developed": Progressions;
    "comprehended": Progressions;
    "abandoned": Progressions;
    "decline": Progressions;
    "distinction": Progressions;
    "penetrate": Progressions;
    "arise": Progressions;
    "known": Progressions;
    "realised": Progressions;
}

type ProgressingByTensConfigJson = {
    "index-keys": string[];     // in reference to a progression key (eg. "nine")
    "catagory-keys": string[];  // in reference to a category key (eg. "helpful")
    "catagory-breadcrumb-labels": string[]; // in reference to a context (eg. "Dhammas that are very helpful")
    "pattern-names": CategoryCollection;    // 1-to-1 mapping of pattern-names to answer-excerpts "Heedful, ardent & resolute" -> "Heedfulness with regard to skillful qualities")
    "answer-excerpts": CategoryCollection
}

export type AnswerExcerptReferenceJson = ReferenceJson & {
    excerpt: string
}

class Progression {
    public keyToIndex(progKey: string) {
        const idxLower = progKey.toLowerCase();
        const idxPos = ProgressingByTens.config["index-keys"].indexOf(idxLower);
        return idxPos !== -1 ? idxPos + 1 : -1;
    }

    public indexToKey(index: number) {
        if (index < 1 || index > ProgressingByTens.config["index-keys"].length) 
            return null;
        return ProgressingByTens.config["index-keys"][index - 1];
    }
}

class Category {
    public keyToIndex(categoryKey: string) {
        const idx = ProgressingByTens.config["catagory-keys"].indexOf(categoryKey);
        return idx;
    }

    public indexToKey(categoryIndex: number) {
        if (categoryIndex < 0 || categoryIndex >= ProgressingByTens.config["catagory-keys"].length) 
            return null;
        return ProgressingByTens.config["catagory-keys"][categoryIndex];
    }

    public keyToBreadcrumb(categoryKey: string) {
        const idx = this.keyToIndex(categoryKey);
        if (idx === -1) throw new Error(`Invalid category key: ${categoryKey}`);
        return ProgressingByTens.config["catagory-breadcrumb-labels"][idx];
    }

    public fixBreadcrumbsIfNecessary(ref: ReferenceJson) {
        const categoryIndex = this.keyToIndex(ref.categoryKey);
        if (categoryIndex === -1) throw new Error(`Invalid category key: ${ref.categoryKey}`);
    
        let label = this.keyToBreadcrumb(ref.categoryKey);
        if (ref.progressionIndex === 1) {
            label = label.replace("Dhammas", "Dhamma");
            label = label.replace("are", "is");
        }
        if (!label) throw new Error(`No label found for category key: ${ref.categoryKey}`);
        return label 
    }
}

export class ProgressingByTens {
    public static config: ProgressingByTensConfigJson
    public static progression = new Progression();
    public static category = new Category();

    public static lookupPatternName(ref: ReferenceJson) {
        const categoryIndex = this.category.keyToIndex(ref?.categoryKey);
        if (categoryIndex === -1) throw new Error(`Invalid category key: ${ref?.categoryKey}`);
    
        const progressionIndexAsString = this.progression.indexToKey(ref?.progressionIndex);
        if (!progressionIndexAsString) throw new Error(`Invalid progression index: ${ref?.progressionIndex}`);
    
        const patternNames = this.config["pattern-names"][ref?.categoryKey as CategoryKey];
        if (!patternNames) throw new Error(`No pattern names found for category key: ${ref?.categoryKey}`);
    
        const patternName = patternNames[ref?.progressionIndex - 1];
        if (!patternName) throw new Error(`No pattern name found for category key: ${ref?.categoryKey} and progression index: ${ref?.progressionIndex}`);
        return patternName;
    }

    public static lookupAnswerExcerpt(ref: ReferenceJson) {
        const categoryIndex = this.category.keyToIndex(ref?.categoryKey);
        if (categoryIndex === -1) throw new Error(`Invalid category key: ${ref?.categoryKey}`);
    
        const progressionIndexAsString = this.progression.indexToKey(ref?.progressionIndex);
        if (!progressionIndexAsString) throw new Error(`Invalid progression index: ${ref?.progressionIndex}`);
    
        const answerExcerpts = this.config["answer-excerpts"][ref?.categoryKey as CategoryKey];
        if (!answerExcerpts) throw new Error(`No answer excerpts found for category key: ${ref?.categoryKey}`);
    
        return answerExcerpts[ref?.progressionIndex - 1];
    }

    public static searchAnswerExcerptsForTerm(term: string): AnswerExcerptReferenceJson[] {
        const results: AnswerExcerptReferenceJson[] = [];
        for (const categoryKey in this.config["answer-excerpts"]) {
            const excerpts = this.config["answer-excerpts"][categoryKey as CategoryKey];
            excerpts.forEach((excerpt, index) => {
                if (excerpt.toLowerCase().includes(term.toLowerCase())) {
                    results.push({
                        categoryKey: categoryKey as CategoryKey,
                        progressionIndex: index + 1,
                        excerpt
                    });
                }
            });
        }
        return results;
    }

    public static createRelatedPatternMarkdownLink(ref: ReferenceJson) {
        const patternName = this.lookupPatternName(ref);
        const indexAsString = this.progression.indexToKey(ref.progressionIndex);
        return `/${patternName}/(../${indexAsString}s/${ref.categoryKey}.html)`;
    }

    public static revealContextStatement(ref: ReferenceJson): string {
        const ret = `
Which ${this.progression.indexToKey(ref["progressionIndex"])} ${this.category.fixBreadcrumbsIfNecessary(ref)}? 
${this.lookupAnswerExcerpt(ref)}`
        return ret
    }
    
    public static mimimiseJson(jsonObj: any): any {
        const mimimisedResult: any = Array.isArray(jsonObj) ? [] : {};
        for (const key in jsonObj) {
            const value = jsonObj[key];
            if (Array.isArray(value)) {
                if (value.length > 0) 
                    mimimisedResult[key] = value;
            } else if (typeof value === 'object' && value !== null) {
                const nestedCompressed = this.mimimiseJson(value);
                if (Object.keys(nestedCompressed).length > 0) 
                    mimimisedResult[key] = nestedCompressed;
            } else if (value !== '') 
                mimimisedResult[key] = value;
        }
        return mimimisedResult;
    }

    public static injectUsersDirectExperience(workTask: RootWorkTaskKey, src: UserPatternRequestJson, tar: PatternResponseJson) {
        if (src?.directExperience?.[workTask]) {
            if (workTask === "Causal-Table") {
                // note, users entries will have a "quotation-index" value of -1
                if (src?.directExperience?.[workTask]) 
                    tar["building-blocks"][workTask].push(...src?.directExperience?.[workTask])
            } else {
                if (src?.directExperience?.[workTask]?.["factors"])
                    tar.quotations[workTask].push(...src?.directExperience?.[workTask]?.["factors"])
                if (src?.directExperience?.[workTask]?.["determinant-quotations"])
                    tar.quotations[workTask].push(...src?.directExperience?.[workTask]?.["determinant-quotations"])
            }
        }
    }
}

export abstract class AbstractCausalTableBuilder {
    private maxDepth: number
    public results: CausalTableResultJson = {
            "cause-&-effect-table": [],
            "quotation-sheet": []
        }
    public causalSet = new Set<string>()

    public constructor(maxDepth: number = 12) {
        this.maxDepth = maxDepth
    }

    /*
    purpose: transform fromExpression into a more generalised and common/frequent term if required
        eg 
        "person of integrity" -> "admirable friendship" 
        "restraint of the senses" -> "sense restraint"
        "three forms of right conduct" -> "right conduct"
    */
    public abstract makeExpressionAsGeneralisedAndCommon(fromExpression: string): string

    /*
    purpose: convert a quote with 1 or more causal relationships into a CauseAndEffectJson[] array. note unrelated entries will get dropped later
        eg. 
        'Thus, when associating with people of integrity is made full, it fills [the conditions for] hearing the true Dhamma… conviction… appropriate attention… mindfulness & alertness… restraint of the senses… the three forms of right conduct… the four establishings of mindfulness… the seven factors for awakening. When the seven factors for awakening are made full, they fill [the conditions for] clear knowing & release.
        -> 
        [{"cause": "admirable friendship", "effect": "hearing the true Dhamma", "quotation-index": 4},
        {"cause": "hearing the true Dhamma", "effect": "conviction", "quotation-index": 4},
        {"cause": "conviction", "effect": "appropriate attention", "quotation-index": 4},
        {"cause": "appropriate attention", "effect": "mindfulness & alertness", "quotation-index": 4},
        {"cause": "mindfulness & alertness", "effect": "sense restraint", "quotation-index": 4},
        {"cause": "sense restraint", "effect": "right conduct", "quotation-index": 4},
        {"cause": "right conduct", "effect": "four establishings of mindfulness", "quotation-index": 4},
        {"cause": "four establishings of mindfulness", "effect": "seven factors for awakening", "quotation-index": 4},
        {"cause": "seven factors for awakening", "effect": "clear knowing & release", "quotation-index": 4}]

    */
    public abstract convertFromQuotationToCauseAndEffect(quote: string, quoteIndex: number): CauseAndEffectJson[]
    
    /*
    purpose: search *_nblm.txt sources ONLY for a causal or co-arising relationship quotations for the given searchTerm
        eg. searchTerm = "conviction"
        1. "Monks, as long as the monks have conviction… shame… compunction… learning… aroused persistence… established mindfulness… discernment, the monks' growth can be expected, not their decline"
        2. 'Thus, when associating with people of integrity is made full, it fills [the conditions for] hearing the true Dhamma… conviction… appropriate attention… mindfulness & alertness… restraint of the senses… the three forms of right conduct… the four establishings of mindfulness… the seven factors for awakening. When the seven factors for awakening are made full, they fill [the conditions for] clear knowing & release.
    */
    public abstract searchSourcesForCausalQuotations(searchTerm: string): string[]

    private hasAlreadyBeenProcessed(toCheck: CauseAndEffectJson, ref: string[]): boolean {
        ref[0] = `${toCheck.cause} -> ${toCheck.effect}`
        if (this.causalSet.has(ref[0])) 
            return true
        return false 
    }

    private searchRecursively(searchTerm: string, forward: boolean, level: number) {
        if (level > this.maxDepth) 
            return;
        const quotationMatches = this.searchSourcesForCausalQuotations(searchTerm);
        for (let i = 0; i < quotationMatches.length; i++) {
            const quote = quotationMatches[i]
            let indexPos = this.results["quotation-sheet"].indexOf(quote)
            if (indexPos === -1) {
                indexPos = this.results["quotation-sheet"].length
                this.results["quotation-sheet"].push(quote)
            }
            const causeAndEffects = this.convertFromQuotationToCauseAndEffect(quote, indexPos);
            for (const causeAndEffect of causeAndEffects) {
                if ((forward && causeAndEffect.cause === searchTerm) || (!forward && causeAndEffect.effect === searchTerm)) {
                    const ref: string[] = []
                    if (!this.hasAlreadyBeenProcessed(causeAndEffect, ref)) {
                        this.causalSet.add(ref[0])
                        this.results["cause-&-effect-table"].push(causeAndEffect);
                        const nextTerm = forward ? causeAndEffect.effect : causeAndEffect.cause;
                        this.searchRecursively(nextTerm, forward, level + 1);
                    }
                }
            }
        }
    }

    public clear() {
        this.causalSet.clear()
        this.results["cause-&-effect-table"].length = 0
        this.results["quotation-sheet"].length = 0
    }

    public build(searchTerm: string, bothDirections = true): CausalTableResultJson {
        this.searchRecursively(searchTerm, true, 0);
        if (bothDirections)
            this.searchRecursively(searchTerm, false, 0);
        return this.results;
    }
}



ProgressingByTens.config = {
    "index-keys": [
        "one",
        "two",
        "three",
        "four",
        "five",
        "sixe",
        "seven",
        "eight",
        "nine",
        "ten"
    ],

    "catagory-keys": [
        "helpful",
        "developed",
        "comprehended",
        "abandoned",
        "decline",
        "distinction",
        "penetrate",
        "arise",
        "known",
        "realised"
    ],

    "catagory-breadcrumb-labels": [
        "Dhammas are very helpful",
        "Dhammas should be developed",
        "Dhammas should be comprehended",
        "Dhammas should be abandoned",
        "Dhammas are on the side of decline",
        "Dhammas are on the side of distinction",
        "Dhammas are hard to penetrate",
        "Dhammas should be made to arise",
        "Dhammas should be directly known",
        "Dhammas should be realised"
    ],

    "pattern-names": {
        "helpful": [
            "Heedful, ardent & resolute",
            "Mindfulness & alertness",
            "Factors for stream-entry",
            "Four wheels",
            "Factors for exertion",
            "Amiability",
            "Noble treasures",
            "Leading to discernment",
            "From appropriate attention",
            "Qualities creating a protector"
        ],
        "developed": [
            "Mindfulness immersed in the body",
            "Tranquility & insight",
            "Concentrations wrt directed thought & evaluation",
            "Four establishings of mindfulness",
            "Five-factored right concentration",
            "Recollection",
            "Seven factors for awakening",
            "Noble eightfold path",
            "Purity",
            "Totality-dimensions"
        ],
        "comprehended": [
            "Contact",
            "Name & form",
            "Feelings",
            "Nutriments",
            "Five clinging-aggregates",
            "Six internal sense media",
            "Stations of consciousness",
            "Eight worldly conditions",
            "Abodes for beings",
            "Sense media"
        ],
        "abandoned": [
            "The conceit 'I am'",
            "Ignorance & craving for becoming",
            "Craving",
            "Floods",
            "Hindrances",
            "Classes of craving",
            "Obsessions",
            "Eight forms of wrongness",
            "From craving",
            "Ten forms of wrongness"
        ],
        "decline": [
            "Inappropriate attention",
            "Hard to instruct & evil friendship",
            "Greed, aversion & delusion",
            "Yokes",
            "Mental blockages",
            "Disrespect",
            "Untrue dhammas",
            "Grounds for laziness",
            "Grounds for hatred",
            "Unskillful conduct"
        ],
        "distinction": [
            "Appropriate attention",
            "Easy to instruct & admirable friendship",
            "Non-greed, non-aversion & non-delusion",
            "Unyokings",
            "Five faculties",
            "Respect",
            "True dhammas",
            "Grounds for the arousal of energy",
            "Subduing hatred",
            "Skillful conduct"
        ],
        "penetrate": [
            "Unmediated concentration of awareness",
            "Requisites for defilement & purification",
            "Renunciation, the formless & cessation",
            "Concentration in decline, stability, distinction & penetration",
            "Five properties leading to escape",
            "Six properties that are means of escape",
            "Person of integrity",
            "Untimely situations",
            "Multiplicities",
            "Noble abodes"
        ],
        "arise": [
            "Knowledge of the unprovoked",
            "Knowledge of the ending of effluents & their non-recurrence",
            "Past, present & future",
            "Knowledge of Dhamma, inference, mind reading & conventions",
            "Right concentration with knowledges",
            "Persevering dwellings",
            "Seven perceptions",
            "Thoughts of a great person",
            "Nine perceptions",
            "Ten perceptions"
        ],
        "known": [
            "All beings are maintained by nutriment",
            "Fabricated & unfabricated property",
            "Sensuality, Form & Formless",
            "Four noble truths",
            "Openings to release",
            "Unsurpassed",
            "Grounds for praise",
            "Dimensions of mental mastery",
            "Step-by-step dwellings",
            "Grounds for abolishing"
        ],
        "realised": [
            "Unprovoked release of awareness",
            "Clear knowing & release",
            "Three knowledges: past lives, kamma & the ending of defilements",
            "Noble ones",
            "Dhamma aggregates",
            "Supranormal powers, clairaudience, mind reading ...",
            "Strengths of one whose effluents are ended",
            "Emancipations",
            "Step-by-step cessations",
            "One beyond training"
        ]
    },

  "answer-excerpts": {
        "helpful": [
            "Heedfulness with regard to skillful qualities",
            "Mindfulness & alertness",
            "Associating with people of integrity, listening to the True Dhamma, practicing the Dhamma in accordance with the Dhamma",
            "Four wheels: living in a civilized land, associating with people of integrity, directing oneself rightly, & having done merit in the past.",
            "Five factors for exertion: There is the case, friends, where a monk has conviction, is convinced of the Tathāgata's awakening: 'Indeed, the Blessed One is worthy & rightly self-awakened, consummate in clear-knowing & conduct, well-gone, an expert with regard to the cosmos, unexcelled trainer of people fit to be tamed, teacher of devas & human beings, awakened, blessed.'\n\n'He is free from illness & discomfort, endowed with good digestion—not too cold, not too hot, of moderate strength—fit for exertion.\n\n'He is neither fraudulent nor deceitful. He declares himself to the Teacher or to his observant companions in the holy life in line with what he actually is.\n\n'He keeps his persistence aroused for abandoning unskillful qualities & taking on skillful qualities. He is steadfast, solid in his effort, not shirking his duties with regard to skillful qualities.\n\n'He is discerning, endowed with discernment leading to the arising of the goal—noble, penetrating, leading to the right ending of stress.",
            "Six conditions conducive to amiability: There is the case, friends, where a monk is set on bodily acts of goodwill with regard to his companions in the holy life, to their faces & behind their backs. This is a condition that is conducive to amiability, that engenders feelings of endearment, engenders feelings of respect, leading to a sense of fellowship, a lack of disputes, harmony, & a state of unity.\n\n'And further, the monk is set on verbal acts of goodwill with regard to his companions in the holy life, to their faces & behind their backs. This, too, is a condition that is conducive to amiability, that engenders feelings of endearment, engenders feelings of respect, leading to a sense of fellowship, a lack of disputes, harmony, & a state of unity.\n\n'And further, the monk is set on mental acts of goodwill with regard to his companions in the holy life, to their faces & behind their backs. This, too, is a condition that is conducive to amiability, that engenders feelings of endearment, engenders feelings of respect, leading to a sense of fellowship, a lack of disputes, harmony, & a state of unity.\n\n'And further, whatever righteous gains the monk may obtain in a righteous way—even if only the alms in his bowl—he does not consume them alone. He consumes them after sharing them in common with his virtuous companions in the holy life. This, too, is a condition that is conducive to amiability, that engenders feelings of endearment, engenders feelings of respect, leading to a sense of fellowship, a lack of disputes, harmony, & a state of unity.\n\n'And further—with reference to the virtues that are untorn, unbroken, unspotted, unsplattered, liberating, praised by the observant, ungrasped at, leading to concentration—the monk dwells with his virtue in tune with that of his companions in the holy life, to their faces & behind their backs. This, too, is a condition that is conducive to amiability, that engenders feelings of endearment, engenders feelings of respect, leading to a sense of fellowship, a lack of disputes, harmony, & a state of unity.\n\n'And further—with reference to the view that is noble, leading outward, that leads those who act in accordance with it to the right ending of suffering & stress—the monk dwells with his view in tune with that of his companions in the holy life, to their faces & behind their backs. This, too, is a condition that is conducive to amiability, that engenders feelings of endearment, engenders feelings of respect, leading to a sense of fellowship, a lack of disputes, harmony, & a state of unity.",
            "Seven noble treasures: the treasure of conviction, the treasure of virtue, the treasure of a sense of shame, the treasure of a sense of compunction, the treasure of listening, the treasure of generosity, the treasure of discernment.",
            "Eight causes, eight requisite conditions lead to the acquiring of the as-yet-unacquired discernment that is basic to the holy life, and to the increase, plenitude, development, & culmination of that which has already been acquired. Which eight?\n\n'There is the case, friends, where a monk lives in apprenticeship to the Teacher or to a respectable companion in the holy life in whom he has established a strong sense of shame & compunction, love, & respect. This, monks, is the first cause, the first requisite condition that leads to the acquiring of the as-yet-unacquired discernment that is basic to the holy life, and to the increase, plenitude, development, & culmination of that which has already been acquired.\n\n'As he lives in apprenticeship under the Teacher or under a respectable companion in the holy life in whom he has established a strong sense of shame & compunction, love, & respect, he approaches him at the appropriate times to quiz & cross-question him: 'What, venerable sir, is the meaning of this statement?' He [the Teacher or the respectable companion in the holy life] reveals what is hidden, makes plain what is obscure, and dispels perplexity in many kinds of perplexing things. This is the second cause, the second requisite condition…\n\n'Having heard the Dhamma, he [the student] achieves a twofold seclusion: seclusion in body & seclusion in mind. This is the third cause, the third requisite condition…\n\n'He is virtuous. He dwells restrained in accordance with the Pāṭimokkha, consummate in his behavior & sphere of activity. He trains himself, having undertaken the training rules, seeing danger in the slightest faults. This is the fourth cause, the fourth requisite condition…\n\n'He has heard much, has retained what he has heard, has stored what he has heard. Whatever teachings are admirable in the beginning, admirable in the middle, admirable in the end, that—in their meaning & expression—proclaim the holy life that is entirely perfect, surpassingly pure: Those he has listened to often, retained, discussed, accumulated, examined with his mind, & well penetrated in terms of his views. This is the fifth cause, the fifth requisite condition…\n\n'He keeps his persistence aroused for abandoning unskillful qualities and for taking on skillful qualities. He is steadfast, solid in his effort, not shirking his duties with regard to skillful qualities. This is the sixth cause, the sixth requisite condition…\n\n'When he is in the midst of the Saṅgha he doesn't talk on & on about a variety of things. Either he speaks Dhamma himself or he invites another to do so, and he feels no disdain for noble silence. This is the seventh cause, the seventh requisite condition…\n\n'He remains focused on arising & passing away with regard to the five aggregates: 'Such is form, such its origination, such its disappearance. Such is feeling… Such is perception… Such are fabrications… Such is consciousness, such its origination, such its disappearance.' This, monks, is the eighth cause, the eighth requisite condition that leads to the acquiring of the as-yet-unacquired discernment that is basic to the holy life, and to the increase, plenitude, development, & culmination of that which has already been acquired.",
            "Nine dhammas rooted in appropriate attention: In one who is appropriately attentive, joy is born. When one is joyful, rapture is born. In one who is enraptured at heart, the body grows calm. When the body is calm, one feels pleasure. Feeling pleasure, the mind becomes concentrated. When the mind is concentrated, one knows & sees what has come to be. Knowing & seeing what has come to be, one is disenchanted. Disenchanted, one becomes dispassionate. From dispassion, one is released.",
            "Ten qualities creating a protector: There is the case, friends, where a monk is virtuous. He dwells restrained in accordance with the Pāṭimokkha, consummate in his behavior & sphere of activity. He trains himself, having undertaken the training rules, seeing danger in the slightest faults. And the fact that he is virtuous… seeing danger in the slightest faults is a quality creating a protector.\n\n'And further, the monk has heard much, has retained what he has heard, has stored what he has heard. Whatever teachings are admirable in the beginning, admirable in the middle, admirable in the end, that—in their meaning and expression—proclaim the holy life that is entirely perfect, surpassingly pure: Those he has listened to often, retained, discussed, accumulated, examined with his mind, & well penetrated in terms of his views. And the fact that he has heard much… well penetrated in terms of his views is a quality creating a protector.\n\n'And further, the monk has admirable friends, admirable comrades, admirable companions. And the fact that he has admirable friends, admirable comrades, admirable companions is a quality creating a protector.\n\n'And further, the monk is easy to speak to, endowed with qualities that make him easy to speak to, patient, respectful to instruction. And the fact that he is easy to speak to… respectful to instruction is a quality creating a protector.\n\n'And further, the monk is adept at the various affairs involving his companions in the holy life, is vigorous, quick-witted in the techniques involved in them, is up to doing them or arranging to get them done. And the fact that he is adept at… doing them or arranging to get them done is a quality creating a protector.\n\n'And further, the monk is one who desires the Dhamma, endearing in his conversation, greatly rejoicing in the higher Dhamma & higher Vinaya. And the fact that he is one who desires the Dhamma, endearing in his conversation, greatly rejoicing in the higher Dhamma & higher Vinaya is a quality creating a protector.\n\n'And further, the monk keeps his persistence aroused for abandoning unskillful qualities and for taking on skillful qualities. He is steadfast, solid in his effort, not shirking his duties with regard to skillful qualities. And the fact that he keeps his persistence aroused… not shirking his duties with regard to skillful qualities is a quality creating a protector.\n\n'And further, the monk is content with any old robe cloth at all, any old alms food, any old lodging, any old medicinal requisites for curing sickness at all. And the fact that he is content with any old robe cloth at all, any old alms food, any old lodging, any old medicinal requisites for curing sickness at all is a quality creating a protector.\n\n'And further, the monk is mindful, endowed with excellent proficiency in mindfulness, remembering & recollecting what was done & said a long time ago. And the fact that he is mindful, endowed with excellent proficiency in mindfulness, remembering & recollecting what was done & said a long time ago is a quality creating a protector.\n\n'And further, the monk is discerning, endowed with discernment of arising & passing away—noble, penetrating, leading to the right ending of stress. And the fact that the monk is discerning, endowed with discernment of arising & passing away—noble, penetrating, leading to the right ending of stress is a quality creating a protector."
        ],
        "developed": [
            "Mindfulness immersed in the body connected with joy",
            "Tranquility & insight",
            "Three concentrations: concentration with directed thought & evaluation, concentration without directed thought & with a modicum of evaluation, concentration without directed thought & evaluation.",
            "Four establishings of mindfulness: There is the case, friends, where a monk remains focused on the body in & of itself—ardent, alert, & mindful—subduing greed & distress with reference to the world. He remains focused on feelings in & of themselves—ardent, alert, & mindful—subduing greed & distress with reference to the world. He remains focused on the mind in & of itself—ardent, alert, & mindful—subduing greed & distress with reference to the world. He remains focused on mental qualities in & of themselves—ardent, alert, & mindful—subduing greed & distress with reference to the world.",
            "Five-factored right concentration: suffusion with rapture, suffusion with pleasure, suffusion with awareness, suffusion with light, the theme of reflection.",
            "Six objects of recollection: recollection of the Buddha, recollection of the Dhamma, recollection of the Saṅgha, recollection of virtue, recollection of generosity, recollection of the devas.",
            "Seven factors for awakening: mindfulness as a factor for awakening, analysis of qualities as a factor for awakening, persistence as a factor for awakening, rapture as a factor for awakening, calm as a factor for awakening, concentration as a factor for awakening, equanimity as a factor for awakening.",
            "The noble eightfold path, i e, right view, right resolve, right speech, right action, right livelihood, right effort, right mindfulness, right concentration.",
            "Nine factors of exertion for full purity: the purity-of-virtue factor of exertion for full purity, the purity-of-mind [concentration] factor of exertion for full purity, the purity-of-view factor of exertion for full purity, the purity-of-overcoming-doubt factor of exertion for full purity, the purity-of-knowledge-&-vision-of-what-is-&-is-not the-path factor of exertion for full purity, the purity-of-knowledge-&-vision-of-the-way factor of exertion for full purity, the purity-of-knowledge-&-vision factor of exertion for full purity, the purity-of-discernment factor of exertion for full purity, the purity-of-release factor of exertion for full purity.",
            "Ten totality-dimensions: One perceives the earth-totality above, below, all-around: non-dual [advayaṁ], immeasurable. One perceives the water-totality… the fire-totality… the wind-totality… the blue-totality… the yellow-totality… the red-totality… the white-totality… the space-totality… the consciousness-totality above, below, all-around: non-dual, immeasurable."
        ],
        "comprehended": [
            "Contact accompanied by effluents & subject to clinging",
            "Name & form",
            "Three feelings: a feeling of pleasure, a feeling of pain, a feeling of neither pleasure nor pain.",
            "Four nutriments: physical food, gross or refined; contact as the second; intellectual intention the third; and consciousness the fourth.",
            "Five clinging-aggregates: the form clinging-aggregate, the feeling clinging-aggregate, the perception clinging-aggregate, the fabrication clinging-aggregate, the consciousness clinging-aggregate.",
            "Six internal sense media: the eye as a sense medium, the ear as a sense medium, the nose as a sense medium, the tongue as a sense medium, the body as a sense medium, the intellect as a sense medium.",
            "Seven stations of consciousness: Friends, there are beings with multiplicity of body & multiplicity of perception, such as human beings, some devas, & some beings in the lower realms. This is the first station of consciousness.\n\n'There are beings with multiplicity of body & singularity of perception, such as the devas of Brahmā's retinue generated by the first (jhāna). This is the second station of consciousness.\n\n'There are beings with singularity of body & multiplicity of perception, such as the Radiant Devas. This is the third station of consciousness.\n\n'There are beings with singularity of body & singularity of perception, such as the Beautiful Black Devas. This is the fourth station of consciousness.\n\n'There are beings who, with the complete transcending of perceptions of (physical) form, with the disappearance of perceptions of resistance, and not attending to perceptions of multiplicity, (perceiving,) 'Infinite space,' arrive at the dimension of the infinitude of space. This is the fifth station of consciousness.\n\n'There are beings who, with the complete transcending of the dimension of the infinitude of space, (perceiving,) 'Infinite consciousness,' arrive at the dimension of the infinitude of consciousness. This is the sixth station of consciousness.\n\n'There are beings who, with the complete transcending of the dimension of the infinitude of consciousness, (perceiving,) 'There is nothing,' arrive at the dimension of nothingness. This is the seventh station of consciousness.",
            "Eight worldly conditions: gain, loss, status, disgrace, censure, praise, pleasure, pain.",
            "Nine abodes for beings: There are beings with multiplicity of body & multiplicity of perception, such as human beings, some devas, and some beings in the lower realms. This is the first abode for beings.\n\n'There are beings with multiplicity of body & singularity of perception, such as the devas of Brahmā's retinue generated by the first (jhāna). This is the second abode for beings.\n\n'There are beings with singularity of body & multiplicity of perception, such as the Radiant Devas. This is the third abode for beings.\n\n'There are beings with singularity of body & singularity of perception, such as the Beautiful Black Devas. This is the fourth abode for beings.\n\n'There are beings who are non-percipient, insensitive, such as the Non-percipient-being Devas. This is the fifth abode for beings.\n\n'There are beings who, with the complete transcending of perceptions of (physical) form, with the disappearance of perceptions of resistance, and not attending to perceptions of multiplicity, (perceiving,) 'Infinite space,' arrive at the dimension of the infinitude of space. This is the sixth abode for beings.\n\n'There are beings who, with the complete transcending of the dimension of the infinitude of space, (perceiving,) 'Infinite consciousness,' arrive at the dimension of the infinitude of consciousness. This is the seventh abode for beings.\n\n'There are beings who, with the complete transcending of the dimension of the infinitude of consciousness, (perceiving,) 'There is nothing,' arrive at the dimension of nothingness. This is the eighth abode for beings.\n\n'There are beings who, with the complete transcending of the dimension of nothingness, arrive at the dimension of neither perception nor non-perception. This is the ninth abode for beings.",
            "Ten sense media: the sense medium of the eye, the sense medium of forms; the sense medium of the ear, the sense medium of sounds; the sense medium of the nose, the sense medium of aromas; the sense medium of the tongue, the sense medium of flavors; the sense medium of the body, the sense medium of tactile sensations."
        ],
        "abandoned": [
            "The conceit 'I am'",
            "Ignorance & craving for becoming",
            "Three cravings: craving for sensuality, craving for becoming, craving for non-becoming.",
            "Four floods: the flood of sensuality, the flood of becoming, the flood of views, the flood of ignorance.",
            "Five hindrances: the hindrance of sensual desire, the hindrance of ill will, the hindrance of sloth & drowsiness, the hindrance of restlessness & anxiety, the hindrance of uncertainty.",
            "Six classes of craving: craving for forms, craving for sounds, craving for aromas, craving for flavors, craving for tactile sensations, craving for ideas.",
            "Seven obsessions: the obsession of sensual passion, the obsession of resistance, the obsession of views, the obsession of uncertainty, the obsession of conceit, the obsession of passion for becoming, the obsession of ignorance.",
            "Eight forms of wrongness: wrong view, wrong resolve, wrong speech, wrong action, wrong livelihood, wrong effort, wrong mindfulness, wrong concentration.",
            "Nine dhammas rooted in craving: seeking is dependent on craving; acquisition is dependent on seeking;\n\nascertainment is dependent on acquisition; desire & passion is dependent on ascertainment; attachment is dependent on desire & passion; possessiveness is dependent on attachment; stinginess is dependent on possessiveness; defensiveness is dependent on stinginess; and because of defensiveness, dependent on defensiveness, various evil, unskillful phenomena come into play: the taking up of sticks & knives; conflicts, quarrels, & disputes; accusations, divisive speech, & lies.",
            "Ten forms of wrongness: wrong view, wrong resolve, wrong speech, wrong action, wrong livelihood, wrong effort, wrong mindfulness, wrong concentration, wrong knowledge, wrong release."
        ],
        "decline": [
            "Inappropriate attention",
            "Being hard to instruct & evil friendship",
            "Three roots of what is unskillful: greed as a root of what is unskillful, aversion as a root of what is unskillful, delusion as a root of what is unskillful.",
            "Four yokes: the yoke of sensuality, the yoke of becoming, the yoke of views, the yoke of ignorance.",
            "Five mental blockages: There is the case, friends, where a monk is doubtful, uncertain, indecisive about the Teacher and is not confident in him. When a monk is doubtful, uncertain, indecisive about the Teacher and is not confident in him, then his mind doesn't tend toward ardency, commitment, perseverance, or exertion. When one's mind doesn't tend toward ardency, commitment, perseverance, or exertion, that is the first mental blockage.\n\n'There is the case where a monk is doubtful, uncertain, indecisive about the Dhamma… about the Saṅgha… about the training…\n\n'There is the case where a monk is angered & unhappy with his fellows in the holy life, his mind rigid & hostile. When a monk is angered & unhappy with his fellows in the holy life, his mind rigid & hostile, then his mind doesn't tend toward ardency, commitment, perseverance, or exertion. When one's mind doesn't tend toward ardency, commitment, perseverance, or exertion, that is the fifth mental blockage.",
            "Six types of disrespect: There is the case, friends, where a monk dwells without respect or deference for the Teacher… for the Dhamma… for the Saṅgha… for the training… for heedfulness… for welcoming manners.",
            "Seven untrue dhammas: There is the case, friends, where a monk is without conviction, without a sense of shame, without compunction, without learning, lazy, one of muddled truth, & undiscerning.",
            "Eight grounds for laziness: There is the case, friends, where a monk has some work to do. The thought occurs to him: 'I will have to do this work. But when I have done this work, my body will be tired. Why don't I lie down?' So he lies down. He doesn't make an effort for the attaining of the as-yet-unattained, the reaching of the as-yet-unreached, the realization of the as-yet-unrealized. This is the first ground for laziness.\n\n'Then there is the case where a monk has done some work. The thought occurs to him: 'I have done some work. Now that I have done work, my body is tired. Why don't I lie down?' So he lies down. He doesn't make an effort for the attaining of the as-yet-unattained, the reaching of the as-yet-unreached, the realization of the as-yet-unrealized. This is the second ground for laziness.\n\n'Then there is the case where a monk has to go on a journey. The thought occurs to him: 'I will have to go on this journey. But when I have gone on the journey, my body will be tired. Why don't I lie down?' So he lies down. He doesn't make an effort for the attaining of the as-yet-unattained, the reaching of the as-yet-unreached, the realization of the as-yet-unrealized. This is the third ground for laziness.\n\n'Then there is the case where a monk has gone on a journey. The thought occurs to him: 'I have gone on a journey. Now that I have gone on a journey, my body is tired. Why don't I lie down?' So he lies down. He doesn't make an effort for the attaining of the as-yet-unattained, the reaching of the as-yet-unreached, the realization of the as-yet-unrealized. This is the fourth ground for laziness.\n\n'Then there is the case where a monk, having gone for alms in a village or town, does not get as much coarse or refined food as he would like for his fill. The thought occurs to him: 'I, having gone for alms in a village or town, have not gotten as much coarse or refined food as I would like for my fill. This body of mine is tired & unsuitable for work. Why don't I lie down?' So he lies down. He doesn't make an effort for the attaining of the as-yet-unattained, the reaching of the as-yet-unreached, the realization of the as-yet-unrealized. This is the fifth ground for laziness.\n\n'Then there is the case where a monk, having gone for alms in a village or town, gets as much coarse or refined food as he would like for his fill. The thought occurs to him: 'I, having gone for alms in a village or town, have gotten as much coarse or refined food as I would like for my fill. This body of mine is heavy & unsuitable for work—stuffed with beans, as it were. Why don't I lie down?' So he lies down. He doesn't make an effort for the attaining of the as-yet-unattained, the reaching of the as-yet-unreached, the realization of the as-yet-unrealized. This is the sixth ground for laziness.\n\n'Then there is the case where a monk comes down with a slight illness. The thought occurs to him: 'I have come down with a slight illness. There's a need to lie down.' So he lies down. He doesn't make an effort for the attaining of the as-yet-unattained, the reaching of the as-yet-unreached, the realization of the as-yet-unrealized. This is the seventh ground for laziness.\n\n'Then there is the case where a monk has recovered from his illness, not long after his recovery. The thought occurs to him: 'I have recovered from my illness. It's not long after my recovery. This body of mine is weak & unsuitable for work. Why don't I lie down?' So he lies down. He doesn't make an effort for the attaining of the as-yet-unattained, the reaching of the as-yet-unreached, the realization of the as-yet-unrealized. This is the eighth ground for laziness.",
            "Nine grounds for hatred: '(Thinking,) 'He has done me harm,' one binds hatred. 'He is doing me harm,' one binds hatred. 'He is going to do me harm,' one binds hatred. 'He has done harm to people who are dear & pleasing to me,' one binds hatred. 'He is doing harm to people who are dear & pleasing to me,' one binds hatred. 'He is going to do harm to people who are dear & pleasing to me,' one binds hatred. 'He has aided people who are not dear or pleasing to me,' one binds hatred. 'He is aiding people who are not dear or pleasing to me,' one binds hatred. 'He is going to aid people who are not dear or pleasing to me,' one binds hatred.",
            "Ten unskillful courses of action: taking life, taking what is not given, sexual misconduct, telling lies, divisive speech, harsh speech, idle chatter, greed, ill will, wrong view."
        ],
        "distinction": [
            "Appropriate attention",
            "Being easy to instruct & admirable friendship",
            "Three roots of what is skillful: lack of greed as a root of what is skillful, lack of aversion as a root of what is skillful, lack of delusion as a root of what is skillful.",
            "Four unyokings: the unyoking of the yoke of sensuality, the unyoking of the yoke of becoming, the unyoking of the yoke of views, the unyoking of the yoke of ignorance.",
            "Five faculties: the faculty of conviction, the faculty of persistence, the faculty of mindfulness, the faculty of concentration, the faculty of discernment.",
            "Six types of respect: There is the case, friends, where a monk dwells with respect & deference for the Teacher… for the Dhamma… for the Saṅgha… for the training… for heedfulness… for welcoming manners.",
            "Seven true dhammas: There is the case, friends, where a monk has conviction, a sense of shame, compunction, learning, and is one of aroused persistence, established mindfulness, & discerning.",
            "Eight grounds for the arousal of energy: There is the case, friends, where a monk has some work to do. The thought occurs to him: 'I will have to do this work. But when I am doing this work, it will not be easy to attend to the Buddha's message. Why don't I make an effort beforehand for the attaining of the as-yet-unattained, the reaching of the as-yet-unreached, the realization of the as-yet-unrealized?' So he makes an effort for the attaining of the as-yet-unattained, the reaching of the as-yet-unreached, the realization of the as-yet-unrealized. This is the first ground for the arousal of energy.\n\n'Then there is the case where a monk has done some work. The thought occurs to him: 'I have done some work. While I was doing work, I couldn't attend to the Buddha's message. Why don't I make an effort for the attaining of the as-yet-unattained, the reaching of the as-yet-unreached, the realization of the as-yet-unrealized?' So he makes an effort for the attaining of the as-yet-unattained, the reaching of the as-yet-unreached, the realization of the as-yet-unrealized. This is the second ground for the arousal of energy.\n\n'Then there is the case where a monk has to go on a journey. The thought occurs to him: 'I will have to go on this journey. But when I am going on the journey, it will not be easy to attend to the Buddha's message. Why don't I make an effort beforehand for the attaining of the as-yet-unattained, the reaching of the as-yet-unreached, the realization of the as-yet-unrealized?' So he makes an effort for the attaining of the as-yet-unattained, the reaching of the as-yet-unreached, the realization of the as-yet-unrealized. This is the third ground for the arousal of energy.\n\n'Then there is the case where a monk has gone on a journey. The thought occurs to him: 'I have gone on a journey. While I was going on the journey, I couldn't attend to the Buddha's message. Why don't I make an effort for the attaining of the as-yet-unattained, the reaching of the as-yet-unreached, the realization of the as-yet-unrealized?' So he makes an effort for the attaining of the as-yet-unattained, the reaching of the as-yet-unreached, the realization of the as-yet-unrealized. This is the fourth ground for the arousal of energy.\n\n'Then there is the case where a monk, having gone for alms in a village or town, does not get as much coarse or refined food as he would like for his fill. The thought occurs to him: 'I, having gone for alms in a village or town, have not gotten as much coarse or refined food as I would like for my fill. This body of mine is light & suitable for work. Why don't I make an effort for the attaining of the as-yet-unattained, the reaching of the as-yet-unreached, the realization of the as-yet-unrealized?' So he makes an effort for the attaining of the as-yet-unattained, the reaching of the as-yet-unreached, the realization of the as-yet-unrealized. This is the fifth ground for the arousal of energy.\n\n'Then there is the case where a monk, having gone for alms in a village or town, gets as much coarse or refined food as he would like for his fill. The thought occurs to him: 'I, having gone for alms in a village or town, have gotten as much coarse or refined food as I would like for my fill. This body of mine is light & suitable for work. Why don't I make an effort for the attaining of the as-yet-unattained, the reaching of the as-yet-unreached, the realization of the as-yet-unrealized?' So he makes an effort for the attaining of the as-yet-unattained, the reaching of the as-yet-unreached, the realization of the as-yet-unrealized. This is the sixth ground for the arousal of energy.\n\n'Then there is the case where a monk comes down with a slight illness. The thought occurs to him: 'I have come down with a slight illness. Now, there's the possibility that it could get worse. Why don't I make an effort beforehand for the attaining of the as-yet-unattained, the reaching of the as-yet-unreached, the realization of the as-yet-unrealized?' So he makes an effort for the attaining of the as-yet-unattained, the reaching of the as-yet-unreached, the realization of the as-yet-unrealized. This is the seventh ground for the arousal of energy.\n\n'Then there is the case where a monk has recovered from his illness, not long after his recovery. The thought occurs to him: 'I have recovered from my illness. It's not long after my recovery. Now, there's the possibility that the illness could come back. Why don't I make an effort beforehand for the attaining of the as-yet-unattained, the reaching of the as-yet-unreached, the realization of the as-yet-unrealized?' So he makes an effort for the attaining of the as-yet-unattained, the reaching of the as-yet-unreached, the realization of the as-yet-unrealized. This is the eighth ground for the arousal of energy.",
            "Nine ways of subduing hatred: (Thinking,) 'He has done me harm. But what should I expect?' one subdues hatred. 'He is doing me harm. But what should I expect?' one subdues hatred. 'He is going to do me harm. But what should I expect?' one subdues hatred. 'He has done harm to people who are dear & pleasing to me. But what should I expect?' one subdues hatred. 'He is doing harm to people who are dear & pleasing to me. But what should I expect?' one subdues hatred. 'He is going to do harm to people who are dear & pleasing to me. But what should I expect?' one subdues hatred. 'He has aided people who are not dear or pleasing to me. But what should I expect?' one subdues hatred. 'He is aiding people who are not dear or pleasing to me. But what should I expect?' one subdues hatred. 'He is going to aid people who are not dear or pleasing to me. But what should I expect?' one subdues hatred.",
            "Ten skillful courses of action: refraining from taking life, refraining from taking what is not given, refraining from sexual misconduct, refraining from telling lies, refraining from divisive speech, refraining from harsh speech, refraining from idle chatter, non-greed, non-ill will, right view."
        ],
        "penetrate": [
            "Unmediated concentration of awareness",
            "The cause & condition for the defilement of beings and the cause & condition for the purification of beings",
            "Three properties for escape: This is the escape from sensuality: renunciation. This is the escape from form: the formless. As for whatever has come into being, is fabricated, & is dependently co-arisen, the escape from that is cessation.",
            "Four concentrations: concentration that has a share in decline, concentration that has a share in stability, concentration that has a share in distinction, concentration that has a share in penetration.",
            "Five properties leading to escape: There is the case, friends, where the mind of a monk, when attending to sensuality, doesn't leap up at sensuality, doesn't grow confident, steadfast, or released in sensuality. But when attending to renunciation, his mind leaps up at renunciation, grows confident, steadfast, & released in renunciation. When his mind is rightly-gone, rightly developed, has rightly risen above, gained release, & become disjoined from sensuality, then whatever effluents, torments, & fevers there are that arise in dependence on sensuality, he is released from them. He doesn't experience that feeling. This is expounded as the escape from sensuality.\n\n'And further, there is the case where the mind of a monk, when attending to ill will, doesn't leap up at ill will, doesn't grow confident, steadfast, or released in ill will. But when attending to non-ill will, his mind leaps up at non-ill will, grows confident, steadfast, & released in non-ill will. When his mind is rightly-gone, rightly developed, has rightly risen above, gained release, & become disjoined from ill will, then whatever effluents, torments, & fevers there are that arise in dependence on ill will, he is released from them. He doesn't experience that feeling. This is expounded as the escape from ill will.\n\n'And further, there is the case where the mind of a monk, when attending to harmfulness, doesn't leap up at harmfulness, doesn't grow confident, steadfast, or released in harmfulness. But when attending to harmlessness, his mind leaps up at harmlessness, grows confident, steadfast, & released in harmlessness. When his mind is rightly-gone, rightly developed, has rightly risen above, gained release, & become disjoined from harmfulness, then whatever effluents, torments, & fevers there are that arise in dependence on harmfulness, he is released from them. He doesn't experience that feeling. This is expounded as the escape from harmfulness.\n\n'And further, there is the case where the mind of a monk, when attending to forms, doesn't leap up at forms, doesn't grow confident, steadfast, or released in forms. But when attending to the formless, his mind leaps up at the formless, grows confident, steadfast, & released in the formless. When his mind is rightly-gone, rightly developed, has rightly risen above, gained release, & become disjoined from forms, then whatever effluents, torments, & fevers there are that arise in dependence on forms, he is released from them. He doesn't experience that feeling. This is expounded as the escape from forms.\n\n'And further, there is the case where the mind of a monk, when attending to self-identification, doesn't leap up at self-identification, doesn't grow confident, steadfast, or released in self-identification. But when attending to the cessation of self-identification, his mind leaps up at the cessation of self-identification, grows confident, steadfast, & released in the cessation of self-identification. When his mind is rightly-gone, rightly developed, has rightly risen above, gained release, & become disjoined from self-identification, then whatever effluents, torments, & fevers there are that arise in dependence on self-identification, he is released from them. He doesn't experience that feeling. This is expounded as the escape from self-identification.",
            "Six properties that are means of escape: There is the case, friends, where a monk might say, 'Although goodwill has been developed, pursued, handed the reins, taken as a basis, steadied, consolidated, & well undertaken by me as my awareness-release, still ill will keeps overpowering my mind.' He should be told, 'Don't say that. You shouldn't speak in that way. Don't misrepresent the Blessed One, for it's not right to misrepresent the Blessed One, and the Blessed One wouldn't say that. It's impossible, there is no way that—when goodwill has been developed, pursued, handed the reins, taken as a basis, steadied, consolidated, & well undertaken as an awareness-release—ill will would still keep overpowering the mind. That possibility doesn't exist, for this is the escape from ill will: goodwill as an awareness-release.'\n\n'And further, there is the case where a monk might say, 'Although compassion has been developed, pursued, handed the reins, taken as a basis, steadied, consolidated, & well undertaken by me as my awareness-release, still harmfulness keeps overpowering my mind.' He should be told, 'Don't say that. You shouldn't speak in that way. Don't misrepresent the Blessed One, for it's not right to misrepresent the Blessed One, and the Blessed One wouldn't say that. It's impossible, there is no way that—when compassion has been developed, pursued, handed the reins, taken as a basis, steadied, consolidated, & well undertaken as an awareness-release—harmfulness would still keep overpowering the mind. That possibility doesn't exist, for this is the escape from harmfulness: compassion as an awareness-release.'\n\n'And further, there is the case where a monk might say, 'Although empathetic joy has been developed, pursued, handed the reins, taken as a basis, steadied, consolidated, & well undertaken by me as my awareness-release, still resentment keeps overpowering my mind.' He should be told, 'Don't say that. You shouldn't speak in that way. Don't misrepresent the Blessed One, for it's not right to misrepresent the Blessed One, and the Blessed One wouldn't say that. It's impossible, there is no way that—when empathetic joy has been developed, pursued, handed the reins, taken as a basis, steadied, consolidated, & well undertaken as an awareness-release—resentment would still keep overpowering the mind. That possibility doesn't exist, for this is the escape from resentment: empathetic joy as an awareness-release.'\n\n'And further, there is the case where a monk might say, 'Although equanimity has been developed, pursued, handed the reins, taken as a basis, steadied, consolidated, & well undertaken by me as my awareness-release, still passion keeps overpowering my mind.' He should be told, 'Don't say that. You shouldn't speak in that way. Don't misrepresent the Blessed One, for it's not right to misrepresent the Blessed One, and the Blessed One wouldn't say that. It's impossible, there is no way that—when equanimity has been developed, pursued, handed the reins, taken as a basis, steadied, consolidated, & well undertaken as an awareness-release—passion would still keep overpowering the mind. That possibility doesn't exist, for this is the escape from passion: equanimity as an awareness-release.'\n\n'And further, there is the case where a monk might say, 'Although the signless has been developed, pursued, handed the reins, taken as a basis, steadied, consolidated, & well undertaken by me as my awareness-release, still my consciousness follows the drift of signs.' He should be told, 'Don't say that. You shouldn't speak in that way. Don't misrepresent the Blessed One, for it's not right to misrepresent the Blessed One, and the Blessed One wouldn't say that. It's impossible, there is no way that—when the signless has been developed, pursued, handed the reins, taken as a basis, steadied, consolidated, & well undertaken as an awareness-release—consciousness would follow the drift of signs. That possibility doesn't exist, for this is the escape from all signs: the signless as an awareness-release.'\n\n'And further, there is the case where a monk might say, 'Although 'I am' is gone, and I do not assume that 'I am this,' still the arrow of uncertainty & perplexity keeps overpowering my mind.' He should be told, 'Don't say that. You shouldn't speak in that way. Don't misrepresent the Blessed One, for it's not right to misrepresent the Blessed One, and the Blessed One wouldn't say that. It's impossible, there is no way that—when 'I am' is gone, and 'I am this' is not assumed—the arrow of uncertainty & perplexity would keep overpowering the mind. That possibility doesn't exist, for this is the escape from the arrow of uncertainty & perplexity: the uprooting of the conceit, 'I am'.'",
            "Seven qualities of a person of integrity: There is the case, friends, where a monk is one with a sense of Dhamma, a sense of meaning, a sense of himself, a sense of moderation, a sense of time, a sense of social gatherings, & a sense of distinctions among individuals.",
            "Eight inopportune, untimely situations for leading the holy life: There is the case, friends, where a Tathāgata appears in the world, worthy & rightly self-awakened. The Dhamma is taught that leads to stilling, to total unbinding, to self-awakening as declared by One Well-gone. But this person is reborn in hell. This is the first inopportune, untimely situation for leading the holy life.\n\n'And further, there is the case where a Tathāgata appears in the world… but this person is reborn in an animal womb… in the realm of the hungry ghosts… in a certain host of long-lived devas… or he is born in a border region among ignorant barbarians where there is no opening for monks, nuns, male lay followers, or female lay followers to go.…\n\n'Or he is born in the Middle Country [the middle Ganges Valley] but he has wrong views & skewed vision: 'There is nothing given, nothing offered, nothing sacrificed. There is no fruit or result of good or bad actions. There is no this world, no next world, no mother, no father; there are no spontaneously reborn beings; there are no contemplatives or brahmans who, faring rightly & practicing rightly, proclaim this world & the next after having directly known & realized it for themselves.' …\n\n'Or he is born in the Middle Country but he is undiscerning, dull, drooling, incapable of knowing the meaning of what is well-said or ill-said. This is the seventh inopportune, untimely situation for leading the holy life.\n\n'And further, a Tathāgata does not appear in the world, worthy & rightly self-awakened. The Dhamma is not taught that leads to stilling, to total unbinding, to self-awakening as declared by One Well-gone. This person is born in the Middle Country and is discerning, not dull, not drooling, capable of knowing the meaning of what is well-said or ill-said. This is the eighth inopportune, untimely situation for leading the holy life.",
            "Nine multiplicities: Dependent on a multiplicity of properties, there arises a multiplicity of contacts. Dependent on a multiplicity of contacts, there arises a multiplicity of feelings. Dependent on a multiplicity of feelings, there arises a multiplicity of perceptions. Dependent on a multiplicity of perceptions, there arises a multiplicity of resolves. Dependent on a multiplicity of resolves, there arises a multiplicity of desires. Dependent on a multiplicity of desires, there arises a multiplicity of fevers. Dependent on a multiplicity of fevers, there arises a multiplicity of searches. Dependent on a multiplicity of searches, there arises a multiplicity of gains.",
            "Ten noble abodes: There is the case, friends, where a monk has abandoned five factors, is endowed with six, guards one, is supported in four, has shaken off idiosyncratic truths, has thoroughly given up searching, is undisturbed in his resolves, is calmed in his bodily-fabrication, is well released in mind, is well released in discernment.\n\n'And how has a monk abandoned five factors? There is the case where a monk's sensual desire is abandoned. His ill will… His sloth & torpor… His restlessness & anxiety… His uncertainty is abandoned. This is how a monk has abandoned five factors.\n\n'And how is a monk endowed with six (factors)? There is the case where a monk, on seeing a form via the eye, is neither gladdened nor saddened, but remains equanimous, mindful, & alert. On hearing a sound via the ear… On smelling an aroma via the nose… On tasting a flavor via the tongue… On touching a tactile sensation via the body… On cognizing an idea via the intellect, he is neither gladdened nor saddened, but remains equanimous, mindful, & alert. This is how a monk is endowed with six (factors).\n\n'And how does a monk guard one (factor)? There is the case where a monk is endowed with an awareness guarded by mindfulness. This is how a monk guards one (factor).\n\n'And how is a monk supported in four (ways)? There is the case where a monk, carefully reflecting, associates with one thing, acquiesces to another, avoids another, & subdues another. This is how a monk is supported in four (ways).\n\n'And how has a monk shaken off idiosyncratic truths [pacceka-sacca]? There is the case where a monk has shaken off the run-of-the-mill idiosyncratic truths of run-of-the-mill contemplatives & brahmans—in other words, 'The cosmos is eternal,' 'The cosmos is not eternal,' 'The cosmos is finite,' 'The cosmos is infinite,' 'The soul & the body are the same,' 'The soul is one thing and the body another,' 'After death a Tathāgata exists,' 'After death a Tathāgata does not exist,' 'After death a Tathāgata both does & does not exist,' 'After death a Tathāgata neither does nor does not exist.' All of these he has thrown off, shaken off, renounced, vomited up, let go, abandoned, relinquished. This is how a monk has shaken off idiosyncratic truths.\n\n'And how has a monk thoroughly given up searching? There is the case where a monk has abandoned his search for sensuality, has abandoned his search for becoming, and has allayed his search for a holy life. This is how a monk has thoroughly given up searching.\n\n'And how is a monk undisturbed in his resolves? There is the case where a monk has abandoned his resolve for sensuality… his resolve for ill-will… his resolve for harmfulness. This is how a monk is undisturbed in his resolves.\n\n'And how is a monk calmed in his bodily fabrication? There is the case where a monk, with the abandoning of pleasure & pain—as with the earlier disappearance of elation & distress—enters & remains in the fourth jhāna: purity of equanimity & mindfulness, neither pleasure nor pain. This is how a monk is calmed in his bodily fabrication.\n\n'And how is a monk well released in mind? There is the case where a monk's mind is released from passion, released from aversion, released from delusion. This is how a monk is well released in mind.\n\n'And how is a monk well released in discernment? There is the case where a monk discerns, 'Passion is abandoned in me, its root destroyed, made like a palmyra stump, deprived of the conditions of development, not destined for future arising.' He discerns, 'Aversion is abandoned in me, its root destroyed, made like a palmyra stump, deprived of the conditions of development, not destined for future arising.' He discerns, 'Delusion is abandoned in me, its root destroyed, made like a palmyra stump, deprived of the conditions of development, not destined for future arising.' This is how a monk is well released in discernment."
        ],
        "arise": [
            "Knowledge of the unprovoked [or: unprovoked knowledge]",
            "Two knowledges: knowledge of the ending (of the effluents) & knowledge of (their) non-recurrence.",
            "Three knowledges: knowledge of the past, knowledge of the future, & knowledge of the present.",
            "Four knowledges: knowledge with regard to the Dhamma, knowledge with regard to inference, knowledge with regard to encompassing (the minds of others), knowledge of conventions.",
            "Right concentration with knowledges: The knowledge arises right within oneself that 'This concentration is blissful in the present & will result in bliss in the future.'\n\n'The knowledge arises right within oneself that 'This concentration is noble & not connected with the baits of the flesh.'\n\n'The knowledge arises right within oneself that 'This concentration is not obtained by base people.'\n\n'The knowledge arises right within oneself that 'This concentration is peaceful, exquisite, the acquiring of calm, the attainment of unification, not kept in place by the fabrications of forceful restraint.'\n\n'The knowledge arises right within oneself that 'I enter into this concentration mindfully, & mindfully I emerge from it.'",
            "Six persevering dwellings: There is the case, friends, where a monk, on seeing a form via the eye, is neither gladdened nor saddened, but remains equanimous, mindful, & alert. On hearing a sound via the ear… On smelling an aroma via the nose… On tasting a flavor via the tongue… On sensing a tactile sensation via the body… On cognizing an idea via the intellect, he is neither gladdened nor saddened, but remains equanimous, mindful, & alert.",
            "Seven perceptions: the perception of inconstancy, the perception of not-self, the perception of unattractiveness, the perception of drawbacks, the perception of abandoning, the perception of dispassion, the perception of cessation.",
            "Eight thoughts of a great person: 'This Dhamma is for one who is modest, not for one who is self-aggrandizing. This Dhamma is for one who is content, not for one who is discontent. This Dhamma is for one who is reclusive, not for one who is entangled. This Dhamma is for one whose persistence is aroused, not for one who is lazy. This Dhamma is for one whose mindfulness is established, not for one whose mindfulness is confused. This Dhamma is for one whose mind is concentrated, not for one whose mind is unconcentrated. This Dhamma is for one endowed with discernment, not for one whose discernment is weak. This Dhamma is for one who enjoys non-objectification, who delights in non-objectification, not for one who enjoys & delights in objectification.'",
            "Nine perceptions: the perception of unattractiveness, the perception of death, the perception of loathsomeness in food, the perception of distaste for every world, the perception of inconstancy, the perception of stress in what is inconstant, the perception of not-self in what is stressful, the perception of abandoning, the perception of dispassion.",
            "Ten perceptions: the perception of unattractiveness, the perception of death, the perception of loathsomeness in food, the perception of distaste for every world, the perception of inconstancy, the perception of stress in what is inconstant, the perception of not-self in what is stressful, the perception of abandoning, the perception of dispassion, the perception of cessation."
        ],
        "known": [
            "All beings are maintained by nutriment",
            "Two properties: the fabricated property & the unfabricated property.",
            "Three properties: the property of sensuality, the property of form, the property of the formless.",
            "Four noble truths: the noble truth of stress, the noble truth of the origination of stress, the noble truth of the cessation of stress, the noble truth of the path of practice leading to the cessation of stress.",
            "Five openings to release: 'There is the case, friends, where the Teacher or a fellow person leading the holy life teaches the Dhamma to a monk. And in whatever way the Teacher or a fellow person leading the holy life teaches the Dhamma to the monk, in just that way the monk, with regard to that Dhamma, is sensitive to the meaning, is sensitive to the Dhamma. In him—sensitive to the meaning, sensitive to the Dhamma—joy is born. When he is joyful, rapture is born. In one who is enraptured at heart, the body grows calm. When the body is calm, one feels pleasure. Feeling pleasure, the mind becomes concentrated. This is the first opening to release.\n\n'And further, it's not that the Teacher or a fellow person leading the holy life teaches the Dhamma to the monk. But the monk teaches the Dhamma to others in detail, as he has heard it, as he has learned it. And in whatever way he teaches the Dhamma to others in detail, as he has heard it, as he has learned it, in just that way the monk, with regard to that Dhamma, is sensitive to the meaning, is sensitive to the Dhamma. In him—sensitive to the meaning, sensitive to the Dhamma—joy is born. When he is joyful, rapture is born. In one who is enraptured at heart, the body grows calm. When the body is calm, one feels pleasure. Feeling pleasure, the mind becomes concentrated. This is the second opening to release.\n\n'And further, it's not that the Teacher or a fellow person leading the holy life teaches the Dhamma to the monk, nor does the monk teach the Dhamma to others in detail, as he has heard it, as he has learned it. But he recites the Dhamma in detail, as he has heard it, as he has learned it. In whatever way he recites the Dhamma in detail, as he has heard it, as he has learned it, in just that way the monk, with regard to that Dhamma, is sensitive to the meaning, is sensitive to the Dhamma. In him—sensitive to the meaning, sensitive to the Dhamma—joy is born. When he is joyful, rapture is born. In one who is enraptured at heart, the body grows calm. When the body is calm, one feels pleasure. Feeling pleasure, the mind becomes concentrated. This is the third opening to release.\n\n'And further, it's not that the Teacher or a fellow person leading the holy life teaches the Dhamma to the monk; nor does the monk teach the Dhamma to others in detail, as he has heard it, as he has learned it; nor does he recite the Dhamma in detail, as he has heard it, as he has learned it. But in his awareness he directs his thoughts to the Dhamma in detail, as he has heard it, as he has learned it; he evaluates it, & mentally examines it. In whatever way he, in his awareness, directs his thoughts to the Dhamma in detail, as he has heard it, as he has learned it, evaluates it, & mentally examines it, in just that way the monk, with regard to that Dhamma, is sensitive to the meaning, is sensitive to the Dhamma. In him—sensitive to the meaning, sensitive to the Dhamma—joy is born. When he is joyful, rapture is born. In one who is enraptured at heart, the body grows calm. When the body is calm, one feels pleasure. Feeling pleasure, the mind becomes concentrated. This is the fourth opening to release.\n\n'And further, it's not that the Teacher or a fellow person leading the holy life teaches the Dhamma to the monk; nor does the monk teach the Dhamma to others in detail, as he has heard it, as he has learned it; nor does he recite the Dhamma in detail, as he has heard it, as he has learned it; nor does he, in his awareness, direct his thoughts to the Dhamma in detail, as he has heard it, as he has learned it, evaluate it, or mentally examine it. But he has well grasped a certain theme of concentration, has attended to it well, sustained it well, has penetrated it well with discernment. In whatever way he has well grasped a certain theme of concentration, has attended to it well, sustained it well, has penetrated it well with discernment, in just that way the monk, with regard to that Dhamma, is sensitive to the meaning, is sensitive to the Dhamma. In him—sensitive to the meaning, sensitive to the Dhamma—joy is born. When he is joyful, rapture is born. In one who is enraptured at heart, the body grows calm. When the body is calm, one feels pleasure. Feeling pleasure, the mind becomes concentrated. This is the fifth opening to release.",
            "Six things that are unsurpassed: unsurpassed vision, unsurpassed hearing, unsurpassed gains, unsurpassed trainings, unsurpassed service, unsurpassed objects of recollection.",
            "Seven grounds for praise: There is the case, friends, where a monk has keen desire to undertake the training & has not discarded his love for undertaking the training in the future. He has keen desire to attend carefully to the Dhamma… to subdue his wants… to find solitude… to arouse persistence… to be mindful & adept… to penetrate (right) view & has not discarded his love for penetrating (right) view in the future.",
            "Eight dimensions of (mental) mastery: One percipient of form internally sees forms externally as limited, beautiful & ugly. Mastering them, he is percipient of 'I know; I see.' This is the first dimension of (mental) mastery.\n\n'One percipient of form internally sees forms externally as immeasurable, beautiful & ugly. Mastering them, he is percipient of 'I know; I see.' This is the second dimension of (mental) mastery.\n\n'One percipient of the formless internally sees forms externally as limited, beautiful & ugly. Mastering them, he is percipient of 'I know; I see.' This is the third dimension of (mental) mastery.\n\n'One percipient of the formless internally sees forms externally as immeasurable, beautiful & ugly. Mastering them, he is percipient of 'I know; I see.' This is the fourth dimension of (mental) mastery.\n\n'One percipient of the formless internally sees forms externally as blue, blue in their color, blue in their features, blue in their glow. Just as a flax-flower is blue, blue in its color, blue in its features, blue in its glow, or just as Vārāṇasī muslin, smooth on both sides, is blue, blue in its color, blue in its features, blue in its glow, in the same way one percipient of the formless internally sees forms externally as blue, blue in their color, blue in their features, blue in their glow. Mastering them, he is percipient of 'I know; I see.' This is the fifth dimension of (mental) mastery.\n\n'One percipient of the formless internally sees forms externally as yellow, yellow in their color, yellow in their features, yellow in their glow. Just as a kaṇṇikāra-flower is yellow, yellow in its color, yellow in its features, yellow in its glow, or just as Vārāṇasī muslin, smooth on both sides, is yellow, yellow in its color, yellow in its features, yellow in its glow, in the same way one percipient of the formless internally sees forms externally as yellow, yellow in their color, yellow in their features, yellow in their glow. Mastering them, he is percipient of 'I know; I see.' This is the sixth dimension of (mental) mastery.\n\n'One percipient of the formless internally sees forms externally as red, red in their color, red in their features, red in their glow. Just as a bandha-jīvaka-flower is red, red in its color, red in its features, red in its glow, or just as Vārāṇasī muslin, smooth on both sides, is red, red in its color, red in its features, red in its glow, in the same way one percipient of the formless internally sees forms externally as red, red in their color, red in their features, red in their glow. Mastering them, he is percipient of 'I know; I see.' This is the seventh dimension of (mental) mastery.\n\n'One percipient of the formless internally sees forms externally as white, white in their color, white in their features, white in their glow. Just as the morning star is white, white in its color, white in its features, white in its glow, or just as Vārāṇasī muslin, smooth on both sides, is white, white in its color, white in its features, white in its glow, in the same way one percipient of the formless internally sees forms externally as white, white in their color, white in their features, white in their glow. Mastering them, he is percipient of 'I know; I see.' This is the eighth dimension of (mental) mastery.",
            "Nine step-by-step dwellings: There is the case, friends, where a monk, quite secluded from sensuality, secluded from unskillful qualities, enters & remains in the first jhāna: rapture & pleasure born of seclusion, accompanied by directed thought & evaluation.\n\n'With the stilling of directed thoughts & evaluations, he enters & remains in the second jhāna: rapture & pleasure born of concentration, unification of awareness free from directed thought & evaluation—internal assurance.\n\n'With the fading of rapture, he remains equanimous, mindful, & alert, and senses pleasure with the body. He enters & remains in the third jhāna, of which the noble ones declare, 'Equanimous & mindful, he has a pleasant abiding.'\n\n'With the abandoning of pleasure & pain—as with the earlier disappearance of joy & distress—he enters & remains in the fourth jhāna: purity of equanimity & mindfulness, neither pleasure nor pain.\n\n'With the complete transcending of perceptions of (physical) form, with the disappearance of perceptions of resistance, and not attending to perceptions of multiplicity, (perceiving,) 'Infinite space,' he enters & remains in the dimension of the infinitude of space.\n\n'With the complete transcending of the dimension of the infinitude of space, (perceiving,) 'Infinite consciousness,' he enters & remains in the dimension of the infinitude of consciousness.\n\n'With the complete transcending of the dimension of the infinitude of consciousness, (perceiving,) 'There is nothing,' he enters & remains in the dimension of nothingness.\n\n'With the complete transcending of the dimension of nothingness, he enters & remains in the dimension of neither perception nor non-perception.\n\n'With the complete transcending of the dimension of neither perception nor non-perception, he enters & remains in the cessation of perception & feeling.",
            "Ten grounds for abolishing: In one of right view, wrong view is abolished. The many evil, unskillful qualities that come into play with wrong view as their condition are also abolished, while the many skillful qualities that have right view as their condition go to the culmination of their development. In one of right resolve, wrong resolve is abolished.… In one of right speech, wrong speech is abolished.… In one of right action, wrong action is abolished.… In one of right livelihood, wrong livelihood is abolished.… In one of right effort, wrong effort is abolished.… In one of right mindfulness, wrong mindfulness is abolished.… In one of right concentration, wrong concentration is abolished.… In one of right knowledge, wrong knowledge is abolished.… In one of right release, wrong release is abolished. The many evil, unskillful qualities that come into play with wrong release as their condition are also abolished, while the many skillful qualities that have right release as their condition go to the culmination of their development."
        ],
        "realised": [
            "Unprovoked release of awareness",
            "Clear knowing & release",
            "Three forms of clear knowing: the clear knowing of the knowledge of previous lifetimes, the clear knowing of the knowledge of the passing away & arising of beings, the clear knowing of the knowledge of the ending of the effluents.",
            "Four fruits of the contemplative life: the fruit of stream-entry, the fruit of once-returning, the fruit of non-returning, the fruit of arahantship.",
            "Five dhamma aggregates: the aggregate of virtue, the aggregate of concentration, the aggregate of discernment, the aggregate of release, the aggregate of knowledge & vision of release.",
            "Six direct knowledges: There is the case, friends, where a monk wields manifold supranormal powers. Having been one he becomes many; having been many he becomes one. He appears. He vanishes. He goes unimpeded through walls, ramparts, and mountains as if through space. He dives in and out of the earth as if it were water. He walks on water without sinking as if it were dry land. Sitting cross-legged he flies through the air like a winged bird. With his hand he touches and strokes even the sun and moon, so mighty and powerful. He exercises influence with his body even as far as the Brahmā worlds.\n\n'He hears—by means of the divine ear-element, purified & surpassing the human—both kinds of sounds: divine & human, whether near or far.\n\n'He discerns the awareness of other beings, other individuals, having encompassed it with his own awareness. He discerns a mind with passion as 'a mind with passion,' and a mind without passion as 'a mind without passion.' He discerns a mind with aversion as 'a mind with aversion,' and a mind without aversion as 'a mind without aversion.' He discerns a mind with delusion as 'a mind with delusion,' and a mind without delusion as 'a mind without delusion.' He discerns a restricted mind as 'a restricted mind,' and a scattered mind as 'a scattered mind.' He discerns an enlarged mind as 'an enlarged mind,' and an unenlarged mind as 'an unenlarged mind.' He discerns a surpassed mind [one that is not at the most excellent level] as 'a surpassed mind,' and an unsurpassed mind as 'an unsurpassed mind.' He discerns a concentrated mind as 'a concentrated mind,' and an unconcentrated mind as 'an unconcentrated mind.' He discerns a released mind as 'a released mind,' and an unreleased mind as 'an unreleased mind.'\n\n'He recollects his manifold past lives, i e, one birth, two births, three births, four, five, ten, twenty, thirty, forty, fifty, one hundred, one thousand, one hundred thousand, many eons of cosmic contraction, many eons of cosmic expansion, many eons of cosmic contraction & expansion, (recollecting,) 'There I had such a name, belonged to such a clan, had such an appearance. Such was my food, such my experience of pleasure & pain, such the end of my life. Passing away from that state, I re-arose there. There too I had such a name, belonged to such a clan, had such an appearance. Such was my food, such my experience of pleasure & pain, such the end of my life. Passing away from that state, I re-arose here.' Thus he recollects his manifold past lives in their modes & details.\n\n'He sees—by means of the divine eye, purified and surpassing the human—beings passing away & re-appearing, and he discerns how they are inferior & superior, beautiful & ugly, fortunate & unfortunate in accordance with their kamma: 'These beings—who were endowed with bad conduct of body, speech, & mind, who reviled the noble ones, held wrong views and undertook actions under the influence of wrong views—with the break-up of the body, after death, have re-appeared in a plane of deprivation, a bad destination, a lower realm, hell. But these beings—who were endowed with good conduct of body, speech, & mind, who did not revile the noble ones, who held right views and undertook actions under the influence of right views—with the break-up of the body, after death, have re-appeared in a good destination, a heavenly world.' Thus—by means of the divine eye, purified & surpassing the human—he sees beings passing away & re-appearing, and he discerns how they are inferior & superior, beautiful & ugly, fortunate & unfortunate in accordance with their kamma.\n\n'Through the ending of the effluents, he enters & remains in the effluent-free awareness-release & discernment-release, having directly known & realized them for himself right in the here-&-now.",
            "Seven strengths of one whose effluents are ended: There is the case, friends, where—for a monk whose effluents are ended—the inconstancy of all fabrications is well seen, as it has come to be, with right discernment. The fact that—for a monk whose effluents are ended—the inconstancy of all fabrications is well seen, as it has come to be, with right discernment is a strength of a monk whose effluents are ended by which he knows, 'My effluents are ended.'\n\n'And further, for a monk whose effluents are ended, sensuality is well seen, as it has come to be, with right discernment, as being like a pit of burning embers…\n\n'And further, the heart of a monk whose effluents are ended is bent on seclusion, inclines to seclusion, slopes toward seclusion, delights in renunciation, and is entirely done with the things that would act as causes for the effluents.…\n\n'And further, for a monk whose effluents are ended, the four establishings of mindfulness are developed, well developed.…\n\n'And further, for a monk whose effluents are ended, the five faculties are developed, well developed.…\n\n'And further, for a monk whose effluents are ended, the seven factors for awakening are developed, well developed.…\n\n'And further, for a monk whose effluents are ended, the noble eightfold path is developed, well developed. The fact that—for a monk whose effluents are ended—the noble eightfold path is developed, well developed, is a strength of a monk whose effluents are ended by which he knows, 'My effluents are ended.'",
            "Eight emancipations: Possessed of form, one sees forms. This is the first emancipation.\n\n'Not percipient of form internally, one sees forms externally. This is the second emancipation.\n\n'One is intent only on the beautiful. This is the third emancipation.\n\n'With the complete transcending of perceptions of (physical) form, with the disappearance of perceptions of resistance, and not attending to perceptions of multiplicity, (perceiving,) 'Infinite space,' one enters & remains in the dimension of the infinitude of space. This is the fourth emancipation.\n\n'With the complete transcending of the dimension of the infinitude of space, (perceiving,) 'Infinite consciousness,' one enters & remains in the dimension of the infinitude of consciousness. This is the fifth emancipation.\n\n'With the complete transcending of the dimension of the infinitude of consciousness, (perceiving,) 'There is nothing,' one enters & remains in the dimension of nothingness. This is the sixth emancipation.\n\n'With the complete transcending of the dimension of nothingness, one enters & remains in the dimension of neither perception nor non-perception. This is the seventh emancipation.\n\n'With the complete transcending of the dimension of neither perception nor non-perception, one enters & remains in the cessation of perception and feeling. This is the eighth emancipation.",
            "Nine step-by-step cessations: When one has attained the first jhāna, the perception of sensuality has ceased. When one has attained the second jhāna, directed thoughts & evaluations [verbal fabrications] have ceased. When one has attained the third jhāna, rapture has ceased. When one has attained the fourth jhāna, in-&-out breaths [bodily fabrications] have ceased. When one has attained the dimension of the infinitude of space, the perception of forms has ceased. When one has attained the dimension of the infinitude of consciousness, the perception of the dimension of the infinitude of space has ceased. When one has attained the dimension of nothingness, the perception of the dimension of the infinitude of consciousness has ceased. When one has attained the dimension of neither perception nor non-perception, the perception of the dimension of nothingness has ceased. When one has attained the cessation of perception & feeling, perceptions & feelings [mental fabrications] have ceased.",
            "Ten qualities of one beyond training: the right view of one beyond training, the right resolve of one beyond training, the right speech of one beyond training, the right action of one beyond training, the right livelihood of one beyond training, the right effort of one beyond training, the right mindfulness of one beyond training, the right concentration of one beyond training, the right knowledge of one beyond training, the right release of one beyond training."
        ]
        }
}

/* helper utilities; example usage

console.log(ProgressingByTens.progression.keyToIndex("one")); // -> 1
console.log(ProgressingByTens.progression.indexToKey(1)); // -> "one"
console.log(ProgressingByTens.category.keyToIndex("helpful")); // -> 0
console.log(ProgressingByTens.category.keyToBreadcrumb("helpful")); // -> "Dhammas are very helpful"
console.log(ProgressingByTens.category.indexToKey(0)); // -> "helpful"
console.log(ProgressingByTens.category.fixBreadcrumbsIfNecessary({ progressionIndex: 1, categoryKey: "helpful" })); // -> "Dhamma is very helpful"
console.log(ProgressingByTens.lookupPatternName({ progressionIndex: 1, categoryKey: "helpful" })); // -> "Heedful, ardent & resolute"
console.log(ProgressingByTens.lookupAnswerExcerpt({ progressionIndex: 1, categoryKey: "helpful" })); // -> "Heedfulness with regard to skillful qualities"
console.log(ProgressingByTens.searchAnswerExcerptsForTerm("inconstant")); // -> [  {  categoryKey: "arise",  progressionIndex: 9,  excerpt: "Nine perceptions: the perception of unattractiveness, the perception of death, the perception of loathsomeness in food, the perception of distaste for every world, the perception of inconstancy, the perception of stress in what is inconstant, the perception of not-self in what is stressful, the perception of abandoning, the perception of dispassion."  },  {  categoryKey: "arise",  progressionIndex: 10,  excerpt: "Ten perceptions: the perception of unattractiveness, the perception of death, the perception of loathsomeness in food, the perception of distaste for every world, the perception of inconstancy, the perception of stress in what is inconstant, the perception of not-self in what is stressful, the perception of abandoning, the perception of dispassion, the perception of cessation."  }]
console.log(ProgressingByTens.createRelatedPatternMarkdownLink({ progressionIndex: 1, categoryKey: "helpful" })); // -> "/Heedful, ardent & resolute/(../ones/helpful.html)"
console.log(ProgressingByTens.revealContextStatement({ progressionIndex: 1, categoryKey: "helpful" })); // -> "\nWhich one Dhamma is very helpful? \nHeedfulness with regard to skillful qualities"
console.log(ProgressingByTens.mimimiseJson({val1_keep:10, val2_keep: "ten", obj1_keep: {a: "ten", b: [10]}, val2_no_keep: "", obj2_no_keep: {a: "", b: []}, obj3_partial_keep: {a: "ten", b: []}, obj4_partial_keep: {a: "", b: [10]}})); // -> {val1_keep:10,val2_keep:"ten",obj1_keep:{a:"ten",b:[10]},obj3_partial_keep:{a:"ten"},obj4_partial_keep:{b:[10]}} 

*/