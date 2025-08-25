# System-Test Verify causal-table generation

## Background
in DN 34 there are 100 Dhammas presented in a "progressing by tens" framework. these Dhammas are highly tailored for attaining unbinding, putting an end to suffering & stress, and releasing from all ties. these 100 Dhammas are in fact patterns, that is, they are well established solutions to known problems that practitioners face whilst in training. this project is a Dhamma practitioner's pattern language of the "progressing by tens" framework

so far 4 isolated single test-cases have been completed with positive results on the pattern generation up to the problem statement. however, this manual approach to testing is cumbersome. further, the next stage (and increment) of verifying the pattern generation is to inspect the causal-table that forms the basis of the rest of the content generated. 

## Purpose
this is a system test script which will generate an array of 10 PatternResponseJson objects for a given category. this will help scale up the testing and expose consistent defects [if any] of the source "guide_to_writing_PBT_patterns_2.causal-table.md" instruction.

## User Query
* Example User Query for running causal-table system test suite for "helpful" category:
```txt
1. with the parameterised request below:
userPatternRequestJson = { 
    "progressionIndex": -1,
    "categoryKey": "helpful",
}
2. execute the instructions in source "sys-test_PBT-causal-table.md" 
```

## Automated Test
**NotebookLM Task**
```typescript

let patternResponseJsonResults: PatternResponseJson[] = []
for (let i = 1; i <= 10; i++) {
    userPatternRequestJson.progressionIndex = i;
    let patternResponseJson: PatternResponseJson = {} as PatternResponseJson;
    // **Command:execute** with userPatternRequestJson, the instructions in source "guide_to_writing_PBT_patterns.md" which output's patternResponseJson
    patternResponseJsonResults.push(patternResponseJson);
}
patternResponseJsonResults = ProgressingByTens.mimimiseJson(patternResponseJsonResults);
```

## Post Conditions
the following post-conditions are expected:
1. execution of the instructions in source "guide_to_writing_PBT_patterns.md" has **ONLY** been executed **upto** and including "guide_to_writing_PBT_patterns_2.causal-table.md"
2. a populated patternResponseJsonResults[] array of 10 PatternResponseJson object is accessible


## Non-Functional Requirements
1. do not provide any citations or references
2. strictly generate content between the PART-A BEG & END markers


**NotebookLM Task**
1. **Command:inline** patternResponseJsonResults
--- PART-A BEG ---
```typescript
`${JSON.stringify(patternResponseJsonResults, null, 2)}`
```
--- PART-A END ---