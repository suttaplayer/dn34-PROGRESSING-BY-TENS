import { BaseWorkTaskInstructions, PatternGenerator, WorkTaskResolvable } from "./pattern-generation-API.ts";
import { SubjectJson } from "./pattern-API.ts";
import { ProgressingByTens } from "./pbt-utils.ts";

export interface ProblemWorkTaskResolvable extends WorkTaskResolvable {
    composeProblemStatement(subjects: SubjectJson[]): Promise<string>
}

export type ProblemCommandResolverConstructor = new () => ProblemWorkTaskResolvable

export class JsonProblemGenerationInstructions extends BaseWorkTaskInstructions<string[], ProblemWorkTaskResolvable> {
    public static RESOLVER_CTR: ProblemCommandResolverConstructor

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

    async prepareProblemStatement() {
        const answerExcerpt = ProgressingByTens.lookupAnswerExcerpt(this.request) 
        this.resolver.executionContext = answerExcerpt
        const statement = await this.resolver.composeProblemStatement(this.response.buildingBlocks.Scope.subject)
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

    protected constructResolver(): ProblemWorkTaskResolvable {
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
