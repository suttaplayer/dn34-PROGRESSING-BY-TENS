import { BaseWorkTaskInstructions, NotebooklmCommandResolver, PatternGenerator } from "./generation-API.ts";
import { SubjectJson } from "./pattern-API.ts";
import { ProgressingByTens } from "./pbt-utils.ts";

export interface NotebooklmProblemCommandResolvable {
    composePatternsProblemStatement(enterCompositeStates: Object, exitCompositeStates: Object, targetAnswer: string): Promise<string>
}

export class NotebooklmProblemCommandResolver extends NotebooklmCommandResolver implements NotebooklmProblemCommandResolvable {
    public async composePatternsProblemStatement(enterCompositeStates: Object, exitCompositeStates: Object, targetAnswer: string): Promise<string> {
        /*
        **Command:compose problem statement** using the:
            1. basic format: How do you <verb> <unified-enter-state> and <verb> <unified-exit-state>?
            2. use similar language and expression as found in the sources:
                * And what is the miracle of instruction? There is the case where a certain person gives instruction in this way: 'Direct your thought in this way, don't direct it in that. Attend to things in this way, don't attend to them in that. Let go of this, enter and remain in that.' This is called the miracle of instruction.

            eg. How do you abandon heedlessness and enter and remain in heedfulness?
        */
        const exeCommand = {
            commandType: "text_analysis",
            parameters: {
                enterExitCompositeStateMaps: [enterCompositeStates, exitCompositeStates],
                targetAnswer: targetAnswer,
                extractionTarget: "problem statement",
                expectedFormat: "string",
                guidance: "compose a problem statement for the pattern using the enter & exit states. ensure that the resultant problem statement is suitable for the target answer"
            }
        }
        return await this.executeQuery<string>(exeCommand)
    }
}

export class RunningExampleProblemCommandResolver extends NotebooklmCommandResolver implements NotebooklmProblemCommandResolvable {
    public async composePatternsProblemStatement(enterCompositeStates: Object, exitCompositeStates: Object, targetAnswer: string): Promise<string> {
        const enterVals = Object.values(enterCompositeStates)
        const exitVals = Object.values(exitCompositeStates)
        const ret = `How do you abandon ${enterVals[0]} and enter and remain in ${exitVals[0]}ness?`
        this.substantiationsStack.push("'abandon' within the sources is typically used to express a transition from a negative mind state. 'enter and remain in' is typically used to express a transition to a positive mind state.")
        return ret
    }
}

export type ProblemCommandResolverConstructor = new () => NotebooklmProblemCommandResolver

export class JsonProblemGenerationInstructions extends BaseWorkTaskInstructions<string[], NotebooklmProblemCommandResolver> {
    public static RESOLVER_CTR: ProblemCommandResolverConstructor = NotebooklmProblemCommandResolver

    visualiseSolutionSpace() {
        /*
        ```plantuml - https://editor.plantuml.com/uml/hLFVJzim47xtNt7g4qKa50H2Yb37G7GQY0sfl6rxSErhwoss8zy5jKByxzXkGginjfVb9R7lxlFtmxaWbe5RMqDvsCHNOQnS81tUa7VtmSzgj9_GOP1ilFliY4EhqYSLvEisVHNKI8LYYL9ZWAk0ab63TnKSZuvF2yAc69q8DbmZT8Ym2mHxqmu9fWbfA9P68w1jU0qMxGm32Q5gIGJtaXc3ksnDhOrRNDPU_Q945SxFzsuEO38vEnkDXkCnF3rt8zDszXCL_xb9G7oSj5X191GHyyRSgvO-HY4V-krlFyJpAuTEmszWNVNEE3tbQC7NSBrAN6MTbs_QUthAD_WNSatmYu14sNsDgmfScoo1N5KHUU73-XRN5Lnj5vjgit7howw-AEDz4_UBOWo3J6cmPLQ1yYalQM9Ol4JeauT78s7yJxpEi47lN0LIwwG92TAys7gG-scJ61oLvVvWDxyA35CYmxXYM4fAmtqSPHalqhRtuDqaXX6605TDfg0XmaHjZaoMn1xaTqUjjVd6Wv_7LiCFFiyI_E_pvi7RjoT6XM4IAvj3nGKw7V_D5m00
        @startuml ./puml-images/JsonProblemGenerationInstructions-solution-space
        header Created on: 2025-sep-04
        title Problem Instructions (Solution Space)
        hide empty members

        class PatternBuildingBlocksJson <<(J, FF7700)>> {}
        class SubjectJson <<(J, FF7700)>> {
            name: string
            focusArea?: string[]
        }

        class Problem <<(J, FF7700)>>
        class MindStateOrExternalState <<(J, FF7700)>>

        class ScopeJson <<(J, FF7700)>> {
            progressionIndex: number 
            categoryKey: CategoryKey 
            patternName: string
        }

        PatternBuildingBlocksJson *--> "Scope" ScopeJson: constrains the solution via >
        PatternBuildingBlocksJson *--> "Problem" Problem: addresses a >

        ScopeJson --> "subject 1..*" SubjectJson: its context has >

        Problem .. (SubjectJson, MindStateOrExternalState): is expressed as transition to a\nsummation of exitToStates 
        Problem .. (SubjectJson, MindStateOrExternalState): is expressed as transition from a\nsummation of enterFromStates
        @enduml   
        ```
        */
    }

    consolidateScopeIntoSubjectStateMap(subjects: SubjectJson[], boundaryType: string): Object {
        const ret: Object = {}
        let targetState: string
        for (const subject of subjects) {
            if (boundaryType === "enter from") {
                targetState = subject.enterFromState
            } else {
                targetState = subject.exitToState
            }
            ret[subject.name] = targetState
        }
        return ret
    }

    async prepareProblemStatement() {
        const entryCompositeStates = this.consolidateScopeIntoSubjectStateMap(this.response.buildingBlocks.Scope.subject, "enter from")
        const exitCompositeStates = this.consolidateScopeIntoSubjectStateMap(this.response.buildingBlocks.Scope.subject, "exit to")
        const answerExcerpt = ProgressingByTens.lookupAnswerExcerpt(this.request) 
        const statement = await this.resolver.composePatternsProblemStatement(entryCompositeStates, exitCompositeStates, answerExcerpt)
        if (this.substantiations) {
            if (this.responder.verboseOutput) {
                console.log('prepareProblemStatement substantiations:')
                console.log(this.resolver.substantiationsStack)
                console.log("-------------------------------------------------------")
            }
            this.substantiations.push(...this.resolver.popSubstantiationsFromLastCommand())
        }
        this.buildingBlock.push(statement)
    }

    protected async executeInstructions(): Promise<void> {
        if (this.responder.verboseOutput)
            console.log("starting [JsonProblemGenerationInstructions]")
        this.visualiseSolutionSpace()
        await this.prepareProblemStatement()
    }

    protected constructResolver(): NotebooklmProblemCommandResolver {
        return new JsonProblemGenerationInstructions.RESOLVER_CTR()
    }

    protected checkPreConditions(): any {
        let ret = false
        if (this.response.buildingBlocks.Scope.subject.length > 0)
            ret = true
        return ret
    }

    protected checkPostConditions(): any {
        let ret = false
        if (this.response.buildingBlocks.Problem.length > 0)
            ret = true
        return ret
    }
}

export function register() {
    PatternGenerator.INSTRUCTIONS_REGISTRY.set("Problem", JsonProblemGenerationInstructions)
}

export function registerRunningExample() {
    register()
    JsonProblemGenerationInstructions.RESOLVER_CTR = RunningExampleProblemCommandResolver
}