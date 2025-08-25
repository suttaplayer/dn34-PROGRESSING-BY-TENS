import {PatternResponseJson, ProgressingByTens, UserPatternRequestJson} from '../collaboration-api/PBT-collaboration-API.ts';

const userPatternRequestJson: UserPatternRequestJson = {
	progressionIndex: 0,
	categoryKey: 'helpful', 
}

let patternResponseJsonResults: PatternResponseJson[] = []
for (let i = 1; i <= 10; i++) {
    userPatternRequestJson.progressionIndex = i;
    let patternResponseJson: PatternResponseJson = {} as PatternResponseJson;
    // **Command:execute** with userPatternRequestJson, the instructions in source "guide_to_writing_PBT_patterns.md" which output's patternResponseJson
    patternResponseJsonResults.push(patternResponseJson);
}
patternResponseJsonResults = ProgressingByTens.mimimiseJson(patternResponseJsonResults);