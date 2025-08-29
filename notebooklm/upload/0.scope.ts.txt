import { NotebookLmPatternGenerator } from "../api/nblm-pattern-generator.ts";
import { AbtractPatternGenerator, DeterminantQuotationString, ScopeWorkTaskBuilder, SubjectJson, UserPatternRequestJson } from "../api/pattern-API.ts";
import { JsonUtils, ProgressingByTens } from "../api/pbt-utils.ts";


export class NotebookLmScopeWorkTaskBuilder extends ScopeWorkTaskBuilder {
    private indexKey: string
    private breadcrumbLabel: string
    private answerExcerpt: string 


    constructor(key: string, responder: AbtractPatternGenerator) {
        super(key, responder)
        this.indexKey = ProgressingByTens.config.topic.progressionKey[this.responder.request.progressionIndex-1]
        this.breadcrumbLabel = ProgressingByTens.config.topic.label[this.responder.request.progressionIndex-1]
        this.answerExcerpt = ProgressingByTens.config.answerExcerpt[this.responder.request.categoryKey][this.responder.request.progressionIndex-1]
    }

    private extendContextWindowBeyondOriginalUserQuery() {
        const context = `pattern "${this.responder.response.buildingBlocks["Scope"].patternName}", has as its originating context:\n\tWhich ${this.indexKey} ${this.breadcrumbLabel}?\n${this.answerExcerpt}`
        /*  **Command:notebooklm_API::add-to-context-window**: ${context}

            eg. console.log(context) > $ deno 0.scope.ts 
            pattern "Heedful, ardent & resolute", has as its originating context:
                Which one Dhammas are very helpful?
                Heedfulness with regard to skillful qualities
        */

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
        this.extendContextWindowBeyondOriginalUserQuery()
        const subjects = this.parseSubjectsFromAnswerExcerpt()
        for (const subject of subjects) {
            this.determineSubjectsEnterFromState(subject)
            this.determineSubjectsExitToState(subject)
            this.determineSubjectsTargetPractitioner(subject)
        }
        super.build()
    }
}

function main() {
    const userPatternRequest: UserPatternRequestJson = {
        progressionIndex: 1,
        categoryKey: "helpful"
    }
    NotebookLmPatternGenerator.BUILDER_REGISTRY.set("Scope", NotebookLmScopeWorkTaskBuilder)
    const responder = new NotebookLmPatternGenerator(userPatternRequest)
    const response = responder.generate()
    const output = JsonUtils.minimise(response)
    console.log(JSON.stringify(output, null, 2))
}

main()

/*

$ deno 0.scope.ts 
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
          "enterFromState": "effluent-free",
          "exitToState": "",
          "targetPractitioner": [
            "stream-enterer",
            "once-returner",
            "non-returner"
          ]
        }
      ]
    }
  },
  "quotationSheet": {
    "Scope": [
      "[dont] ever let yourself get complacent when the ending of effluents is still unattained",
      "Now, then, monks, I exhort you: All fabrications are subject to ending & decay. Reach consummation through heedfulness.' That was the Tathāgata's last statement [to a group of noble monks the most backward of which was a stream-enterer]"
    ]
  }
}
*/