import config_ from "./generation-work-task-instructions.json" with { type: "json" }

import { DeterminantQuotationString, PatternResponseJson, UserDirectExperienceJson, UserPatternRequestJson, WORK_TASK_ORDER, WorkTaskKey } from "./pattern-API.ts"

export type InstructionsJson = {
    modulePath: string
    bootstrap: string
}

type BootstrapFunctionDefinition = () => void


export type GenerationWorkTaskInstructionsConfigJson = {
    instructions: InstructionsJson[]
}

/*
purpose: provide notebooklm with a base abstraction which must be specialised for individual work tasks that are assosciated with the notebooklm "**Command:<command>** annotation"
*/
export class NotebooklmCommandResolver {
    public executionContext: string = "" 
    public readonly substantiationsStack: string[] = []

    protected async executeQuery<Type>(cmd: Object): Promise<Type> {
        // notebooklm internal query execution ...
        this.substantiationsStack.push("/* add rationale for query result here */")
        return (undefined as unknown) as Type
    }

    public async generaliseAndAbstractToConcept(term: string): Promise<string> {
        /*
        **Command:generalise & abstract to concept** the term if necessary. concepts play a key role in the causal-table. if the concept is to specific the causal-table will be small and of little benefit (due to simplicity) for the remaining work tasks. however, if the concept is over-generalised then the causal-table will be too large and again of little benefit (due to complexity) for the remaining work tasks.
        * eg1, consider the subject: "people of integrity"
            1. "people of integrity" has 77 references in 6 source files
            2. "person of integrity" has 112 references in 7 source files
            3. "admirable friend" 43 references in 8 source files
            * within the context of "Associating with people of integrity", these are all abstractions of the same concept. notebooklm needs to ensure that it can subsequently match on the concept as opposed to the specific term/expression for the benefit of down-stream work tasks
        * eg2, consider the subject: "faculty of conviction"
            1. "faculty of conviction" has 38 references in 4 source files
            2. "strength of conviction" has 11 references in 4 source files
            3. "conviction" has 450 references in 10 source files
            * outside the context of then wings to awakening these are again all references to the same concept 
            
        */
       return term
    }

    popSubstantiationsFromLastCommand(): string[] {
        let ret = [...this.substantiationsStack]
        this.substantiationsStack.splice(0, this.substantiationsStack.length)
        return ret
    }
}

export class BaseWorkTaskInstructions<B, R extends NotebooklmCommandResolver> {
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

export type BaseWorkTaskInstructionsConstructor<T, R extends NotebooklmCommandResolver> = new (key: string, responder: PatternGenerator) => BaseWorkTaskInstructions<T, R>;

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

    private async loadDllWorkTaskInstructions() {
        const config: GenerationWorkTaskInstructionsConfigJson = config_ as GenerationWorkTaskInstructionsConfigJson
        for (const workTaskInstructions of config.instructions) {
            const module = await import(workTaskInstructions.modulePath)
            const bootFunc = module[workTaskInstructions.bootstrap] as BootstrapFunctionDefinition
            bootFunc()
        }
    }

    public async generate(): Promise<PatternResponseJson> {
        await this.loadDllWorkTaskInstructions()
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