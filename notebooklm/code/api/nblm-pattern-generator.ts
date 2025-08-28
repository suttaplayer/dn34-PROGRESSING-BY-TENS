import { AbtractPatternGenerator, CausalTableWorkTaskBuilder, ProblemWorkTaskBuilder, ScopeWorkTaskBuilder } from "./pattern-API.ts";

export class NotebookLmPatternGenerator extends AbtractPatternGenerator {
    static {
        AbtractPatternGenerator.BUILDER_REGISTRY.set("Scope", ScopeWorkTaskBuilder)
        AbtractPatternGenerator.BUILDER_REGISTRY.set("Problem", ProblemWorkTaskBuilder)
        AbtractPatternGenerator.BUILDER_REGISTRY.set("Causal-Table", CausalTableWorkTaskBuilder)
    }
}

const responder = new NotebookLmPatternGenerator({progressionIndex: 1, categoryKey: "helpful"})
responder.generate()
console.log(responder.response)