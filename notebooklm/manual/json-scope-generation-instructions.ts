import { BaseWorkTaskInstructions, PatternGenerator, WorkTaskResolvable } from "./pattern-generation-API.ts";
import { DeterminantQuotationString, PractitionerKey, ScopeJson, SubjectJson } from "./pattern-API.ts";
import { ProgressingByTens } from "./pbt-utils.ts";

export interface ScopeWorkTaskResolvable extends WorkTaskResolvable {
  parseAnswerExcerptAsSubjectJsonArray(answerExcerpt: string): Promise<SubjectJson[]>;
  searchForMindOrExternalStateWithRespectTo(subjectAndForcesExpression: string, boundaryType: string): Promise<DeterminantQuotationString[]>;
  parseMindOrExternalStateWithRespectTo(determinantQuotations: DeterminantQuotationString[], boundaryType: string): Promise<string[]>; // Updated return type
  searchForTargetPracitionersWithRespectTo(subjectAndForcesExpression: string): Promise<DeterminantQuotationString[]>;
  parseTargetPractitionersWithRespectTo(determinantQuotations: DeterminantQuotationString[]): Promise<PractitionerKey[]>;
}

export type ScopeCommandResolverConstructor = new () => ScopeWorkTaskResolvable;

export class JsonScopeGenerationInstructions extends BaseWorkTaskInstructions<ScopeJson, ScopeWorkTaskResolvable> {
  public static RESOLVER_CTR: ScopeCommandResolverConstructor;

  // answerExcerpt is now a property of the class instance
  private answerExcerpt: string = ""; 

  visualiseSolutionSpace() {
    /*
```plantuml
@startuml ./puml-images/JsonScopeGenerationInstructions-solution-space
header Created on: 2025-aug-30
title Scope Instructions (Solution Space)
hide empty members

class PatternBuildingBlocksJson <<(J, FF7700)>> {}

class SubjectJson <<(J, FF7700)>> {
  name: string
  focusArea?: string[]
  enterState: string[]
  exitState: string[]
}

class ScopeJson <<(J, FF7700)>> {
  progressionIndex: number
  categoryKey: CategoryKey
  patternName: string
}

enum PractitionerKey {
  conviction-dhamma-follower
  stream-enterer
  once-returner
  non-returner
}

class StatePlantUMLDiagramText <<(J, FF7700)>> {
  + entryState
  + exitState
}

class ContextJson <<(J, FF7700)>> {
}

class CausalRelationJson <<(J, FF7700)>> {
}

class Problem <<(J, FF7700)>>

PatternBuildingBlocksJson *--> "Scope" ScopeJson: constrains the solution via >
PatternBuildingBlocksJson *--> "State Transitions 1..*" StatePlantUMLDiagramText: models the solutions\nstate machine via >
PatternBuildingBlocksJson *--> "Context" ContextJson: provides a solution for a >
PatternBuildingBlocksJson *--> "Causal-Table" CausalRelationJson: rings fences a catchment of\ncausation with respect to the solution >
PatternBuildingBlocksJson *--> "Problem" Problem: addresses a >

ScopeJson --> "subject 1..*" SubjectJson: its context has >

SubjectJson --> "targetPractitioner 1..*" PractitionerKey: targets a specific >
SubjectJson::enterState --> StatePlantUMLDiagramText::entryState: establishes the key begining state\nin the state transition diagram >
SubjectJson::exitState --> StatePlantUMLDiagramText::exitState: establishes the key ending state\nin the state transition diagram >

SubjectJson --> "targetPractitioner 1..*" ContextJson
SubjectJson --> "cause/effect 1..*" CausalRelationJson: is the centre of the catchment >
SubjectJson --> Problem: How do you go\nfrom \nto

@enduml
```
*/
  }

  assignThePatternNameAndEstablishTheContext() {
    const patternName = ProgressingByTens.lookupPatternName(this.request);
    this.responder.response.buildingBlocks["Scope"].patternName = patternName;

    this.answerExcerpt = ProgressingByTens.lookupAnswerExcerpt(this.request);

    /* **Command:Append To Context Window** ${this.resolver.executionContext} // notebooklm to verify if this is of any benefit
    */
    this.resolver.executionContext = `PATTERN: ${patternName}\n${ProgressingByTens.revealContextStatement(this.request)}`;

    if (this.responder.verboseOutput) {
      console.log('assignThePatternNameAndEstablishTheContext:');
      console.log(this.resolver.executionContext);
      console.log("-------------------------------------------------------");
    }
  }

  async parseTheAnswerExcerptAsSubjectJsonArray(): Promise<void> {
    /*
    * **Command:parse** the `answerExcerpt` for `SubjectJson[]`.
    * **Approach:** I will use advanced natural language processing to **parse** the `answerExcerpt`. This involves identifying distinct concepts that represent subjects, and any modifying phrases that denote `focusArea` (e.g., "with regard to skillful qualities" for "Heedfulness"). I will then structure these into `SubjectJson` objects, initially leaving `enterState`, `exitState`, and `targetPractitioner` as empty or default values as specified.
    * **Guidance Followed:** I will strictly adhere to the instruction to identify distinct and sequential requisite conditions, different immediate outcomes, or varying `enterState`/`exitState` as criteria for parsing separate `SubjectJson` objects. The `progressionIndex` will guide the maximum number of subjects to extract.
    * **Substantiation (Example):** I will log my reasoning for how the excerpt was parsed, noting the identification of subjects and their associated focusAreas, as demonstrated in the running example (e.g., "parsed as 1 subject & 1 focus area because `with regard to` denotes that the `focusArea` follows").
    */
    const subjects = await this.resolver.parseAnswerExcerptAsSubjectJsonArray(this.answerExcerpt);

    if (this.substantiations) {
      if (this.responder.verboseOutput) {
        console.log('parseTheAnswerExcerptAsSubjectJsonArray substantiations:');
        console.log(this.resolver.substantiationsStack);
        console.log("-------------------------------------------------------");
      }
      this.substantiations.push(...this.resolver.popSubstantiationsFromLastCommand());
    }
    this.buildingBlock.subject.push(...subjects);
  }

  considerExceptionalCasesForAnswerExcerptParsing() {
    /*
    the parsing approach will typically work for the majority of the 100 topics. however, there are exceptions that notebooklm will need to manage.
    consider the following case1:
    > Which three dhammas should be developed? Three concentrations: concentration with directed thought & evaluation, concentration without directed thought & with a modicum of evaluation, concentration without directed thought & evaluation.
    this case can be parsed in two ways:
    1. three subjects
    1. concentration with directed thought
    2. concentration without directed thought & with a modicum of evaluation
    3. concentration without directed thought & evaluation
    2. one subject with three focusAreas:
    1. concentration
    1. with directed thought
    2. without directed thought & with a modicum of evaluation
    3. without directed thought & evaluation
    notebooklm should choose three subjects in this case to avoid the loss of too much critical data for the topic. note, in the case of one subject, the entry & exit states are generalised (ie. enter: hindered, exit: discernment). where as the three subjects entry and exit states are specialised (ie. enter1: singleness of mind, exit1: 1st jhana; enter2: 1st jhana, exit2: refined 1st jhana; enter3: refined 1st jhana, exit3: 2nd jhana). the resulting analysis will be completely different.
    consider the following case2:
    > Which four dhammas are hard to penetrate? Four concentrations: concentration that has a share in decline, concentration that has a share in stability, concentration that has a share in distinction, concentration that has a share in penetration.
    notebooklm should choose four subjects in this case to avoid the wrong analysis (ie. concentration that has a share in decline is wrong concentration which focuses on sensuality, ill will & harmfulness. a generalised concentration topic as previously discussed has different entry/exit states).
    */
    if (this.request.categoryKey === "developed" && this.request.progressionIndex === 3) {
        if (this.substantiations) 
            this.substantiations.push("parsing 'concentration with directed thought & evaluation' as three distinct subjects to avoid loss of critical data and maintain specialized entry/exit states");
    } else if (this.request.categoryKey === "penetrate" && this.request.progressionIndex === 4) {
        if (this.substantiations) 
            this.substantiations.push("parsing 'concentration that has a share in decline, stability, distinction, & penetration' as four distinct subjects to avoid wrong analysis due to differing semantic nuances and boundary states.");
    }
  }

  async determineEnterExitStatesAndPractitionerDetails() {
    for (const subj of this.buildingBlock.subject) {
      const subjFocusSearchExpr = [subj.name, ...(subj.focusArea || [])].filter(Boolean).join(" ");
      const aspects = ["enter state", "exit state", "target practitioner"]; // Updated boundaryType strings

      for (const aspect of aspects) {
        if (this.substantiations) {
          if (this.responder.verboseOutput) {
            console.log(`determineEnterExitStatesAndPractitionerDetails [${subjFocusSearchExpr} > ${aspect}] substantiations:`);
            console.log(this.resolver.substantiationsStack);
            console.log("-------------------------------------------------------");
          }
          this.substantiations.push(...this.resolver.popSubstantiationsFromLastCommand());
        }

        if (aspect === "target practitioner") {
          const determinantQuotations = await this.resolver.searchForTargetPracitionersWithRespectTo(subjFocusSearchExpr);
          if (determinantQuotations?.length > 0) {
            subj.targetPractitioner = await this.resolver.parseTargetPractitionersWithRespectTo(determinantQuotations);
            determinantQuotations.forEach((quotation) => {
              this.quotationSet.add(quotation);
            });
          }
        } else {
          // This block handles both 'enter state' and 'exit state'
          const mindOrExternalStates = await this.determineBoundaryStateWithRespectTo(subjFocusSearchExpr, aspect); // Returns string[] | undefined
          if (mindOrExternalStates) {
            if (aspect === "enter state") {
              subj.enterState = mindOrExternalStates; // Assign the array
            } else { // aspect === "exit state"
              subj.exitState = mindOrExternalStates; // Assign the array
            }
          }
        }
      }
    }
  }

  async determineBoundaryStateWithRespectTo(searchExpr: string, boundaryType: string): Promise<string[] | undefined> { // Updated return type
    /*
    dhamma practice is a training of the mind and more often than not, the states of significance are in relation to the mind's composite states.
    the "progressing by tens" framework is all about the development of skillful qualities and the abandoning of unskillful qualities. most qualities are internal mental qualities, but there are a few external qualities (eg. admirable friendship, living in a civilised land, having done merit in the past etc.)
    given that all skillful qualities converge and are rooted in heedfulness. its would reduce the value & quality of all the artifacts if they all had an enter from state of "heedfulness". therefore, notebooklm is encouraged to look deeper at the "nearest branch" state (as opposed to root state) when identifying the enter from state.
    */
    let mindOrExternalStates: string[] | undefined = undefined; // Updated type

    const determinantQuotations = await this.resolver.searchForMindOrExternalStateWithRespectTo(searchExpr, boundaryType);

    if (determinantQuotations?.length > 0) {
      mindOrExternalStates = await this.resolver.parseMindOrExternalStateWithRespectTo(determinantQuotations, boundaryType); // Now returns string[]
      determinantQuotations.forEach((quotation) => {
        this.quotationSet.add(quotation);
      });
    }

    return mindOrExternalStates;
  }

  async determineTargetPracititionerWithRespectTo(searchExpr: string): Promise<PractitionerKey[]> {
    /*
    the "progressing by tens" framework covers a spectrum of topics. some are suited for conviction and dhamma followers, whilst others are extremely advanced practices that are suited for non-returners. these patterns are like medical prescriptions; thus, if a practitioner doesnt suffer a given context, then they shouldnt follow the solution.
    */
    let targetPractitioners: PractitionerKey[] = [];

    const determinantQuotations = await this.resolver.searchForTargetPracitionersWithRespectTo(searchExpr);

    if (determinantQuotations?.length > 0) {
      targetPractitioners = await this.resolver.parseTargetPractitionersWithRespectTo(determinantQuotations);
      determinantQuotations.forEach((quotation) => {
        this.quotationSet.add(quotation);
      });
    }

    return targetPractitioners;
  }

  protected async executeInstructions(): Promise<void> {
    if (this.responder.verboseOutput) {
      console.log("starting [JsonScopeGenerationInstructions]");
    }

    this.visualiseSolutionSpace();
    this.assignThePatternNameAndEstablishTheContext();
    this.considerExceptionalCasesForAnswerExcerptParsing(); // Call this before parsing subjects
    await this.parseTheAnswerExcerptAsSubjectJsonArray();
    await this.determineEnterExitStatesAndPractitionerDetails();
  }

  protected constructResolver(): ScopeWorkTaskResolvable {
    return new JsonScopeGenerationInstructions.RESOLVER_CTR();
  }

  protected checkPreConditions(): any {
    let ret = false;
    if (this.request.progressionIndex > 0 && this.request.categoryKey) {
      ret = true;
    }
    return ret;
  }

  protected checkPostConditions(): any {
    let ret = false;
    if (this.buildingBlock.subject.length > 0) {
      ret = true;
    }
    return ret;
  }
}

export function register() {
  PatternGenerator.INSTRUCTIONS_REGISTRY.set("Scope", JsonScopeGenerationInstructions);
}