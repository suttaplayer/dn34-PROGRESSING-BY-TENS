"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Being = void 0;
const Kamma_1 = require("./Kamma");
const Defilements_1 = require("./Defilements");
const AwakeningFactors_1 = require("./AwakeningFactors");
const FinalStages_1 = require("./FinalStages");
class Being {
    constructor(initialKamma, initialConviction = 0, initialIgnorance = 0.5, initialCraving = 0.5) {
        this.kammicField = new Kamma_1.KammicField(initialKamma);
        this.conviction = initialConviction;
        this.ignorance = initialIgnorance;
        this.craving = initialCraving;
        this.defilements = new Defilements_1.Defilements();
        this.awakeningFactors = new AwakeningFactors_1.AwakeningFactors();
        this.finalStages = new FinalStages_1.FinalStages();
    }
}
exports.Being = Being;
