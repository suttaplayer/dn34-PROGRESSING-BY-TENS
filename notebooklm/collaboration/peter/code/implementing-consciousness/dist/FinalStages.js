"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FinalStages = exports.IntentionAndFabrications = exports.ClingingAggregates = exports.Nutriments = void 0;
const Kamma_1 = require("./Kamma");
class Nutriments {
    constructor(physicalFood = 0.5, contact = 0.5, intellectualIntention = 0.5, consciousness = 0.5) {
        this.physicalFood = physicalFood;
        this.contact = contact;
        this.intellectualIntention = intellectualIntention;
        this.consciousness = consciousness;
    }
    arise() {
        console.log('The four nutriments are arising.');
    }
}
exports.Nutriments = Nutriments;
class ClingingAggregates {
    constructor(form = 0.5, feeling = 0.5, perception = 0.5, mentalFormations = 0.5, consciousness = 0.5) {
        this.form = form;
        this.feeling = feeling;
        this.perception = perception;
        this.mentalFormations = mentalFormations;
        this.consciousness = consciousness;
    }
    arise() {
        console.log('The five clinging-aggregates are arising (2nd arrow).');
    }
}
exports.ClingingAggregates = ClingingAggregates;
class IntentionAndFabrications {
    constructor() { }
    arise() {
        console.log('Intention and the three fabrications are arising.');
        this.intention = { action: 'new intention' }; // Placeholder
    }
    plantNewKammicSeed(being) {
        console.log('A new kammic consciousness seed is planted into the being\'s kammic field.');
        const newSeed = new Kamma_1.KammicSeed(Math.random());
        being.kammicField.seeds.push(newSeed);
    }
}
exports.IntentionAndFabrications = IntentionAndFabrications;
class FinalStages {
    constructor() {
        this.nutriments = new Nutriments();
        this.clingingAggregates = new ClingingAggregates();
        this.intentionAndFabrications = new IntentionAndFabrications();
    }
    arise() {
        this.nutriments.arise();
        this.clingingAggregates.arise();
        this.intentionAndFabrications.arise();
    }
}
exports.FinalStages = FinalStages;
