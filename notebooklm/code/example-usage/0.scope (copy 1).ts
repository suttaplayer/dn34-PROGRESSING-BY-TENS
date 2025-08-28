import { DeterminantQuotationString, PatternResponseJson, UserPatternRequestJson } from "../api/pattern-API.ts";
import { JsonUtils, ProgressingByTens } from "../api/pbt-utils.ts";

/*
    this is a hard coded responder for the purposes of example only. it uses the following "Heedfulness" topic as an example:
        * 'Which one dhamma is very helpful? Heedfulness with regard to skillful qualities: This one dhamma is very helpful.

    ```notebooklm-user-query:
    const userPatternRequest: UserPatternRequestJson = {
        progressionIndex: 1,
        categoryKey: "helpful"
    }
    1. using the userPatternRequest object follow the source "pattern-generation-guide.md" to generate a PatternResponseJson object
    2. using the generated a PatternResponseJson object follow the source "pattern-template.md" to format the final response
    ```
*/
class NotebookLmPatternResponder {
    request: UserPatternRequestJson
    response: PatternResponseJson = {
        "buildig-blocks": {
            "Scope": { 
                "progressionIndex": -1, 
                "categoryKey": "helpful",
                "pattern-name": "",
                "subject": []
            },
            "Problem": "",
            "Causal-Table": [],
            "Solution": {
                "Step-by-Step": [],
                "Cause-&-Effect": [],
                "Process View": [],
                "Concepts & Relationships": [],
                "State Transitions": [],
            },
            "Context": [],
            "Forces": [],
            "Rationale": "",
            "Resulting Context": [],
            "Related Patterns": [],
            "Case-studies": [],
            "Simile": [],
        },
        "quotation-sheet": {
            "Scope": [],
            "Problem": [],
            "Causal-Table": [],
            "Solution": {
                "Step-by-Step": [],
                "Cause-&-Effect": [],
                "Process View": [],
                "Concepts & Relationships": [],
                "State Transitions": []
            },
            "Context": [],
            "Forces": [],
            "Rationale": [],
            "Resulting Context": [],
            "Related Patterns": [],
            "Case-studies": [],
            "Simile": []
        }
    }

    constructor(req: UserPatternRequestJson) {
        this.request = req
        this.response["buildig-blocks"]["Scope"]["progressionIndex"] = req.progressionIndex
        this.response["buildig-blocks"]["Scope"]["categoryKey"] = req.categoryKey
    }

    private createEmptySubjectObjects() {
        for (let i = 0; i < this.request.progressionIndex; i++) {
            this.response["buildig-blocks"]["Scope"]["subject"].push(
                {
                    "name": "",
                    "enter-from-state": "",
                    "exit-to-state": "",
                    "target-practitioner": []
                }
            )
        }
    }

    private identifyContext() {
        const context = `
for pattern "${ProgressingByTens.config["pattern-names"][this.request.categoryKey][this.request.progressionIndex-1]}" has as its originating context:
    Which ${ProgressingByTens.config["index-keys"][this.request.progressionIndex-1]} ${ProgressingByTens.config["catagory-breadcrumb-labels"][this.request.progressionIndex-1]}?
    ${ProgressingByTens.config["answer-excerpts"][this.request.categoryKey][this.request.progressionIndex-1]}`
        console.log(context) 
        /* sample output $ deno 0.scope.ts 
        for pattern "Heedful, ardent & resolute" has as its originating context:
            Which one Dhammas are very helpful?
            Heedfulness with regard to skillful qualities
        */
       this.response["buildig-blocks"]["Scope"]["pattern-name"] = ProgressingByTens.config["pattern-names"][this.request.categoryKey][this.request.progressionIndex-1]
       this.response["buildig-blocks"]["Scope"]["subject"][0]["name"] = "Heedfulness" // b/c progression is 1, therefore there is only 1 subject (ie. Heedfulness)
       this.response["buildig-blocks"]["Scope"]["subject"][0]["focus"] = ["skillful qualities"] // the additional qualitier of "with regard to" indicates the focus area (ie. skillful qualities)
    }

    // can be an internal mind state or an external state (eg. living in a civilised land)
    private identifyAndSetEnterFromState(scopeQuotationsSet: Set<string>) {
        const searchResults: DeterminantQuotationString[] = [ // search for best enter from [previous] state quotations
            "[dont] ever let yourself get complacent when the ending of effluents is still unattained"
        ];
        // determinant is complacent | not Practice jhāna (ie. entangled) | That much is enough
        this.response["buildig-blocks"]["Scope"]["subject"][0]["enter-from-state"] = "complacent"
        searchResults.forEach((v) => {scopeQuotationsSet.add(v)})
           
    }

    // can be an internal mind state or an external state (eg. disputes)
    private identifyAndSetExitToState(scopeQuotationsSet: Set<string>) {
        const searchResults: DeterminantQuotationString[] = [ // search for best exit to [having completed heedfulness] state quotations
            "[dont] ever let yourself get complacent when the ending of effluents is still unattained"
        ];
        // determinant is "when the ending of effluents is still unattained"
        this.response["buildig-blocks"]["Scope"]["subject"][0]["exit-to-state"] = "effluent-free"
        searchResults.forEach((v) => {scopeQuotationsSet.add(v)})
    }

    // 1 or more of: "conviction-dhamma-follower" | "stream-enterer" | "once-returner" | "non-returner" | "one-in-training"
    private identifyAndSetTargetAudience(scopeQuotationsSet: Set<string>) {
        const searchResults: DeterminantQuotationString[] = [ // search for best tar
            "Now, then, monks, I exhort you: All fabrications are subject to ending & decay. Reach consummation through heedfulness.' That was the Tathāgata's last statement [to a group of noble monks the most backward of which was a stream-enterer]", 
            "Monks, I don't say of all monks that they have a task to do with heedfulness"
        ];
        // determinant is "the most backward of which was a stream-enterer
        this.response["buildig-blocks"]["Scope"]["subject"][0]["target-practitioner"] = ["one-in-training"]
        searchResults.forEach((v) => {scopeQuotationsSet.add(v)})
    }

    private buildScope() {
        const scopeQuotationsSet = new Set<string>()
        this.createEmptySubjectObjects()                          // step 1
        this.identifyContext()                                    // step 2
        this.identifyAndSetEnterFromState(scopeQuotationsSet)     // step 3
        this.identifyAndSetExitToState(scopeQuotationsSet)        // step 4
        this.identifyAndSetTargetAudience(scopeQuotationsSet)     // step 5
        this.response["quotation-sheet"]["Scope"].push(...scopeQuotationsSet)
    }

    public execute(): PatternResponseJson {
        this.buildScope()
        return this.response
    }
}

function main() {
    const userPatternRequest: UserPatternRequestJson = {
        progressionIndex: 1,
        categoryKey: "helpful"
    }
    const responder = new NotebookLmPatternResponder(userPatternRequest)
    const response = responder.execute()
    const output = JsonUtils.minimise(response)
    console.log(JSON.stringify(output, null, 2))
}

main()

/*

 deno 0.scope.ts 

for pattern "Heedful, ardent & resolute" has as its originating context:
    Which one Dhammas are very helpful?
    Heedfulness with regard to skillful qualities
{
  "buildig-blocks": {
    "Scope": {
      "progressionIndex": 1,
      "categoryKey": "helpful",
      "pattern-name": "Heedful, ardent & resolute",
      "subject": [
        {
          "name": "Heedfulness",
          "enter-from-state": "complacent",
          "exit-to-state": "effluent-free",
          "target-practitioner": [
            "one-in-training"
          ],
          "focus": [
            "skillful qualities"
          ]
        }
      ]
    }
  },
  "quotation-sheet": {
    "Scope": [
      "[dont] ever let yourself get complacent when the ending of effluents is still unattained",
      "Now, then, monks, I exhort you: All fabrications are subject to ending & decay. Reach consummation through heedfulness.' That was the Tathāgata's last statement [to a group of noble monks the most backward of which was a stream-enterer]",
      "Monks, I don't say of all monks that they have a task to do with heedfulness"
    ]
  }
}
*/