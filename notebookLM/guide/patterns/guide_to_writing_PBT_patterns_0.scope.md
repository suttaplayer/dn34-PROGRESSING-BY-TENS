# Establish the pattern's "Scope"

unlike writing a typical pattern, the "progressing by tens" pattern's approach will be a little backwards. this is because the answer as been given in response to a question focused around dhamma memorisation. note, Ven. Sāriputta's answers are not solutions. the answer's solution space must thus be explored and comprehended in order to determine what the real solution and problem is.

more often than not, Ven. Sāriputta's full answer is provided in brief. even though there are 100 dhamma topics, the "progression by tens" framework means that in total there are 550 dhammas referenced within the framework itself. therefore, researching all suttas is crucial on each subject (eg for ones there is 1 subject, for twos there are 2 subjects in the answer, and so on) for comprehension. further, there is one specific case of "Mindfulness & alertness" which appears as two subjects. this is a special case where there is a specific practice named "Mindfulness & alertness" and thus is to treated as one subject, however "alertness" in of itself should be added as the second subject.


## 1. Setting The Context
**NotebookLM Task**
1. **Command:construct** a language expression of Ven. Sāriputta's question and full answer and assign it to contextStatement local variable

```typescript
const contextStatement = `
Which ${convertProgressionIndexToKey(progressionByTensContextJson["progressionIndex"])} ${fixBreadcrumbsIfNecessary(progressionByTensContextJson)}? 
${lookupAnswerExcerpt(progressionByTensContextJson)}
`
```

**running example**
```typescript
const contextStatement = `
Which one Dhamma is very helpful? 
Heedfulness with regard to skillful qualities
`
```

## 2. Parse The Context
**NotebookLM Task**
1.  **Command:parse** the `contextStatement` value.
    *   Identify the primary **subject(s)**.
    *   For each identified subject, extract any **explicitly stated qualifying phrases or modifiers** present directly within the `contextStatement`'s answer portion, and use these verbatim as the **focus areas**. **Do not infer or introduce new terms for focus areas that are not literally present in the `contextStatement` provided in the query.**
    *   Create a `ProgressionByTensSubjectJson` object for each subject based on these parsed elements.
2.  **Command:store** the `ProgressionByTensSubjectJson` objects as array elements in `progressionByTensContextJson`'s "subject" property"


**running example**
* the userPatternRequestJson specified that the context is in regards to "progressionIndex": 1
* the userPatternRequestJson specified that the context is in regards to "categoryKey": "helpful"
* these userPatternRequestJson properties clarify that there is only 1 subject to parse because progressionIndex is 1, and perhaps 1 optional related focus area(s)
* therefore, the subject name is "Heedfulness" and the focus area is "skillful qualities"

```typescript
progressionByTensContextJson["subject"] = [
    {
      "name": "Heedfulness",
      "focus": ["skillful qualities"],
      "enter-from-state": "",
      "exit-to-state": "",
      "target-audience": []
    }
]
```

## 3. Research The Subjects & Focus Areas
**NotebookLM Task**
1. **Command:fuzzy search** ONLY the sutta sources (*_nblm.txt):
  * for each progressionByTensContextJson["subject"] element's "name" in the context of its associated "focus" areas if applicable
  * by extending the search to include the opposite or inverse of each progressionByTensContextJson["subject"]
2. **Command:review** each search_result item in terms of relevence of a determining quality with regards to the context and discard those with low relevence
3. **Command:sort** search_result by relevence
4. **Command:store** the search_result in the patternQuotationsJson["Problem"] property


**running example**
```typescript
const search_results = [
"Don't be heedless. Don't later fall into remorse.", 
"Now, then, monks, I exhort you: All fabrications are subject to ending & decay. Reach consummation through heedfulness.' That was the Tathāgata's last statement [to a group of noble monks the most backward of which was a stream-enterer]", 
"Monks, I don't say of all monks that they have a task to do with heedfulness"
];
patternQuotationsJson["Problem"] = search_results
```

## 4. Inject User's Direct Experience
**NotebookLM Task**
1. **Command:append** the userDirectExperienceJson["Problem"] if provided:
```typescript
if (userDirectExperienceJson?.["Problem"]?.["factors"])
  patternQuotationsJson["Problem"].push(...userDirectExperienceJson?.["Problem"]?.["factors"])
if (userDirectExperienceJson?.["Problem"]?.["determinant-quotations"])
  patternQuotationsJson["Problem"].push(...userDirectExperienceJson?.["Problem"]?.["determinant-quotations"])

```

**running example**
```typescript
// suppose notebooklm didn't realise these quotes were in relation to heedfulness
const expert_determinant_quotes_for_problem = [
  "[dont] ever let yourself get complacent when the ending of effluents is still unattained", 
  "Now the thought may occur to you, 'We are endowed with shame & compunction. That much is enough, that much means we're done, so that the goal of our contemplative state has been reached. There's nothing further to be done,' and you may rest content with just that.",
  "Don't let those of you who seek the contemplative state fall away from the goal of the contemplative state when there is more to be done."
]

const userPatternRequestJson: UserPatternRequestJson = { 
  "progressionIndex": 1,
  "categoryKey": "helpful",
  "directExperience": {
      "Problem": {
          "determinant-quotations": expert_determinant_quotes_for_problem,
      }
  }
}
// after injecting user's direct experience:
patternQuotationsJson["Problem"].length // 6
```

## 5. Determine The Scope & Target Audience
**NotebookLM Task**
1. **Command:review** all the quotations in the patternQuotationsJson["Problem"] array and discern with respect to each progressionByTensContextJson["subject"]:
  1. subject's enter-from-state and exit-to-state
    clearly entry and exit states are associated with causual events. there are several sections in the pattern that will investigate causation, but this task's purpose is to identify an internal or external state of the state of the mind or environmental condition
    **Command:identify** what was the relevant state of the mind or environmental condition before the subject and store in "enter-from-state" property
    **Command:identify** what was the relevant state of the mind or environmental condition after the subject and store in "exit-to-state" property
  2. target audience
    some dhammas a highly advanced and are applicable to a practitioner who has achieved non-return, where as other practices are relevant to conviction and dhamma followers who are determined on stream-entry.
    **Command:identify** which type of individual the subject is targetting and store in "target-audience" property


**running example**
```typescript
progressionByTensContextJson["subject"][0]["name"] // -> "Heedfulness"
progressionByTensContextJson["subject"][0]["enter-from-state"] = "complacent"
progressionByTensContextJson["subject"][0]["exit-to-state"] = "effluent-free"
progressionByTensContextJson["subject"][0]["target-audience"] = ["one-in-training"] // stream-enterer to non-returner (inclusive)

```

## 6. Assessment

**User Task**
assess in terms of missing/excess, the 
* patternQuotationsJson["Problem"]
* progressionByTensContextJson and all of its embedded object and properties