import { IKammicField, IKammicSeed, ISituationalContext, ISensoryContact } from './interfaces';
import { SensoryContact } from './SensoryContact';

export class KammicSeed implements IKammicSeed {
    constructor(public potential: number) {}

    ripen(ignorance: number, craving: number): ISensoryContact {
        console.log('Kammic seed is ripening...');
        // The potential of the seed is affected by ignorance and craving.
        const ripenedPotential = this.potential * (1 - ignorance) * craving;
        console.log(`Ripened potential is ${ripenedPotential}`);
        return new SensoryContact();
    }
}

export class KammicField implements IKammicField {
    constructor(public seeds: IKammicSeed[]) {}

    selectSeed(context: ISituationalContext): IKammicSeed {
        // Logic to select a seed based on context will be implemented here.
        // For now, just return the first seed.
        if (this.seeds.length > 0) {
            return this.seeds[0];
        }
        throw new Error("Kammic field is empty.");
    }
}
