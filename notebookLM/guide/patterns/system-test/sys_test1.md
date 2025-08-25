SYS_TEST1
1. with the parameterised request below:
userPatternRequestJson = { 
    "progressionIndex": 1,
    "categoryKey": "helpful",
}
2. execute the instructions in source "guide_to_writing_PBT_patterns.md" which output's patternResponseJson
3. apply patternResponseJson as input and execute the instructions in source "debug_PBT-pattern-request-template.md" for rendering

--- PART-A BEG ---
```json
{
  "scope": {
    "progressionIndex": 1,
    "categoryKey": "helpful",
    "pattern-name": "Heedful, ardent & resolute",
    "subject": [
      {
        "name": "Heedfulness",
        "focus": ["skillful qualities"],
        "enter-from-state": "complacent",
        "exit-to-state": "effluent-free",
        "target-audience": ["one-in-training"]
      }
    ]
  },
  "building-blocks": {
    "Problem": "How do you stop being complacent when the ending of effluents is still unattained?",
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
  "quotations": {
    "Problem": [
      "Don't be heedless. Don't later fall into remorse.",
      "Now, then, monks, I exhort you: All fabrications are subject to ending & decay. Reach consummation through heedfulness.' That was the Tathāgata's last statement [to a group of noble monks the most backward of which was a stream-enterer]",
      "Monks, I don't say of all monks that they have a task to do with heedfulness",
      "[dont] ever let yourself get complacent when the ending of effluents is still unattained",
      "Now the thought may occur to you, 'We are endowed with shame & compunction. That much is enough, that much means we're done, so that the goal of our contemplative state has been reached. There's nothing further to be done,' and you may rest content with just that.",
      "Don't let those of you who seek the contemplative state fall away from the goal of the contemplative state when there is more to be done."
    ],
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
```
--- PART-A END ---