SYS_TEST2
1. with the parameterised request below:
userPatternRequestJson = { 
    "progressionIndex": 1,
    "categoryKey": "developed",
}
2. execute the instructions in source "guide_to_writing_PBT_patterns.md" which output's patternResponseJson
3. apply patternResponseJson as input and execute the instructions in source "debug_PBT-pattern-request-template.md" for rendering

--- PART-A BEG ---
```json
{
  "scope": {
    "progressionIndex": 1,
    "categoryKey": "developed",
    "pattern-name": "Mindfulness immersed in the body",
    "subject": [
      {
        "name": "Mindfulness immersed in the body",
        "focus": ["body"],
        "enter-from-state": "unconcentrated mind",
        "exit-to-state": "unfabricated",
        "target-audience": ["one-in-training"]
      }
    ]
  },
  "building-blocks": {
    "Problem": "How do you steady an unconcentrated mind through immersion in the body when the unfabricated is still unattained?",
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
      "Luminous, monks, is the mind. And it is defiled by incoming defilements.' The uninstructed run-of-the-mill person doesn't discern that as it has come to be, which is why I tell you that—for the uninstructed run-of-the-mill person—there is no development of the mind.'",
      "He keeps perceiving what is in front & behind so that what is in front is the same as what is behind, what is behind is the same as what is below. (He dwells) by night as by day, and by day as by night. By means of an awareness thus open & unhampered, he develops a brightened mind.",
      "He trains himself, 'I will breathe in sensitive to the mind.' He trains himself, 'I will breathe out sensitive to the mind.' He trains himself, 'I will breathe in satisfying the mind.' He trains himself, 'I will breathe out satisfying the mind.' He trains himself, 'I will breathe in steadying the mind.' He trains himself, 'I will breathe out steadying the mind. He trains himself, 'I will breathe in releasing the mind.' He trains himself, 'I will breathe out releasing the mind.'",
      "There is the case where a monk remains focused on the body in & of itself—ardent, alert, & mindful—subduing greed & distress with reference to the world.",
      "Mindfulness immersed in the body: This is called the path leading to the unfabricated.",
      "He discerns a concentrated mind as 'a concentrated mind,' and an unconcentrated mind as 'an unconcentrated mind.'"
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