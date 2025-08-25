# Prepare the content for the pattern's "Solution"

despite having already been given the Ven. Sāriputta's answers, this is by far the most challenging aspect of writing these dhamma patterns.

consider the following:
* 'The Dhamma should be taught with the thought, 'I will speak step-by-step.'
* 'The Dhamma should be taught with the thought, 'I will speak explaining the sequence (of cause & effect).'
* humans follow processes, do activities and reach milestones. the dhamma however, is most often expressed in terms of causation, this causes that, leads to, results in, benefit, reward etc.
* consider a student being told that they need to practice the noble eightful path. they having been told that, they are immediately lost. the student needs to transform an event based causal model (ie. when this, then that) with principles and transform it into a concrete process that they can follow, complete activities and achieve milestones. due to dull discernment, it often results in failure! the various aspects of the overrall solution is intended to resolve that issue.

the sutta texts are sources that document causation which can both be implicitly and explicitly inferred. notebooklm has supoerior inference, logic and reasoning skills which are required for this task. notebooklm should be able to identify links between disparate causal chains and/or activities that are not explicitly stated. teaching and learning dhamma is largely an exercise in language. because notebooklm is an LLM, it should be well positioned to perform this task.


## 1. Creating A Catchment Of Causation
**NotebookLM Task**
1. use the source "guide_causation_expression.md" for some candidate causation expressions as a means for searching in relation to both the problem and solution.
2. for (const subject of scopeJson["subject"]):
  (a) const search_term = subject["name"].toLowerCase(); search_results = []
  (b) **Command:search** for cause/effect relationships related to the search_term and append the results to search_results
  (c) for (const result of search_results): // create a backward mind-map like structure
    * **Command:parse** the result and identify the cause
    * **Command:recurse** by repeating step (a) using the cause as the search_term conditioned by:
      1. ensure that the search_term is within the subject["enter-from-state"] scope
      2. avoid circular loops and repeat for up to 7 levels
  (d) for (const result of search_results): // create a forward mind-map like structure
    * **Command:parse** the result and identify the effect
    * **Command:recurse** by repeating step (a) using the effect as the search_term conditioned by:
      1. ensure that the search_term is within the subject["exit-to-state"] scope
      2. avoid circular loops and repeat for up to 7 levels
3. store catchment search_results in patternQuotationsJson["Step-by-Step"]


**running example**
```typescript
const search_results = [
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
patternQuotationsJson["Step-by-Step"] = search_results
```

## 2. Inject User's Direct Experience
**NotebookLM Task**
1. **Command:append** the userDirectExperienceJson["Step-by-Step"] if provided:
```typescript
if (userDirectExperienceJson?.["Step-by-Step"]?.["factors"])
  patternQuotationsJson["Step-by-Step"].push(...userDirectExperienceJson?.["Step-by-Step"]?.["factors"])
if (userDirectExperienceJson?.["Step-by-Step"]?.["determinant-quotations"])
  patternQuotationsJson["Step-by-Step"].push(...userDirectExperienceJson?.["Step-by-Step"]?.["determinant-quotations"])

```


**running example**
**User Task**
1. setup user influential factors
```typescript
const userDirectExperienceJson: UserDirectExperienceJson = {
    "Solution": {
        "Step-by-Step": {
            "factors": [
              "as the practice progresses the admirable friend's voice continues to resonate and echo like a songs of dhamma stuck on repeat in the practitioners mind; consider this as signal.",
              "the admirable friend need not be a physical person; it could a book, audio/video dhamma talks, it could even be a notebooklm <smile> notebook.",
              "the clinging to doctrine-of-self is the attachment to voices and roles.",
              "the practitioner must start to realise that voices other than the buddha's instructions, are to be treated as noise."
              "regardless of whether one physically lives with a teacher or not, the practice is one of continous seeking, resulting in perfecting the signal to noise ratio of instruction!",
              "admirable friendship *means* to copy, clone and imitate the qualities of the admirable friend, not the quality of companionship in-of-itself",
              "not even the buddha could not teach/instruct on the specific topics of how to acquire heedfulness, appropriate attention and admirable friendship despite being . an individual needed to be fit to be tamed!",
              "the root cause of acquiring admirable friendship is kammic"
            ],
            "determinant-quotations": [
              "Associating with an admirable friend even a fool becomes wise",
              "Monks, there are these two conditions for the arising of right view. Which two? The voice of another and appropriate attention. These are the two conditions for the arising of right view.",
              "It's impossible, there's no way, that a person of no integrity would know of a person of no integrity: 'This is a person of no integrity... It's impossible, there's no way, that a person of no integrity would know of a person of integrity: 'This is a person of integrity.",
              "Monks, with regard to external factors, I don't envision any other single factor like friendship with admirable people as doing so much for a monk in training, who has not attained the heart's aspiration but remains intent on the unsurpassed safety from bondage.",
              "Monks, with regard to internal factors, I don't envision any other single factor like appropriate attention as doing so much for a monk in training, who has not attained the heart's aspiration but remains intent on the unsurpassed safety from bondage.",
              "Eight inopportune, untimely situations for leading the holy life",
              "Four wheels: living in a civilized land, associating with people of integrity, directing oneself rightly, & having done merit in the past. These four dhammas are very helpful."
              "well-gone, an expert with regard to the cosmos, unexcelled trainer of people fit to be tamed, teacher of devas & human beings, awakened, blessed"
            ]
        }
    }
}
```


2. **Section: Solution > Cause-&-Effect** 
it is important to realise that many of the lists that are in the sutta sources are in fact causal chains. you can safely assume that about 90% of lists are causal chains. even the five-clinging aggregates is itself a causal chain, you just need to know how to see it. therefore, proceed with the assumption that any given list is a causal chain and the expert will identify the exceptions when the section is reviewed.

(a) visit each causal chain result from the causal pool and list all unique cause -> effect pairs in a causal_table. generalising concepts and pattern matching will help (eg. teacher = admirable friendship) avoid the list becoming unmanagable

note, there will be small deviations in terms of order amongst these pairs across suttas but nothing of signifance. when you encounter a cause/effect pair that contradicts another cause/effect pair already in the causal_table, then it typically occurs in parallel or its a specific facet of a dhamma qualities that is causing the difference.

consolidate the causal_table removing duplicate pairs


**running example**

```javascript
causal_table = [
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
```

(b) inject user causal_table additions if provided
```javascript
let causal_table = [/* ... */] // populated in step (a)
if (userDirectExperienceJson["Causal-Table"])
  if (influentialFactorJson["Causal-Table"])
    causal_table.push(...influentialFactorJson["Causal-Table"])
```
(c) note, the causal_table at this stage represents all of the research into causation with regards to the pattern. this same causal_table will serve as input for the Process view and the Resulting Context sections.

store this value in patternBuildingBlocksJson["Causal-Table"]


**running example**

patternBuildingBlocksJson["Causal-Table"] = causal_table


3. **Section: Solution > Process View** 

(a) initialise the solution cause-&-effect table

first, take a deep copy of the causal_table and assign it to the sol_cause_and_effect variable for the solution. 


(c) inject user causeAndEffect additions if provided
```javascript
if (userDirectExperienceJson["Cause-&-Effect"])
  sol_cause_and_effect.push(...userDirectExperienceJson["Cause-&-Effect"])
```

(d) using the sol_cause_and_effect table as the source model the solution's process

the sol_cause_and_effect table and the process model will now evolve concurrently and in sync with one another 
with each iteration:
* remove irrelevant sol_cause_and_effect entries from the table that exceed the scope of the probem/solution
* identify sets of sol_cause_and_effect entries that participate in the process but whose intermediate links can be skipped without loss of accuracy. apply the "skip-to_" feature to such entries in order to simplify the process model
* add each applicable sol_cause_and_effect entry into the process model whilst simultaneously balancing timing, concurrency, conditional logic and loops.
* adjust the process model until the all entries in sol_cause_and_effect are resolved

after some iterations, and adjustments, an identifiable conceptual process will emerge that is based on a minimal sol_cause_and_effect table


**running example**
```javascript
sol_cause_and_effect = [
  {"cause": "shame", "effect": "heedful"},
  {"cause": "shame", "effect": "compunction"},
  {"cause": "compunction", "effect": "heedful"},
  {"cause": "conviction", "effect": "shame"},
  {"cause": "conviction", "effect": "persistence"},
  {"cause": "conviction", "effect": "appropriate attention"},
  {"cause": "appropriate attention", "effect": "skillful qualities increase"},
  {"cause": "appropriate attention", "effect": "unskillful qualities decrease"},
  {"cause": "virtue", "effect": "shame"},
  {"cause": "virtue", "effect": "sense restraint"},
  {"cause": "virtue", "effect": "concentration"},
  {"cause": "concentration", "effect": "discernment"},
  {"cause": "discernment", "effect": "effluent-free"},
  {"cause": "sense restraint", "effect": "moderation in eating"},
  {"cause": "moderation in eating", "effect": "wakefulness"},
  {"cause": "generosity", "effect": "shame"},
  {"cause": "obstruction", "cannot_": true, "effect": "learning the true dhamma"},
  {"cause": "admirable friendship", "effect": "conviction"},
  {"cause": "seeking", "skips-to_": true, "effect": "desire"},
  {"cause": "desire", "skips-to_": true, "effect": "exertion"},
  {"cause": "contemplate", "co-arised-with_": true, "effect": "reflection"},
  {"cause": "task done", "co-arised-with_": true, "effect": "effluent-free"},
  {"not-cause_": true, "cause": "effluent-free", "co-arised-with_": true, "effect": "stress"},
  {"cause": "stress", "effect": "seeking"},
  {"cause": "stress", "effect": "bewilderment"},
  {"cause": "seeking", "cannot_": true, "effect": "that much is enough"},
  {"cause": "that much is enough", "effect": "complacent"}
]
```

(e) store sol_cause_and_effect in the patternBuildingBlocksJson["Solution"]["Cause-&-Effect"]


**running example**

```javascript
patternBuildingBlocksJson["Solution"]["Cause-&-Effect"] = sol_cause_and_effect
```

**Assessment**
assess in terms of missing/excess, the 
* sol_cause_and_effect

(f) establish factors for the specification and creation of the plantuml activity diagram(s)
```javascript
const plantumlActivityDiagramFactors = [
  "use the source 'guide_plantuml_activity_diagram.md' for a syntax and semantics guide",
  "set the diagram title as '${varPatternName} (Process view)' // add an iteration index if more than one diagram was generated (eg. Process view 1)"
]
```

(g) inject user Process View factor if provided
```javascript
const influentialFactorJson = userDirectExperienceJson?.["Solution"]?.["Process View"];
if (influentialFactorJson?.["factors"])
  plantumlActivityDiagramFactors.push(...influentialFactorJson?.["factors"])
```

(h) generate a plantuml activity diagram(s) as a building block by:
  * transposing the conceptual process model into plantuml notation
  * taking into account all the plantumlActivityDiagramFactors


(i) push/append the plantuml **Activity Diagram** string to patternBuildingBlocksJson["Solution"]["Process View"] array. push it to the end of the array to preserve the intended order. this approach will enable multiple diagrams to be added when required.


**Assessment**
assess in terms of missing/excess, the 
* diagram(s) generated 


**running example**
```javascript
const plantUmlActivityDiagramAsString = "" /* text inside markdown plantuml codeblock */
```

```plantuml
@startuml helpful-sol-process
header 16-Aug-2025
title Heedful, ardent & resolute (Process view) 
start
while (effluent-free?) is (no: [non-Arahant]\n**there is stress**)
  ' -> **there is stress**;
  if (result of stress?) then (    [Uninstructed] **bewilderment**    )
    end
  else (search)
  end if
  if (the thought occurs:\nThat much progress is enough?) then (  yes: [One-in-training] **complacent**    )
    end
  end if
  fork
    partition "Apprenticeship - task to do" {
      :seek to improve admirable friendship or abandon ignoble voices;
      :conviction;
      fork
        :visits, grows close, lends ear, hears the Dhamma, 
        remembers it, learns it;
        :penetrates the meaning,\ncomes to an agreement through pondering those Dhammas;
      fork again
        :persistence;
      fork again
          :shame;
          :compunction;
      fork again
          :remove possible obstructions;
      end fork
      fork
        :generosity;
      fork again
        :virtue;
      fork again
        :sense restraint, moderation in eating & wakefulness;
      fork again
        :concentration;
      fork again
        :discernment;
      end fork
    }
  fork again
    partition "In the field - task to do" {
      fork
          :desire;
          :willing;
          :contemplating;
          :exertion;
      fork again
          :reflection;
      fork again
          partition "Appropriate Attention" {
            :skillful qualities increase;
            :unskillful qualities decrease;
          }
      fork again
          #lightgreen:heedfulness; <<object-signal>>
          ->//fear that recognizes dangers//\n//but knows how to avoid them//;
          :partake in:
          food, clothing, shelter, 
          villages, towns, countrysides, &
          individuals;
      end fork
    }
  end fork
end while (yes - [Arahant])
stop
@enduml
```
```javascript
patternBuildingBlocksJson["Solution"]["Process View"] = [plantUmlActivityDiagramAsString]
```

4. **Section: Solution > Step-by-Step**
(a) using only the process model details above and by collapsing the process into a flattened activity structure
(b) generate the step-by-step solution instructions as a flattenedProcessArray variable and store the list in patternBuildingBlocksJson["Solution"]["Step-by-Step"]


**Assessment**
assess in terms of missing/excess, the 
* Step-by-Step instructions


**running example**
```javascript
const flattenedProcessArray = [/* each step below is an array element */]
```
1. this process repeats continuously while the practitioner is not effluent-free and proceeds with stress at the context, otherwise they have awakened to truth and the process exits
1. if the reaction to stress is bewilderment then exit, otherwise continue the process
1. if the thought occurs to the practitioner that "this much progress is enough", then exit, otherwise continue the process knowing that there is a task to do with heedfulness
1. the process now splits in to two segments. the first is the "Apprenticeship" task that is cultivated through the training process. the second is the "In the field" task whatever the practices in heedfulness get applied in whatever is being partaken in. these two segments may occur with an attention to one or both at the same time
1. the first segment focuses on the Apprenticeship task
1. seek to improve admirable friendship or abandon those ignoble voices (which discourage vigilance and encourage deferment)
1. develop conviction in the admirable friendship
1. visits, grows close, lend ear to the admirable friendship. then hear the Dhamma, remembers it and learns it
1. develop a sense of shame of failing to follow the admirable friends instructions, & a sense of compunction of failing to act in line with causation
1. remove possible obstruction to learning Dhamma
1. penerate the Dhamma and come to an agreement through pondering those teachings
1. develop persistence here to consider possibilities outside the practitioner's habitual views, habits & practices and roles that they self-identify with
1. develop generosity
1. develop virtue (ie. right speech, action & livelihood)
1. develop sense restraint, moderation in eating & wakefulness
1. develop concentration (ie. right effort, mindfulness & concentration)
1. develop discernment (ie. right view, resolve)
1. the second segment focuses on the In the field task
1. develop desire to complete the holy life
1. reflect on one's own failings and attainments, and also the failings and attainments of others in terms of causation
1. is sensitive to heedfulness, a feeling of fear recognising dangers, but at the same time knowing how to avoid them arises: thus, heedfulness is an event, not an activity. it shapes what and how the practitioner partakes
1. attend appropriately by increasing skillful qualities and decreasing unskillful qualities whilst partaking
1. become willing to do what it takes to complete the holy life
1. contemplate on the direct application of Dhammas with respect to the duties of contemplation, abandoning, development & realisation
1. relentlessly exert oneself to complete the holy life

```javascript
patternBuildingBlocksJson["Solution"]["Step-by-Step"] = flattenedProcessArray
```


5. **Section: Solution > Concepts & Relationship** 
(a) identify responsibilities using only the process model 

**running example**

**responsiblities**: (in order of appearance)
* is_effluent_free()
* seek_admirable_friendship()
* abandon_ignoble_voices()
* result_of_stress()
* develop_conviction()
* is_enough_progress()
* visits_grows_close_lends_ear_hears_the_Dhamma()
* remembers_learns_penetrate_the_meaning_of_true_Dhammaa()
* develop_persistence()
* develop_sense_of_shame()
* develop_sense_of_compunction()
* remove_obstructions()
* come_to_an_agreement_through_pondering_teachings()
* develop_virtue_aggregate()
* develop_sense_restraint_moderation_in_eating_wakefulness()
* develop_concentration_aggregate()
* develop_discernment_aggregate()
* develop_desire()
* become_willing()
* contemplate_weigh_up_analyse()
* apply_exertion()
* apply_reflection()
* attend_appropriately()
* skillful_qualities_increase()
* unskillful_qualities_decrease()
* develop_heefulness()
* partake_in_food_clothing_shelter()
* partake_in_villages_towns_countrysides()
* partake_in_individuals()
* has_a_task_to_do_with_heedfulness()

(b) identify the classes associated with each responsibility 

the process of abstraction can be achieved by first starting with the candidate collaborators participating in the process view model 


**running example**

**candidate classes**: (in order of unique appearance)
* Effluent
* Admirable Friendship
* Clinging
* Conviction
* Practitioner
* Dhamma
* Five Faculties
* Sense of Shame
* Sense of Compunction
* Obstruction
* Mind
* Practitioner
* Noble Eightfold Path
* Four Bases of Power
* Reflection
* Appropriate Attention
* Heedfulness
* Livelihood

(c) establish factors for the specification and creation of the plantuml class diagram(s)
```javascript
const plantumlClassDiagramFactors = [
  "use the source 'guide_plantuml_class_diagram.md' for a syntax and semantics guide",
  "set the diagram title as '${varPatternName} (Concepts & Relationships)' // add an iteration index if more than one diagram was generated (eg. Concepts & Relationships 1)"
]
```

(d) inject user Concepts & Relationships factor if provided
```javascript
const influentialFactorJson = userDirectExperienceJson?.["Solution"]?.["Concepts & Relationships"];
if (influentialFactorJson?.["factors"])
  plantumlClassDiagramFactors.push(...influentialFactorJson?.["factors"])
```

(e) explore the field of co-arising with each responsibility

the process of abstraction is progressed further by undertaking research into the Dhamma domain. this time pay attention to what is occuring at the same time and there may well be implicitly  participating collaborators who play a role in the orchestrations

**running example**

search_results may include:
* I don't envision a single thing that is as quick to reverse itself as the mind—so much so that there is no satisfactory simile for how quick to reverse itself it is.
* Intention, I tell you, is kamma. Intending, one does kamma by way of body, speech, & intellect.
* The intention & aspiration of living beings hindered by ignorance & fettered by craving is established in or tuned to a lower property
* Five lower fetters & five higher fetters. And which are the five lower fetters? Self-identification views, uncertainty, grasping at habits & practices, sensual desire, & ill will. These are the five lower fetters. And which are the five higher fetters? Passion for form, passion for what is formless, conceit, restlessness, & ignorance.

add the following supporting abstractions:
* Skillful_Mental_Qualities
* Unskillful_Mental_Qualities
* Intention
* Kammic_Field
* Fetter
* Person_Of_Integrity

(d) using responsibilities and abstractions from the previous sections identify the collaborators that participate in fulfilling each responsibility

**running example**

through direct experience one notices which qualities are associated with the Being and which are associated with the mind. one knows that there is noble growth and certain qualities (eg. five faculties, four establishings of mindfulness etc) despite changes in circumstances do not regress. however, other qualities despited appearing to be well grounded and established, regress when the sitation changes. heedfulness is an a example of such a quality. a practitioner can appear ever so commited; they may go on meditation retreats, practice diligently but when they return home and friends visits them, that heedfulness is gone! therefore, we realise that heedfulness like other states based on fear reside in the mind. 

**collaborators**
* Effluent::is_effluent_free()
    * Mind
* Admirable Friendship::seek_admirable_friendship()
    * Practitioner
* Clinging::abandon_ignoble_voice()
    * Mind
* Mind::result_of_stress()
    * Practitioner
* Conviction::develop_conviction()
    * Practitioner
* Practitioner::is_enough_progress()
    * Mind
* Admirable Friehship::visits_grows_close_lends_ear_hears_the_Dhamma()    
    * Practitioner, Dhamma
* Dhamma::remembers_learns_true_Dhamma(), penetrates_the_meaning_of_true_Dhamma()
    * Practitioner
* Five Facutlies::develop_persistence()
    * Practitioner
* Sense of Shame::develop_sense_of_shame()
    * Conviction, Admirable Friendship, Heedfulness
* Sense of Compunction::develop_sense_of_compunction()
    * Conviction, Dhamma, Heedfulness
* Obstruction::remove_obstructions()
    * Mind, Heedfulness
* Mind::come_to_an_agreement_through_pondering_teachings()
    * Dhamma, Practitioner, Conviction
* Noble Eightfold Path::exercises_generosity()
    * Practitioner
* Noble Eightfold Path::develop_virtue_aggregate()
    * Practitioner 
* Noble Eightfold Path::develop_sense_restraint_moderation_in_eating_wakefulness()
    * Practitioner 
* Noble Eightfold Path::develop_concentration_aggregate()
    * Practitioner 
* Noble Eightfold Path::develop_discernment_aggregate()
    * Practitioner 
* Four Bases of Power::develop_desire()
    * Practitioner
* Four Bases of Power::becomes_willing()
    * Practitioner
* Four Bases of Power::contemplate_weigh_up_analyse()
    * Practitioner
* Four Bases of Power::apply_exertion()
    * Practitioner
* Reflection::apply_reflection()
    * Mind, Dhamma, intention
* Appropriate Attention::attend_appropriately()
    * Mind
* Appropriate Attention::skillful_qualities_increase()
    * Mind
* Appropriate Attention::unskillful_qualities_decrease()
    * Mind
* Heedfulness::is_sensitive_to_heedfulness()
    * Mind
* Livelihood::partake_in_food_clothing_shelter()
    * Practitioner
* Livelihood::partake_in_villages_towns_countrysides()
    * Practitioner
* Livelihood::partake_in_individuals()
    * Practitioner


(b) generate plantuml class diagram(s) as a building block using the above details adding relationship details and synthesising as required. when there is a subject like heedfulness which touches from the start to the end of the practice then you will likely need to decompose the diagram into sub-diagrams. in such instances use the partitioned segments from the process view for the sub-diagrams. illustrate abstract and concrete concepts along with their generalisation, aggregation, composition, association etc relationships. also show relevent members, "class associations" & qualified associations when applicable
* use the source "guide_plantuml_class_diagram.md" for a syntax and semantics guide
* set the diagram title as "${varPatternName} (Concepts & Relationships)"

(c) push/append the plantuml **Class Diagram** string to patternBuildingBlocksJson["Solution"]["Concepts & Relationships"] array. push it to the end of the array to preserve the intended order. this approach will enable multiple diagrams to be added when required.


**Assessment**
assess in terms of missing/excess, the 
* diagram(s) that was generated


**running example**

```plantuml
@startuml helpful-sol-class-base
header 16-Aug-2025
title Heedful, ardent & resolute (Base view) 

hide empty members

enum Practitioner_Level {
    UNINSTRUCTED
    CONVICTION_DHAMMA_FOLLOWER
    STREAM_ENTERER
    ONCE_RETURNER
    NON_RETURNER
    ARAHANT
}

enum Result_Of_Stress {
    BEWILDERMENT
    SEARCH
}

class Effluent {
    + is_effluent_free()
} 

class Practitioner {
    + is_arahant()
    + is_uninstructed()
    + is_one_in_training()

    + result_of_stress()
    + is_enough_progress()
    + dwell_heedful_ardent_resolute()
}

class Fetter {
    + sensual_desire
    + ill_will
    + passion_for_form
    + passion_for_formless
    + ignorance
}

Practitioner *--> "0..10" Fetter: is complacent about ignorance &\ncraving for becoming >
Effluent .. (Practitioner, Fetter): {born out of}
Practitioner o-> Mind
Mind --> Effluent: is subject to and produces > 
Practitioner *--> "level" Practitioner_Level: is at the level of >
Practitioner ..> Result_Of_Stress: responds to stress in terms of >
@enduml
```

patternBuildingBlocksJson["Solution"]["Concepts & Relationships"] = []
patternBuildingBlocksJson["Solution"]["Concepts & Relationships"].push(plantUmlClassDiagramAsString)


```plantuml
@startuml helpful-sol-class-apprenticeship
header 16-Aug-2025
title Heedful, ardent & resolute (Apprenticeship view) 
hide empty members

interface Admirable_Friendship {
    + seek()
    + visits_grows_close_lends_ear_hears_the_Dhamma()
}

class Practitioner {
    + exercises_generosity()
}

class Dhamma {
    + remembers_and_learns()
    + penetrates_the_meaning()
}

class Clingable<Doctrine_Of_Self> <<unskillful, regressive>>{
    + abandon()
}

class Five_Faculties <<skillful, non-regressive>> {
    + conviction
    + persistence
    + develop_conviction()
    + develop_persistence()
}

class Mind {
    + come_to_an_agreement_through_pondering_teachings()
}

class Guarding_Qualities <<skillful, regressive>> {
    + sense_of_shame
    + sense_of_compunction
}

class Obstruction <<unskillful, regressive>>{
    + abandon()
}

class No_Falling_Away_Qualities <<skillful, regressive>> {
    + sense restraint
    + moderation in eating
    + wakefulness
}

class Noble_Eightfold_Path <<skillful, non-regressive>> {
    + right_action, right_speech, right_livelihood
    + right_effort, right_mindfulness, right_concentration
    + right_view, right_resolve
    + develop_virtue()
    + develop_concentration()
    + develop_discernment()
}

Person_Of_Integrity ..|> Admirable_Friendship: is a human representation of >
Practitioner o--> Mind: is training >
Mind o--> Clingable: seeks to abandon ignoble voices >
Mind o-u-> Guarding_Qualities: guarded by >
Mind o-u-> No_Falling_Away_Qualities: kept in check by >
Mind o--> Dhamma: establishes mindfulness in >
Practitioner o--> "*" Obstruction: hinders attending to Dhamma >
Practitioner --> Admirable_Friendship: seeks to improve >

Practitioner *--> Five_Faculties: grows in conviction & persistence >
Practitioner *--> Noble_Eightfold_Path: develops >
Guarding_Qualities .l. (Five_Faculties, Dhamma): {born out of\nconviction in causation}
Guarding_Qualities .r. (Five_Faculties, Admirable_Friendship): {born out of\nconviction/respect}
Dhamma .. (Practitioner, Admirable_Friendship): {born out of}

Practitioner --> Person_Of_Integrity: grows close through generosity >
@enduml
```
patternBuildingBlocksJson["Solution"]["Concepts & Relationships"].push(plantUmlClassDiagramAsString)


```plantuml
@startuml helpful-sol-class-in-the-field
header 16-Aug-2025
title Heedful, ardent & resolute (In the field view) 
hide empty members

class Practitioner

class Heedfulness <<skillful, regressive>> {
    + is_sensitive_to_heedfulness()
}

class Four_Bases_Of_Power <<skillful, non-regressive>> {
    + desire
    + willing
    + contemplate
    + exertion

    + develop_desire()
    + become_willing()
    + contemplate_weigh_up_analyse()
    + apply_exertion()
}

class Reflection <<skillful, regressive>> {
    + ones_own_failures_attainments
    + others_failures_attainments
    + apply_reflection()
}

class Appropriate_Attention <<skillful, regressive>> {
    + increase_skillful_qualities()
    + decrease_unskillful_qualities()
}

class Livelihood {
    + partake_in_food_clothing_shelter()
    + partake_in_villages_towns_countrysides()
    + partake_in_individuals()

    + partake_in_training()
}

class Five_Faculties <<skillful, non-regressive>> {
    + conviction
}

class Kammic_Field {
    + lower-property
    + form-property
    + formless-property
}

Practitioner o--> Mind: is training >
Practitioner *--> Five_Faculties: develops >
Practitioner *--> Four_Bases_Of_Power: develops >
Appropriate_Attention .. (Five_Faculties, Heedfulness): {born out of}
Intention .. (Practitioner,  Livelihood): {for the sake of acquisitions}
Intention --> Kammic_Field: seeds of consciousness get planted in >
Mind --> Intention: [upon contact] fabricates with >
Reflection .. (Mind, Intention)
Mind *--> Reflection: develops >

Practitioner *-l-> Kammic_Field: owner, heir, born, related & live dependent on >
@enduml
```
patternBuildingBlocksJson["Solution"]["Concepts & Relationships"].push(plantUmlClassDiagramAsString)


6. **Section: Solution > State Transitions** 
to complete a practitioner's understanding of the solution beyond a process and structural perspective, model the solution in terms of state transitions. for each of the subjects identify how the relevent object transitions between states as the process unfolds. further, how do other objects respond to those transitions participating in an orchestration. this model should ultimately serve to give the practitioner a more nuanced understanding of how things have come to be or function. 

this task will utilise the Process View activity diagram and the class diagram(s) created in the previous sections.

(a) identify the core object(s) and model it's initial state. then follow the process model for each activity in the process. review its associated classes from the class diagram and observe what determinant states & responsibilities govern transitions. add those determinant state to the state model along with the transitions. further, add the other objects key state changes as part of the same signaling. continue until all activities have been considered. generate the plantuml state diagram of the model
* use the source "guide_plantuml_state_diagram.md" for a syntax and semantics guide
* set the diagram title as "${varPatternName} (State view)"


(b) push/append the plantuml **State Diagram** string to patternBuildingBlocksJson["Solution"]["State Transitions"] array. push it to the end of the array to preserve the intended order. this approach will enable multiple diagrams to be added when required.


**Assessment**
assess in terms of missing/excess, the 
* critical states & transitions 
* diagram(s) generated

**running example**

```plantuml
@startuml helpful-sol-state
header 16-Aug-2025
title Heedful, ardent & resolute (State view) 

state "<<transient>>\nMind" as Mind {
  state "selfhood\nin" as mind_selfhood_in <<inputPin>>
  state "intention\nout" as mind_intention_out <<exitPoint>>

  state "Less_Heedful" as less_h {
    less_h:inappropriate attention
    less_h:  + skillful qualities decrease
    less_h:  + unskillful qualities increase
  }
  state "More_Heedful" as more_h {
    more_h:appropriate attention
    more_h:  + skillful qualities increase
    more_h:  + unskillful qualities decrease
  }
  state "Most_Heedful" as most_h {
    most_h:admirable_friendship=100%
    most_h:sense_of_shame=100%
    most_h:sense_of_compunction=100%
    most_h:heedfulness=100%
  }
  
  less_h --> less_h: unskillful intention
  less_h --> more_h: skillful intention\n{sense of shame & compunction}
  more_h --> less_h: unskillful intention\n{thinks: that's enough progress}
  more_h --> more_h: skillful intention
  more_h --> most_h: skillful intention\n[effluent-free=yes]\n{release}
}


  state "<<transient>>\nEffluent" as Effluent {
    state "in" as meff_in <<inputPin>>
    state "out" as meff_out <<exitPoint>>
  }


state "<<persistent>>\nPractitioner" as Practitioner {
}


state "<<persistent>>\nFetter" as Fetter {
    state "in" as pfet_in <<inputPin>>
    state "out" as pfet_out <<exitPoint>>
}

state "<<persistent>>\nKammic_Field" as Kammic_Field {
    state "in" as pkam_in <<inputPin>>
    state "out" as pkam_out <<exitPoint>>
}

Mind:previous_states
Mind:
Mind:Attention
Mind:Guarding_Qualities
Mind:No_Falling_Away_Qualities
Mind:Clinging

Practitioner:Four_Bases_Of_Power
Practitioner:Five_Faculties
Practitioner:Noble_Eightfold_Path
Practitioner:Obstruction
Practitioner:
Kammic_Field:lower_property
Kammic_Field:form_property
Kammic_Field:formless_property

Fetter:from DN33
Fetter:sensuality
Fetter:becoming
Fetter:ignorance

Effluent:sensuality
Effluent:becoming
Effluent:ignorance

'pfet_out -l-> meff_in: prepare for contact\n\n\n\n
'meff_out -r-> pfet_in: \n\tsynchronise\n\n\n\n\n\n

pfet_out -l-> meff_in: [on becoming]
mind_intention_out --> pkam_in: consciousness seed
pkam_out --> mind_selfhood_in: [on becoming]

Practitioner -> Practitioner: skillful intention ot\nunskillful intention
Mind -> Mind: skillful intention ot\nunskillful intention
Fetter -> Fetter: skillful intention ot\nunskillful intention
Effluent -> Effluent: skillful intention ot\nunskillful intention

@enduml
```
patternBuildingBlocksJson["Solution"]["State Transitions"] = []
patternBuildingBlocksJson["Solution"]["State Transitions"].push(plantUmlStateDiagramAsString)

## 4. Prepare the content for the pattern's "Context"
use all previous sourced research material:
1. search results from section 1 solution research
2. search results from section 3.1 causal pool research

(a) having created the solution, identify the invariants & determinants that would results in the process failing on entry, exit or in process. these are the solution's requisite conditions. these requisites form the basis of the pattern's context. this task may require further research.
(b) generate the pattern's context as a list
(c) store the list in patternBuildingBlocksJson["Context"]


**Assessment**
assess in terms of missing/excess, the 
* requisite conditions for the solution 
* the context list

**running example**

the key requisite conditions for heedfulness are:
* Four wheels: living in a civilized land, associating with people of integrity, directing oneself rightly, & having done merit in the past
* There are these five inhabitants of the states of deprivation, inhabitants of hell, who are in agony & incurable. Which five? One who has killed his or her mother, one who has killed his or her father, one who has killed an arahant, one who—with a corrupted mind—has caused the blood of a Tathāgata to flow, and one who has caused a split in the Saṅgha
* Obstructions: He is endowed with a (present) kamma obstruction, a defilement obstruction, a result-of-(past)-kamma obstruction; he lacks conviction, has no desire (to listen), and has dull discernment



## 5. Prepare the content for the pattern's "Forces"
use all previous sourced research material:
1. search results from section 1 solution research
2. search results from section 3.1 causal pool research

(a) identify a list of design constraints, influences, trade-offs and other considerations that were made with respect to the solution. 
(b) generate the patterns forces as a list
(c) store the list in patternBuildingBlocksJson["Forces"]


**Assessment**
assess in terms of missing/excess, the 
* design constraints, influences, trade-offs and other considerations
* the forces list

**running example**

key forces for heedfulness are:
* wrt heedfulness, the buddha was only able to urge, encourage & arouse (ie. not instruct) with statements like: 
    * "Don't be heedless. Don't later fall into remorse.", 
    * "Reach consummation through heedfulness." 
    because heedfulness couldn't be directly taught. consider: how do you get someone to have a positive sense of fear for something they have no fear about
* even buddha the was only able to teach "those that are fit to be tamed"
* people of no integrity not being able to identify others of no integrity or others with integrity. note, one's own actions as the arbitrator will dictate the quality of the admirable friendship you will encounter. therefore, keep increasing one's own skillful qualities is the only way forward which may or may not result in seeking more admirable friendships. continue to exercise generosity towards such individuals and observe their behaviour as your visit and grow close 
* heedfulness establishes appropriate attention. Heedfulness's role is to take the fuel from conviction (via shame & compunction) and direct it at appropriate attention and exertion, then through repeated appropriate attention and exertion the task is completed 



## 6. Prepare the content for the pattern's "Rationale"
use the generated output from the following:
1. solution::step-by-step section
2. context section
3. forces section
4. problem section

(a) generate the rationale explaining why the generated solution best addresses the problem within this context
(b) store the rationale in patternBuildingBlocksJson["Rationale"]


**Assessment**
assess in terms of missing/excess, the 
* the rationale statement

**running example**

key points worthy of mentioning:
* the solution addresses the problem:
    1. by using craving to end craving via positive applications of seeking ... to desire
    2. by showing how complacency by-passes continued convergence in heedfulness
    3. by showing continous seeking admirable friendship & abandoning ignoble voices of another grows heedfulness
    4. by various causal-chains (surrounding shame & compunction) have been unified into a single process
    5. by connecting heedfulness to appropriate attention which results in right view
    6. by applying four bases of power (speciically exertion/commitment) and reflection nurture the practice to end the effluents



## 7. Prepare the content for the pattern's "Resulting Context"
revisit the dhamma subject(s) (in the answer's excerpt) with a focus on the process flowing down stream assuming the solution has been performed. this gives the practitioner a roadmap of the pathways ahead by modeling causal-chains

**follow on causal-chains**
unlike the solution's Step-by-Step & Process View sections, the resulting context honours the original causal chains directly from the sources without wedging them into a process. to a large extent we can leverage the cause and effect pairs captured in the "Solution > Cause-&-Effect" section.

(a) [for each dhamma subject] model those follow on causal-chains that are relevant to this problem or solution for up to 3-7 levels deep. go through the list one by one and avoid any circular references and avoid repeating aspects that are already in the solution. note, multiple diagrams may be required to make the diagram useful particularly when the progressions approach the tens.

(b) generate a plantuml mindmap diagram(s) using the cause and effect pairs from the previous section
* apply "top to bottom direction" directive
* use "*" for representing all nodes except leaves
* use "*_" for leaf nodes
* if the current branch exceeds 7 levels then make the 7th level's node be "*_..." 

(c) push/append the plantuml **Mindmap Diagram** string to patternBuildingBlocksJson["Resulting Context"] array. push it to the end of the array to preserve the intended order. this approach will enable multiple diagrams to be added when required.


**Assessment**
assess in terms of missing/excess, the 
* diagram(s) generated

**running example**

```plantuml
@startmindmap
top to bottom direction
* heedful
  * joy
    * rapture
      * calm
        * pleasure
          * mind becomes centered
            * phenomena become manifest
              *_ ...
  *_ ardent
  *_ easy to correct
  * admirable friendship
    * respect
    * noble eightfold path
      * four establishings of mindfulness
        * four right exertions
          * four bases of power 
            * five faculties
              * five strengths
                * seven factors for awakening
                  *_ ...
  * conviction
    * persistence
      * mindfulness
        * concentration
          *_ discernment
    * appropriate attention
      * mindfulness & alertness
        * restraint of the senses
          * the three forms of right conduct
            * the four establishings of mindfulness
              *_ ...
          * moderation in eating
            * wakefulness
      *_ right view
  *_ release
@endmindmap
```
patternBuildingBlocksJson["Resulting Context"] = []
patternBuildingBlocksJson["Resulting Context"].push(plantUmlMindmapDiagramAsString)

## 8. Prepare the content for the pattern's "Related Patterns"
link to other related patterns that became evident during the research and production of all of the raw materials and building blocks. consider patterns that:
  * are other solutions to the same problem,
  * more general or (possibly domain) specific variations of this pattern,
  * solve some of the problems in the resulting context (set up by this pattern)

(a) identify related patterns whose concepts have been referenced in any of the sections above

(b) generate the related pattern list using the source "DN34-param-pattern-request-config.json.txt" as a JSON object "pattern-names" property for pattern references 

(c) store this list in patternBuildingBlocksJson["Related Patterns"]


**Assessment**
assess in terms of missing/excess, the 
* related patterns list


**running example**

key related patterns are:
* Four wheels
* Factors for stream-entry
* Easy to instruct & admirable friendship
* Person of integrity
* Ignorance & craving for becoming
* Appropriate attention
* Qualities creating a protector
* Mindfulness & alertness
* Four Establishings of Mindfulness
* Seven Factors for Awakening
* Noble eightfold path
* Factors for exertion



## 9. Prepare the content for the pattern's "Case-studies"
identify and list actual events where individuals applied this pattern with success from the sources.

(a) identify specific individuals who undertook the pattern's solution to achieve a benefical or successful outcome. note, there are cases where individuals have the same name so apply uniqueness in naming

(b) generate the patterns Case-studies list

(c) store this list in patternBuildingBlocksJson["Case-studies"]


**Assessment**
assess in terms of missing/excess, the 
* choice of individuals
* background context & solution 

**running example**

*   Gavesin, the lay follower
*   Venerable Citta Hatthisārīputta
*   Nandamātar, the lay follower



## 10. Prepare the content for the pattern's "Simile"
enumerate relevant similes that can help practitioners understand the solution through a comparable concept.

(a) identify similes related to the solution. for each simile describe what role the subject played in the simile and how this can be understood

(b) generate the pattern's simile list

(c) store this list in patternBuildingBlocksJson["Simile"]


**Assessment**
assess in terms of missing/excess, the 
* choice of simile
* role discription & how it can be understood 


**running example**

*   The Elephant's Footprint
*   The roof-peak of a house