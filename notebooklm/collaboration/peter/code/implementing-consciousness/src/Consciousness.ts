import { IConsciousness, IKammicSeed, INameAndForm, ISituationalContext } from './interfaces';
import { NameAndForm } from './NameAndForm';

export class Consciousness implements IConsciousness {
    public seed: IKammicSeed;
    private supported: boolean = false;

    constructor(seed: IKammicSeed) {
        this.seed = seed;
    }

    support(heat: any, vitality: any): void {
        // Logic for heat and vitality support
        this.supported = true;
        console.log('Consciousness seed is supported by heat and vitality.');
    }

    arise(context: ISituationalContext, intention: any, conviction: number): INameAndForm {
        if (!this.supported) {
            throw new Error("Consciousness cannot arise without support.");
        }

        // The level of attention is established based on previous moment's intention and conviction.
        // This is a placeholder for a more complex calculation.
        const attention = conviction * 0.5 + Math.random() * 0.5; // Placeholder

        console.log('Consciousness seed leads to a new Name-&-Form.');
        return new NameAndForm(attention);
    }
}
