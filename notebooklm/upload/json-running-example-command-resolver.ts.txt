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


import { JsonContextGenerationInstructions } from "./json-context-generation-instructions.ts";
import { JsonForcesGenerationInstructions } from "./json-forces-generation-instructions.ts";
import { JsonProblemGenerationInstructions, ProblemWorkTaskResolvable } from "./json-problem-generation-instructions.ts";
import { JsonScopeGenerationInstructions, ScopeWorkTaskResolvable } from "./json-scope-generation-instructions.ts";
import { CausalRelationJson, DeterminantQuotationString, PractitionerKey, SubjectJson } from "./pattern-API.ts";
import { WorkTaskResolver } from "./pattern-generation-API.ts";
import { CausalTableWorkTaskResolvable, JsonCausalTableGenerationInstructions } from "./json-causal-table-generation-instructions.ts"; // Import the new interface

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
    public async composeProblemStatement(subjects: SubjectJson[]): Promise<string> {
        const enterVal = subjects[0].enterFromState
        const exitVal = subjects[0].exitToState
        const ret = `How do you abandon ${enterVal} and enter and remain in ${exitVal}ness?`
        this.substantiationsStack.push("'abandon' within the sources is typically used to express a transition from a negative mind state. 'let go of' is identified in the miracle of instruction, but 'abandon' is more effective in this instance. 'enter and remain in' is typically used to express a transition to a positive mind state.")
        return ret
    }
}

class ContextCommandResolver extends CommandResolver {
    public async searchForContextWithRespectTo(subjects: SubjectJson[]): Promise<DeterminantQuotationString[]> {
      const ret = [
        "I don't envision a single thing that, when undeveloped, is as unpliant as the mind. The mind, when undeveloped, is unpliant.",
        "I don't envision a single thing that, when undeveloped, leads to such great harm as the mind. The mind, when undeveloped, leads to great harm.",
        "Luminous, monks, is the mind. And it is defiled by incoming defilements. The uninstructed run-of-the-mill person doesn't discern that as it has come to be, which is why I tell you that—for the uninstructed run-of-the-mill person—there is no development of the mind.",
        "Because of that gain, offerings, & fame he becomes intoxicated, complacent, & falls into heedlessness. Being heedless, he dwells in suffering & stress. This, monks, is called a monk who grasps the inner bark of the holy life, and with that he falls short.",
        "Monks who are arahants, whose mental effluents are ended... I don't say of them that they have a task to do with heedfulness... But as for monks in higher training, who have not yet reached their hearts' goal... I say of them that they have a task to do with heedfulness."
      ]
      return ret
    }

    public async composeContextStatement(subjects: SubjectJson[], determinantQuotations: DeterminantQuotationString[]): Promise<string[]> {
        const ret = [
          "A practitioner in higher training finds themselves in a state of heedlessness, where their undeveloped mind is unpliant and prone to great harm.",
          "Although naturally luminous, the mind is defiled by incoming defilements which an uninstructed person may fail to discern.",
          "This heedless condition is further characterised by complacency or intoxication arising from worldly gains and offerings.",
          "This situation applies particularly to monks in higher training who have not yet reached their hearts' goal, indicating a persistent, unfulfilled task that requires conscious effort and heedfulness."          
        ]
        const subst = [
          "The `enterFromState` for heedfulness is `heedlessness`.",
          "The sources directly link the `undeveloped mind` to being unpliant and causing great harm, aligning with the state of heedlessness.",
          "The mind's `luminosity being defiled by incoming defilements` is a characteristic of heedlessness in an uninstructed person, who lacks discernment.",
          "Worldly gains leading to `intoxicated, complacent, & falls into heedlessness` explicitly describes a state of heedlessness.",
          "The reference to `monks in higher training` having a task to do with heedfulness establishes the specific target audience for this pattern, aligning with the `medical diagnosis` analogy for the context."          
        ]
        this.substantiationsStack.push(...subst)
        return ret
    }
}

class ForcesCommandResolver extends CommandResolver {
    public async searchForForcesWithRespectTo(subjects: SubjectJson[]): Promise<DeterminantQuotationString[]> {
      const ret = [
        "I don't envision a single thing that, when undeveloped, is as unpliant as the mind. The mind, when undeveloped, is unpliant.",
        "Luminous, monks, is the mind. And it is defiled by incoming defilements.",
        "Defiled by passion, the mind is not released. Defiled by ignorance, discernment does not develop. Thus from the fading of passion is there awareness-release. From the fading of ignorance is there discernment-release.",
        "Craving is the ensnarer that has flowed along, spread out, and caught hold, with which this world is smothered & enveloped like a tangled skein, a knotted ball of string, like matted rushes and reeds, and does not go beyond transmigration, beyond the planes of deprivation, woe, & bad destinations.",
        "over-aroused persistence leads to restlessness, overly slack persistence leads to laziness.",
        "When one falls back on what was done in the past as being essential, monks, there is no desire, no effort (at the thought), 'This should be done. This shouldn't be done.'",
        "The Blessed One has compared sensual pleasures to a chain of bones: of much stress, much despair, & greater drawbacks."
      ]
      return ret
    }

    public async composeForcesStatement(subjects: SubjectJson[], determinantQuotations: DeterminantQuotationString[]): Promise<string[]> {
        const ret = [
          "The path from heedlessness to heedfulness is fraught with contradictory forces that make a simple or naive resolution insufficient.",
          "The undeveloped and unpliant mind remains highly susceptible to defilements such as passion, aversion, and delusion, hindering the clarity needed for progress.",
          "Worldly attractions like gains, offerings, and fame exacerbate this by fostering intoxication and complacency, which directly undermine the sustained effort required.",
          "The powerful grip of craving acts as an `ensnarer,` creating a `tangled skein` that binds individuals to undesirable states and impedes liberation from transmigration.",
          "Maintaining the right level of persistence is a delicate balance, as both over-arousal leads to restlessness and being overly slack leads to laziness.",
          "Misguided views on causality can extinguish the vital desire and effort to abandon unskillful qualities and cultivate skillful ones, preventing the consistent application of heedfulness."
        ]
        const subst = [
          "The initial state of `heedlessness` is linked to an undeveloped and unpliant mind, making it vulnerable to various defilements and rendering simple solutions ineffective.",
          "The sources highlight how defilements like `passion, aversion, & delusion` corrupt the mind, preventing release and discernment, thus acting as strong opposing forces.",
          "The metaphor of `craving as an 'ensnarer'` and a `tangled skein` illustrates the pervasive and complex nature of this force, which hinders liberation and justifies a nuanced solution.",
          "The necessity for `balanced persistence,` avoiding both restlessness and laziness, underscores the difficulty in maintaining the correct effort to move from heedlessness to heedfulness.",
          "Misguided views on causality, such as fatalism, can eliminate the motivation for effort and abandoning unskillful actions, acting as a significant force keeping one in heedlessness.",
          "The drawbacks of sensual pleasures, described as leading to `much stress, much despair, & greater drawbacks,` contribute to complacency and are a powerful force against cultivating heedfulness.",
          "These collective forces demonstrate why the `Heedful, ardent & resolute` pattern requires a specific, carefully considered solution rather than a simple approach."
        ]
        this.substantiationsStack.push(...subst)
        return ret
    }
}

class CausalTableCommandResolver extends CommandResolver implements CausalTableWorkTaskResolvable {
    public async generateCausalTable(subjects: SubjectJson[], existingCausalRelations?: CausalRelationJson[]): Promise<CausalRelationJson[]> {
        this.substantiationsStack.push("mocked generation of causal table for running example 'Heedful, ardent & resolute'");

        // For the running example "Heedful, ardent & resolute", we'll provide a simplified
        // set of causal relations, including paths to heedfulness and jhāna progression.
        const mockCausalTable: CausalRelationJson[] = [
            // Causes leading to Heedfulness (as discussed in previous turn)
            { this: "shame", relation: 3, that: "heedful" },
            { this: "compunction", relation: 3, that: "heedful" },
            { this: "admirable friendship", relation: 3, that: "shame" }, // Reciprocal link
            { this: "admirable friendship", relation: 3, that: "compunction" }, // Reciprocal link
            { this: "associating with people of integrity", relation: 3, that: "admirable friendship" },
            { this: "directing oneself rightly", relation: 3, that: "heedful" },
            { this: "having done merit in the past", relation: 3, that: "heedful" },
            { this: "clear knowing", relation: 3, that: "heedful" }, // Link to `generaliseAndAbstractToConcept` abstraction

            // Effects of Heedfulness (from discussion)
            { this: "heedful", relation: 3, that: "joy" },
            { this: "heedful", relation: 3, that: "ardent" },
            { this: "heedful", relation: 3, that: "resolute" },
            { this: "heedful", relation: 3, that: "easy to correct" },
            { this: "heedful", relation: 3, that: "conviction" },
            { this: "heedful", relation: 3, that: "release" },

            // Progressive meditative states (Jhānas as mountain peaks)
            { this: "seclusion from sensuality", relation: 1, that: "first jhāna" },
            { this: "first jhāna", relation: 3, notThat: true, that: "perception of sensuality" },
            { this: "stilling of directed thoughts & evaluations", relation: 3, that: "second jhāna" },
            { this: "second jhāna", relation: 3, notThat: true, that: "directed thoughts & evaluations" },
            { this: "fading of rapture", relation: 3, that: "third jhāna" },
            { this: "third jhāna", relation: 3, notThat: true, that: "rapture" },
            { this: "abandoning of pleasure & pain", relation: 3, that: "fourth jhāna" },
            { this: "fourth jhāna", relation: 3, notThat: true, that: "in-and-out breaths" },

            // Formless attainments (mountain peaks)
            { this: "transcending perceptions of physical form", relation: 3, that: "dimension of the infinitude of space" },
            { this: "dimension of the infinitude of space", relation: 3, notThat: true, that: "perception of forms" },
            { this: "transcending dimension of the infinitude of space", relation: 3, that: "dimension of the infinitude of consciousness" },
            { this: "dimension of the infinitude of consciousness", relation: 3, notThat: true, that: "perception of the infinitude of space" },
            { this: "transcending dimension of the infinitude of consciousness", relation: 3, that: "dimension of nothingness" },
            { this: "dimension of nothingness", relation: 3, notThat: true, that: "perception of the infinitude of consciousness" },
            { this: "transcending dimension of nothingness", relation: 3, that: "dimension of neither perception nor non-perception" },
            { this: "dimension of neither perception nor non-perception", relation: 3, notThat: true, that: "perception of nothingness" },
            { this: "transcending dimension of neither perception nor non-perception", relation: 3, that: "cessation of perception & feeling" },
            { this: "cessation of perception & feeling", relation: 3, notThat: true, that: "perceptions & feelings" },
            { this: "cessation of perception & feeling (seen with discernment)", relation: 3, that: "ending of effluents" },

            // Obstructions/Forces (from previous discussions)
            { this: "shamelessness", relation: 3, that: "heedlessness" },
            { this: "lack of compunction", relation: 3, that: "heedlessness" },
            { this: "heedlessness", relation: 3, cannot: true, that: "abandoning apathy" },
            { this: "heedlessness", relation: 3, cannot: true, that: "being hard to correct" },
            { this: "heedlessness", relation: 3, cannot: true, that: "evil friendship" },
            { this: "evil friendship", relation: 3, cannot: true, that: "abandoning a lack of conviction" },
            { this: "evil friendship", relation: 3, cannot: true, that: "abandoning stinginess" },
            { this: "evil friendship", relation: 3, cannot: true, that: "abandoning laziness" },
            { this: "laziness", relation: 3, cannot: true, that: "abandoning restlessness" },
            { this: "laziness", relation: 3, cannot: true, that: "abandoning a lack of restraint" },
            { this: "laziness", relation: 3, cannot: true, that: "abandoning poor virtue" },

            // Fetters (mountain peaks of abandonment)
            { this: "abandoning self-identification views, uncertainty, grasping at habits & practices", relation: 3, that: "stream-entry" },
            { this: "stream-entry", relation: 3, notThat: true, that: "self-identification views" },
            { this: "stream-entry", relation: 3, notThat: true, that: "uncertainty" },
            { this: "stream-entry", relation: 3, notThat: true, that: "grasping at habits & practices" },
            { this: "abandoning sensual desire & ill will", relation: 3, that: "non-returner" }, // Leads to non-returner
            { this: "non-returner", relation: 3, notThat: true, that: "sensual desire" },
            { this: "non-returner", relation: 3, notThat: true, that: "ill will" },
            { this: "abandoning higher fetters", relation: 3, that: "arahantship" }, // Passion for form, formless, conceit, restlessness, ignorance
            { this: "arahantship", relation: 3, notThat: true, that: "passion for form" },
            { this: "arahantship", relation: 3, notThat: true, that: "passion for what is formless" },
            { this: "arahantship", relation: 3, notThat: true, that: "conceit" },
            { this: "arahantship", relation: 3, notThat: true, that: "restlessness" },
            { this: "arahantship", relation: 3, notThat: true, that: "ignorance" },
        ];

        // Merge with any provided existing relations (e.g., from direct experience)
        const combinedCausalTable = existingCausalRelations ? [...existingCausalRelations, ...mockCausalTable] : mockCausalTable;

        return combinedCausalTable;
    }
}

export function register() {
    JsonScopeGenerationInstructions.RESOLVER_CTR = ScopeCommandResolver
    JsonProblemGenerationInstructions.RESOLVER_CTR = ProblemCommandResolver
    JsonContextGenerationInstructions.RESOLVER_CTR = ContextCommandResolver
    JsonForcesGenerationInstructions.RESOLVER_CTR = ForcesCommandResolver
    JsonCausalTableGenerationInstructions.RESOLVER_CTR = CausalTableCommandResolver
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
starting [JsonContextGenerationInstructions]
prepareContextStatement substantiations:
[
  "The `enterFromState` for heedfulness is `heedlessness`.",
  "The sources directly link the `undeveloped mind` to being unpliant and causing great harm, aligning with the state of heedlessness.",
  "The mind's `luminosity being defiled by incoming defilements` is a characteristic of heedlessness in an uninstructed person, who lacks discernment.",
  "Worldly gains leading to `intoxicated, complacent, & falls into heedlessness` explicitly describes a state of heedlessness.",
  "The reference to `monks in higher training` having a task to do with heedfulness establishes the specific target audience for this pattern, aligning with the `medical diagnosis` analogy for the context."
]
-------------------------------------------------------
starting [JsonForcesGenerationInstructions]
prepareForcesStatement substantiations:
[
  "The initial state of `heedlessness` is linked to an undeveloped and unpliant mind, making it vulnerable to various defilements and rendering simple solutions ineffective.",
  "The sources highlight how defilements like `passion, aversion, & delusion` corrupt the mind, preventing release and discernment, thus acting as strong opposing forces.",
  "The metaphor of `craving as an 'ensnarer'` and a `tangled skein` illustrates the pervasive and complex nature of this force, which hinders liberation and justifies a nuanced solution.",
  "The necessity for `balanced persistence,` avoiding both restlessness and laziness, underscores the difficulty in maintaining the correct effort to move from heedlessness to heedfulness.",
  "Misguided views on causality, such as fatalism, can eliminate the motivation for effort and abandoning unskillful actions, acting as a significant force keeping one in heedlessness.",
  "The drawbacks of sensual pleasures, described as leading to `much stress, much despair, & greater drawbacks,` contribute to complacency and are a powerful force against cultivating heedfulness.",
  "These collective forces demonstrate why the `Heedful, ardent & resolute` pattern requires a specific, carefully considered solution rather than a simple approach."
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
    "Context": [
      "A practitioner in higher training finds themselves in a state of heedlessness, where their undeveloped mind is unpliant and prone to great harm.",
      "Although naturally luminous, the mind is defiled by incoming defilements which an uninstructed person may fail to discern.",
      "This heedless condition is further characterised by complacency or intoxication arising from worldly gains and offerings.",
      "This situation applies particularly to monks in higher training who have not yet reached their hearts' goal, indicating a persistent, unfulfilled task that requires conscious effort and heedfulness."
    ],
    "Forces": [
      "The path from heedlessness to heedfulness is fraught with contradictory forces that make a simple or naive resolution insufficient.",
      "The undeveloped and unpliant mind remains highly susceptible to defilements such as passion, aversion, and delusion, hindering the clarity needed for progress.",
      "Worldly attractions like gains, offerings, and fame exacerbate this by fostering intoxication and complacency, which directly undermine the sustained effort required.",
      "The powerful grip of craving acts as an `ensnarer,` creating a `tangled skein` that binds individuals to undesirable states and impedes liberation from transmigration.",
      "Maintaining the right level of persistence is a delicate balance, as both over-arousal leads to restlessness and being overly slack leads to laziness.",
      "Misguided views on causality can extinguish the vital desire and effort to abandon unskillful qualities and cultivate skillful ones, preventing the consistent application of heedfulness."
    ],
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
    "Context": [
      "I don't envision a single thing that, when undeveloped, is as unpliant as the mind. The mind, when undeveloped, is unpliant.",
      "I don't envision a single thing that, when undeveloped, leads to such great harm as the mind. The mind, when undeveloped, leads to great harm.",
      "Luminous, monks, is the mind. And it is defiled by incoming defilements. The uninstructed run-of-the-mill person doesn't discern that as it has come to be, which is why I tell you that—for the uninstructed run-of-the-mill person—there is no development of the mind.",
      "Because of that gain, offerings, & fame he becomes intoxicated, complacent, & falls into heedlessness. Being heedless, he dwells in suffering & stress. This, monks, is called a monk who grasps the inner bark of the holy life, and with that he falls short.",
      "Monks who are arahants, whose mental effluents are ended... I don't say of them that they have a task to do with heedfulness... But as for monks in higher training, who have not yet reached their hearts' goal... I say of them that they have a task to do with heedfulness."
    ],
    "Forces": [
      "I don't envision a single thing that, when undeveloped, is as unpliant as the mind. The mind, when undeveloped, is unpliant.",
      "Luminous, monks, is the mind. And it is defiled by incoming defilements.",
      "Defiled by passion, the mind is not released. Defiled by ignorance, discernment does not develop. Thus from the fading of passion is there awareness-release. From the fading of ignorance is there discernment-release.",
      "Craving is the ensnarer that has flowed along, spread out, and caught hold, with which this world is smothered & enveloped like a tangled skein, a knotted ball of string, like matted rushes and reeds, and does not go beyond transmigration, beyond the planes of deprivation, woe, & bad destinations.",
      "over-aroused persistence leads to restlessness, overly slack persistence leads to laziness.",
      "When one falls back on what was done in the past as being essential, monks, there is no desire, no effort (at the thought), 'This should be done. This shouldn't be done.'",
      "The Blessed One has compared sensual pleasures to a chain of bones: of much stress, much despair, & greater drawbacks."
    ],
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
    "Context": [
      "The `enterFromState` for heedfulness is `heedlessness`.",
      "The sources directly link the `undeveloped mind` to being unpliant and causing great harm, aligning with the state of heedlessness.",
      "The mind's `luminosity being defiled by incoming defilements` is a characteristic of heedlessness in an uninstructed person, who lacks discernment.",
      "Worldly gains leading to `intoxicated, complacent, & falls into heedlessness` explicitly describes a state of heedlessness.",
      "The reference to `monks in higher training` having a task to do with heedfulness establishes the specific target audience for this pattern, aligning with the `medical diagnosis` analogy for the context."
    ],
    "Forces": [
      "The initial state of `heedlessness` is linked to an undeveloped and unpliant mind, making it vulnerable to various defilements and rendering simple solutions ineffective.",
      "The sources highlight how defilements like `passion, aversion, & delusion` corrupt the mind, preventing release and discernment, thus acting as strong opposing forces.",
      "The metaphor of `craving as an 'ensnarer'` and a `tangled skein` illustrates the pervasive and complex nature of this force, which hinders liberation and justifies a nuanced solution.",
      "The necessity for `balanced persistence,` avoiding both restlessness and laziness, underscores the difficulty in maintaining the correct effort to move from heedlessness to heedfulness.",
      "Misguided views on causality, such as fatalism, can eliminate the motivation for effort and abandoning unskillful actions, acting as a significant force keeping one in heedlessness.",
      "The drawbacks of sensual pleasures, described as leading to `much stress, much despair, & greater drawbacks,` contribute to complacency and are a powerful force against cultivating heedfulness.",
      "These collective forces demonstrate why the `Heedful, ardent & resolute` pattern requires a specific, carefully considered solution rather than a simple approach."
    ],
    "Rationale": [],
    "Resulting Context": [],
    "Related Patterns": [],
    "Case-studies": [],
    "Simile": []
  }
}

*/