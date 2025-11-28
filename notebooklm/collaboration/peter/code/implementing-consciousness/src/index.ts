import { Being } from './Being';
import { KammicSeed } from './Kamma';
import { ConsciousMoment } from './ConsciousMoment';
import { ISituationalContext } from './interfaces';

// 1. Create a being with some initial kamma
const initialKamma = [new KammicSeed(0.8), new KammicSeed(0.5)];
const being = new Being(initialKamma, 0.7, 0.5, 0.5);

// 2. Define the current situational context
const context: ISituationalContext = {};

// 3. Define the previous moment's intention
const previousIntention = { action: 'generosity' };

// 4. Process the conscious moment
const moment = new ConsciousMoment(being, context, previousIntention);
moment.process();
