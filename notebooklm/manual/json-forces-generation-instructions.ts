import { BaseWorkTaskInstructions, PatternGenerator, WorkTaskResolvable } from "./pattern-generation-API.ts";
import { DeterminantQuotationString, SubjectJson } from "./pattern-API.ts";

export interface ForcesWorkTaskResolvable extends WorkTaskResolvable {
  searchForForcesWithRespectTo(subjects: SubjectJson[]): Promise<DeterminantQuotationString[]>;
  composeForcesStatement(subjects: SubjectJson[], determinantQuotations: DeterminantQuotationString[]): Promise<string[]>;
}

export type ForcesCommandResolverConstructor = new () => ForcesWorkTaskResolvable;

export class JsonForcesGenerationInstructions extends BaseWorkTaskInstructions<string[], ForcesWorkTaskResolvable> {
  public static RESOLVER_CTR: ForcesCommandResolverConstructor;

  visualiseSolutionSpace() {
    /*
```plantuml
@startuml ./puml-images/JsonForcesGenerationInstructions-solution-space
header Created on: 2025-Oct-26
title Forces Instructions (Solution Space)
hide empty members

class PatternBuildingBlocksJson <<(J, FF7700)>> {}

class SubjectJson <<(J, FF7700)>> {
  name: string
  focusArea?: string[]
  enterState: string[] // Updated type
  exitState: string[]   // Updated type
  targetPractitioner: PractitionerKey[]
}

class ForcesJson <<(J, FF7700)>> {
  forcesStatement: string[] // Array of strings for forces points
}

class ScopeJson <<(J, FF7700)>> {
  subject: SubjectJson[]
}

class ProblemJson <<(J, FF7700)>> {
  problemStatement: string // Simplified for diagram
}

class PractitionerKey {
}

PatternBuildingBlocksJson *--> "Scope" ScopeJson
PatternBuildingBlocksJson *--> "Problem" ProblemJson
PatternBuildingBlocksJson *--> "Forces" ForcesJson: explains difficulties for the >

ScopeJson --> "subject 1..*" SubjectJson: provides central concepts for >

SubjectJson --> "targetPractitioner 1..*" PractitionerKey: guides the applicability for >

**SubjectJson --> "enterState 0..*" ForcesJson: explains the inherent conflicts in the initial mental/external state(s) >** // Updated to plural and new name
**SubjectJson --> "exitState 0..*" ForcesJson: explains the challenges in reaching the desired state(s) >** // Updated to plural and new name
SubjectJson --> "targetPractitioner 1..*" ForcesJson
ProblemJson --> "problemStatement" ForcesJson: clarifies the challenges faced in solving the >

note right of ForcesJson
The Forces section identifies contradictory
considerations or difficulties that explain why a
simple solution to the problem statement is insufficient.
It draws on the subjects' initial (enter) states,
their desired (exit) states, and the overall problem.
end note

@enduml
```
*/
  }

  async prepareForcesStatement() {
    this.resolver.executionContext = this.response.buildingBlocks.Problem.join("\n");

    // Search for forces now uses the updated SubjectJson, with enterState as string[]
    const determinantQuotations = await this.resolver.searchForForcesWithRespectTo(this.response.buildingBlocks.Scope.subject);

    determinantQuotations.forEach((quotation) => {
      this.quotationSet.add(quotation);
    });

    // Compose forces statement, also passing the updated SubjectJson
    const statement = await this.resolver.composeForcesStatement(this.response.buildingBlocks.Scope.subject, determinantQuotations);

    if (this.substantiations) {
      if (this.responder.verboseOutput) {
        console.log('prepareForcesStatement substantiations:');
        console.log(this.resolver.substantiationsStack);
        console.log("-------------------------------------------------------");
      }
      this.substantiations.push(...this.resolver.popSubstantiationsFromLastCommand());
    }

    this.buildingBlock.push(...statement);
  }

  protected async executeInstructions(): Promise<void> {
    if (this.responder.verboseOutput)
      console.log("starting [JsonForcesGenerationInstructions]");

    this.visualiseSolutionSpace();
    await this.prepareForcesStatement();
  }

  protected constructResolver(): ForcesWorkTaskResolvable {
    return new JsonForcesGenerationInstructions.RESOLVER_CTR();
  }

  protected checkPreConditions(): any {
    let ret = false;
    if (this.response.buildingBlocks.Problem.length > 0)
      ret = true;
    return ret;
  }

  protected checkPostConditions(): any {
    let ret = false;
    if (this.response.buildingBlocks.Forces.length > 0)
      ret = true;
    return ret;
  }
}

export function register() {
  PatternGenerator.INSTRUCTIONS_REGISTRY.set("Forces", JsonForcesGenerationInstructions);
}