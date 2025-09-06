import { DeterminantQuotationString, PatternResponseJson, UserDirectExperienceJson, UserPatternRequestJson, WORK_TASK_ORDER, WorkTaskKey } from "./pattern-API.ts"

export interface WorkTaskResolvable {
    executionContext: string
    readonly substantiationsStack: string[]
    popSubstantiationsFromLastCommand(): string[]

    generaliseAndAbstractToConcept(term: string): Promise<string>
} 

export class WorkTaskResolver {
    public executionContext: string = "" 
    public readonly substantiationsStack: string[] = []

    public popSubstantiationsFromLastCommand(): string[] {
        let ret = [...this.substantiationsStack]
        this.substantiationsStack.splice(0, this.substantiationsStack.length)
        return ret
    }
}

export class BaseWorkTaskInstructions<B, R extends WorkTaskResolver> {
    protected readonly key: string

    protected readonly request: UserPatternRequestJson
    protected readonly response: PatternResponseJson
    protected readonly resolver: R
    protected readonly buildingBlock: B
    protected readonly quotationSet: Set<DeterminantQuotationString> = new Set<DeterminantQuotationString>()
    protected readonly substantiations: string[]|undefined
    protected readonly directExperience: UserDirectExperienceJson|undefined

    protected responder: PatternGenerator

    constructor(key: string, responder: PatternGenerator) {
        this.key = key
        this.responder = responder
        this.request = responder.request
        this.response = responder.response
        this.resolver = this.constructResolver()
        this.buildingBlock = responder.response.buildingBlocks[this.key]
        if (responder.response?.substantiations?.[this.key])
            this.substantiations = responder.response.substantiations[this.key]
        else
            this.substantiations = undefined
        this.directExperience = responder.request.directExperience?.[this.key]
    }

    protected constructResolver(): R {
        return (undefined as unknown) as R
    }

    protected consolidateQuotationsSet() {
        this.responder.response.quotationSheet[this.key] = [...this.quotationSet]
    }

    protected assert(condition: any, message: string): asserts condition {
        if (!condition)
            throw new Error(message)
    }

    protected checkPreConditions(): any {
        return true
    }

    protected checkPostConditions(): any {
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

export type BaseWorkTaskInstructionsConstructor<T, R extends WorkTaskResolver> = new (key: string, responder: PatternGenerator) => BaseWorkTaskInstructions<T, R>

export class PatternGenerator {
    public static INSTRUCTIONS_REGISTRY = new Map<WorkTaskKey, BaseWorkTaskInstructionsConstructor<any, any>>()

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
        },
        substantiations: {
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

    // private async loadDllWorkTaskInstructions() {
    //     const config: GenerationWorkTaskInstructionsConfigJson = config_ as GenerationWorkTaskInstructionsConfigJson
    //     for (const workTaskInstructions of config.instructions) {
    //         const module = await import(workTaskInstructions.modulePath)
    //         const bootFunc = module[workTaskInstructions.bootstrap] as BootstrapFunctionDefinition
    //         bootFunc()
    //     }
    // }

    public async generate(): Promise<PatternResponseJson> {
        // await this.loadDllWorkTaskInstructions()
        for (const workTask of WORK_TASK_ORDER) {
            let cls = PatternGenerator.INSTRUCTIONS_REGISTRY.get(workTask)
            if (!cls)
                cls = BaseWorkTaskInstructions
            const instructions = new cls(workTask, this)
            if (instructions)
                await instructions.execute()
        }
        return this.response
    }
}