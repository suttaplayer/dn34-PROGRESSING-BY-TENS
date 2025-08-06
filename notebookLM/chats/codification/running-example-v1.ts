// Enums and Interfaces
enum Realm {
    Human = "Human Realm",
    DevaOfThirtyThree = "Devas of the Thirty-three",
    Animal = "Animal Womb",
    Hell = "Hell",
    PureAbodes = "Pure Abodes" // For liberated beings in jhanas
}

enum KammaType {
    DarkWithDarkResult = "Dark with Dark Result", // Injurious actions -> painful feelings
    BrightWithBrightResult = "Bright with Bright Result", // Non-injurious actions -> pleasant feelings
    DarkAndBrightWithDarkAndBrightResult = "Dark & Bright with Dark & Bright Result", // Mixed actions -> mixed feelings
    NeitherDarkNorBright = "Neither Dark nor Bright" // Leading to ending of kamma
}

enum FeelingType {
    Pleasure = "Pleasure",
    Pain = "Pain",
    NeitherPleasureNorPain = "Neither Pleasure Nor Pain"
}

enum EffluentType {
    Sensuality = "Sensuality Effluent", // Kama-asava
    Becoming = "Becoming Effluent",     // Bhava-asava
    Ignorance = "Ignorance Effluent"    // Avijja-asava
}

enum FetterType {
    SelfIdentificationView = "Self-Identification View", // Satkāyadiṭṭhi
    Doubt = "Doubt", // Vicikicchā
    GraspingAtHabitsAndPractices = "Grasping at Habits & Practices", // Sīlabbata-parāmāsa
    SensualPassion = "Sensual Passion", // Kāmacchanda
    IllWill = "Ill Will", // Vyāpāda
    // Higher fetters not directly relevant to this scenario's outcome, but acknowledged in sources
}

class Kamma {
    type: KammaType;
    result: FeelingType;
    originatingAction: string;
    ripeningRealm?: Realm; // A Kamma can have a specific realm it's associated with for ripening

    constructor(type: KammaType, result: FeelingType, originatingAction: string, ripeningRealm?: Realm) {
        this.type = type;
        this.result = result;
        this.originatingAction = originatingAction;
        this.ripeningRealm = ripeningRealm;
    }

    public toString(): string {
        return `Kamma [Type: ${this.type}, Result: ${this.result}, Action: ${this.originatingAction}${this.ripeningRealm ? `, Ripens in: ${this.ripeningRealm}` : ''}]`;
    }
}

class Effluent {
    type: EffluentType;
    // Effluents lead to renewed becoming, trouble, stress, future birth, aging, death
    constructor(type: EffluentType) {
        this.type = type;
    }

    isDestroyed(): boolean {
        // For this simulation, effluents are not destroyed unless explicitly by noble path
        return false;
    }

    public toString(): string {
        return `${this.type}`;
    }
}

class Fetter {
    type: FetterType;
    isEnded: boolean = false;

    constructor(type: FetterType) {
        this.type = type;
    }

    public toString(): string {
        return `${this.type} (Ended: ${this.isEnded})`;
    }
}

class Mind {
    state: string = "normal"; // e.g., "normal", "corrupted", "impassioned", "calm", "liberated"
    discernment: boolean = false; // Simplified: true if developed, false otherwise
    passion: boolean = true;
    aversion: boolean = true;
    delusion: boolean = true;
    isLiberated: boolean = false; // True if mind is released from effluents

    constructor(initialState: string = "normal") {
        this.state = initialState;
    }

    // A mind with passion, aversion, delusion is a cause of unskillful habits
    isDefiled(): boolean {
        return this.passion || this.aversion || this.delusion;
    }

    // Phenomena are preceded by, ruled by, made of the heart
    // Acts with a corrupted heart lead to suffering, with a calm/bright heart lead to happiness
    corrupt(): void {
        this.state = "corrupted";
        this.passion = true;
        this.aversion = true;
        this.delusion = true;
        console.log("Mind state: CORRUPTED (increased passion, aversion, delusion)");
    }

    becomeImpassioned(): void {
        this.state = "impassioned";
        this.passion = true;
        console.log("Mind state: IMPASSIONED (increased sensual desire)");
    }

    becomeCalmAndBright(): void {
        this.state = "calm & bright";
        this.passion = false;
        this.aversion = false;
        this.delusion = false;
        console.log("Mind state: CALM & BRIGHT (reduced passion, aversion, delusion)");
    }

    // Simulating "lack of delusion arises for welfare"
    cultivateNonDelusion(): void {
        this.delusion = false;
    }

    // Simulating "mind not overcome by aversion"
    cultivateNonAversion(): void {
        this.aversion = false;
    }

    // Simulating "mind not overcome by greed"
    cultivateNonGreed(): void {
        this.passion = false;
    }

    releaseFromEffluents(): void {
        this.isLiberated = true;
        this.state = "liberated";
        this.passion = false;
        this.aversion = false;
        this.delusion = false;
        console.log("Mind state: LIBERATED (Effluents ended, no more passion, aversion, delusion)");
    }

    public toString(): string {
        return `Mind [State: ${this.state}, Passion: ${this.passion}, Aversion: ${this.aversion}, Delusion: ${this.delusion}, Liberated: ${this.isLiberated}]`;
    }
}

class Ignorance {
    exists: boolean = true;

    // Ignorance is the root cause of fabrications
    isDestroyed(): boolean {
        // Ignorance is destroyed with the arising of clear knowing
        return !this.exists;
    }

    public toString(): string {
        return `Ignorance [Exists: ${this.exists}]`;
    }
}

class Fabrication {
    type: string; // e.g., "Bodily", "Verbal", "Mental"
    arises: boolean = true;

    constructor(type: string) {
        this.type = type;
    }

    pacification(): void {
        this.arises = false;
    }

    ending(): void {
        this.arises = false;
    }

    public toString(): string {
        return `Fabrication [Type: ${this.type}, Arises: ${this.arises}]`;
    }
}

class Consciousness {
    type: string; // e.g., "Eye", "Ear", "Mind"
    isStationed: boolean = false; // Stationing of consciousness is supported by intention/arrangement/obsession
    isSeed: boolean = true; // Consciousness is the seed for becoming

    constructor(type: string) {
        this.type = type;
    }

    landAndGrow(): void {
        this.isStationed = true;
        console.log(`Consciousness (${this.type}) lands and grows`);
    }

    public toString(): string {
        return `Consciousness [Type: ${this.type}, Stationed: ${this.isStationed}]`;
    }
}

class NameAndForm {
    exists: boolean = false;

    produce(): void {
        this.exists = true;
        console.log("Name-and-Form come into play");
    }

    public toString(): string {
        return `Name-and-Form [Exists: ${this.exists}]`;
    }
}

class SixSenseMedia {
    exists: boolean = false;

    produce(): void {
        this.exists = true;
        console.log("Six Sense Media come into play");
    }

    public toString(): string {
        return `Six Sense Media [Exists: ${this.exists}]`;
    }
}

class Contact {
    exists: boolean = false;

    produce(): void {
        this.exists = true;
        console.log("Contact comes into play");
    }

    public toString(): string {
        return `Contact [Exists: ${this.exists}]`;
    }
}

class Feeling {
    type: FeelingType;
    exists: boolean = false;

    constructor(type: FeelingType = FeelingType.NeitherPleasureNorPain) {
        this.type = type;
    }

    arise(): void {
        this.exists = true;
        console.log(`Feeling (${this.type}) arises`);
    }

    // "To one experiencing feeling I declare, 'This is stress.'"
    causesStress(): string {
        return `Feeling experienced as ${this.type} causes stress.`;
    }

    public toString(): string {
        return `Feeling [Type: ${this.type}, Exists: ${this.exists}]`;
    }
}

class Craving {
    exists: boolean = false;
    types: string[] = []; // e.g., sensual pleasure, becoming, non-becoming

    // Craving develops if one focuses on allure of clingable phenomena
    develop(type: string): void {
        this.exists = true;
        this.types.push(type);
        console.log(`Craving for '${type}' develops`);
    }

    // Craving is the moisture for renewed becoming
    isMoisture(): boolean {
        return this.exists;
    }

    public toString(): string {
        return `Craving [Exists: ${this.exists}, Types: ${this.types.join(', ')}]`;
    }
}

class Clinging {
    exists: boolean = false;
    type: string; // e.g., sensuality, becoming, views, habits

    constructor(type: string) {
        this.type = type;
    }

    // Any desire, embracing, grasping, holding-on to five clinging-aggregates is origination of stress
    engage(): void {
        this.exists = true;
        console.log(`Clinging (${this.type}) comes into play`);
    }

    public toString(): string {
        return `Clinging [Exists: ${this.exists}, Type: ${this.type}]`;
    }
}

class Becoming {
    exists: boolean = false;
    type: string; // e.g., sensuality-becoming, form-becoming, formless-becoming

    constructor(type: string) {
        this.type = type;
    }

    // Production of renewed becoming in the future
    produceRenewed(): void {
        this.exists = true;
        console.log(`Renewed Becoming (${this.type}) comes into play`);
    }

    public toString(): string {
        return `Becoming [Exists: ${this.exists}, Type: ${this.type}]`;
    }
}

class Birth {
    exists: boolean = false;

    // From becoming as a requisite condition comes birth
    occur(): void {
        this.exists = true;
        console.log("Birth occurs");
    }

    public toString(): string {
        return `Birth [Exists: ${this.exists}]`;
    }
}

class AgingAndDeath {
    exists: boolean = false;

    // From birth as a requisite condition come aging-&-death, sorrow, lamentation, pain, distress, & despair
    occur(): void {
        this.exists = true;
        console.log("Aging & Death occur (Sorrow, Lamentation, Pain, Distress, Despair follow)");
    }

    public toString(): string {
        return `Aging & Death [Exists: ${this.exists}]`;
    }
}

// Dependent Co-arising: A static class to model the links
class DependentCoArising {
    static link(
        ignorance: Ignorance,
        fabrications: Fabrication[],
        consciousness: Consciousness,
        nameAndForm: NameAndForm,
        sixSenseMedia: SixSenseMedia,
        contact: Contact,
        feeling: Feeling,
        craving: Craving,
        clinging: Clinging,
        becoming: Becoming,
        birth: Birth,
        agingAndDeath: AgingAndDeath
    ): void {
        console.log("\n--- Dependent Co-arising Chain (Origination) ---");
        fabrications.forEach(fabrication => {
            // From ignorance as a requisite condition come fabrications
            if (ignorance.exists) {
                console.log(`From Ignorance as a requisite condition come Fabrications (${fabrication.type}).`);
                fabrication.arises = true;
            } else {
                console.log("Ignorance does not exist, so fabrications do not arise.");
                fabrication.arises = false;
            }

            // From fabrications as a requisite condition comes consciousness
            if (fabrication.arises) {
                console.log(`From Fabrications as a requisite condition comes Consciousness (${consciousness.type}).`);
                consciousness.landAndGrow();
            } else {
                console.log("Fabrications do not arise, so consciousness does not land.");
                consciousness.isStationed = false;
            }
        });
        // From consciousness as a requisite condition comes name-&-form
        if (consciousness.isStationed) {
            console.log("From Consciousness as a requisite condition comes Name-&-Form.");
            nameAndForm.produce();
        } else {
            console.log("Consciousness is not stationed, so Name-&-Form do not arise.");
            nameAndForm.exists = false;
        }

        // From name-&-form as a requisite condition come the six sense media
        if (nameAndForm.exists) {
            console.log("From Name-&-Form as a requisite condition come the Six Sense Media.");
            sixSenseMedia.produce();
        } else {
            console.log("Name-&-Form do not exist, so Six Sense Media do not arise.");
            sixSenseMedia.exists = false;
        }

        // From the six sense media as a requisite condition comes contact
        if (sixSenseMedia.exists) {
            console.log("From the Six Sense Media as a requisite condition comes Contact.");
            contact.produce();
        } else {
            console.log("Six Sense Media do not exist, so Contact does not arise.");
            contact.exists = false;
        }

        // From contact as a requisite condition comes feeling
        if (contact.exists) {
            console.log(`From Contact as a requisite condition comes Feeling (${feeling.type}).`);
            feeling.arise();
        } else {
            console.log("Contact does not exist, so Feeling does not arise.");
            feeling.exists = false;
        }

        // From feeling as a requisite condition comes craving
        if (feeling.exists) {
            console.log("From Feeling as a requisite condition comes Craving.");
            craving.develop("general"); // Simplified for now, but can be specific like sensual craving.
        } else {
            console.log("Feeling does not exist, so Craving does not arise.");
            craving.exists = false;
        }

        // From craving as a requisite condition comes clinging or sustenance
        if (craving.exists) {
            console.log(`From Craving as a requisite condition comes Clinging (${clinging.type}).`);
            clinging.engage();
        } else {
            console.log("Craving does not exist, so Clinging does not engage.");
            clinging.exists = false;
        }

        // From clinging or sustenance as a requisite condition comes becoming
        if (clinging.exists) {
            console.log(`From Clinging as a requisite condition comes Becoming (${becoming.type}).`);
            becoming.produceRenewed();
        } else {
            console.log("Clinging does not exist, so Becoming does not occur.");
            becoming.exists = false;
        }

        // From becoming as a requisite condition comes birth
        if (becoming.exists) {
            console.log("From Becoming as a requisite condition comes Birth.");
            birth.occur();
        } else {
            console.log("Becoming does not exist, so Birth does not occur.");
            birth.exists = false;
        }

        // From birth as a requisite condition, then aging-&-death, sorrow, lamentation, pain, distress, & despair come into play
        if (birth.exists) {
            console.log("From Birth as a requisite condition comes Aging-&-Death (and the entire mass of stress).");
            agingAndDeath.occur();
        } else {
            console.log("Birth does not occur, so Aging-&-Death do not occur.");
            agingAndDeath.exists = false;
        }
        console.log("--- End of Dependent Co-arising Chain ---");
    }
}

class Being {
    name: string;
    isAlive: boolean;
    currentRealm: Realm;
    mind: Mind;
    ignorance: Ignorance;
    fabricatedActions: Fabrication[];
    consciousness: Consciousness;
    nameAndForm: NameAndForm;
    sixSenseMedia: SixSenseMedia;
    contact: Contact;
    feeling: Feeling;
    craving: Craving;
    clinging: Clinging;
    becoming: Becoming;
    birth: Birth;
    agingAndDeath: AgingAndDeath;
    karmaAccumulator: Kamma[] = [];
    fetters: Fetter[] = [
        new Fetter(FetterType.SelfIdentificationView),
        new Fetter(FetterType.SensualPassion),
        new Fetter(FetterType.IllWill),
        new Fetter(FetterType.Doubt),
        new Fetter(FetterType.GraspingAtHabitsAndPractices),
    ]; // Initial lower fetters
    effluents: Effluent[] = [
        new Effluent(EffluentType.Sensuality),
        new Effluent(EffluentType.Becoming),
        new Effluent(EffluentType.Ignorance),
    ]; // Initial effluents
    rebornAs: Realm | null = null;

    constructor(name: string, realm: Realm) {
        this.name = name;
        this.isAlive = true;
        this.currentRealm = realm;
        this.mind = new Mind();
        this.ignorance = new Ignorance();
        this.fabricatedActions = [
            new Fabrication("Bodily"),
            new Fabrication("Verbal"),
            new Fabrication("Mental")
        ];
        this.consciousness = new Consciousness("Mind");
        this.nameAndForm = new NameAndForm();
        this.sixSenseMedia = new SixSenseMedia();
        this.contact = new Contact();
        this.feeling = new Feeling();
        this.craving = new Craving();
        this.clinging = new Clinging("general");
        this.becoming = new Becoming("general");
        this.birth = new Birth();
        this.agingAndDeath = new AgingAndDeath();
        console.log(`**${this.name}** is created in the ${this.currentRealm}.`);
        console.log(`Initial State: ${this.mind}`);
    }

    // A crucial method to illustrate Samsara's perpetuation and Dependent Co-arising
    // This bootstraps the causal chain with Ignorance and Fabrications as conditions
    wanderOn(): void {
        console.log(`\n--- ${this.name} begins to wander on (experience Saṃsāra) ---`);
        DependentCoArising.link(
            this.ignorance,
            this.fabricatedActions, // Mental fabrication for general existence
            this.consciousness,
            this.nameAndForm,
            this.sixSenseMedia,
            this.contact,
            this.feeling,
            this.craving,
            this.clinging,
            this.becoming,
            this.birth,
            this.agingAndDeath
        );
        console.log(`**${this.name}'s** current state of existence in Saṃsāra.`);
    }

    performAction(actionDesc: string, actionType: 'bodily' | 'verbal' | 'mental', kammaResult: KammaType, intendedRealm?: Realm): void {
        console.log(`\n**${this.name}** performs: **${actionDesc}**`);
        // Kamma is intention
        let feelingResult: FeelingType;
        switch (kammaResult) {
            case KammaType.BrightWithBrightResult:
                feelingResult = FeelingType.Pleasure;
                this.mind.becomeCalmAndBright(); // Acts of merit are blissful
                break;
            case KammaType.DarkWithDarkResult:
                feelingResult = FeelingType.Pain;
                this.mind.corrupt(); // Corrupted heart leads to suffering
                break;
            case KammaType.DarkAndBrightWithDarkAndBrightResult:
                feelingResult = FeelingType.NeitherPleasureNorPain; // Or mixed, simplified to neutral
                this.mind.corrupt(); // Still leads to suffering often
                break;
            default:
                feelingResult = FeelingType.NeitherPleasureNorPain;
        }

        const kamma = new Kamma(kammaResult, feelingResult, actionDesc, intendedRealm);
        this.karmaAccumulator.push(kamma);
        console.log(`Generated: ${kamma}`);
        console.log(`Mind after action: ${this.mind}`);
    }

    // Engaging with senses leads to feelings, craving, clinging, becoming...
    engageWithSensuality(description: string, relishing: boolean): void {
        console.log(`\n**${this.name}** engages in sensuality: **${description}**`);
        // This is a "contact" leading to "feeling"
        this.contact.produce();
        this.feeling.arise();
        this.feeling.type = relishing ? FeelingType.Pleasure : FeelingType.NeitherPleasureNorPain;
        console.log(`${this.feeling.causesStress()}`); // Whatever is felt comes under stress

        if (relishing) {
            // Relishing, welcoming, fastening leads to delight -> clinging -> becoming
            this.craving.develop("sensual pleasure"); // Craving for sensual pleasure
            this.clinging = new Clinging("sensual desire");
            this.clinging.engage();
            this.becoming = new Becoming("sensuality-becoming"); // Kamma ripening in sensuality-property
            this.mind.becomeImpassioned();
            // Effluents: Sensuality effluent linked to this
            console.log(`Effluents are active: ${this.effluents.map(e => e.type).join(', ')}`);
        } else {
            console.log("No relishing, so craving and clinging do not directly increase from this contact.");
        }
        console.log(`Mind state after sensuality: ${this.mind}`);
    }

    // Death triggers the ripening of kamma
    die(): void {
        this.isAlive = false;
        console.log(`\n*** ${this.name} suddenly dies of a heart attack. ***`);
        this.agingAndDeath.occur(); // Death is an instance of AgingAndDeath

        // Determine next rebirth based on accumulated kamma and current state of mind/effluents
        // For this scenario, bad kamma (lying) combined with sensual clinging will lead to animal realm.
        // The good kamma (generosity) may not ripen immediately or may be outweighed.
        // The "trifling evil deed" rule doesn't apply as the being isn't developed.

        const darkKamma = this.karmaAccumulator.filter(k => k.type === KammaType.DarkWithDarkResult);
        const brightKamma = this.karmaAccumulator.filter(k => k.type === KammaType.BrightWithBrightResult);
        const sensualClingingPresent = this.clinging.exists && this.clinging.type === "sensual desire";
        const ignorancePresent = this.ignorance.exists;
        const cravingPresent = this.craving.exists;
        const mindDefiled = this.mind.isDefiled();

        console.log(`\n--- Kamma Ripening Process (at Death) ---`);
        console.log(`Summary of ${this.name}'s actions:`);
        this.karmaAccumulator.forEach(k => console.log(` - ${k}`));
        console.log(`Sensual clinging present: ${sensualClingingPresent}`);
        console.log(`Mind defiled: ${mindDefiled}`);
        console.log(`Ignorance present: ${ignorancePresent}`);
        console.log(`Craving present: ${cravingPresent}`);

        // Orchestration based on conditions described in sources
        // A person taking life, telling lies, engaging in misconduct, and holding wrong views
        // can reappear in the animal womb.
        // Consciousness is the seed, craving the moisture for renewed becoming.
        // Ignorance hinders right understanding.

        if (darkKamma.length > 0 && sensualClingingPresent && mindDefiled && ignorancePresent && cravingPresent) {
            this.rebornAs = Realm.Animal; // Specific to the scenario's request
            console.log(`**Predominant dark kamma (lying) combined with active sensual clinging, defiled mind, ignorance, and craving leads to rebirth in the Animal Realm.**`);
            console.log(`The 'moisture' of craving and 'seed' of consciousness, hindered by ignorance, are established in a lower property.`);
        } else if (brightKamma.length > 0 && !mindDefiled) {
             // Example: If the scenario was different and only bright kamma ripened
            const devaKamma = brightKamma.find(k => k.ripeningRealm === Realm.DevaOfThirtyThree);
            if (devaKamma) {
                this.rebornAs = Realm.DevaOfThirtyThree;
                console.log(`Bright kamma (generosity) ripens, leading to rebirth in the ${this.rebornAs}.`);
            } else {
                 // Fallback if no specific deva kamma or other conditions
                this.rebornAs = Realm.Human;
                console.log(`Mixed kamma or general good conduct leads to rebirth in the ${this.rebornAs}.`);
            }
        } else {
            // Defaulting to a lower realm if conditions for good rebirth are not met
            this.rebornAs = Realm.Hell;
            console.log(`Without sufficient bright kamma or purification, the being is headed for a lower realm: ${this.rebornAs}.`);
        }
        console.log(`--- End of Kamma Ripening Process ---`);
    }

    // Transmigration: Moving to the next existence
    transmigrate(): void {
        if (!this.isAlive && this.rebornAs) {
            this.currentRealm = this.rebornAs;
            this.isAlive = true; // Reborn
            console.log(`\n**${this.name}** transmigrates and is **reborn as a dog** in the **${this.currentRealm}**!`);
            // Reset for the new life, but retain the underlying conditions of Saṃsāra
            this.mind = new Mind("animal mind"); // Mind of animal
            this.ignorance = new Ignorance(); // Ignorance persists in Saṃsāra
            this.fabricatedActions = [
                new Fabrication("Bodily"),
                new Fabrication("Verbal"),
                new Fabrication("Mental")
            ];
            this.consciousness = new Consciousness("Animal Mind");
            this.nameAndForm = new NameAndForm();
            this.sixSenseMedia = new SixSenseMedia();
            this.contact = new Contact();
            this.feeling = new Feeling();
            this.craving = new Craving();
            this.clinging = new Clinging("general");
            this.becoming = new Becoming("animal-becoming");
            this.birth = new Birth();
            this.agingAndDeath = new AgingAndDeath();
            this.karmaAccumulator = []; // New life, new kamma accumulation (though past kamma influences conditions)
            this.rebornAs = null;
            console.log(`New State: ${this.mind}`);
            console.log(`**Saṃsāra perpetuates for ${this.name} through the cycle of birth, aging, and death.**`);
            console.log(`The Being wanders on.`);
        } else if (!this.rebornAs) {
            console.log(`${this.name} is deceased but next realm not determined yet.`);
        } else {
            console.log(`${this.name} is still alive and cannot transmigrate yet.`);
        }
    }
}


// --- Scenario Orchestration ---
console.log("--- Beginning of Scenario ---");

// 1. Create a human being
const humanBeing = new Being("Alice", Realm.Human);
humanBeing.wanderOn(); // Show the initial state of the Dependent Co-arising for Alice

// 2. The human being performs an act of generosity that results in kamma that has potential to ripen with birth in the "deva's of the thirty three" realm
humanBeing.performAction(
    "Donates food and shelter to contemplatives out of confidence",
    "bodily",
    KammaType.BrightWithBrightResult,
    Realm.DevaOfThirtyThree // Act of giving can lead to rebirth among devas
);

// 3. The human being engages in 3 intentional acts of lying
humanBeing.performAction(
    "Tells a lie (first time)",
    "verbal",
    KammaType.DarkWithDarkResult
);
humanBeing.performAction(
    "Tells a lie (second time)",
    "verbal",
    KammaType.DarkWithDarkResult
);
humanBeing.performAction(
    "Tells a lie (third time)",
    "verbal",
    KammaType.DarkWithDarkResult
);
// The mind is now corrupted due to these actions and aversion/delusion may be strengthened.
// Effluents of ignorance and becoming are still very active as they haven't been abandoned.
// The fettered state (e.g., self-identification view, sensual passion, ill will) remains active.

// 4. The human being welcoming, relishing and remaining fastened to watching a movie on TV
humanBeing.engageWithSensuality("Watching a captivating movie on TV (with strong relish and attachment)", true);
// This act fuels craving for sensuality, which leads to clinging
// and contributes to becoming (specifically sensuality-becoming).
// This also highlights the active role of existing effluents in orchestrating continuity.

// 5. The human being watching the movie then suddenly dies of a heart attack
humanBeing.die();

// 6. The being is reborn as a dog in the animal realm
humanBeing.transmigrate();

console.log("\n--- End of Scenario ---");
