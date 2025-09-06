import { BaseWorkTaskInstructions, PatternGenerator, WorkTaskResolvable } from "./pattern-generation-API.ts";
import { DeterminantQuotationString, PractitionerKey, ScopeJson, SubjectJson } from "./pattern-API.ts";
import { ProgressingByTens } from "./pbt-utils.ts";

export interface ScopeWorkTaskResolvable extends WorkTaskResolvable {
    parseAnswerExcerptAsSubjectJsonArray(answerExcerpt: string): Promise<SubjectJson[]>

    searchForMindOrExternalStateWithRespectTo(subjectAndForcesExpression: string, boundaryType: string): Promise<DeterminantQuotationString[]>
    parseMindOrExternalStateWithRespectTo(determinantQuotations: DeterminantQuotationString[], boundaryType: string): Promise<string>

    searchForTargetPracitionersWithRespectTo(subjectAndForcesExpression: string): Promise<DeterminantQuotationString[]>
    parseTargetPractitionersWithRespectTo(determinantQuotations: DeterminantQuotationString[]): Promise<PractitionerKey[]>
}

export type ScopeCommandResolverConstructor = new () => ScopeWorkTaskResolvable

export class JsonScopeGenerationInstructions extends BaseWorkTaskInstructions<ScopeJson, ScopeWorkTaskResolvable> {
    public static RESOLVER_CTR: ScopeCommandResolverConstructor
    protected answerExcerpt: string

    visualiseSolutionSpace() {
        /*
        ```plantuml - https://editor.plantuml.com/uml/dLLDRnen4BtlhnXnIj9kGbDLaIn4qwHAs_H3gD1JwS5uPtVTh6raUmceod_ls0ii952YSi4VCszcthpnNZhFhQzL1QTdK_fBfU85khDRP_HGc2b-G8sMUsdq9-syhKLOkjIPgWwhr4svmAH4dg65QulSOmP6CpZldhz9ULsahxk9bxv2Y7Ym2GD7moKE30FESLBA307Lr2z0ePgWTKaYAkuS3BZtQFLLBQjCwkAgCkBEXJIXrpkwVGatDnSNtUvnlmz_7fOkmtho6uNVRPG0_JHNo80I8iHua1jHktTKnjlLySzVyG8rHR-nHWqzbRZbWtFfHsRx_66LTYpw7nbChIaiEXS9pd3EGDUXReYtWZ0BOnUVSS7WkjqqjzE6ac-RHL1W90GOM4uS1shH1eSccZ1w9YFtQLPofNYQcweozsZZDM4WLsciTNbajC3Keg-jNfveSbuVj7M6yWSLr_x7ro_l9IyiLoES-nrblmXasaNq21kYhrclmQuDPJ3VrxZMZDUELz-nYlhSOzsQ3woPLAWUsoJ9VccTf6aVEh67dRQLBF18N7594lObmceQO2Ovz0_ZXMfXPBbsifc3LwUd9vsz739G9iDgEvORKme1Ht5HIetFZBsajhF9CGigdD7aEU1jBRcny2p4s8Lqn8dSpewUC0Z2T90ZIIb4856BKf46mEHZBO9337WlVGaq2rEQMV1cczd3UIpRsrdrcG7FiZ1QCIYrkHt5QE-Qrs75VVjMC93UXHO7Vg3aZfmtdvBeJSzcWNvpofP0ZmQFGMCPgQNAP2x5DXvZsszBnDyh1TRE3WCa1KmgwKfij757Wpx1GchY1w8wnhHiY8pGVgqvo1hG9xcqZzcXH5PpkpiFrDd_Pd60uGtb9a_TWfxm3FEyxUqkJSecKn7eH19Yirihysa-QrLzDFUG6LYO6WeprZdr3NhRBUoFDUctjy5bFxaaGkW3-nS0
        @startuml ./puml-images/JsonScopeGenerationInstructions-solution-space
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

        class Problem <<(J, FF7700)>>

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
        this.answerExcerpt = ProgressingByTens.lookupAnswerExcerpt(this.request)
        /* **Command:Append To Context Window** ${this.resolver.executionContext} // notebooklm to verify if this is of any benefit
        */
        this.resolver.executionContext = `PATTERN: ${patternName}\n${ProgressingByTens.revealContextStatement(this.request)}`
        if (this.responder.verboseOutput) {
            console.log('assignThePatternNameAndEstablishTheContext:')
            console.log(this.resolver.executionContext)
            console.log("-------------------------------------------------------")
        }
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

    async parseTheAnswerExcerptAsSubjectJsonArray() {
        const subjects = await this.resolver.parseAnswerExcerptAsSubjectJsonArray(this.answerExcerpt)
        if (this.substantiations) 
            this.substantiations.push(...this.resolver.popSubstantiationsFromLastCommand())
        for (const subj of subjects) 
            subj.name = await this.resolver.generaliseAndAbstractToConcept(subj.name)
        if (this.substantiations) {
            if (this.responder.verboseOutput) {
                console.log('parseTheAnswerExcerptAsSubjectJsonArray substantiations:')
                console.log(this.resolver.substantiationsStack)
                console.log("-------------------------------------------------------")
            }
            this.substantiations.push(...this.resolver.popSubstantiationsFromLastCommand())
        }
        this.buildingBlock.subject.push(...subjects)
    }

    async determineBoundaryStateWithRespectTo(searchExpr: string, boundaryType: string): Promise<string|undefined> {
        /*
        dhamma practice is a training of the mind and more often than not, the states of significance are in relation to the mind's composite states. 

        the "progressing by tens" framework is all about the development of skillful qualities and the abandoning of unskillful qualities. most qualities are internal mental qualities, but there are a few external qualities (eg. admirable friendship, living in a civilised land, having done merit in the past etc.)

        given that all skillful qualities converge and are rooted in heedfulness. its would reduce the value & quality of all the artifacts if they all had an enter from state of "heedfulness". therefore, notebooklm is encouraged to look deeper at the "nearest branch" state (as opposed to root state) when identifying the enter from state.

        */
        let mindOrExternalState: string|undefined = undefined
        const determinantQuotations = await this.resolver.searchForMindOrExternalStateWithRespectTo(searchExpr, boundaryType)
        if (determinantQuotations?.length > 0) {
            mindOrExternalState = await this.resolver.parseMindOrExternalStateWithRespectTo(determinantQuotations, boundaryType)
                        determinantQuotations.forEach((quotation) => {
                this.quotationSet.add(quotation)
            })
        }
        return mindOrExternalState
    }

    async determineTargetPracititionerWithRespectTo(searchExpr: string): Promise<PractitionerKey[]> {
        /*
        the "progressing by tens" framework covers a spectrum of topics. some are suited for conviction and dhamma followers, whilst others are extremely advanced practices that are suited for non-returners. these patterns are like medical prescriptions; thus, if a practitioner doesnt suffer a given context, then they shouldnt follow the solution.

        */
        let practitioners: PractitionerKey[] = []
        const determinantQuotations = await this.resolver.searchForTargetPracitionersWithRespectTo(searchExpr)
        if (determinantQuotations?.length > 0) {
            practitioners = await this.resolver.parseTargetPractitionersWithRespectTo(determinantQuotations)
            determinantQuotations.forEach((quotation) => {
                this.quotationSet.add(quotation)
            })
        }
        return practitioners
    }

    protected getFocusAreaCombinations(focusAreas: string[]|undefined): string[][] {
        if (!focusAreas)
            return [[]]
        const ret: string[][] = [[]];
        for (const element of focusAreas) {
            const len = ret.length;
            for (let i = 0; i < len; i++) 
               ret.push([...ret[i], element]);
        }
        ret.sort((a, b) => b.length - a.length);
        return ret;
    }

    protected async determineEnterExitStatesAndPractitionerDetails() {
        const aspects = ["enter from", "exit to", "target practitioner"]
        for (const subj of this.buildingBlock.subject) {
            for (const aspect of aspects) {
                let subjFocusSearchExpr: string = subj.name
                const focusAreaCombinations = this.getFocusAreaCombinations(subj.focusArea)
                for (const combination of focusAreaCombinations) {
                    subjFocusSearchExpr = [subj.name, ...combination].join(" ")
                    if (aspect === "target practitioner") {
                        const practitioners = await this.determineTargetPracititionerWithRespectTo(subjFocusSearchExpr)
                        if (practitioners?.length > 0) {
                            subj.targetPractitioner.push(...practitioners)
                            break
                        }
                    } else {
                        const mindOrExternalState = await this.determineBoundaryStateWithRespectTo(subjFocusSearchExpr, aspect)
                        if (mindOrExternalState) {
                            if (aspect === "enter from")
                                subj.enterFromState = mindOrExternalState
                            else
                                subj.exitToState = mindOrExternalState
                            break
                        }
                    }
                }
                if (this.substantiations) {
                    if (this.responder.verboseOutput) {
                        console.log(`determineEnterExitStatesAndPractitionerDetails [${subjFocusSearchExpr} > ${aspect}] substantiations:`)
                        console.log(this.resolver.substantiationsStack)
                        console.log("-------------------------------------------------------")
                    }
                    this.substantiations.push(...this.resolver.popSubstantiationsFromLastCommand())
                }
            }
        }
    }

    protected async executeInstructions(): Promise<void> {
        if (this.responder.verboseOutput)
            console.log("starting [JsonScopeGenerationInstructions]")
        this.visualiseSolutionSpace()
        this.assignThePatternNameAndEstablishTheContext()
        this.considerExceptionalCasesForAnswerExcerptParsing()
        await this.parseTheAnswerExcerptAsSubjectJsonArray()
        await this.determineEnterExitStatesAndPractitionerDetails()
    }

    protected constructResolver(): ScopeWorkTaskResolvable {
        return new JsonScopeGenerationInstructions.RESOLVER_CTR()
    }

    protected checkPreConditions(): any {
        let ret = false
        if (this.request.progressionIndex > 0 && this.request.categoryKey)
            ret = true
        return ret
    }

    protected checkPostConditions(): any {
        let ret = false
        if (this.buildingBlock.subject.length > 0)
            ret = true
        return ret
    }
}

export function register() {
    PatternGenerator.INSTRUCTIONS_REGISTRY.set("Scope", JsonScopeGenerationInstructions)
}