// main.ts

// --- Enum Definitions from Sources ---

// Enum for types of feelings
enum FeelingType {
    Pleasant = "Pleasant",
    Painful = "Painful",
    Neutral = "Neutral"
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

// --- Interface Definitions for Mental Qualities ---

// Represents a general mental quality (skillful or unskillful)
interface MentalQuality {
    name: string;
    description: string;
    isSkillful: boolean;
    isObstruction: boolean;
}

// Represents a defilement that can be abandoned (like a feter or obsession)
interface Defilement extends MentalQuality {
    isAbandoned: boolean;
    abandon(): void;
}

// --- Concrete Classes for Defilements (Obsessions & Hindrances) ---

// Represents a Hindrance
class Hindrance implements Defilement {
    name: string;
    description: string;
    isSkillful = false;
    isObstruction = true; // Hindrances overwhelm awareness and weaken discernment
    isAbandoned: boolean = false;

    constructor(name: string, description: string) {
        this.name = name;
        this.description = description;
    }

    abandon(): void {
        this.isAbandoned = true;
        console.log(`  🚫 **${this.name}** has been abandoned.`);
    }
}

// Represents an Obsession
class Obsession implements Defilement {
    name: string;
    description: string;
    isSkillful = false;
    isObstruction = true; // Obsessions are deeply ingrained tendencies
    isAbandoned: boolean = false;

    constructor(name: string, description: string) {
        this.name = name;
        this.description = description;
    }

    abandon(): void {
        this.isAbandoned = true;
        console.log(`  🚫 **${this.name}** has been uprooted.`);
    }
}

// Specific Obsessions
class Craving extends Obsession {
    constructor() {
        super("Craving", "The ensnarer that stitches one to renewed becoming."); //
    }
}

class Ignorance extends Obsession {
    constructor() {
        super("Ignorance", "The root cause of fabrications and the entire cycle of suffering."); //
    }
}

class SelfIdentityView extends Obsession {
    constructor() {
        super("Self-Identity View", "The view of 'I am' with regard to aggregates."); //
    }
}

// --- KammaField and Being (Simplified from previous turn, focused on relevant parts) ---

class KammaField {
    private futureKammaPotentials: { description: string; intensity: number; }[] = [];

    addKamma(kamma: { description: string; intensity: number; }): void {
        this.futureKammaPotentials.push(kamma);
        // console.log(`  [KammaField] Added kamma: "${kamma.description}" (Intensity: ${kamma.intensity > 0 ? 'Skillful' : 'Unskillful'})`);
    }

    // In a real system, kamma would ripen and influence future outcomes.
    // For this simplified model, we just record it.
    getFutureKammaPotentials(): { description: string; intensity: number; }[] {
        return this.futureKammaPotentials;
    }
}

class Being {
    id: number;
    name: string;
    kammaField: KammaField;
    unskillfulMentalQualities: Defilement[]; // Includes Hindrances and Obsessions
    isDefiled: boolean;

    constructor(name: string, kammaField: KammaField) {
        this.id = Math.floor(Math.random() * 1000);
        this.name = name;
        this.kammaField = kammaField;
        // A run-of-the-mill individual starts with all these defilements
        this.unskillfulMentalQualities = [
            new Hindrance("Sensual Desire", "An obstacle that overwhelms awareness and weakens discernment."), //
            new Hindrance("Restlessness & Anxiety", "An unstilled mind, prone to disturbance."), //
            new Obsession("Passion-Obsession", "Latent tendency for passion, becoming obsessed with pleasure."), //
            new Obsession("Ignorance-Obsession", "Latent tendency for not discerning the true nature of phenomena."), //
            new Craving(), //
            new SelfIdentityView() //
        ];
        this.isDefiled = true; // Mind is defiled by incoming defilements [Source 4, AN 1:45]
        console.log(`\n**-- Scenario for '${this.name}' (Run-of-the-Mill Individual with a Defiled Mind) --**`);
    }

    // --- The Six Threads of Execution upon Contact ---

    // Thread 1: Contact Processing (The initial trigger)
    processContact(senseMedium: SenseMedia, senseObject: string): void {
        console.log(`\n**1. Contact Processing Thread:**`);
        console.log(`  ${this.name} experiences contact: **${senseMedium}** meets **${senseObject}**.`);
        
        // This thread immediately triggers Feeling and Perception
        const feeling = this.generateFeeling(senseObject);
        const perception = this.generatePerception(senseObject);

        // Subsequent threads operate on these outputs
        this.formVolition(feeling, perception);
        this.arouseCraving(feeling, perception);
        this.conceptualElaboration(perception);
    }

    // Thread 2: Feeling Generation
    private generateFeeling(senseObject: string): FeelingType {
        console.log(`\n**2. Feeling Generation Thread:**`);
        const feeling = FeelingType.Pleasant; // Scenario: experiencing pleasure
        console.log(`  A **${feeling} feeling** arises in response to ${senseObject}.`);
        console.log(`  *Note: Even pleasant feelings can lead to stress due to inconstancy.*`);
        return feeling;
    }

    // Thread 3: Perception & Labeling
    private generatePerception(senseObject: string): string {
        console.log(`\n**3. Perception & Labeling Thread:**`);
        const perception = `Labeling '${senseObject}' as enjoyable`;
        console.log(`  Perception arises: **${perception}**.`);
        console.log(`  "What one feels, one perceives."`);
        return perception;
    }

    // Thread 4: Volitional Fabrication (Kamma Generation)
    private formVolition(feeling: FeelingType, perception: string): void {
        console.log(`\n**4. Volitional Fabrication Thread (Kamma Generation):**`);
        const sensualDesireHindrance = this.unskillfulMentalQualities.find(d => d.name === "Sensual Desire") as Hindrance;
        const ignoranceObsession = this.unskillfulMentalQualities.find(d => d.name === "Ignorance-Obsession") as Obsession;

        if (sensualDesireHindrance && !sensualDesireHindrance.isAbandoned && feeling === FeelingType.Pleasant) {
            const intentionDescription = `Intention to continue relishing the pleasant feeling from '${perception}'`;
            console.log(`  Driven by **${sensualDesireHindrance.name}**, an intention arises: "${intentionDescription}".`);
            // This intention is mental kamma, leading to future becoming
            this.kammaField.addKamma({ description: `Mental action: ${intentionDescription}`, intensity: -0.2 }); // Unskillful kamma
            console.log(`  "Contacted, one intends." This mental intention is a **fabrication**, making new **kamma** for future becoming.`);
            if (ignoranceObsession && !ignoranceObsession.isAbandoned) {
                 console.log(`  Fueled by **${ignoranceObsession.name}**, this unskillful intention is blameworthy.`); //
            }
        }
    }

    // Thread 5: Craving & Clinging
    private arouseCraving(feeling: FeelingType, perception: string): void {
        console.log(`\n**5. Craving & Clinging Thread:**`);
        const passionObsession = this.unskillfulMentalQualities.find(d => d.name === "Passion-Obsession") as Obsession;
        const cravingFetter = this.unskillfulMentalQualities.find(d => d.name === "Craving") as Craving;

        if (feeling === FeelingType.Pleasant && passionObsession && !passionObsession.isAbandoned && cravingFetter && !cravingFetter.isAbandoned) {
            console.log(`  Since ${this.name}'s mind is defiled with **${passionObsession.name}** and **${cravingFetter.name}**, they **relish, welcome, & remain fastened to** the pleasant feeling from '${perception}'.`);
            console.log(`  This leads to **delight**, which *is* **clinging** or sustenance.`);
            this.kammaField.addKamma({ description: `Clinging to pleasant feeling from '${perception}'`, intensity: -0.3 }); // More unskillful kamma
            console.log(`  "From his clinging or sustenance as a requisite condition comes becoming."`);
        } else {
            console.log(`  (If the mind were not defiled, relishing would not occur, breaking this link.)`);
        }
    }

    // Thread 6: Conceptual Elaboration (Making of Measurement)
    private conceptualElaboration(perception: string): void {
        console.log(`\n**6. Conceptual Elaboration Thread (Making of Measurement):**`);
        const selfIdentityViewObsession = this.unskillfulMentalQualities.find(d => d.name === "Self-Identity View") as SelfIdentityView;
        const ignoranceObsession = this.unskillfulMentalQualities.find(d => d.name === "Ignorance-Obsession") as Obsession;

        if (selfIdentityViewObsession && !selfIdentityViewObsession.isAbandoned && ignoranceObsession && !ignoranceObsession.isAbandoned) {
            console.log(`  Building on the perception '${perception}', the mind, possessed by **${selfIdentityViewObsession.name}**, engages in "making of measurement" and "objectification".`);
            console.log(`  This involves "I am" verbalizations (e.g., "I am enjoying this movie") rooted in **passion, aversion, or delusion**.`);
            console.log(`  This process further assails ${this.name} with "perceptions & categories of objectification" concerning past, present, & future.`);
        } else {
            console.log(`  (If these obsessions were abandoned, the mind would not engage in unskillful conceptual elaboration.)`);
        }
    }

    // Simulate the state of the defiled mind
    reportMindState(): void {
        console.log(`\n--- ${this.name}'s Mind State ---`);
        if (this.isDefiled) {
            console.log(`  The mind of ${this.name} is **defiled by incoming defilements**, making it "unpliant" and "unrestrained".`);
            console.log(`  Current Hindrances (Obstructions):`);
            this.unskillfulMentalQualities.filter(d => d instanceof Hindrance && !d.isAbandoned).forEach(h => console.log(`    - ${h.name}: ${h.description}`));
            console.log(`  Current Obsessions:`);
            this.unskillfulMentalQualities.filter(d => d instanceof Obsession && !d.isAbandoned).forEach(o => console.log(`    - ${o.name}: ${o.description}`));
        } else {
            console.log(`  The mind of ${this.name} is now undefiled, pliant, and luminous.`);
        }
        console.log(`  Accumulated Future Kamma Potentials: ${this.kammaField.getFutureKammaPotentials().length} entries.`);
    }

    // Illustrative method to show potential for abandoning defilements
    practiceDhamma(): void {
        console.log(`\n--- ${this.name} Begins Dhamma Practice ---`);
        console.log(`  Recollecting the Dhamma, ${this.name}'s mind calms and defilements are abandoned.`); //
        this.unskillfulMentalQualities.forEach(d => {
            // Simulate abandoning some key defilements through practice
            if (d.name === "Sensual Desire" || d.name === "Craving" || d.name === "Self-Identity View") {
                d.abandon();
            }
        });
        this.isDefiled = this.unskillfulMentalQualities.some(d => !d.isAbandoned);
        if (!this.isDefiled) {
            console.log(`  **The mind is now free of defilements, becoming "pliant, malleable, & luminous."**`);
        }
    }
}

// --- Scenario Execution ---

function runMovieWatchingScenario() {
    const kammaField = new KammaField();
    const movieWatcher = new Being("Alice", kammaField);

    console.log("--- Single Moment of Contact: Alice Watching a Movie ---");

    // Alice engages with the movie (Eye and Forms)
    movieWatcher.processContact(SenseMedia.Eye, "Forms from the movie (e.g., captivating visuals)");

    // Report final state after this moment of contact
    movieWatcher.reportMindState();

    // Show how practice changes the outcome
    movieWatcher.practiceDhamma();
    movieWatcher.reportMindState();

    console.log("\n--- End of Scenario ---");
}

// Run the scenario
runMovieWatchingScenario();
