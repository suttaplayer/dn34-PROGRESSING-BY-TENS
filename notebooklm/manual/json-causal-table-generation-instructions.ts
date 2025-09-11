import { BaseWorkTaskInstructions, PatternGenerator, WorkTaskResolvable } from "./pattern-generation-API.ts";
import { ThisOrThatConditionalityJson, SubjectJson } from "./pattern-API.ts"; // Ensure SubjectJson is imported correctly

/**
 * Interface for the CausalTableCommandResolver, extending the base WorkTaskResolvable.
 * This defines the contract for how the causal table is generated.
 */
export interface CausalTableWorkTaskResolvable extends WorkTaskResolvable {
  /**
   * Generates a comprehensive causal table for the given subjects by recursively
   * searching and parsing causal relationships from the source texts.
   * @param subjects An array of SubjectJson objects for which to build the causal table, now including array-based enterState/exitState.
   * @param existingCausalRelations Optional array of existing causal relations to build upon.
   * @returns A promise that resolves to an array of ThisOrThatConditionalityJson objects.
   */
  generateCausalTable(subjects: SubjectJson[], existingCausalRelations?: ThisOrThatConditionalityJson[]): Promise<ThisOrThatConditionalityJson[]>;
}

/**
 * Constructor type for CausalTableCommandResolver.
 */
export type CausalTableCommandResolverConstructor = new () => CausalTableWorkTaskResolvable;

/**
 * Instruction class for generating the Causal-Table building block.
 * This class orchestrates the calls to the CausalTableCommandResolver.
 */
export class JsonCausalTableGenerationInstructions extends BaseWorkTaskInstructions<ThisOrThatConditionalityJson[], CausalTableWorkTaskResolvable> {
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
  enterState: string[] // Updated type
  exitState: string[]   // Updated type
}

class ThisOrThatConditionalityJson <<(J, FF7700)>> {
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
PatternBuildingBlocksJson *--> "Causal-Table" ThisOrThatConditionalityJson: rings fences a catchment of\ncausation for the pattern >

ScopeJson --> "subject 1..*" SubjectJson: provides central concepts for >

ProblemJson --> "problemStatement" ProblemJson: provides context for causal relevance >

SubjectJson --> "causal relations 0..*" ThisOrThatConditionalityJson: is at the centre of the\ncausal catchment area >

ThisOrThatConditionalityJson "0..*" <--> "0..*" ThisOrThatConditionalityJson: forms a recursive, bi-directional tree >

note right of ThisOrThatConditionalityJson
The Causal-Table represents a directed graph
of 'this' causes 'that' relationships.
It's built by recursively tracing forward (effects)
and backward (causes) from each subject.
Relationships include direct causation, conditions,
constitutive links, and cessation.
Crucially, it links by abstract concepts, not raw expressions.
The 'enterState' of a subject defines the initial 'Context' leaves.
The 'exitState' of a subject defines the 'Resulting Context' leaves.
All intermediate causal links form the pattern's 'Solution'.
end note

@enduml
```
*/
  }

  async prepareCausalTable() {
    // Set execution context for the resolver
    // The problem statement provides valuable context for discerning relevant causal links.
    if (this.responder.response.buildingBlocks.Problem.length > 0) {
      this.resolver.executionContext = this.responder.response.buildingBlocks.Problem.join("\n");
    } else {
      // Fallback if Problem is not yet set, use subject name
      const subjectNames = this.response.buildingBlocks.Scope.subject.map(s => s.name).join(", ");
      this.resolver.executionContext = `Causal analysis for subjects: ${subjectNames}.`;
    }

    const subjects = this.response.buildingBlocks.Scope.subject;

    /*
    **Command:generate causal table** by recursively tracing forward (effects) and backward (causes) from each subject.
    **Approach:** I will use the `subjects` provided, specifically leveraging their `name`, `focusArea`, and the **array of core composite states** defined in `enterState` and `exitState` as starting points for exploring causal links. I will also incorporate any `existingCausalRelations` from `userDirectExperience`. The process will involve:
    1.  **Initial Exploration**: Start by identifying direct causes for `enterState` and direct effects for `exitState` and the subject `name` itself.
    2.  **Recursive Expansion**: For each new concept found, recursively search for its causes and effects, building a network of `ThisOrThatConditionalityJson` objects. Limit the depth of recursion to avoid over-generalization (e.g., maximum 3-4 levels of indirection).
    3.  **Concept Abstraction**: Utilize the `generaliseAndAbstractToConcept` command to standardize and abstract terms for the `this` and `that` fields of `ThisOrThatConditionalityJson`, ensuring consistency with the Core Composite States Inventory (Artifact 1) where applicable, or to an optimal level for causal analysis otherwise.
    4.  **Canonical Relation Types**: Map identified causal phrases from sources to the canonical `relation` types defined in `causation-expression-API.ts.txt` (e.g., `co-arises with`, `requisite condition`, `leads to`, `causes`). Pay close attention to `notThis`, `notThat`, and `cannot` flags.
    5.  **Quotation Referencing**: Store `quotationIndicies` to link each causal relation back to the determinant quotations.
    6.  **Integration Strategy**: Ensure that **all leaf causal-table nodes that link to `enterState` represent the pattern's initial `Context`**, **all `ThisOrThatConditionalityJson` entries that sit between the `enterState` and `exitState` nodes (and their direct causal chains) are part of the `Solution`**, and **all `exitState` nodes that link to leaf causal-table nodes are part of the `Resulting Context`**.
    **Guidance Followed:** I will use a systematic approach to traverse the causal graph, prioritizing direct and strong causal links, and abstracting concepts to a level that is useful for the overall pattern without becoming overly specific or too general. The `executionContext` (derived from the Problem statement) will guide the relevance of identified causal links. I will specifically leverage the predefined `CausalExpressionGuide` to interpret causal statements.
    **Substantiation (Example):** I will log the steps of the recursive search, the concepts being explored, the determinant quotations found, and the rationale for each `ThisOrThatConditionalityJson` added to the table, particularly how it relates to the `enterState`, `exitState`, and the subject's `name`.
    */
    const causalTable = await this.resolver.generateCausalTable(subjects, this.directExperience as ThisOrThatConditionalityJson[] | undefined);

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