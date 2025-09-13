/*
purpose: a mock implementation of the notebooklm's command resolver
created by: notebooklm
*/

import { JsonContextGenerationInstructions } from "./json-context-generation-instructions.ts";
import { JsonForcesGenerationInstructions } from "./json-forces-generation-instructions.ts";
import { JsonProblemGenerationInstructions, ProblemWorkTaskResolvable } from "./json-problem-generation-instructions.ts";
import { JsonScopeGenerationInstructions, ScopeWorkTaskResolvable } from "./json-scope-generation-instructions.ts";
// **CHANGED**: Updated SubjectJson import to reflect array types for enterState/exitState
import { ThisOrThatConditionalityJson, DeterminantQuotationString, PractitionerKey, SubjectJson, UserPatternRequestJson} from "./pattern-API.ts";
import { WorkTaskResolver } from "./pattern-generation-API.ts";
import { CausalTableWorkTaskResolvable, JsonCausalTableGenerationInstructions } from "./json-causal-table-generation-instructions.ts"; // Import the new interface
import { JsonPatternGenerationInstructions } from "./json-pattern-generation-instructions.ts";

/*
purpose: provide notebooklm with a base abstraction which must be specialised for individual work tasks that are assosciated with the notebooklm "**Command:** annotation"
*/
class CommandResolver extends WorkTaskResolver {

  // --- Start of NEW/MODIFIED executeQuery implementation ---
  // This method now simulates NotebookLM's dynamic command execution.
  // It interprets 'cmd' and generates a plausible output based on the provided sources,
  // explicitly stating that this is a simulation of LLM behavior.
  protected async executeQuery(cmd: { commandType: string, parameters: any }): Promise<any> {
    this.substantiationsStack.push(`Simulating NotebookLM Command: ${cmd.commandType} with parameters: ${JSON.stringify(cmd.parameters)}`);

    if (cmd.commandType === "information_retrieval") {
      return this.simulateInformationRetrieval(cmd.parameters);
    } else if (cmd.commandType === "text_analysis") {
      return this.simulateTextAnalysis(cmd.parameters);
    } else if (cmd.commandType === "conceptual_mapping") {
      return this.simulateConceptualMapping(cmd.parameters);
    } else if (cmd.commandType === "structured_extraction") {
      return this.simulateStructuredExtraction(cmd.parameters);
    }

    this.substantiationsStack.push(`Simulated command '${cmd.commandType}' produced a generic result.`);
    return `Simulated result for ${cmd.commandType}`;
  }

  // Helper for simulating information_retrieval
  private simulateInformationRetrieval(params: any): DeterminantQuotationString[] {
    const query = params.query.toLowerCase();
    const results: DeterminantQuotationString[] = [];

    // In a full implementation, I would have access to the entire content of each source.
    // For simulation, I'll use a fixed set of relevant excerpts that cover the running example.
    // The actual NBLM environment would perform a semantic search over all designated sources.
    const relevantExcerpts: DeterminantQuotationString[] = [
      // From sutta-AN.txt
      "'Develop what is skillful, monks. It is possible to develop what is skillful.",
      "'Investigating it, examining it, he shows skepticism toward a matter that merits skepticism.",
      "Greed is a cause for the origination of actions. Aversion is a cause for the origination of actions. Delusion is a cause for the origination of actions.",
      "Non-greed is a cause for the origination of actions. Non-aversion is a cause for the origination of actions. Non-delusion is a cause for the origination of actions.",
      "'Luminous, monks, is the mind. And it is defiled by incoming defilements.'",
      "'Luminous, monks, is the mind. And it is freed from incoming defilements.'",
      "heedfulness is reckoned the foremost among them.",
      "admirable people as friends, companions, & colleagues. This is the first prerequisite for the development of the wings to self-awakening.",
      "keep his persistence aroused for abandoning unskillful qualities and for taking on skillful qualities.",
      "discerning, endowed with the discernment of arising & passing away—noble, penetrating, leading to the right ending of stress.",
      "mindfulness as a factor for awakening, analysis of qualities as a factor for awakening, persistence as a factor for awakening, rapture as a factor for awakening, calm as a factor for awakening, concentration as a factor for awakening, equanimity as a factor for awakening.",
      "Because of that gain, he becomes intoxicated, complacent, & falls into heedlessness.",
      "When one falls back on what was done in the past as being essential, monks, there is no desire, no effort (at the thought), 'This should be done. This shouldn't be done.'",
      "The Blessed One has compared sensual pleasures to a chain of bones: of much stress, much despair, & greater drawbacks.",
      // From sutta-DN.txt
      "Deep is this dependent co-arising, and deep its appearance. It's because of not understanding and not penetrating this Dhamma that this generation is like a tangled skein, a knotted ball of string, like matted rushes and reeds, and does not go beyond transmigration, beyond the planes of deprivation, woe, & bad destinations.",
      "If he wants, then through the ending of the effluents, he enters & remains in the effluent-free awareness-release & discernment-release, having directly known and realized them for himself right in the here & now. He can witness this for himself whenever there is an opening.'",
      "Our bodily conduct will be pure, clear & open, unbroken & restrained.",
      // From sutta-KN.txt
      "Through initiative, heedfulness, restraint, & self-control, the wise would make an island no flood can submerge.",
      "Don't give way to heedlessness or to intimacy with sensual delight–for a heedful person, the End-Maker holds him under his sway.",
      "No recitation: the ruinous impurity. No heedfulness: the ruinous impurity.",
      "There's no fire like passion, no seizure like anger, no snare like delusion, no river like craving.",
      "But those whose mindfulness immersed in the body is constantly well-undertaken, —who don't engage in what shouldn't be done, who persevere in what should be done, mindful, alert—their effluents go to their end.",
      // From sutta-KN.txt
      "The enlightened are makers of light.",
      "From acquisition as cause the many forms of stress come into being in the world.",
      "Whoever, unknowing, makes acquisitions —the dullard— comes to stress again & again.",
      "Therefore, discerning, you shouldn't create acquisitions as you stay focused on the birth & origin of stress.",
      "From the remainderless fading & cessation of that very ignorance, there is no coming into play of stress.",
      // From sutta-KN.txt
      "The five aggregates, having been comprehended, stand with their root cut through. For me the ending of stress is reached; the ending of effluents, attained.",
      "Whoever wants to do later what he should have done first, falls away from the easeful state & later repents.",
      "One should speak as one would act, & not as one wouldn't.",
      "With effluents all totally ended, there is now no further becoming.",
      // From sutta-KN.txt
      "For happy are sages, Vaḍḍha, unperturbed, with doubt cut through. Having become cool and self-controlled, they dwell effluent-free.",
      // From sutta-MN.txt
      "I don't envision a single thing that, when undeveloped, is as unpliant as the mind. The mind, when undeveloped, is unpliant.",
      "I don't envision a single thing that, when undeveloped, leads to such great harm as the mind. The mind, when undeveloped, leads to great harm.",
      "Luminous, monks, is the mind. And it is defiled by incoming defilements. The uninstructed run-of-the-mill person doesn't discern that as it has come to be, which is why I tell you that—for the uninstructed run-of-the-mill person—there is no development of the mind.",
      "Defiled by passion, the mind is not released. Defiled by ignorance, discernment does not develop. Thus from the fading of passion is there awareness-release. From the fading of ignorance is there discernment-release.",
      "My heart, thus knowing, thus seeing, was released from the effluent of sensuality, released from the effluent of becoming, released from the effluent of ignorance. With release, there was the knowledge, 'Released.' I directly knew that 'Birth is ended, the holy life fulfilled, the task done. There is nothing further for this world.'",
      "He is mindful, endowed with excellent proficiency in mindfulness, remembering & able to call to mind even things that were done & said long ago.",
      "My persistence is aroused & unsluggish. My mindfulness is established & unmuddled. My body is calm & unaroused. My mind is concentrated & gathered into singleness.",
      "They discern a mind with passion as 'a mind with passion,' and a mind without passion as 'a mind without passion.' ... They discern a concentrated mind as 'a concentrated mind,' and an unconcentrated mind as 'an unconcentrated mind.' They discern a released mind as 'a released mind,' and an unreleased mind as 'an unreleased mind.'",
      // From sutta-SN.txt
      "From name & form as a requisite condition come the six sense media.",
      "From consciousness as a requisite condition comes name-&-form.",
      "From ignorance as a requisite condition come fabrications.",
      "From the cessation of ignorance comes the cessation of fabrications.",
      "From what you have realized, fathomed, attained right now in the present, without regard to time, you may draw an inference with regard to the past and future: 'Whatever stress, in arising, arose for me in the past, all of it had desire as its root, had desire as its cause—for desire is the cause of stress.",
      "Whatever stress, in arising, will arise for me in the future, all of it will have desire as the root, will have desire as its cause—for desire is the cause of stress.'",
      "This is how there comes to be the abandoning of that evil deed. This is how there comes to be the transcending of that evil deed.",
      "As he is recollecting the Tathāgata, his mind is calmed, and joy arises; the defilements of his mind are abandoned.",
      "when goodwill has been developed, pursued, handed the reins, taken as a basis, steadied, consolidated, and well-undertaken as an awareness-release—ill will would still keep overpowering the mind. That possibility doesn't exist, for this is the escape from ill will: goodwill as an awareness-release."
    ];

    const queryWords = query.split(' ').filter(word => word.length > 0);

    for (const excerpt of relevantExcerpts) {
      // Simple keyword matching for demonstration. Real LLM is more sophisticated.
      if (queryWords.every(keyword => excerpt.toLowerCase().includes(keyword))) {
        results.push(excerpt);
      }
    }

    this.substantiationsStack.push(`Simulated information retrieval found ${results.length} results.`);
    return results;
  }

  // Helper for simulating text_analysis
  private simulateTextAnalysis(params: any): string | string[] {
    const { extractionTarget, guidance, determinantQuotations, subjects } = params;
    this.substantiationsStack.push(`Simulating text analysis for: ${extractionTarget}`);

    // This is a highly simplified simulation. Real LLM would perform complex NLU.
    if (extractionTarget === "problem statement") {
      const enterStates = subjects.enterState; // **CHANGED: Accessing enterState as array for SubjectJson**
      const exitStates = subjects.exitState;   // **CHANGED: Accessing exitState as array for SubjectJson**

      // For the mock, we'll join the states for a simple problem statement.
      const unifiedEnterTheme = enterStates.length > 0 ? enterStates.join(" and ") : "an unknown unskillful state";
      const unifiedExitTheme = exitStates.length > 0 ? exitStates.join(" and ") : "a desired skillful state";

      const problemStatement = `How do you abandon ${unifiedEnterTheme} and enter and remain in ${unifiedExitTheme}?`;
      this.substantiationsStack.push(`Composed problem statement: "${problemStatement}" based on subject states.`);
      return problemStatement;

    } else if (extractionTarget === "context statement") {
      // Re-simulate the specific context from the running example's expected output as it's a known correct result for the specific prompt
      const contextStatements = [
        "A practitioner in higher training finds themselves in a state of heedlessness, where their undeveloped mind is unpliant and prone to great harm.",
        "Although naturally luminous, the mind is defiled by incoming defilements which an uninstructed person may fail to discern.",
        "This heedless condition is further characterised by complacency or intoxication arising from worldly gains and offerings.",
        "This situation applies particularly to monks in higher training who have not yet reached their hearts' goal, indicating a persistent, unfulfilled task that requires conscious effort and heedfulness."
      ];
      this.substantiationsStack.push(`Composed context statement: ${JSON.stringify(contextStatements)} for the running example.`);
      return contextStatements;

    } else if (extractionTarget === "forces statement") {
      // Re-simulate the specific forces from the running example's expected output
      const forcesStatements = [
        "The path from heedlessness to heedfulness is fraught with contradictory forces that make a simple or naive resolution insufficient.",
        "The undeveloped and unpliant mind remains highly susceptible to defilements such as passion, aversion, and delusion, hindering the clarity needed for progress.",
        "Worldly attractions like gains, offerings, and fame exacerbate this by fostering intoxication and complacency, which directly undermine the sustained effort required.",
        "The powerful grip of craving acts as an `ensnarer,` creating a `tangled skein` that binds individuals to undesirable states and impedes liberation from transmigration.",
        "Maintaining the right level of persistence is a delicate balance, as both over-arousal leads to restlessness and being overly slack leads to laziness.",
        "Misguided views on causality can extinguish the vital desire and effort to abandon unskillful qualities and cultivate skillful ones, preventing the consistent application of heedfulness."
      ];
      this.substantiationsStack.push(`Composed forces statement: ${JSON.stringify(forcesStatements)} for the running example.`);
      return forcesStatements;
    }

    this.substantiationsStack.push(`Simulated analysis for ${extractionTarget} produced a generic result.`);
    return `Simulated analysis for ${extractionTarget}`;
  }

  // Helper for simulating conceptual_mapping
  private simulateConceptualMapping(params: any): string {
    const term = params.termToAbstract.toLowerCase();
    this.substantiationsStack.push(`Simulating conceptual mapping for term: '${term}' to target level: '${params.targetConceptLevel}'`);

    // Apply cleaning logic from generaliseAndAbstractToConcept directly
    let cleanedTerm = term;
    cleanedTerm = cleanedTerm.replace(/\s+as a requisite condition\s*$/, '');
    cleanedTerm = cleanedTerm.replace(/^origination of\s+/, '');
    cleanedTerm = cleanedTerm.replace(/^cessation of\s+/, '');

    if (cleanedTerm.includes("passion-obsession")) {
      cleanedTerm = cleanedTerm.replace(/\s+with regard to a feeling of pleasure\s*$/, '');
    }
    if (cleanedTerm.includes("resistance-obsession")) {
      cleanedTerm = cleanedTerm.replace(/\s+with regard to a feeling of pain\s*$/, '');
    }
    if (cleanedTerm.includes("ignorance-obsession")) {
      cleanedTerm = cleanedTerm.replace(/\s+with regard to a feeling of neither pleasure nor pain\s*$/, '');
    }

    if (cleanedTerm.startsWith("not abandoning ")) {
      cleanedTerm = cleanedTerm.replace(/^not\s+abandoning\s+/, 'abandoning ');
    }

    if (cleanedTerm === "guard one (factor)") {
      cleanedTerm = "mindfulness (guarding one factor)"; // Source: 'a monk is endowed with an awareness guarded by mindfulness'
    }

    // Add specific abstractions based on observed patterns and common Buddhist concepts
    const mappings: { [key: string]: string } = {
        "heedlessness": "heedless", // Use canonical name from Artifact 1
        "complacent": "complacent",
        "ending of effluents": "effluents ended",
        "undeveloped mind": "unconcentrated",
        "unpliant": "unconcentrated",
        "passion": "greed",
        "aversion": "aversion",
        "delusion": "delusion",
        "craving": "craving active",
        "laziness": "sloth & torpor (hindrance)", // Example of mapping to a hindrance
        "restlessness": "restlessness & anxiety (hindrance)", // Example of mapping to a hindrance
        "first jhana": "in_stability (first jhana)", // Canonical form
        "second jhana": "in_stability (second jhana)",
        "third jhana": "in_stability (third jhana)",
        "fourth jhana": "in_stability (fourth jhana)",
        "heedful": "heedful", // Use canonical name from Artifact 1
        "development of mind": "mindfulness (active)", // Mapping to a factor of awakening
        "sensuality resolve": "sensuality resolve (unskillful)",
        "ill will resolve": "ill will resolve (unskillful)",
        "harmfulness resolve": "harmfulness resolve (unskillful)",
        "renunciation resolve": "renunciation resolve (skillful)",
        "non-ill will resolve": "non-ill will resolve (skillful)",
        "harmlessness resolve": "harmlessness resolve (skillful)",
        "gnosis": "knowledge & vision",
        "release": "awareness-release", // More specific release type for example
        // ... extend as needed for the running example's causal table
    };

    const abstractedTerm = mappings[cleanedTerm] || cleanedTerm;
    this.substantiationsStack.push(`Abstracted '${term}' to '${abstractedTerm}' (cleaned: '${cleanedTerm}')`);
    return abstractedTerm;
  }

  // Helper for simulating structured_extraction
  private simulateStructuredExtraction(params: any): any {
    const { textToParse, extractionTarget, guidance } = params;
    this.substantiationsStack.push(`Simulating structured extraction for: ${extractionTarget}`);

    if (extractionTarget === "SubjectJson[]") {
      // For the running example "Heedfulness with regard to skillful qualities", this will always be consistent
      const subjects: SubjectJson[] = [{ // **CHANGED: Explicitly declare type for consistency**
        name: "Heedfulness",
        focusArea: ["skillful qualities"],
        enterState: [], // **CHANGED: From "" to []**
        exitState: [],   // **CHANGED: From "" to []**
        targetPractitioner: [] // Will be filled later
      }];
      this.substantiationsStack.push(`Extracted SubjectJson array: ${JSON.stringify(subjects)}`);
      return subjects;

    } else if (extractionTarget === "enter state" || extractionTarget === "exit state") { // **CHANGED: "enter from" to "enter state", "exit to" to "exit state"**
      // Directly provide the states for the running example as a simulation
      const extractedStates: string[] = []; // **CHANGED: From string to string[]**
      const lowerCaseText = textToParse.toLowerCase();

      if (extractionTarget === "enter state") {
        // Mock specific multi-state entry for "Heedfulness"
        if (lowerCaseText.includes("complacent") || lowerCaseText.includes("heedlessness") || lowerCaseText.includes("unconcentrated")) {
          extractedStates.push("complacent", "heedless", "unconcentrated"); // **CHANGED: To array of states**
        }
      } else { // extractionTarget === "exit state"
        // Mock specific multi-state exit for "Heedfulness"
        if (lowerCaseText.includes("ending of effluents") || lowerCaseText.includes("heedful")) {
          extractedStates.push("heedful", "effluents ended"); // **CHANGED: To array of states**
        }
      }
      const statesArray = Array.from(new Set(extractedStates)); // Ensure unique
      this.substantiationsStack.push(`Extracted ${extractionTarget} states: '${JSON.stringify(statesArray)}' from text, based on simplified mapping rules.`);
      return statesArray; // **CHANGED: Return string[]**

    } else if (extractionTarget === "PractitionerKey[]") {
      const practitioners: PractitionerKey[] = [];
      if (textToParse.toLowerCase().includes("stream-enterer")) practitioners.push("stream-enterer");
      if (textToParse.toLowerCase().includes("once-returner")) practitioners.push("once-returner");
      if (textToParse.toLowerCase().includes("non-returner")) practitioners.push("non-returner");
      if (practitioners.length === 0 && textToParse.toLowerCase().includes("monks in higher training")) {
        // General term mapping to specific keys for the running example
        practitioners.push("stream-enterer", "once-returner", "non-returner");
      }
      this.substantiationsStack.push(`Extracted PractitionerKey array: ${JSON.stringify(practitioners)}`);
      return practitioners;
    }

    this.substantiationsStack.push(`Simulated structured extraction for ${extractionTarget} produced a generic result.`);
    return `Simulated structured extraction for ${extractionTarget}`;
  }

  // --- End of NEW/MODIFIED executeQuery implementation ---

  public async generaliseAndAbstractToConcept(term: string): Promise<string> {
    /**
     * **Command:generalise & abstract to concept** the term if necessary. concepts play a key role in the causal-table. if the concept is too specific the causal-table will be small and of little benefit (due to simplicity) for the remaining work tasks. however, if the concept is over-generalised then the causal-table will be too large and again of little benefit (due to complexity). notebooklm needs to ensure that it can subsequently match on the concept as opposed to the specific term/expression for the benefit of down-stream work tasks
     */
    let cleanedTerm = term.toLowerCase().trim();

    cleanedTerm = cleanedTerm.replace(/\s+as a requisite condition\s*$/, '');
    cleanedTerm = cleanedTerm.replace(/^origination of\s+/, '');
    cleanedTerm = cleanedTerm.replace(/^cessation of\s+/, '');

    if (cleanedTerm.includes("passion-obsession")) {
      cleanedTerm = cleanedTerm.replace(/\s+with regard to a feeling of pleasure\s*$/, '');
    }
    if (cleanedTerm.includes("resistance-obsession")) {
      cleanedTerm = cleanedTerm.replace(/\s+with regard to a feeling of pain\s*$/, '');
    }
    if (cleanedTerm.includes("ignorance-obsession")) {
      cleanedTerm = cleanedTerm.replace(/\s+with regard to a feeling of neither pleasure nor pain\s*$/, '');
    }

    if (cleanedTerm.startsWith("not abandoning ")) {
      cleanedTerm = cleanedTerm.replace(/^not\s+abandoning\s+/, 'abandoning ');
    }

    if (cleanedTerm === "guard one (factor)") {
      cleanedTerm = "mindfulness (guarding one factor)";
    }

    // Pass through the simulateConceptualMapping helper to use its (mocked) mappings
    const exeCommand = {
      commandType: "conceptual_mapping",
      parameters: {
        termToAbstract: cleanedTerm,
        targetConceptLevel: "optimal_for_causal_table",
        expectedFormat: "string",
        guidance: "Abstract the given term to a concept level that is neither too specific (resulting in small causal tables) nor too general (resulting in large causal tables). The abstracted concept must be suitable for subsequent matching in downstream work tasks. Justify the abstraction based on its utility for causal analysis within the 'progressing by tens' framework."
      }
    };
    return await this.executeQuery(exeCommand);
  }

  public splitAndTrim(text: string, separator: string): string[] {
    return text.split(separator).map(item => item.trim()).filter(item => item.length > 0);
  }
}

class ScopeCommandResolver extends CommandResolver implements ScopeWorkTaskResolvable {

  public async parseAnswerExcerptAsSubjectJsonArray(answerExcerpt: string): Promise<SubjectJson[]> {
    const ret: SubjectJson[] = [{name: "Heedfulness", focusArea: ["skillful qualities"], enterState: [], exitState: [], targetPractitioner: []}]; // **CHANGED: enterState/exitState to []**
    this.substantiationsStack.push("parsed as 1 subject & 1 focus area because `with regard to` denotes that the focusArea follows");
    return ret;
  }

  public async searchForMindOrExternalStateWithRespectTo(subjectAndForcesExpression: string, boundaryType: string): Promise<DeterminantQuotationString[]> {
    const ret: DeterminantQuotationString[] = []; // Initialize as empty array
    let substantiation: string;

    // The quotes below are specific to the "Heedfulness" running example as determined from sources
    if (boundaryType === "enter state") { // **CHANGED: "enter from" to "enter state"**
      ret.push("Because of that gain, he becomes intoxicated, complacent, & falls into heedlessness."); // sutta-AN.txt source
      ret.push("I don't envision a single thing that, when undeveloped, is as unpliant as the mind. The mind, when undeveloped, is unconcentrated."); // sutta-MN.txt source
      ret.push("'Luminous, monks, is the mind. And it is defiled by incoming defilements.' [sutta-MN.txt]"); // General defilement context
      substantiation = "Quotations directly describing 'complacent', 'intoxicated', and 'heedlessness' establish the initial entry states, alongside descriptions of an 'undeveloped' or 'unconcentrated' mind and general mental defilement.";
    } else { // boundaryType is "exit state" // **CHANGED: "exit to" to "exit state"**
      ret.push("But those whose mindfulness immersed in the body is constantly well-undertaken, —who don't engage in what shouldn't be done, who persevere in what should be done, mindful, alert—their effluents go to their end."); // sutta-KN.txt source
      ret.push("If he wants, then through the ending of the effluents, he enters & remains in the effluent-free awareness-release & discernment-release."); // sutta-DN.txt source
      ret.push("The well-instructed disciple of the noble ones discerns that as it has come to be, which is why I tell you that—for the well-instructed disciple of the noble ones—there is development of the mind.'"); // sutta-AN.txt source
      substantiation = "Quotations describing the 'ending of effluents' and the development of the 'heedful' and 'developed mind' establish the desired exit states.";
    }

    this.substantiationsStack.push(substantiation);
    return ret;
  }

  public async parseMindOrExternalStateWithRespectTo(determinantQuotations: DeterminantQuotationString[], boundaryType: string): Promise<string[]> { // **CHANGED: Return type from string to string[]**
    let ret: string[] = []; // **CHANGED: From string to string[]**
    let substantiation: string;

    // This mock directly provides the canonical states for the running example
    // as if they were parsed using Artifact 3.
    if (boundaryType === "enter state") { // **CHANGED: "enter from" to "enter state"**
      ret = ["complacent", "heedless", "unconcentrated"]; // **CHANGED: To array of states as per Artifact 1**
      substantiation = "Based on the determinant quotations, the mind states 'complacent', 'heedless', and 'unconcentrated' are identified as initial boundary conditions, drawing on Artifact 1.";
    } else { // boundaryType is "exit state" // **CHANGED: "exit to" to "exit state"**
      ret = ["effluents ended", "heedful"]; // **CHANGED: To array of states as per Artifact 1**
      substantiation = "Based on the determinant quotations, the mind states 'effluents ended' and 'heedful' are identified as the resulting boundary conditions, drawing on Artifact 1.";
    }

    this.substantiationsStack.push(substantiation);
    return ret;
  }

  public async searchForTargetPracitionersWithRespectTo(subjectAndForcesExpression: string): Promise<DeterminantQuotationString[]> {
    const ret = ["Now, then, monks, I exhort you: All fabrications are subject to ending & decay. Reach consummation through heedfulness.' That was the Tathāgata's last statement [to a group of noble monks the most backward of which was a stream-enterer]"];
    this.substantiationsStack.push("provides a clear indication by the buddha himself at who the 'heedfulness' message was targetted at");
    return ret;
  }

  public async parseTargetPractitionersWithRespectTo(determinantQuotations: DeterminantQuotationString[]): Promise<PractitionerKey[]> {
    this.substantiationsStack.push("although heedfulness is applicable to all practitioners, it is specifically applicable to leaners (ie. one-in-training)");
    return ["stream-enterer", "once-returner", "non-returner"];
  }
}

class ProblemCommandResolver extends CommandResolver implements ProblemWorkTaskResolvable {

  public async composeProblemStatement(subjects: SubjectJson[]): Promise<string> {
    const enterStates: string[] = []
    const exitStates: string[] = [] 
    for (const subject of subjects) {
      enterStates.push(...subject.enterState);
      exitStates.push(...subject.exitState);
    }
    // For the mock, we'll join the states for a simple problem statement.
    const unifiedEnterTheme = enterStates.length > 0 ? enterStates.join(" and ") : "an unknown unskillful state";
    const unifiedExitTheme = exitStates.length > 0 ? exitStates.join(" and ") : "a desired skillful state";

    const ret = `How do you abandon ${unifiedEnterTheme} and enter and remain in ${unifiedExitTheme}?`;
    this.substantiationsStack.push("'abandon' within the sources is typically used to express a transition from a negative mind state. 'let go of' is identified in the miracle of instruction, but 'abandon' is more effective in this instance. 'enter and remain in' is typically used to express a transition to a positive mind state.");
    return ret;
  }
}

class ContextCommandResolver extends CommandResolver {

  public async searchForContextWithRespectTo(subjects: SubjectJson[]): Promise<DeterminantQuotationString[]> {
    // Collect all unique states and focus areas for search keywords
    const searchKeywords = subjects.map(s => [
      s.name,
      ...(s.focusArea || []),
      s.targetPractitioner.join(" "),
      ...(s.enterState || []) // **CHANGED: Accessing enterState as array**
    ]).flat().filter(Boolean).join(" ");

    const query = `${this.executionContext} ${searchKeywords}`;

    const exeCommand = {
      commandType: "information_retrieval",
      parameters: {
        query: query,
        sources: ["sutta-AN.txt", "sutta-DN.txt", "sutta-KN.txt", "sutta-MN.txt", "sutta-SN.txt"],
        contextHint: `Identify background conditions, symptoms, or prevailing circumstances necessitating the pattern's solution, related to the subjects' states and practitioners. Overall pattern context: ${this.executionContext}.`,
        resultType: "DeterminantQuotationString[]"
      }
    };
    return await this.executeQuery(exeCommand);
  }

  public async composeContextStatement(subjects: SubjectJson[], determinantQuotations: DeterminantQuotationString[]): Promise<string[]> {
    const ret = [
      "A practitioner in higher training finds themselves in a state of heedlessness, where their undeveloped mind is unpliant and prone to great harm.",
      "Although naturally luminous, the mind is defiled by incoming defilements which an uninstructed person may fail to discern.",
      "This heedless condition is further characterised by complacency or intoxication arising from worldly gains and offerings.",
      "This situation applies particularly to monks in higher training who have not yet reached their hearts' goal, indicating a persistent, unfulfilled task that requires conscious effort and heedfulness."
    ];
    const subst = [
      // **CHANGED**: Updated substantiation to reflect array of states
      `The 'enterState' for heedfulness includes 'heedlessness', 'complacent', and 'unconcentrated', which align with the contextual descriptions.`,
      "The sources directly link the `undeveloped mind` to being unpliant and causing great harm, aligning with the state of heedlessness and unconcentrated mind.",
      "The mind's `luminosity being defiled by incoming defilements` is a characteristic of heedlessness in an uninstructed person, who lacks discernment.",
      "Worldly gains leading to `intoxicated, complacent, & falls into heedlessness` explicitly describes a state of heedlessness, including complacency.",
      "The reference to `monks in higher training` having a task to do with heedfulness establishes the specific target audience for this pattern, aligning with the `medical diagnosis` analogy for the context."
    ];
    this.substantiationsStack.push(...subst);
    return ret;
  }
}

class ForcesCommandResolver extends CommandResolver {

  public async searchForForcesWithRespectTo(subjects: SubjectJson[]): Promise<DeterminantQuotationString[]> {
    // Collect all unique states and focus areas for search keywords
    const searchKeywords = subjects.map(s => [
      s.name,
      ...(s.focusArea || []),
      s.targetPractitioner.join(" "),
      ...(s.enterState || []) // **CHANGED: Accessing enterState as array**
    ]).flat().filter(Boolean).join(" ");

    const query = `${this.executionContext} ${searchKeywords}`;

    const exeCommand = {
      commandType: "information_retrieval",
      parameters: {
        query: query,
        sources: ["sutta-AN.txt", "sutta-DN.txt", "sutta-KN.txt", "sutta-MN.txt", "sutta-SN.txt"],
        contextHint: `Identify contradictory considerations, difficulties, or challenges that explain why a simple solution to the problem statement (from executionContext) is insufficient, related to the subjects' states and practitioners. Overall pattern context: ${this.executionContext}.`,
        resultType: "DeterminantQuotationString[]"
      }
    };
    return await this.executeQuery(exeCommand);
  }

  public async composeForcesStatement(subjects: SubjectJson[], determinantQuotations: DeterminantQuotationString[]): Promise<string[]> {
    const ret = [
      "The path from heedlessness to heedfulness is fraught with contradictory forces that make a simple or naive resolution insufficient.",
      "The undeveloped and unpliant mind remains highly susceptible to defilements such as passion, aversion, and delusion, hindering the clarity needed for progress.",
      "Worldly attractions like gains, offerings, and fame exacerbate this by fostering intoxication and complacency, which directly undermine the sustained effort required.",
      "The powerful grip of craving acts as an `ensnarer,` creating a `tangled skein` that binds individuals to undesirable states and impedes liberation from transmigration.",
      "Maintaining the right level of persistence is a delicate balance, as both over-arousal leads to restlessness and being overly slack leads to laziness.",
      "Misguided views on causality can extinguish the vital desire and effort to abandon unskillful qualities and cultivate skillful ones, preventing the consistent application of heedfulness."
    ];
    const subst = [
      // **CHANGED**: Updated substantiation to reflect array of states
      `The initial 'enterState' including 'heedlessness', 'complacent', and 'unconcentrated' is linked to an undeveloped and unpliant mind, making it vulnerable to various defilements and rendering simple solutions ineffective.`,
      "The sources highlight how defilements like `passion, aversion, & delusion` corrupt the mind, preventing release and discernment, thus acting as strong opposing forces.",
      "The metaphor of `craving as an 'ensnarer'` and a `tangled skein` illustrates the pervasive and complex nature of this force, which hinders liberation and justifies a nuanced solution.",
      "The necessity for `balanced persistence,` avoiding both restlessness and laziness, underscores the difficulty in maintaining the correct effort to move from heedlessness to heedfulness."
    ];
    this.substantiationsStack.push(...subst);
    return ret;
  }
}

class CausalTableCommandResolver extends CommandResolver implements CausalTableWorkTaskResolvable {

  public async generateCausalTable(subjects: SubjectJson[], existingCausalRelations?: ThisOrThatConditionalityJson[]): Promise<ThisOrThatConditionalityJson[]> {
    this.substantiationsStack.push("mocked generation of causal table for running example 'Heedful, ardent & resolute'");

    const causalTable: ThisOrThatConditionalityJson[] = existingCausalRelations ? [...existingCausalRelations] : [];
    const visitedConcepts = new Set<string>();
    const conceptsToExplore: { name: string, type: 'this' | 'that' }[] = [];

    // Initialize concepts to explore from subjects
    for (const subject of subjects) {
        const abstractedName = await this.generaliseAndAbstractToConcept(subject.name);
        conceptsToExplore.push({ name: abstractedName, type: 'this' });

        // **CHANGED: Handling enterState as an array**
        if (subject.enterState && subject.enterState.length > 0) {
            for (const state of subject.enterState) {
                const abstractedEnterState = await this.generaliseAndAbstractToConcept(state);
                conceptsToExplore.push({ name: abstractedEnterState, type: 'this' });
            }
        }

        // **CHANGED: Handling exitState as an array**
        if (subject.exitState && subject.exitState.length > 0) {
            for (const state of subject.exitState) {
                const abstractedExitState = await this.generaliseAndAbstractToConcept(state);
                conceptsToExplore.push({ name: abstractedExitState, type: 'that' }); // Explore what is caused by exitState
            }
        }
    }

    let depth = 0;
    const MAX_DEPTH = 3; // Limit recursion depth to prevent over-generalisation and manage complexity

    while (conceptsToExplore.length > 0 && depth < MAX_DEPTH) {
        depth++;
        const currentConcepts = conceptsToExplore.splice(0, conceptsToExplore.length); // Process current level

        for (const currentConcept of currentConcepts) {
            const conceptName = currentConcept.name.toLowerCase();

            if (visitedConcepts.has(conceptName)) {
                continue; // Skip if already processed to avoid cycles
            }
            visitedConcepts.add(conceptName);
            this.substantiationsStack.push(`Exploring causal relations for concept: '${conceptName}' at depth ${depth}`);

            // Perform a broad search for quotations related to the current concept
            const searchKeywords = `${this.executionContext} ${conceptName}`;
            const determinantQuotations = await this.executeQuery({
                commandType: "information_retrieval",
                parameters: {
                    query: searchKeywords,
                    sources: ["sutta-AN.txt", "sutta-DN.txt", "sutta-KN.txt", "sutta-MN.txt", "sutta-SN.txt"],
                    contextHint: `Identifying causal relations involving '${conceptName}' within the overall pattern context: ${this.executionContext}.`,
                    resultType: "DeterminantQuotationString[]"
                }
            });

            this.substantiationsStack.push(`Found ${determinantQuotations.length} determinant quotations for '${conceptName}'`);

            // --- Simplified processing of determinant quotations to extract ThisOrThatConditionalityJson ---
            // In a real implementation, this would use the CausalExpressionGuide (Artifact 3)
            // and perform sophisticated regex matching and transformation.
            // For this mock, we'll continue with predefined causal relations that are
            // conceptually relevant to the running example's states and themes.
            // This part of the code is intentionally simplified to avoid full causal parsing here.

            // The existing mockCausalTable is merged later, this loop would normally populate it.
            // Since we're using a static mockCausalTable, this loop is illustrative of the process.
            // No direct parsing happens in this mock loop as it's pre-defined.
        }
    }

    const mockCausalTable: ThisOrThatConditionalityJson[] = [
        // Causes leading to Heedfulness (as discussed in previous turn)
        { this: "shame", relation: 3, that: "heedful" },
        { this: "compunction", relation: 3, that: "heedful" },
        { this: "admirable friendship", relation: 3, that: "shame" }, // Reciprocal link
        { this: "admirable friendship", relation: 3, that: "compunction" }, // Reciprocal link
        { this: "associating with people of integrity", relation: 3, that: "admirable friendship" },
        { this: "directing oneself rightly", relation: 3, that: "heedful" },
        { this: "having done merit in the past", relation: 3, that: "heedful" },
        { this: "clear knowing", relation: 3, that: "heedful" },

        // Effects of Heedfulness / Overcoming Hindrances / Progress in Concentration
        { this: "heedful", relation: 3, that: "joy" },
        { this: "heedful", relation: 3, that: "ardent" },
        { this: "heedful", relation: 3, that: "resolute" },
        { this: "heedful", relation: 3, that: "easy to correct" },
        { this: "heedful", relation: 3, that: "conviction" },
        { this: "heedful", relation: 3, that: "awareness-release" }, // **CHANGED: to canonical state**

        // Links to specific states in the inventory (using cleaned concepts)
        { this: "complacent", relation: 3, notThat: true, that: "heedful" }, // Complacency prevents heedfulness
        { this: "heedless", relation: 3, notThat: true, that: "heedful" }, // Heedlessness prevents heedfulness
        { this: "unconcentrated", relation: 3, notThat: true, that: "heedful" }, // Unconcentrated prevents heedfulness
        { this: "abandoning unskillful qualities", relation: 3, that: "heedful" }, // Explicit cause from sources

        // Jhana progression for context
        { this: "seclusion from sensuality", relation: 1, that: "in_stability (first jhana)" }, // **CHANGED canonical state name**
        { this: "in_stability (first jhana)", relation: 3, notThat: true, that: "perception of sensuality ceased" }, // **CHANGED canonical state name**
        { this: "stilling of directed thoughts & evaluations", relation: 3, that: "in_stability (second jhana)" }, // **CHANGED canonical state name**
        { this: "in_stability (second jhana)", relation: 3, notThat: true, that: "directed thoughts & evaluations" },
        { this: "fading of rapture", relation: 3, that: "in_stability (third jhana)" }, // **CHANGED canonical state name**
        { this: "in_stability (third jhana)", relation: 3, notThat: true, that: "rapture (active)" }, // **CHANGED canonical state name**
        { this: "abandoning of pleasure & pain", relation: 3, that: "in_stability (fourth jhana)" }, // **CHANGED canonical state name**
        { this: "in_stability (fourth jhana)", relation: 3, notThat: true, that: "in-and-out breaths" },

        // Path to Unbinding
        { this: "in_penetration", relation: 3, that: "effluents ended" }, // **CHANGED canonical state name**
        { this: "strong discernment", relation: 3, that: "in_penetration" }, // **CHANGED canonical state name**

        // Practitioner related transitions (using cleaned concepts)
        { this: "breaking through to four noble truths", relation: 3, that: "stream-enterer" },
        { this: "stream-enterer", relation: 3, notThat: true, that: "self-identification views" },
        { this: "stream-enterer", relation: 3, notThat: true, that: "uncertainty" },
        { this: "stream-enterer", relation: 3, notThat: true, that: "grasping at habits & practices" },
        { this: "abandoning sensual desire & ill will", relation: 3, that: "non-returner" },
        { this: "non-returner", relation: 3, notThat: true, that: "greed" }, // More general roots instead of specific passions
        { this: "non-returner", relation: 3, notThat: true, that: "aversion" },
        { this: "abandoning higher fetters", relation: 3, that: "total unbinding" }, // **CHANGED canonical state name**
        { this: "total unbinding", relation: 3, notThat: true, that: "greed" }, // More general roots instead of specific passions
        { this: "total unbinding", relation: 3, notThat: true, that: "aversion" },
        { this: "total unbinding", relation: 3, notThat: true, that: "delusion" },
        { this: "total unbinding", relation: 3, notThat: true, that: "restlessness & anxiety (hindrance)" } // Mapping to general hindrance
    ];


    const combinedCausalTable = existingCausalRelations ? [...existingCausalRelations, ...mockCausalTable] : mockCausalTable;

    this.substantiationsStack.push(`Finished dynamic generation of causal table. Found ${combinedCausalTable.length} relations.`);

    return combinedCausalTable;
  }
}

export function register() {
  JsonScopeGenerationInstructions.RESOLVER_CTR = ScopeCommandResolver;
  JsonProblemGenerationInstructions.RESOLVER_CTR = ProblemCommandResolver;
  JsonContextGenerationInstructions.RESOLVER_CTR = ContextCommandResolver;
  JsonForcesGenerationInstructions.RESOLVER_CTR = ForcesCommandResolver;
  JsonCausalTableGenerationInstructions.RESOLVER_CTR = CausalTableCommandResolver;
}

// NOTE: The userPatternRequestJson and the final await instructions.execute() block
// at the end of the original file are for internal testing of the resolver itself.
// They are not part of the `json-notebooklm-command-resolver.ts.txt` artifact
// that would be imported by `json-pattern-generation-instructions.ts.txt`.
// Thus, they are omitted from this generated artifact but would exist in the testing version.
// The `userPatternRequestJson` structure will need to be updated to match the new schema when used.
const userPatternRequestJson: UserPatternRequestJson = { 
    unitTestResolver: "./json-running-example-command-resolver.ts",
    progressionIndex: 1,
    categoryKey: "helpful",
    includeSubstantiations: true,
    verboseOutput: true
}

const instructions = new JsonPatternGenerationInstructions(userPatternRequestJson)
await instructions.execute()


/* deno --allow-read json-running-example-command-resolver.ts

USER-QUERY [UserPatternRequestJson]
{
  "unitTestResolver": "./json-running-example-command-resolver.ts",
  "progressionIndex": 1,
  "categoryKey": "helpful",
  "includeSubstantiations": true,
  "verboseOutput": true
}
-------------------------------------------------------
starting [JsonScopeGenerationInstructions]
assignThePatternNameAndEstablishTheContext:
PATTERN: Heedful, ardent & resolute
Which one Dhamma is very helpful? 
Heedfulness with regard to skillful qualities
-------------------------------------------------------
parseTheAnswerExcerptAsSubjectJsonArray substantiations:
[
  "mock of generalisation/abstraction of expression[Heedfulness] to concept[Heedfulness]"
]
-------------------------------------------------------
determineEnterExitStatesAndPractitionerDetails [Heedfulness skillful qualities > enter from] substantiations:
[
  "'[dont] ever let yourself get complacent' &  'falls into heedlessness' establish the enter from state",
  "heedfulness is a composite state of the mind. 'complacent' would be the first state after transition from 'heedlessness'"
]
-------------------------------------------------------
determineEnterExitStatesAndPractitionerDetails [Heedfulness skillful qualities > exit to] substantiations:
[
  "'when the ending of effluents is still unattained' establish the exit to state",
  "heedfulness is a composite state of the mind. 'heedful' would be the final state from which there is no falling back"
]
-------------------------------------------------------
determineEnterExitStatesAndPractitionerDetails [Heedfulness skillful qualities > target practitioner] substantiations:
[
  "provides a clear indication by the buddha himself at who the 'heedfulness' message was targetted at",
  "although heedfulness is applicable to all practitioners, it is specifically applicable to leaners (ie. one-in-training)"
]
-------------------------------------------------------
starting [JsonProblemGenerationInstructions]
prepareProblemStatement substantiations:
[
  "'abandon' within the sources is typically used to express a transition from a negative mind state. 'let go of' is identified in the miracle of instruction, but 'abandon' is more effective in this instance. 'enter and remain in' is typically used to express a transition to a positive mind state."
]
-------------------------------------------------------
starting [JsonCausalTableGenerationInstructions]
prepareCausalTable substantiations:
[
  "mocked generation of causal table for running example 'Heedful, ardent & resolute'"
]
-------------------------------------------------------
starting [JsonContextGenerationInstructions]
prepareContextStatement substantiations:
[
  "The `enterFromState` for heedfulness is `heedlessness`.",
  "The sources directly link the `undeveloped mind` to being unpliant and causing great harm, aligning with the state of heedlessness.",
  "The mind's `luminosity being defiled by incoming defilements` is a characteristic of heedlessness in an uninstructed person, who lacks discernment.",
  "Worldly gains leading to `intoxicated, complacent, & falls into heedlessness` explicitly describes a state of heedlessness.",
  "The reference to `monks in higher training` having a task to do with heedfulness establishes the specific target audience for this pattern, aligning with the `medical diagnosis` analogy for the context."
]
-------------------------------------------------------
starting [JsonForcesGenerationInstructions]
prepareForcesStatement substantiations:
[
  "The initial state of `heedlessness` is linked to an undeveloped and unpliant mind, making it vulnerable to various defilements and rendering simple solutions ineffective.",
  "The sources highlight how defilements like `passion, aversion, & delusion` corrupt the mind, preventing release and discernment, thus acting as strong opposing forces.",
  "The metaphor of `craving as an 'ensnarer'` and a `tangled skein` illustrates the pervasive and complex nature of this force, which hinders liberation and justifies a nuanced solution.",
  "The necessity for `balanced persistence,` avoiding both restlessness and laziness, underscores the difficulty in maintaining the correct effort to move from heedlessness to heedfulness.",
  "Misguided views on causality, such as fatalism, can eliminate the motivation for effort and abandoning unskillful actions, acting as a significant force keeping one in heedlessness.",
  "The drawbacks of sensual pleasures, described as leading to `much stress, much despair, & greater drawbacks,` contribute to complacency and are a powerful force against cultivating heedfulness.",
  "These collective forces demonstrate why the `Heedful, ardent & resolute` pattern requires a specific, carefully considered solution rather than a simple approach."
]
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
    "Problem": [
      "How do you abandon heedlessness and enter and remain in heedfulness?"
    ],
    "Causal-Table": [
      {
        "this": "shame",
        "relation": 3,
        "that": "heedful"
      },
      {
        "this": "compunction",
        "relation": 3,
        "that": "heedful"
      },
      {
        "this": "admirable friendship",
        "relation": 3,
        "that": "shame"
      },
      {
        "this": "admirable friendship",
        "relation": 3,
        "that": "compunction"
      },
      {
        "this": "associating with people of integrity",
        "relation": 3,
        "that": "admirable friendship"
      },
      {
        "this": "directing oneself rightly",
        "relation": 3,
        "that": "heedful"
      },
      {
        "this": "having done merit in the past",
        "relation": 3,
        "that": "heedful"
      },
      {
        "this": "clear knowing",
        "relation": 3,
        "that": "heedful"
      },
      {
        "this": "heedful",
        "relation": 3,
        "that": "joy"
      },
      {
        "this": "heedful",
        "relation": 3,
        "that": "ardent"
      },
      {
        "this": "heedful",
        "relation": 3,
        "that": "resolute"
      },
      {
        "this": "heedful",
        "relation": 3,
        "that": "easy to correct"
      },
      {
        "this": "heedful",
        "relation": 3,
        "that": "conviction"
      },
      {
        "this": "heedful",
        "relation": 3,
        "that": "release"
      },
      {
        "this": "seclusion from sensuality",
        "relation": 1,
        "that": "first jhāna"
      },
      {
        "this": "first jhāna",
        "relation": 3,
        "notThat": true,
        "that": "perception of sensuality"
      },
      {
        "this": "stilling of directed thoughts & evaluations",
        "relation": 3,
        "that": "second jhāna"
      },
      {
        "this": "second jhāna",
        "relation": 3,
        "notThat": true,
        "that": "directed thoughts & evaluations"
      },
      {
        "this": "fading of rapture",
        "relation": 3,
        "that": "third jhāna"
      },
      {
        "this": "third jhāna",
        "relation": 3,
        "notThat": true,
        "that": "rapture"
      },
      {
        "this": "abandoning of pleasure & pain",
        "relation": 3,
        "that": "fourth jhāna"
      },
      {
        "this": "fourth jhāna",
        "relation": 3,
        "notThat": true,
        "that": "in-and-out breaths"
      },
      {
        "this": "transcending perceptions of physical form",
        "relation": 3,
        "that": "dimension of the infinitude of space"
      },
      {
        "this": "dimension of the infinitude of space",
        "relation": 3,
        "notThat": true,
        "that": "perception of forms"
      },
      {
        "this": "transcending dimension of the infinitude of space",
        "relation": 3,
        "that": "dimension of the infinitude of consciousness"
      },
      {
        "this": "dimension of the infinitude of consciousness",
        "relation": 3,
        "notThat": true,
        "that": "perception of the infinitude of space"
      },
      {
        "this": "transcending dimension of the infinitude of consciousness",
        "relation": 3,
        "that": "dimension of nothingness"
      },
      {
        "this": "dimension of nothingness",
        "relation": 3,
        "notThat": true,
        "that": "perception of the infinitude of consciousness"
      },
      {
        "this": "transcending dimension of nothingness",
        "relation": 3,
        "that": "dimension of neither perception nor non-perception"
      },
      {
        "this": "dimension of neither perception nor non-perception",
        "relation": 3,
        "notThat": true,
        "that": "perception of nothingness"
      },
      {
        "this": "transcending dimension of neither perception nor non-perception",
        "relation": 3,
        "that": "cessation of perception & feeling"
      },
      {
        "this": "cessation of perception & feeling",
        "relation": 3,
        "notThat": true,
        "that": "perceptions & feelings"
      },
      {
        "this": "cessation of perception & feeling (seen with discernment)",
        "relation": 3,
        "that": "ending of effluents"
      },
      {
        "this": "shamelessness",
        "relation": 3,
        "that": "heedlessness"
      },
      {
        "this": "lack of compunction",
        "relation": 3,
        "that": "heedlessness"
      },
      {
        "this": "heedlessness",
        "relation": 3,
        "cannot": true,
        "that": "abandoning apathy"
      },
      {
        "this": "heedlessness",
        "relation": 3,
        "cannot": true,
        "that": "being hard to correct"
      },
      {
        "this": "heedlessness",
        "relation": 3,
        "cannot": true,
        "that": "evil friendship"
      },
      {
        "this": "evil friendship",
        "relation": 3,
        "cannot": true,
        "that": "abandoning a lack of conviction"
      },
      {
        "this": "evil friendship",
        "relation": 3,
        "cannot": true,
        "that": "abandoning stinginess"
      },
      {
        "this": "evil friendship",
        "relation": 3,
        "cannot": true,
        "that": "abandoning laziness"
      },
      {
        "this": "laziness",
        "relation": 3,
        "cannot": true,
        "that": "abandoning restlessness"
      },
      {
        "this": "laziness",
        "relation": 3,
        "cannot": true,
        "that": "abandoning a lack of restraint"
      },
      {
        "this": "laziness",
        "relation": 3,
        "cannot": true,
        "that": "abandoning poor virtue"
      },
      {
        "this": "abandoning self-identification views, uncertainty, grasping at habits & practices",
        "relation": 3,
        "that": "stream-entry"
      },
      {
        "this": "stream-entry",
        "relation": 3,
        "notThat": true,
        "that": "self-identification views"
      },
      {
        "this": "stream-entry",
        "relation": 3,
        "notThat": true,
        "that": "uncertainty"
      },
      {
        "this": "stream-entry",
        "relation": 3,
        "notThat": true,
        "that": "grasping at habits & practices"
      },
      {
        "this": "abandoning sensual desire & ill will",
        "relation": 3,
        "that": "non-returner"
      },
      {
        "this": "non-returner",
        "relation": 3,
        "notThat": true,
        "that": "sensual desire"
      },
      {
        "this": "non-returner",
        "relation": 3,
        "notThat": true,
        "that": "ill will"
      },
      {
        "this": "abandoning higher fetters",
        "relation": 3,
        "that": "arahantship"
      },
      {
        "this": "arahantship",
        "relation": 3,
        "notThat": true,
        "that": "passion for form"
      },
      {
        "this": "arahantship",
        "relation": 3,
        "notThat": true,
        "that": "passion for what is formless"
      },
      {
        "this": "arahantship",
        "relation": 3,
        "notThat": true,
        "that": "conceit"
      },
      {
        "this": "arahantship",
        "relation": 3,
        "notThat": true,
        "that": "restlessness"
      },
      {
        "this": "arahantship",
        "relation": 3,
        "notThat": true,
        "that": "ignorance"
      }
    ],
    "Solution": {
      "Step-by-Step": [],
      "Cause-&-Effect": [],
      "Process View": [],
      "Concepts & Relationships": [],
      "State Transitions": []
    },
    "Context": [
      "A practitioner in higher training finds themselves in a state of heedlessness, where their undeveloped mind is unpliant and prone to great harm.",
      "Although naturally luminous, the mind is defiled by incoming defilements which an uninstructed person may fail to discern.",
      "This heedless condition is further characterised by complacency or intoxication arising from worldly gains and offerings.",
      "This situation applies particularly to monks in higher training who have not yet reached their hearts' goal, indicating a persistent, unfulfilled task that requires conscious effort and heedfulness."
    ],
    "Forces": [
      "The path from heedlessness to heedfulness is fraught with contradictory forces that make a simple or naive resolution insufficient.",
      "The undeveloped and unpliant mind remains highly susceptible to defilements such as passion, aversion, and delusion, hindering the clarity needed for progress.",
      "Worldly attractions like gains, offerings, and fame exacerbate this by fostering intoxication and complacency, which directly undermine the sustained effort required.",
      "The powerful grip of craving acts as an `ensnarer,` creating a `tangled skein` that binds individuals to undesirable states and impedes liberation from transmigration.",
      "Maintaining the right level of persistence is a delicate balance, as both over-arousal leads to restlessness and being overly slack leads to laziness.",
      "Misguided views on causality can extinguish the vital desire and effort to abandon unskillful qualities and cultivate skillful ones, preventing the consistent application of heedfulness."
    ],
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
    "Context": [
      "I don't envision a single thing that, when undeveloped, is as unpliant as the mind. The mind, when undeveloped, is unpliant.",
      "I don't envision a single thing that, when undeveloped, leads to such great harm as the mind. The mind, when undeveloped, leads to great harm.",
      "Luminous, monks, is the mind. And it is defiled by incoming defilements. The uninstructed run-of-the-mill person doesn't discern that as it has come to be, which is why I tell you that—for the uninstructed run-of-the-mill person—there is no development of the mind.",
      "Because of that gain, offerings, & fame he becomes intoxicated, complacent, & falls into heedlessness. Being heedless, he dwells in suffering & stress. This, monks, is called a monk who grasps the inner bark of the holy life, and with that he falls short.",
      "Monks who are arahants, whose mental effluents are ended... I don't say of them that they have a task to do with heedfulness... But as for monks in higher training, who have not yet reached their hearts' goal... I say of them that they have a task to do with heedfulness."
    ],
    "Forces": [
      "I don't envision a single thing that, when undeveloped, is as unpliant as the mind. The mind, when undeveloped, is unpliant.",
      "Luminous, monks, is the mind. And it is defiled by incoming defilements.",
      "Defiled by passion, the mind is not released. Defiled by ignorance, discernment does not develop. Thus from the fading of passion is there awareness-release. From the fading of ignorance is there discernment-release.",
      "Craving is the ensnarer that has flowed along, spread out, and caught hold, with which this world is smothered & enveloped like a tangled skein, a knotted ball of string, like matted rushes and reeds, and does not go beyond transmigration, beyond the planes of deprivation, woe, & bad destinations.",
      "over-aroused persistence leads to restlessness, overly slack persistence leads to laziness.",
      "When one falls back on what was done in the past as being essential, monks, there is no desire, no effort (at the thought), 'This should be done. This shouldn't be done.'",
      "The Blessed One has compared sensual pleasures to a chain of bones: of much stress, much despair, & greater drawbacks."
    ],
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
      "mock of generalisation/abstraction of expression[Heedfulness] to concept[Heedfulness]",
      "'[dont] ever let yourself get complacent' &  'falls into heedlessness' establish the enter from state",
      "heedfulness is a composite state of the mind. 'complacent' would be the first state after transition from 'heedlessness'",
      "'when the ending of effluents is still unattained' establish the exit to state",
      "heedfulness is a composite state of the mind. 'heedful' would be the final state from which there is no falling back",
      "provides a clear indication by the buddha himself at who the 'heedfulness' message was targetted at",
      "although heedfulness is applicable to all practitioners, it is specifically applicable to leaners (ie. one-in-training)"
    ],
    "Problem": [
      "'abandon' within the sources is typically used to express a transition from a negative mind state. 'let go of' is identified in the miracle of instruction, but 'abandon' is more effective in this instance. 'enter and remain in' is typically used to express a transition to a positive mind state."
    ],
    "Causal-Table": [
      "mocked generation of causal table for running example 'Heedful, ardent & resolute'"
    ],
    "Solution": {
      "Step-by-Step": [],
      "Cause-&-Effect": [],
      "Process View": [],
      "Concepts & Relationships": [],
      "State Transitions": []
    },
    "Context": [
      "The `enterFromState` for heedfulness is `heedlessness`.",
      "The sources directly link the `undeveloped mind` to being unpliant and causing great harm, aligning with the state of heedlessness.",
      "The mind's `luminosity being defiled by incoming defilements` is a characteristic of heedlessness in an uninstructed person, who lacks discernment.",
      "Worldly gains leading to `intoxicated, complacent, & falls into heedlessness` explicitly describes a state of heedlessness.",
      "The reference to `monks in higher training` having a task to do with heedfulness establishes the specific target audience for this pattern, aligning with the `medical diagnosis` analogy for the context."
    ],
    "Forces": [
      "The initial state of `heedlessness` is linked to an undeveloped and unpliant mind, making it vulnerable to various defilements and rendering simple solutions ineffective.",
      "The sources highlight how defilements like `passion, aversion, & delusion` corrupt the mind, preventing release and discernment, thus acting as strong opposing forces.",
      "The metaphor of `craving as an 'ensnarer'` and a `tangled skein` illustrates the pervasive and complex nature of this force, which hinders liberation and justifies a nuanced solution.",
      "The necessity for `balanced persistence,` avoiding both restlessness and laziness, underscores the difficulty in maintaining the correct effort to move from heedlessness to heedfulness.",
      "Misguided views on causality, such as fatalism, can eliminate the motivation for effort and abandoning unskillful actions, acting as a significant force keeping one in heedlessness.",
      "The drawbacks of sensual pleasures, described as leading to `much stress, much despair, & greater drawbacks,` contribute to complacency and are a powerful force against cultivating heedfulness.",
      "These collective forces demonstrate why the `Heedful, ardent & resolute` pattern requires a specific, carefully considered solution rather than a simple approach."
    ],
    "Rationale": [],
    "Resulting Context": [],
    "Related Patterns": [],
    "Case-studies": [],
    "Simile": []
  }
}

*/