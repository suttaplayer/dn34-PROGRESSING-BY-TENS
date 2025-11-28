"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SensoryContact = void 0;
const Feeling_1 = require("./Feeling");
const Perception_1 = require("./Perception");
class SensoryContact {
    constructor() {
        console.log('Sensory contact established.');
    }
    establishFeelingAndPerception() {
        console.log('Establishing raw feeling and perception (1st arrow)...');
        const feeling = new Feeling_1.Feeling();
        const perception = new Perception_1.Perception();
        console.log('Feeling is the meeting place.');
        return { feeling, perception };
    }
}
exports.SensoryContact = SensoryContact;
