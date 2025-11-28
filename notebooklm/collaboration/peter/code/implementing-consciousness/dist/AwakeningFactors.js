"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AwakeningFactors = exports.WingsToAwakening = exports.SevenFactorsOfAwakening = void 0;
class SevenFactorsOfAwakening {
    constructor(mindfulness = 0, analysisOfQualities = 0, persistence = 0, rapture = 0, calm = 0, concentration = 0, equanimity = 0) {
        this.mindfulness = mindfulness;
        this.analysisOfQualities = analysisOfQualities;
        this.persistence = persistence;
        this.rapture = rapture;
        this.calm = calm;
        this.concentration = concentration;
        this.equanimity = equanimity;
    }
    arise() {
        console.log('Seven factors of awakening are arising.');
    }
}
exports.SevenFactorsOfAwakening = SevenFactorsOfAwakening;
class WingsToAwakening {
    constructor() {
        this.sevenFactorsOfAwakening = new SevenFactorsOfAwakening();
    }
    arise() {
        console.log('Wings to awakening are arising.');
        this.sevenFactorsOfAwakening.arise();
    }
}
exports.WingsToAwakening = WingsToAwakening;
class AwakeningFactors {
    constructor() {
        this.wingsToAwakening = new WingsToAwakening();
        this.sevenFactors = this.wingsToAwakening.sevenFactorsOfAwakening;
    }
    arise() {
        this.wingsToAwakening.arise();
    }
}
exports.AwakeningFactors = AwakeningFactors;
