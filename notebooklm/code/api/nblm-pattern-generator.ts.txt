import { AbtractPatternGenerator, CausalTableWorkTaskBuilder, DeterminantQuotationString, ProblemWorkTaskBuilder, ScopeWorkTaskBuilder, SubjectJson } from "./pattern-API.ts";
import { ProgressingByTens } from "./pbt-utils.ts";

export type RequestTypeKey = "information_retrieval" | "text_analysis" | "conceptual_mapping" | "comparative_analysis" | "structured_extraction" | "synthesized_overview" | "user_text_analysis"

export type ResponseFormatKey = "paragraphs" | "bullet_points" | "short_summary" | "detailed_explanation" | "text_snippets" | "json"

export type RequestTypeJson = {
    "query_id"?: string
    "request_type": RequestTypeKey
    "task": string
    "response_format"?: ResponseFormatKey
    "language"?: string
}

export type SearchTypeJson = {
    "search_scope": string[] | "all_sources"
    "query"?: string
    subject?: string
}

export type InformationRetrievalJson = RequestTypeJson & SearchTypeJson &{
    "request_type": "information_retrieval"
}

export type UserTextAnalysisJson = RequestTypeJson &{
    "request_type": "user_text_analysis"
    "user_input": {
        "text": string
        "object"?: {}    // perhaps json is also supported as user input?
    }
}

export type TextAnalysisJson = UserTextAnalysisJson &{
    "request_type": "text_analysis"
}

export type ConceptualMappingJson = RequestTypeJson &{
    "request_type": "conceptual_mapping"
    "concept_a": string
    "concept_b": string
}

export type ComparativeAnalysisJson = RequestTypeJson &{
    "request_type": "comparative_analysis"
    "items_to_compare": string[]
    "comparison_criteria": []
}

export type StructuredExtractionJson = RequestTypeJson &{
    "request_type": "structured_extraction"
    "target_entities": string
    "attributes": string[]   
}

export type SynthesizedOverviewJson = RequestTypeJson &{
    "request_type": "synthesized_overview"
    "topic": string
}

export type ResponseJson = {}

export interface ContentGenerator {
    generateContent(req: RequestTypeJson|SearchTypeJson): Promise<ResponseJson|string>
}

export class NotebookLmModel implements ContentGenerator {
    public async generateContent(req: RequestTypeJson|SearchTypeJson): Promise<ResponseJson|string> {
        let response: ResponseJson = {}
        /*
            **NotebookLM Task**
                1. **Command:generate** implementation which takes a request as an argument and then awaits for the actual content generation in the specified request format. finally, store the result in the response variable 
        */
        return response
    }
}


export class NotebookLmScopeWorkTaskBuilder extends ScopeWorkTaskBuilder {
    private patternName: string 
    private indexKey: string
    private breadcrumbLabel: string
    private answerExcerpt: string 
    private pbtContent: string

    constructor(key: string, responder: AbtractPatternGenerator) {
        super(key, responder)
        this.patternName = ProgressingByTens.config.patternName[this.responder.request.categoryKey][this.responder.request.progressionIndex-1]
        this.indexKey = ProgressingByTens.config.topic.progressionKey[this.responder.request.progressionIndex-1]
        this.breadcrumbLabel = ProgressingByTens.config.topic.label[this.responder.request.progressionIndex-1]
        this.answerExcerpt = ProgressingByTens.config.answerExcerpt[this.responder.request.categoryKey][this.responder.request.progressionIndex-1]
    }

    private setProgressionByTensContext() {
        this.pbtContent = `pattern "${this.patternName}", has as its originating context:\n\tWhich ${this.indexKey} ${this.breadcrumbLabel}?\n${this.answerExcerpt}`
    }

    private parseSubjectsFromAnswerExcerpt():  SubjectJson[] {
        const numberOfSubjects = this.responder.request.progressionIndex
        const expression = this.answerExcerpt
        const storage = this.responder.response.buildingBlocks["Scope"].subject // array
        const subjectsMap = new Map<string, string[]|undefined>()
        if (numberOfSubjects === 2 && this.responder.request.categoryKey === "helpful") { // Mindfulness & alertness
            subjectsMap.set("Mindfulness & alertness", undefined)
            subjectsMap.set("alertness", undefined)
        } else {
            /*  **Command:notebooklm_API::parse-text**: ${expression} into ${numberOfSubjects} of subjects with an focusArray of areas
            
                eg. Heedfulness with regard to skillful qualities
                    subject = "Heedfulness"
                        focus = ["skillful qualities"]
            */
            subjectsMap.set("Heedfulness", ["skillful qualities"]) // hard-coded exampple
        }
       for (const subject of subjectsMap.keys()) {
            const subjectJson = this.createSubjectJson(subject, subjectsMap.get(subject))
            storage.push(subjectJson)
       }
       return storage
    }

    // can be an internal mind state or an external state (eg. living in a civilised land)
    private determineSubjectsEnterFromState(subjectJson: SubjectJson) {
        const searchResults: DeterminantQuotationString[] = [] // search for best enter from [previous] state quotations
        /*  **Command:notebooklm_API::search-for-quotations** ${subjectJson.name} in the context of transitioning from mind states or external states

            eg. "[dont] ever let yourself get complacent when the ending of effluents is still unattained"
        */
       searchResults.push("[dont] ever let yourself get complacent when the ending of effluents is still unattained") // hard-coded example
        /*  **Command:notebooklm_API::parse-text** ${searchResults[0]} for from states

            eg. "complacent" is the determinant
        */
        subjectJson.enterFromState = "complacent" // hard-coded example
        searchResults.forEach((v) => {this.quotationset.add(v)})
    }

    // can be an internal mind state or an external state (eg. disputes)
    private determineSubjectsExitToState(subjectJson: SubjectJson) {
        const searchResults: DeterminantQuotationString[] = [] // search for best exit to [next] state quotations
        /*  **Command:notebooklm_API::search-for-quotations** ${subjectJson.name} in the context of transitioning to mind states or external states

            eg. "[dont] ever let yourself get complacent when the ending of effluents is still unattained"
        */
       searchResults.push("[dont] ever let yourself get complacent when the ending of effluents is still unattained") // hard-coded example
        /*  **Command:notebooklm_API::parse-text** ${searchResults[0]} for from states

            eg. "effluent-free" is the determinant
        */
        subjectJson.enterFromState = "effluent-free" // hard-coded example
        searchResults.forEach((v) => {this.quotationset.add(v)})
    }

    // 1 or more of: "conviction-dhamma-follower" | "stream-enterer" | "once-returner" | "non-returner"
    private determineSubjectsTargetPractitioner(subjectJson: SubjectJson) {
        const searchResults: DeterminantQuotationString[] = [] // search for best target practitioner
        /*  **Command:notebooklm_API::search-for-quotations** ${subjectJson.name} in the context of the type of practitioner the quotation is aimed at

            eg. "Now, then, monks, I exhort you: All fabrications are subject to ending & decay..."
        */
        searchResults.push("Now, then, monks, I exhort you: All fabrications are subject to ending & decay. Reach consummation through heedfulness.' That was the Tathāgata's last statement [to a group of noble monks the most backward of which was a stream-enterer]")
        /*  **Command:notebooklm_API::parse-text** ${searchResults[0]} for the types of practitioner the quotation is aimed at

            eg. ["stream-enterer", "once-returner", "non-returner"] the "the most backward" is the determinant
        */
        subjectJson.targetPractitioner = ["stream-enterer", "once-returner", "non-returner"]
        searchResults.forEach((v) => {this.quotationset.add(v)})
    }

    public build() {
        this.setProgressionByTensContext()
        const subjects = this.parseSubjectsFromAnswerExcerpt()
        for (const subject of subjects) {
            this.determineSubjectsEnterFromState(subject)
            this.determineSubjectsExitToState(subject)
            this.determineSubjectsTargetPractitioner(subject)
        }
        super.build()
    }
}


export class NotebookLmPatternGenerator extends AbtractPatternGenerator {
    public static CONTENT_GENERATOR = new NotebookLmModel()


    static {
        AbtractPatternGenerator.BUILDER_REGISTRY.set("Scope", ScopeWorkTaskBuilder)
        AbtractPatternGenerator.BUILDER_REGISTRY.set("Problem", ProblemWorkTaskBuilder)
        AbtractPatternGenerator.BUILDER_REGISTRY.set("Causal-Table", CausalTableWorkTaskBuilder)
    }
}

// const responder = new NotebookLmPatternGenerator({progressionIndex: 1, categoryKey: "helpful"})
// responder.generate()
// console.log(responder.response)