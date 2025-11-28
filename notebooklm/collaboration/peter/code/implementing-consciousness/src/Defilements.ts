import { IDefilements, IEffluents, IHindrances, IObsessions, IUnskillfulRoots, IClinging, IPapanca } from './interfaces';

export class Obsessions implements IObsessions {
    constructor(
        public sensualPassion: number = 0.5,
        public resistance: number = 0.5,
        public views: number = 0.5,
        public uncertainty: number = 0.5,
        public conceit: number = 0.5,
        public passionForBecoming: number = 0.5,
        public ignorance: number = 0.5
    ) {}

    arise() {
        console.log('Obsessions are arising.');
    }
}

export class Hindrances implements IHindrances {
    constructor(
        public sensualDesire: number = 0.5,
        public illWill: number = 0.5,
        public slothAndDrowsiness: number = 0.5,
        public restlessnessAndAnxiety: number = 0.5,
        public uncertainty: number = 0.5
    ) {}

    arise() {
        console.log('Hindrances are arising.');
    }
}

export class Effluents implements IEffluents {
    constructor(
        public sensuality: number = 0.5,
        public becoming: number = 0.5,
        public ignorance: number = 0.5
    ) {}

    arise() {
        console.log('Effluents are arising.');
    }
}

export class UnskillfulRoots implements IUnskillfulRoots {
    constructor(
        public greed: number = 0.5,
        public hatred: number = 0.5,
        public delusion: number = 0.5
    ) {}

    arise() {
        console.log('Unskillful roots are arising.');
    }
}

export class Clinging implements IClinging {
    constructor(
        public sensuality: number = 0.5,
        public views: number = 0.5,
        public ritesAndRituals: number = 0.5,
        public doctrineOfSelf: number = 0.5
    ) {}

    arise() {
        console.log('Clinging is arising.');
    }
}

export class Papanca implements IPapanca {
    constructor(
        public measurement: number = 0.5,
        public objectification: number = 0.5
    ) {}

    arise() {
        console.log('Measurement and objectification (papañca) are arising.');
    }
}

export class Defilements implements IDefilements {
    public obsessions: IObsessions;
    public hindrances: IHindrances;
    public effluents: IEffluents;
    public unskillfulRoots: IUnskillfulRoots;
    public clinging: IClinging;
    public papanca: IPapanca;

    constructor() {
        this.obsessions = new Obsessions();
        this.hindrances = new Hindrances();
        this.effluents = new Effluents();
        this.unskillfulRoots = new UnskillfulRoots();
        this.clinging = new Clinging();
        this.papanca = new Papanca();
    }

    arise() {
        this.obsessions.arise();
        this.hindrances.arise();
        this.effluents.arise();
        this.unskillfulRoots.arise();
        this.clinging.arise();
        this.papanca.arise();
    }
}
