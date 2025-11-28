import { IBeing, IKammicField, IKammicSeed, IDefilements, IAwakeningFactors, IFinalStages } from './interfaces';
import { KammicField, KammicSeed } from './Kamma';
import { Defilements } from './Defilements';
import { AwakeningFactors } from './AwakeningFactors';
import { FinalStages } from './FinalStages';

export class Being implements IBeing {
    public kammicField: IKammicField;
    public conviction: number;
    public ignorance: number;
    public craving: number;
    public defilements: IDefilements;
    public awakeningFactors: IAwakeningFactors;
    public finalStages: IFinalStages;

    constructor(initialKamma: IKammicSeed[], initialConviction: number = 0, initialIgnorance: number = 0.5, initialCraving: number = 0.5) {
        this.kammicField = new KammicField(initialKamma);
        this.conviction = initialConviction;
        this.ignorance = initialIgnorance;
        this.craving = initialCraving;
        this.defilements = new Defilements();
        this.awakeningFactors = new AwakeningFactors();
        this.finalStages = new FinalStages();
    }
}
