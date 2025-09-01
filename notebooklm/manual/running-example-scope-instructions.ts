import { BaseWorkTaskInstructions, PatternGenerator } from "./generation-API.ts";

export class RunningExampleScopeInstructions extends BaseWorkTaskInstructions {
    public async execute(): Promise<void> {
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
        await super.execute()
    }
}

export function register() {
    PatternGenerator.INSTRUCTIONS_REGISTRY.set("Scope", RunningExampleScopeInstructions)
}