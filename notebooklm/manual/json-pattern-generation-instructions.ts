import { PatternGenerator } from "./generation-API.ts"
import { UserPatternRequestJson } from "./pattern-API.ts"
import { ProgressingByTens } from "./pbt-utils.ts"

/*
# JSON Pattern Generation Instruction Manual For NotebookLM

these instructions are codified for and to be executed by notebooklm. it must be fit for notebooklm's use. these instructions must routinely be assessed by notebooklm for ambiguity, inconsistencies and errors which present as obstacles to the pattern generation system.
*/

class JsonPatternGenerationInstructions {
    public generator: PatternGenerator

    readBackground() {
        /*
        in DN 34 there are 100 dhammas (ie. topics in this context) presented in a "progressing by tens" (aka PBT) framework. these topics are highly tailored for attaining unbinding, putting an end to suffering & stress, and releasing from all ties. these 100 topics are in fact patterns, that is, they are well established solutions to known problems that practitioners face whilst in training. there is a requirements to create a project which will result in a Dhamma practitioner's pattern language of the "progressing by tens" framework

        in order to be successful at this task, notebooklm has been paired with an expert dhamma practitioner. notebooklm has been assigned the task of eventually generating all of the 100 patterns. therefore, this instruction manual contains the neccessary context and process steps required for notebooklm to complete the pattern generation.

        these instructions represents the approach that the expert themselves would follow to create the "progression by tens" patterns. the purpose of this manual is to document the processes, methods & instructions for creating the raw materials and building blocks for JSON pattern generation.

        */
    }

    visualiseProblemSpace() {
        /*
        
        ```plantuml - https://editor.plantuml.com/uml/NLDDRzim3BtxLn0-DLtj9W5sM51aNOjrA7R9a00xR3ie4ckhrOSXoccoeF-zjEoaQNKnQP6FVEJJDKKHOciDb9SDVmfjHOLq-KZU5Os84OChAdI5TXIB9lYrGLjG8oHcDGg50Mu3YeWAl9l1T3pzN8YsAgPVigYZGLZq6F037GOHjNTmpr2XbSa-M_IGiEmWHrcj5GBQ9kx0ebrZe2oJHX11pf5LG2BjAhZPmGeT_NLtGLXyzk4f1q6mk5bbw5eBjznHvSCEzXdmgT4q3wr9ji8D6j-WIfxqjWbOerF33x4MJdatU0gbqGvxMrFKBhMT_8OPHQRKtugWgRUUd7_k8tWmHl_dqV39NhACsuC_pO66T_TSTNi1ScZs9-x-mNbHp26VZCSvh7oZvO7-uYqDhgwO8yzcFjzd-qbPJiOl7NoAXvJ_iKX-cdyQU58xFqxjD231vx1iruyeOtRdPKlVc1YK9Pobk8l3vMW6LkoW5Xk4SLcUl-i8gn9-rrhMh1C4LGjh1MY23VAMXlrypU5NYvGclFIcxOplMucXYQVb3Z6Zusm6ZNNB_WI3I9CjlOkuZSb-y44Y9PC6yEJqgXG6Um-fDR7Js6bkG9CqFho87aKAme9Yg_G1LblDCEzMCVGsIx8mg2hiM2iUeqNNGMe7iKQOipm66btQ1_gpDw6IPltkM9bHQ4D3xZ5rVbZ638HItSAH-FwQ1Swl-nK0
        @startuml ./puml-images/JsonPatternGenerationInstructions-problem-space
        header Created on: 2025-aug-29
        title Json Pattern Generation Instructions (Problem Space)
        hide empty members

        class "Progressing By Tens\nFramework" as PBT
        enum Category {
            helpful
            developed
            comprehended
            abandoned
            decline
            distinction
            penetrate
            arise
            known
            realized    
        }

        PBT [progressionIndex, categoryKey] *--> "100" Topic

        class Progression <<number>>{
        {1..10}
        }

        Topic --> "progressionIndex" Progression
        Topic --> "categoryKey" Category
        Topic --> "1..10" Subject
        FocusArea .. (Topic, Subject): may have 0..*

        Topic --> "eg. Which one dhamma is very helpful?" Question
        SolutionExcerpt .. (Topic, Question)

        class Pattern {
        + problem
        + context
        + forces
        + solution
        + rationale
        + resulting context
        + related patterns
        + case-studies
        + simile
        }

        Topic --> Pattern: knowledge is documented in the >

        Pattern --> SolutionExcerpt: comprehensively details the >
        Pattern -> Subject: addresses >
        @enduml
        ```

        the class diagram above outlines the problem space for this project.

        */
    }

    readNotebookLmCollaboration() {
        /*
        ## NotebookLM Collaboration

        the dhamma that is documented across the suttas is a blueprint of causation. there is no single sutta that address an given topic. although the "progressing by tens" may appear to only cover 100 topics, the reality is that there are [(1x10 + 2x10 + 3x10 ... 10x10) = 550] 550 subjects which are covered within this framework. this is truely an ambitious project!

        generating a pattern for this framework will be a non-trivial exercise. it will require pulling together highly specific relational information and causal knowledge from the sutta sources. 

        generating a single pattern will require an orchestration of user-queries managed through programmatic logic. 

        notebooklm will:
        1. execute the instructions here-in
        2. collaborate with the dhamma & pattern language expert on:
            * the work tasks that need to be fulfilled
            * determining the best and most appropriate notebooklm query mechanism (eg. information_retrieval, text_analysis, conceptual_mapping, comparative_analysis, structured_extraction, synthesized_overview, user_text_analysis) for the task at hand
            * composing the pattern sections and their associated quotations
            * outputting the pattern as a JSON object for external user persistence
            * given an expected result determine the best way to utility notebooklm to achieve it
            * advising the sections in this instruction manual that need to be updated    
            * advising on changes to other materials required in this development process

        */
    }

    readPatternWritingOrchestration() {
        /*
        ## Pattern Writing Orchestration

        generating a pattern will require orchestration between the following artifacts: 
        1. parameterised user query: the user provides a parameterised initiating instruction as part of the user query submitted to notebooklm
        2. instruction manual (this document): notebooklm, reviews this manual to comprehend the shared resource objects and the pattern api used in the process. notebooklm then executes the step-by-step process (see below) following the methodology applied in separate sub-documents. all tasks incorporate their resultant raw materials & building blocks in the final payload which will be consumed by the template
        3. template: notebooklm, executes the instructions in the template using the payload for rendering

        this triad of core artifacts provides for the highest level of flexability achieved through the separation of concerns. in this way, it's now a feasible option to persist the generated pattern as a JSON file and later apply the same JSON file as input to a template optimised for text-to-speech  or even video whilst all based on the exact same conceptual pattern. because notebooklm's responses are non-deterministic, this approach is an effective way to achieve write once, consume on any media approach. thus, this manual will deliver the essence of the pattern, the template will target a specific media format.

        */
    }

    readProgressingByTensCatalogAndUtils() {
        /*
        ## "Progressing By Tens" Catalog & Utils

        there has been a concerted effort to reduce notebooklm's parsing & performance work load. a curated json source "pbt-catalog.json.txt" file has been prepared for this project. this file catalogs the entire "progression by tens" framework and links the target patternName for each topic. further, additional preprocessing may be considered if notebooklm's text analysis and parsing capabilities prove insufficient. 

        there is also a support utility for accessing the catalog in "pbt-utils.ts.txt" 

        */
    }

    readPatternAPIForCollaboration() {
        /*
        ## Pattern API For Collaboration

        in order to inteface between the three core artifacts, a common set of data types must be established to form a contract for communication. objects of these types may be created by notebooklm or the user as part of an orchestrated work task response.

        the source "pattern-API.ts.txt" typescript file provides many key types required for communication and exchange.

        */
    }

    readWorkTasks() {
        /*
        ## Work Tasks

        when following any instructions with more than 1 participant, it can become ambiguous as to:
        1. who will execute a given instruction
        2. what is instructional context or information that elaboerates the current executional state
        3. what is an instruction command

        to address these concerns these generation instructions & also the template instructions have been codified. furthermore, users task segment are marked with a "**User Task**" qualifier indicating that this task is to be performed by the user only. notebooklm must read & analyse all source materials associated with the user-query in order to understand the means of collaboration and exchange between artifacts and the user.

        furthermore, all commands that notebooklm must execute beyond the codified instructions will be denoted with a "**Command:<command>**" qualifier. note, the "**Command:<command>**" annotation will be found within source code comments to ensure compile-time & unit-test time execution. this marker helps notebooklm understand the user's expectation and help with the separation of concerns between instructional information and command.

        */
    }

    readUserPatternRequestQuery() {
        /*
        ## User Pattern Request Query

        note, notebooklm does not provide a client side api. this makes an ambitious project like this even more difficult. however, what notebooklm does have is a extremely flexible and comprehensive query mechanism. unfortunately, the only exposure to this mechanism is via the notebooklm web ui, which has a user-query input field with a 2000 character limit. thus, specifying & executing instructions in this instruction manual, coupled with codifications in other source documents are the way forward.

        the user query is the means by which a pattern request is submitted via notebooklm's ui prompt input-field. the user query must explicitly specify:
        1. a userPatternRequestJson object as the parameters for specifying the desired pattern to be generated
        2. this source instruction manual
        3. a specific source template to apply for rendering


        **User Task:**
        * Submit the pattern generation request query to notebooklm by specifying the following parameters:

        ```txt
        1. with the parameterised request object below:
            userPatternRequestJson = { 
            "progressionIndex": -1, 
            "categoryKey": null,    
            "includeSubstantiations": false, 
            "directExperience": {
                "Problem": {
                    "factors": ["heedfulness co-arises with reflection"],
                    "determinantQuotations": ["Having admirable people as friends, companions, & colleagues is actually the whole of the holy life."]
                }
            }
            }
        2. execute the instructions in source "json-pattern-generation-instructions-manual.md" which output's patternResponseJson
        3. with patternResponseJson as input, execute the instructions in source "<template-file>" for rendering
        ```
        */

       const userQuery_heedful_ardent_resolute: UserPatternRequestJson = { // a PBT dhamma reference requires a composite key:
            progressionIndex: 1,
            categoryKey: "helpful",
            includeSubstantiations: true,
            verboseOutput: true,
        }

        // simulate notebooklm user-query submission:
        this.generator = new PatternGenerator(userQuery_heedful_ardent_resolute)
        if (this.generator.verboseOutput) {
            console.log("USER-QUERY [UserPatternRequestJson]")
            console.log(JSON.stringify(userQuery_heedful_ardent_resolute, null, 2))
            console.log("-------------------------------------------------------")
        }
    }

    async runIterativeAndIncrementalApproachToBuilding() {
        /*
        ## Running Example

        instructions are one things but examples of how a method has been applied is another. therefore, below the instructions for each work task, an example of resultant building blocks has been provided. however, often independent and over-simplisitic examples hide the nuances inherent in tasks that are coupled to the overrall process. to resolve this issues, this manual uses a **running-example**. 

        the **"Heedful, ardent & resolute"** pattern whose associated answer-excerpt is **"Heedfulness with regard to skillful qualities"** has been used as a running example for this manual and it's sub-manuals. notebooklm must analyse the running example to follow the expert's methodology on how they implemented the instructions when crafting the resultant raw materials and building blocks. 

        note, only the example plantuml diagrams are to be considered final drafts. all other sections or sub-sections examples are to be considered as work-in-progress that notebooklm must use as a reference.

        > Which one dhamma is very helpful? Heedfulness with regard to skillful qualities: This one dhamma is very helpful.

        there are pros and cons related to this topic selection:
        * pro:
            1. it is the 1st progression and therefore there is only one subject
            2. heedfulness is critical subject that cross cuts the entire dhamma practice and is applicable to all practitioners in training
        * con:
            1. it may result in an over-simplification of the resultant instruction manual. this may result in failure when apply the instruction manual to large progression topics eg. "Which eight dhammas are on the side of distinction?" this solution excerpt itself has 4827 characters.


        the following json captures the desired generated pattern for this topic. note, the json below will be incomplete until this manual has been completed. as the collaborative effort progresses this json object below will get updated.

        */
       await this.generator.generate()
    }

    async execute() {
        this.readBackground()
        this.visualiseProblemSpace()
        this.readNotebookLmCollaboration()
        this.readPatternWritingOrchestration()
        this.readProgressingByTensCatalogAndUtils()
        this.readPatternAPIForCollaboration()
        this.readWorkTasks()
        this.readUserPatternRequestQuery()
        await this.runIterativeAndIncrementalApproachToBuilding()
    }
}


const instructions = new JsonPatternGenerationInstructions()
await instructions.execute()
console.log(JSON.stringify(instructions.generator.response, null, 2))

/* 

$ deno --allow-read json-pattern-generation-instructions.ts 
USER-QUERY [UserPatternRequestJson]
{
  "progressionIndex": 1,
  "categoryKey": "helpful",
  "includeSubstantiations": true,
  "verboseOutput": true
}
-------------------------------------------------------
starting [JsonScopeGenerationInstructions]
PATTERN: Heedful, ardent & resolute
Which one Dhamma is very helpful? 
Heedfulness with regard to skillful qualities
-------------------------------------------------------
{
  "buildingBlocks": {
    "Scope": {
      "progressionIndex": 1,
      "categoryKey": "helpful",
      "patternName": "Heedful, ardent & resolute",
      "subject": [
        {
          "name": "Heedfulness",
          "focusArea": [
            "skillful qualities"
          ],
          "enterFromState": "heedlessness",
          "exitToState": "heedful",
          "targetPractitioner": [
            "stream-enterer",
            "once-returner",
            "non-returner"
          ]
        }
      ]
    },
    "Problem": [],
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
  "quotationSheet": {
    "Scope": [
      "[dont] ever let yourself get complacent when the ending of effluents is still unattained",
      "Because of that gain, he becomes intoxicated, complacent, & falls into heedlessness.",
      "Now, then, monks, I exhort you: All fabrications are subject to ending & decay. Reach consummation through heedfulness.' That was the Tathāgata's last statement [to a group of noble monks the most backward of which was a stream-enterer]"
    ],
    "Problem": [],
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
    "Rationale": [],
    "Resulting Context": [],
    "Related Patterns": [],
    "Case-studies": [],
    "Simile": [],
    "Step-by-Step": [],
    "Cause-&-Effect": [],
    "Process View": [],
    "Concepts & Relationships": [],
    "State Transitions": []
  },
  "substantiations": {
    "Scope": [
      "parsed as 1 subject & 1 focus area because `with regard to` denotes that the focusArea follows",
      "'[dont] ever let yourself get complacent' &  'falls into heedlessness' establish the enter from state",
      "heedfulness is a composite state of the mind. 'complacent' would be the first state after transition from 'heedlessness'",
      "'when the ending of effluents is still unattained' establish the exit to state",
      "heedfulness is a composite state of the mind. 'heedful' would be the final state from which there is no falling back",
      "provides a clear indication by the buddha himself at who the 'heedfulness' message was targetted at",
      "although heedfulness is applicable to all practitioners, it is specifically applicable to leaners (ie. one-in-training)"
    ],
    "Problem": [],
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
    "Rationale": [],
    "Resulting Context": [],
    "Related Patterns": [],
    "Case-studies": [],
    "Simile": []
  }
}

*/