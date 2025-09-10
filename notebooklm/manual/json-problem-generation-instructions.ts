import { BaseWorkTaskInstructions, PatternGenerator, WorkTaskResolvable } from "./pattern-generation-API.ts";
import { SubjectJson } from "./pattern-API.ts";
import { ProgressingByTens } from "./pbt-utils.ts";

export interface ProblemWorkTaskResolvable extends WorkTaskResolvable {
  composeProblemStatement(subjects: SubjectJson[]): Promise<string>;
}

export type ProblemCommandResolverConstructor = new () => ProblemWorkTaskResolvable;

export class JsonProblemGenerationInstructions extends BaseWorkTaskInstructions<string[], ProblemWorkTaskResolvable> {
  public static RESOLVER_CTR: ProblemCommandResolverConstructor;

  visualiseSolutionSpace() {
    /*
```plantuml
@startuml ./puml-images/JsonProblemGenerationInstructions-solution-space
header Created on: 2025-sep-04
title Problem Instructions (Solution Space)
hide empty members

class PatternBuildingBlocksJson <<(J, FF7700)>> {}

class SubjectJson <<(J, FF7700)>> {
  name: string
  focusArea?: string[]
  enterState: string[]
  exitState: string[]
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

Problem .. (SubjectJson, MindStateOrExternalState): is expressed as transition to a\nsummation of exitStates
Problem .. (SubjectJson, MindStateOrExternalState): is expressed as transition from a\nsummation of enterStates

@enduml
```
*/
  }

  async prepareProblemStatement() {
    const answerExcerpt = ProgressingByTens.lookupAnswerExcerpt(this.request);
    this.resolver.executionContext = answerExcerpt;

    // The resolver.composeProblemStatement now expects subjects with array-based enterState/exitState
    const statement = await this.resolver.composeProblemStatement(this.response.buildingBlocks.Scope.subject);

    if (this.substantiations) {
      if (this.responder.verboseOutput) {
        console.log('prepareProblemStatement substantiations:');
        console.log(this.resolver.substantiationsStack);
        console.log("-------------------------------------------------------");
      }
      this.substantiations.push(...this.resolver.popSubstantiationsFromLastCommand());
    }
    this.buildingBlock.push(statement);
  }

  protected async executeInstructions(): Promise<void> {
    if (this.responder.verboseOutput)
      console.log("starting [JsonProblemGenerationInstructions]");

    this.visualiseSolutionSpace();
    await this.prepareProblemStatement();
  }

  protected constructResolver(): ProblemWorkTaskResolvable {
    return new JsonProblemGenerationInstructions.RESOLVER_CTR();
  }

  protected checkPreConditions(): any {
    let ret = false;
    if (this.response.buildingBlocks.Scope.subject.length > 0)
      ret = true;
    return ret;
  }

  protected checkPostConditions(): any {
    let ret = false;
    if (this.response.buildingBlocks.Problem.length > 0)
      ret = true;
    return ret;
  }
}

export function register() {
  PatternGenerator.INSTRUCTIONS_REGISTRY.set("Problem", JsonProblemGenerationInstructions);
}