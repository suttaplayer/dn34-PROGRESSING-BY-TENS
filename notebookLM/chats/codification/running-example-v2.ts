// Enums representing different realms of existence
enum Realm {
    Human = "Human",
    Deva = "Deva", // Includes various deva realms
    Animal = "Animal Womb",
    Hell = "Hell",
    HungryGhost = "Hungry Ghost Realm",
    PureAbodes = "Pure Abodes", // For non-returners who spontaneously reappear there
    FormlessRealm = "Formless Realm" // E.g., dimension of infinitude of consciousness, nothingness
}

// Enum for when kamma ripens
enum KammaRipeningTime {
    HereAndNow = "Here and Now",
    LaterThisLifetime = "Later in this Lifetime",
    FutureLives = "In Future Lives"
}

// Enum for types of fetters, as they are abandoned in stages
enum FetterType {
    Lower = "Lower Fetter", // sensual desire, ill will, self-identity views, grasping at habits & practices, uncertainty
    Higher = "Higher Fetter" // passion for form, passion for formlessness, conceit, restlessness, ignorance
}

// Enum for the six sense media
enum SenseMedia {
    Eye = "Eye",
    Ear = "Ear",
    Nose = "Nose",
    Tongue = "Tongue",
    Body = "Body",
    Intellect = "Intellect"
}

// Interface for a specific kamma potential
interface KammaPotential {
    description: string;
    intensity: number; // Positive for skillful, negative for unskillful
    ripeningTime: KammaRipeningTime;
    hasExpired: boolean; // Once ripened, it expires
}

// Interface for general mental qualities, whether skillful or unskillful
interface MentalQuality {
    name: string;
    isSkillful: boolean;
    isObstacle: boolean; // Indicates if it's an obstruction to liberation
}

// Fetter class, extending MentalQuality to represent unskillful bonds
class Fetter implements MentalQuality {
    name: string;
    isSkillful = false;
    isObstacle = true;
    type: FetterType;
    isAbandoned: boolean; // True if this fatter has been abandoned

    constructor(name: string, type: FetterType) {
        this.name = name;
        this.type = type;
        this.isAbandoned = false;
    }

    abandon(): void {
        this.isAbandoned = true;
        console.log(`${this.name} is abandoned.`); // Abandoning fetters is part of the path to release
    }
}

// Specific classes for key defilements, also treated as fetters
class Craving extends Fetter {
    constructor() {
        super("Craving", FetterType.Higher); // Craving (taṇhā) is a key condition for becoming and wandering-on
    }
}

class Ignorance extends Fetter {
    constructor() {
        super("Ignorance", FetterType.Higher); // Ignorance (avijjā) is the root condition for fabrications and the entire cycle of suffering
    }
}

// Represents the 37 Wings to Awakening (Bodhipakkhiyā Dhammā) as skillful qualities
class WingToAwakening implements MentalQuality {
    name: string;
    isSkillful = true;
    isObstacle = false;
    isDeveloped: boolean; // Indicates if this quality has been cultivated

    constructor(name: string) {
        this.name = name;
        this.isDeveloped = false;
    }

    develop(): void {
        this.isDeveloped = true;
        console.log(`${this.name} is developed.`); // Development of skillful qualities leads to liberation
    }
}

// Example: Mindfulness as a Wing to Awakening
class Mindfulness extends WingToAwakening {
    constructor() {
        super("Mindfulness");
    }
}

// Example: Discernment as a Wing to Awakening and a key factor in liberation
class Discernment extends WingToAwakening {
    constructor() {
        super("Discernment");
    }
    attainsCulminationAndAbundance(): void {
        console.log("Discernment has attained culmination and abundance.");
    }
}

// Release (Vimutti) as the ultimate goal
class Release {
    isAwarenessRelease: boolean;
    isDiscernmentRelease: boolean;
    isUnbound: boolean; // Represents total unbinding (Nibbana)

    constructor() {
        this.isAwarenessRelease = false;
        this.isDiscernmentRelease = false;
        this.isUnbound = false;
    }

    attainUnbinding(effluentsEnded: boolean): void {
        if (effluentsEnded) {
            this.isUnbound = true;
            this.isAwarenessRelease = true;
            this.isDiscernmentRelease = true;
            console.log("\n**Achieved total unbinding! Birth is ended, the holy life fulfilled, the task done. There is nothing further for this world.**");
        }
    }
}

// Representing the Five Clinging-Aggregates (Pañcupādānakkhandhā)
// All aggregates are inconstant, stressful, and not-self
interface Aggregate {
    name: string;
    isInconstant: boolean;
    isStressful: boolean;
    isNotSelf: boolean;
    isFabricated: boolean; // Everything conditioned is fabricated
}

class FormAggregate implements Aggregate {
    name = "Form"; isInconstant = true; isStressful = true; isNotSelf = true; isFabricated = true;
}
class FeelingAggregate implements Aggregate {
    name = "Feeling"; isInconstant = true; isStressful = true; isNotSelf = true; isFabricated = true;
}
class PerceptionAggregate implements Aggregate {
    name = "Perception"; isInconstant = true; isStressful = true; isNotSelf = true; isFabricated = true;
}
class FabricationAggregate implements Aggregate {
    name = "Fabrications"; isInconstant = true; isStressful = true; isNotSelf = true; isFabricated = true;
}
class ConsciousnessAggregate implements Aggregate {
    name = "Consciousness"; isInconstant = true; isStressful = true; isNotSelf = true; isFabricated = true;
}

type AllAggregates = {
    form: FormAggregate;
    feeling: FeelingAggregate;
    perception: PerceptionAggregate;
    fabrications: FabricationAggregate;
    consciousness: ConsciousnessAggregate;
}

// Factory function to create a new set of aggregates for each new 'Being' instance
const createNewAggregates = (): AllAggregates => ({
    form: new FormAggregate(),
    feeling: new FeelingAggregate(),
    perception: new PerceptionAggregate(),
    fabrications: new FabricationAggregate(),
    consciousness: new ConsciousnessAggregate(),
});

// KammaField class to manage kamma potentials. It is carried across lives.
class KammaField {
    private potentials: KammaPotential[];

    constructor(initialPotentials: KammaPotential[] = []) {
        this.potentials = initialPotentials;
        console.log("KammaField initialized.");
    }

    addKamma(potential: KammaPotential): void {
        this.potentials.push(potential);
    }

    // Simulates kamma ripening at any conscious moment, not just at death [previous turn, 10, 11, 12, 13, 18]
    ripenKammaAtConsciousMoment(): KammaPotential[] {
        const ripened: KammaPotential[] = [];
        this.potentials = this.potentials.filter(p => {
            if (!p.hasExpired) {
                // Simplified ripening logic: a chance for "here and now" kamma to ripen
                if (p.ripeningTime === KammaRipeningTime.HereAndNow || Math.random() < 0.1) {
                    ripened.push(p);
                    p.hasExpired = true;
                    return false; // Remove if it has fully ripened now
                }
            }
            return !p.hasExpired; // Keep unexpired potentials
        });
        return ripened;
    }

    // Returns kamma that has not yet ripened and will carry over
    getFutureKammaPotentials(): KammaPotential[] {
        return this.potentials.filter(p => !p.hasExpired);
    }

    // For Arahants, old kamma is destroyed with each contact
    destroyOldKammaWithContact(): void {
        this.potentials = this.potentials.filter(p => p.intensity > 0); // Only skillful kamma remains (does not lead to new becoming)
        console.log("Old kamma being destroyed with each contact (for an enlightened being).");
    }
}

// The Being class now represents an *instance* of existence, not a continuous entity
class Being {
    static idCounter: number = 0;
    private id: number; // Unique ID for this specific instance of existence
    private name: string; // A descriptive label, not a persistent self
    private currentRealm: Realm;
    private aggregates: AllAggregates; // The five clinging-aggregates that constitute this being
    private kammaField: KammaField; // The field of kamma potentials influencing this being and future ones
    private unskillfulMentalQualities: Fetter[]; // Such as the ten fetters
    private skillfulMentalQualities: WingToAwakening[]; // Such as the 37 wings to awakening
    public isEnlightened: boolean; // Whether this instance has achieved Arahantship
    private canBeClassified: boolean; // An Arahant cannot be classified

    constructor(
        name: string,
        initialRealm: Realm,
        kammaField: KammaField, // Pass the existing kamma field to maintain continuity
        initialUnskillfulQualities: Fetter[] = [],
        initialSkillfulQualities: WingToAwakening[] = []
    ) {
        this.id = ++Being.idCounter;
        this.name = name; // A identifier for tracking the "stream" for conversational purposes
        this.currentRealm = initialRealm;
        this.aggregates = createNewAggregates(); // New aggregates are generated for each new birth instance
        this.kammaField = kammaField; // This KammaField object is the "carrier" of kamma across instances
        this.unskillfulMentalQualities = initialUnskillfulQualities.map(f => Object.assign(Object.create(Object.getPrototypeOf(f)), f)); // Deep copy to allow individual modification
        this.skillfulMentalQualities = initialSkillfulQualities.map(s => Object.assign(Object.create(Object.getPrototypeOf(s)), s)); // Deep copy
        this.isEnlightened = false;
        this.canBeClassified = true; // By default, beings can be classified

        console.log(`**New Being instance created: '${this.name}' (ID: ${this.id}) in Realm: ${this.currentRealm}**`);
    }

    // Simulate a conscious moment, where kamma ripens [previous turn, 10, 11, 12, 13]
    public experienceConsciousMoment(description: string): void {
        const ripenedKamma = this.kammaField.ripenKammaAtConsciousMoment();
        let experienceOutcome = description;

        if (ripenedKamma.length > 0) {
            const totalImpact = ripenedKamma.reduce((acc, p) => acc + p.intensity, 0);
            if (totalImpact > 0) {
                experienceOutcome += ` (pleasant outcome influenced by past skillful kamma) [previous turn, supported by Alice's movie example]`;
            } else if (totalImpact < 0) {
                experienceOutcome += ` (unpleasant outcome influenced by past unskillful kamma) [previous turn, 18, 90, 92]`;
            }
        }
        console.log(`[ID: ${this.id}] Conscious moment in ${this.currentRealm}: ${experienceOutcome}`);

        // If the mind is pure and undefiled, it acquires assurances in the here & now
        if (this.unskillfulMentalQualities.every(q => q.isAbandoned)) {
            console.log(`[ID: ${this.id}] Mind is free from hostility, ill will, undefiled, & pure, acquiring assurances in the here & now.`);
        }

        // Illustrate the monkey/branch simile for mind's arising and passing [previous turn, 188]
        console.log(`[ID: ${this.id}] Mind arises and passes, like a monkey embracing and rejecting branches.`);
    }

    // Simulate taking action (kamma)
    performAction(description: string, isSkillful: boolean): void {
        const intensity = isSkillful ? 0.5 : -0.5; // Kamma intensity
        this.kammaField.addKamma({ description, intensity, ripeningTime: KammaRipeningTime.FutureLives, hasExpired: false });
        console.log(`[ID: ${this.id}] Performs an **${isSkillful ? 'skillful' : 'unskillful'}** action: "${description}".`);
        if (!isSkillful) {
            console.log(`[ID: ${this.id}] This action is blameworthy and leads to harm & suffering.`);
            // Mental action is described as most blameworthy for evil kamma
        }
    }

    // Simulate engaging with sense media, which can lead to clinging or release
    engageWithSenseMedia(media: SenseMedia, isRelished: boolean): void {
        console.log(`[ID: ${this.id}] Engages with ${media}.`);

        const cravingFetter = this.unskillfulMentalQualities.find(f => f.name === "Craving") as Craving;
        const selfIdentityView = this.unskillfulMentalQualities.find(f => f.name === "Self-Identity View") as Fetter;

        if (isRelished && cravingFetter && !cravingFetter.isAbandoned) {
            console.log(`[ID: ${this.id}] Relishing leads to delight and perpetuates craving/clinging.`);
            this.kammaField.addKamma({ description: `Act of relishing ${media}`, intensity: -0.1, ripeningTime: KammaRipeningTime.FutureLives, hasExpired: false });
        } else if (!isRelished && cravingFetter && cravingFetter.isAbandoned) {
            console.log(`[ID: ${this.id}] Not relishing, demonstrating a mind without clinging to sensuality.`);
        } else if (!isRelished) {
            console.log(`[ID: ${this.id}] Not relishing helps avoid delight and clinging.`);
        }

        // Consciousness arises dependent on sense media
        console.log(`[ID: ${this.id}] ${media}-consciousness arises, being inconstant, changeable, alterable.`);

        // If 'Self-Identity View' is not abandoned, attachment to aggregates occurs
        if (selfIdentityView && !selfIdentityView.isAbandoned) {
            console.log(`[ID: ${this.id}] Assuming 'this is mine, this is my self' with regard to aggregates and sense media.`);
        }
    }

    // Simulate developing skillful mental qualities
    developMentalQuality(qualityName: string): void {
        let quality = this.skillfulMentalQualities.find(q => q.name === qualityName);
        if (!quality) {
            quality = new WingToAwakening(qualityName); // Dynamically add if not pre-defined
            this.skillfulMentalQualities.push(quality);
        }
        quality.develop();
        console.log(`[ID: ${this.id}] **Develops ${qualityName}.**`);
    }

    // Simulate abandoning unskillful mental qualities (fetters)
    abandonUnskillfulQuality(qualityName: string): void {
        const quality = this.unskillfulMentalQualities.find(q => q.name === qualityName);
        if (quality) {
            quality.abandon();
            console.log(`[ID: ${this.id}] **Abandons ${qualityName}.**`);
            // Check for stage of liberation
            if (quality.name === "Self-Identity View" && quality.type === FetterType.Lower &&
                this.unskillfulMentalQualities.filter(f => f.type === FetterType.Lower && f.isAbandoned).length >= 3) {
                console.log(`[ID: ${this.id}] Has abandoned the first three lower fetters and is a **Stream-winner** (never again destined for lower realms, certain, headed for self-awakening)!`);
            }
            if (this.unskillfulMentalQualities.every(f => f.isAbandoned)) {
                this.isEnlightened = true;
                this.canBeClassified = false; // "an attainer-of-wisdom makes use of classifications but can't be classified"
                const finalRelease = new Release();
                finalRelease.attainUnbinding(true);
            }
        }
    }

    // Transmigration method - now returns a *new* Being instance
    transmigrate(): Being | null {
        if (this.isEnlightened) {
            console.log(`[ID: ${this.id}] ${this.name} has achieved total Unbinding. No further becoming.`);
            return null; // Arahants do not return
        }

        console.log(`\n--- [ID: ${this.id}] ${this.name} in ${this.currentRealm} is experiencing death and preparing for rebirth. ---`);

        // 1. Ripen any kamma associated with death consciousness (final moments)
        this.kammaField.ripenKammaAtConsciousMoment();

        // 2. Determine the next realm based on the accumulated kamma and remaining fetters
        const nextRealm = this.determineNextRealm();
        if (nextRealm === null) { // If determined no further realm (e.g., in Pure Abodes and reached total unbinding there)
            return null;
        }

        // 3. Prepare mental qualities for the next instance
        // Filter out abandoned fetters; remaining ones carry over.
        const remainingUnskillfulQualities = this.unskillfulMentalQualities.filter(f => !f.isAbandoned);
        // Developed skillful qualities are also carried over.
        const activeSkillfulQualities = this.skillfulMentalQualities.filter(s => s.isDeveloped);

        // 4. Create new KammaField for the next life, inheriting from the current one
        const newKammaFieldForNextLife = new KammaField(this.kammaField.getFutureKammaPotentials());

        // Add kamma potential based on the act of becoming/clinging that leads to rebirth
        // "Craving is the seamstress—for craving stitches one to the production of this or that very becoming."
        // "Ignorance... is a great delusion whereby they have wandered-on a long, long time."
        const hasCraving = remainingUnskillfulQualities.some(f => f.name === "Craving" && !f.isAbandoned);
        const hasIgnorance = remainingUnskillfulQualities.some(f => f.name === "Ignorance" && !f.isAbandoned);

        if (hasCraving || hasIgnorance) {
            newKammaFieldForNextLife.addKamma({
                description: `Kamma from remaining becoming, driven by craving and ignorance, from previous life in ${this.currentRealm}.`,
                intensity: -0.05, // A small negative for perpetuating samsara
                ripeningTime: KammaRipeningTime.FutureLives,
                hasExpired: false
            });
        }


        // 5. Create a **new `Being` instance** representing the next existence
        const nextBeing = new Being(
            this.name, // The 'name' is just a placeholder to track the continuity of the causal stream.
            nextRealm,
            newKammaFieldForNextLife, // Pass the same KammaField instance, now potentially updated
            remainingUnskillfulQualities,
            activeSkillfulQualities
        );

        return nextBeing;
    }

    // Determine the next realm based on the current state of kamma and mental qualities
    private determineNextRealm(): Realm | null {
        // This logic is highly simplified. Real kamma results are complex and multi-faceted.
        let unskillfulInfluence = this.unskillfulMentalQualities.filter(f => !f.isAbandoned).length;
        let skillfulInfluence = this.skillfulMentalQualities.filter(s => s.isDeveloped).length;

        this.kammaField.getFutureKammaPotentials().forEach(p => {
            if (p.intensity < 0) unskillfulInfluence += Math.abs(p.intensity);
            else skillfulInfluence += p.intensity;
        });

        // Path of liberation: Non-returners go to Pure Abodes to attain unbinding
        // Stream-winners (abandoned 3 lower fetters) don't go to lower realms
        const lowerFettersAbandonedCount = this.unskillfulMentalQualities.filter(f => f.type === FetterType.Lower && f.isAbandoned).length;

        if (this.currentRealm === Realm.PureAbodes && lowerFettersAbandonedCount === 5) {
            // If already in Pure Abodes and all lower fetters abandoned, next is total unbinding (Arahantship)
            console.log(`[ID: ${this.id}] Attaining total unbinding in the Pure Abodes.`);
            this.isEnlightened = true;
            this.canBeClassified = false;
            return null; // No further realm
        }
        
        if (lowerFettersAbandonedCount >= 3) { // Stream-winner or higher
            if (lowerFettersAbandonedCount === 5) { // Non-returner
                console.log(`[ID: ${this.id}] Non-returner: Heading to Pure Abodes for total unbinding!`);
                return Realm.PureAbodes;
            }
            console.log(`[ID: ${this.id}] Stream-winner: Rebirth in human or deva realms guaranteed (never lower realms)!`);
            return Math.random() < 0.7 ? Realm.Deva : Realm.Human; // Good family/deva world
        }

        // General transmigration based on kamma balance for unliberated beings
        if (skillfulInfluence > unskillfulInfluence * 1.5) {
            const r = Math.random();
            if (r < 0.7) return Realm.Deva;
            return Realm.FormlessRealm;
        } else if (unskillfulInfluence > skillfulInfluence * 1.5) {
            const r = Math.random();
            if (r < 0.4) return Realm.Animal;
            if (r < 0.8) return Realm.HungryGhost;
            return Realm.Hell;
        } else {
            return this.currentRealm; // Neutral kamma leads to similar realm
        }
    }

    // Getters for external inspection
    get CurrentRealm(): Realm { return this.currentRealm; }
    get Name(): string { return this.name; }
    get Id(): number { return this.id; }
    get IsEnlightened(): boolean { return this.isEnlightened; }
    get CanBeClassified(): boolean { return this.canBeClassified; }
    get RemainingFetters(): Fetter[] { return this.unskillfulMentalQualities.filter(f => !f.isAbandoned); }
    get DevelopedWings(): WingToAwakening[] { return this.skillfulMentalQualities.filter(s => s.isDeveloped); }
}

// --- Illustrative Scenario ---

// 1. Initial State: Alice as a human being
const aliceKammaField = new KammaField([
    { description: "Past good deeds (generosity)", intensity: 0.8, ripeningTime: KammaRipeningTime.HereAndNow, hasExpired: false },
    { description: "Past minor unskillful act (idle chatter)", intensity: -0.1, ripeningTime: KammaRipeningTime.LaterThisLifetime, hasExpired: false }
]);

const aliceUnskillfulQualities: Fetter[] = [
    new Fetter("Self-Identity View", FetterType.Lower),
    new Fetter("Uncertainty", FetterType.Lower),
    new Fetter("Grasping at Habits & Practices", FetterType.Lower),
    new Fetter("Sensual Passion", FetterType.Lower),
    new Fetter("Ill Will", FetterType.Lower),
    new Craving(),
    new Ignorance()
];

const aliceSkillfulQualities: WingToAwakening[] = [
    new Mindfulness(),
    new Discernment()
];

let alice = new Being("Alice", Realm.Human, aliceKammaField, aliceUnskillfulQualities, aliceSkillfulQualities);

// 2. Simulate Alice's Life
alice.experienceConsciousMoment("Enjoying a movie"); // Past kamma ripens
alice.performAction("Practicing generosity by helping a stranger.", true);
alice.engageWithSenseMedia(SenseMedia.Eye, true); // Relishing, perpetuating craving

// Alice begins to practice the Dhamma
alice.developMentalQuality("Mindfulness");
alice.abandonUnskillfulQuality("Self-Identity View"); // First step towards stream-entry
alice.abandonUnskillfulQuality("Uncertainty");
alice.abandonUnskillfulQuality("Grasping at Habits & Practices");

// 3. Alice's First Life Ends (Transmigration)
let aliceNextLife = alice.transmigrate();

if (aliceNextLife) {
    console.log(`\n**Alice is reborn as a new Being instance in ${aliceNextLife.CurrentRealm}.**`);
    console.log(`Remaining fetters carried over: ${aliceNextLife.RemainingFetters.map(f => f.name).join(", ") || "None"}`);
    console.log(`Developed qualities carried over: ${aliceNextLife.DevelopedWings.map(s => s.name).join(", ") || "None"}`);

    // 4. Simulate Alice's Second Life
    aliceNextLife.experienceConsciousMoment("Experiencing the new realm.");
    aliceNextLife.performAction("Engaging in wholesome activities in the new realm.", true);
    aliceNextLife.developMentalQuality("Discernment");

    // Continue the path towards unbinding
    aliceNextLife.abandonUnskillfulQuality("Sensual Passion");
    aliceNextLife.abandonUnskillfulQuality("Ill Will"); // Now a Non-Returner (assuming these are the remaining lower fetters)

    // 5. Alice's Second Life Ends (Transmigration to Pure Abodes)
    let aliceThirdLife = aliceNextLife.transmigrate();

    if (aliceThirdLife) {
        console.log(`\n**Alice is reborn as a new Being instance in ${aliceThirdLife.CurrentRealm} (Pure Abodes).**`);
        console.log(`Remaining fetters: ${aliceThirdLife.RemainingFetters.map(f => f.name).join(", ") || "None"}`);
        console.log(`Developed qualities: ${aliceThirdLife.DevelopedWings.map(s => s.name).join(", ") || "None"}`);

        // In Pure Abodes, the non-returner attains full unbinding
        aliceThirdLife.abandonUnskillfulQuality("Craving"); // Abandoning the remaining higher fetters
        aliceThirdLife.abandonUnskillfulQuality("Ignorance");

        // Simulate final unbinding in Pure Abodes
        aliceThirdLife.isEnlightened = true; // Directly set after all fetters abandoned
        let aliceFinalState = aliceThirdLife.transmigrate(); // This should now result in null

        if (!aliceFinalState) {
            console.log(`\n**Alice has achieved total Unbinding and will not be reborn.**`);
        }
    } else {
        console.log("\nAlice has achieved total Unbinding and will not be reborn after the second life.");
    }

} else {
    console.log("Alice has achieved total Unbinding and will not be reborn after the first life.");
}

console.log("\n--- Scenario for Bob (Unskillful Kamma) ---");

const bobKammaField = new KammaField([
    { description: "Past harsh speech", intensity: -0.7, ripeningTime: KammaRipeningTime.FutureLives, hasExpired: false },
    { description: "Past greedy action", intensity: -0.9, ripeningTime: KammaRipeningTime.FutureLives, hasExpired: false },
]);
const bobUnskillfulQualities: Fetter[] = [
    new Fetter("Self-Identity View", FetterType.Lower),
    new Craving(),
    new Ignorance(),
    new Fetter("Ill Will", FetterType.Lower),
];
const bobSkillfulQualities: WingToAwakening[] = [];

// missing implementtion:
// let bob = new Being()
// console.log(`Developed qualities: ${bobNextLife.DevelopedWings.map(s => s.name).join(", ")}`);