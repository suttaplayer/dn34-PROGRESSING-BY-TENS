import { ProgressingByTens, UserPatternRequestJson } from '../collaboration-api/PBT-collaboration-API.ts';

const userPatternRequestJson: UserPatternRequestJson = { 
  "progressionIndex": 1,
  "categoryKey": "comprehended",
}

const contextStatement = ProgressingByTens.revealContextStatement(userPatternRequestJson);
console.log(contextStatement)