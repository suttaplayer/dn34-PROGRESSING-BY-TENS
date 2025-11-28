"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KammicField = exports.KammicSeed = void 0;
const SensoryContact_1 = require("./SensoryContact");
class KammicSeed {
    constructor(potential) {
        this.potential = potential;
    }
    ripen(ignorance, craving) {
        console.log('Kammic seed is ripening...');
        // The potential of the seed is affected by ignorance and craving.
        const ripenedPotential = this.potential * (1 - ignorance) * craving;
        console.log(`Ripened potential is ${ripenedPotential}`);
        return new SensoryContact_1.SensoryContact();
    }
}
exports.KammicSeed = KammicSeed;
class KammicField {
    constructor(seeds) {
        this.seeds = seeds;
    }
    selectSeed(context) {
        // Logic to select a seed based on context will be implemented here.
        // For now, just return the first seed.
        if (this.seeds.length > 0) {
            return this.seeds[0];
        }
        throw new Error("Kammic field is empty.");
    }
}
exports.KammicField = KammicField;
