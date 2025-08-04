NotebookLM Notes:
    * Response Context & Topic:
        In Dasuttara Sutta (DN 34) it is stated 
        > "Which one dhamma is very helpful? Heedfulness with regard to skillful qualities"
    * Initiating query/prompt:
        <!-- 
        ```notebooklm-prompt
        Using the source "helpful_template.md" as a template and instructions, generate the content for all sections from 1-8
        ``` 
        -->
    * Resource:
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
        * Apply UML diagram modeling guidelines from plantuml guide source:
            guide_plantuml_state_diagram.md     guide_plantuml_class_diagram.md
    * General requirements:
        1. Use sub-headings & lists over large body paragraphs to make the content easier to navigate and consume
        2. Provide "no more than two citations" per key point
        3. Use same vocabulary as found in sources due to semantic significance (eg. do not refer to Triple Gem as Jewels, use inconstant over impermanent)
        4. Draw all citations from the following core sources only
        5. Do not cite any reference to guide or template sources
        6. The structure of this chapter has been designed to give the practitioner a valuable map that answers what, why, when, where &how


## 1. Definition

NotebookLM Task:
    * Explain heedfulness with regard to skillful qualities.
    * Explain why heedfulness is a dhamma that cannot be developed, but yet is critically helpful.
    


## 2. Considerations

NotebookLM Task:
    * With reference to the following quotes:
        > But as for monks in higher training, who have not yet reached their hearts' goal, who still aspire for the unexcelled freedom from bondage: I say of them that they have a task to do with heedfulness. 

        > Then the Blessed One addressed the monks, 'Now, then, monks, I exhort you: All fabrications are subject to ending & decay. Reach consummation through heedfulness.' That was the Tathāgata's last statement.
    * Explain in reference to the above quotes, why heedfulness is required and what role it plays at the various progression levels from uninstructed, stream-enterer, once-returner & non-returner


## 3. Causation

NotebookLM Task:
    * User assertions (note uml terminology used):
        1. Heedfulness is an associated class born out of a qualified association between Conviction and "Sense of Shame". The qualifier in this instance is an admirable-friends-voice who establishes a training standard
        2. Heedfulness is an associated class also born out of a qualified association between Conviction and "Sense of Compunction". The qualifier in this instance is true-dhamma which too establishes a training standard
        3. Conviction thus supported by Heedfulness leads to "Appropriate Attention". 
        4. The level of Appropriate Attention is directly related to the quality level of both the admirable-friends-voice and true-dhamma that one has penetrated which Heedfulness stands on 
    * Invariant:
        if NotebookLM rejects the user assertion, report INVALID_CAUSATION_ASSERTION_ERROR and abort 
    * Explain the causation with respect to heedfulness in reference to the above user assertions with supporting citations


## 4. Complications

NotebookLM Task:
    * User assertions:
        1. retention of the repetitive internal voice of an admirable friend has a direct relationship on heedfulness
        2. retention of the repetitive true-dhamma has a direct relationship on heedfulness
        3. when retention of the qualities diminishes or is lost, then complacency settles in ultimately resulting in a lack of conviction and inappropriate attention
        4, then because all skillful qualities are rooted in heedfulness, one's training (underpinned by skillful qualities) collapses
    * Invariant:
        if NotebookLM rejects the user assertion, report INVALID_COMPLICATIONS_ASSERTION_ERROR and abort 
    * Explain the complications with respect to heedfulness in reference to the above user assertions with supporting citations


## 5. How To
### Growth
NotebookLM Task:
    * User assertions:
        1. in order to develop/grow heedfuleness one must first identify an admirable friendship. note, admirable friendship is the whole of the holy life
        * repeat until effluent-free
            1. one must (re)visit and grow close
            2. lend an ear and hear the true dhamma 
            3. remember the true dhamma and penetrate the meaning
            4. come to an agreement through pondering
            5. establish a sense of shame of failing the admirable friendship
            6. establish a sense of compunction of dismissing true-dhamma
    * Invariant:
        if NotebookLM rejects the user assertion, report INVALID_HOWTO_GROW_ASSERTION_ERROR and abort 
    * Explain the growth of heedfulness in reference to the above user assertions with supporting citations

### Practices
NotebookLM Task:
    * With reference to:
        *  MN 39; contemplative's practices from "PURITY OF CONDUCT" to "THE THREE KNOWLEDGES"
    * Explain the touchpoints that heedfulness has with each of the above practices

### Stages
NotebookLM Task:
    * With reference to:
        *  MN 24; stages from "purity in terms of virtue" to "total unbinding"
    * Explain the touchpoints that heedfulness has with each of the above stages


## 6. Simile
NotebookLM Task:
    list all relevant similes related to heedfulness:
        * Describing the simile
        * Explain how it can be understood
        * Ensure that "The Elephant's Footprint" is the first in order of importance


## 7. PlantUML Behavioural Model

NotebookLM Task:
    * Generate a plantuml state diagram using only the information generated in this document. The purpose of the diagram is to help the practitioner understand the practice workflow and where heedfulness fits into it

    * Consider using guide_plantuml_state_diagram.md

### 8. PlantUML Structural Model

NotebookLM Task:
    * Generate a plantuml class diagram using only the information generated in this document. The purpose of the diagram is to help the practitioner understand the relationships between the concepts that are relevant to heedfulness

    * Consider using guide_plantuml_state_diagram.md