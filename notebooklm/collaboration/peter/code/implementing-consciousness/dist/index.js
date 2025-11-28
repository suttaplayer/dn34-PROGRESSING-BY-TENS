"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Being_1 = require("./Being");
const Kamma_1 = require("./Kamma");
const ConsciousMoment_1 = require("./ConsciousMoment");
// 1. Create a being with some initial kamma
const initialKamma = [new Kamma_1.KammicSeed(0.8), new Kamma_1.KammicSeed(0.5)];
const being = new Being_1.Being(initialKamma, 0.7, 0.5, 0.5);
// 2. Define the current situational context
const context = {};
// 3. Define the previous moment's intention
const previousIntention = { action: 'generosity' };
// 4. Process the conscious moment
const moment = new ConsciousMoment_1.ConsciousMoment(being, context, previousIntention);
moment.process();
