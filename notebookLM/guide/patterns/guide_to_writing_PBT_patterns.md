# Guide to writing "progressing by tens" (PBT) framework patterns

## Background
in DN 34 there are 100 Dhammas presented in a "progressing by tens" framework. these Dhammas are highly tailored for attaining unbinding, putting an end to suffering & stress, and releasing from all ties. these 100 Dhammas are in fact patterns, that is, they are well established solutions to known problems that practitioners face whilst in training. there is a requirements to create a project which will result in a Dhamma practitioner's pattern language of the "progressing by tens" framework

in order to be successful at this task, notebooklm has been paired with an expert dhamma practitioner. notebooklm has been assigned the task of eventually generating all of the 100 patterns. notebooklm and the expert have been collaborating on the "Heedful, ardent & resolute" pattern (previously known just as Heedfulness). This pattern has thus experienced 4 iterations with feedback from the expert serving as input for the next generated iteration. whilst this process review/refinement process is progressing, it is far too slow. hence, the need for a writing guide with a worked example and a well defined process.

this guide represents the approach that the expert themselves would follow to create the "progression by tens" patterns. the purpose of this guide is to document the processes & methods of creating the raw materials and building blocks for final pattern generation. 


## Pattern Writing Orchestration
generating a pattern will require orchestration between the following artifacts: 
1. parameterised user query: the user provides a parameterised initiating instruction as part of the user query submitted to notebooklm
2. guide (this document): notebooklm, reviews this guide to comprehend the shared resource objects and the collaboration API used in the process. notebooklm then executes the step-by-step process (see below) following the methodology applied in separate sub-documents. all tasks incorporate their resultant raw materials building blocks in the final payload which will be consumed by the template
3. template: notebooklm, executes the instructions in the template using the payload for rendering

this triad of core artifacts provides for the highest level of flexability achieved through the separation of concerns. in this way, it's now a feasible option to persist the generated pattern as a JSON file and later apply the same JSON file as input to a template optimised for text-to-speech  or even video whilst all based on the exact same conceptual pattern. because notebooklm's responses are non-deterministic, this approach is an effective way to achieve write once, consume on any media approach. thus, the guide's will deliver the essence of the pattern, the template will target a specific media format.


## Pattern Writing Collaboration API
in order to inteface between the three artifacts, a common set of data types must be established to form a contract for communication. objects of these types may be created by either the user or notebooklm as part of an orchestrated request or work task response.

the source "PBT-collaboration-API.ts.txt" typescript file provides many key types required for communication and exchange. some include:

```typescript
export type CauseAndEffectJson = {
    "not-cause"?: boolean,      /* boolean value indicating inverse of the causal reference (default: boolean|null)*/
    "cause": string,            /* string of the cause in lowercase (eg. "admirable friendship")*/
    "cannot"?: boolean,         /* boolean value indicating an impossible causal relationship (default: boolean|null)*/
    "skips-to"?: boolean,       /* boolean value indicating causation with missing links between causal relationship (default: boolean|null)*/
    "co-arised-with"?: boolean, /* boolean value indicating co-arising together causal relationship (default: boolean|null)*/
    "not-effect"?: boolean,     /* boolean value indicating inverse of the effect reference (default: boolean|null)*/
    "effect": string,           /* string of the effect in lowercase (eg. "conviction")*/
}

export type CategoryKey = "helpful" | "developed" | "comprehended" | "abandoned" | "decline" | "distinction" | "penetrate" | "arise" | "known" | "realised";

export type ProgressionReferenceJson = {
    "progressionIndex": number, /* 1-based progression index reference in: Which [three] dhammas are very helpful */
    "categoryKey": CategoryKey, /* category key reference in: Which three dhammas are very [helpful]  */
}

export type ProgressionByTensContextJson = ProgressionReferenceJson &{
    "subject": string[],        /* subjects eg. ["people of integrity", "True Dhamma", "practicing the Dhamma"] */
    "focus": string[],          /* focus areas eg. ["Associating", "listening", "in accordance with the Dhamma"] */
    "scope": string[],          /* begins with & ends-at points eg. ["stress", "effluent-free"] */
    "targetAudience": string[], /* [conviction-dhamma-follower|stream-enterer|once-returner|non-returner|one-in-training], eg. ["conviction-dhamma-follower", "stream-enterer", "once-returner"] */
}

export type PlantUMLDiagram = string;

export type PatternBuildingBlocksJson = {
    "Problem": string, /* string of the problem statement */
    "Causal-Table": CauseAndEffectJson[], /* array of causeAndEffectJson objects (full table) */
    "Solution": {
        "Step-by-Step": string[], /* array of process step strings (this is a flattened representation of Process View) */
        "Cause-&-Effect": CauseAndEffectJson[], /* array of causeAndEffectJson objects (solution only) */
        "Process View": PlantUMLDiagram[], /* array of PlantUML Activity Diagram strings */
        "Concepts & Relationships": PlantUMLDiagram[], /* array of PlantUML Class Diagram strings */
        "State Transitions": PlantUMLDiagram[], /* array of PlantUML State Diagram strings */
    },
    "Context": string[], /* array of requisite condition/invariant strings */
    "Forces": string[], /* array of design constraint/influence strings */
    "Rationale": string, /* string of the rationale statement */
    "Resulting Context": PlantUMLDiagram[], /* array of PlantUML Mindmap Diagram strings */
    "Related Patterns": string[], /* array of related pattern-name strings */
    "Case-studies": string[], /* array of individual's name reference strings */
    "Simile": string[], /* array of simile name reference strings */
}

export type DeterminantQuotationString = string

export type PatternQuotationsJson = {
    "Problem": DeterminantQuotationString[], 
    "Solution": {
        "Step-by-Step": DeterminantQuotationString[], 
        "Cause-&-Effect": DeterminantQuotationString[], 
        "Process View": DeterminantQuotationString[], 
        "Concepts & Relationships": DeterminantQuotationString[], 
        "State Transitions": DeterminantQuotationString[], 
    },
    "Context": DeterminantQuotationString[], 
    "Forces": DeterminantQuotationString[], 
    "Rationale": DeterminantQuotationString[], 
    "Resulting Context": DeterminantQuotationString[], 
    "Related Patterns": DeterminantQuotationString[], 
    "Case-studies": DeterminantQuotationString[], 
    "Simile": DeterminantQuotationString[], 
}

export type PatternResponseJson = {
    "context": ProgressionByTensContextJson,   
    "building-blocks": PatternBuildingBlocksJson,
    "quotations": PatternQuotationsJson
}
```

## Common API Utilities Package
the source "PBT-utils-and-config.ts.txt" typescript file provides:
1. a progressingByTensConfig JSON object of the "progressing by tens" framework
2. helper utility functions for querying the progressingByTensConfig object

```typescript
export const progressingByTensConfig = {
    "index-keys": [...],                  // in reference to a progression key (eg. "nine")
    "catagory-keys": [...],               // in reference to a category key (eg. "helpful")
    "catagory-breadcrumb-labels": [...],  // in reference to a context (eg. "Dhammas that are very helpful")
    "pattern-names": {                    // 1-to-1 mapping of pattern-names to answer-excerpts "Heedful, ardent & resolute" -> "Heedfulness with regard to skillful qualities")
        "helpful": [...],                 // indexed array of helpful progressions eg. config["pattern-names"]["helpful"][2] represents three Dhammas that are very helpful (ie. "Associating with people of integrity, listening to the True Dhamma, practicing the Dhamma in accordance with the Dhamma")
        "developed": [...],
        "comprehended": [...],
        ...
    },
    "answer-excerpts": {
        "helpful": [...],                 // indexed array of helpful progressions eg. config["answer-excerpts"]["helpful"][2] represents three Dhammas that are very helpful (ie. "Factors for stream-entry")
        "developed": [...],
        "comprehended": [...],
        ...
    },
}

// helper utilities; example usage
ProgressingByTens.progression.keyToIndex("one"); // -> 1
ProgressingByTens.progression.indexToKey(1); // -> "one"
ProgressingByTens.category.keyToIndex("helpful"); // -> 0
ProgressingByTens.category.keyToBreadcrumb("helpful"); // -> "Dhammas are very helpful"
ProgressingByTens.category.indexToKey(0); // -> "helpful"
ProgressingByTens.category.fixBreadcrumbsIfNecessary({ progressionIndex: 1, categoryKey: "helpful" }); // -> "Dhamma is very helpful"
ProgressingByTens.lookupPatternName({ progressionIndex: 1, categoryKey: "helpful" }); // -> "Heedful, ardent & resolute"
ProgressingByTens.lookupAnswerExcerpt({ progressionIndex: 1, categoryKey: "helpful" }); // -> "Heedfulness with regard to skillful qualities"
ProgressingByTens.searchAnswerExcerptsForTerm("inconstant"); // -> [  {  categoryKey: "arise",  progressionIndex: 9,  excerpt: "Nine perceptions: the perception of unattractiveness, the perception of death, the perception of loathsomeness in food, the perception of distaste for every world, the perception of inconstancy, the perception of stress in what is inconstant, the perception of not-self in what is stressful, the perception of abandoning, the perception of dispassion."  },  {  categoryKey: "arise",  progressionIndex: 10,  excerpt: "Ten perceptions: the perception of unattractiveness, the perception of death, the perception of loathsomeness in food, the perception of distaste for every world, the perception of inconstancy, the perception of stress in what is inconstant, the perception of not-self in what is stressful, the perception of abandoning, the perception of dispassion, the perception of cessation."  }]
ProgressingByTens.createRelatedPatternMarkdownLink({ progressionIndex: 1, categoryKey: "helpful" }); // -> "/Heedful, ardent & resolute/(../ones/helpful.html)"
ProgressingByTens.revealContextStatement({ progressionIndex: 1, categoryKey: "helpful" }); // -> "/Heedful, ardent & resolute/(../ones/helpful.html)"
ProgressingByTens.mimimiseJson({val1_keep:10, val2_keep: "ten", obj1_keep: {a: "ten", b: [10]}, val2_no_keep: "", obj2_no_keep: {a: "", b: []}, obj3_partial_keep: {a: "ten", b: []}, obj4_partial_keep: {a: "", b: [10]}}); // -> {val1_keep:10,val2_keep:"ten",obj1_keep:{a:"ten",b:[10]},obj3_partial_keep:{a:"ten"},obj4_partial_keep:{b:[10]}} 

``` 


## Running Example
instructions are one things but examples of how a method has been applied is another. therefore, below the instructions for each work task an example of resultant building blocks has been provided. however, often independent and over-simplisitic examples hide the nuances inherent in tasks that are coupled to the overrall process. to resolve this issues, this guide uses a **running-example**. 

the **"Heedful, ardent & resolute"** pattern whose associated answer-excerpt is **"Heedfulness with regard to skillful qualities"** has been used as a running example for this guide and it's sub-guides. notebooklm must analyse the running example to follow the expert's methodology on how they implemented the instructions when crafting the resultant raw materials and building blocks. 

note, only the example plantuml diagrams are to be considered final drafts. all other sections or sub-sections examples are to be considered as work-in-progress that notebooklm must use as a reference.


## Expert User-Influence
there are several sections in this "progressing by tens" writing guide that make reference to "direct experience". this term is in reference to an insight that an expert has made that is not found in the source sutta texts. if it is not found in the sources, then it is not reasonable to expect notebooklm to arrive at this same insight and generate the similar pattern. therefore, a direct experience JSON object will be declared as an optional user parameter that will be submitted as part of the intiating user query. this way, direct experience can be injected into notebooklm's processing when required. 

the source "PBT-collaboration-API.ts.txt" typescript file provides many key types for the user. some include:

```typescript
type UserInfluentialFactorsJson = {
    "factors"?: string[], /* unsubstantiated factors to inject into notebooklm's awareness for a work task */
    "determinant-quotations"?: DeterminantQuotationString[] /* DeterminantQuotationStrings to inject into notebooklm's awareness for a work task */
}

export type UserDirectExperienceJson = {
    "Problem"?: UserInfluentialFactorsJson,
    "Causal-Table"?: CauseAndEffectJson[],        /* full table additions */
    "Solution"?: {
        "Cause-&-Effect"?: CauseAndEffectJson[],  /* (solution only additions */
        "Step-by-Step"?: UserInfluentialFactorsJson,
        "Process View"?: UserInfluentialFactorsJson,
        "Concepts & Relationships"?: UserInfluentialFactorsJson,
        "State Transitions"?: UserInfluentialFactorsJson,
    },
    "Context"?: UserInfluentialFactorsJson,
    "Forces"?: UserInfluentialFactorsJson,
    "Rationale"?: UserInfluentialFactorsJson,
    "Resulting Context"?: UserInfluentialFactorsJson,
    "Related Patterns"?: UserInfluentialFactorsJson,
    "Case-studies"?: UserInfluentialFactorsJson,
    "Simile"?: UserInfluentialFactorsJson,
}
```
use "determinant-quotations" when the expert wants to inject into notebooklm's awareness a quotation that was previously absent when a task was performed. however, there are occasions where the expert has gained insights that are not in the sources. on these occasions, use "factors" to inject causation into notebooklm's awareness. 

note, it is only when an expert reviews notebooklm's generated pattern response with the associated patternQuotationsJson object will they be able to realise what key quotations and influencial aspects were absent. it is in the next iteration of generation of the same pattern that the expert can include direct experience in the initiating user query. the expert need only supply the influences revelant for the sections of interest on as needed basis.


## Assessment criteria
the expert uses a simple accessment criteria when reviewing each section of the generated pattern. a mark will be assigned based on the following marking scheme:
1. **distinction**
    1. when there is nothing missing [in the content]
    2. when there is nothing in excess [in the content]
2. **credit**
    1. when there are some things missing [in the content]
    2. when there are some things in excess [in the content]
3. **pass**
    1. when there are many things missing [in the content]
    2. when there are many things in excess [in the content]
4. **fail**
    1. when the content is categorically wrong and not fit for purpose

notebooklm's goal in terms of performance is to achieve distinctions for each aspect of the generated patternResponseJson object.


## Work Tasks
when following any guide with reference instructions it can become ambiguous as to:
1. who will execute a given instruction
2. what is instructional context or information which may represent the executional state
3. what is an instruction command

to address these concerns the guide & template both annotate each task segment as either: 1. "**User Task**" or 2. "**NotebookLM Task**" indicating the tasks which are to be performed by the user or notebooklm respectively. notebooklm must read & analyse all source materials associated with the user-query in order to understand the means of collaboration and exchange between artifacts and the user.

furthermore, all commands will be denoted with a "**Command:<command>**" qualifier. this marker helps notebooklm understand the user's expectation and separate between instructional information and command.


## User Query
the user query is the means by which a pattern request is submitted via notebooklm's UI prompt input-field. the user query must explicitly specify:
1. a userPatternRequestJson object as the parameters of representing the desired pattern to be generated
2. this source guide
3. a specific source template to apply for rendering

```typescript
export type UserPatternRequestJson = ProgressionReferenceJson &{
    "directExperience"?: UserDirectExperienceJson;
}
```

**User Task:**
* Submit the pattern generation request query to notebooklm by specifying the following parameters:

```txt
  1. with the parameterised request below:
    userPatternRequestJson = { 
      "progressionIndex": -1, /* numeric: 1-based progression index [1-10] */
      "categoryKey": null,    /* string:  category key reference ["helpful" | "developed" | "comprehended" | "abandoned" | "decline" | "distinction" | "penetrate" | "arise" | "known" | "realized"]  */
      "directExperience": {
          "Problem": {
            "factors": ["add this factor to influence the problem"]
          }
      }
    }
  2. execute the instructions in source "guide_to_writing_PBT_patterns.md" which output's patternResponseJson
  3. apply patternResponseJson as input and execute the instructions in source "<template-file>" for rendering

```
**running example**
* Example User Query:
```txt

1. with the parameterised request below:
userPatternRequestJson = { 
    "progressionIndex": 1,
    "categoryKey": "helpful",
}
2. execute the instructions in source "guide_to_writing_PBT_patterns.md" which output's patternResponseJson
3. apply patternResponseJson as input and execute the instructions in source "sys-test_PBT-pattern-request-template.md" for rendering
```


## 1. Bootstrap The Process 
the execution of this guide is more akin to capturing the working out (ie. building blocks) to a math's problem rather than the solution's actual answer. this "working out" will be achieved by storing the each building block value into JSON objects. the full payload that is sent to the template will be a patternResponseJson object. this includes the quotations applied in each section to help the expert diagnose how notebooklm arrived at its result. 

note, the patternQuotationsJson object and patternBuildingBlocksJson's "Causal-Table" and "Cause-&-Effect" are crucially to enable the expert to see where user influencial factors need to be injected in order to change the result generated.


**NotebookLM Task**
1. **Command:create** the patternBuildingBlocksJson, patternQuotationsJson, progressionByTensContextJson & patternResponseJson objects
2. **Command:initialise** progressionByTensContextJson with the pattern request parameters from the user-query & lookup the pattern name


**running example**
```typescript
const patternBuildingBlocksJson: PatternBuildingBlocksJson = {
    "Problem": "",
    "Causal-Table": [],
    "Solution": {
        "Step-by-Step": [],
        "Cause-&-Effect": [],
        "Process View": [],
        "Concepts & Relationships": [],
        "State Transitions": [],
    },
    "Context": [],
    "Forces": [],
    "Rationale": "",
    "Resulting Context": [],
    "Related Patterns": [],
    "Case-studies": [],
    "Simile": [],
}

const patternQuotationsJson: PatternQuotationsJson = {
    "Problem": [],
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

const progressionByTensContextJson: ProgressionByTensContextJson = { 
    "progressionIndex": -1, 
    "categoryKey": "helpful",    
    "pattern-name": "",
    "subject": []
}

const patternResponseJson: PatternResponseJson = {
    "context": progressionByTensContextJson,
    "building-blocks": patternBuildingBlocksJson,
    "quotations": patternQuotationsJson
}

progressionByTensContextJson["progressionIndex"] = userPatternRequestJson["progressionIndex"]
progressionByTensContextJson["categoryKey"] = userPatternRequestJson["categoryKey"]
progressionByTensContextJson["pattern-name"] = lookupPatternName(userPatternRequestJson)
```


## The "progressing by tens" Pattern writing step-by-step process
**NotebookLM Task**
execute the process below in order. each item in the list has its own specification document. open each source document below in turn and complete the instructions before moving to the next list item.

note, an iterative & incremental approach will be taken to building this pattern writing guide system. therfore, only those sections that have been developed are listed below with associated sub-section guides!

0. **Command:execute** Establish the pattern's "Scope" in source "guide_to_writing_PBT_patterns_0.scope.md"
1. **Command:execute** Prepare the content for the pattern's "Problem" in source "guide_to_writing_PBT_patterns_1.problem.md"
2. **Command:execute** Prepare the content for the pattern's "Causal-Table" in source "guide_to_writing_PBT_patterns_2.causal-table.md"

3. Prepare the content for the pattern's "Solution" 
4. Prepare the content for the pattern's "Context"
5. Prepare the content for the pattern's "Forces"
6. Prepare the content for the pattern's "Rationale"
7. Prepare the content for the pattern's "Resulting Context"
8. Prepare the content for the pattern's "Related Patterns"
9. Prepare the content for the pattern's "Case-studies"
10. Prepare the content for the pattern's "Simile"
