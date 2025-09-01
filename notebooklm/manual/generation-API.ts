import config_ from "./generation-work-task-instructions.json" with { type: "json" }

import { DeterminantQuotationString, PatternResponseJson, UserPatternRequestJson, WORK_TASK_ORDER, WorkTaskKey } from "./pattern-API.ts"
import { ProgressingByTens } from "./pbt-utils.ts"

export type InstructionsJson = {
    modulePath: string
    bootstrap: string
}

type BootstrapFunctionDefinition = () => void


export type GenerationWorkTaskBuildersConfigJson = {
    instructions: InstructionsJson[]
}

export class BaseWorkTaskInstructions {
    public key: string
    protected quotationSet: Set<DeterminantQuotationString> = new Set<DeterminantQuotationString>()

    protected responder: PatternGenerator

    constructor(key: string, responder: PatternGenerator) {
        this.key = key
        this.responder = responder
    }

    protected consolidateQuotationsSet() {
        this.responder.response.quotationSheet[this.key] = [...this.quotationSet]
    }

    public async execute(): Promise<void> {
        this.consolidateQuotationsSet()
    }
}

export type BaseWorkTaskInstructionsConstructor = new (key: string, responder: PatternGenerator) => BaseWorkTaskInstructions;

export class PatternGenerator {
    public static INSTRUCTIONS_REGISTRY = new Map<WorkTaskKey, BaseWorkTaskInstructionsConstructor>()

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
        this.response.buildingBlocks["Scope"].patternName = ProgressingByTens.config.patternName[this.request.categoryKey][this.request.progressionIndex-1]
        if (req["verboseOutput"])
            this.verboseOutput = req["verboseOutput"] 
        if (!req.includeSubstantiations)
            delete this.response.substantiations
    }

    private async loadExternalWorkTaskBuilders() {
        const config: GenerationWorkTaskBuildersConfigJson = config_ as GenerationWorkTaskBuildersConfigJson
        for (const workTaskInstructions of config.instructions) {
            const module = await import(workTaskInstructions.modulePath)
            const bootFunc = module[workTaskInstructions.bootstrap] as BootstrapFunctionDefinition
            bootFunc()
        }
    }

    public async generate(): Promise<PatternResponseJson> {
        await this.loadExternalWorkTaskBuilders()
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