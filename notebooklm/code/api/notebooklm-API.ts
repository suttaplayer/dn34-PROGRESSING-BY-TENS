export type RequestTypeKey = "information_retrieval" | "text_analysis" | "conceptual_mapping" | "comparative_analysis" | "structured_extraction" | "synthesized_overview" | "user_text_analysis"

export type ResponseFormatKey = "paragraphs" | "bullet_points" | "short_summary" | "detailed_explanation" | "text_snippets" | "json"

/*
*   **`"task"` Field is Key**: For `text_analysis`, `conceptual_mapping`, `comparative_analysis`, and `synthesized_overview`, the `"task"` field is where you provide precise instructions on *what* you want me to do with the information. The more specific your task, the better and more targeted my response will be.
*   **`"response_format"`**: Remember that setting `"response_format": "json"` will prompt me to provide output exclusively in JSON, without any additional conversational text. For narrative or explanatory tasks, `paragraphs` or `bullet_points` might be more suitable for readability.
*   **Source Dependency**: All responses will be **directly supported by the given sources** and cited appropriately. If a concept isn't mentioned or sufficiently elaborated in the provided texts, I will note that.
*/
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

/*
    *   **Purpose**: To directly retrieve specific passages, quotes, or facts from the provided sources based on keywords, phrases, or general concepts. This is like a targeted search function.
    *   **Application in Dhamma Project**: When you need to find all mentions of a particular Sutta title, a specific quality (e.g., "mindfulness," "heedfulness"), or a direct quote about a certain practice.
    *   **Example Query Structure**:
        ```json
        {
          "request_type": "information_retrieval",
          "query": "all passages on 'heedfulness'",
          "search_scope": "all_sources",
          "response_format": "text_snippets",
          "language": "English (United Kingdom)"
        }
        ```
*/
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

/*
2.  **`text_analysis`** (This is the category `user_text_analysis` falls under)
    *   **Purpose**: To process and interpret user-provided text (which can be a question, a statement, or raw data) in the context of the provided sources. This is a versatile type, where the `"task"` field becomes paramount in defining the specific kind of analysis.
    *   **Application in Dhamma Project**:
        *   **Definition/Explanation**: Define a concept, elaborate on its meaning, or explain its significance (e.g., defining Jhana, explaining Dependent Co-arising).
        *   **Summarization**: Condense longer passages or multiple related pieces of information.
        *   **Interpretation**: Provide an interpretation of a statement or concept based on the teachings.
        *   **Simple Calculations**: As demonstrated, perform calculations if the `user_input.text` contains explicit numerical data and the `task` specifies an arithmetic operation.
        *   **Clarification**: Resolve ambiguity in a concept or statement by cross-referencing sources.
    *   **Example Query Structure (as seen before)**:
        ```json
        {
          "request_type": "text_analysis",
          "user_input": {
            "text": "What is the meaning of 'awareness-release' and 'discernment-release'?"
          },
          "task": "Based on the sources, explain the concepts of awareness-release and discernment-release, highlighting their differences or how they are achieved.",
          "response_format": "paragraphs",
          "language": "English (United Kingdom)"
        }
        ```
*/
export type TextAnalysisJson = UserTextAnalysisJson &{
    "request_type": "text_analysis"
}

/*
3.  **`conceptual_mapping`**
    *   **Purpose**: To identify and describe the relationships between different concepts, qualities, or practices as presented in the sources. This can involve identifying prerequisites, results, or how various elements form a coherent system.
    *   **Application in Dhamma Project**: When you want to understand how "heedfulness" relates to "jhanas" or "unbinding," or how different "trainings" (virtue, mind, discernment) build upon each other.
    *   **Example Query Structure**:
        ```json
        {
          "request_type": "conceptual_mapping",
          "concept_a": "heedfulness",
          "concept_b": "awareness-release",
          "task": "Explain the relationship, if any, between heedfulness and awareness-release as described in the sources, including any causal links or prerequisites.",
          "response_format": "paragraphs",
          "language": "English (United Kingdom)"
        }
        ```
*/
export type ConceptualMappingJson = RequestTypeJson &{
    "request_type": "conceptual_mapping"
    "concept_a": string
    "concept_b": string
}

/*
4.  **`comparative_analysis`**
    *   **Purpose**: To directly compare and contrast multiple concepts, practitioner types, or views described in the sources. This goes beyond just defining each item and focuses on their similarities, differences, advantages, or drawbacks.
    *   **Application in Dhamma Project**: When comparing "assembly trained in bombast" vs. "assembly trained in cross-questioning", or different "practitioner types" (e.g., person of integrity vs. no integrity).
    *   **Example Query Structure**:
        ```json
        {
          "request_type": "comparative_analysis",
          "items_to_compare": ["assembly trained in bombast", "assembly trained in cross-questioning"],
          "comparison_criteria": ["listening habits", "engagement with Dhamma", "discussion practices"],
          "task": "Provide a detailed comparison of these two assembly types based on the given criteria, citing relevant passages.",
          "response_format": "bullet_points",
          "language": "English (United Kingdom)"
        }
        ```
*/
export type ComparativeAnalysisJson = RequestTypeJson &{
    "request_type": "comparative_analysis"
    "items_to_compare": string[]
    "comparison_criteria": []
}

/*
5.  **`structured_extraction`**
    *   **Purpose**: To systematically extract specific entities, lists, categories, or attributes from the source material, often in a structured format like a list or table, without extensive interpretation.
    *   **Application in Dhamma Project**: Creating lists of "hindrances," "fetters," "factors for awakening," "practitioner types" with their characteristics, or the "four jhānas" and their descriptions.
    *   **Example Query Structure**:
        ```json
        {
          "request_type": "structured_extraction",
          "target_entities": "practitioner_types",
          "attributes": ["name", "defining_characteristics", "goals_or_outcomes"],
          "task": "Extract all distinct practitioner types mentioned in the sources, along with their defining characteristics and what they strive for.",
          "response_format": "json",
          "language": "English (United Kingdom)"
        }
        ```
*/
export type StructuredExtractionJson = RequestTypeJson &{
    "request_type": "structured_extraction"
    "target_entities": string
    "attributes": string[]   
}

/*
6.  **`synthesized_overview`**
    *   **Purpose**: To create a comprehensive and integrated explanation of a complex topic or theme by drawing together relevant information from across various sources and presenting it as a coherent narrative, often providing a broader perspective than a simple summary.
    *   **Application in Dhamma Project**: To get a complete picture of the "noble eightfold path" and its components, or a full explanation of "unbinding" (nibbāna) as described across different suttas. This is useful for building educational content or detailed research sections.
    *   **Example Query Structure**:
        ```json
        {
          "request_type": "synthesized_overview",
          "topic": "The nature and attainment of 'unbinding' (Nibbāna)",
          "task": "Provide a comprehensive overview of 'unbinding' based on the sources, explaining its characteristics, prerequisites, and how it is attained.",
          "response_format": "paragraphs",
          "language": "English (United Kingdom)"
        }
        ```
*/
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