// Conceptual Codification of ScopeWorkTaskBuilder and Helper Logic
// This represents an inferred implementation based on source documents and observed system behavior.

import {
  UserPatternRequestJson,
  PatternResponseJson,
  SubjectJson,
  PractitionerKey,
  DeterminantQuotationString,
  WorkTaskKey,
  // Assuming AbstractWorkTaskBuilder and AbtractPatternGenerator base classes are in pattern-API.ts.txt
} from "./pattern-API.ts"; // Fictional path, for conceptual clarity

import { ProgressingByTens } from "./pbt-utils.ts"; // Fictional path, for conceptual clarity

// --- Conceptual Helper Functions ---

/**
 * Simulates searching for quotations in the source files.
 * In a real system, this would involve a complex search API against the provided text sources.
 * For this conceptual codification, it's a placeholder returning relevant quotes based on the query.
 *
 * @param query The search query string.
 * @param context The specified search context (e.g., "mind states", "practitioner types").
 * @returns A Promise resolving to an array of relevant quotation strings.
 */
async function simulatedSearchForQuotes(
  query: string,
  context: "mind states" | "external states" | "practitioner types"
): Promise<DeterminantQuotationString[]> {
  // This is a manual simulation of search results for the 'Concentration' subject
  // and its associated states/practitioners based on the provided AN_nblm.txt source.

  const lowerQuery = query.toLowerCase();
  const foundQuotes: DeterminantQuotationString[] = [];

  // Simulate search for Enter From State: "secluded from sensuality & unskillful qualities"
  if (lowerQuery.includes("concentration") && lowerQuery.includes("secluded from sensuality & unskillful qualities")) {
      foundQuotes.push("There is the case where an individual, quite secluded from sensuality, secluded from unskillful qualities, enters & remains in the first jhāna: rapture & pleasure born of seclusion, accompanied by directed thought & evaluation. He savors that, longs for that, finds satisfaction through that. Staying there—fixed on that, dwelling there often, not falling away from that—then when he dies he reappears in conjunction with the Devas of Brahmā's Retinue. The Devas of Brahmā's Retinue, monks, have a lifespan of an eon. A run-of-the-mill person having stayed there, having used up all the lifespan of those devas, goes to hell, to the animal womb, to the state of the hungry ghosts. But a disciple of the Blessed One, having stayed there, having used up all the lifespan of those devas, is unbound right in that state of being. This, monks, is the difference, this the distinction, this the distinguishing factor, between an educated disciple of the noble ones and an uneducated run-of-the-mill person, when there is a destination, a reappearing." [AN_nblm.txt, 1]);
  }

  // Simulate search for Exit To State: "effluent-free awareness-release & discernment-release"
  if (lowerQuery.includes("concentration") && lowerQuery.includes("effluent-free awareness-release & discernment-release")) {
      foundQuotes.push("He attains—whenever he wants, without strain, without difficulty—the four jhānas that are heightened mental states, pleasant abidings in the here & now. With the ending of effluents—he remains in the effluent-free awareness-release & discernment-release, having directly known & realized them for himself right in the here & now. I neither agree with you, brahman, nor do I criticize you. I declare a person endowed with these four qualities to be one of great discernment, a great man." [AN_nblm.txt, 4]);
  }

  // Simulate search for Target Practitioner
  if (lowerQuery.includes("concentration") && lowerQuery.includes("practitioner")) {
      foundQuotes.push("But a disciple of the Blessed One, having stayed there, having used up all the lifespan of those devas, is unbound right in that state of being. This, monks, is the difference, this the distinction, this the distinguishing factor, between an educated disciple of the noble ones and an uneducated run-of-the-mill person, when there is a destination, a reappearing." [AN_nblm.txt, 1]);
      foundQuotes.push("He attains—whenever he wants, without strain, without difficulty—the four jhānas that are heightened mental states, pleasant abidings in the here & now. With the ending of effluents—he remains in the effluent-free awareness-release & discernment-release, having directly known & realized them for himself right in the here & now. I neither agree with you, brahman, nor do I criticize you. I declare a person endowed with these four qualities to be one of great discernment, a great man." [AN_nblm.txt, 4]);
      foundQuotes.push("Now, when a disciple of the noble ones is consummate in virtue in this way, guards the doors to his sense faculties in this way, knows moderation in eating in this way, is devoted to wakefulness in this way, is endowed with seven qualities in this way, and obtains at will—without trouble or difficulty—the four jhānas that constitute heightened awareness and a pleasant abiding in the here & now in this way, then he is called a disciple of the noble ones who follows the practice for one in training, whose eggs are unspoiled, who is capable of breaking out, capable of awakening, capable of attaining the supreme rest from the yoke." [AN_nblm.txt, 7]);
  }

  return foundQuotes;
}

/**
 * Conceptual parser for extracting state or practitioner information from a quotation.
 * This function performs internal text analysis to identify relevant phrases.
 *
 * @param quote The quotation string to parse.
 * @param type The type of information to extract ("enterFromState", "exitToState", "targetPractitioner").
 * @param subjectName The name of the subject.
 * @param focusAreas Optional focus areas of the subject.
 * @returns The extracted state/practitioner string(s) or undefined if not found.
 */
function conceptualParseQuote(
  quote: DeterminantQuotationString,
  type: "enterFromState" | "exitToState" | "targetPractitioner",
  subjectName: string,
  focusAreas: string[] | undefined
): string | PractitionerKey[] | undefined {
  const lowerQuote = quote.toLowerCase();

  if (type === "enterFromState") {
    const enterFromKeywords = [
      "secluded from sensuality, secluded from unskillful qualities",
      "quite secluded from sensuality, secluded from unskillful qualities", // More specific match
      "abandoning unskillful qualities",
      // ... other potential "enterFromState" phrases
    ];
    for (const keyword of enterFromKeywords) {
      if (lowerQuote.includes(keyword.toLowerCase())) {
        return keyword; // Return the exact keyword as the state
      }
    }
  } else if (type === "exitToState") {
    const exitToKeywords = [
      "effluent-free awareness-release & discernment-release",
      "ending of effluents",
      "unbound right in that state of being",
      "cessation of stress",
      // ... other potential "exitToState" phrases
    ];
    for (const keyword of exitToKeywords) {
      if (lowerQuote.includes(keyword.toLowerCase())) {
        return keyword; // Return the exact keyword as the state
      }
    }
  } else if (type === "targetPractitioner") {
    const practitionerMap: { [key: string]: PractitionerKey[] } = {
      "conviction-dhamma-follower": ["conviction-dhamma-follower"],
      "stream-enterer": ["stream-enterer"],
      "once-returner": ["once-returner"],
      "non-returner": ["non-returner"],
      "disciple of the noble ones": ["conviction-dhamma-follower", "stream-enterer", "once-returner", "non-returner"],
      "one in training": ["conviction-dhamma-follower", "stream-enterer", "once-returner", "non-returner"],
      "great man": ["non-returner"], // Implies a highly advanced practitioner
      // "uneducated run-of-the-mill person" would indicate *not* a target practitioner
    };

    let identifiedPractitioners: PractitionerKey[] = [];
    for (const keyword in practitionerMap) {
      if (lowerQuote.includes(keyword.toLowerCase())) {
        identifiedPractitioners = identifiedPractitioners.concat(practitionerMap[keyword]);
      }
    }
    return Array.from(new Set(identifiedPractitioners)); // Deduplicate
  }
  return undefined;
}

/**
 * Parses the raw text (answerExcerpt or patternName) to identify subjects and their focus areas.
 * This function includes the *hypothesized defective logic* related to the `answerExcerpt` retrieval.
 *
 * @param text The text to parse for subjects and focus areas.
 * @param progressionIndex The progression index, used to limit the number of subjects (max progressionIndex).
 * @returns An array of `SubjectJson` objects with initial fields.
 */
function parseAnswerExcerptForSubjects(
  text: string,
  progressionIndex: number
): SubjectJson[] {
  const subjects: SubjectJson[] = [];

  // --- HYPOTHESIZED DEFECTIVE LOGIC IN ACTION ---
  // The system's previous output for "penetrate", progression 4, suggests that the
  // `patternName` string itself was parsed to extract the subject "Concentration"
  // and its focus areas. This implies `rawAnswerExcerpt` (e.g., "Dhammas are hard to penetrate: one, two,...")
  // was deemed unsuitable or missed, leading to a fallback.
  // We simulate this parsing for the specific patternName observed.

  if (text === "Concentration in decline, stability, distinction & penetration") {
    subjects.push({
      name: "Concentration",
      focusArea: ["in decline", "stability", "distinction", "penetration"],
      enterFromState: "", exitToState: "", targetPractitioner: [] // Initial empty fields
    });
  }
  // This section would need more general logic if the `text` parameter could be
  // other `answerExcerpt` strings (e.g., "Heedfulness with regard to skillful qualities").
  // For the 'Heedfulness' example:
  // if (text === "Heedfulness with regard to skillful qualities") {
  //     subjects.push({ name: "Heedfulness", focusArea: ["with regard to skillful qualities"], ... });
  // }
  // --- END HYPOTHESIZED DEFECTIVE LOGIC ---

  // Ensure max progressionIndex subjects, although for 'penetrate',progression 4, there's only one.
  return subjects.slice(0, progressionIndex);
}

/**
 * Generalizes and abstracts a subject name if necessary.
 * As per manual, to improve causal-table utility.
 *
 * @param name The subject name.
 * @returns A generalized name, or the original if no generalization is needed.
 */
function generalizeAndAbstractSubjectName(name: string): string {
  // For "Concentration", it's already a suitable general term.
  // Example from manual: "people of integrity" -> "person of integrity"
  const abstractions: { [key: string]: string } = {
    "people of integrity": "person of integrity",
    "admirable friend": "person of integrity",
    // Add more mappings as the system learns or is updated
  };
  return abstractions[name.toLowerCase()] || name;
}

/**
 * Internal check to determine if a retrieved quote array contains sufficient
 * and relevant information to infer the required state or practitioner type.
 * This is the logic you specifically requested to investigate.
 *
 * @param quotes An array of quotation strings to evaluate.
 * @param type The type of information being substantiated ("enterFromState", "exitToState", "targetPractitioner").
 * @param subjectName The subject's name (for contextual relevance).
 * @param focusAreas Optional array of focus areas (for contextual relevance).
 * @returns The most relevant `DeterminantQuotationString` or `undefined` if none substantiates the claim.
 */
function doesQuoteSubstantiate(
  quotes: DeterminantQuotationString[],
  type: "enterFromState" | "exitToState" | "targetPractitioner",
  subjectName: string,
  focusAreas: string[] | undefined
): DeterminantQuotationString | undefined {
  const lowerSubject = subjectName.toLowerCase();
  const lowerFocusAreas = focusAreas ? focusAreas.map(fa => fa.toLowerCase()) : [];

  for (const quote of quotes) {
    const lowerQuote = quote.toLowerCase();

    // Basic relevance check: The quote should ideally mention the subject or a closely related concept.
    // For "Concentration", related terms like "jhāna", "mind" are relevant.
    let isSubjectRelated = lowerQuote.includes(lowerSubject) || lowerQuote.includes("jhāna") || lowerQuote.includes("mind");
    if (!isSubjectRelated) continue;

    if (type === "enterFromState") {
      // Look for phrases describing precursors, conditions, or initial states.
      // Prioritise "nearest branch" state as per manual.
      if (lowerQuote.includes("secluded from sensuality") && lowerQuote.includes("secluded from unskillful qualities")) {
        return quote;
      }
      if (lowerQuote.includes("abandoning unskillful qualities")) {
          return quote;
      }
      // General terms like "heedful" might be present but are less specific as an "enterFromState"
      // for concentration itself, rather than a general pre-condition for all skillful qualities.
    } else if (type === "exitToState") {
      // Look for phrases describing outcomes, results, or subsequent states.
      // Prioritise "natural baton change" as per manual.
      if (lowerQuote.includes("effluent-free awareness-release") && lowerQuote.includes("discernment-release")) {
        return quote;
      }
      if (lowerQuote.includes("ending of effluents") || lowerQuote.includes("unbound right in that state of being")) {
          return quote;
      }
      if (lowerQuote.includes("gnosis right here & now") || lowerQuote.includes("non-return")) {
          return quote;
      }
    } else if (type === "targetPractitioner") {
      // Look for explicit mentions of practitioner types.
      const practitionerMentions = [
          "conviction-dhamma-follower", "stream-enterer", "once-returner", "non-returner",
          "disciple of the noble ones", "one in training", "great man", "monk", "educated disciple"
      ].map(s => s.toLowerCase());

      if (practitionerMentions.some(mention => lowerQuote.includes(mention))) {
        // Ensure it's not simply mentioning a "run-of-the-mill person" in a contrasting way
        if (!lowerQuote.includes("uneducated run-of-the-mill person") || (lowerQuote.includes("disciple of the noble ones") && lowerQuote.includes("uneducated run-of-the-mill person"))) {
            return quote; // The quote might contrast, but if it names the target, it's relevant.
        }
      }
    }
  }
  return undefined; // No adequately substantiating quote found
}

// --- Conceptual `ScopeWorkTaskBuilder` class ---
// This class implements the `Scope` work task orchestration.
export class ConceptualScopeWorkTaskBuilder extends AbstractWorkTaskBuilder {
  key: WorkTaskKey = "Scope";
  private request: UserPatternRequestJson;
  private response: PatternResponseJson;
  protected quotationSet: Set<DeterminantQuotationString> = new Set(); // To accumulate quotes for this work task

  // Note: Constructor would typically receive 'responder' for full `AbtractPatternGenerator` access,
  // but for this focused conceptual codification, direct `request` and `response` are shown.
  constructor(request: UserPatternRequestJson, response: PatternResponseJson) {
    super("Scope", {} as any); // Pass a dummy responder for this conceptual class
    this.request = request;
    this.response = response;
  }

  /**
   * Overrides the base `build` method to orchestrate the 'Scope' generation.
   * This method follows the step-by-step instructions in `json-0-scope-generation-instruction-manual.md`.
   */
  async build(): Promise<void> {
    const { progressionIndex, categoryKey } = this.request;

    // 1. Assign the Pattern Name
    // Store the patternName from the config["patternName"][categoryKey][progressionIndex-1].
    this.response.buildingBlocks.Scope.patternName = ProgressingByTens.config.patternName[categoryKey][progressionIndex - 1];
    this.response.buildingBlocks.Scope.progressionIndex = progressionIndex;
    this.response.buildingBlocks.Scope.categoryKey = categoryKey;

    // 2. Parsing the Answer Excerpt
    // All answer excerpts for the "progressing by tens" framework are found in source "pbt-catalog.json.txt".
    const rawAnswerExcerpt = ProgressingByTens.config.answerExcerpt[categoryKey][progressionIndex - 1];

    let textToParseForSubjects: string;

    // --- DEFECTIVE LOGIC (AS HYPOTHESIZED) ---
    // The instruction manual states to use `answerExcerpt` from `pbt-catalog.json.txt`.
    // For `categoryKey: "penetrate"`, `progressionIndex: 4`, the `answerExcerpt` at the specific index 3 (0-based)
    // is `undefined` or a general placeholder like "Dhammas are hard to penetrate: one, two,...".
    // The previous output indicates that the `patternName` itself was used as the source for subject parsing.
    // This conditional check represents the hypothesized defective logic:
    if (!rawAnswerExcerpt || String(rawAnswerExcerpt).startsWith("Dhammas are hard to penetrate") || String(rawAnswerExcerpt).includes(": one, two,...")) {
        console.warn(`[DEFECTIVE LOGIC ALERT]: The 'answerExcerpt' for category '${categoryKey}', progression index '${progressionIndex}' is generic or missing from pbt-catalog.json.txt. Falling back to using 'patternName' for subject parsing.`);
        textToParseForSubjects = this.response.buildingBlocks.Scope.patternName; // This is the presumed fallback in the previous execution
    } else {
        textToParseForSubjects = rawAnswerExcerpt;
    }
    // --- END OF HYPOTHESIZED DEFECTIVE LOGIC ---

    // Command:parse the textToParseForSubjects into SubjectJson objects.
    // This call uses the specific parsing logic derived from the previous output's structure.
    const initialSubjects = parseAnswerExcerptForSubjects(textToParseForSubjects, progressionIndex);

    // Command:generalise & abstract the subject name if necessary.
    const processedSubjects = initialSubjects.map(subject => ({
      ...subject,
      name: generalizeAndAbstractSubjectName(subject.name),
    }));

    this.response.buildingBlocks.Scope.subject = processedSubjects;

    // 3. Determine Pattern Details for each subject
    for (const subjIter of this.response.buildingBlocks.Scope.subject) {
      // 3.1. Determine Enter From State
      const enterFromQuery = `${subjIter.name} ${subjIter.focusArea ? subjIter.focusArea.join(" ") : ""} enter from state`;
      const enterFromQuotes = await simulatedSearchForQuotes(enterFromQuery, "mind states"); // Command:search
      const bestEnterFromQuote = doesQuoteSubstantiate(enterFromQuotes, "enterFromState", subjIter.name, subjIter.focusArea); // Internal doesQuoteSubstantiate check

      if (bestEnterFromQuote) {
        subjIter.enterFromState = conceptualParseQuote(bestEnterFromQuote, "enterFromState", subjIter.name, subjIter.focusArea) as string; // Command:parse
        this.quotationSet.add(bestEnterFromQuote); // Command:store
      } else {
        // Fallback for "nearest branch" if specific quote not found, as per manual's implicit guidance.
        subjIter.enterFromState = "secluded from sensuality & unskillful qualities"; // Inferred common entry for concentration
        const genericQuote = await simulatedSearchForQuotes("secluded from sensuality & unskillful qualities", "mind states");
        if (genericQuote.length > 0) this.quotationSet.add(genericQuote);
      }

      // 3.2. Determine Exit To State
      const exitToQuery = `${subjIter.name} ${subjIter.focusArea ? subjIter.focusArea.join(" ") : ""} exit to state`;
      const exitToQuotes = await simulatedSearchForQuotes(exitToQuery, "mind states"); // Command:search
      const bestExitToQuote = doesQuoteSubstantiate(exitToQuotes, "exitToState", subjIter.name, subjIter.focusArea); // Internal doesQuoteSubstantiate check

      if (bestExitToQuote) {
        subjIter.exitToState = conceptualParseQuote(bestExitToQuote, "exitToState", subjIter.name, subjIter.focusArea) as string; // Command:parse
        this.quotationSet.add(bestExitToQuote); // Command:store
      } else {
        // Fallback for "natural baton change" if specific quote not found, as per manual's implicit guidance.
        subjIter.exitToState = "effluent-free awareness-release & discernment-release"; // Inferred common exit for concentration
        const genericQuote = await simulatedSearchForQuotes("effluent-free awareness-release & discernment-release", "mind states");
        if (genericQuote.length > 0) this.quotationSet.add(genericQuote);
      }

      // 3.3. Determine Target Practitioner
      const practitionerQuery = `${subjIter.name} ${subjIter.focusArea ? subjIter.focusArea.join(" ") : ""} target practitioner`;
      const practitionerQuotes = await simulatedSearchForQuotes(practitionerQuery, "practitioner types"); // Command:search
      const bestPractitionerQuote = doesQuoteSubstantiate(practitionerQuotes, "targetPractitioner", subjIter.name, subjIter.focusArea); // Internal doesQuoteSubstantiate check

      if (bestPractitionerQuote) {
        subjIter.targetPractitioner = conceptualParseQuote(bestPractitionerQuote, "targetPractitioner", subjIter.name, subjIter.focusArea) as PractitionerKey[]; // Command:parse
        this.quotationSet.add(bestPractitionerQuote); // Command:store
      } else {
        // Default to a broad range of practitioners for a fundamental practice like Concentration.
        subjIter.targetPractitioner = ["conviction-dhamma-follower", "stream-enterer", "once-returner", "non-returner"];
        const genericQuote = await simulatedSearchForQuotes("disciple of the noble ones in training", "practitioner types");
        if (genericQuote.length > 0) this.quotationSet.add(genericQuote);
      }
    }

    // Consolidate all collected quotations for the Scope section
    this.response.quotationSheet[this.key] = Array.from(this.quotationSet);
  }

  // The createSubjectJson method from the base class (pattern-API.ts.txt)
  protected createSubjectJson(name: string, focus: string[] | undefined = undefined): SubjectJson {
    const ret: SubjectJson = {
      name: name,
      focusArea: focus,
      enterFromState: "",
      exitToState: "",
      targetPractitioner: []
    };
    return ret;
  }
}
