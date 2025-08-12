interface Being {
    mind: Mind;
    karmicField: KarmicField;
    perceiveContact(contact: Contact): void;
}

// Represents the composite state of a being's defilements
class EffluentState {
    cravingForSensuality: number;
    cravingForBecoming: number;
    ignorance: number;

    constructor(initialState: { cravingForSensuality: number, cravingForBecoming: number, ignorance: number }) {
        this.cravingForSensuality = initialState.cravingForSensuality;
        this.cravingForBecoming = initialState.cravingForBecoming;
        this.ignorance = initialState.ignorance;
    }

    isFettered(): boolean {
        return this.cravingForSensuality > 0 || this.cravingForBecoming > 0 || this.ignorance > 0;
    }

    updateState(clingingMagnitude: number, kammaGenerated: number): void {
        this.cravingForSensuality += (clingingMagnitude * 0.1);
        this.cravingForBecoming += (clingingMagnitude * 0.1);
        this.ignorance += (kammaGenerated * 0.05);
        this.cravingForSensuality = Math.max(0, this.cravingForSensuality);
        this.cravingForBecoming = Math.max(0, this.cravingForBecoming);
        this.ignorance = Math.max(0, this.ignorance);
    }
}
// Represents the karmic field where actions are stored
class KarmicField {
    karma: number = 0; // A single number for simplicity

    addKamma(kammaAmount: number): void {
        this.karma += kammaAmount;
    }
}

// Represents the moment of interaction between a sense and an object
class MentalEvent {
    feeling: 'pleasant' | 'unpleasant' | 'neutral';
    perception: string; // Represents the interpretation of the feeling, e.g., 'intolerable'
    view: string; // Represents the accompanying view, e.g., 'BeingsShouldNotBeSubjectedToThis'

    constructor(feeling: 'pleasant' | 'unpleasant' | 'neutral', perception: string, view: string) {
        this.feeling = feeling;
        this.perception = perception;
        this.view = view;
    }
}

// The central orchestrator of the process
class Mind {
    effluentState: EffluentState;

    constructor(initialEffluentState: EffluentState) {
        this.effluentState = initialEffluentState;
    }

    processMentalEvent(mentalEvent: MentalEvent): { clinging: Clinging, becoming: Becoming } | null {
        if (!this.effluentState.isFettered()) {
            console.log("Mind is free. Mental event perceived without clinging.");
            return null;
        }

        const craving: Craving = this.crave(mentalEvent);
        const clinging: Clinging = this.cling(craving);
        const becoming: Becoming = this.become(clinging);

        this.effluentState.updateState(clinging.magnitude, becoming.kammaGenerated);

        return { clinging, becoming };
    }

    private crave(mentalEvent: MentalEvent): Craving {
        let cravingMagnitude = 0;
        let isNonBecomingCraving = false;

        // The specific conditions for craving for non-becoming
        if (mentalEvent.feeling === 'unpleasant' && 
            mentalEvent.perception === 'intolerable' && 
            mentalEvent.view === 'BeingsShouldNotBeSubjectedToThis'
        ) {
            isNonBecomingCraving = true;
            console.log("A mental event of painful feeling, intolerable perception, and unwholesome view triggers a craving for non-becoming.");
            // Craving for non-becoming is a powerful expression of bhavataṇhā & avijjā
            cravingMagnitude = (this.effluentState.cravingForBecoming * 1.5) + (this.effluentState.ignorance * 1.2);
        } else {
            // Standard craving from existing effluents
            cravingMagnitude = (this.effluentState.cravingForSensuality * 0.5) + (this.effluentState.cravingForBecoming * 0.2);
            console.log("A standard mental event triggers a craving for sensuality/becoming.");
        }

        return new Craving(cravingMagnitude);
    }

    private cling(craving: Craving): Clinging {
        // Clinging arises from craving
        const clingingMagnitude = craving.magnitude * 1.5;
        return new Clinging(clingingMagnitude);
    }
    
    private become(clinging: Clinging): Becoming {
        // Becoming is a result of clinging, which in turn generates kamma
        const kammaGenerated = clinging.magnitude * 2;
        return new Becoming(kammaGenerated);
    }
}

class Craving {
    magnitude: number;
    constructor(magnitude: number) { this.magnitude = magnitude; }
}

class Clinging {
    magnitude: number;
    constructor(magnitude: number) { this.magnitude = magnitude; }
}

class Becoming {
    kammaGenerated: number;
    constructor(kammaGenerated: number) { this.kammaGenerated = kammaGenerated; }
}

class BeingImpl implements Being {
    mind: Mind;
    karmicField: KarmicField;

    constructor(initialState: EffluentState) {
        this.mind = new Mind(initialState);
        this.karmicField = new KarmicField();
    }

    perceiveContact(contact: MentalEvent): void {
        console.log(`\n--- New Contact: ${contact.sense} to ${contact.object} (type: ${contact.type}) ---`);
        const result = this.mind.processMentalEvent(contact);
        if (result) {
            console.log(`Clinging magnitude: ${result.clinging.magnitude.toFixed(2)}`);
            console.log(`Becoming generated kamma: ${result.becoming.kammaGenerated.toFixed(2)}`);
            this.karmicField.addKamma(result.becoming.kammaGenerated);
        }
        console.log("Current Effluent State:", this.mind.effluentState);
        console.log("Current Karmic Field:", this.karmicField.karma.toFixed(2));
    }
}

// Imagine a being who has suffered greatly, leading to a strong craving for non-becoming
const sufferingBeingEffluents = new EffluentState({
    cravingForSensuality: 2,
    cravingForBecoming: 1,
    ignorance: 8
});

const sufferingBeing = new BeingImpl(sufferingBeingEffluents);

// The being experiences a painful sensation
sufferingBeing.perceiveContact(new MentalEvent("body", "pain", "painful"));

// The being experiences a neutral sensation
sufferingBeing.perceiveContact(new MentalEvent("eye", "a neutral wall", "sensory"));
