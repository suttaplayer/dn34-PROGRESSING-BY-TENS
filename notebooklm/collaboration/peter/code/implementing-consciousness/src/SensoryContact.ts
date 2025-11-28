import { ISensoryContact, IFeeling, IPerception } from './interfaces';
import { Feeling } from './Feeling';
import { Perception } from './Perception';

export class SensoryContact implements ISensoryContact {
    constructor() {
        console.log('Sensory contact established.');
    }

    establishFeelingAndPerception(): { feeling: IFeeling, perception: IPerception } {
        console.log('Establishing raw feeling and perception (1st arrow)...');
        const feeling = new Feeling();
        const perception = new Perception();
        console.log('Feeling is the meeting place.');
        return { feeling, perception };
    }
}
