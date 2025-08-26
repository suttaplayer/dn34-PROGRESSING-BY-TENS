import { ProgressingByTens, UserPatternRequestJson } from '../../collaboration-api/PBT-collaboration-API.ts';

const userPatternRequestJson: UserPatternRequestJson = { 
  "progressionIndex": 1,
  "categoryKey": "developed",
}

const contextStatement = ProgressingByTens.revealContextStatement(userPatternRequestJson);
console.log(contextStatement)

```bash
$ deno sys_test1.ts 

Which one Dhamma should be developed? 
Mindfulness immersed in the body connected with joy
```