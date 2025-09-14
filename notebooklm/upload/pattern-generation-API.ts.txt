import { DeterminantQuotationString, PatternResponseJson, ScopeJson, ThisOrThatConditionalityJson, UserDirectExperienceJson, UserPatternRequestJson, WORK_TASK_ORDER, WorkTaskKey } from "./pattern-API.ts"
import { JsonUtils } from "./pbt-utils.ts";

export interface WorkTaskResolvable {
    executionContext: string
    quotationSet: Set<DeterminantQuotationString>
    readonly substantiationsStack: string[]
    popSubstantiationsFromLastCommand(): string[]

    generaliseAndAbstractToConcept(term: string): Promise<string>
} 

export class WorkTaskResolver implements WorkTaskResolvable {
    public executionContext: string = "" 
    public quotationSet: Set<DeterminantQuotationString> = new Set<DeterminantQuotationString>()
    public readonly substantiationsStack: string[] = []

    public popSubstantiationsFromLastCommand(): string[] {
        const ret = [...this.substantiationsStack]
        this.substantiationsStack.splice(0, this.substantiationsStack.length)
        return ret
    }

    public generaliseAndAbstractToConcept(_term: string): Promise<string> {
        return (undefined as unknown) as Promise<string>
    }
}

export class BaseWorkTaskInstructions<
    B extends string | string[] | ScopeJson | ThisOrThatConditionalityJson[],
    R extends WorkTaskResolver
> {
    protected readonly key: WorkTaskKey

    protected readonly request: UserPatternRequestJson
    protected readonly response: PatternResponseJson
    protected readonly resolver: R
    protected readonly buildingBlock: B
    protected readonly quotationSet: Set<DeterminantQuotationString> = new Set<DeterminantQuotationString>()
    protected readonly substantiations: string[]|undefined
    protected readonly directExperience: UserDirectExperienceJson|undefined

    protected responder: PatternGenerator

    constructor(key: WorkTaskKey, responder: PatternGenerator) {
        this.key = key
        this.responder = responder
        this.request = responder.request
        this.response = responder.response
        this.resolver = this.constructResolver()
        if (this.resolver)
            this.resolver.quotationSet = this.quotationSet
        this.buildingBlock = responder.response.buildingBlocks[this.key] as B
        if (responder.response?.substantiations?.[this.key])
            this.substantiations = responder.response.substantiations[this.key]
        else
            this.substantiations = undefined
        const directExp = responder.request.directExperience?.[this.key]
        if (directExp && typeof directExp === "object" && !Array.isArray(directExp)) {
            this.directExperience = directExp as UserDirectExperienceJson
        } else {
            this.directExperience = undefined
        }
    }

    protected constructResolver(): R {
        return (undefined as unknown) as R
    }

    protected consolidateQuotationsSet() {
        this.responder.response.quotationSheet[this.key] = [...this.quotationSet]
    }

    protected assert(condition: unknown, message: string): asserts condition {
        if (!condition)
            throw new Error(message)
    }

    protected checkPreConditions(): unknown {
        return true
    }

    protected checkPostConditions(): unknown {
        return true
    }

    protected async executeInstructions(): Promise<void> {
    }

    public async execute(): Promise<void> {
        this.assert(this.checkPreConditions(), `[${this.key}] preconditions not met`)
        await this.executeInstructions()
        this.consolidateQuotationsSet()
        this.assert(this.checkPostConditions(), `[${this.key}] postconditions not met`)
    }
}

export type BaseWorkTaskInstructionsConstructor<
    T extends string | string[] | ScopeJson | ThisOrThatConditionalityJson[],
    R extends WorkTaskResolver
> = new (key: WorkTaskKey, responder: PatternGenerator) => BaseWorkTaskInstructions<T, R>

export class PatternGenerator {
    public static INSTRUCTIONS_REGISTRY = new Map<WorkTaskKey, BaseWorkTaskInstructionsConstructor<string | string[] | ScopeJson | ThisOrThatConditionalityJson[], WorkTaskResolver>>()

    public verboseOutput = false
    public request: UserPatternRequestJson
    public response: PatternResponseJson = {
        buildingBlocks: {
            "Scope": { 
                progressionIndex: -1, 
                categoryKey: "helpful",
                patternName: "",
                subject: []
            },
            "Problem": [],
            "Causal-Table": [],
            "Sol.Step-by-Step": [],
            "Sol.Cause-&-Effect": [],
            "Sol.Process View": [],
            "Sol.Concepts & Relationships": [],
            "Sol.State Transitions": [],
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
            "Sol.Step-by-Step": [],
            "Sol.Cause-&-Effect": [],
            "Sol.Process View": [],
            "Sol.Concepts & Relationships": [],
            "Sol.State Transitions": [],
            "Context": [],
            "Forces": [],
            "Rationale": [],
            "Resulting Context": [],
            "Related Patterns": [],
            "Case-studies": [],
            "Simile": []
        },
        substantiations: {
            "Scope": [],
            "Problem": [],
            "Causal-Table": [],
            "Sol.Step-by-Step": [],
            "Sol.Cause-&-Effect": [],
            "Sol.Process View": [],
            "Sol.Concepts & Relationships": [],
            "Sol.State Transitions": [],
            "Context": [], "Forces": [], "Rationale": [],
            "Resulting Context": [], "Related Patterns": [], "Case-studies": [], "Simile": []
        }
    }

    constructor(req: UserPatternRequestJson) {
        this.request = req
        this.response.buildingBlocks["Scope"].progressionIndex = req.progressionIndex
        this.response.buildingBlocks["Scope"].categoryKey = req.categoryKey
        if (req["verboseOutput"])
            this.verboseOutput = req["verboseOutput"] 
        if (!req.includeSubstantiations)
            delete this.response.substantiations
    }

    public async generate(): Promise<PatternResponseJson> {
        for (const workTask of WORK_TASK_ORDER) {
            let cls = PatternGenerator.INSTRUCTIONS_REGISTRY.get(workTask)
            if (!cls)
                cls = BaseWorkTaskInstructions
            const instructions = new cls(workTask, this)
            if (instructions)
                await instructions.execute()
        }
        if (this.response)
            this.response = JsonUtils.minimise(this.response)
        return this.response
    }
}