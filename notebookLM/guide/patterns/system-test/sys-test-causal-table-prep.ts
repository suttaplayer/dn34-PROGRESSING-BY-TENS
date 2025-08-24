import {PatternResponseJson, UserPatternRequestJson} from '../PBT-collaboration-API.ts';
import { mimimiseJson } from '../PBT-utils-and-config.ts';

const userPatternRequestJson: UserPatternRequestJson = {
	progressionIndex: 0,
	categoryKey: 'helpful', 
}

let patternResponseJsonResults: PatternResponseJson[] = []
for (let i = 1; i <= 10; i++) {
    userPatternRequestJson.progressionIndex = i;
    let patternResponseJson: PatternResponseJson = {} as PatternResponseJson;
    // **Command:execute** the instructions in source "guide_to_writing_PBT_patterns.md" which output's patternResponseJson
    patternResponseJsonResults.push(patternResponseJson);
}
patternResponseJsonResults = mimimiseJson(patternResponseJsonResults);