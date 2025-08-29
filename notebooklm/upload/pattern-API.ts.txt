import { ProgressingByTens } from "./pbt-utils.ts";

/*
purpose: represents the valid category keys for the dhammas in the "progressing by tens" framework
specified by:
    1. notebooklm: for querying use in the helper utilities and config
    2. user: for specifying the category key in the userPatternRequestJson
*/
export type CategoryKey = "helpful" | "developed" | "comprehended" | "abandoned" | "decline" | "distinction" | "penetrate" | "arise" | "known" | "realized";

/*
purpose: represents a topic in the "progressing by tens" framework to 1 of the 100 dhammas 
specified by:
    1. notebooklm: for querying use in the helper utilities and config
    2. user: for specifying the dhamma progression in the userPatternRequestJson
*/
export type TopicJson = {
    progressionIndex: number    /* 1-based progression index reference in: Which [three] dhammas are very helpful */
    categoryKey: CategoryKey    /* category key reference in: Which three dhammas are very [helpful]  */
}

/*
purpose: represents the target practitioner for the dhamma in the "progressing by tens" framework
created by:
    1. notebooklm: when trying the comprehend the problem
notes;
    - conviction-dhamma-follower: a person who will die as a stream-enterer at end of their life
    - stream-enterer: a person who has attained stream-entry
    - once-returner: a person who has attained once-returning
    - non-returner: a person who has attained non-returning
*/
export type  PractitionerKey = "conviction-dhamma-follower" | "stream-enterer" | "once-returner" | "non-returner";

/*
purpose: represents a subject in the "progressing by tens" framework. note, there are 100 dhamma in framework, but there are 550 subject in total.
         subject_count = (1*10)+(2*10)+(3*10)+(4*10)+(5*10)+(6*10)+(7*10)+(8*10)+(9*10)+(10*10) = 550
specified by:
    1. notebooklm: when trying the comprehend the problem
*/
export type SubjectJson = {
    name: string                            /* subject name (eg. "people of integrity") */
    focusArea?: string[]                    /* focus area (eg. ["associating"]) */
    enterFromState: string                  /* from internal|external state (eg. "stress") */
    exitToState: string                     /* to internal|external state (eg. "effluent-free") */
    targetPractitioner: PractitionerKey[]   /* subject's practitioner (eg. ["conviction-dhamma-follower", "stream-enterer", "once-returner"]) */
}

/*
purpose: represents the one of the 100 dhammas from the "progressing by tens" framework
created by: notebooklm based on user query specifying: {progressionIndex: <number>, categoryKey: <string>}

eg, 'Which three dhammas are very helpful? Associating with people of integrity, listening to the True Dhamma, practicing the Dhamma in accordance with the Dhamma: These three dhammas are very helpful.

scopeJson = { 
    progressionIndex: 3,
    categoryKey: "helpful",
    patternName: "Factors for stream-entry",
    subject: [
        {
            name: "people of integrity",
            focus: ["associating"],
            enterFromState: "stress",
            exitToState: "effluent-free",
            targetPractitioner: ["conviction-dhamma-follower", "stream-enterer", "once-returner", "non-returner"]
        }, {
            name: "True Dhamma",
            focus: ["listening"],
            enterFromState: "stress",
            exitToState: "effluent-free",
            targetPractitioner: ["conviction-dhamma-follower", "stream-enterer", "once-returner", "non-returner"]
        }, {
            name: "practicing the Dhamma",
            focus: ["in accordance with the Dhamma"],
            enterFromState: "stress",
            exitToState: "effluent-free",
            targetPractitioner: ["conviction-dhamma-follower", "stream-enterer", "once-returner"]
        }
    ]
}
*/
export type ScopeJson = TopicJson &{
    patternName: string
    subject: SubjectJson[]
}

/*
purpose: represents a causal relationship relationship 
created by:
    1. notebooklm: for documenting the causal relationships applied in the patternBuildingBlocksJson["Causal-Table"] & patternBuildingBlocksJson["Cause-&-Effect"] sections
    2. user: to inject causal relationships that are to be applied in the userDirectExperienceJson["Causal-Table"] & userDirectExperienceJson["Cause-&-Effect"] sections

    eg1 {this: "shame", that: "heedful"},
        => shame leads to heedful

    eg2. {notThis:true, this: "conviction", cannot: true, that: "remembers it"},
        => not [having] conviction cannot lead to remembers it
*/
export type CausalRelationJson = {
    notThis?: boolean       /* boolean value indicating inverse of the causal reference (default: boolean|null)*/
    this: string            /* string of the cause in lowercase (eg. "admirable friendship")*/
    relation: number        /* 0|undefined = co-arises with, 1=requisite condition, 2=leads to, 3=causes */
    cannot?: boolean        /* boolean value indicating an impossible causal relationship (default: boolean|null)*/
    notThat?: boolean       /* boolean value indicating inverse of the effect reference (default: boolean|null)*/
    that: string            /* string of the effect in lowercase (eg. "conviction")*/
    quotationIndex?: number /* number of the array index position of the directly associated quote where this cause and effect relationship was derived from */
}

/*
purpose: represents a PlantUML diagram used for process view, concepts & relationships, state transitions, and resulting context sections
created by: notebooklm
*/
export type PlantUMLDiagramText = string;

/*
purpose: represents a work task as the property name of the following types: PatternBuildingBlocksJson, PatternQuotationsJson, UserDirectExperienceJson
*/
export type RootWorkTaskKey = "Scope" | "Problem" | "Causal-Table" | "Context" | "Forces" | "Rationale" | "Resulting Context" | "Related Patterns" | "Case-studies" | "Simile";
export type SolutionWorkTaskKey = "Step-by-Step" | "Cause-&-Effect" | "Process View" | "Concepts & Relationships" | "State Transitions";
export type WorkTaskKey = RootWorkTaskKey | SolutionWorkTaskKey;

export const WORK_TASK_ORDER: WorkTaskKey[] = ["Scope", "Problem", "Causal-Table", "Step-by-Step", "Cause-&-Effect", "Process View", "Concepts & Relationships", "State Transitions", "Context", "Forces", "Rationale", "Resulting Context", "Related Patterns", "Case-studies", "Simile"]
/*
purpose: represents all building blocks for the complete pattern devoid of quotations
created by: notebooklm
*/
export type PatternBuildingBlocksJson = {
    "Scope": ScopeJson                          /* object of the pattern's scope */
    "Problem": string                           /* string of the problem statement */
    "Causal-Table": CausalRelationJson[]        /* array of CausalRelationJson objects (full table) */
    "Solution": {
        "Step-by-Step": string[]                /* array of process step strings (this is a flattened representation of Process View) */
        "Cause-&-Effect": CausalRelationJson[]  /* array of CausalRelationJson objects (solution only) */
        "Process View": PlantUMLDiagramText[]   /* array of PlantUML Activity Diagram strings */
        "Concepts & Relationships": PlantUMLDiagramText[]   /* array of PlantUML Class Diagram strings */
        "State Transitions": PlantUMLDiagramText[]          /* array of PlantUML State Diagram strings */
    }
    "Context": string[]                         /* array of requisite condition/invariant strings */
    "Forces": string[]                          /* array of design constraint/influence strings */
    "Rationale": string                         /* string of the rationale statement */
    "Resulting Context": PlantUMLDiagramText[]  /* array of PlantUML Mindmap Diagram strings */
    "Related Patterns": string[]                /* array of related pattern-name strings */
    "Case-studies": string[]                    /* array of individual's name reference strings */
    "Simile": string[]                          /* array of simile name reference strings */
}


/*  
purpose: shortest & most critical aspect from possibly a larger quotation that can be used to substantiate a view point or causal relationship
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
    "Scope": DeterminantQuotationString[]
    "Problem": DeterminantQuotationString[] 
    "Causal-Table": DeterminantQuotationString[] 
    "Solution": {
        "Step-by-Step": DeterminantQuotationString[] 
        "Cause-&-Effect": DeterminantQuotationString[] 
        "Process View": DeterminantQuotationString[] 
        "Concepts & Relationships": DeterminantQuotationString[] 
        "State Transitions": DeterminantQuotationString[] 
    }
    "Context": DeterminantQuotationString[] 
    "Forces": DeterminantQuotationString[] 
    "Rationale": DeterminantQuotationString[] 
    "Resulting Context": DeterminantQuotationString[] 
    "Related Patterns": DeterminantQuotationString[] 
    "Case-studies": DeterminantQuotationString[] 
    "Simile": DeterminantQuotationString[] 
}


/*
purpose: represents the full payload of the conceptualised pattern devoid of specific media formatting
created by: notebooklm
*/
export type PatternResponseJson = {
    buildingBlocks: PatternBuildingBlocksJson
    quotationSheet: PatternQuotationsJson
}


/*
purpose: represents the influential factors the expert wants to notebooklm to apply to specific pattern sections
created by: user
*/
export type UserInfluentialFactorsJson = {
    factors?: string[]                                      /* unsubstantiated factors to inject into notebooklm's awareness for a work task */
    determinantQuotations?: DeterminantQuotationString[]    /* DeterminantQuotationStrings to inject into notebooklm's awareness for a work task */
}

/*
purpose: represents the overall influential container of factors the expert wants to notebooklm to apply to specific pattern sections
created by: user and submitted as part of the userPatternRequestJson in the initiating user query

note: CausalRelationJson objects are only applied to work tasks "Causal-Table" and "Cause-&-Effect"
*/
export type UserDirectExperienceJson = {
    "Problem"?: UserInfluentialFactorsJson
    "Causal-Table"?: CausalRelationJson[]        /* full table additions */
    "Solution"?: {
        "Cause-&-Effect"?: CausalRelationJson[]  /* (solution only additions */
        "Step-by-Step"?: UserInfluentialFactorsJson
        "Process View"?: UserInfluentialFactorsJson
        "Concepts & Relationships"?: UserInfluentialFactorsJson
        "State Transitions"?: UserInfluentialFactorsJson
    }
    "Context"?: UserInfluentialFactorsJson
    "Forces"?: UserInfluentialFactorsJson
    "Rationale"?: UserInfluentialFactorsJson
    "Resulting Context"?: UserInfluentialFactorsJson
    "Related Patterns"?: UserInfluentialFactorsJson
    "Case-studies"?: UserInfluentialFactorsJson
    "Simile"?: UserInfluentialFactorsJson
}

/*
purpose: represents the parameterised pattern request with optional direct experience to be injected into the pattern generation
created by: user and submitted in the initiating user query
*/
export type UserPatternRequestJson = TopicJson &{
    stopGeneratingAfterTask?: WorkTaskKey
    directExperience?: UserDirectExperienceJson
}


export abstract class AbstractWorkTaskBuilder {
    public key: string
    protected quotationset: Set<DeterminantQuotationString> = new Set<DeterminantQuotationString>()

    protected responder: AbtractPatternGenerator

    constructor(key: string, responder: AbtractPatternGenerator) {
        this.key = key
        this.responder = responder
    }

    protected consolidateQuotationsSet() {
        this.responder.response.quotationSheet[this.key] = [...this.quotationset]
    }

    public build() {
        this.consolidateQuotationsSet()
    }
}

export type AbstractWorkTaskBuilderConstructor = new (key: string, responder: AbtractPatternGenerator) => AbstractWorkTaskBuilder;

export abstract class AbtractPatternGenerator {
    public static BUILDER_REGISTRY = new Map<WorkTaskKey, AbstractWorkTaskBuilderConstructor>()

    public request: UserPatternRequestJson
    public response: PatternResponseJson = {
        buildingBlocks: {
            "Scope": { 
                progressionIndex: -1, 
                categoryKey: "helpful",
                patternName: "",
                subject: []
            },
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
        },
        quotationSheet: {
            "Scope": [],
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
    }
    public builders = new Map<WorkTaskKey, AbstractWorkTaskBuilder>()

    constructor(req: UserPatternRequestJson) {
        this.request = req
        this.response.buildingBlocks["Scope"].progressionIndex = req.progressionIndex
        this.response.buildingBlocks["Scope"].categoryKey = req.categoryKey
        this.response.buildingBlocks["Scope"].patternName = ProgressingByTens.config.patternName[this.request.categoryKey][this.request.progressionIndex-1]
        this.initBuilders()
    }

    private initBuilders() {
        for (const workTask of WORK_TASK_ORDER) {
            const cls = AbtractPatternGenerator.BUILDER_REGISTRY.get(workTask)
            if (cls)
                this.builders.set(workTask, new cls(workTask, this))
        }   
    }

    public generate(): PatternResponseJson {
        for (const workTask of WORK_TASK_ORDER) {
            const builder = this.builders.get(workTask)
            if (builder)
                builder.build()
            if (this.request?.stopGeneratingAfterTask === workTask)
                break
        }
        return this.response
    }
}

export class ScopeWorkTaskBuilder extends AbstractWorkTaskBuilder {
    protected createSubjectJson(name: string, focus: string[]|undefined = undefined) {
        const ret: SubjectJson = {
            name: name,
            focusArea: focus,
            enterFromState: "",
            exitToState: "",
            targetPractitioner: []
        }
        return ret
    }
}

export class ProblemWorkTaskBuilder extends AbstractWorkTaskBuilder {
}

export class CausalTableWorkTaskBuilder extends AbstractWorkTaskBuilder {
}
