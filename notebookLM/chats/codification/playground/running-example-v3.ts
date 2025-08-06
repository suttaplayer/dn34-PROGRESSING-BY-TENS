// Enums from the original file, kept for consistency
enum Realm {
    Human = "Human Realm",
    Deva = "Deva Realm",
    Animal = "Animal Realm",
    HungryGhost = "Hungry Ghost Realm",
    Hell = "Hell Realm",
    PureAbodes = "Pure Abodes", // For Non-returners, leads to Unbinding
    FormlessRealm = "Formless Realm", // For those who attain formless jhana
}

enum KammaRipeningTime {
    HereAndNow = "In the Here and Now",
    LaterThisLifetime = "Later This Lifetime",
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

// NEW: Enum for specific heavenly destination realms mentioned in sources
enum HeavenlyDestination {
    ContentedDevas = "Contented Devas", //
    DevasDelightingInCreation = "Devas who Delight in Creation", //
    DevasWieldingPower = "Devas Wielding Power over Creations of Others", //
    BrahmasRetinue = "Devas of Brahma's Retinue", //
    ThirtyThreeDevas = "Devas of the Thirty-three" //
}

// NEW: Enum for different motivations for giving a gift, affecting kamma ripening
enum KammaMotivation {
    SeekingProfit = "Seeking own profit", //
    AttachedToReward = "Mind attached to reward", //
    StoreUpForAfterDeath = "Seeking to store up for himself (after death)", //
    WellOffNotGivingNotRight = "Well-off, not giving is not right", //
    LikeSagesOfPast = "Like great sacrifices of sages of the past", //
    ConfidenceInTripleGem = "Confidence in Buddha, Dhamma, Sangha", //
    Goodwill = "Goodwill (as awareness-release)", //
    MereGivingIsGood = "Giving is good (without expectation)" // Implied from general Dhamma
}

// Interface for a specific kamma potential
interface KammaPotential {
    description: string;
    intensity: number; // Positive for skillful, negative for unskillful
    ripeningTime: KammaRipeningTime;
    hasExpired: boolean; // Once ripened, it expires
    motivation?: KammaMotivation; // NEW: Motivation for the action
    intendedDestination?: HeavenlyDestination; // NEW: Specific heavenly destination for gifts
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
        console.log(`Fetter '${this.name}' is abandoned.`); // Abandoning fetters is part of the path to release
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

// NEW: Clinging class, representing the four types of clinging/sustenance
// "These four clingings have craving as their cause..."
class Clinging implements MentalQuality {
    name: string;
    isSkillful = false;
    isObstacle = true;
    type: "Sensuality Clinging" | "View Clinging" | "Habit & Practice Clinging" | "Doctrine of Self Clinging"; //
    isAbandoned: boolean;

    constructor(type: "Sensuality Clinging" | "View Clinging" | "Habit & Practice Clinging" | "Doctrine of Self Clinging") {
        this.name = type;
        this.type = type;
        this.isAbandoned = false;
    }

    abandon(): void {
        this.isAbandoned = true;
        console.log(`Clinging '${this.name}' is abandoned.`); // Abandoning clinging is crucial for ending stress
    }
}

// NEW: Effluent class, representing defilements that lead to renewed becoming
// "Effluents that defile, that lead to renewed becoming, that give trouble, that ripen in stress, and lead to future birth, aging, & death"
class Effluent implements MentalQuality {
    name: string;
    isSkillful = false;
    isObstacle = true;
    type: "Sensuality Effluent" | "Becoming Effluent" | "Ignorance Effluent"; //
    isEnded: boolean; // True if this effluent has been ended

    constructor(type: "Sensuality Effluent" | "Becoming Effluent" | "Ignorance Effluent") {
        this.name = type;
        this.type = type;
        this.isEnded = false;
    }

    end(): void {
        this.isEnded = true;
        console.log(`Effluent '${this.name}' is ended.`); // Ending effluents leads to release
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
        console.log(`Skillful quality '${this.name}' is developed.`);
    }
}

class Discernment extends WingToAwakening {
    constructor() {
        super("Discernment");
    }

    attainsCulminationAndAbundance(): void {
        console.log("Discernment has attained culmination and abundance."); //
    }
}

// Release (Vimutti) as the ultimate goal
class Release {
    isAwarenessRelease: boolean; //
    isDiscernmentRelease: boolean; //
    isUnbound: boolean; // Represents total unbinding (Nibbana)

    constructor() {
        this.isAwarenessRelease = false;
        this.isDiscernmentRelease = false;
        this.isUnbound = false;
    }

    attainUnbinding(effluentsEnded: boolean): void {
        if (effluentsEnded) {
            this.isUnbound = true;
            this.isAwarenessRelease = true; // Release from passion, aversion, delusion
            this.isDiscernmentRelease = true; // Through right discernment
            console.log("\n**Achieved total unbinding! Birth is ended, the holy life fulfilled, the task done. There is nothing further for this world.**"); //
        }
    }
}

// Representing the Five Clinging-Aggregates (Pañcupādānakkhandhā)
// All aggregates are inconstant, stressful, and not-self
interface Aggregate {
    name: string;
    isInconstant: boolean; //
    isStressful: boolean; //
    isNotSelf: boolean; //
    isFabricated: boolean; // Everything conditioned is fabricated
    arise(): void; // NEW: Represents arising in a moment
    passAway(): void; // NEW: Represents passing away in a moment
}

// Specific aggregate implementations
class FormAggregate implements Aggregate {
    name = "Form Aggregate";
    isInconstant = true;
    isStressful = true;
    isNotSelf = true;
    isFabricated = true; //
    arise() { console.log("Form Aggregate arises."); } //
    passAway() { console.log("Form Aggregate passes away."); } //
}

class FeelingAggregate implements Aggregate {
    name = "Feeling Aggregate";
    isInconstant = true;
    isStressful = true; // "whatever is felt comes under stress"
    isNotSelf = true;
    isFabricated = true;
    arise() { console.log("Feeling Aggregate arises."); }
    passAway() { console.log("Feeling Aggregate passes away."); }
}

class PerceptionAggregate implements Aggregate {
    name = "Perception Aggregate";
    isInconstant = true;
    isStressful = true;
    isNotSelf = true;
    isFabricated = true;
    arise() { console.log("Perception Aggregate arises."); }
    passAway() { console.log("Perception Aggregate passes away."); }
}

class FabricationAggregate implements Aggregate {
    name = "Fabrication Aggregate";
    isInconstant = true;
    isStressful = true;
    isNotSelf = true;
    isFabricated = true;
    arise() { console.log("Fabrication Aggregate arises."); }
    passAway() { console.log("Fabrication Aggregate passes away."); }
}

class ConsciousnessAggregate implements Aggregate {
    name = "Consciousness Aggregate";
    isInconstant = true;
    isStressful = true;
    isNotSelf = true;
    isFabricated = true;
    arise() { console.log("Consciousness Aggregate arises."); }
    passAway() { console.log("Consciousness Aggregate passes away."); }
}

function createMomentaryAggregates(): Aggregate[] {
    return [
        new FormAggregate(),
        new FeelingAggregate(),
        new PerceptionAggregate(),
        new FabricationAggregate(),
        new ConsciousnessAggregate()
    ];
}

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
        // "Any action performed with non-greed… non-aversion… non-delusion… is thus abandoned, its root destroyed, made like a palmyra stump, deprived of the conditions of development, not destined for future arising."
        // This implies only unskillful kamma is destroyed. Skillful kamma leads to pleasant ripening but not 'further becoming'.
        // For an Arahant, even skillful kamma does not lead to 'further becoming'. So, all kamma is effectively 'ended' for them in terms of rebirth.
        // Simplified for simulation: an enlightened being does no new action that leads to suffering, and old action is destroyed.
        this.potentials = []; // All kamma that leads to becoming is ended.
        console.log("Old kamma being destroyed with each contact (for an enlightened being).");
    }
}

// Helper to create initial sets of fetters, clinging, and effluents for a new Being
function createDefaultUnskillfulQualities(): { fetters: Fetter[], clinging: Clinging[], effluents: Effluent[] } {
    const fetters: Fetter[] = [
        new Fetter("Self-Identity View", FetterType.Lower), //
        new Fetter("Uncertainty", FetterType.Lower), //
        new Fetter("Grasping at Habits & Practices", FetterType.Lower), //
        new Fetter("Sensual Passion", FetterType.Lower), //
        new Fetter("Ill Will", FetterType.Lower), //
        new Craving(),
        new Ignorance(),
        new Fetter("Passion for Form", FetterType.Higher),
        new Fetter("Passion for Formlessness", FetterType.Higher),
        new Fetter("Conceit", FetterType.Higher), // 'I-making or mine-making conceit-obsession'
        new Fetter("Restlessness", FetterType.Higher), //
    ];

    const clinging: Clinging[] = [
        new Clinging("Sensuality Clinging"),
        new Clinging("View Clinging"),
        new Clinging("Habit & Practice Clinging"),
        new Clinging("Doctrine of Self Clinging"),
    ];

    const effluents: Effluent[] = [
        new Effluent("Sensuality Effluent"),
        new Effluent("Becoming Effluent"),
        new Effluent("Ignorance Effluent"),
    ];

    return { fetters, clinging, effluents };
}


// The Being class represents an individual flowing through Samsara
class Being {
    private static idCounter = 0;
    private id: number;
    private name: string;
    private currentRealm: Realm;
    private kammaField: KammaField;
    private fetters: Fetter[]; // Such as the ten fetters
    private clinging: Clinging[]; // NEW: The four clingings
    private effluents: Effluent[]; // NEW: The three effluents
    private skillfulMentalQualities: WingToAwakening[]; // Such as the 37 wings to awakening
    public isEnlightened: boolean; // Whether this instance has achieved Arahantship
    private canBeClassified: boolean; // An Arahant cannot be classified

    constructor(
        name: string,
        initialRealm: Realm,
        kammaField: KammaField,
        initialFetters: Fetter[], // Adjusted to be passed directly
        initialClinging: Clinging[], // NEW
        initialEffluents: Effluent[], // NEW
        initialSkillfulQualities: WingToAwakening[] = []
    ) {
        this.id = ++Being.idCounter;
        this.name = name;
        this.currentRealm = initialRealm;
        this.kammaField = kammaField;
        this.fetters = initialFetters.map(f => Object.assign(Object.create(Object.getPrototypeOf(f)), f));
        this.clinging = initialClinging.map(c => Object.assign(Object.create(Object.getPrototypeOf(c)), c)); // NEW
        this.effluents = initialEffluents.map(e => Object.assign(Object.create(Object.getPrototypeOf(e)), e)); // NEW
        this.skillfulMentalQualities = initialSkillfulQualities.map(s => Object.assign(Object.create(Object.getPrototypeOf(s)), s));
        this.isEnlightened = false;
        this.canBeClassified = true;
        console.log(`**New Being instance created: '${this.name}' (ID: ${this.id}) in Realm: ${this.currentRealm}**`);
    }

    // Simulate a conscious moment, where kamma ripens and aggregates arise and pass away
    public experienceConsciousMoment(description: string): void {
        console.log(`\n[ID: ${this.id}] Conscious moment in ${this.currentRealm}: ${description}`);

        // **Concern 2: Aggregates are arising and passing away in each moment.**
        // "Arising is discernable, passing away is discernable, alteration [literally: otherness] while staying is discernable."
        // "Such is form, such its origination, such its disappearance. Such is feeling… Such is perception… Such are fabrications… Such is consciousness, such its origination, such its disappearance."
        const currentAggregates = createMomentaryAggregates();
        console.log(`[ID: ${this.id}] Momentary aggregates arise: ${currentAggregates.map(a => a.name).join(", ")}`);
        // Simulate their passing away shortly after
        currentAggregates.forEach(agg => agg.passAway());
        console.log(`[ID: ${this.id}] Momentary aggregates pass away.`);

        const ripenedKamma = this.kammaField.ripenKammaAtConsciousMoment();
        let experienceOutcome = description;
        if (ripenedKamma.length > 0) {
            const totalImpact = ripenedKamma.reduce((acc, p) => acc + p.intensity, 0);
            if (totalImpact > 0) {
                experienceOutcome += ` (pleasant outcome influenced by past skillful kamma)`;
            } else if (totalImpact < 0) {
                experienceOutcome += ` (unpleasant outcome influenced by past unskillful kamma)`;
            }
        }
        console.log(`[ID: ${this.id}] Experience outcome: ${experienceOutcome}`);

        // If the mind is pure and undefiled (all relevant unskillful qualities abandoned), it acquires assurances in the here & now
        // "One who is a disciple of the noble ones—his mind thus free from hostility, free from ill will, undefiled, & pure—acquires these four assurances in the here & now."
        if (this.fetters.every(f => f.isAbandoned) && this.effluents.every(e => e.isEnded) && this.clinging.every(c => c.isAbandoned)) {
            console.log(`[ID: ${this.id}] Mind is free from hostility, ill will, undefiled, & pure, acquiring four assurances in the here & now.`);
        }

        // "they embrace & reject —like a monkey releasing a branch to seize at another— a person undertaking practices on his own, goes high & low, latched onto perception."
        console.log(`[ID: ${this.id}] Mind arises and passes, like a monkey embracing and rejecting branches, dependent on changing aggregates.`);
    }

    // Simulate taking action (kamma), including gift-giving with specific motivations
    public performAction(
        description: string,
        isSkillful: boolean,
        motivation?: KammaMotivation, // NEW: For gift-giving, as per concern 1
        intendedDestination?: HeavenlyDestination // NEW: For gift-giving, as per concern 1
    ): void {
        let intensity = isSkillful ? 0.5 : -0.5; // Default kamma intensity

        // **Concern 1: Kamma related abstracts not capable of supporting the causation between motivation and destination realm in giving a gift.**
        if (motivation) {
            console.log(`[ID: ${this.id}] Motivation for action: ${motivation}.`);
            // Adjust intensity or link to specific outcomes based on motivation, as per concern 1.
            // "When greed is gone, that action is thus abandoned, its root destroyed..."
            // "Any action performed with non-greed… is skillful, it's blameless, it ripens in pleasure, it leads to the cessation of action..."
            if (motivation === KammaMotivation.SeekingProfit || motivation === KammaMotivation.AttachedToReward || motivation === KammaMotivation.StoreUpForAfterDeath) {
                console.log(`[ID: ${this.id}] Motivation leads to 'returner' outcomes, not necessarily total unbinding.`); // Such gifts, after exhausting power, lead to return to this world.
                intensity = -0.05; // Still unskillful due to clinging to outcome, preventing full liberation in that life.
            } else if (motivation === KammaMotivation.Goodwill || motivation === KammaMotivation.MereGivingIsGood || motivation === KammaMotivation.ConfidenceInTripleGem) {
                console.log(`[ID: ${this.id}] Motivation aligns with 'much greater fruit & reward'.`); // "Offerings to this spotless field bear an abundance of fruit." "If one with a confident mind were to undertake the training rules… develop even just one whiff of a heart of goodwill, that would be more fruitful than…"
                intensity = 0.8; // Higher skillful intensity
            }
        }

        this.kammaField.addKamma({ description, intensity, ripeningTime: KammaRipeningTime.FutureLives, hasExpired: false, motivation, intendedDestination });
        console.log(`[ID: ${this.id}] Performs an **${isSkillful ? 'skillful' : 'unskillful'}** action: "${description}".`);

        if (!isSkillful) {
            console.log(`[ID: ${this.id}] This action is blameworthy and leads to harm & suffering.`); // "These qualities, when adopted & carried out, lead to harm & to suffering"
            // Mental action is described as most greatly blameworthy for evil kamma
            // For simplicity, we don't distinguish bodily/verbal/mental action types here, but the model supports it.
        }
    }

    // Simulate engaging with sense media, which can lead to clinging or release
    public engageWithSenseMedia(media: SenseMedia, isRelished: boolean): void {
        console.log(`[ID: ${this.id}] Engages with ${media}.`);

        const cravingFetter = this.fetters.find(f => f.name === "Craving") as Craving;
        const selfIdentityView = this.fetters.find(f => f.name === "Self-Identity View") as Fetter;
        const ignoranceEffluent = this.effluents.find(e => e.name === "Ignorance Effluent") as Effluent;

        // **Concern 3: Clinging too is noticeably absent and has a key role on the process.**
        // "Whatever desire & passion there is with regard to the five clinging-aggregates, that is the clinging there."
        // "If, with regard to the cause whereby the perceptions & categories of objectification assail a person, there is nothing there to relish, welcome, or remain fastened to, then that is the end of the obsessions of passion... of views, of uncertainty... of ignorance."
        // "Any desire, embracing, grasping, & holding-on to these five clinging-aggregates is the origination of stress."

        if (isRelished) {
            console.log(`[ID: ${this.id}] Relishing leads to delight and perpetuates craving/clinging.`); // "This generation delights in attachment, is excited by attachment, enjoys attachment."
            // If relishing, and craving/ignorance/self-identity view are present and not abandoned/ended, then clinging arises.
            if (cravingFetter && !cravingFetter.isAbandoned && ignoranceEffluent && !ignoranceEffluent.isEnded) {
                const sensualityClinging = this.clinging.find(c => c.type === "Sensuality Clinging");
                if (sensualityClinging && sensualityClinging.isAbandoned) {
                    console.log(`[ID: ${this.id}] However, Sensuality Clinging has already been abandoned, so relishing has no effect.`);
                } else if (sensualityClinging) {
                    console.log(`[ID: ${this.id}] Sensuality Clinging is reinforced by relishing.`);
                    // For simulation, we'll mark the specific clinging as active or reinforce its presence
                    // In a more complex model, this would directly contribute to future suffering or remaining fettered.
                }
                this.kammaField.addKamma({ description: `Act of relishing ${media}`, intensity: -0.1, ripeningTime: KammaRipeningTime.FutureLives, hasExpired: false });
            }
        } else {
            console.log(`[ID: ${this.id}] Not relishing, demonstrating a mind without clinging to sensuality.`); // "Unhungering, unbound, cooled in the here and now, I declare total unbinding through lack of clinging or sustenance."
            // Not relishing and developing discernment contributes to abandoning clinging
            const sensualityClinging = this.clinging.find(c => c.type === "Sensuality Clinging");
            if (sensualityClinging && !sensualityClinging.isAbandoned) {
                sensualityClinging.abandon();
            }
        }

        // Consciousness arises dependent on sense media
        console.log(`[ID: ${this.id}] ${media}-consciousness arises, being inconstant, changeable, alterable.`); // "The eye is inconstant, changeable, alterable. The ear… The mind is inconstant, changeable, alterable."

        // If 'Self-Identity View' is not abandoned, attachment to aggregates occurs
        if (selfIdentityView && !selfIdentityView.isAbandoned) {
            console.log(`[ID: ${this.id}] Assuming 'this is mine, this is my self' with regard to aggregates and sense media, due to Self-Identity View.`); // "assumes form to be the self, or the self as possessing form..."
            // This is where 'self-identity view' and 'doctrine-of-self clinging' play a role.
            const doctrineOfSelfClinging = this.clinging.find(c => c.type === "Doctrine of Self Clinging");
            if (doctrineOfSelfClinging && !doctrineOfSelfClinging.isAbandoned) {
                console.log(`[ID: ${this.id}] Doctrine of Self Clinging is active.`);
            }
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

    // Simulate abandoning unskillful mental qualities (fetters, clinging, effluents)
    public abandonUnskillfulQuality(qualityName: string): void {
        let found = false;

        // Check in fetters
        const f = this.fetters.find(q => q.name === qualityName);
        if (f) {
            f.abandon();
            found = true;
        }

        // Check in clinging (NEW)
        const c = this.clinging.find(q => q.name === qualityName);
        if (c) {
            c.abandon();
            found = true;
        }

        // Check in effluents (NEW)
        const e = this.effluents.find(q => q.name === qualityName);
        if (e) {
            e.end();
            found = true;
        }

        if (found) {
            console.log(`[ID: ${this.id}] **Abandons ${qualityName}.**`);

            // Check for stage of liberation: Stream-winner
            // "He is incapable of doing any deed by which he might be reborn in hell, in the animal womb, or in the realm of hungry ghosts. He is incapable of passing away until he has realized the fruit of stream-entry."
            const lowerFettersAbandonedCount = this.fetters.filter(f => f.type === FetterType.Lower && f.isAbandoned).length;
            if (lowerFettersAbandonedCount >= 3) { // Self-Identity View, Uncertainty, Grasping at Habits & Practices
                console.log(`[ID: ${this.id}] Has abandoned the first three lower fetters and is a **Stream-winner** (never again destined for lower realms, certain, headed for self-awakening)!`);
            }

            // Check for total enlightenment (Arahantship)
            // "He is called a monk who has cut through craving, has ripped off the fetter, and—from rightly breaking through conceit—has put an end to suffering & stress."
            // "When all effluents are ended"
            // **Concern 4: Effluents are always created for a non-arahant. yet there is no implementation of effluents and the role it plays.**
            if (this.fetters.every(f => f.isAbandoned) && this.clinging.every(c => c.isAbandoned) && this.effluents.every(e => e.isEnded)) {
                this.isEnlightened = true;
                this.canBeClassified = false; // "an attainer-of-wisdom makes use of classifications but can't be classified"
                const finalRelease = new Release();
                finalRelease.attainUnbinding(true);
            }
        } else {
            console.log(`[ID: ${this.id}] Could not find unskillful quality '${qualityName}' to abandon.`);
        }
    }

    // Transmigration method - now returns a *new* Being instance
    public transmigration(): Being | null {
        if (this.isEnlightened) {
            console.log(`[ID: ${this.id}] ${this.name} has achieved total Unbinding. No further becoming.`); // "for the sake of no further becoming.", "its many becomings go to ruin."
            this.kammaField.destroyOldKammaWithContact(); // "He does no new action, and as for old action, he destroys it with each contact"
            return null; // Arahants do not return
        }

        console.log(`\n--- [ID: ${this.id}] ${this.name} in ${this.currentRealm} is experiencing death and preparing for rebirth. ---`);

        // 1. Ripen any kamma associated with death consciousness (final moments)
        this.kammaField.ripenKammaAtConsciousMoment();

        // 2. Determine the next realm based on the accumulated kamma and remaining fetters/clinging/effluents
        const nextRealm = this.determineNextRealm();
        if (nextRealm === null) {
            return null;
        }

        // 3. Prepare mental qualities for the next instance
        const remainingFetters = this.fetters.filter(f => !f.isAbandoned);
        const remainingClinging = this.clinging.filter(c => !c.isAbandoned);
        const remainingEffluents = this.effluents.filter(e => !e.isEnded);
        const activeSkillfulQualities = this.skillfulMentalQualities.filter(s => s.isDeveloped);

        // 4. Create new KammaField for the next life, inheriting from the current one
        const newKammaFieldForNextLife = new KammaField(this.kammaField.getFutureKammaPotentials());

        // Add kamma potential based on the act of becoming/clinging that leads to rebirth
        // "Thus kamma is the field, consciousness the seed, and craving the moisture. The consciousness of living beings hindered by ignorance & fettered by craving is established in or tuned to a lower property. Thus there is the production of renewed becoming in the future."
        // "Ignorance... is a great delusion whereby they have wandered-on a long, long time."
        // "From that clinging of mine as a requisite condition would come becoming."
        const hasCraving = remainingFetters.some(f => f.name === "Craving" && !f.isAbandoned);
        const hasIgnorance = remainingFetters.some(f => f.name === "Ignorance" && !f.isAbandoned);
        const hasClinging = remainingClinging.some(c => !c.isAbandoned);

        if (hasCraving || hasIgnorance || hasClinging) {
            newKammaFieldForNextLife.addKamma({
                description: `Kamma from remaining becoming, driven by craving, ignorance, and clinging, from previous life in ${this.currentRealm}.`,
                intensity: -0.05, // A small negative for perpetuating samsara
                ripeningTime: KammaRipeningTime.FutureLives,
                hasExpired: false
            });
        }

        // 5. Create a **new `Being` instance** representing the next existence
        const nextBeing = new Being(
            this.name, // The 'name' is just a placeholder to track the continuity of the causal stream.
            nextRealm,
            newKammaFieldForNextLife,
            remainingFetters,
            remainingClinging,
            remainingEffluents,
            activeSkillfulQualities
        );
        return nextBeing;
    }

    // Determine the next realm based on the current state of kamma and mental qualities
    private determineNextRealm(): Realm | null {
        // This logic is highly simplified. Real kamma results are complex and multi-faceted.

        // **Concern 1: Support causation between motivation and destination realm in giving a gift.**
        // "A person of conviction, on the break-up of the body, after death, will arise in a good destination, a heavenly world."
        // Specific gift motivations lead to specific deva realms:
        const giftKamma = this.kammaField.getFutureKammaPotentials().filter(p => p.motivation && p.intendedDestination);
        if (giftKamma.length > 0) {
            const chosenGift = giftKamma[0]; // Simplification: pick one if multiple for demonstration
            console.log(`[ID: ${this.id}] Next realm influenced by specific gift motivation to reach ${chosenGift.intendedDestination}.`);
            // Map specific heavenly destination to generic Realm enum for transmigration
            switch (chosenGift.intendedDestination) {
                case HeavenlyDestination.ContentedDevas: return Realm.Deva; //
                case HeavenlyDestination.DevasDelightingInCreation: return Realm.Deva; //
                case HeavenlyDestination.DevasWieldingPower: return Realm.Deva; //
                case HeavenlyDestination.BrahmasRetinue: return Realm.Deva; // (Brahma's retinue are a type of deva realm)
                case HeavenlyDestination.ThirtyThreeDevas: return Realm.Deva; //
                default: return Realm.Deva; // Fallback for unspecified
            }
        }

        let unskillfulInfluence = this.fetters.filter(f => !f.isAbandoned).length +
                                 this.clinging.filter(c => !c.isAbandoned).length +
                                 this.effluents.filter(e => !e.isEnded).length;

        let skillfulInfluence = this.skillfulMentalQualities.filter(s => s.isDeveloped).length;

        this.kammaField.getFutureKammaPotentials().forEach(p => {
            if (p.intensity < 0) unskillfulInfluence += Math.abs(p.intensity);
            else skillfulInfluence += p.intensity;
        });

        // Path of liberation: Non-returners go to Pure Abodes to attain unbinding
        // "from the total ending of the five lower fetters... he is due to arise spontaneously (in the Pure Abodes)"
        const lowerFettersAbandonedCount = this.fetters.filter(f => f.type === FetterType.Lower && f.isAbandoned).length;
        if (lowerFettersAbandonedCount === 5) { // All five lower fetters abandoned
             // And if the 'craving' and 'ignorance' effluents are ended for good measure, they are non-returners
            const cravingEnded = this.effluents.find(e => e.name === "Becoming Effluent")?.isEnded; // Becoming effluent is rooted in craving
            const ignoranceEnded = this.effluents.find(e => e.name === "Ignorance Effluent")?.isEnded;

            if (cravingEnded && ignoranceEnded) { // Assuming these are representative of the higher fetters of craving/ignorance
                console.log(`[ID: ${this.id}] All five lower fetters abandoned. This being is a **Non-returner**, destined for Pure Abodes.`);
                return Realm.PureAbodes; // Leads to total unbinding from Pure Abodes
            }
        }

        // Stream-winners (abandoned 3 lower fetters) don't go to lower realms
        if (lowerFettersAbandonedCount >= 3) { // Self-Identity View, Uncertainty, Grasping at Habits & Practices
            if (skillfulInfluence > unskillfulInfluence * 0.5) { // Still a general influence, but avoids lower realms
                const r = Math.random();
                if (r < 0.8) return Realm.Human; // More likely human or deva
                return Realm.Deva;
            }
        }


        if (this.currentRealm === Realm.PureAbodes && this.fetters.every(f => f.isAbandoned) && this.effluents.every(e => e.isEnded) && this.clinging.every(c => c.isAbandoned)) {
            // If already in Pure Abodes and all fetters/effluents/clinging abandoned, next is total unbinding (Arahantship)
            console.log(`[ID: ${this.id}] Attaining total unbinding in the Pure Abodes.`);
            this.isEnlightened = true;
            this.canBeClassified = false;
            return null;
        }

        // General kamma influence for realms
        if (skillfulInfluence > unskillfulInfluence * 1.5) {
            const r = Math.random();
            if (r < 0.7) return Realm.Deva;
            return Realm.FormlessRealm; // Simplified for very high skillful kamma
        } else if (unskillfulInfluence > skillfulInfluence * 1.5) {
            const r = Math.random();
            if (r < 0.4) return Realm.Animal;
            if (r < 0.8) return Realm.HungryGhost;
            return Realm.Hell;
        } else {
            return this.currentRealm; // Neutral kamma leads to similar realm or human
        }
    }

    // Getters for external inspection
    get CurrentRealm(): Realm { return this.currentRealm; }
    get Name(): string { return this.name; }
    get Id(): number { return this.id; }
    get IsEnlightened(): boolean { return this.isEnlightened; }
    get CanBeClassified(): boolean { return this.canBeClassified; }
    get RemainingFetters(): Fetter[] { return this.fetters.filter(f => !f.isAbandoned); }
    get RemainingClinging(): Clinging[] { return this.clinging.filter(c => !c.isAbandoned); }
    get RemainingEffluents(): Effluent[] { return this.effluents.filter(e => !e.isEnded); }
    get DevelopedWings(): WingToAwakening[] { return this.skillfulMentalQualities.filter(s => s.isDeveloped); }
}

// --- Illustrative Scenario ---

console.log("--- Initializing Scenario for Alice ---");

const aliceKammaField = new KammaField([
    { description: "Past good deeds (generosity)", intensity: 0.8, ripeningTime: KammaRipeningTime.HereAndNow, hasExpired: false },
    { description: "Past minor unskillful act (idle chatter)", intensity: -0.1, ripeningTime: KammaRipeningTime.LaterThisLifetime, hasExpired: false }
]);

const aliceQualities = createDefaultUnskillfulQualities();
let alice = new Being("Alice", Realm.Human, aliceKammaField, aliceQualities.fetters, aliceQualities.clinging, aliceQualities.effluents, [
    new WingToAwakening("Mindfulness"),
    new Discernment()
]);

// 2. Simulate Alice's Life
alice.experienceConsciousMoment("Enjoying a movie"); // Past kamma ripens, aggregates arise and pass.
alice.performAction("Practicing generosity by helping a stranger.", true);
alice.engageWithSenseMedia(SenseMedia.Eye, true); // Relishing, potentially perpetuating craving/clinging/effluents

// Alice begins to practice the Dhamma
alice.developMentalQuality("Mindfulness");
alice.abandonUnskillfulQuality("Self-Identity View"); // First step towards stream-entry
alice.abandonUnskillfulQuality("Uncertainty");
alice.abandonUnskillfulQuality("Grasping at Habits & Practices"); // Alice is now a Stream-winner

alice.performAction(
    "Gave a gift with the thought: 'It would not be right for me, being well-off, not to give a gift to those who are not well-off'.",
    true,
    KammaMotivation.WellOffNotGivingNotRight,
    HeavenlyDestination.ContentedDevas // This motivation implies a 'returner' destination
);
alice.performAction(
    "Gave a gift with the motivation of confidence in the Triple Gem.",
    true,
    KammaMotivation.ConfidenceInTripleGem
);

alice.engageWithSenseMedia(SenseMedia.Body, false); // Not relishing, demonstrating a mind without clinging to sensuality

console.log("\n--- Alice's Current State ---");
console.log(`Alice's remaining fetters: ${alice.RemainingFetters.map(f => f.name).join(", ")}`);
console.log(`Alice's remaining clinging: ${alice.RemainingClinging.map(c => c.name).join(", ")}`);
console.log(`Alice's remaining effluents: ${alice.RemainingEffluents.map(e => e.name).join(", ")}`);
console.log(`Alice's developed skillful qualities: ${alice.DevelopedWings.map(s => s.name).join(", ")}`);

// Simulate Alice transmigrating (e.g., at the end of this lifetime)
let aliceNextLife: Being | null = alice.transmigration();
if (aliceNextLife) {
    console.log(`\nAlice's next life: ${aliceNextLife.Name} in ${aliceNextLife.CurrentRealm}.`);
    console.log(`Developed qualities: ${aliceNextLife.DevelopedWings.map(s => s.name).join(", ")}`);
    console.log(`Remaining fetters: ${aliceNextLife.RemainingFetters.map(f => f.name).join(", ")}`);
    console.log(`Remaining clinging: ${aliceNextLife.RemainingClinging.map(c => c.name).join(", ")}`);
    console.log(`Remaining effluents: ${aliceNextLife.RemainingEffluents.map(e => e.name).join(", ")}`);
} else {
    console.log("\nAlice has attained total Unbinding and will not be reborn.");
}

console.log("\n--- Scenario for Bob (Unskillful Kamma leading to lower realms) ---");

const bobKammaField = new KammaField([
    { description: "Past harsh speech", intensity: -0.7, ripeningTime: KammaRipeningTime.FutureLives, hasExpired: false },
    { description: "Past greedy action", intensity: -0.9, ripeningTime: KammaRipeningTime.FutureLives, hasExpired: false },
]);

const bobQualities = createDefaultUnskillfulQualities(); // Start with all unskillful qualities
let bob = new Being("Bob", Realm.Human, bobKammaField, bobQualities.fetters, bobQualities.clinging, bobQualities.effluents);

bob.experienceConsciousMoment("Feeling frustrated by traffic.");
bob.performAction("Engaged in malicious gossip.", false); // Unskillful verbal action
bob.engageWithSenseMedia(SenseMedia.Ear, true); // Relishing sounds, perpetuating sensuality and potential clinging

console.log("\n--- Bob's Current State ---");
console.log(`Bob's remaining fetters: ${bob.RemainingFetters.map(f => f.name).join(", ")}`);
console.log(`Bob's remaining clinging: ${bob.RemainingClinging.map(c => c.name).join(", ")}`);
console.log(`Bob's remaining effluents: ${bob.RemainingEffluents.map(e => e.name).join(", ")}`);

// Simulate Bob transmigrating
let bobNextLife: Being | null = bob.transmigration();
if (bobNextLife) {
    console.log(`\nBob's next life: ${bobNextLife.Name} in ${bobNextLife.CurrentRealm}.`);
    console.log(`Developed qualities: ${bobNextLife.DevelopedWings.map(s => s.name).join(", ")}`);
    console.log(`Remaining fetters: ${bobNextLife.RemainingFetters.map(f => f.name).join(", ")}`);
    console.log(`Remaining clinging: ${bobNextLife.RemainingClinging.map(c => c.name).join(", ")}`);
    console.log(`Remaining effluents: ${bobNextLife.RemainingEffluents.map(e => e.name).join(", ")}`);
} else {
    console.log("\nBob has attained total Unbinding and will not be reborn (unlikely for this scenario).");
}

// Scenario for achieving Arahantship
console.log("\n--- Scenario for Arahant (Full Liberation) ---");

const arahantKammaField = new KammaField(); // Start with a clean slate for demonstration
const arahantQualities = createDefaultUnskillfulQualities();
let arahant = new Being("ArahantPractitioner", Realm.Human, arahantKammaField, arahantQualities.fetters, arahantQualities.clinging, arahantQualities.effluents, [
    new Discernment(), new WingToAwakening("Persistence"), new WingToAwakening("Concentration")
]);

// Abandon all lower fetters (Stream-winner, Once-returner, Non-returner)
arahant.abandonUnskillfulQuality("Self-Identity View");
arahant.abandonUnskillfulQuality("Uncertainty");
arahant.abandonUnskillfulQuality("Grasping at Habits & Practices");
arahant.abandonUnskillfulQuality("Sensual Passion");
arahant.abandonUnskillfulQuality("Ill Will");

// Abandon all higher fetters
arahant.abandonUnskillfulQuality("Passion for Form");
arahant.abandonUnskillfulQuality("Passion for Formlessness");
arahant.abandonUnskillfulQuality("Conceit");
arahant.abandonUnskillfulQuality("Restlessness");
arahant.abandonUnskillfulQuality("Craving"); // Craving is a Fetter AND a cause of clinging/effluents
arahant.abandonUnskillfulQuality("Ignorance"); // Ignorance is a Fetter AND a cause of effluents

// Abandon all clinging and effluents (simulated by calling abandon on all)
arahant.abandonUnskillfulQuality("Sensuality Clinging");
arahant.abandonUnskillfulQuality("View Clinging");
arahant.abandonUnskillfulQuality("Habit & Practice Clinging");
arahant.abandonUnskillfulQuality("Doctrine of Self Clinging");
arahant.abandonUnskillfulQuality("Sensuality Effluent");
arahant.abandonUnskillfulQuality("Becoming Effluent");
arahant.abandonUnskillfulQuality("Ignorance Effluent");

console.log("\n--- Arahant's Current State ---");
console.log(`Arahant's remaining fetters: ${arahant.RemainingFetters.map(f => f.name).join(", ")}`);
console.log(`Arahant's remaining clinging: ${arahant.RemainingClinging.map(c => c.name).join(", ")}`);
console.log(`Arahant's remaining effluents: ${arahant.RemainingEffluents.map(e => e.name).join(", ")}`);
console.log(`Arahant is enlightened: ${arahant.IsEnlightened}`);

// Simulate Arahant transmigrating - should result in null (no rebirth)
let arahantNextLife: Being | null = arahant.transmigration();
if (arahantNextLife) {
    console.log(`\nArahant's next life: ${arahantNextLife.Name} in ${arahantNextLife.CurrentRealm}.`);
} else {
    console.log("\nArahant has attained total Unbinding and will not be reborn.");
}
