import { IAwakeningFactors, ISevenFactorsOfAwakening, IWingsToAwakening } from './interfaces';

export class SevenFactorsOfAwakening implements ISevenFactorsOfAwakening {
    constructor(
        public mindfulness: number = 0,
        public analysisOfQualities: number = 0,
        public persistence: number = 0,
        public rapture: number = 0,
        public calm: number = 0,
        public concentration: number = 0,
        public equanimity: number = 0
    ) {}

    arise() {
        console.log('Seven factors of awakening are arising.');
    }
}

export class WingsToAwakening implements IWingsToAwakening {
    public sevenFactorsOfAwakening: ISevenFactorsOfAwakening;
    public fourFoundationsOfMindfulness: any;
    public fourRightExertions: any;
    public fourBasesOfPower: any;
    public fiveFaculties: any;
    public fivePowers: any;
    public nobleEightfoldPath: any;

    constructor() {
        this.sevenFactorsOfAwakening = new SevenFactorsOfAwakening();
    }

    arise() {
        console.log('Wings to awakening are arising.');
        this.sevenFactorsOfAwakening.arise();
    }
}

export class AwakeningFactors implements IAwakeningFactors {
    public sevenFactors: ISevenFactorsOfAwakening;
    public wingsToAwakening: IWingsToAwakening;

    constructor() {
        this.wingsToAwakening = new WingsToAwakening();
        this.sevenFactors = this.wingsToAwakening.sevenFactorsOfAwakening;
    }

    arise() {
        this.wingsToAwakening.arise();
    }
}
