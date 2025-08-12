interface Being {
    mind: Mind;
    karmicField: KarmicField;
    perceiveContact(contact: Contact): void;
}

// Represents the composite state of a being's defilements
class EffluentState {
    cravingForSensuality: number;
    cravingForBecoming: number;
    cravingForNonBecoming: number; // New attribute
    ignorance: number;

    constructor(initialState: { cravingForSensuality: number, cravingForBecoming: number, cravingForNonBecoming: number, ignorance: number }) {
        this.cravingForSensuality = initialState.cravingForSensuality;
        this.cravingForBecoming = initialState.cravingForBecoming;
        this.cravingForNonBecoming = initialState.cravingForNonBecoming;
        this.ignorance = initialState.ignorance;
    }

    isFettered(): boolean {
        return this.cravingForSensuality > 0 || this.cravingForBecoming > 0 || this.cravingForNonBecoming > 0 || this.ignorance > 0;
    }

    updateState(clingingMagnitude: number, kammaGenerated: number): void {
        this.cravingForSensuality += (clingingMagnitude * 0.1);
        this.cravingForBecoming += (clingingMagnitude * 0.1);
        this.cravingForNonBecoming += (clingingMagnitude * 0.1); // Update logic
        this.ignorance += (kammaGenerated * 0.05);
        this.cravingForSensuality = Math.max(0, this.cravingForSensuality);
        this.cravingForBecoming = Math.max(0, this.cravingForBecoming);
        this.cravingForNonBecoming = Math.max(0, this.cravingForNonBecoming);
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
class Contact {
    sense: string;
    object: string;
    type: string; // Added type to differentiate contact types (e.g., 'sensory', 'painful')
    constructor(sense: string, object: string, type: string) {
        this.sense = sense;
        this.object = object;
        this.type = type; 
    }
}

// The central orchestrator of the process
class Mind {
    effluentState: EffluentState;

    constructor(initialEffluentState: EffluentState) {
        this.effluentState = initialEffluentState;
    }

    processContact(contact: Contact): { clinging: Clinging, becoming: Becoming } {
        if (!this.effluentState.isFettered()) {
            console.log("Mind is free. Contact perceived without clinging.");
            return null;
        }

        const craving: Craving = this.crave(contact);
        const clinging: Clinging = this.cling(craving);
        const becoming: Becoming = this.become(clinging);

        this.effluentState.updateState(clinging.magnitude, becoming.kammaGenerated);
        
        return { clinging, becoming };
    }
    
    private crave(contact: Contact): Craving {
        let cravingMagnitude = 0;
        
        // Scenario 1: Standard contact
        if (contact.type === 'sensory') {
            cravingMagnitude = this.effluentState.cravingForSensuality * 0.5 + this.effluentState.cravingForBecoming * 0.2;
            console.log("A sensory contact triggers craving for sensuality/becoming.");
        } 
        
        // Scenario 2: Painful contact triggers craving for non-becoming
        else if (contact.type === 'painful') {
            cravingMagnitude = this.effluentState.cravingForNonBecoming * 0.7 + this.effluentState.ignorance * 0.3;
            console.log("A painful contact triggers craving for non-becoming.");
        }
        
        return new Craving(cravingMagnitude);
    }

    private cling(craving: Craving): Clinging {
        const clingingMagnitude = craving.magnitude * 1.5;
        return new Clinging(clingingMagnitude);
    }
    
    private become(clinging: Clinging): Becoming {
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

    perceiveContact(contact: Contact): void {
        console.log(`\n--- New Contact: ${contact.sense} to ${contact.object} (type: ${contact.type}) ---`);
        const result = this.mind.processContact(contact);
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
    cravingForNonBecoming: 10, // A high value for this specific craving
    ignorance: 8
});

const sufferingBeing = new BeingImpl(sufferingBeingEffluents);

// The being experiences a painful sensation
sufferingBeing.perceiveContact(new Contact("body", "pain", "painful"));

// The being experiences a neutral sensation
sufferingBeing.perceiveContact(new Contact("eye", "a neutral wall", "sensory"));
