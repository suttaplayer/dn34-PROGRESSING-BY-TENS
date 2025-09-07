import { ContextWorkTaskResolvable, JsonContextGenerationInstructions } from "./json-context-generation-instructions.ts";
import { JsonForcesGenerationInstructions, ForcesWorkTaskResolvable } from "./json-forces-generation-instructions.ts";
import { JsonProblemGenerationInstructions, ProblemWorkTaskResolvable } from "./json-problem-generation-instructions.ts";
import { JsonScopeGenerationInstructions, ScopeWorkTaskResolvable } from "./json-scope-generation-instructions.ts";
import { DeterminantQuotationString, PractitionerKey, ScopeJson, SubjectJson } from "./pattern-API.ts";
import { WorkTaskResolver } from "./pattern-generation-API.ts";

/*
purpose: provide notebooklm with a base abstraction which must be specialised for individual work tasks that are assosciated with the notebooklm "**Command:** annotation"
*/
class CommandResolver extends WorkTaskResolver {
    protected async executeQuery<Type>(cmd: Object): Promise<Type> {
        // notebooklm internal query execution ...
        // In a real NotebookLM environment, this would involve actual API calls.
        // For the purpose of this simulation and demonstrating the contract,
        // we will push a placeholder substantiation. The actual return
        // would come from the language model's processing.
        this.substantiationsStack.push("/* add rationale for query result here */")
        // NOTE: In a live NotebookLM environment, if Type is DeterminantQuotationString[],
        // a post-processing step here would strip any [source block_id] citations
        // from the quotation strings before returning, as per user's instruction.
        // The running example provides hardcoded results. For dynamic execution,
        // this would involve actual LM output based on 'cmd'.
        // For now, it will return an undefined/mocked value, but the focus is on the instruction comments.
        return (undefined as unknown) as Type
    }

    public async generaliseAndAbstractToConcept(term: string): Promise<string> {
        /*
        **Command:generalise & abstract to concept** the term if necessary. concepts play a key role in the causal-table. if the concept is too specific the causal-table will be small and of little benefit (due to simplicity) for the remaining work tasks. however, if the concept is over-generalised then the causal-table will be too large and again of little benefit (due to complexity). notebooklm needs to ensure that it can subsequently match on the concept as opposed to the specific term/expression for the benefit of down-stream work tasks

        * eg1, consider the subject: "people of integrity"
        1. "people of integrity" has 77 references in 6 source files
        2. "person of integrity" has 112 references in 7 source files
        3. "admirable friend" 43 references in 8 source files
        4. "noble ones" 776 references in 8 source files
        this.substantiationsStack.push("within the context of 'Associating with people of integrity', 'people of integrity', 'person of integrity', 'admirable friend' & 'noble ones' are all abstractions of .")

        * eg2, consider the subject: "faculty of conviction"
        1. "faculty of conviction" has 38 references in 4 source files
        2. "strength of conviction" has 11 references in 4 source files
        3. "conviction" has 450 references in 10 source files
        this.substantiationsStack.push("outside the context of then wings to awakening 'faculty of conviction', 'strength of conviction', 'conviction' are again all references of ")

        *   **Approach:** I will identify the given `term` and determine if a more general yet appropriate concept exists within the Buddhist scriptures that would still allow for precise matching in downstream tasks without being overly broad or narrow. I will aim for a conceptual level that maximizes utility for causal analysis.
        *   **Guidance Followed:** I will use the principles of conceptual abstraction to ensure the resultant concept is neither too specific (leading to small, simple causal tables) nor too general (leading to large, complex causal tables). The goal is a concept that is effective for matching in subsequent work tasks.
        *   **Substantiation (Example):** I will log the original term and the abstracted concept, providing a rationale for the choice, referencing potential alternative abstractions and why the chosen one is superior for the project's goals.
        */
        // CORRECTED: This method now calls executeQuery and relies on it for substantiation,
        // rather than pushing a hardcoded mock substantiation directly.
        const exeCommand = {
            commandType: "conceptual_mapping",
            parameters: {
                termToAbstract: term,
                targetConceptLevel: "optimal_for_causal_table",
                expectedFormat: "string",
                guidance: "Abstract the given term to a concept level that is neither too specific (resulting in small causal tables) nor too general (resulting in large causal tables). The abstracted concept must be suitable for subsequent matching in downstream work tasks. Justify the abstraction based on its utility for causal analysis within the 'progressing by tens' framework."
            }
        };
        return await this.executeQuery(exeCommand);
    }
}

class ScopeCommandResolver extends CommandResolver implements ScopeWorkTaskResolvable {

    public async parseAnswerExcerptAsSubjectJsonArray(answerExcerpt: string): Promise<SubjectJson[]> {
        /*
        the answerExcerpt must be parsed by:
        1. identifying a maximum of progressionIndex number of subjects from the answerExcerpt
        2. identifying optional focusArea(s) associated with that subject

        notebooklm must:
        1. **Command:parse** the answerExcerpt into SubjectJson objects. focusArea is optional can remain undefined if not applicable. assign "", "" & [] for enterFromState, exitToState & targetPractitioner respectively.
        *   **Approach:** I will use advanced natural language processing to **parse** the `answerExcerpt`. This involves identifying distinct concepts that represent subjects, and any modifying phrases that denote `focusArea` (e.g., "with regard to skillful qualities" for "Heedfulness"). I will then structure these into `SubjectJson` objects, initially leaving `enterFromState`, `exitToState`, and `targetPractitioner` as empty or default values as specified.
        *   **Guidance Followed:** I will strictly adhere to the instruction to identify distinct and sequential requisite conditions, different immediate outcomes, or varying `enterFromState`/`exitToState` as criteria for parsing separate `SubjectJson` objects. The `progressionIndex` will guide the maximum number of subjects to extract.
        *   **Substantiation (Example):** I will log my reasoning for how the excerpt was parsed, noting the identification of subjects and their associated focus areas, as demonstrated in the running example (e.g., "parsed as 1 subject & 1 focus area because `with regard to` denotes that the focusArea follows").
        */
        const exeCommand = {
            commandType: "structured_extraction",
            parameters: {
                textToParse: answerExcerpt,
                extractionTarget: "SubjectJson[]",
                expectedFormat: "{ name: string, focusArea?: string[] }[]",
                // GUIDANCE REMAINS CORRECTED (FROM PREVIOUS TURN) AND ALIGNS WITH JSDOC:
                guidance: "Identify distinct concepts that represent subjects from the answer excerpt, and any modifying phrases that denote 'focusArea' (e.g., 'with regard to skillful qualities'). Structure these into `SubjectJson` objects. Strictly adhere to the instruction to identify distinct and sequential requisite conditions, different immediate outcomes, or varying `enterFromState`/`exitToState` as criteria for parsing separate `SubjectJson` objects. The `progressionIndex` will guide the maximum number of subjects to extract. Initially, `enterFromState` and `exitToState` should be empty strings, and `targetPractitioner` an empty array. FocusArea is optional and can remain undefined if not applicable."
            }
        }
        return await this.executeQuery(exeCommand)
    }

    public async searchForMindOrExternalStateWithRespectTo(subjectAndForcesExpression: string, boundaryType: string): Promise<DeterminantQuotationString[]> {
        /*
        1. **Command:search** for determinant quotations from the ["*_nblm.txt"] sources:
        * on the subject and its associated focusArea(s)
        * select 1 if possible (or more when chained together) that best quotes that substantiates the concluded enter from or exit to state
        *   **Approach:** I will **search** the designated sources (AN, DN, KN, MN, SN) for determinant quotations that describe states or conditions directly preceding (for `enter from`) or resulting from (for `exit to`) the `subjectAndForcesExpression`. My search will prioritise explicit causal links or descriptions of mind/external states.
        *   **Guidance Followed:** For `enter from` states, I will "look deeper at the 'nearest branch' state (as opposed to root state)" to avoid over-generalisation (e.g., avoiding "heedfulness" if a more specific preceding condition like "complacency" or "intoxication" is evident). For `exit to` states, I will focus on "natural baton changes to another skillful quality" or explicit ending states.
        *   **Substantiation (Example):** I will log my reasoning for how the excerpt was parsed, noting the identification of subjects and their associated focus areas.
        */
        const exeCommand = {
            commandType: "information_retrieval",
            parameters: {
                query: subjectAndForcesExpression,
                sources: ["AN_nblm.txt", "DN_nblm.txt", "KN_Dhp_nblm.txt", "KN_Iti_nblm.txt", "KN_Khp_nblm.txt", "KN_StNp_nblm.txt", "KN_Thag_nblm.txt", "KN_Thig_nblm.txt", "KN_Ud_nblm.txt", "MN_nblm.txt", "SN_nblm.txt"],
                // contextHint is enhanced to include executionContext as agreed:
                contextHint: `${this.executionContext}. Identify the ${boundaryType} mind states or external states associated with the search expression.`,
                resultType: "DeterminantQuotationString[]"
            }
        }
        return await this.executeQuery(exeCommand)
    }

    public async parseMindOrExternalStateWithRespectTo(determinantQuotations: DeterminantQuotationString[], boundaryType: string): Promise<string> {
        /*
        2. **Command:parse** the selected quotation(s) to extract the enter from or exit to state as text
        *   **Approach:** From the identified `determinantQuotations`, I will **parse** and extract the most accurate and concise textual representation of the `enter from` or `exit to` state.
        *   **Guidance Followed:** I will ensure the extracted state is specific and aligns with the "nearest branch" or "ending state" logic described previously.
        *   **Substantiation (Example):** I will justify the selected state, explaining its relationship to the concept of the subject (e.g., "heedfulness is a composite state of the mind. 'complacent' would be the first state after transition from 'heedlessness'").
        */
        const guidance = boundaryType === "enter from" ?
            "Extract the 'nearest branch' condition or state that precedes or leads to the subject. Prioritize a specific preceding condition over general states like 'heedfulness' if a more direct link is present, as per instructions 'look deeper at the \"nearest branch\" state (as opposed to root state)'." :
            "Extract the ending state or 'natural baton change' to another skillful quality. Prioritize a specific outcome over general states like 'ending of the effluents' if a more direct transition is evident, as per instructions 'look more deeply at where there is a natural baton change to another skillful quality'."

        const exeCommand = {
            commandType: "structured_extraction",
            parameters: {
                textToParse: determinantQuotations.join("\n"),
                extractionTarget: boundaryType,
                expectedFormat: "string",
                guidance: guidance
            }
        }
        return await this.executeQuery(exeCommand)
    }

    public async searchForTargetPracitionersWithRespectTo(subjectAndForcesExpression: string): Promise<DeterminantQuotationString[]> {
        /*
        1. **Command:search** for quotations from the ["*_nblm.txt"] sources:
        * on the subject and its associated focusArea(s)
        * select 1 if possible (or more when chained together) that best quotes that substantiates the concluded target practitioner
        *   **Approach:** I will **search** the source texts for explicit or implicit mentions of practitioner types (from `PractitionerKey` enumeration) associated with the `subjectAndForcesExpression`. This search will consider the "medical prescription" analogy, ensuring the practice's suitability for different levels of practitioners (e.g., advanced practices for "non-returners" vs. foundational ones for "conviction-dhamma-followers").
        *   **Substantiation (Example):** I will explain how the quotations indicate the target audience, referencing specific phrases or contexts (e.g., "provides a clear indication by the buddha himself at who the 'heedfulness' message was targetted at").
        */
        const exeCommand = {
            commandType: "information_retrieval",
            parameters: {
                query: subjectAndForcesExpression,
                sources: ["AN_nblm.txt", "DN_nblm.txt", "KN_Dhp_nblm.txt", "KN_Iti_nblm.txt", "KN_Khp_nblm.txt", "KN_StNp_nblm.txt", "KN_Thag_nblm.txt", "KN_Thig_nblm.txt", "KN_Ud_nblm.txt", "MN_nblm.txt", "SN_nblm.txt"],
                // contextHint is enhanced to include executionContext as agreed:
                contextHint: `${this.executionContext}. Identify individuals in PractitionerKey that are associated with the search expression.`,
                resultType: "DeterminantQuotationString[]"
            }
        }
        return await this.executeQuery(exeCommand)
    }

    public async parseTargetPractitionersWithRespectTo(determinantQuotations: DeterminantQuotationString[]): Promise<PractitionerKey[]> {
        /*
        2. **Command:parse** the selected quotation(s) to extract the target pracitioner as an array of PractitionerKey
        *   **Approach:** I will **parse** the `determinantQuotations` to extract an array of `PractitionerKey` values that accurately reflect the target audience for the subject.
        *   **Guidance Followed:** I will interpret the context to identify the most appropriate practitioner categories, rather than simply listing all possible practitioners if the nuances suggest a more specific application.
        *   **Substantiation (Example):** I will justify the selected practitioner types, explaining why certain categories are included or excluded based on the suitability of the practice, as outlined in the running example ("although heedfulness is applicable to all practitioners, it is specifically applicable to leaners (ie. one-in-training)").
        */
        const exeCommand = {
            commandType: "structured_extraction",
            parameters: {
                textToParse: determinantQuotations.join("\n"),
                extractionTarget: "target practitioners",
                expectedFormat: "string[]", // Changed to string[] to reflect array of PractitionerKey
                guidance: "Identify all relevant practitioner types from the `PractitionerKey` enumeration ('conviction-dhamma-follower', 'stream-enterer', 'once-returner', 'non-returner') that are explicitly or implicitly mentioned as suitable for the subject. Consider the 'medical prescription' analogy; if a practice is too advanced or basic, narrow the target practitioner accordingly. Return as a JSON array of strings."
            }
        }
        return await this.executeQuery(exeCommand)
    }
}

class ProblemCommandResolver extends CommandResolver implements ProblemWorkTaskResolvable {

    public async composeProblemStatement(subjects: SubjectJson[]): Promise<string> {
        /*
        **Command:compose problem statement** using the following steps:
        1. **Analyze the composite states:** Review the `enterCompositeStates` and `exitCompositeStates` maps provided.
        2. **Synthesize a unified theme:** If there are multiple subjects, identify a single, overarching theme or concept that connects their respective state transitions. The goal is to create one coherent problem statement that encompasses all subjects, rather than multiple separate statements.
        3. **Formulate the question:** Using language found in the sources, compose the problem statement. A suitable format is: "How do you abandon [unified `enterFromState` theme] and enter and remain in [unified `exitToState` theme]?"
        * For example, when dealing with multiple unskillful states to be abandoned, you might synthesize them under a broader term like "unskillful qualities". Similarly, multiple skillful states to be developed could be unified under "skillful qualities".
        * An example from the sources is the "miracle of instruction": 'Let go of this, enter and remain in that'.
        *   **Approach:** I will **synthesise a unified theme** from the `enterFromState` and `exitToState` of all subjects, especially if multiple subjects exist, aiming for a single, coherent problem statement.
        *   **Guidance Followed:** I will formulate the problem statement as a question: "How do you abandon [unified `enterFromState` theme] and enter and remain in [unified `exitToState` theme]?" I will draw on language and common phrases from the sources to maintain authenticity (e.g., "abandon", "enter and remain in").
        *   **Substantiation (Example):** I will clarify the semantic choices made in composing the statement, particularly regarding terms like "abandon" and "enter and remain in," and their typical usage in the sources.
        */
        const exeCommand = {
            commandType: "text_analysis",
            parameters: {
                subjects: subjects,
                targetAnswer: this.executionContext,
                extractionTarget: "problem statement",
                expectedFormat: "string",
                guidance: "Compose a problem statement for the pattern using the enter & exit states of the subjects. If there are multiple subjects, synthesize a single, overarching theme from their respective state transitions. Formulate as a question: 'How do you abandon [unified enterFromState theme] and enter and remain in [unified exitToState theme]?'. Draw on language from the sources like 'abandon' or 'enter and remain in'. Ensure the statement is coherent and suitable for the target answer/pattern context."
            }
        }
        return await this.executeQuery(exeCommand)
    }
}

class ContextCommandResolver extends CommandResolver implements ContextWorkTaskResolvable {

    public async searchForContextWithRespectTo(subjects: SubjectJson[]): Promise<DeterminantQuotationString[]> {
        /*
        **Command:search for context**
        *   **Approach:** I will **search** the designated sources (AN, DN, KN, MN, SN) using the `subjects` (including `name`, `focusArea`, `targetPractitioner`, and `enterFromState`) as keywords. My goal will be to retrieve quotations that describe the background conditions, symptoms, or prevailing circumstances that necessitate the pattern's solution. I will consider the `executionContext` to maintain the overall theme and pattern context.
        *   **Substantiation (Example):** I will log the query parameters and the rationale for the search, similar to other `search` commands.
        */
        const searchKeywords = subjects.map(s => [s.name, ...(s.focusArea || []), s.targetPractitioner.join(" "), s.enterFromState]).flat().filter(Boolean).join(" ");
        const query = `${this.executionContext} ${searchKeywords}`;

        const exeCommand = {
            commandType: "information_retrieval",
            parameters: {
                query: query,
                sources: ["AN_nblm.txt", "DN_nblm.txt", "KN_Dhp_nblm.txt", "KN_Iti_nblm.txt", "KN_Khp_nblm.txt", "KN_StNp_nblm.txt", "KN_Thag_nblm.txt", "KN_Thig_nblm.txt", "KN_Ud_nblm.txt", "MN_nblm.txt", "SN_nblm.txt"],
                // contextHint is enhanced to include executionContext as agreed:
                contextHint: `Identify background conditions, symptoms, or prevailing circumstances necessitating the pattern's solution, related to the subjects' states and practitioners. Overall pattern context: ${this.executionContext}.`,
                resultType: "DeterminantQuotationString[]"
            }
        };
        return await this.executeQuery(exeCommand);
    }

    public async composeContextStatement(subjects: SubjectJson[], determinantQuotations: DeterminantQuotationString[]): Promise<string[]> {
        /*
        **Command:compose context statement** by framing it as a diagnosis, using the "medical prescription" analogy. The context should describe the "symptoms" the practitioner is experiencing.
        1. **Identify the 'symptoms':** The primary symptoms are the `enterFromState`(s) of the subjects in the Scope.
        2. **Describe the situation:** Formulate sentences describing a situation where a practitioner is experiencing these 'symptoms.' For example: "You find yourself in a state of [enterFromState], characterized by [supporting details from sources about that state]."
        3. **State the 'diagnosis':** Conclude by stating that this pattern applies when one is experiencing this specific condition. For example, the sources describe a mind "undeveloped", "sullied", or "overcome with passion" as conditions requiring a remedy.
        4. return in point form (without formatting) with each point as separate array element
        *   **Approach:** I will **compose a context statement** by framing it as a "medical diagnosis". I will identify the `enterFromState`(s) of the subjects as the primary "symptoms" and integrate supporting details from the `determinantQuotations` to describe the practitioner's situation.
        *   **Guidance Followed:** I will formulate sentences that describe the problematic state the practitioner is experiencing (e.g., "You find yourself in a state of...") and conclude with a statement indicating when this pattern is applicable. I will draw on examples from the sources that describe minds as "undeveloped," "sullied," or "overcome with passion" as conditions requiring remedy. The output will be in point form, as specified.
        *   **Substantiation (Example):** I will clearly link each point in the context statement to the relevant `enterFromState` and explanatory phrases from the sources, justifying how these elements contribute to the "medical diagnosis" analogy (e.g., "The `enterFromState` for heedfulness is `heedlessness`.", "The sources directly link the `undeveloped mind` to being unpliant and causing great harm...").
        */
        const exeCommand = {
            commandType: "text_analysis",
            parameters: {
                subjects: subjects,
                determinantQuotations: determinantQuotations,
                extractionTarget: "context statement",
                expectedFormat: "string[]",
                guidance: `Compose a context statement as a "medical diagnosis". Identify the 'enterFromState' of the subjects as primary symptoms. Formulate sentences describing a practitioner's situation (e.g., "You find yourself in a state of [enterFromState], characterized by [supporting details]"). Conclude when this pattern is applicable. Use examples like "undeveloped mind", "sullied", "overcome with passion" from sources. Output in point form as a string array.`
            }
        };
        return await this.executeQuery(exeCommand);
    }
}

class ForcesCommandResolver extends CommandResolver implements ForcesWorkTaskResolvable {

    public async searchForForcesWithRespectTo(subjects: SubjectJson[]): Promise<DeterminantQuotationString[]> {
        /*
        **Command:search for forces**
        *   **Approach:** I will **search** the designated sources (AN, DN, KN, MN, SN), using the `subjects` (`name`, `focusArea`, `targetPractitioner`, and `enterFromState`) and the `executionContext` to identify and retrieve quotations that highlight contradictory considerations, difficulties, or challenges in resolving the problem statement. These quotations will explain *why* a simple solution is insufficient.
        *   **Substantiation (Example):** I will log the query parameters and the rationale for the search.
        */
        const searchKeywords = subjects.map(s => [s.name, ...(s.focusArea || []), s.targetPractitioner.join(" "), s.enterFromState]).flat().filter(Boolean).join(" ");
        const query = `${this.executionContext} ${searchKeywords}`;

        const exeCommand = {
            commandType: "information_retrieval",
            parameters: {
                query: query,
                sources: ["AN_nblm.txt", "DN_nblm.txt", "KN_Dhp_nblm.txt", "KN_Iti_nblm.txt", "KN_Khp_nblm.txt", "KN_StNp_nblm.txt", "KN_Thag_nblm.txt", "KN_Thig_nblm.txt", "KN_Ud_nblm.txt", "MN_nblm.txt", "SN_nblm.txt"],
                // contextHint is enhanced to include executionContext as agreed:
                contextHint: `Identify contradictory considerations, difficulties, or challenges that explain why a simple solution to the problem statement (from executionContext) is insufficient, related to the subjects' states and practitioners. Overall pattern context: ${this.executionContext}.`,
                resultType: "DeterminantQuotationString[]"
            }
        };
        return await this.executeQuery(exeCommand);
    }

    public async composeForcesStatement(subjects: SubjectJson[], determinantQuotations: DeterminantQuotationString[]): Promise<string[]> {
        /*
        **Command:compose forces statement** by explaining why a simple or naive solution is insufficient, thereby justifying the pattern's specific "prescription."
        1. **Identify the core conflict:** The central conflict is the difficulty of transitioning from the `enterFromState` to the `exitToState`.
        2. **Describe countervailing forces:** Explain what makes this transition challenging. This could include the allure of the negative state (e.g., the "allure of sensuality"), the subtle nature of the problem (e.g., how craving ensnares like a "tangled skein"), or common misunderstandings that lead to failure. For instance, a "slack going-forth kicks up all the more dust".
        3. **Justify the pattern:** Conclude by explaining why a more nuanced approach—the pattern's Solution—is necessary to resolve these complexities, thereby explaining why a simple or naive approach is inadequate. The output will be in point form.
        *   **Approach:** I will **compose a forces statement** that elucidates the core conflict in transitioning from the `enterFromState` to the `exitToState`. I will explain the "countervailing forces" that make this transition challenging, such as the allure of negative states, the subtle nature of the problem, or common misunderstandings.
        *   **Guidance Followed:** I will use descriptive language from the sources (e.g., "allure of sensuality", "tangled skein") to illustrate these forces. The statement will conclude by justifying why the pattern's specific solution is necessary to resolve these complexities, thereby explaining why a simple or naive approach is inadequate. The output will be in point form.
        *   **Substantiation (Example):** I will provide a detailed explanation for each force, linking it back to the initial state of heedlessness and the challenges it presents, referencing the specific source quotations as evidence (e.g., "The initial state of `heedlessness` is linked to an undeveloped and unpliant mind, making it vulnerable to various defilements and rendering simple solutions ineffective.").
        */
        const exeCommand = {
            commandType: "text_analysis",
            parameters: {
                subjects: subjects,
                determinantQuotations: determinantQuotations,
                extractionTarget: "forces statement",
                expectedFormat: "string[]",
                guidance: `Compose a forces statement explaining why simple solutions are insufficient. Identify the core conflict in transitioning from 'enterFromState' to 'exitToState'. Describe countervailing forces like allure of negative states (e.g., "allure of sensuality"), subtle problems (e.g., "tangled skein" of craving), or common misunderstandings. Justify why the pattern's Solution is necessary. Output in point form as a string array.`
            }
        };
        return await this.executeQuery(exeCommand);
    }
}

export function register() {
    JsonScopeGenerationInstructions.RESOLVER_CTR = ScopeCommandResolver
    JsonProblemGenerationInstructions.RESOLVER_CTR = ProblemCommandResolver
    JsonContextGenerationInstructions.RESOLVER_CTR = ContextCommandResolver
    JsonForcesGenerationInstructions.RESOLVER_CTR = ForcesCommandResolver
}