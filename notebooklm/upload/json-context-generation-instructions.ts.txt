import { BaseWorkTaskInstructions, PatternGenerator, WorkTaskResolvable } from "./pattern-generation-API.ts";
import { DeterminantQuotationString, SubjectJson } from "./pattern-API.ts";
import { ProgressingByTens } from "./pbt-utils.ts"; // Assuming pbt-utils is still relevant and imported

export interface ContextWorkTaskResolvable extends WorkTaskResolvable {
  searchForContextWithRespectTo(subjects: SubjectJson[]): Promise<DeterminantQuotationString[]>;
  composeContextStatement(subjects: SubjectJson[], determinantQuotations: DeterminantQuotationString[]): Promise<string[]>;
}

export type ContextCommandResolverConstructor = new () => ContextWorkTaskResolvable;

export class JsonContextGenerationInstructions extends BaseWorkTaskInstructions<string[], ContextWorkTaskResolvable> {
  public static RESOLVER_CTR: ContextCommandResolverConstructor;

  visualiseSolutionSpace() {
    /*
```plantuml
@startuml ./puml-images/JsonContextGenerationInstructions-solution-space
header Created on: 2025-Oct-17
title Context Instructions (Solution Space)
hide empty members

class PatternBuildingBlocksJson <<(J, FF7700)>> {}

class SubjectJson <<(J, FF7700)>> {
  name: string
  focusArea?: string[]
  enterState: string[] // Updated type
  exitState: string[] // Updated type
  targetPractitioner: PractitionerKey[]
}

class ContextJson <<(J, FF7700)>> {
  contextStatement: string[] // Array of strings for context points
}

class ScopeJson <<(J, FF7700)>> {
  subject: SubjectJson[]
}

class ProblemJson <<(J, FF7700)>> {
  problemStatement: string[] // Simplified for diagram
}

class PractitionerKey {
}

PatternBuildingBlocksJson *--> "Scope" ScopeJson
PatternBuildingBlocksJson *--> "Problem" ProblemJson
PatternBuildingBlocksJson *--> "Context" ContextJson: provides a solution for a >

ScopeJson --> "subject 1..*" SubjectJson: provides central concepts for >

SubjectJson --> "targetPractitioner 1..*" PractitionerKey: guides the applicability for >

**SubjectJson --> "enterState 0..*" ContextJson: is diagnosed from the pattern's initial mental/external state(s) >**
SubjectJson --> "targetPractitioner 1..*" ContextJson
ProblemJson --> "problemStatement" ContextJson: is the underlying problem necessitating a >

note right of ContextJson
The Context section acts as a "medical diagnosis"
describing the practitioner's situation when the pattern
is applicable. It is derived from the subjects'
initial (enter) states and the problem statement,
detailing the prevalent unskillful qualities or external
conditions.
end note

@enduml
```
*/
  }

  async prepareContextStatement() {
    this.resolver.executionContext = this.response.buildingBlocks.Problem.join("\n");

    // Search for context now uses the updated SubjectJson, with enterState as string[]
    const determinantQuotations = await this.resolver.searchForContextWithRespectTo(this.response.buildingBlocks.Scope.subject);

    determinantQuotations.forEach((quotation) => {
      this.quotationSet.add(quotation);
    });

    // Compose context statement, also passing the updated SubjectJson
    const statement = await this.resolver.composeContextStatement(this.response.buildingBlocks.Scope.subject, determinantQuotations);

    if (this.substantiations) {
      if (this.responder.verboseOutput) {
        console.log('prepareContextStatement substantiations:');
        console.log(this.resolver.substantiationsStack);
        console.log("-------------------------------------------------------");
      }
      this.substantiations.push(...this.resolver.popSubstantiationsFromLastCommand());
    }

    this.buildingBlock.push(...statement);
  }

  protected async executeInstructions(): Promise<void> {
    if (this.responder.verboseOutput)
      console.log("starting [JsonContextGenerationInstructions]");

    this.visualiseSolutionSpace();
    await this.prepareContextStatement();
  }

  protected constructResolver(): ContextWorkTaskResolvable {
    return new JsonContextGenerationInstructions.RESOLVER_CTR();
  }

  protected checkPreConditions(): any {
    let ret = false;
    if (this.response.buildingBlocks.Problem.length > 0)
      ret = true;
    return ret;
  }

  protected checkPostConditions(): any {
    let ret = false;
    if (this.response.buildingBlocks.Context.length > 0)
      ret = true;
    return ret;
  }
}

export function register() {
  PatternGenerator.INSTRUCTIONS_REGISTRY.set("Context", JsonContextGenerationInstructions);
}