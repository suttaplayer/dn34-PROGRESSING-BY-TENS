import {progressionByTensContextJson, UserDirectExperienceJson, UserInfluentialFactorsJson} from '../PBT-collaboration-API.ts';


const userDirectExperienceJson: UserDirectExperienceJson = {
    "Solution": {
        "Step-by-Step": {
            "factors": [
                "The robe is to be partaken of when it leads to the decrease of unskillful qualities and the increase of skillful qualities.",
                "Alms food is to be partaken of when it leads to the decrease of unskillful qualities and the increase of skillful qualities."
            ],
            "determinant-quotations": [
                "Monks, I speak of robes in two ways: to be partaken of and not to be partaken of. I also speak of alms food… lodgings… villages & towns… countrysides… individuals in two ways: to be partaken of and not to be partaken of.",
                "Any robe of which one has come to know, 'When I partake of this robe, unskillful qualities decrease and skillful qualities increase,' that sort of robe is to be partaken of."
            ]
        }
    }
}


console.log(JSON.stringify(userDirectExperienceJson, null, 2))