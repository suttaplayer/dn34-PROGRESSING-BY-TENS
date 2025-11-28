import { ConsciousMoment } from '../src/ConsciousMoment';
import { Being } from '../src/Being';
import { KammicSeed } from '../src/Kamma';
import { ISituationalContext } from '../src/interfaces';

describe('ConsciousMoment', () => {
    it('should process a conscious moment without errors', () => {
        const initialKamma = [new KammicSeed(0.8)];
        const being = new Being(initialKamma, 0.7, 0.5, 0.5);
        const context: ISituationalContext = {};
        const previousIntention = { action: 'generosity' };

        const moment = new ConsciousMoment(being, context, previousIntention);

        // We expect this to run without throwing an error.
        // We can add more specific assertions later.
        expect(() => moment.process()).not.toThrow();
    });
});
