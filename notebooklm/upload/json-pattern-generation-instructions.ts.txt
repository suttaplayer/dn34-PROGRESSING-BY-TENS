import { PatternGenerator } from "./pattern-generation-API.ts"
import { PatternResponseJson, userPatternRequestJson, UserPatternRequestJson } from "./pattern-API.ts"

/*
# JSON Pattern Generation Instruction Manual For NotebookLM

these instructions are codified for and to be executed by notebooklm. it must be fit for notebooklm's use. these instructions must routinely be assessed by notebooklm for ambiguity, inconsistencies and errors which present as obstacles to the pattern generation system.
*/


import config_ from "./pattern-generation-instructions-config.json" with { type: "json" }

export type InstructionsJson = {
    modulePath: string
    bootstrap: string
}

type BootstrapFunctionDefinition = () => void


export type GenerationWorkTaskInstructionsConfigJson = {
    instructions: InstructionsJson[]
}

export class JsonPatternGenerationInstructions {
    public static CONFIG: GenerationWorkTaskInstructionsConfigJson = config_ as GenerationWorkTaskInstructionsConfigJson
    public userPatternRequest: UserPatternRequestJson|undefined
    public generator: PatternGenerator

    constructor(userPatternRequest?: UserPatternRequestJson) {
        this.userPatternRequest = userPatternRequest
    }

    readBackground() {
        /*
        in DN 34 there are 100 dhammas (ie. topics in this context) presented in a "progressing by tens" (aka PBT) framework. these topics are highly tailored for attaining unbinding, putting an end to suffering & stress, and releasing from all ties. these 100 topics are in fact patterns, that is, they are well established solutions to known problems that practitioners face whilst in training. there is a requirements to create a project which will result in a Dhamma practitioner's pattern language of the "progressing by tens" framework

        in order to be successful at this task, notebooklm has been paired with an expert dhamma practitioner. notebooklm has been assigned the task of eventually generating all of the 100 patterns. therefore, this instruction manual contains the neccessary context and process steps required for notebooklm to complete the pattern generation.

        these instructions represents the approach that the expert themselves would follow to create the "progression by tens" patterns. the purpose of this manual is to document the processes, methods & instructions for creating the raw materials and building blocks for JSON pattern generation.

        */
    }

    visualiseProblemSpace() {
        /*
        
        ```plantuml - https://editor.plantuml.com/uml/RLHDRzim3BttLn0-DLtjfWLsM51aNOjrs7R9q00xR3ie4cDhrOSXocszelzzikFOiXDVR3oHxr6Ff05spmrvvdob5MGNPNYbKhCSwU8RMRDYtgCpNz2WOrvQyzMGTnLlFYajdTqer2cLZED9HmS5Ce4ExXmoZmAiMS3L_EfzogeylVhGXtdf5K8Z0fqA338Gwy3fQYS43utGR52I0W5rwMlGg3VewAG_uueHGH8oSuT4qkHmMyCQ3VqszuvfVBRkCG56iBfTzrbeAWrteUxSkXfUUtntBrLkApN213wXiYMA4SgjBXqMQCJaW6sO4TPCK85SIODZJ9ANfht_22-3HJvuD8vcJj8OUJJsUPmPsg7alz2GyFG7RuDXmGRuLUxjQZejyEKSU6V6Twp_m5cQBY6vdCyJMDjIygdTgo4Thg-3bw4do-LWu-jbbbtEtux9jtpGya-BI6BUOmbHZKdVlKcWRG9VZGMxXKY0tg2jAO67QlCNkU_JxYslw5Dm3R8CJbkIyttGR06QrL2m9uHvbfqTlGRc6Vmi92_22Y28WcdDG18yOHYjRfW-9l2ZGXgr-S6ggW4-lt1qfO_bzx6p0-Ex3HgiVWVTTaO8jyRZYu-GhNKSAGAe4u-WtKOoXJ66L2dVBDKXfqFLBdwvgobcvumm9Ly9EHQLMaRqHwUYk-6YdMo58iV6In6QfD4qSjA0Bn2MqKHtfZJf4rCNmuwI32jSXoNqJ2hgE0uebllMBu09qGmFKXHt4tOz_3fF_WC0
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
        Topic o-> "{no of progressions} 1..10" Subject
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

        the class diagram above outlines the problem space for this project. each topic in the framework is qualitied by categetory and progression. the topic has an aggregate of subjects and focus areas which are constrained by the number of progressions. the topic presents a question with a number of progressions in the context of a category eg. "Which one dhamma is very helpful?". in response to this question, the topic presents an excerpt answer. 
        
        the pattern language is overlayed on top of this framework. it uses the same topic structure but explores a greater solution detail in order to address a prescribed problem.

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

        if (!this.userPatternRequest) {
            if (!userPatternRequestJson[0])
                throw new Error("IllegalArgument: pattern-API.ts > userPatternRequestJson[0] is undefined. This is likely due to the user not providing a userPatternRequestJson object in the prompt.")
            this.userPatternRequest = userPatternRequestJson[0]
        }
            
        this.generator = new PatternGenerator(this.userPatternRequest)
        if (this.generator.verboseOutput) {
            console.log("USER-QUERY [UserPatternRequestJson]")
            console.log(JSON.stringify(this.generator.request, null, 2))
            console.log("-------------------------------------------------------")
        }
    }

    async runIterativeAndIncrementalApproachToBuilding() {
        /*
        work tasks will be built using an iterative & incremental methodology with continuous input from notebooklm. a work task will be iterated over and over until the collaborative effort yields the desired result for a specific pattern work task. when the desired result is achieved, then the next work task increment is incorporated into the build.

        work task dependency injection is achieved through the pattern-generation-instructions-config.json. this file contains an array of instruction modules that are dynamically linked into the pattern generation process. the bootstrap function enables the configuration to toggle between the running-example and the actual implementation.  

        */

        for (let i = 0, len = JsonPatternGenerationInstructions.CONFIG.instructions.length; i < len; i++) {
            const workTaskInstructions = JsonPatternGenerationInstructions.CONFIG.instructions[i]
            if (i == len-1 && this.userPatternRequest?.unitTestResolver)
                workTaskInstructions.modulePath = this.userPatternRequest.unitTestResolver
            const module = await import(workTaskInstructions.modulePath)
            const bootFunc = module[workTaskInstructions.bootstrap] as BootstrapFunctionDefinition
            bootFunc()
        }
    }

    async execute(): Promise<PatternResponseJson> {
        this.readBackground()
        this.visualiseProblemSpace()
        this.readNotebookLmCollaboration()
        this.readPatternWritingOrchestration()
        this.readProgressingByTensCatalogAndUtils()
        this.readPatternAPIForCollaboration()
        this.readWorkTasks()
        await this.runIterativeAndIncrementalApproachToBuilding()
        this.readUserPatternRequestQuery()
        await this.generator.generate()
        if (this.generator.verboseOutput) 
            console.log(JSON.stringify(this.generator.response, null, 2))
        return this.generator.response
    }
}

if (Deno.mainModule === import.meta.url) {
    // simulate notebooklm user-query submission as injected argument:
    const instructions = new JsonPatternGenerationInstructions(/* UserPatternRequestJson|undefined */)
    await instructions.execute()
}