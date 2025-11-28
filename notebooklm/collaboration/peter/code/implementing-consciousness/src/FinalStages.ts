import { IFinalStages, INutriments, IClingingAggregates, IIntentionAndFabrications, IBeing } from './interfaces';
import { KammicSeed } from './Kamma';

export class Nutriments implements INutriments {
    constructor(
        public physicalFood: number = 0.5,
        public contact: number = 0.5,
        public intellectualIntention: number = 0.5,
        public consciousness: number = 0.5
    ) {}

    arise() {
        console.log('The four nutriments are arising.');
    }
}

export class ClingingAggregates implements IClingingAggregates {
    constructor(
        public form: number = 0.5,
        public feeling: number = 0.5,
        public perception: number = 0.5,
        public mentalFormations: number = 0.5,
        public consciousness: number = 0.5
    ) {}

    arise() {
        console.log('The five clinging-aggregates are arising (2nd arrow).');
    }
}

export class IntentionAndFabrications implements IIntentionAndFabrications {
    public intention: any;
    public bodilyFabrication: any;
    public verbalFabrication: any;
    public mentalFabrication: any;

    constructor() {}

    arise() {
        console.log('Intention and the three fabrications are arising.');
        this.intention = { action: 'new intention' }; // Placeholder
    }

    plantNewKammicSeed(being: IBeing) {
        console.log('A new kammic consciousness seed is planted into the being\'s kammic field.');
        const newSeed = new KammicSeed(Math.random());
        being.kammicField.seeds.push(newSeed);
    }
}

export class FinalStages implements IFinalStages {
    public nutriments: INutriments;
    public clingingAggregates: IClingingAggregates;
    public intentionAndFabrications: IIntentionAndFabrications;

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
