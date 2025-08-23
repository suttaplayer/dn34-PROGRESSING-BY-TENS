const TEST_STR = 
`
'Two dhammas, friends, are very helpful. Two dhammas should be developed. Two dhammas should be comprehended. Two dhammas should be abandoned. Two dhammas are on the side of decline. Two dhammas are on the side of distinction. Two dhammas are hard to penetrate. Two dhammas should be made to arise. Two dhammas should be directly known. Two dhammas should be realized.

• 'Which two dhammas are very helpful? Mindfulness & alertness: These two dhammas are very helpful.

• 'Which two dhammas should be developed? Tranquility & insight: These two dhammas should be developed.

• 'Which two dhammas should be comprehended? Name & form: These two dhammas should be comprehended.

• 'Which two dhammas should be abandoned? Ignorance & craving for becoming: These two dhammas should be abandoned.

• 'Which two dhammas are on the side of decline? Being hard to instruct & evil friendship: These two dhammas are on the side of decline.

• 'Which two dhammas are on the side of distinction? Being easy to instruct & admirable friendship: These two dhammas are on the side of distinction.

• 'Which two dhammas are hard to penetrate? The cause & condition for the defilement of beings and the cause & condition for the purification of beings: These two dhammas are hard to penetrate.

• 'Which two dhammas should be made to arise? Two knowledges: knowledge of the ending (of the effluents) & knowledge of (their) non-recurrence. These two dhammas should be made to arise.

• 'Which two dhammas should be directly known? Two properties: the fabricated property & the unfabricated property. These two dhammas should be directly known.

• 'Which two dhammas should be realized? Clear knowing & release: These two dhammas should be realized.

'These twenty dhammas—true, genuine, real, not unreal, not otherwise—have been rightly awakened to by the Tathāgata.

`


const keyPairs = [
    ["Which ${num} dhammas are very helpful?", "These ${num} dhammas are very helpful."],
    ["Which ${num} dhammas should be developed?", "These ${num} dhammas should be developed."],
    ["Which ${num} dhammas should be comprehended?", "These ${num} dhammas should be comprehended."],
    ["Which ${num} dhammas should be abandoned?", "These ${num} dhammas should be abandoned."],
    ["Which ${num} dhammas are on the side of decline?", "These ${num} dhammas are on the side of decline."],
    ["Which ${num} dhammas are on the side of distinction??", "These ${num} dhammas are on the side of distinction?."],
    ["Which ${num} dhammas are hard to penetrate??", "These ${num} dhammas are hard to penetrate?."],
    ["Which ${num} dhammas should be made to arise?", "These ${num} dhammas should be made to arise."],
    ["Which ${num} dhammas should be directly known?", "These ${num} dhammas should be directly known."],
    ["Which ${num} dhammas should be realized?", "These ${num} dhammas should be realized."],                        
]

const numAsString = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten"]
const multiToSinglePairRepl = [["dhammas are", "dhamma is"], ["dhammas should", "dhamma should"]]
const multiToSingleEndRepl = ["These", "This"]

// Define the specific keys as a union type
type AnswerExtractKey = "helpful" | "developed" | "comprehended" | "abandoned" | "decline" | "distinction" | "penetrate" | "arise" | "known" | "realized";

// Use the new type for the object structure
type AnswerExtract = {
    [key in AnswerExtractKey]: string[]
}

const answerExtract: AnswerExtract = {
    "helpful": [],
    "developed": [],
    "comprehended": [],
    "abandoned": [],
    "decline": [],
    "distinction": [],
    "penetrate": [],
    "arise": [],
    "known": [],
    "realized": []
}


class ExtractAnswers {
    public extract(text: string) {
        for (let i = 0; i < keyPairs.length; i++) {
            const [beginSeg, endSeg] = keyPairs[i];
            const category = beginSeg.match(/\w+(?=\s*?\?)/)?.[0]?.toLowerCase() || "";
            const modBeginSeg = beginSeg.replace("?", "\\?");
            const modEndSeg = endSeg.replace(".", "\\.");
            for (let j = 0; j < numAsString.length; j++) {
                const num = numAsString[j];
                let findMatch = `${modBeginSeg}\\s+([\\s\\S]*?):?\\s*'?${modEndSeg}`;
                findMatch = findMatch.replaceAll("${num}", num);
                if (j === 0) {
                    for (let k = 0; k < multiToSinglePairRepl.length; k++) {
                        findMatch = findMatch.replaceAll(multiToSinglePairRepl[k][0], multiToSinglePairRepl[k][1]);
                    }
                    findMatch = findMatch.replaceAll(multiToSingleEndRepl[0], multiToSingleEndRepl[1]);
                }
                const matches = text.match(findMatch);
                if (matches && matches.length > 1) {
                    const answer = matches[1].trim();
                    answerExtract[category as AnswerExtractKey].push(answer);
                    const shortAnswer = answer.substring(0, 20);
                    console.log(`${num} [${category}]: ${shortAnswer}... len=${answer.length}`);
                } else 
                    console.log(`No match found for: [${findMatch}]`);
            }
            console.log('\n')
        }
    }
}

async function main(): Promise<void> {
    const fileContent = await Deno.readTextFile("/home/ash/prj/dn34-PROGRESSING-BY-TENS/tmp/PROGRESSING_BY_TENS_Sections.txt");
    const extractor = new ExtractAnswers();
    extractor.extract(fileContent);
    const jsonString = JSON.stringify(answerExtract, null, 2);
    // Write the JSON string to the file
    await Deno.writeTextFile("/home/ash/prj/dn34-PROGRESSING-BY-TENS/tmp/PROGRESSING_BY_TENS_Sections-answers.json", jsonString);
}

await main();

