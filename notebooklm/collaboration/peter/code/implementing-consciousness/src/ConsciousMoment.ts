import { IBeing, IConsciousness, IKammicSeed, INameAndForm, ISituationalContext } from './interfaces';
import { Consciousness } from './Consciousness';

export class ConsciousMoment {
    private being: IBeing;
    private context: ISituationalContext;
    private previousIntention: any;

    constructor(being: IBeing, context: ISituationalContext, previousIntention: any) {
        this.being = being;
        this.context = context;
        this.previousIntention = previousIntention;
    }

    process(): void {
        console.log('--- Starting processing of a new conscious moment ---');

        // 1. A consciousness seed of becoming is ripened from one of the being's kammic fields
        const consciousnessSeed = this.being.kammicField.selectSeed(this.context);
        console.log('A consciousness seed has been selected from the kammic field.');

        const consciousness = new Consciousness(consciousnessSeed);

        // 2. The consciousness seed is supported by heat and vitality fabrication
        const heat = 'some_heat'; // Placeholder
        const vitality = 'some_vitality'; // Placeholder
        consciousness.support(heat, vitality);

        // 3. The consciousness seed leads to a name-&-form
        const nameAndForm = consciousness.arise(this.context, this.previousIntention, this.being.conviction);

        // 4. Ripen the potential of the consciousness seed
        const sensoryContact = consciousnessSeed.ripen(this.being.ignorance, this.being.craving);

        // 5. Establish raw feeling and perception
        const { feeling, perception } = sensoryContact.establishFeelingAndPerception();

        // 6. Defilements arise
        this.being.defilements.arise();

        // 7. Awakening factors arise
        this.being.awakeningFactors.arise();

        // 8. Final stages arise
        this.being.finalStages.arise();

        // 9. A new kammic seed is planted
        this.being.finalStages.intentionAndFabrications.plantNewKammicSeed(this.being);

        // ... to be continued
        console.log('--- End of initial processing of the conscious moment ---');
    }
}
