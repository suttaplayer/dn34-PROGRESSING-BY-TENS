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