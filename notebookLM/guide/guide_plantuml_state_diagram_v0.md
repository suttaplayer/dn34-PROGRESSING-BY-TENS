# PlantUML State Diagrams modeling syntax & semantics notation guide

## Rules:
1. Add title to the diagram
1. Add creation identifiers to the header
1. Do not apply any Skinparam, inline color or styling
1. Do not add any diagram notes
1. Always add 'hide empty description' pragma
1. Always have a start & end state unless not applicable
1. Model composite states in a separate diagram when the base diagram already exceeds 9 states
1. Use name aliasing to handle state names with special characters
1. Honour the original source representation in state names (eg. "Awareness-Release")
1. [<= 25 characters]: Use underscore on word boundaries in state and member names (eg. "Unprovoked Awareness-Release" -> "Unprovoked_Awareness-Release")
1. [> 25 characters]: Break state name on word boundaries using multiple line notation for long state names  > 25 characters (eg. "Unprovoked\nAwareness-Release")
1. Add 1 member per line in compartments


## Add title and header
```plantuml
@startuml
header <gemini-model-id>, <generation-date> 
title Name & form is to be comprehended
@enduml
```
### How this example is to be read & understood
* The diagram has a header where notebooklm has replaced <gemini-model-id> with the model identifier & <generation-date> with date in dd-MMM-YYYY format
* The diagram has a title named "Mindfulness immersed in the body"


## Use aliases for names with special characters, names with spacing & long names spaning multiple lines
```plantuml
@startuml
state "Unprovoked\nAwareness-Release" as UAR
@enduml
```
### How this example is to be read & understood
* There is a state named "Unprovoked Awareness-Release" that spans two lines separated at the word boundary


## Use state compartment for expressing details
```plantuml
@startuml
hide empty description
state "Six Sense Media" as ssm
ssm: eye & forms
ssm: ear & sounds
ssm: nose & aromas
ssm: body & tactile sensations
ssm: intellect & ideas
@enduml
```
### How this example is to be read & understood
* There is a state named Six Sense Media which has the following internal details/values:
  * eye & forms, ear & sounds, nose & aromas, body & tactile sensations, intellect & ideas


## Create a separate composite state diagram when the total number of states > 9 and a composite state is evident
```plantuml
@startuml
state "Training in Heightened Virtue" as hv
state "Training in Heightened Mind" as hm
state "Training in Heightened Discernment" as hd

hv:Mind
hm:Mind
hd:Mind

[*] -> hv
hv -> hm: leads to
hm -> hd: leads to
hd -> [*]
@enduml

@startuml
state Mind {
  state "Non-Passion" as np

  [*] -> Passion
  Passion --> np : [gained awareness-release]
  np --> Passion : \n\n[lost awareness-release]
  ||
  state "Non-Aversion" as na
  [*] -> Aversion
  Aversion --> na : [gained awareness-release]
  na --> Aversion : \n\n[lost awareness-release]
  ||
  state "Non-Delusion" as nd
  [*] -> Delusion
  Delusion --> nd : [effluent free]
}
Mind:note: three roots for the origination of action
@enduml
```
### How this example is to be read & understood
* There are two diagrams that have been created as part of this bundle:
  * Top-level diagram: 
    * There are the three states: Training in Heightened Virtue, Training in Heightened Mind & Training in Heightened Discernment
      * Each of these states makes reference to an internal member named Mind
    * The start state transitions to the Training in Heightened Virtue, which in turn transitions to the Training in Heightened Mind, which in turn transitions to the Training in Heightened Discernment and finally transitions to the end state
  * The Mind diagram:
    * There is a composite state named Mind which indicates that there are three roots for the origination of action. These are illustrated as the following concurrent states:
      * Passion/Non-Passion:
        * The Mind from the start transitions immediately to the Passion sub-state
        * The Passion sub-state transitions to the Non-Passion sub-state when awareness-release is gained
        * The Non-Passion sub-state transitions to the Passion sub-state when awareness-release is lost
      * Aversion/Non-Aversion
        * The Mind from the start transitions immediately to the Aversion sub-state
        * The Aversion sub-state transitions to the Non-Aversion sub-state when awareness-release is gained
        * The Non-Aversion sub-state transitions to the Aversion sub-state when awareness-release is lost
      * Delusion/Non-Delusion
        * The Mind from the start transitions immediately to the Delusion sub-state
        * The Delusion sub-state transitions permanently to the Non-Delusion sub-state when the mind is effluent free


## Use sub-states when context is required
```plantuml
@startuml
state Delusion {
  state Intoxication
}
 
state Aversion {
  state Competitiveness 
}
Intoxication --> Competitiveness
@enduml
```
### How this example is to be read & understood
* There are two outer-states namely: Delusion & Aversion
* The Delusion state has an Intoxication sub-state
* The Aversion state has a Competitiveness sub-state
* There is a transition that occurs from the Intoxication sub-state to the Competitiveness sub-state


# Use synchronisation bar for forks and joins
```plantuml
@startuml
state nm_fork <<fork>>
state nm_join <<join>>

state "Name-&-Form" as nm
state "Consciousness w/ surface" as cs_surface
state "Six Sense Media" as ss_media
state "Consciousness w/o surface" as cs_w_surfance

cs_w_surfance --> nm
nm --> nm_fork
nm_fork --> cs_surface
nm_fork --> ss_media
cs_surface --> nm_join
ss_media --> nm_join
@enduml
```
### How this example is to be read & understood
* There are four states namely: Consciousness w/o surface, Name-&-Form, Consciousness w/ surface & Six Sense Media
* There is a transition from Consciousness w/o surface to Name-&-Form
* There is a transition from Name-&-Form to a synchronisation bar fork
* There are two transitions that are spawned simultaneously from the fork:
  * A transition to Consciousness w/ surface
  * A transition to Six Sense Media
* There are no indications as to whether these states are completed serially or in parallel, however both end together at the synchronisation bar join


## Use concurrent states for complex objects when required
```plantuml
@startuml
state Mind {
  state "Non-Passion" as np

  [*] -> Passion
  Passion --> np : [gained awareness-release]
  np --> Passion : \n\n[lost awareness-release]
  ||
  state "Non-Aversion" as na
  [*] -> Aversion
  Aversion --> na : [gained awareness-release]
  na --> Aversion : \n\n[lost awareness-release]
  ||
  state "Non-Delusion" as nd
  [*] -> Delusion
  Delusion --> nd : [effluent free]
}
Mind:note: three roots for the origination of action
@enduml
```
### How this example is to be read & understood
* There is a composite state named Mind which indicates that there are three roots for the origination of action. These are illustrated as the following concurrent states:
  * Passion/Non-Passion:
    * The Mind from the start transitions immediately to the Passion sub-state
    * The Passion sub-state transitions to the Non-Passion sub-state when awareness-release is gained
    * The Non-Passion sub-state transitions to the Passion sub-state when awareness-release is lost
  * Aversion/Non-Aversion
    * The Mind from the start transitions immediately to the Aversion sub-state
    * The Aversion sub-state transitions to the Non-Aversion sub-state when awareness-release is gained
    * The Non-Aversion sub-state transitions to the Aversion sub-state when awareness-release is lost
  * Delusion/Non-Delusion
    * The Mind from the start transitions immediately to the Delusion sub-state
    * The Delusion sub-state transitions permanently to the Non-Delusion sub-state when the mind is effluentfree


## Use choice for expressing critical conditional transitions
```plantuml
@startuml
state Mind {
  state attn_choice <<choice>>
  state "Non-Passion" as np
  [*] -> attn_choice
  attn_choice --> np : [appropriate attention]
  attn_choice --> Passion : [inappropriate attention]
}
@enduml
```
### How this example is to be read & understood
* There is a composite state named Mind with two sub-states namely: Passion & Non-Passion
* From the start there is binary condition encountered of either the mind attending appropriately or inappropriately
  * When the mind holds appropriate attention there is a transitions to the Non-Passion sub-state
  * When the mind holds inappropriate attention there is a transitions to the Passion sub-state


## Use [<condition>] labels on transitions for expressing non-critical conditional transitions
Note:
  * When using conditional labels on transitions, verify that the model does not get unintentionally stuck in a given state 
```plantuml
@startuml
state Mind {
  state "Is Concentrated" as mic {
    state "1st Jhana" as j1
    state "2nd Jhana" as j2
    state "3rd Jhana" as j3
    state "4th Jhana" as j4
    [*] --> j1 : [gained singleness of preoccupation]
    j1 --> [*]: [lost singleness of preoccupation]
    j1 --> j2: [verbal fabrication ceased]
    j2 --> j3: [rapture ceased]
    j3 --> j4: [in-&-out breadths ceased]
    j4 --> j3: [in-&-out breadths re-arose]
    j3 --> j2: [rapture re-arose]
    j2 --> j1: [verbal fabrication re-arose]
  }
  state "Is Unconcentrated" as miu
  [*] --> miu
  miu --> mic: [secluded from unskillful qualities]
  mic --> miu: [unskillful qualities re-arose]
}
@enduml
```
### How this example is to be read & understood
* There is a composite state named Mind with two sub-states namely: Is Concentrated & Is Unconcentrated
* The mind starts in the Is Unconcentrated sub-state:
  * The mind transitions to the Is Concentrated sub-state when the mind is secluded from unskillful qualities
  * The mind transitions from the Is Concentrated sub-state when unskillful qualities re-arise
* The Is Concentrated sub-state is itself a composite state with four sub-states:
  * The mind transitions into the 1st Jhana sub-state when singleness of preoccupation has been gained
  * The mind transitions out of the 1st Jhana sub-state when singleness of preoccupation has been lost
  * The mind transitions into the 2nd Jhana sub-state when verbal fabrication have ceased
  * The mind transitions back into the 1st Jhana sub-state when verbal fabrication have re-arisen
  * The mind transitions into the 3rd Jhana sub-state when rapture has ceased
  * The mind transitions back into the 2nd Jhana sub-state when rpature has re-arisen3rd
  * The mind transitions into the 4th Jhana sub-state when the in-&-out breadths have ceased
  * The mind transitions back into the 3rd Jhana sub-state when the in-&-out breadths have re-arisen


## Use self-referencing transitions when necessary
```plantuml
@startuml
state "Self Hood" as sh {
  [*] --> Being
  Being --> Being: intention()
  Being --> Arahant: intention() [effluent free]
  Arahant --> Arahant: intention()
}
@enduml
```
### How this example is to be read & understood
* There is a composite state named Self Hood with two sub-states namely: Being & Arahant
* Self hood starts in the Being sub-state
* The Being continuously intends this typically results in a self-referencing transition that keeps one in the Being sub-state
* However, upon becoming effluent free with one's intention, they transition into the Arahant sub-state
* Once Arahantship is acquired, all further intentions keeps one remaining in the Arahant sub-state


## Use loops to illustrate cycles
```plantuml
@startuml
state Samsara {
  state fuel_remaining_choice <<choice>>
  state "Consciousness w/o surface" as cwos
  state "Name-&-Form" as nam
  state "Six Sense Media" as ssm
  state "Clinging/Sustenance" as cs

  state feeling_fork <<fork>>
  state feeling_join <<join>>
  
  nam: Self hood
  
  [*] --> fuel_remaining_choice
  fuel_remaining_choice -right-> [*]: [no fuel remaining]
  
  fuel_remaining_choice --> cwos
  cwos --> nam: comes
  nam --> ssm: comes
  ssm --> Contact: comes
  Contact --> Feeling: comes
  Feeling --> feeling_fork: meeting place w/ effluents at Contact
  feeling_fork --> Craving: comes
  feeling_fork --> Ignorance
  feeling_fork --> Unfabricated: [appropriate attention to the\nDeathless property]
  Unfabricated --> feeling_join: [effluent free]
  Ignorance --> Fabrications: comes
  Ignorance: born of Effluents at Contact
  Ignorance --> Effluents: comes
  Fabrications --> Becoming
  Effluents --> feeling_join
  Fabrications: creates clinging-aggregates
  Fabrications: may create sensuality
  Feeling --> fuel_remaining_choice: [effluent free]
  Craving --> cs: comes
  cs --> Becoming: comes
  Becoming --> Effluents
  Effluents: may be born of Sensuality
  Effluents: born of Becoming
  Effluents: born of Ignorance
  feeling_join --> fuel_remaining_choice
}
Samsara: Transmigrating and wandering on
@enduml
```
### How this example is to be read & understood
* Upon start there is a transition to a decision point of whether there is any fuel remaining. 
* If there is no fuel remaining there is a transition to the end state
* If there is fuel remaining, then there is a transition to Consciousness w/o surface
* From Consciousness w/o surface comes Name-&-Form
* From Name-&-Form comes Six Sense Media
* From Six Sense Media comes Contact
* From Contact comes Feeling
* When effluent free, then from Feeling the cycle repeats by transitioning back to the fuel remaining decision point
* When effluents at Contact, then from Feeling there is a transition to the Feeling synchronisation bar fork which is the meeting place
* There are three transitions that are spawned from this fork:
  * Craving:
    * From the Feeling syncrhonisation bar fork comes Craving
    * From Craving comes Clinging/Sustenance 
    * From Clinging/Sustenance comes Becoming
    * From Becoming there is a transition to Effluents
    * From the Effluents there is a transition to the Feeling synchronisation bar join
  * Ignorance:
    * From the Feeling syncrhonisation bar fork comes Ignorance born of the Effluents at Contact
    * From Ignorance comes Effluents
    * From the Effluents there is a transition to the Feeling synchronisation bar join
  * Unfabricated:
    * From the Feeling syncrhonisation bar fork a transition to Unfabricated with one attends appropriately to the Deathless property
    * From the Unfabricated there is a transition to the Feeling synchronisation bar join
* From the Feeling synchronisation bar join the cycle repeats by transitioning back to the fuel remaining decision point
