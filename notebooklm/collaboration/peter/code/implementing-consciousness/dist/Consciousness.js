"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Consciousness = void 0;
const NameAndForm_1 = require("./NameAndForm");
class Consciousness {
    constructor(seed) {
        this.supported = false;
        this.seed = seed;
    }
    support(heat, vitality) {
        // Logic for heat and vitality support
        this.supported = true;
        console.log('Consciousness seed is supported by heat and vitality.');
    }
    arise(context, intention, conviction) {
        if (!this.supported) {
            throw new Error("Consciousness cannot arise without support.");
        }
        // The level of attention is established based on previous moment's intention and conviction.
        // This is a placeholder for a more complex calculation.
        const attention = conviction * 0.5 + Math.random() * 0.5; // Placeholder
        console.log('Consciousness seed leads to a new Name-&-Form.');
        return new NameAndForm_1.NameAndForm(attention);
    }
}
exports.Consciousness = Consciousness;
