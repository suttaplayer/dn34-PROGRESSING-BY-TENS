import { BaseWorkTaskInstructions, PatternGenerator } from "./generation-API.ts";
import { ScopeJson, SubjectJson } from "./pattern-API.ts";
import { ProgressingByTens } from "./pbt-utils.ts";


class NotebooklmScopeService {

}

export class RunningExampleScopeInstructions extends BaseWorkTaskInstructions {
    visualiseSolutionSpace() {
        /*
        ```plantuml - https://editor.plantuml.com/uml/dLLDRzim3BtxLn0vjTtSPXs60aAGTUrMhFj2q6IdPGV5fcsjbcH8SfjWw7yV9JjniYHBiLugI-BZu-EZScaTDwwM9PoULVGl5fBdQC_kQgM4oZ_CkQnA72UwmbjbdQaJ9xIoiTLbxLUnhNY2KO4yHGFN1hd35BHYSDu_VnFpEezVzoCdN8aGK60T1ex6BGwCFSvnL8WK0MNb5Y1Hpj3OA4fARYsCk7Der5KjofIONPKwkRUVB8KE1aUVNiBDpSL5ltyy7CBlfpPaNCz-OU9sNug0_XINo8084MBOo7HIstTKnjlbze-VuG0LPRynMeuTbRWHWtFX9dfp_sb9EnJz3mQLqRb1Qqc3MvNYd86gVTqGJXF2pBLPVCO5W-lkepcj6ac-hHT1YP4GO6GuQUobHUC3cco9LWyYQ1-d1PUInvakI_s89XmJ1d8PXrhRBQqIZ0swsgXsHr7mQgEhqvS_Ahbotxz-UIzuRhYSuDpjAFk55zCiGeJ_8FcQzGhiMXE3-Rx6TTTuRNbvXoNt5UsvxQ_lzyv970-X5vhKwth5l50a1XVaKLSWBEqE3uB3y32UBmScXYih6gE_EZqzwUqLYO7KAPQRkUoKA7WSoPD2A7ncxbQxthg8pDliWKRB0kzgoRI1Po46cUC9dvKaqhRe3BppB6H8Nl4PoBL98Qd9eBEfIdn0IFWeN05azeg64fpULFOmZv7Hn43se5qmu6dgPoSa7KPHDslXlct6VwbzznWm4Cxw5djzeE2MWjVVYX1DxsAERdsCMg2_9ej1SpD8IvM9J2IRU8njFXu1VwyLM3SS390SC2k5BR3nnZrDyWnpuTzc2EwOqh8HCa2xbUSWRK2tk7IlrI4Yoy7SpGDL-hyi3YYyvjneEypx2SymoxhUxlAaQ9WcNaua8pPVAsTkyrcvwgD-X5J3GjUGwwdAg6yms6pXSAh8luCrBOVH9Gb2lw1_0000
        @startuml ./puml-images/RunningExampleScopeInstructions-solution-space
        header Created on: 2025-aug-30
        title Scope Instructions (Solution Space)
        hide empty members

        class PatternBuildingBlocksJson <<(J, FF7700)>> {}
        class SubjectJson <<(J, FF7700)>> {
            name: string
            focusArea?: string[]
            enterFromState: string
            exitToState: string
        }

        class ScopeJson <<(J, FF7700)>> {
            progressionIndex: number 
            categoryKey: CategoryKey 
            patternName: string
        }

        enum PractitionerKey {
            conviction-dhamma-follower
            stream-enterer
            once-returner
            non-returner
        }

        class StatePlantUMLDiagramText <<(J, FF7700)>> {
        + entryState
        + exitState
        }

        class ContextJson <<(J, FF7700)>> {
        }

        class CausalRelationJson <<(J, FF7700)>> {

        }

        PatternBuildingBlocksJson *--> "Scope" ScopeJson: constrains the solution via >
        PatternBuildingBlocksJson *--> "State Transitions 1..*" StatePlantUMLDiagramText: models the solutions\nstate machine via >
        PatternBuildingBlocksJson *--> "Context" ContextJson: provides a solution for a >
        PatternBuildingBlocksJson *--> "Causal-Table" CausalRelationJson: rings fences a catchment of\ncausation with respect to the solution >
        PatternBuildingBlocksJson *--> "Problem" Problem: addresses a >

        ScopeJson --> "subject 1..*" SubjectJson: its context has >
        SubjectJson --> "targetPractitioner 1..*" PractitionerKey: targets a specific >
        SubjectJson::enterFromState --> StatePlantUMLDiagramText::entryState: establishes the key begining state\nin the state transition diagram >
        SubjectJson::exitToState --> StatePlantUMLDiagramText::exitState: establishes the key ending state\nin the state transition diagram >
        SubjectJson --> "targetPractitioner 1..*" ContextJson

        SubjectJson --> "cause/effect 1..*" CausalRelationJson: is the centre of the catchment >
        SubjectJson --> Problem: How do you go\nfrom <enterFromState>\nto <exitToState>
        @enduml
        ```

        the class diagram above highlights how the scope via SubjectJson will later play a role in:
        1. the pattern's context
        * patterns are solutions to problems in a given context. that context also includes "who" (ie. the type of practitioners) this solution is applicable for. therefore, it is crucial that notebooklm identifies the appropriate type of practitioner for each subject. note, the pattern's (as opposed to the subject) target practitioner is the union set of the subject practitioners.
        
        2. the pattern's causal-table with the subject at the centre
        * a pattern's context, forces, solution & resulting context are all dependent on comprehending causation for each subject. hence, generalised and appropriately abstracted subject names are critical for creating a bi-directional causal tree 

        3. the pattern's solution state transition diagrams 
        * a pattern's solution can be expressed in many modes and permutations. this project aims to be as comprehensive as possible in assembling the critical knowledge for the practitioner from multiple perspectives. the behavioural aspects of a state transition diagram help the practitioner to see how the practice progresses upon state transitions as opposed to a focus on processes, structures and events. 

        */
    }

    assignThePatternNameAndEstablishTheContext() {
        const patternName = ProgressingByTens.lookupPatternName(this.request)
        this.responder.response.buildingBlocks["Scope"].patternName = patternName
        const context = ProgressingByTens.revealContextStatement(this.request)
        if (this.responder.verboseOutput) {
            console.log(`RUNNING-EXAMPLE [${patternName}]`)
            console.log(context)
            console.log("-------------------------------------------------------")
            /* stdout:
            RUNNING-EXAMPLE [Heedful, ardent & resolute]
            Which one Dhamma is very helpful? 
            Heedfulness with regard to skillful qualities
            -------------------------------------------------------
            */
        }
        /* **Command:appendToContextWindow** ${context}
        */
    }

    considerExceptionalCasesForAnswerExcerptParsing() {
        /*
        the parsing approach will typically work for the majority of the 100 topics. however, there are exceptions that notebooklm will need to manage.

        consider the following case1:

            > Which three dhammas should be developed? Three concentrations: concentration with directed thought & evaluation, concentration without directed thought & with a modicum of evaluation, concentration without directed thought & evaluation.

            this case can be parsed in two ways:
            1. three subjects
                1. concentration with directed thought
                2. concentration without directed thought & with a modicum of evaluation
                3. concentration without directed thought & evaluation
            2. one subject with three focusAreas:
                1. concentration
                    1. with directed thought
                    2. without directed thought & with a modicum of evaluation
                    3. without directed thought & evaluation
            notebooklm should choose three subjects in this case to avoid the loss of too much critical data for the topic. note, in the case of one subject, the entry & exit states are generalised (ie. enter: hindered, exit: discernment). where as the three subjects entry and exit states are specialised (ie. enter1: singleness of mind, exit1: 1st jhana; enter2: 1st jhana, exit2: refined 1st jhana; enter3: refined 1st jhana, exit3: 2nd jhana). the resulting analysis will be completely different.
            
        consider the following case2:

            > Which four dhammas are hard to penetrate? Four concentrations: concentration that has a share in decline, concentration that has a share in stability, concentration that has a share in distinction, concentration that has a share in penetration.
            
            this case can be parsed in two ways:
            1. four subjects
                1. concentration that has a share in decline
                2. concentration that has a share in stability
                3. concentration that has a share in distinction
                4. concentration that has a share in penetration
            2. one subject with four focusAreas:
                1. concentration
                    1. decline
                    2. stability
                    3. distinction
                    4. penetration
            notebooklm should choose four subject in this case to avoid the wrong analysis. note, concentration that has a share in decline is wrong concentration which focuses on sensuality, ill will & harmfulness. a generalised concentration topic as previously discussed has different entry/exit states.
            
        remember, focusAreas are like hints which can get ignored & dropped when insignificant search results are produced.
        
        */
    }

    async parsingTheAnswerExcerpt() {
        /*
        the answerExcerpt must be parsed by:
        1. identifying a maximum of progressionIndex number of subjects from the answerExcerpt
        2. identifying optional focusArea(s) associated with that subject

        notebooklm must:
        1. **Command:parse** the answerExcerpt into SubjectJson objects. focusArea is optional can remain undefined if not applicable. assign "", "" & [] for enterFromState, exitToState & targetPractitioner respectively.

        */
        async function notebooklmParse(): Promise<[SubjectJson[], string]> {
            const exeCommand = {
                commandType: "structured_extraction",
                parameters: {
                    textToParse: "<answerExcerpt_string>",
                    extractionTarget: "SubjectJson[]",
                    expectedFormat: "{ name: string, focusArea?: string[] }[]",
                    guidance: "Identify distinct subjects and their optional associated focus areas from the answer excerpt. If components within the answer excerpt have distinct and sequential requisite conditions, or lead to different immediate outcomes, parse them as separate SubjectJson objects. The maximum number of subjects to extract is defined by progressionIndex. Initially, enterFromState and exitToState should be empty strings, and targetPractitioner an empty array."
                }
            }
            return [[{
                name: "Heedfulness", focusArea: ["skillful qualities"],
                enterFromState: "", exitToState: "", targetPractitioner: []}], "parsed as 1 subject & 1 focus area because `with regard to` denotes that the focusArea follows"]
        }
        const [subjs, subst] = await notebooklmParse()
        if (this.substantiations) {
            this.substantiations.push(subst)
        }
        for (const subj of subjs) {
            subj.name = await this.generaliseAndAbstractToConcept(subj.name)
        }
        (this.taskBuildingBlock as ScopeJson).subject.push(...subjs)
    }

    protected async executeInstructions(): Promise<void> {
        this.visualiseSolutionSpace()
        this.assignThePatternNameAndEstablishTheContext()
        await this.parsingTheAnswerExcerpt()


        // this.responder.response.buildingBlocks["Scope"].subject = [{
        //     name: "Heedfulness",
        //     focusArea: ["skillful qualities"],
        //     enterFromState: "complacent",
        //     exitToState: "effluent-free",
        //     targetPractitioner: ["stream-enterer", "once-returner", "non-returner"]
        // }]
        // this.quotationSet.add("[dont] ever let yourself get complacent when the ending of effluents is still unattained")
        // this.quotationSet.add("Now, then, monks, I exhort you: All fabrications are subject to ending & decay. Reach consummation through heedfulness.' That was the Tathāgata's last statement [to a group of noble monks the most backward of which was a stream-enterer]")
        
        if (this.responder.verboseOutput)
            console.log("starting [RunningExampleScopeInstructions]")
    }



    protected checkPreConditions() {
        let ret = false
        if (this.request.progressionIndex > 0 && this.request.categoryKey)
            ret = true
        return ret
    }

    protected checkPostConditions() {
        let ret = false
        if ((this.taskBuildingBlock as ScopeJson).subject.length > 0)
            ret = true
        return ret
    }
}

export function register() {
    PatternGenerator.INSTRUCTIONS_REGISTRY.set("Scope", RunningExampleScopeInstructions)
}