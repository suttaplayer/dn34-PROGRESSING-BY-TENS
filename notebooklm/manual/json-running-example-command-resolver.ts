/*
## Running Example

instructions are one things but examples of how a method has been applied is another. therefore, below the instructions for each work task, an example of resultant building blocks has been provided. however, often independent and over-simplisitic examples hide the nuances inherent in tasks that are coupled to the overrall process. to resolve this issues, this manual uses a **running-example**. 

the **"Heedful, ardent & resolute"** pattern whose associated answer-excerpt is **"Heedfulness with regard to skillful qualities"** has been used as a running example for this manual and it's sub-manuals. notebooklm must analyse the running example to follow the expert's methodology on how they implemented the instructions when crafting the resultant raw materials and building blocks. 

note, only the example plantuml diagrams are to be considered final drafts. all other sections or sub-sections examples are to be considered as work-in-progress that notebooklm must use as a reference.

> Which one dhamma is very helpful? Heedfulness with regard to skillful qualities: This one dhamma is very helpful.

there are pros and cons related to this topic selection:
* pro:
    1. it is the 1st progression and therefore there is only one subject
    2. heedfulness is critical subject that cross cuts the entire dhamma practice and is applicable to all practitioners in training
* con:
    1. it may result in an over-simplification of the resultant instruction manual. this may result in failure when apply the instruction manual to large progression topics eg. "Which eight dhammas are on the side of distinction?" this solution excerpt itself has 4827 characters.


the following json captures the desired generated pattern for this topic. note, the json below will be incomplete until this manual has been completed. as the collaborative effort progresses this json object below will get updated.

*/


import { JsonProblemGenerationInstructions, ProblemWorkTaskResolvable } from "./json-problem-generation-instructions.ts";
import { JsonScopeGenerationInstructions, ScopeWorkTaskResolvable } from "./json-scope-generation-instructions.ts";
import { DeterminantQuotationString, PractitionerKey, ScopeJson, SubjectJson } from "./pattern-API.ts";
import { WorkTaskResolver } from "./pattern-generation-API.ts";

class CommandResolver extends WorkTaskResolver {
    public async generaliseAndAbstractToConcept(term: string): Promise<string> {
       this.substantiationsStack.push(`mock of generalisation/abstraction of expression[${term}] to concept[${term}]`)
       return term
    }

}

class ScopeCommandResolver extends CommandResolver implements ScopeWorkTaskResolvable {
    public async parseAnswerExcerptAsSubjectJsonArray(answerExcerpt: string): Promise<SubjectJson[]> {
        const ret = [{name: "Heedfulness", focusArea: ["skillful qualities"], enterFromState: "", exitToState: "", targetPractitioner: []}]
        this.substantiationsStack.push("parsed as 1 subject & 1 focus area because `with regard to` denotes that the focusArea follows")
        return ret
    }

    public async searchForMindOrExternalStateWithRespectTo(subjectAndForcesExpression: string, boundaryType: string): Promise<DeterminantQuotationString[]> {
        const ret = ["[dont] ever let yourself get complacent when the ending of effluents is still unattained"]
        let substantiation: string
        if (boundaryType === "enter from") {
            ret.push("Because of that gain, he becomes intoxicated, complacent, & falls into heedlessness.")
            substantiation = "'[dont] ever let yourself get complacent' &  'falls into heedlessness' establish the enter from state"
        } else { 
            substantiation = "'when the ending of effluents is still unattained' establish the exit to state"
        }
        this.substantiationsStack.push(substantiation)
        return ret
    }

    public async parseMindOrExternalStateWithRespectTo(determinantQuotations: DeterminantQuotationString[], boundaryType: string): Promise<string> {
        let ret: string
        let substantiation: string
        if (boundaryType === "enter from") {
            ret = "heedlessness"
            substantiation = "heedfulness is a composite state of the mind. 'complacent' would be the first state after transition from 'heedlessness'"
        } else {
            ret = "heedful"
            substantiation = "heedfulness is a composite state of the mind. 'heedful' would be the final state from which there is no falling back"
        }
        this.substantiationsStack.push(substantiation)
        return ret
    }

    public async searchForTargetPracitionersWithRespectTo(subjectAndForcesExpression: string): Promise<DeterminantQuotationString[]> {
        const ret = ["Now, then, monks, I exhort you: All fabrications are subject to ending & decay. Reach consummation through heedfulness.' That was the Tathāgata's last statement [to a group of noble monks the most backward of which was a stream-enterer]"]
        this.substantiationsStack.push("provides a clear indication by the buddha himself at who the 'heedfulness' message was targetted at")
        return ret
    }

    public async parseTargetPractitionersWithRespectTo(determinantQuotations: DeterminantQuotationString[]): Promise<PractitionerKey[]> {
        this.substantiationsStack.push("although heedfulness is applicable to all practitioners, it is specifically applicable to leaners (ie. one-in-training)")
        return ["stream-enterer", "once-returner", "non-returner"]
    }
}

class ProblemCommandResolver extends CommandResolver implements ProblemWorkTaskResolvable {
    public async composePatternsProblemStatement(enterCompositeStates: Object, exitCompositeStates: Object, targetAnswer: string): Promise<string> {
        const enterVals = Object.values(enterCompositeStates)
        const exitVals = Object.values(exitCompositeStates)
        const ret = `How do you abandon ${enterVals[0]} and enter and remain in ${exitVals[0]}ness?`
        this.substantiationsStack.push("'abandon' within the sources is typically used to express a transition from a negative mind state. 'let go of' is identified in the miracle of instruction, but 'abandon' is more effective in this instance. 'enter and remain in' is typically used to express a transition to a positive mind state.")
        return ret
    }
}

class ContextCommandResolver extends CommandResolver {
    public async composeContextStatement(scope: ScopeJson): Promise<string[]> {
        const contextStatement = "As a **practitioner in higher training**, you find yourself in a state of **heedlessness**, where your undeveloped mind is **unpliant and prone to great harm**. Although naturally luminous, your mind is **defiled by incoming defilements** which, as an uninstructed individual, you may fail to discern. This heedless condition is further characterised by **complacency or intoxication arising from worldly gains and offerings**, indicating a persistent, unfulfilled task that requires conscious effort and heedfulness."

        
        return [contextStatement]
    }
}


export function register() {
    JsonScopeGenerationInstructions.RESOLVER_CTR = ScopeCommandResolver
    JsonProblemGenerationInstructions.RESOLVER_CTR = ProblemCommandResolver
}

/* deno --allow-read json-pattern-generation-instructions.ts

USER-QUERY [UserPatternRequestJson]
{
  "progressionIndex": 1,
  "categoryKey": "helpful",
  "includeSubstantiations": true,
  "verboseOutput": true
}
-------------------------------------------------------
starting [JsonScopeGenerationInstructions]
assignThePatternNameAndEstablishTheContext:
PATTERN: Heedful, ardent & resolute
Which one Dhamma is very helpful? 
Heedfulness with regard to skillful qualities
-------------------------------------------------------
parseTheAnswerExcerptAsSubjectJsonArray substantiations:
[
  "mock of generalisation/abstraction of expression[Heedfulness] to concept[Heedfulness]"
]
-------------------------------------------------------
determineEnterExitStatesAndPractitionerDetails [Heedfulness skillful qualities > enter from] substantiations:
[
  "'[dont] ever let yourself get complacent' &  'falls into heedlessness' establish the enter from state",
  "heedfulness is a composite state of the mind. 'complacent' would be the first state after transition from 'heedlessness'"
]
-------------------------------------------------------
determineEnterExitStatesAndPractitionerDetails [Heedfulness skillful qualities > exit to] substantiations:
[
  "'when the ending of effluents is still unattained' establish the exit to state",
  "heedfulness is a composite state of the mind. 'heedful' would be the final state from which there is no falling back"
]
-------------------------------------------------------
determineEnterExitStatesAndPractitionerDetails [Heedfulness skillful qualities > target practitioner] substantiations:
[
  "provides a clear indication by the buddha himself at who the 'heedfulness' message was targetted at",
  "although heedfulness is applicable to all practitioners, it is specifically applicable to leaners (ie. one-in-training)"
]
-------------------------------------------------------
starting [JsonProblemGenerationInstructions]
prepareProblemStatement substantiations:
[
  "'abandon' within the sources is typically used to express a transition from a negative mind state. 'let go of' is identified in the miracle of instruction, but 'abandon' is more effective in this instance. 'enter and remain in' is typically used to express a transition to a positive mind state."
]
-------------------------------------------------------
{
  "buildingBlocks": {
    "Scope": {
      "progressionIndex": 1,
      "categoryKey": "helpful",
      "patternName": "Heedful, ardent & resolute",
      "subject": [
        {
          "name": "Heedfulness",
          "focusArea": [
            "skillful qualities"
          ],
          "enterFromState": "heedlessness",
          "exitToState": "heedful",
          "targetPractitioner": [
            "stream-enterer",
            "once-returner",
            "non-returner"
          ]
        }
      ]
    },
    "Problem": [
      "How do you abandon heedlessness and enter and remain in heedfulness?"
    ],
    "Causal-Table": [],
    "Solution": {
      "Step-by-Step": [],
      "Cause-&-Effect": [],
      "Process View": [],
      "Concepts & Relationships": [],
      "State Transitions": []
    },
    "Context": [],
    "Forces": [],
    "Rationale": "",
    "Resulting Context": [],
    "Related Patterns": [],
    "Case-studies": [],
    "Simile": []
  },
  "quotationSheet": {
    "Scope": [
      "[dont] ever let yourself get complacent when the ending of effluents is still unattained",
      "Because of that gain, he becomes intoxicated, complacent, & falls into heedlessness.",
      "Now, then, monks, I exhort you: All fabrications are subject to ending & decay. Reach consummation through heedfulness.' That was the Tathāgata's last statement [to a group of noble monks the most backward of which was a stream-enterer]"
    ],
    "Problem": [],
    "Causal-Table": [],
    "Solution": {
      "Step-by-Step": [],
      "Cause-&-Effect": [],
      "Process View": [],
      "Concepts & Relationships": [],
      "State Transitions": []
    },
    "Context": [],
    "Forces": [],
    "Rationale": [],
    "Resulting Context": [],
    "Related Patterns": [],
    "Case-studies": [],
    "Simile": [],
    "Step-by-Step": [],
    "Cause-&-Effect": [],
    "Process View": [],
    "Concepts & Relationships": [],
    "State Transitions": []
  },
  "substantiations": {
    "Scope": [
      "parsed as 1 subject & 1 focus area because `with regard to` denotes that the focusArea follows",
      "mock of generalisation/abstraction of expression[Heedfulness] to concept[Heedfulness]",
      "'[dont] ever let yourself get complacent' &  'falls into heedlessness' establish the enter from state",
      "heedfulness is a composite state of the mind. 'complacent' would be the first state after transition from 'heedlessness'",
      "'when the ending of effluents is still unattained' establish the exit to state",
      "heedfulness is a composite state of the mind. 'heedful' would be the final state from which there is no falling back",
      "provides a clear indication by the buddha himself at who the 'heedfulness' message was targetted at",
      "although heedfulness is applicable to all practitioners, it is specifically applicable to leaners (ie. one-in-training)"
    ],
    "Problem": [
      "'abandon' within the sources is typically used to express a transition from a negative mind state. 'let go of' is identified in the miracle of instruction, but 'abandon' is more effective in this instance. 'enter and remain in' is typically used to express a transition to a positive mind state."
    ],
    "Causal-Table": [],
    "Solution": {
      "Step-by-Step": [],
      "Cause-&-Effect": [],
      "Process View": [],
      "Concepts & Relationships": [],
      "State Transitions": []
    },
    "Context": [],
    "Forces": [],
    "Rationale": [],
    "Resulting Context": [],
    "Related Patterns": [],
    "Case-studies": [],
    "Simile": []
  }
}

*/