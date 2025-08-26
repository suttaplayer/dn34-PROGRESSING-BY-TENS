# Prepare the content for the pattern's "Causal-Table"

> 'It's not easy to teach the Dhamma to others, Ānanda.
* 'The Dhamma should be taught with the thought, 'I will speak step-by-step.'
* 'The Dhamma should be taught with the thought, 'I will speak explaining the sequence (of cause & effect).'

now consider:
* humans follow processes, do activities and reach milestones. the dhamma however, is most often expressed in terms of causation, this causes that, leads to, results in, benefit, reward etc.
* a student being told that they need to practice the noble eightful path. they having been told that, are immediately perplexed. the student needs to transform an event based causal model (ie. when this, then that) with principles and transform it into a concrete process that they can follow, complete activities and achieve milestones. due to dull discernment, it often results in failure! the various aspects of the overrall solution is intended to resolve that issue.

the sutta texts are sources that document causation which can both be implicitly and explicitly inferred. notebooklm has superior inference, logic and reasoning skills which are required for this task. notebooklm should be able to identify links between disparate causal chains and/or activities that are not explicitly stated. teaching and learning dhamma is largely an exercise in language. because notebooklm is an LLM, it should be well positioned to perform this task.


## Abstraction and Generalisation
to be effective at the set of tasks related to causal-table generation, notebooklm must be able to establish connections between different representations of the same expression in a given context. for eg. learning = listening, person of integrity = admirable friendship, teacher = admirable friendship, person consumate in virtue/view = one-in training, person consumate in concentration = non-returner or higher etc.

in this set of work tasks notebooklm will thus be encouraged to abstract and generalise a term or experssion to its most frequent representation from the sources in order to optimise the causal-table. clearly there is a balance here; being overly specialised will result in excessive complexity, however, being overly generalised will result in excessive simplicity. recall the assessment goal of distinction, that is, to pursue the state of nothing missing, and nothing in excess!

**Retain common and frequent terms without further abstraction**
terms that are already widely understood and used in the sources, such as "**right view**" and "**wrong view**," should be maintained as they are, rather than being generalized to broader categories like "skillful view" or "unskillful view."

**Generalize descriptive phrases to their core conceptual terms to facilitate linking in process diagrams.**
The goal is to create consistent, concise labels that serve as effective anchor points for connecting causal entries in future PlantUML activity diagrams and other process views [guide_plantuml_activity_diagram.md].
*   Specifically, update the examples to reflect the following:
    *   Phrases like "**persistence aroused**" should be generalized to "**persistence**"
    *   Phrases like "**established mindfulness**" should be generalized to "**mindfulness**"
    *   Phrases like "**centered in concentration**" should be generalized to "**concentration**"
    *   Activities like "**practice jhāna**" should be generalized to "**jhāna**"


## Causal References
it is important to realise that many of the lists that are in the sutta sources are in fact causal chains. you can safely assume that about 90% of lists are causal chains. even the five-clinging aggregates is itself a causal chain, you just need to know how to see it. therefore, proceed with the assumption that any given list is a causal chain and the expert will identify the exceptions when the section is reviewed.

use the source "guide_causation_expression.md" for some candidate causation expressions as a means for searching. note, this causation expression guide is not comprehensive! it declares many of the following common cases:
**1. Direct Causation (A leads to B)**
**2. Conditions & Prerequisites (A enables B)**
**3. Consequences & Results (B from A)**
**4. Cessation (Absence of A leads to absence of B)**
**5. Purpose & Means (A for B)**
**6. Queries & Explanations**
**7. Negated Causation**


However, NotebookLM must identify causal expressions within various sentence structures, including **sequential causal chains (often presented as lists)** and **grouped statements, especially those describing cessation or co-arising factors**.

For **direct sequential causal chains** (e.g., "A leads to B leads to C"), the parsing logic demonstrated in the `convertFromQuotationToCauseAndEffect` method within `PBT-causal-table-builder.ts.txt` serves as the **authoritative and correct approach** for translating such quotations into `CauseAndEffectJson` arrays. This method correctly translates a sequence of conditions into ordered cause-and-effect pairs.

**Groups**
Example 1. consider the following quotation that describes **cessation through abandonment**:

> 'Abandoning three things, one is capable of abandoning self-identification views, abandoning uncertainty, abandoning grasping at habits & practices. Which three? Inappropriate attention, following a wrong path, & slowness of awareness…

from the above quote, the following causal relationships (framed in terms of cessation/abandonment) can be inferred, utilizing the `not-cause` and `not-effect` properties in the `CauseAndEffectJson` to accurately reflect the source text:
*  **Abandoning inappropriate attention leads to abandoning self-identification views.**
*  **Abandoning following a wrong path leads to abandoning uncertainty.**
*  **Abandoning slowness of awareness leads to abandoning grasping at habits & practices.**

When generating the `CauseAndEffectJson` for this type of cessation statement, the structure should reflect the 'not-cause' leads to 'not-effect' relationship. For example:
```json
[
  {"not-cause": true, "cause": "inappropriate attention", "not-effect": true, "effect": "self-identification views", "quotation-index": [INDEX]},
  {"not-cause": true, "cause": "following a wrong path", "not-effect": true, "effect": "uncertainty", "quotation-index": [INDEX]},
  {"not-cause": true, "cause": "slowness of awareness", "not-effect": true, "effect": "grasping at habits & practices", "quotation-index": [INDEX]}
]
```
*(The `[INDEX]` placeholder refers to the `quotation-index` from the `patternQuotationsJson["Causal-Table"]` array, which NotebookLM would dynamically assign.)*

**Lists**
Example 2. consider the following quotation:

> 'Thus, when associating with people of integrity is made full, it fills [the conditions for] hearing the true Dhamma… conviction… appropriate attention… mindfulness & alertness… restraint of the senses… the three forms of right conduct… the four establishings of mindfulness… the seven factors for awakening. When the seven factors for awakening are made full, they fill [the conditions for] clear knowing & release.

from the above quote the following can inferred:
* admirable friendship leads to hearing the true Dhamma
* hearing the true Dhamma leads to conviction
* conviction leads to appropriate attention
* appropriate attention leads to mindfulness & alertness
* mindfulness & alertness leads to sense restraint
* sense restraint leads to right conduct
* right conduct leads to the four establishings of mindfulness
* the four establishings of mindfulness leads to the seven factors for awakening
* the seven factors for awakening leads to clear knowing & release


## Causal Contradictions
note, there will be deviations in terms of order amongst causal pairs across suttas but nothing of great signifance. when a cause/effect pair contradicts another cause/effect pair already in the causal_table, then it is probable that it typically occurs in parallel or a specific facet of that dhamma quality occurs in parallel. these sitation are good candidates to apply the "co-arised-with" property set to true.

Example 1:

> when the noble eightfold path is developed by a monk, is pursued by a monk, the four establishings of mindfulness go to the culmination of their development, the four right exertions… the four bases of power… the five faculties… the five strengths… the seven factors for awakening go to the culmination of their development.

in this quote the noble eightfold path is established as the cause the other wings to awakening

> From developing, it should be said. Developing what? The four establishing of mindfulness, the four right exertions, the four bases of power, the five faculties, the five strengths, the seven factors for awakening, the noble eightfold path.

however, in this quote the noble eightfold path is listed as the final effect.


Example 2.

> There is the case where a monk develops mindfulness as a factor for awakening… analysis of qualities as a factor for awakening… persistence as a factor for awakening… rapture as a factor for awakening… calm as a factor for awakening… concentration as a factor for awakening… equanimity as a factor for awakening dependent on seclusion, dependent on dispassion, dependent on cessation, resulting in letting go. This is called the path leading to the unfabricated…

in this case, persistence follows after mindfulness.

> There is the case where a monk develops right view… right resolve… right speech… right action… right livelihood… right effort… right mindfulness dependent on seclusion, dependent on dispassion, dependent on cessation, resulting in letting go. This is called the path leading to the unfabricated…

in this case right effort (ie. persistence) precedes mindfulness

> There is the case where a monk develops the strength of conviction… persistence… mindfulness… concentration… discernment dependent on seclusion, dependent on dispassion, dependent on cessation, resulting in letting go. This is called the path leading to the unfabricated…

and again, in this case persistence precedes mindfulness


hence, this infers that many qualities circle around others, they co-arise, and that a facet of a given quality may appear to be more intensely in a given context. therefore, it is best not to be too rigid; remember, the goal with these patterns are to build a useful map for practitioner's to follow, not to create an incomprehensible causal network.


## Causal Representation
the source "PBT-collaboration-API.ts.txt" typescript file provides many key types required for communication and exchange. the key classifier with respect to the causal-table are:
```typescript
export type CauseAndEffectJson = {
    "not-cause"?: boolean,      /* boolean value indicating inverse of the causal reference (default: boolean|null)*/
    "cause": string,            /* string of the cause in lowercase (eg. "admirable friendship")*/
    "cannot"?: boolean,         /* boolean value indicating an impossible causal relationship (default: boolean|null)*/
    "skips-to"?: boolean,       /* boolean value indicating causation with missing links between causal relationship (default: boolean|null)*/
    "co-arised-with"?: boolean, /* boolean value indicating co-arising together (with no order criticality between cause/effect) causal relationship (default: boolean|null)*/
    "not-effect"?: boolean,     /* boolean value indicating inverse of the effect reference (default: boolean|null)*/
    "effect": string,           /* string of the effect in lowercase (eg. "conviction")*/
    "quotation-index"?: number, /* number of the array index position of the directly associated quote where this cause and effect relationship was derived from */
}

export type PatternBuildingBlocksJson = {
    "Causal-Table": CauseAndEffectJson[], /* array of causeAndEffectJson objects (full table) */
      // ...
}

export type PatternQuotationsJson = {
    "Causal-Table": DeterminantQuotationString[], 
      // ...
}
export type UserDirectExperienceJson = {
    "Causal-Table"?: CauseAndEffectJson[],        /* full table additions */
    // ...
}

export type CausalTableResultJson = {
    "cause-&-effect-table": CauseAndEffectJson[],
    "quotation-sheet": DeterminantQuotationString[]
}

export abstract class AbstractCausalTableBuilder {
    public build(searchTerm: string, bothDirections = true): CausalTableResultJson {
        this.causalSet.clear()
        this.results["cause-&-effect-table"].length = 0
        this.results["quotation-sheet"].length = 0
        this.searchRecursively(searchTerm, true, 0);
        if (bothDirections)
            this.searchRecursively(searchTerm, false, 0);
        return this.results;
    }
    // ...
}
```

**Requirements for "Causal-Table"**
1. abstraction and generalisation of labels used in the "cause" & "effect" properties is crucial for the purpose of **linking patterns effectively in process diagrams and other aspects of the pattern's solution**. create standardized, yet not overly abstract, terms to be used as the **keys for connecting nodes and edges** in all diagrams/models in the solution.
1. capture each direct link. do not use the "skips-to" feature when creating entries for the "Causal-Table". such use will mask/hide the clear causal relationships. the "skips-to" feature will be useful in the "Cause-&-Effects" work task
2. always specify the "quotation-index" from the patternQuotationsJson["Causal-Table"] from which the relationship is based
3. apply "co-arised-with" to relationships when applicable such that when modeling the "Process View" such relationships will likely fall into the same synchronisation block

parsing the quotation from Causal References > Example 1 & 2 (above) should result in:
```typescript
const examples_quotations = [
  "x", "y",
  "'Abandoning three things, one is capable of abandoning self-identification views, abandoning uncertainty, abandoning grasping at habits & practices. Which three? Inappropriate attention, following a wrong path, & slowness of awareness…",
  "z",
  "'Thus, when associating with people of integrity is made full, it fills [the conditions for] hearing the true Dhamma… conviction… appropriate attention… mindfulness & alertness… restraint of the senses… the three forms of right conduct… the four establishings of mindfulness… the seven factors for awakening. When the seven factors for awakening are made full, they fill [the conditions for] clear knowing & release."
]
// note X, Y & Z have been deliberately added to highlight "quotation-index" values
const example_causeAndEffects: CauseAndEffectJson[] = [
  {"cause": "inappropriate attention", "effect": "wrong view", "quotation-index": 2}, // refers examples_quotations[2]
  {"cause": "wrong view", "effect": "slowness of awareness", "co-arised-with": true, "quotation-index": 2}, // ..
  {"cause": "slowness of awareness", "effect": "self-identification view", "quotation-index": 2}, 
  {"cause": "self-identification view", "effect": "uncertainty", "co-arised-with": true, "quotation-index": 2}, 
  {"cause": "uncertainty", "effect": "grasping at habits & practices", "co-arised-with": true, "quotation-index": 2}, 

  {"cause": "admirable friendship", "effect": "hearing the true Dhamma", "quotation-index": 4}, // refers examples_quotations[4]
  {"cause": "hearing the true Dhamma", "effect": "conviction", "quotation-index": 4}, // ...
  {"cause": "conviction", "effect": "appropriate attention", "quotation-index": 4}, 
  {"cause": "appropriate attention", "effect": "mindfulness & alertness", "quotation-index": 4}, 
  {"cause": "mindfulness & alertness", "effect": "sense restraint", "quotation-index": 4}, 
  {"cause": "sense restraint", "effect": "right conduct", "quotation-index": 4}, 
  {"cause": "right conduct", "effect": "four establishings of mindfulness", "quotation-index": 4}, 
  {"cause": "four establishings of mindfulness", "effect": "seven factors for awakening", "quotation-index": 4}, 
  {"cause": "seven factors for awakening", "effect": "clear knowing & release", "quotation-index": 4}, 
]
```

## 1. Create A Catchment Of Causation With The Subject At The Centre
the generated patternResponseJson object is rooted in the "Causal-Table". this table is crucial to the pattern and almost all remaining tasks. further, the "Causal-Table" entries are highly coupled to DeterminantQuotationStrings which substantiates the pattern's shape. therefore, a causal table builder has been created which notebooklm must extend for it's implementation environment.

```typescript
export class NotebookLMCausalTableBuilder extends AbstractCausalTableBuilder {
  /*
  purpose: transform fromExpression into a more generalised and common/frequent term if required
      eg 
      "person of integrity" -> "admirable friendship" 
      "restraint of the senses" -> "sense restraint"
      "three forms of right conduct" -> "right conduct"
  */
  public override makeExpressionAsGeneralisedAndCommon(fromExpression: string): string {
    throw new Error("Method not implemented.");
  }

  /*
  purpose: convert a quote with 1 or more causal relationships into a CauseAndEffectJson[] array. note unrelated entries will get dropped later
      eg. 
      'Thus, when associating with people of integrity is made full, it fills [the conditions for] hearing the true Dhamma… conviction… appropriate attention… mindfulness & alertness… restraint of the senses… the three forms of right conduct… the four establishings of mindfulness… the seven factors for awakening. When the seven factors for awakening are made full, they fill [the conditions for] clear knowing & release.
      -> 
      [{"cause": "admirable friendship", "effect": "hearing the true Dhamma", "quotation-index": 4},
      {"cause": "hearing the true Dhamma", "effect": "conviction", "quotation-index": 4},
      {"cause": "conviction", "effect": "appropriate attention", "quotation-index": 4},
      {"cause": "appropriate attention", "effect": "mindfulness & alertness", "quotation-index": 4},
      {"cause": "mindfulness & alertness", "effect": "sense restraint", "quotation-index": 4},
      {"cause": "sense restraint", "effect": "right conduct", "quotation-index": 4},
      {"cause": "right conduct", "effect": "four establishings of mindfulness", "quotation-index": 4},
      {"cause": "four establishings of mindfulness", "effect": "seven factors for awakening", "quotation-index": 4},
      {"cause": "seven factors for awakening", "effect": "clear knowing & release", "quotation-index": 4}]

  */
  public override convertFromQuotationToCauseAndEffect(quote: string, quoteIndex: number): CauseAndEffectJson[] {
    throw new Error("Method not implemented.");
  }

  /*
  purpose: search *_nblm.txt sources ONLY for a causal or co-arising relationship quotations for the given searchTerm
      eg. searchTerm = "conviction"
      1. "Monks, as long as the monks have conviction… shame… compunction… learning… aroused persistence… established mindfulness… discernment, the monks' growth can be expected, not their decline"
      2. 'Thus, when associating with people of integrity is made full, it fills [the conditions for] hearing the true Dhamma… conviction… appropriate attention… mindfulness & alertness… restraint of the senses… the three forms of right conduct… the four establishings of mindfulness… the seven factors for awakening. When the seven factors for awakening are made full, they fill [the conditions for] clear knowing & release.
  */
  public override searchSourcesForCausalQuotations(searchTerm: string): string[] {
    throw new Error("Method not implemented.");
  }
}

// below is a unit test causal-table builder with its output found in source PBT-causal-table-builder.ts.txt

export class UnitTestCausalTableBuilder extends AbstractCausalTableBuilder {
  public override makeExpressionAsGeneralisedAndCommon(fromExpression: string): string {
    const toTerm = fromExpression // stub
    return toTerm
  }
  
  public override convertFromQuotationToCauseAndEffect(quote: string, quoteIndex: number): CauseAndEffectJson[] {
    const ret: CauseAndEffectJson[] = []
    const regEx = /\((.*?)\) to \((.*?)\)/gm
    let m: RegExpExecArray | null;
    while ((m = regEx.exec(quote)) !== null) {
        if (m.index === regEx.lastIndex) 
            regEx.lastIndex++;
        const causeAndEffect: CauseAndEffectJson = {
            "cause": this.makeExpressionAsGeneralisedAndCommon(m[1]),
            "effect": this.makeExpressionAsGeneralisedAndCommon(m[2]),
            "quotation-index": quoteIndex
        }
        ret.push(causeAndEffect)
    }
    return ret
  }

  public override searchSourcesForCausalQuotations(searchTerm: string): string[] {
    const ret: string[] = []
    for (const quote of fake_causal_quotations) {
        if (quote.includes(`(${searchTerm})`)) 
            ret.push(quote)
    }
    return ret
  }
}

const builder = new UnitTestCausalTableBuilder()
const causalTableResult = builder.build("m") // "m" is the subject at the centre of the catchment
const mindmap = MindMapDiagram.create(causalTableResult["cause-&-effect-table"], "m")
console.log("quotation-sheet[2..6]", causalTableResult["quotation-sheet"].slice(2,7))
console.log("cause-&-effect-table[0..5]", causalTableResult["cause-&-effect-table"].slice(0,5))
console.log(mindmap)
```

**NotebookLM Task**
1. **Command:generate** the implementation of NotebookLMCausalTableBuilder taking the following into account:
  * apply notebooklm's language capabilities of abstraction, generalisation and noting the most common and frequently occuring expressions
  * apply notebooklm's text parsing capabilities to discern causal relationships in any given suitable quotation
  * apply notebooklm's logic and reasoning capabilities to mark those causal relationships that co-arise together
  * apply notebooklms contextualised searching capabilities from the sources to identify critically determinant quotations
  * ONLY search *_nblm.txt sources for quotations. if the user feels something is missing then they can apply the inject direct experience feature

2. **Command:execute** the following code block in order to build the "Causal-Table" using forward & backward searching for all the subjects that are part of the pattern. finally store the result tuple in their respective properties in the patternResponseJson object

    ```typescript
    const builder = new NotebookLMCausalTableBuilder()
    for (const subject of patternResponseJson.scope.subject) {
        builder.build(subject["name"])
    }
    const causalTableResult = builder.results
    patternResponseJson["building-blocks"]["Causal-Table"] = causalTableResult["cause-&-effect-table"]
    patternResponseJson["quotations"]["Causal-Table"] = causalTableResult["quotation-sheet"]
    ```


**running example**
```typescript
const search_results = [ // note, manual user-built search results
"all skillful qualities are rooted in heedfulness, converge in heedfulness, and heedfulness is reckoned the foremost among them", 
"This one quality, monks, when developed & pursued, keeps both kinds of benefit secure: benefit in this life & in lives to come.", 
"Monks, having a sense of shame & having a sense of compunction, one is heedful", 
"Monks, these two bright qualities guard the world. Which two? Shame & compunction.", 
"Concentration nurtured with virtue is of great fruit, great reward. Discernment nurtured with concentration is of great fruit, great reward. The mind nurtured with discernment is rightly released from the effluents", 
"For him, dwelling thus heedfully, joy is born. In one who has joy, rapture is born. The body of one enraptured at heart grows calm. When the body is calm, one feels pleasure. Feeling pleasure, the mind becomes centered. When the mind is centered, phenomena become manifest. When phenomena are manifest, he is reckoned as one who dwells in heedfulness", 
"Being heedful, one is capable of abandoning apathy, being hard to correct, & evil friendship", 
"'And what is heedfulness? There is the case where a monk guards his mind with regard to effluents and qualities accompanied by effluents. When his mind is guarded with regard to effluents and mental qualities accompanied by effluents, the faculty of conviction goes to the culmination of its development. The faculty of persistence… mindfulness… concentration… discernment goes to the culmination of its development", 
"The monk delighting in heedfulness, seeing danger in heedlessness –incapable of falling back– stands right on the verge of Unbinding.", 
"'There is the case, friends, where a monk lives in apprenticeship to the Teacher or to a respectable companion in the holy life in whom he has established a strong sense of shame & compunction, love, & respect.", 
"Any individual of whom one has come to know, 'When I partake of this individual, unskillful qualities decrease and skillful qualities increase,' that sort of individual is to be partaken of", 
"To foster appropriate attention to them: This is the food for the arising of unarisen equanimity as a factor for awakening, or for the growth & increase of equanimity as a factor for awakening once it has arisen.", 
"To foster appropriate attention to them: This is lack of food for the arising of unarisen uncertainty, or for the growth & increase of uncertainty once it has arisen.", 
"Monks, as long as the monks have conviction… shame… compunction… learning… aroused persistence… established mindfulness… discernment, the monks' growth can be expected, not their decline", 
"'Seven noble treasures: the treasure of conviction, the treasure of virtue, the treasure of a sense of shame, the treasure of a sense of compunction, the treasure of listening, the treasure of generosity, the treasure of discernment", 
"'Seven true dhammas: There is the case, friends, where a monk has conviction, a sense of shame, a sense of compunction, learning, and is one of aroused persistence, established mindfulness, & discerning", 
"'Seven strengths: the strength of conviction, the strength of persistence, the strength of a sense of shame, the strength of compunction, the strength of mindfulness, the strength of concentration, the strength of discernment.", 
"'When, on observing that the monk is purified with regard to qualities based on delusion, he places conviction in him. With the arising of conviction, he visits him & grows close to him. Growing close to him, he lends ear. Lending ear, he hears the Dhamma. Hearing the Dhamma, he remembers it. Remembering it, he penetrates the meaning of those dhammas. Penetrating the meaning, he comes to an agreement through pondering those dhammas. There being an agreement through pondering those dhammas, desire arises. With the arising of desire, he becomes willing. Willing, he contemplates [literally: weighs, compares]. Contemplating, he makes an exertion. Exerting himself, he both realizes the highest truth with his body and sees by penetrating it with discernment.", 
"Having admirable people as friends, companions, & colleagues is actually the whole of the holy life. When a monk has admirable people as friends, companions, & colleagues, he can be expected to develop & pursue the noble eightfold path.", 
"'He is endowed with a (present) kamma obstruction, a defilement obstruction, a result-of-(past)-kamma obstruction; he lacks conviction, has no desire (to listen), and has dull discernment. Endowed with these six qualities, a person is incapable of alighting on the lawfulness, the rightness of skillful qualities even when listening to the true Dhamma.", 
"'You, too, monks, should relentlessly exert yourselves, (thinking,) 'Gladly would we let the flesh & blood in our bodies dry up, leaving just the skin, tendons, & bones, but if we have not attained what can be reached through manly firmness, manly persistence, manly striving, there will be no relaxing our persistence.' You, too, in no long time will enter & remain in the supreme goal of the holy life for which clansmen rightly go forth from home into homelessness, directly knowing & realizing it for yourselves in the here & now.", 
"If, when a monk's awareness often remains steeped in the perception of stress in what is inconstant, a fierce perception of danger & fear is not established in him toward idleness, indolence, laziness, heedlessness, lack of commitment, & lack of reflection, as if toward a murderer with an upraised sword, then he should realize, 'I have not developed the perception of stress in what is inconstant; there is no step-by-step distinction in me; I have not arrived at the fruit of (mental) development.'", 
"'Commitment & reflection are food for Dhammas.", 
"Monks, it's good for a monk periodically to have reflected on his own failings. It's good for a monk periodically to have reflected on the failings of others. It's good for a monk periodically to have reflected on his own attainments. It's good for a monk periodically to have reflected on the attainments of others", 
"Thus for him, having thus developed the noble eightfold path, the four establishings of mindfulness go to the culmination of their development. The four right exertions… the four bases of power… the five faculties… the five strengths… the seven factors for awakening go to the culmination of their development.", 
"seeking is dependent on craving, acquisition is dependent on seeking, ascertainment is dependent on acquisition, desire and passion is dependent on ascertainment,", 
"I tell you, monks, that stress results either in bewilderment or in search.", 
"when associating with people of integrity is made full, it fills [the conditions for] hearing the true Dhamma… conviction… appropriate attention… mindfulness & alertness… restraint of the senses… the three forms of right conduct… the four establishings of mindfulness… the seven factors for awakening. When the seven factors for awakening are made full, they fill [the conditions for] clear knowing & release", 
"There is the case where a monk is consummate in virtue, guards the doors to his sense faculties, knows moderation in eating, & is devoted to wakefulness.", 
"Monks, I speak of robes in two ways: to be partaken of and not to be partaken of. I also speak of alms food… lodgings… villages & towns… countrysides… individuals in two ways: to be partaken of and not to be partaken of.", 
"Any robe of which one has come to know, 'When I partake of this robe, unskillful qualities decrease and skillful qualities increase,' that sort of robe is to be partaken of."
]
patternResponseJson["quotations"]["Causal-Table"] = search_results
```

```typescript
causal_table = [ //note, the user has not added "quotation-index" values!
  {"cause": "shame", "effect": "heedful"},
  {"cause": "compunction", "effect": "heedful"},
  {"cause": "heedful", "effect": "joy"},
  {"cause": "joy", "effect": "rapture"},
  {"cause": "rapture", "effect": "calm"},
  {"cause": "calm", "effect": "pleasure"},
  {"cause": "pleasure", "effect": "mind becomes centered"},
  {"cause": "mind becomes centered", "effect": "phenomena become manifest"},
  {"cause": "heedful", "effect": "ardent"},
  {"cause": "heedful", "effect": "easy to correct"},
  {"cause": "heedful", "effect": "admirable friendship"},
  {"cause": "heedful", "effect": "conviction"},
  {"cause": "conviction", "effect": "persistence"},
  {"cause": "persistence", "effect": "mindfulness"},
  {"cause": "mindfulness", "effect": "concentration"},
  {"cause": "concentration", "effect": "discernment"},
  {"cause": "heedful", "effect": "release"},
  {"cause": "admirable friendship", "effect": "shame"},
  {"cause": "admirable friendship", "effect": "compunction"},
  {"cause": "admirable friendship", "effect": "respect"},
  {"cause": "conviction", "effect": "shame"},
  {"cause": "shame", "effect": "compunction"},
  {"cause": "compunction", "effect": "learning"},
  {"cause": "learning", "effect": "persistence"},
  {"cause": "persistence", "effect": "mindfulness"},
  {"cause": "mindfulness", "effect": "discernment"},
  {"cause": "conviction", "effect": "virtue"},
  {"cause": "virtue", "effect": "shame"},
  {"cause": "virtue", "effect": "sense restraint"},
  {"cause": "sense-restraint", "effect": "moderation in eating"},
  {"cause": "moderation in eating", "effect": "wakefulness"},
  {"cause": "learning", "effect": "generosity "},
  {"cause": "generosity", "effect": "discernment"},
  {"cause": "conviction", "effect": "persistence"},
  {"cause": "persistence", "effect": "shame"},
  {"cause": "compunction", "effect": "mindfulness"},
  {"cause": "admirable friendship", "effect": "conviction"},
  {"cause": "conviction", "effect": "visits"},
  {"cause": "visits", "effect": "grows close"},
  {"cause": "grows close", "effect": "lends ear"},
  {"cause": "lends ear", "effect": "hears the Dhamma"},
  {"cause": "hearing the Dhamma", "effect": "remembers it"},
  {"cause": "remembers it", "effect": "penetrates the meaning"},
  {"cause": "penetrates the meaning", "effect": "comes to an agreement through pondering those Dhammas"},
  {"cause": "comes to an agreement through pondering", "effect": "desire"},
  {"cause": "desire", "effect": "willing"},
  {"cause": "willing", "effect": "contemplates"},
  {"cause": "contemplates", "effect": "exertion"},
  {"cause": "exertion", "effect": "realizes the highest truth"},
  {"cause": "admirable friend", "effect": "noble eightfold path"},
  {"cause": "(present) kamma obstruction", "cannot_": true, "effect": "remembers it"},
  {"cause": "defilement obstruction", "cannot_": true, "effect": "remembers it"},
  {"cause": "result-of-(past)-kamma obstruction", "cannot_": true, "effect": "remembers it"},
  {"not-cause_":true, "cause": "conviction", "cannot_": true, "effect": "remembers it"},
  {"not-cause_":true, "cause": "desire", "cannot_": true, "effect": "remembers it"},
  {"not-cause_":true, "cause": "discernment", "cannot_": true, "effect": "remembers it"},
  {"not-cause_":true, "cause": "fear", "effect": "heedlessness"},
  {"not-cause_":true, "cause": "fear", "cannot_": true, "effect": "commitment"},
  {"not-cause_":true, "cause": "fear", "cannot_": true, "effect": "reflection"},
  {"cause": "commitment", "effect": "noble eightfold path"},
  {"cause": "reflection", "effect": "noble eightfold path"},
  {"cause": "noble eightfold path", "effect": "four establishings of mindfulness"},
  {"cause": "four establishings of mindfulness", "effect": "four right exertions"},
  {"cause": "four right exertions", "effect": "four bases of power"},
  {"cause": "four bases of power", "effect": "five faculties"},
  {"cause": "five faculties", "effect": "five strengths"},
  {"cause": "five strengths", "effect": "seven factors for awakening"},
  {"cause": "craving", "effect": "seeking"},
  {"cause": "seeking", "effect": "acquisition"},
  {"cause": "acquisition", "effect": "ascertainment"},
  {"cause": "ascertainment", "effect": "desire and passion"},
  {"cause": "appropriate attention", "effect": "right view"},
  {"cause": "admirable friendship", "effect": "right view"},
  {"cause": "admirable friendship", "effect": "hearing the true dhamma"},
  {"cause": "hearing the true dhamma", "effect": "conviction"},
  {"cause": "conviction", "effect": "appropriate attention"},
  {"cause": "appropriate attention", "effect": "mindfulness & alertness"},
  {"cause": "mindfulness & alertness", "effect": "restraint of the senses"},
  {"cause": "restraint of the senses", "effect": "the three forms of right conduct"},
  {"cause": "the three forms of right conduct", "effect": "the four establishings of mindfulness"},
  {"cause": "the four establishings of mindfulness", "effect": "the seven factors for awakening"},
  {"cause": "the seven factors for awakening", "effect": "clear knowing & release"},
  {"not-cause_":true, "cause": "living in a civilized land", "cannot_": true, "effect": "heedfulness"},
  {"not-cause_":true, "cause": "admirable friendship", "cannot_": true, "effect": "heedfulness"},
  {"not-cause_":true, "cause": "virtue", "cannot_": true, "effect": "heedfulness"},
  {"not-cause_":true, "cause": "done merit in the past [and/or lifetimes]", "cannot_": true, "effect": "heedfulness"}
]

patternResponseJson["building-blocks"]["Causal-Table"] = causal_table

```


## 2. Inject User's Direct Experience
**NotebookLM Task**
1. **Command:execute** injectUsersDirectExperience for "Causal-Table" which gets ignored if not provided
```typescript
ProgressingByTens.injectUsersDirectExperience("Causal-Table", userPatternRequestJson, patternResponseJson)
```


## 3. Assessment

**User Task**
assess in terms of missing/excess, the 
* patternResponseJson["quotations"]["Causal-Table"]
* patternResponseJson["building-blocks"]["Causal-Table"]
