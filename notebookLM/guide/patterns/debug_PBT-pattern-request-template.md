# System-Test Pattern template

## Background
in DN 34 there are 100 Dhammas presented in a "progressing by tens" framework. these Dhammas are highly tailored for attaining unbinding, putting an end to suffering & stress, and releasing from all ties. these 100 Dhammas are in fact patterns, that is, they are well established solutions to known problems that practitioners face whilst in training. this project is a Dhamma practitioner's pattern language of the "progressing by tens" framework

## Purpose
this is a specific type of template that represents a system-test artifact. this template will not generate a **real** pattern. rather, this will enable the expert to review notebooklm's responses by dumping the patternResponseJson object

## Requisite Conditions
the following pre-conditions are expected:
1. execution of the instructions in source "guide_to_writing_PBT_patterns.md" has completed
2. a populated patternResponseJson object is accessible

## Non-Functional Requirements
1. do not provide any citations or references
2. strictly generate content between the PART-A BEG & END markers


**NotebookLM Task**
1. **Command:inline** patternResponseJson
--- PART-A BEG ---
```typescript
`${JSON.stringify(patternResponseJson, null, 2)}`
```
--- PART-A END ---