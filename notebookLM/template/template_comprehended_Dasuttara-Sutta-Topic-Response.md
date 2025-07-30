**NotebookLM Context**
In the **Dasuttara Sutta (DN 34)**, Venerable Sāriputta delivers a masterful (albeit broad & brief) coverage of dhammas using a **"progressing by tens" framework**. The framework spans 10 incremental sets starting from sets of 1, then sets of 2, and so on until the sets of 10. Each numbered set covers 10 categories (eg. "helpful", "developed", "comprehended", etc).

**This very document is a template** that is used for the purpose of instructing NotebookLM on tasks that are related to a particular numbered set and category combination referred to as a chapter. 

Herein, represents a single chapter of a large body of work which details a particular dhamma topic of which Venerable Sāriputta said in brief. This body of work will be studied by determined & committed practitioners that intend to practice well, straightforwardly, methodically and masterfully. 

**This specific chapter**, and the respective **framework reference** is **determined via the user specified arguments** in the initiating query/prompt:
    eg. 
    Consider the following query/prompt user arguments:
        1. **user-specified-progression-index**=5
        2. **user-specified-category**="helpful"
        3. **user-specified-ref**="Five factors for exertion"

    Thus using (5 & "helpful") as the key, it stands to reason that the query/prompt is referring to the following passage (from Dasuttara Sutta DN 34):

    > 'Which five dhammas are very helpful? Five factors for exertion: There is the case, friends, where a monk has conviction, is convinced of the Tathāgata's awakening: 'Indeed, the Blessed One is worthy & rightly self-awakened, consummate in clear-knowing & conduct, well-gone, an expert with regard to the cosmos, unexcelled trainer of people fit to be tamed, teacher of devas & human beings, awakened, blessed.' ...


**NotebookLM Resources**
There are three types of sources that are part of this NotebookLM notebook: 
1. core source, 
2. guide sources & 
3. templates. 

The non-plantuml guide sources are indexed and aggregated content which was derived from the core sources. Their purpose is for NotebookLM to use them as quick-references as they are NOT comprehensive and NotebookLM will still need to search beyond these guides. Thus, using these guides, seek out the actual citation from the core sources. Hence, 
* Draw citations from the following core sources:
    AN_nblm.txt  DN_nblm.txt  KN_Dhp_nblm.txt  KN_Iti_nblm.txt  KN_Khp_nblm.txt  KN_StNp_nblm.txt  KN_Thag_nblm.txt  KN_Thig_nblm.txt  KN_Ud_nblm.txt  MN_nblm.txt  SN_nblm.txt
* Leverage indexed and aggregated keys from guide sources:
    guide_antidotes.md             guide_core_concepts.md                     guide_mental_qualites.md              guide_practices.md
    guide_causation_expression.md  guide_dhamma_outcomes_and_consequences.md  guide_path_stages_and_progressions.md 
* Apply diagram modeling guidelines from plantuml guide source:
    guide_plantuml_state_diagram.md     guide_plantuml_class_diagram.md


NotebookLM Task:
    **Determine the scope of work** for this chapter by:
        * Consider the following exception:
             if (<user-specified-progression-index> == 2 and <user-specified-ref> = "Mindfulness & alertness") then 
                <user-specified-progression-index> = 1  // treat as a singleton concept
                <chapter-progression-text> = "Mindfulness & alertness"
                <chapter-progression-scope-array> = ["Mindfulness & alertness"]
             endif
        * Calculate value of <chapter-progression-text>
            * Using <user-specified-progression-index> and <user-specified-category> to query the text in DN 34:
                <chapter-progression-text> = resultant-query-text  
                if (<user-specified-ref> is not found in <chapter-progression-text>) then 
                    throw UserSpecifiedRefMismatchError
                endif
        * Calculate value of <chapter-progression-scope-array>
            * Parse <chapter-progression-text> into an array of strings
                <chapter-progression-scope-array> = resultant-array-of-strings
                if (<user-specified-progression-index> !== <chapter-progression-scope-array>.len()) then
                    throw UserSpecifiedProgressionIndexMismatchError
                endif


**PART-A: Body Content**  
NotebookLM Task:
    * Produce a comprehensive analysis & insights on <chapter-progression-scope-array>
        1. Use sub-headings & lists over large body paragraphs to make the content easier to navigate and consume
        2. Provide "no more than two citations" per key point
        3. Use same vocabulary as found in sources due to semantic significance (eg. do not refer to Triple Gem as Jewels)
        4. Draw all citations from the following core sources only
        5. Do not cite any reference to guide or template sources
        6. The structure of this chapter has been designed to give the practitioner a valuable map that answers what, why, when, where & how.  Avoid overlap of content where possible between sections.
        7. The generated content in PART-A::Sections 3 & 4 should be a key contributor to shaping the State diagram in PART-B.

---
Use the following structure for PART-A response:
# <user-specified-progression-index> > <user-specified-category> > <user-specified-ref>

## 1. Definition
NotebookLM Task:
    Answer 'the what' question by:
        * Providing a comprehensive definition of <chapter-progression-text> in the context of transitioning from direct knowledge to abandonment
        * Letting the practitioner discern the inherent nature of the quality to be fully comprehended

## 2. Considerations
NotebookLM Task:
    Answer 'the why' question by:
        * with respect to <chapter-progression-text>:
            * Explain the significance of **fully comprehending** these dhammas for the purpose of **ending suffering and attaining liberation**.
            * Elucidate the transformative benefits and the sequence of refined states that result from such deep comprehension, countering ignorance, attachment, and the tendency to identify with inconstant phenomena 
            * Let the practitioner discern the profound impact and enduring advantages gained by consistently comprehending the nature of reality

    * Consider using guide_mental_qualites.md
    * Consider using guide_dhamma_outcomes_and_consequences.md
    * Consider using guide_path_stages_and_progressions.md

## 3. Causation
NotebookLM Task:
    Answer 'the when' question by:
        * In a structured list(s) format (for each <element> in <chapter-progression-scope-array>): 
            * List all requisite and result pairs for <element> identifying how comprehension unfolds and how it is supported by, or enables, other conditions and progressive states
            * List other unskillful mental qualities that co-arise with <element> in a defiled mind
            * List other related causal factors, practices, or preceding states that are essential for the initiation and effective progression of comprehension
        * Letting the practitioner discern the opportune moments and the necessary enabling conditions for effective reflection, investigation and contemplation on the nature of <user-specified-ref>

    * Consider using guide_causation_expression.md
    * Consider using guide_antidotes.md
    * Consider using guide_path_stages_and_progressions.md
    * Consider using guide_practices.md

## 4. Complications
NotebookLM Task:
    Answer 'the where' question by:
        * with respect to <chapter-progression-text>:
            * Describe what the allure, drawbacks and escape are, and where they are to be seen
            * Describe where in the training and/or in momentary phenomena, the challenges, hindrances, or unskillful states impede or undermine the comprehension of <chapter-progression-text>
            * Explain how the lack of comprehension in <user-specified-ref> perpetuates unfavorable outcomes and suffering, addressing the practitioner's difficulty in reconciling training and momentary phenomena
        * Letting the practitioner discern the specific pitfalls and resistances encountered during the comprehension process of <user-specified-ref>

    * Consider using guide_dhamma_outcomes_and_consequences.md
    * Consider using guide_antidotes.md
    * Consider using guide_path_stages_and_progressions.md

## 5. How To
NotebookLM Task:
    Answer 'the how' question by:
        * Providing practical advice and methods for initiating, sustaining, and deepening the process of comprehending <user-specified-ref>, guiding the practitioner towards becoming a 'masterful practitioner'. This section should go beyond simply listing requisites mentioned in Section 3. 
        * Guiding the practitioner towards becoming a 'masterful practitioner' by effectively incorporating the comprehension of <user-specified-ref> into their ongoing training

    * Consider using guide_antidotes.md
    * Consider using guide_practices.md
    * Consider using guide_mental_qualites.md

## 6. Similes
NotebookLM Task:
    Answer 'is there a helpful analogy' question by:
        * In a structured list(s) format (for each <element> in <chapter-progression-scope-array>): 
            * Describe the relevant simile that illustrate the process or outcome of comprehending <element>
            * Explain how this simile helps the practitioner discern the dynamic nature, progressive stages, or transformative potential of comprehending <element>

---

Use the following structure for PART-B response:

**PART-B: PlantUML Diagrams**  
NotebookLM Common Diagram Requirements:
1. Use the generated content from PART-A of this response as the primary source for generating diagrams
2. Do not add any notes to the diagrams as they are companions to PART-A text
3. Do not add or append any citation references with block_id's within "[]" to elements or links
4. When generating the diagrams, consider:
    * element_threshold = 9; links_threshold = 18
    * if (number_of_elements > element_threshold) or number_of_links > links_threshold) then create another diagram  
    * Cognitive Load: Too many elements overwhelm the human brain's ability to process information simultaneously
    * Visual Clutter: A large number of nodes makes the diagram visually cluttered and difficult to parse quickly
    * Focus: It becomes hard to identify the main purpose or key interactions when there are too many distractions 
5. If generating multiple diagrams, consider:
    * creating a high-level contextual diagram
    * creating a sub-diagram (ie. the orchestration of a composite state or a class)
    * creating a view/focus specific diagrams

## 7. Behavioural Model
NotebookLM Task:
    * Generate 1 or more PlantUML state diagram(s) to represent the progressive stages of comprehending <user-specified-ref>. Focus on key steps such as **identification of phenomena as inconstant, stressful, and not-self, the process of disenchantment and dispassion, and the resultant release**. Emphasize the iterative refinement and the ultimate cessation of suffering as described in PART-A. 
        * Let the practitioner discern the operational flow of <user-specified-ref> in a behavioral context, showing how practice leads to liberation.

        * Consider using guide_plantuml_state_diagram.md
        * Consider using guide_mental_qualites.md
        * Consider using guide_path_stages_and_progressions.md
        * Consider using guide_antidotes.md
        * Consider using guide_practices.md

## 8. Structural Model
NotebookLM Task:
    * Generate 1 or more PlantUML class diagram(s) that identifies the main qualities, faculties, or mental states involved in the comprehension of <user-specified-ref>. Show how they relate, support, or combine to form a developed practitioner. Illustrate key attributes that characterize the comprehended state and how different aspects of comprehension interlink. 
        * Let the practitioner discern how <user-specified-ref> operates in a conceptual/structural context, revealing the relationships and composition of comprehended states

        * Consider using guide_plantuml_class_diagram.md
        * Consider using guide_mental_qualites.md
        * Consider using guide_path_stages_and_progressions.md
        * Consider using guide_antidotes.md
        * Consider using guide_practices.md
