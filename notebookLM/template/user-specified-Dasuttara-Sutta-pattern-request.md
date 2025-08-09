in DN 34 there are 100 dhammas presented in a progressing by tens framework. these dhammas are highly tailored for attaining unbinding, putting an end to suffering & stress, and releasing from all ties. these 100 dhammas are in fact patterns, that is they are solutions to known problems that practitioners face whilst in training. 

this project is a dhamma practitioner's pattern language and the response to this prompt/query represents one pattern in that language which will be saved in markdown format in the following structure:
    ./ones/helpful.md
    ./ones/developed.md
    ./ones/comprehended.md
    ./ones/abandoned.md
    ./ones/decline.md
    ./ones/distinction.md
    ./ones/penetrate.md
    ./ones/made-to-arise.md
    ./ones/directly-known.md
    ./ones/realised.md
    ./twos/helpful.md
    ...

User Tasks:
    * Submit the pattern generation request prompt/query to NotebookLM by specifying the following arguments:
        1. <user-specified-progression-index-category-question>
        2. <user-specified-pattern-name>
    * Example:
        Using the source "user-specified-Dasuttara-Sutta-pattern-request.md" as the instructions for this prompt's response, generate the pattern using the following user arguments:
        1. user-specified-progression-index-category-question="Which one dhamma is very helpful?"
        2. user-specified-pattern-name="Heedfulness"
    

NotebookLM Task:
    * with respect to the statement:
        * <user-specified-progression-index-category-question> <nblm-progression-index-category-full-answer>
        
    * provide a comprehensive and analytical response to the above statement by:
        0. using the <user-specified-progression-index-category-question> (eg. "Which one dhamma is very helpful?") argument, seek for the text in DN 34 to find Venerable Sāriputta's answer and store it in <nblm-progression-index-category-full-answer> variable. Thus, the statement/scope for this query/prompt is now the concatenation of the strings <user-specified-progression-index-category-question> and <nblm-progression-index-category-full-answer>
        1. use the source "A Pattern Language for Pattern Writing" as the specification for documenting the pattern response to the statement
        2. take particular note of the patterns "Mandatory Elements Present" and "Optional Elements When Helpful" patterns for shaping the response whilst also taking advantage of the rich sources
        3. with reference to "Solution|Noun Phrase Name" apply the <user-specified-pattern-name> as the pattern name (eg. "Ten perceptions")
        4. The pattern's "Problem" statement is not same as the question posed by Venerable Sāriputta. Rather the root problem must be discerned (eg. solution:"Heedfulness with regard to skillful qualities"; problem:"How do you overcome stagnation and complacency in the training to complete the task of the holylife?")
        5. for the "Related Patterns" section, only make reference to other dhammas from the DN 34 100 progessing by tens framework to make the pattern language self-contained. For each related pattern specify the name, link and a brief explanation of the relationship to this pattern
            eg. [Appropriate attention](./ones/distinction.md): Directly aids heedfulness by focusing on skillful qualities and leading to distinction. Its opposite, Inappropriate attention, leads to decline
        6. the "Solution" section must include the causes and conditions related to the solution
        7. the "Solution" section must illustrate the step-by-step process in line with cause and effect as a plantuml activity diagram. Use the source "guide_plantuml_activity_diagram.md" for a synatax and semantics guide
        8. the "Solution" section must illustrate the concepts and their relationships as a plantuml class diagram of the problem and the solution space. Use the source "guide_plantuml_class_diagram.md" for a synatax and semantics guide
        9. the "Resulting Context" section must illustrate the causal chain(s) that follows on from this solution as a plantuml activity diagram. Use the source "guide_plantuml_activity_diagram.md" for a synatax and semantics guide
        10. the  "Resulting Context" section may also illustrate a plantuml state diagram of the key object's from/to state(s) change and the capability (shown as a transitions) that are now applicable in this new state(s). Use the source "guide_plantuml_state_diagram.md" for a synatax and semantics guide
        11. for the "Code Samples" section, use plantuml models instead of code examples unless typescript code provides a better expression
        12. add a "Similes" section to the pattern response that lists the most relevant similes and explain how each simile is to be understood with regards to this solution

