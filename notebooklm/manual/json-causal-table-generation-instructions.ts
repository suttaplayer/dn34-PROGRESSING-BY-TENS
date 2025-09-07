import { BaseWorkTaskInstructions, PatternGenerator, WorkTaskResolvable } from "./pattern-generation-API.ts";
import { CausalRelationJson, SubjectJson } from "./pattern-API.ts";

/**
 * Interface for the CausalTableCommandResolver, extending the base WorkTaskResolvable.
 * This defines the contract for how the causal table is generated.
 */
export interface CausalTableWorkTaskResolvable extends WorkTaskResolvable {
    /**
     * Generates a comprehensive causal table for the given subjects by recursively
     * searching and parsing causal relationships from the source texts.
     * @param subjects An array of SubjectJson objects for which to build the causal table.
     * @param existingCausalRelations Optional array of existing causal relations to build upon.
     * @returns A promise that resolves to an array of CausalRelationJson objects.
     */
    generateCausalTable(subjects: SubjectJson[], existingCausalRelations?: CausalRelationJson[]): Promise<CausalRelationJson[]>;
}

/**
 * Constructor type for CausalTableCommandResolver.
 */
export type CausalTableCommandResolverConstructor = new () => CausalTableWorkTaskResolvable;

/**
 * Instruction class for generating the Causal-Table building block.
 * This class orchestrates the calls to the CausalTableCommandResolver.
 */
export class JsonCausalTableGenerationInstructions extends BaseWorkTaskInstructions<CausalRelationJson[], CausalTableWorkTaskResolvable> {

    public static RESOLVER_CTR: CausalTableCommandResolverConstructor;

    visualiseSolutionSpace() {
        /*
        ```plantuml
        @startuml ./puml-images/JsonCausalTableGenerationInstructions-solution-space

        header Created on: 2025-Oct-26
        title Causal-Table Instructions (Solution Space)
        hide empty members

        class PatternBuildingBlocksJson <<(J, FF7700)>> {}
        class SubjectJson <<(J, FF7700)>> {
            name: string
            focusArea?: string[]
            enterFromState: string
            exitToState: string
        }
        class CausalRelationJson <<(J, FF7700)>> {
            notThis?: boolean
            this: string
            relation: number
            cannot?: boolean
            notThat?: boolean
            that: string
            quotationIndicies?: number[]
        }
        class ScopeJson <<(J, FF7700)>> {
            subject: SubjectJson[]
        }
        class ProblemJson <<(J, FF7700)>> {
            problemStatement: string // Simplified for diagram
        }

        PatternBuildingBlocksJson *--> "Scope" ScopeJson
        PatternBuildingBlocksJson *--> "Problem" ProblemJson
        PatternBuildingBlocksJson *--> "Causal-Table" CausalRelationJson: rings fences a catchment of\ncausation for the pattern >

        ScopeJson --> "subject 1..*" SubjectJson: provides central concepts for >
        ProblemJson --> "problemStatement" ProblemJson: provides context for causal relevance >

        SubjectJson --> "causal relations 0..*" CausalRelationJson: is at the centre of the\ncausal catchment area >
        CausalRelationJson "0..*" <--> "0..*" CausalRelationJson: forms a recursive, bi-directional tree >

        note right of CausalRelationJson
            The Causal-Table represents a directed graph
            of 'this' causes 'that' relationships.
            It's built by recursively tracing forward (effects)
            and backward (causes) from each subject.
            Relationships include direct causation, conditions,
            constitutive links, and cessation.
            Crucially, it links by abstract concepts, not raw expressions.
        end note

        @enduml
        ```
        */
    }

    async prepareCausalTable() {
        // Set execution context for the resolver
        // The problem statement provides valuable context for discerning relevant causal links.
        if (this.responder.response.buildingBlocks.Problem.length > 0) {
            this.resolver.executionContext = this.responder.response.buildingBlocks.Problem[0];
        } else {
            // Fallback if Problem is not yet set, use subject name
            const subjectNames = this.response.buildingBlocks.Scope.subject.map(s => s.name).join(", ");
            this.resolver.executionContext = `Causal analysis for subjects: ${subjectNames}.`;
        }

        const subjects = this.response.buildingBlocks.Scope.subject;

        // Retrieve existing causal relations (e.g., from direct experience)
        const existingCausalRelations = this.directExperience as CausalRelationJson[] | undefined;

        // Generate the causal table using the resolver
        const causalTable = await this.resolver.generateCausalTable(subjects, existingCausalRelations);

        // Populate substantiations if verbose output is enabled
        if (this.substantiations) {
            if (this.responder.verboseOutput) {
                console.log('prepareCausalTable substantiations:');
                console.log(this.resolver.substantiationsStack);
                console.log("-------------------------------------------------------");
            }
            this.substantiations.push(...this.resolver.popSubstantiationsFromLastCommand());
        }

        // Assign the generated causal table to the building block
        this.buildingBlock.push(...causalTable);
    }

    protected async executeInstructions(): Promise<void> {
        if (this.responder.verboseOutput) {
            console.log("starting [JsonCausalTableGenerationInstructions]");
        }
        this.visualiseSolutionSpace();
        await this.prepareCausalTable();
    }

    protected constructResolver(): CausalTableWorkTaskResolvable {
        return new JsonCausalTableGenerationInstructions.RESOLVER_CTR();
    }

    protected checkPreConditions(): any {
        // Causal-Table is dependent on Scope (subjects) and Problem (context for relevance)
        let ret = false;
        if (this.response.buildingBlocks.Scope.subject.length > 0 && this.response.buildingBlocks.Problem.length > 0) {
            ret = true;
        }
        return ret;
    }

    protected checkPostConditions(): any {
        let ret = false;
        if (this.buildingBlock.length > 0) {
            ret = true;
        }
        return ret;
    }
}

/**
 * Register function to link these instructions to the PatternGenerator.
 */
export function register() {
    PatternGenerator.INSTRUCTIONS_REGISTRY.set("Causal-Table", JsonCausalTableGenerationInstructions);
}
