**NotebookLM Context**:
* **Background**: in DN 34 there are 100 Dhammas presented in a "progressing by tens" framework. these Dhammas are highly tailored for attaining unbinding, putting an end to suffering & stress, and releasing from all ties. these 100 Dhammas are in fact patterns, that is, they are well established solutions to known problems that practitioners face whilst in training. this project is a Dhamma practitioner's pattern language of the "progressing by tens" framework

* **Purpose**: to generate one pattern in the pattern language in markdown format which will be user-saved. this source document is a parameterised template with instructions for generating one of those Dhammas patterns. the parameters are defined in the "User Tasks" section below

* **File maming & directory structure**: the "progressing by tens" framework uses a 1-based progression index (ie. starting from 'ones' up to 'tens') and a category key (ie. starting from 'helpful' to 'realised') classification scheme as its organisational structure. this project will thus persist each generated pattern as markdown file using the category as the filename and index as the directory structure as follows:
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

* **Pattern names**: Shortened names for all 100 patterns are documented in the source "DN34-param-pattern-request-config.json.txt". this is a json file with each category represented in lowercase with its corresponding array of 10 pattern names (eg. json["pattern-names"]["developed"][7] is 'Noble eightfold path' as the intended pattern name). pattern names are used in catalogs with intent of being memorable and used for unique quick referencing. in contrast, Venerable Sāriputta's longest full answer for "Which eight dhammas are on the side of distinction?" has 4827 characters. therefore to meaningfully reference a solution in the "progressing by tens" framework, I propose using answer-excerpts which I define as Venerable Sāriputta's full answer up until the first ":" or "." character.  thus, "Eight grounds for the arousal of energy" is the answer-excerpt at 39 characters which is much better than 4827. when NotebookLM wants to establish a link to another dhamma from the "progressing by tens" framework, then it needs to lookup the nominated answer-excerpts in the json["answer-excerpts"] object to identify the containing category name and index reference. then using these two keys the matching pattern name is identified. ie. json["pattern-names"]["developed"][7] is the pattern name for json["answer-excerpts"]["developed"][7] answer-excerpt and vice versa.

**User Tasks**:
* Submit the pattern generation request query to NotebookLM by specifying the following parameters:
    1. <paramIndexCategoryQuestion>: string
        This must be an exact index/catagory match as found in the DN 34 "progressing by tens" sutta source
    3. <paramIndexValue>: number [1-10]
        This is the numeric value of the progression index in reference to the question
    5. <paramCategoryOrder>: number [0-9]
        This is the zero based numeric value of the category in reference to the question 

* Example User Query:
    Using the source "param-DN34-pattern-request.md" as the template & instructions for this query's response, generate the pattern using the following user parameters:
    1. paramIndexCategoryQuestion="Which one Dhamma is very helpful?"
    2. paramIndexValue=1
    3. paramCategoryOrder=0
    

**NotebookLM Task**:
* using the <paramIndexCategoryQuestion> parameter, seek for the text in DN 34 to find Venerable Sāriputta's full answer and store it in the <varIndexCategoryFullAnswer> variable. Thus, the specific user query is now:
    * generate the pattern document and provide a comprehensive and analytical response to:
        * <paramIndexCategoryQuestion> <varIndexCategoryFullAnswer>

    * open the source "DN34-param-pattern-request-config.json.txt" and parse it, storing the result into the JSON <paramConfigJson> object variable
    * assign <paramConfigJson>["catagory-keys"][paramCategoryOrder] to the <varCatagoryKey> variable
    * assign <paramConfigJson>["catagory-breadcrumb-labels"][paramCategoryOrder] to the <varCatagoryBreadcrumbLabel> variable
    * assign <paramConfigJson>["index-keys"][paramIndexValue-1] to the <varIndexKey> variable
    * assign <paramConfigJson>["pattern-names"][varCatagoryKey][paramIndexValue-1] to the <varPatternName> variable
    * only draw citations from the following core sources:
        AN_nblm.txt  DN_nblm.txt  KN_Dhp_nblm.txt  KN_Iti_nblm.txt  KN_Khp_nblm.txt  KN_StNp_nblm.txt  KN_Thag_nblm.txt  KN_Thig_nblm.txt  KN_Ud_nblm.txt  MN_nblm.txt  SN_nblm.txt
    * **Crucially, ensure every statement in PART-A that is directly supported by the provided sources is cited appropriately with a [i] notation. If a statement draws from multiple sources, list all relevant source indices (e.g., [i, j, k]). This applies to ALL sections of PART-A (Problem, Context, Forces, Solution, Rationale, Resulting Context, Related Patterns, Case Studies, Similes).**
    * use the source "guide_to_writing_PBT_patterns.md" for the process and methodology to apply when writing this pattern. follow the process in the writing guide. each section in the writing guide will result in generating some content as a building block. each building block corresponds to a section in this template:
    ```json
        patternBuildingBlocksJson = {
            "Problem": "", /* string of the problem statement */
            "Solution": {
                "Step-by-Step": [/* array of process step string (this is a flattened representation of Process View)*/],
                "Cause-&-Effect": [/* array of {cause: string, effect: string} objects (from sources and used in Process View)*/],
                "Solution": {
                    "Process View": [/* array of PlantUML Activity Diagram strings */],
                    "Concepts & Relationships": [/* array of PlantUML Class Diagram strings */],
                    "State Transitions": [/* array of PlantUML State Diagram strings */]
                },
            },
            "Context": [/* array of requisite condition/invariant strings */],
            "Forces": [/* array of design constraint/influence strings */],
            "Rationale": "", /* string of the rationale statement */
            "Resulting Context": [/* array of PlantUML Mindmap Diagram strings */],
            "Related Patterns": [/* array of related pattern-name strings */],
            "Case-studies": [/* array of individual's name reference strings */],
            "Simile": [/* array of simile name reference strings */]
        }
    ```
    * use the template below for generating the content from the patternBuildingBlocksJson variable between (and including) the ---- PART-[A|B] [BEGIN|END] GENERATED OUTPUT ---- segment markers
    * To ensure **`Readable References to Patterns`** by utilizing **`Evocative Pattern Names`** for unique quick referencing, **establish links to other patterns in all sections of PART-A** (including "Related Patterns" and narrative text) by precisely identifying their associated `answer-excerpts` (which serve as common or memorable names for the solutions). Then, follow this strategy:
        1.  **For each `related pattern` to be linked, use its `answer-excerpt` as the lookup key** (e.g., "Four nutriments") within the `paramConfigJson["answer-excerpts"]` object to identify:
            *   Its `categoryKey` (e.g., "comprehended"), representing the category array it belongs to.
            *   Its 0-based `patternIndex` within that category's array (e.g., 3, as demonstrated for "Four nutriments" leading to index 3 in its category) [186, previous conversation].
        2.  From this `patternIndex`, **determine the corresponding `indexRefKey`** from `paramConfigJson["index-keys"][patternIndex]` (e.g., "fours", for patterns typically found in the `/fours/` directory).
        3.  **Retrieve the `patternName`** (the evocative, memorable name for the pattern, e.g., "Nutriments") using the `categoryKey` and `patternIndex` from `paramConfigJson["pattern-names"][categoryKey][patternIndex]`.
        4.  **Construct the markdown link using the specified workaround format**: `/Pattern Name/(../${indexRefKey}/${categoryKey}.md)` (e.g., `/Nutriments/(../fours/comprehended.md)`).
            *   *Note: A post-processing step will apply the regex `//(. *?)/((.* ?))/gm` to finalize this workaround and produce the final, human-readable markdown link.*

---- PART-A BEGIN GENERATED OUTPUT ----
**NotebookLM Task**:
* inject the parameter & variable values into the breadcrumb expression below:
/${varIndexKey}/(../catalog/${paramIndexValue}s-index.md) > /${varCatagoryBreadcrumbLabel}/(../catalog/${varCatagoryKey}-index.md)

# Pattern: ${varPatternName}

## Problem:
**NotebookLM Task**:
* Generate the content using patternBuildingBlocksJson["Problem"] as a formatted string 


## Context:
**NotebookLM Task**:
* Generate the content using patternBuildingBlocksJson["Context"] in a structured list format that is suitable for text-to-speech read-aloud


## Forces:
**NotebookLM Task**:
* Generate the content using patternBuildingBlocksJson["Forces"] in a numbered structured list format that is suitable for text-to-speech read-aloud


## Solution:
**NotebookLM Task**:
* generate a solution introduction given the buddhas recommended teaching approach of instructing step-by-step in line with cause and effect using:
    * patternBuildingBlocksJson["Step-by-Step"] and 
    * patternBuildingBlocksJson["Cause-&-Effect"] 


### Step-by-Step:
**NotebookLM Task**:
* Generate the content using patternBuildingBlocksJson["Solution"]["Step-by-Step"] in a numbered structured list format that is suitable for text-to-speech read-aloud


### Cause-&-Effect:
**NotebookLM Task**:
* Generate the content using patternBuildingBlocksJson["Solution"]["Cause-&-Effect"] in a numbered structured list format that is suitable for text-to-speech read-aloud


### Process View:
**NotebookLM Task**:
* parse the plantuml patternBuildingBlocksJson["Solution"]["Process View"] diagrams array
* for (let i=0; i <> patternBuildingBlocksJson["Solution"]["Process View"].length; i++) // which are plantuml activity diagrams
    * Generate a brief explanation of the diagram's purpose and content.
    * Generate the markdown image link using the format: !/${varCatagoryKey}-sol-process_${i}/(../${varCatagoryKey}-sol-process_${i}.svg)


### Concepts & Relationships:
**NotebookLM Task**:
* parse the plantuml patternBuildingBlocksJson["Solution"]["Concepts & Relationships"] diagrams array
* for (let i=0; i <> patternBuildingBlocksJson["Solution"]["Concepts & Relationships"].length; i++) // which are plantuml class diagrams
    * Generate a brief explanation of the diagram's purpose and content.
    * Generate the markdown image link using the format: !/${varCatagoryKey}-sol-class_${i}/(../${varCatagoryKey}-sol-class_${i}.svg)


### State Transitions:
**NotebookLM Task**:
* parse the plantuml patternBuildingBlocksJson["Solution"]["State Transitions"] diagrams array
* for (let i=0; i <> patternBuildingBlocksJson["Solution"]["State Transitions"].length; i++) // which are plantuml state diagrams
    * Generate a brief explanation of the diagram's purpose and content.
    * Generate the markdown image link using the format: !/${varCatagoryKey}-sol-state_${i}/(../${varCatagoryKey}-sol-state_${i}.svg)


## Rationale:
**NotebookLM Task**:
* An explanation of why this solution is most appropriate for the stated problem within this context.
* generate section


## Resulting Context:
**NotebookLM Task**:
* parse the plantuml patternBuildingBlocksJson["Resulting Context"] diagrams array
* for (let i=0; i <> patternBuildingBlocksJson["Solution"]["Resulting Context"].length; i++) // which are plantuml mind maps
    * Generate a brief explanation of the diagram's purpose and content.
    * Generate the markdown image link using the format: !/${varCatagoryKey}-rc-mmap_${i}/(../${varCatagoryKey}-rc-mmap_${i}.svg)


## Related Patterns:
**NotebookLM Task**:
* in a structured formatted list, foreach <pattern-name> in patternBuildingBlocksJson["Related Patterns"]
    * create a markdown workaround reference to the related <pattern-name> 
    * generate a list item entry with the markdown workaround format, a reference to the hosting catagory, and the relevance to this pattern


## Case studies:
**NotebookLM Task**:
* in a structured formatted list, foreach <individual> in patternBuildingBlocksJson["Case-studies"]
    * generate a list item entry with the individual's name, provide a synopsis for each case study and their solution with respect to this pattern


## Similes:
**NotebookLM Task**:
* in a structured formatted list, foreach <simile> in patternBuildingBlocksJson["Simile"]
    * generate a list item entry describing the relevant simile and pattern's dhamma quality in that simile & explain how this can be understood

---- PART-A END GENERATED OUTPUT ----
---- PART-B BEGIN GENERATED OUTPUT ----
' export to filename: ${varCatagoryKey}.puml

**NotebookLM Task**:
* for (let i=0; i <> patternBuildingBlocksJson["Solution"]["Process View"].length; i++)
    * modify the first line to be:
        @startuml ${varCatagoryKey}-sol-process_${i}
    * inject the <diagram> inline


**NotebookLM Task**:
* for (let i=0; i <> patternBuildingBlocksJson["Solution"]["Concepts & Relationships"].length; i++)
    * modify the first line to be:
        @startuml ${varCatagoryKey}-sol-class_${i}
    * inject the <diagram> inline


**NotebookLM Task**:
* for (let i=0; i <> patternBuildingBlocksJson["Solution"]["State Transitions"].length; i++)
    * modify the first line to be:
        @startuml ${varCatagoryKey}-sol-state_${i}
    * inject the <diagram> inline


**NotebookLM Task**:
* for (let i=0; i <> patternBuildingBlocksJson["Solution"]["Resulting Context"].length; i++)
    * modify the first line to be:
        @startmindmap ${varCatagoryKey}-rc-mmap_${i}
    * inject the <diagram> inline

---- PART-B END GENERATED OUTPUT ----