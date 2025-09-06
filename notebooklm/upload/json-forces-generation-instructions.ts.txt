import { BaseWorkTaskInstructions, PatternGenerator, WorkTaskResolvable } from "./pattern-generation-API.ts";
import { DeterminantQuotationString, SubjectJson } from "./pattern-API.ts";

export interface ForcesWorkTaskResolvable extends WorkTaskResolvable {
    searchForForcesWithRespectTo(subjects: SubjectJson[]): Promise<DeterminantQuotationString[]>
    composeForcesStatement(subjects: SubjectJson[], determinantQuotations: DeterminantQuotationString[]): Promise<string[]>
}

export type ForcesCommandResolverConstructor = new () => ForcesWorkTaskResolvable

export class JsonForcesGenerationInstructions extends BaseWorkTaskInstructions<string[], ForcesWorkTaskResolvable> {
    public static RESOLVER_CTR: ForcesCommandResolverConstructor

    async prepareForcesStatement() {
        this.resolver.executionContext = this.response.buildingBlocks.Problem[0]
        const determinantQuotations = await this.resolver.searchForForcesWithRespectTo(this.response.buildingBlocks.Scope.subject)
        determinantQuotations.forEach((quotation) => {
                this.quotationSet.add(quotation)
        })
        const statement = await this.resolver.composeForcesStatement(this.response.buildingBlocks.Scope.subject, determinantQuotations)
        if (this.substantiations) {
            if (this.responder.verboseOutput) {
                console.log('prepareForcesStatement substantiations:')
                console.log(this.resolver.substantiationsStack)
                console.log("-------------------------------------------------------")
            }
            this.substantiations.push(...this.resolver.popSubstantiationsFromLastCommand())
        }
        this.buildingBlock.push(...statement)
    }

    protected async executeInstructions(): Promise<void> {
        if (this.responder.verboseOutput)
            console.log("starting [JsonForcesGenerationInstructions]")
        await this.prepareForcesStatement()
    }

    protected constructResolver(): ForcesWorkTaskResolvable {
        return new JsonForcesGenerationInstructions.RESOLVER_CTR()
    }

    protected checkPreConditions(): any {
        let ret = false
        if (this.response.buildingBlocks.Problem.length > 0)
            ret = true
        return ret
    }

    protected checkPostConditions(): any {
        let ret = false
        if (this.response.buildingBlocks.Forces.length > 0)
            ret = true
        return ret
    }
}

export function register() {
    PatternGenerator.INSTRUCTIONS_REGISTRY.set("Forces", JsonForcesGenerationInstructions)
}
