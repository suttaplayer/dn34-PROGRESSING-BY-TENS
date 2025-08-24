import { UserPatternRequestJson } from '../PBT-collaboration-API.ts';
import { convertProgressionIndexToKey, fixBreadcrumbsIfNecessary, lookupAnswerExcerpt, lookupPatternName, progressingByTensConfig } from '../PBT-utils-and-config.ts';

const userPatternRequestJson: UserPatternRequestJson = { 
  "progressionIndex": 1,
  "categoryKey": "comprehended",
}

const contextStatement = `
Which ${convertProgressionIndexToKey(userPatternRequestJson["progressionIndex"])} ${fixBreadcrumbsIfNecessary(userPatternRequestJson)}? 
${lookupAnswerExcerpt(userPatternRequestJson)}
`
console.log(contextStatement)