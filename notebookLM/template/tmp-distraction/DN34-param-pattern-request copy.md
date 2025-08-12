**NotebookLM Context**:
* **Background**: in DN 34 there are 100 Dhammas presented in a "progressing by tens" framework. these Dhammas are highly tailored for attaining unbinding, putting an end to suffering & stress, and releasing from all ties. these 100 Dhammas are in fact patterns, that is, they are well established solutions to known problems that practitioners face whilst in training. this project is a Dhamma practitioner's pattern language of the "progressing by tens" framework

* **Purpose**: to generate one pattern in the pattern language which will be user saved in markdown format. this source document is a parameterised template with instructions for generating one of those Dhammas patterns. the parameters are defined in the "User Tasks" section below

* **File maming & directory structure**: the "progressing by tens" framework uses an index (ie. starting from 'ones' up to 'tens') and a category (ie. starting from 'helpful' to 'realised') classification scheme as its organisational structure. this project will thus persist each pattern using the category as the filename and index as the directory structure as follows:
    // individual category files (ie. patterns) in index directories
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
    // index catalogs
    ./catalog/1s-index.md
    ./catalog/2s-index.md
    ...
    // catagory catalogs
    ./catalog/helpful-index.md
    ./catalog/developed-index.md
    ...
    // user/practitioner catalogs
    ./catalog/user-conviction-dhamma-follower-index.md
    ./catalog/user-stream-enterer-index.md
    ./catalog/user-once-returner-index.md
    ./catalog/user-non-returner-index.md

* **Pattern names**: Shortened names for all 100 patterns are documented in the source "DN34-param-pattern-request-config.json.txt". this is a json file with each category represented in lower with its corresponding array of 10 pattern names (eg. json["pattern-names"]["developed"][7] is 'Noble eightfold path' as the intended pattern name). 


User Tasks:
* Submit the pattern generation request query to NotebookLM by specifying the following parameters:
    1. <paramIndexCategoryQuestion>: string
        This must be an exact index/catagory match as found in the DN 34 "progressing by tens" framework
    3. <paramIndexValue>: number [1-10]
        This is the numeric value of the index in reference to the question
    5. <paramCategoryOrder>: number [0-9]
        This is the zero based numeric value of the category in reference to the question 

* Example User Query:
    Using the source "param-DN34-pattern-request.md" as the template & instructions for this query's response, generate the pattern using the following user parameters:
    1. paramIndexCategoryQuestion="Which one Dhamma is very helpful?"
    2. paramIndexValue=1
    3. paramCategoryOrder=0
    

NotebookLM Task:
* using the <paramIndexCategoryQuestion> parameter, seek for the text in DN 34 to find Venerable Sāriputta's full answer and store it in the <varIndexCategoryFullAnswer> variable. Thus, the specific user query is now:
    * generate the pattern document and provide a comprehensive and analytical response to:
        * <paramIndexCategoryQuestion> <varIndexCategoryFullAnswer>

    * open the source "DN34-param-pattern-request-config.json.txt" and parse it into a JSON <paramConfigJson> object variable
    * assign <paramConfigJson>["catagory-filenames"][paramCategoryOrder] to the <varCatagoryFilename> variable
    * assign <paramConfigJson>["catagory-breadcrumb-labels"][paramCategoryOrder] to the <varCatagoryBreadcrumbLabel> variable
    * assign <paramConfigJson>["index-breadcrumb-labels"][paramIndexValue-1] to the <varIndexBreadcrumbLabel> variable
    * assign <paramConfigJson>["pattern-names"][varCatagoryFilename][paramIndexValue-1] to the <varPatternName> variable

    * use the template below for the content generation honouring the specific NotebookLM tasks for each respective section of the pattern. This pattern is modeled from the source "A Pattern Language for Pattern Writing" which serves as a reference for further details of the documentaiton approach
    * some sections of the template below provide examples documented in HTML comments as a guide for NotebookLM


    * Response Requirements:

        6. for the "Related Patterns" section, only make reference to other Dhammas from the DN 34 100 progessing by tens framework to make the pattern language self-contained. for each related pattern specify the name, link and a brief explanation of the relationship to this pattern
            eg. [Appropriate attention](./ones/distinction.md): Directly aids heedfulness by focusing on skillful qualities and leading to distinction. Its opposite, Inappropriate attention, leads to decline

        9. the "Solution" section must illustrate the concepts and their relationships as a plantuml class diagram of the problem and the solution space. title the diagram as <varPatternName> concepts & relationships. use the source "guide_plantuml_class_diagram.md" for a synatax and semantics guide
        10. the "Resulting Context" section must illustrate the causal chain(s) that follows on from this solution as a plantuml activity diagram. title the diagram as <varPatternName> causation. use the source "guide_plantuml_activity_diagram.md" for a synatax and semantics guide
        11. the  "Resulting Context" section may also illustrate a plantuml state diagram of the key object's from/to state(s) change and the capability (shown as a transitions) that are now applicable in this new state(s). title the diagram as <varPatternName> state transitions. use the source "guide_plantuml_state_diagram.md" for a synatax and semantics guide
        12. rename the "Code Samples" section to "Example" and identify and document an actual case study of an individual from the sources that best applied this pattern (eg. Venerable Citta Hatthisārīputta on re-ordaining became heedful and reached the goal of unbinding). provide a brief summary of the case and illustrate using a plantuml sequence diagram for the object collaboration and sequencing. title the diagram as <varPatternName> example. 
        13. add a "Similes" section to the pattern response that lists the most relevant similes and explain how each simile is to be understood with regards to this solution

    * Deliver the response as a multi-part payload. PART-A must include the complete documented pattern. PART-B must include all plantuml diagrams for all PART-A sections

---- BEGIN PART-A GENERATED OUTPUT ----
NotebookLM Task:
* inject the parameter & variable values into the breadcrumb expression below:
<!-- eg.
[ones](../catalog/1s-index.md) > [Dhammas that a very helpful](../catalog/1.helpful-index.md) -->
[${varIndexBreadcrumbLabel}](../catalog/${paramIndexValue}s-index.md) > [${varCatagoryBreadcrumbLabel}](../catalog/${varCatagoryFilename}-index.md)

# Pattern: ${varPatternName}

## Problem:
NotebookLM Task:
* This is represents the specific problem that needs to be solved. Ensure that the problem is kept separate from the constraints of the solution.
* There is a balance between being too specific and being to generic in terms of the problem description. ideally you want to enable the practitioner to see that on some occasions there are multiple solutions to a given problem (evident in catalogs) which are represented as different patterns delineated by the forces that the practitioner faces (eg. "how should you travel between A & B?", solutions: 1. travel optimised by time, 2, travel optimised by distance)
* the pattern's "Problem" statement is not same as the question posed by Venerable Sāriputta. Rather the root problem must be discerned from the solution itself








---- END PART-A GENERATED OUTPUT ----
