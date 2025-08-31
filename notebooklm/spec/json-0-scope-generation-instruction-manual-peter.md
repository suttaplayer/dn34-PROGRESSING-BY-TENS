### JSON Scope Generation Instruction Manual For NotebookLM

This manual is written for and to be executed by NotebookLM. It must be fit for NotebookLM's use. This manual must routinely be assessed by NotebookLM for ambiguity, inconsistencies and errors which present as obstacles to the pattern generation.

#### Pre-conditions
The initiating user-query must specify a `UserPatternRequestJson` object of type `UserPatternRequestJson` [pattern-API.ts.txt, 541].
The following are key abstractions from source "pattern-API.ts.txt" that are relevant to the "Scope" work task: `CategoryKey`, `TopicJson`, `PractitionerKey`, `SubjectJson`, `ScopeJson`, `DeterminantQuotationString` [pattern-API.ts.txt, 522-528, 535].

**running example**
Note, `userDirectExperience` is an optional field that the user may supply.

#### Post-conditions
On completion of this work task the `PatternResponseJson` object's `buildingBlocks` & `quotationSheet` "Scope" attributes will have been appropriately updated in response to the user request [pattern-API.ts.txt, 538].

**running example**

#### Background
Scope is the initial work task and it sets the context for generating the rest of the pattern building blocks [json-0-scope-generation-instruction-manual.md, 494].
The class diagram above highlights how the scope via `SubjectJson` will later play a role in:

1.  **The pattern's context**: Patterns are solutions to problems in a given context. That context also includes "who" (i.e., the type of practitioners) this solution is applicable for. Therefore, it is crucial that NotebookLM identifies the appropriate type of practitioner for each subject. Note, the pattern's (as opposed to the subject) target practitioner is the union set of the subject practitioners [json-0-scope-generation-instruction-manual.md, 495].
2.  **The pattern's causal-table with the subject at the centre**: A pattern's context, forces, solution & resulting context are all dependent on comprehending causation for each subject. Hence, generalised and appropriately abstracted subject names are critical for creating a bi-directional causal tree [json-0-scope-generation-instruction-manual.md, 495].
3.  **The pattern's solution state transition diagrams**: A pattern's solution can be expressed in many modes and permutations. This project aims to be as comprehensive as possible in assembling the critical knowledge for the practitioner from multiple perspectives. The behavioural aspects of a state transition diagram help the practitioner to see how the practice progresses upon state transitions as opposed to a focus on processes, structures and events [json-0-scope-generation-instruction-manual.md, 495].

#### Orchestration
##### 1. Assign the Pattern Name
All pattern names for the "progressing by tens" framework are found in source "pbt-catalog.json.txt" [json-0-scope-generation-instruction-manual.md, 496]. The `userPatternRequestJson`'s "progressionIndex" & "categoryKey" property values are the keys for establishing the PBT context [json-0-scope-generation-instruction-manual.md, 496].
Store the `patternName` from the `config["patternName"][categoryKey][progressionIndex-1]` [pbt-utils.ts.txt, 562; pattern-API.ts.txt, 545].

**running example**

##### 2. Parsing the Answer Excerpt
All answer excerpts for the "progressing by tens" framework are found in source "pbt-catalog.json.txt" [json-0-scope-generation-instruction-manual.md, 496]. The `userPatternRequestJson`'s "progressionIndex" & "categoryKey" property values are the keys for establishing the PBT context. Hence the `answerExcerpt` is accessed from the `config["answerExcerpt"][categoryKey][progressionIndex-1]` [json-0-scope-generation-instruction-manual.md, 496; pbt-utils.ts.txt, 562].

The `answerExcerpt` must be parsed by:
1.  Identifying a maximum of `progressionIndex` number of subjects in the `answerExcerpt`.
2.  Identifying optional `focusArea(s)` associated with that subject.

NotebookLM must:
1.  **`Command:parse`** the `answerExcerpt` into `SubjectJson` objects [json-0-scope-generation-instruction-manual.md, 497]. `focusArea` is optional and can remain undefined if not applicable. Assign `""`, `""` & `[]` for `enterFromState`, `exitToState` & `targetPractitioner` respectively [pattern-API.ts.txt, 525-526].

    **Internal JSON Request Object for `Command:parse` (Answer Excerpt Parsing):**
    ```json
    {
      "commandType": "structured_extraction",
      "parameters": {
        "textToParse": "<answerExcerpt_string>",
        "extractionTarget": "SubjectJson[]",
        "expectedFormat": "{ name: string, focusArea?: string[] }[]",
        "guidance": "Identify distinct subjects and their optional associated focus areas from the answer excerpt. If components within the answer excerpt have distinct and sequential requisite conditions, or lead to different immediate outcomes, parse them as separate SubjectJson objects. The maximum number of subjects to extract is defined by progressionIndex. Initially, enterFromState and exitToState should be empty strings, and targetPractitioner an empty array."
      }
    }
    ```

2.  **`Command:generalise & abstract`** the subject name if necessary. The subject name plays a role in the causal-table. If the name is too specific, the causal-table will be small and of little benefit (due to simplicity) for the remaining work tasks. However, if the name is over-generalised then the causal-table will be too large and again of little benefit (due to complexity) for the remaining work tasks [json-0-scope-generation-instruction-manual.md, 497].
    *   e.g., consider the subject: "people of integrity"
        1.  "people of integrity" has 77 references in 6 source files
        2.  "person of integrity" has 112 references in 7 source files
        3.  "admirable friend" 43 references in 8 source files
    *   Within the context of "Associating with people of integrity", these are all abstractions of the same concept. NotebookLM needs to ensure that it can subsequently match on the concept as opposed to the specific term for the benefit of down-stream work tasks [json-0-scope-generation-instruction-manual.md, 497].

Note, this parsing approach will typically work for the majority of the 100 topics. However, there are exceptions that NotebookLM will need to manage.
**Exceptional cases**
Consider the following case:
"Which three dhammas should be developed? Three concentrations: concentration with directed thought & evaluation, concentration without directed thought & with a modicum of evaluation, concentration without directed thought & evaluation."
This case can be parsed in two ways:
1.  Three subjects:
    1.  concentration with directed thought
    2.  concentration without directed thought & with a modicum of evaluation
    3.  concentration without directed thought & evaluation
2.  One subject with three focusAreas:
    1.  concentration
        1.  with directed thought
        2.  without directed thought & with a modicum of evaluation
        3.  without directed thought & evaluation

NotebookLM should choose the most appropriate approach. **If the components within an answer excerpt have distinct and sequential requisite conditions, or lead to different immediate outcomes, they should be parsed as separate `SubjectJson` objects** [json-0-scope-generation-instruction-manual.md, 499]. This ensures that the individual significance of each component is maintained, aligning with the example provided for the Jhanas and their unique pre-conditions ([subduing the hindrances] and [first-jhana] respectively) [json-0-scope-generation-instruction-manual.md, 499].
Note, in such a case where the user intends the other approach than what NotebookLM selected then they should inject this factor into the originating `userPatternRequestJson` object as such: `userPatternRequestJson.directExperience.Scope.factors` [pattern-API.ts.txt, 539].

Store the parsed subjects.

**running example**

##### 3. Determine Pattern Details
For each `subjIter` in `patternResponseJson.buildingBlocks.Scope.subject`:
1.  Determine the `enterFromState`.
2.  Determine the `exitToState`.
3.  Determine the `targetPractitioner`.

###### 3.1. Determine Enter From State
Dhamma practice is a training of the mind and more often than not, the states of significance are in relation to the mind's composite states [json-0-scope-generation-instruction-manual.md, 500].
The "progressing by tens" framework is all about the development of skillful qualities and the abandoning of unskillful qualities. Most qualities are internal mental qualities, but there are a few external qualities (e.g., admirable friendship, living in a civilised land, having done merit in the past etc.) [json-0-scope-generation-instruction-manual.md, 500].

Given that all skillful qualities converge and are rooted in heedfulness, it would reduce the value & quality of all the artifacts if they all had an `enterFromState` of "heedfulness". Therefore, NotebookLM is encouraged to look deeper at the "nearest branch" state (as opposed to root state) when identifying the `enterFromState` [json-0-scope-generation-instruction-manual.md, 501].

NotebookLM must:
1.  **`Command:search`** for quotations from the `["*_nblm.txt"]` sources [json-0-scope-generation-instruction-manual.md, 501]:
    *   On the subject and its associated `focusArea(s)`.
    *   Select 1 if possible (or more when chained together) that best quotes that substantiates the concluded `enterFromState`.
    *   The search query generation will dynamically construct `searchAttempts` from `subjIter.name` and `subjIter.focusArea` (if present). The final `searchExpr` will be `searchAttempts.join(" ")` [json-0-scope-generation-instruction-manual.md, 501].
    *   **The search context is with respect to mind states or external states** [json-0-scope-generation-instruction-manual.md, 501].
    *   **Internal `doesQuoteSubstantiate(quotes, "enterFromState")` check:** This internal check will determine if the retrieved `quotes` array contains sufficient and relevant information to infer a "nearest branch" `enterFromState`. This involves internal `text_analysis` to identify conditions, prerequisites, or preceding states explicitly or implicitly linked to the `subjIter.name` or `subjIter.focusArea`. The process will iterate by adjusting `searchAttempts` if the initial search does not yield substantiating quotes.

    **Internal JSON Request Object for `Command:search` (for `enterFromState`):**
    ```json
    {
      "commandType": "information_retrieval",
      "parameters": {
        "query": "<dynamic_search_expression_from_subject_name_and_focus_area>",
        "sources": ["AN_nblm.txt", "DN_nblm.txt", "KN_Dhp_nblm.txt", "KN_Iti_nblm.txt", "KN_Khp_nblm.txt", "KN_StNp_nblm.txt", "KN_Thag_nblm.txt", "KN_Thig_nblm.txt", "KN_Ud_nblm.txt", "MN_nblm.txt", "SN_nblm.txt"],
        "contextHint": "mind states or external states",
        "resultType": "DeterminantQuotationString[]"
      }
    }
    ```

2.  **`Command:parse`** the selected quotation(s) to extract the `enter-from-state` as text and assign it to the subject's "enterFromState" property [json-0-scope-generation-instruction-manual.md, 502].

    **Internal JSON Request Object for `Command:parse` (for `enterFromState` extraction):**
    ```json
    {
      "commandType": "structured_extraction",
      "parameters": {
        "textToParse": "<quotes_array_from_Command:search>",
        "extractionTarget": "enterFromState",
        "expectedFormat": "string",
        "guidance": "Extract the 'nearest branch' condition or state that precedes or leads to the subject. Prioritize a specific preceding condition over general states like 'heedfulness' if a more direct link is present, as per manual's instruction 'look deeper at the \"nearest branch\" state (as opposed to root state)'."
      }
    }
    ```

3.  **`Command:store`** the quotation in the quotation sheet for "Scope" [json-0-scope-generation-instruction-manual.md, 502].

**running example**

###### 3.2. Determine Exit To State
Similar to the enter from state, the ending of the effluents (labeled as "effluent-free") is a frequent candidate for the exit to state. Again, look more deeply at where there is a natural baton change to another skillful quality when identifying the `exitToState` [json-0-scope-generation-instruction-manual.md, 502].

NotebookLM must:
1.  **`Command:search`** for quotations from the `["*_nblm.txt"]` sources [json-0-scope-generation-instruction-manual.md, 503]:
    *   On the subject and its associated `focusArea(s)`.
    *   Select 1 if possible (or more when chained together) that best quotes that substantiates the concluded `exitToState`.
    *   The search query generation will dynamically construct `searchAttempts` from `subjIter.name` and `subjIter.focusArea` (if present). The final `searchExpr` will be `searchAttempts.join(" ")` [json-0-scope-generation-instruction-manual.md, 503].
    *   **The search context is with respect to mind states or external states** [json-0-scope-generation-instruction-manual.md, 503].
    *   **Internal `doesQuoteSubstantiate(quotes, "exitToState")` check:** This internal check will determine if the retrieved `quotes` array contains sufficient and relevant information to infer a "natural baton change" `exitToState`. This involves internal `text_analysis` to identify outcomes, subsequent states, or results explicitly or implicitly linked to the `subjIter.name` or `subjIter.focusArea`. The process will iterate by adjusting `searchAttempts` if the initial search does not yield substantiating quotes.

    **Internal JSON Request Object for `Command:search` (for `exitToState`):**
    ```json
    {
      "commandType": "information_retrieval",
      "parameters": {
        "query": "<dynamic_search_expression_from_subject_name_and_focus_area>",
        "sources": ["AN_nblm.txt", "DN_nblm.txt", "KN_Dhp_nblm.txt", "KN_Iti_nblm.txt", "KN_Khp_nblm.txt", "KN_StNp_nblm.txt", "KN_Thag_nblm.txt", "KN_Thig_nblm.txt", "KN_Ud_nblm.txt", "MN_nblm.txt", "SN_nblm.txt"],
        "contextHint": "mind states or external states",
        "resultType": "DeterminantQuotationString[]"
      }
    }
    ```

2.  **`Command:parse`** the selected quotation(s) to extract the `exit-to-state` as text and assign it to the subject's "exitToState" property [json-0-scope-generation-instruction-manual.md, 504].

    **Internal JSON Request Object for `Command:parse` (for `exitToState` extraction):**
    ```json
    {
      "commandType": "structured_extraction",
      "parameters": {
        "textToParse": "<quotes_array_from_Command:search>",
        "extractionTarget": "exitToState",
        "expectedFormat": "string",
        "guidance": "Extract the ending state or 'natural baton change' to another skillful quality. Prioritize a specific outcome over general states like 'ending of the effluents' if a more direct transition is evident, as per manual's instruction 'look more deeply at where there is a natural baton change to another skillful quality'."
      }
    }
    ```

3.  **`Command:store`** the quotation in the quotation sheet for "Scope" [json-0-scope-generation-instruction-manual.md, 504].

**running example**

###### 3.3. Determine Target Practitioner
The "progressing by tens" framework covers a spectrum of topics. Some are suited for conviction and Dhamma followers, whilst others are extremely advanced practices that are suited for non-returners. These patterns are like medical prescriptions; thus, if a practitioner doesn't suffer a given context, then they shouldn't follow the solution [json-0-scope-generation-instruction-manual.md, 504].

NotebookLM must:
1.  **`Command:search`** for quotations from the `["*_nblm.txt"]` sources [json-0-scope-generation-instruction-manual.md, 505]:
    *   On the subject and its associated `focusArea(s)`.
    *   Select 1 if possible (or more when chained together) that best quotes that substantiates the concluded `targetPractitioner`.
    *   The search query generation will dynamically construct `searchAttempts` from `subjIter.name` and `subjIter.focusArea` (if present). The final `searchExpr` will be `searchAttempts.join(" ")` [json-0-scope-generation-instruction-manual.md, 505].
    *   **The search context is with respect to individuals in `PractitionerKey`** [json-0-scope-generation-instruction-manual.md, 505].
    *   **Internal `doesQuoteSubstantiate(quotes, "targetPractitioner")` check:** This internal check will determine if the retrieved `quotes` array contains sufficient and relevant information to infer the `targetPractitioner`. This involves internal `text_analysis` to identify mentioned practitioner types (e.g., "stream-enterer," "once-returner," "non-returner," "conviction-dhamma-follower") in relation to the subject or practice. The process will iterate by adjusting `searchAttempts` if the initial search does not yield substantiating quotes.

    **Internal JSON Request Object for `Command:search` (for `targetPractitioner`):**
    ```json
    {
      "commandType": "information_retrieval",
      "parameters": {
        "query": "<dynamic_search_expression_from_subject_name_and_focus_area>",
        "sources": ["AN_nblm.txt", "DN_nblm.txt", "KN_Dhp_nblm.txt", "KN_Iti_nblm.txt", "KN_Khp_nblm.txt", "KN_StNp_nblm.txt", "KN_Thag_nblm.txt", "KN_Thig_nblm.txt", "KN_Ud_nblm.txt", "MN_nblm.txt", "SN_nblm.txt"],
        "contextHint": "individuals in PractitionerKey",
        "resultType": "DeterminantQuotationString[]"
      }
    }
    ```

2.  **`Command:parse`** the selected quotation(s) to extract the `target-practitioner` as an array of `PractitionerKey` and assign it to the subject's "targetPractitioner" property [json-0-scope-generation-instruction-manual.md, 506].

    **Internal JSON Request Object for `Command:parse` (for `targetPractitioner` extraction):**
    ```json
    {
      "commandType": "structured_extraction",
      "parameters": {
        "textToParse": "<quotes_array_from_Command:search>",
        "extractionTarget": "targetPractitioner",
        "expectedFormat": "PractitionerKey[]",
        "guidance": "Identify all relevant practitioner types from the `PractitionerKey` enumeration ('conviction-dhamma-follower', 'stream-enterer', 'once-returner', 'non-returner') that are explicitly or implicitly mentioned as suitable for the subject. Consider the 'medical prescription' analogy; if a practice is too advanced or basic, narrow the target practitioner accordingly."
      }
    }
    ```

3.  **`Command:store`** the quotation in the quotation sheet for "Scope" [json-0-scope-generation-instruction-manual.md, 506].

**running example**

##### 4. Finalise By Removing Duplicate Quotations
**running example**
