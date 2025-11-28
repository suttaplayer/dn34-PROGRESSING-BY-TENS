"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Defilements = exports.Papanca = exports.Clinging = exports.UnskillfulRoots = exports.Effluents = exports.Hindrances = exports.Obsessions = void 0;
class Obsessions {
    constructor(sensualPassion = 0.5, resistance = 0.5, views = 0.5, uncertainty = 0.5, conceit = 0.5, passionForBecoming = 0.5, ignorance = 0.5) {
        this.sensualPassion = sensualPassion;
        this.resistance = resistance;
        this.views = views;
        this.uncertainty = uncertainty;
        this.conceit = conceit;
        this.passionForBecoming = passionForBecoming;
        this.ignorance = ignorance;
    }
    arise() {
        console.log('Obsessions are arising.');
    }
}
exports.Obsessions = Obsessions;
class Hindrances {
    constructor(sensualDesire = 0.5, illWill = 0.5, slothAndDrowsiness = 0.5, restlessnessAndAnxiety = 0.5, uncertainty = 0.5) {
        this.sensualDesire = sensualDesire;
        this.illWill = illWill;
        this.slothAndDrowsiness = slothAndDrowsiness;
        this.restlessnessAndAnxiety = restlessnessAndAnxiety;
        this.uncertainty = uncertainty;
    }
    arise() {
        console.log('Hindrances are arising.');
    }
}
exports.Hindrances = Hindrances;
class Effluents {
    constructor(sensuality = 0.5, becoming = 0.5, ignorance = 0.5) {
        this.sensuality = sensuality;
        this.becoming = becoming;
        this.ignorance = ignorance;
    }
    arise() {
        console.log('Effluents are arising.');
    }
}
exports.Effluents = Effluents;
class UnskillfulRoots {
    constructor(greed = 0.5, hatred = 0.5, delusion = 0.5) {
        this.greed = greed;
        this.hatred = hatred;
        this.delusion = delusion;
    }
    arise() {
        console.log('Unskillful roots are arising.');
    }
}
exports.UnskillfulRoots = UnskillfulRoots;
class Clinging {
    constructor(sensuality = 0.5, views = 0.5, ritesAndRituals = 0.5, doctrineOfSelf = 0.5) {
        this.sensuality = sensuality;
        this.views = views;
        this.ritesAndRituals = ritesAndRituals;
        this.doctrineOfSelf = doctrineOfSelf;
    }
    arise() {
        console.log('Clinging is arising.');
    }
}
exports.Clinging = Clinging;
class Papanca {
    constructor(measurement = 0.5, objectification = 0.5) {
        this.measurement = measurement;
        this.objectification = objectification;
    }
    arise() {
        console.log('Measurement and objectification (papañca) are arising.');
    }
}
exports.Papanca = Papanca;
class Defilements {
    constructor() {
        this.obsessions = new Obsessions();
        this.hindrances = new Hindrances();
        this.effluents = new Effluents();
        this.unskillfulRoots = new UnskillfulRoots();
        this.clinging = new Clinging();
        this.papanca = new Papanca();
    }
    arise() {
        this.obsessions.arise();
        this.hindrances.arise();
        this.effluents.arise();
        this.unskillfulRoots.arise();
        this.clinging.arise();
        this.papanca.arise();
    }
}
exports.Defilements = Defilements;
