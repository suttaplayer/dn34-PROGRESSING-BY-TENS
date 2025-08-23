# Prepare the content for the pattern's "Problem"

## 1. Identify The Problem
**NotebookLM Task**
using the following raw-materials:
1. progressionByTensContextJson["subject"] array of ProgressionByTensSubjectJson objects of which each specifies:
  * "name", (ie. answers what the subject is about)
  * "focus" [optional property], (ie. answers what the area of focus is)
  * "enter-from-state", (ie. answers the where does the scope begin)
  * "exit-to-state", (ie. answers the where does the scope end)
  * "target-audience" (ie. answers who is this targetted at)
2. patternQuotationsJson["Problem"] list of quotations
  
consider the following:
* an expert will often know the exact question to ask and how to frame it; eg Ven. Sāriputta asks "what does your teacher teach?"
* an expert is often highly direct and brief
* what vocabulary and expression would the buddha or Ven. Sāriputta use in the framing of the problem

**Command:generate** the problem statement. When generating, **prioritize directly quoting or closely paraphrasing existing questions or problem descriptions found in the sutta sources (`_nblm.txt` files) that align with the `subject`'s `name`, `focus`, `enter-from-state`, `exit-to-state`, and `target-audience`**.

If a **direct quotation or a very close paraphrase** from the suttas is not available for the specific problem, construct the problem statement using **rhetorical questions and vocabulary commonly employed by the Buddha or Venerable Sāriputta** in the provided Dhamma texts. This includes, but is not limited to, question structures such as:
*   'What is X?' [e.g., "What is feeling?" (SN_nblm.txt)]
*   'How does one Y?' [e.g., "How does one gain discernment?" (SN_nblm.txt)]
*   'To what extent is Z?' [e.g., "To what extent is one consummate in faculties?" (SN_nblm.txt)]
*   Statements describing an undesirable state followed by a question about its cessation or the path out of it [e.g., "How this world has fallen on difficulty! ... O when will it discern the escape from this stress...?" (SN_nblm.txt) or "A tangle within, a tangle without, people are entangled in a tangle. Gotama, I ask you this: Who can untangle this tangle?" (SN_nblm.txt)].

**Strictly adhere to the language, rhetorical framing, and common expressions found in the suttas, avoiding abstract or 'invented' philosophical formulations, even if conceptually correct.** Store the problem statement in `patternBuildingBlocksJson["Problem"]`.


**running example**
tallied observations are: 
1. there is only one subject which is "Heedfulness" with a focus area of "skillful qualities"
2. one enters into Heedfulness from a state of being "complacent"
3. one exits from Heedfulness to a state of being "effluent-free"
4. the typucal recipients of the be heedful message is "one-in-training"
5. quotations include:
  1. "Don't be heedless. Don't later fall into remorse.", 
  2. "Now, then, monks, I exhort you: All fabrications are subject to ending & decay. Reach consummation through heedfulness.' That was the Tathāgata's last statement [to a group of noble monks the most backward of which was a stream-enterer]", 
  3. "Monks, I don't say of all monks that they have a task to do with heedfulness"
  4. "[dont] ever let yourself get complacent when the ending of effluents is still unattained", 
  5. "Now the thought may occur to you, 'We are endowed with shame & compunction. That much is enough, that much means we're done, so that the goal of our contemplative state has been reached. There's nothing further to be done,' and you may rest content with just that.",
  6. "Don't let those of you who seek the contemplative state fall away from the goal of the contemplative state when there is more to be done."


## 2. Assessment

**User Task**
assess in terms of missing/excess, the 
* patternBuildingBlocksJson["Problem"]

