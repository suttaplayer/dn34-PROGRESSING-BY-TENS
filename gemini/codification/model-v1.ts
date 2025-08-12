interface Being {
    mind: Mind;
    karmicField: KarmicField;
    perceiveContact(contact: Contact): void;
}

// Represents the composite state of a being's defilements
class EffluentState {
    cravingForSensuality: number; // A numerical representation of the strength
    cravingForBecoming: number;
    ignorance: number;

    constructor(initialState: { cravingForSensuality: number, cravingForBecoming: number, ignorance: number }) {
        this.cravingForSensuality = initialState.cravingForSensuality;
        this.cravingForBecoming = initialState.cravingForBecoming;
        this.ignorance = initialState.ignorance;
    }

    // Method to check if the being is "fettered"
    isFettered(): boolean {
        return this.cravingForSensuality > 0 || this.cravingForBecoming > 0 || this.ignorance > 0;
    }

    // Method to update the effluent state based on actions and kamma
    updateState(clingingMagnitude: number, kammaGenerated: number): void {
        this.cravingForSensuality += (clingingMagnitude * 0.1); // Example logic
        this.cravingForBecoming += (clingingMagnitude * 0.1);
        this.ignorance += (kammaGenerated * 0.05);
        // Ensure values don't become negative
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
class Contact {
    sense: string;
    object: string;
    constructor(sense: string, object: string) {
        this.sense = sense;
        this.object = object;
    }
}

// The central orchestrator of the process
class Mind {
    effluentState: EffluentState;

    constructor(initialEffluentState: EffluentState) {
        this.effluentState = initialEffluentState;
    }

    // This method orchestrates the chain from contact to kamma generation
    processContact(contact: Contact): { clinging: Clinging, becoming: Becoming } {
        if (!this.effluentState.isFettered()) {
            console.log("Mind is free. Contact perceived without clinging.");
            return null; // The cycle is broken
        }

        // The input effluent state "X" makes the mind "subject to" clinging
        const craving: Craving = this.crave(contact);
        const clinging: Clinging = this.cling(craving);
        const becoming: Becoming = this.become(clinging);

        // Update the effluent state with the result, creating state "Y"
        this.effluentState.updateState(clinging.magnitude, becoming.kammaGenerated);

        return { clinging, becoming };
    }

    // Methods representing the steps in the chain
    private crave(contact: Contact): Craving {
        // Craving is directly conditioned by the current effluent state "X"
        const cravingMagnitude = this.effluentState.cravingForSensuality * 0.5 + this.effluentState.ignorance * 0.2;
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

    perceiveContact(contact: Contact): void {
        console.log(`\n--- New Contact: ${contact.sense} to ${contact.object} ---`);
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

// Example usage
const initialEffluents = new EffluentState({
    cravingForSensuality: 5,
    cravingForBecoming: 3,
    ignorance: 8
});

const myBeing = new BeingImpl(initialEffluents);

// Cycle 1: A new contact is perceived
myBeing.perceiveContact(new Contact("eye", "a beautiful form"));

// Cycle 2: A second contact is perceived
myBeing.perceiveContact(new Contact("ear", "a pleasant sound"));

// Imagine the being has managed to reduce their defilements
myBeing.mind.effluentState.cravingForSensuality = 0;
myBeing.mind.effluentState.cravingForBecoming = 0;
myBeing.mind.effluentState.ignorance = 0;

// Cycle 3: The being is now free from effluents
myBeing.perceiveContact(new Contact("eye", "a beautiful form"));