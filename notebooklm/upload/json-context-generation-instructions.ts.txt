import { BaseWorkTaskInstructions, PatternGenerator, WorkTaskResolvable } from "./pattern-generation-API.ts";
import { DeterminantQuotationString, SubjectJson } from "./pattern-API.ts";

export interface ContextWorkTaskResolvable extends WorkTaskResolvable {
    searchForContextWithRespectTo(subjects: SubjectJson[]): Promise<DeterminantQuotationString[]>
    composeContextStatement(subjects: SubjectJson[], determinantQuotations: DeterminantQuotationString[]): Promise<string[]>
}

export type ContextCommandResolverConstructor = new () => ContextWorkTaskResolvable

export class JsonContextGenerationInstructions extends BaseWorkTaskInstructions<string[], ContextWorkTaskResolvable> {
    public static RESOLVER_CTR: ContextCommandResolverConstructor

    async prepareContextStatement() {
        this.resolver.executionContext = this.response.buildingBlocks.Problem[0]
        const determinantQuotations = await this.resolver.searchForContextWithRespectTo(this.response.buildingBlocks.Scope.subject)
        determinantQuotations.forEach((quotation) => {
                this.quotationSet.add(quotation)
        })
        const statement = await this.resolver.composeContextStatement(this.response.buildingBlocks.Scope.subject, determinantQuotations)
        if (this.substantiations) {
            if (this.responder.verboseOutput) {
                console.log('prepareContextStatement substantiations:')
                console.log(this.resolver.substantiationsStack)
                console.log("-------------------------------------------------------")
            }
            this.substantiations.push(...this.resolver.popSubstantiationsFromLastCommand())
        }
        this.buildingBlock.push(...statement)
    }

    protected async executeInstructions(): Promise<void> {
        if (this.responder.verboseOutput)
            console.log("starting [JsonContextGenerationInstructions]")
        await this.prepareContextStatement()
    }

    protected constructResolver(): ContextWorkTaskResolvable {
        return new JsonContextGenerationInstructions.RESOLVER_CTR()
    }

    protected checkPreConditions(): any {
        let ret = false
        if (this.response.buildingBlocks.Problem.length > 0)
            ret = true
        return ret
    }

    protected checkPostConditions(): any {
        let ret = false
        if (this.response.buildingBlocks.Context.length > 0)
            ret = true
        return ret
    }
}

export function register() {
    PatternGenerator.INSTRUCTIONS_REGISTRY.set("Context", JsonContextGenerationInstructions)
}
