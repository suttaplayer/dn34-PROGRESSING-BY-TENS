# PlantUML Class Diagrams modeling syntax & semantics notation guide

## Rules:
1. Add title to the diagram
1. Add creation identifiers to the header
1. Do not apply any Skinparam, inline color or styling
1. Do not add any general diagram notes; notes with sutta acronym references (eg. "MN 95") beside the relevant concept are welcomed
1. Always apply 'hide empty members' pragma (to reduce visual clutter and focus on explicitly defined elements)
1. Consider including left to right direction or top to bottom direction at the beginning of the diagram definition to optimize visual flow for complex relationship structures
1. Use name aliasing to handle class names with special characters
1. Honour the original source representation in names (eg. "Awareness-Release"). That is, do not use underscores or CamelCase in naming unless essential (eg. "Mind::heedfullness_percentage .l.> SOS: arises from >" results in a plantuml syntax error if underscore is absent in relationships between specific members)
1. [<= 25 characters]: Use a space on word boundaries (but preserve hyphens) in class and member names to make them easier to read (eg. "Unprovoked Awareness-Release" -> "Unprovoked Awareness-Release")
1. [> 25 characters]: Break class name on word boundaries using multiple line notation for long class names  > 25 characters (eg. "Unprovoked\nAwareness-Release")
1. Add 1 member per line in compartments


## Add title and header

```plantuml
@startuml
header Created on: <generation-date> 
title Mindfulness immersed in the body is to be developed
@enduml
```
### How this example is to be read & understood
* The diagram has a header where notebooklm has replaced <generation-date> with today's date in dd-MMM-YYYY format
* The diagram has a title named "Mindfulness immersed in the body"


## Use aliases for names with special characters, names with spacing & long names spanning multiple lines
```plantuml
@startuml
class "Unprovoked\nAwareness-Release" as UAR
@enduml
```
### How this example is to be read & understood
* There is a class named "Unprovoked Awareness-Release" that spans two lines separated at the word boundary


## Use abtract classes for abstract concepts
```plantuml
@startuml
hide empty members
abstract class Quality
abstract "Unskillful Quality" extends Quality
abstract "Unskillful Mental Quality" extends "Unskillful Quality"
class Passion extends "Unskillful Mental Quality"
@enduml
```

### How this example is to be read & understood
* There are abstract classes named Quality, "Unskillful Quality", "Unskillful Mental Quality"
* There is a class named Passion
* Passion extends "Unskillful Mental Quality", which in turn extends "Unskillful Quality", which in turn extends Quality


## Use sterotype as the similes associated with the class when relevant
```plantuml
@startuml
class Kamma <<field>>
class Consciousness <<seed>>
class Craving <<moisture>>
@enduml
```

### How this example is to be read & understood
* There is a class named Kamma that is sterotyped as "field" (with respect to the simile)
* There is a class named Consciousness that is sterotyped as "seed" (with respect to the simile)
* There is a class named Craving that is sterotyped as "moisture" (with respect to the simile)


## Show class constraints using {<constraint>} in the first line of the first compartment
```plantuml
@startuml
class Being {
  {subsists on nutriment}
}
@enduml
```

### How this example is to be read & understood
* There is a class named Being that is governed by the constraint (ie. class invariant) that it subsists on nutriment


## Show class member features using compartments with the same naming/casing conventions as found in the sources
```plantuml
@startuml
class "Six Internal Media" as sim
class sim {
  eye
  ear
  nose
  tongue
  body
  intellect
  is intact()
  engages external media()
}
@enduml
```

### How this example is to be read & understood
* There is a class named Six Internal Media which has the following members:
  * Attributes: eye, ear, nose, tongue, body, intellect
  * Methods: is intact(), engages external media()


## Apply UML visibility modifiers (+ for public, - for private, # for protected) to attributes and operations when the accessibility or nature of the quality/action is explicitly described or strongly implied in the sources (e.g., publicly taught Dhamma vs. internally cultivated qualities)
```plantuml
@startuml
class Dhamma Teacher {
  - internal realization()
  # clarify monastic rules()
  + teach Dhamma()
}
class Disciple {
  - cultivate mind()
  # adhere to training rules()
  + practice Dhamma()
}
Dhamma Teacher --> "*" Disciple: instructs
@enduml
```

### How this example is to be read & understood
* There are classes named Dhamma Teacher & Disciples
* The Dhamma Teacher class has the following operations with the indicated visibility modifiers:
  * public teach Dhamma()
  * private internal realization()
  * protected clarify monastic rules()
* The Disciple class has the following operations with the indicated visibility modifiers: 
  * public practice Dhamma()
  * private cultivate mind() 
  * protected adhere to training rules()
* The Dhamma Teacher instructs many Disciples


## Use Extends, Composition, Aggregation, Dependency and Association for relationships 
Note:
* apply unidirection to dependency and associations when known and/or relevant

```plantuml
@startuml
abstract class Vehicle
' Extends
Vehicle <|-- Car
' Composition
Hand *-- "5" Finger
' Aggregation
Car o-- "4" Wheel
' Dependency
Vehicle .. Road: built for <
' Bidirectional Association
Vehicle -- Driver: operates <
' Unidirectional Association
Driver --> Hand
@enduml
```

### How this example is to be read & understood
* There is an abstract class named Vehicle
* There are classes named Car, Road, Driver, Wheel, Hand & Finger
* A Car extends Vehicle and inherits all of its features
* A Car has 4 Wheels. This indicates a 'has-a' relationship where the component can exist independently of the whole (e.g., a 'Saṅgha' (Community) has 'Monks' (Members), but individual 'Monk' entities can exist independently of a specific Saṅgha)
* Roads are built for Vehicles. This relationship indicates that one class depends on another, often at a conceptual or usage level, without implying structural containment or direct ownership (e.g., 'Virtue' might depend on 'Shame' and 'Compunction' as guarding qualities, but Shame and Compunction are not structural parts of Virtue)
* A Driver operates a Vehicle
* A Driver is unidirectionally associated with a Hand
* A Hand embodies 5 Fingers. This signifies a 'part-of' relationship where the component cannot exist independently of the whole within the modeled context (e.g., the 'Hair of the Head' is part of 'Body' and does not typically exist independently once detached and decaying in this specific conceptual model of a living being)


## Show navigation direction on associations & constraints for clarity of how the association is to be read
Note:
  * apply navigation direction identifier as last character in association name
  * show constraint in {} as first set of characters in association name

```plantuml
@startuml
class Car
Driver - Car : is driven by <
Car -- Person : {>= 18 years old} owns <
@enduml
```

### How this example is to be read & understood
* There are classes named Car, Driver & Person
* A Car is driven by a Driver
* A Person may own a Car when they are 18 years old or older


## Use class associations for illustrating classification born out of an association
```plantuml
@startuml
hide empty members
class "Six Internal Media" as sim
class "Six External Media" as sem

sim "{intact}" -- "{in range}" sem: engagement

Consciousness ..  (sim, sem): appearing
@enduml
```

### How this example is to be read & understood
* There are classes named Six Internal Media, Six External Media & Consciousness
* There is an association named "engagement" between the Six Internal Media & Six External Media, where the:
  * Six Internal Media must be intact
  * Six External Media must be in range
* Born out of the "engagement" association is the "appearing" of Consciousness


## Use qualified associations to show accessing index/context
```plantuml
@startuml
hide empty members
enum Internal Media {
  EYE
  EAR
  NOSE
  TONGUE
  BODY
  INTELLECT
}

Contact .left.> Internal Media: is classified by >
Consciousness ..> Internal Media: is classified by >
Contact [internal media] -- Consciousness: is the meeting of the three via >

class "Six Internal Media" as sim
class "Six External Media" as sem
Consciousness .. (sim, sem)
@enduml
```

### How this example is to be read & understood
* There are classess named Six Internal Media, Six External Media, Consciousness & Contact
* There is an enumeration type named Internal Media with the following values: 
  * EYE, EAR, NOSE, TONGUE, BODY, INTELLECT
* Contact is classified by Internal Media as a dependency, suggesting that there are the following classes of Contact:
  * Eye Contact, Ear Contact, Nose Contact, Tongue Contact, Body Contact & Intellect Contact
* Consciousness is also classified by Internal Media as a dependency, suggesting that there are the following classes of Consciousness:
  * Eye Consciousness, Ear Concsciousness, Nose Consciousness, Ear Consciousness, Nose Consciousness, Tongue Consciousness, Body Consciousness & Intellect Consciousness
* There is an association between the Six Internal Media & Six External Media from which Consciousness is born 
* Contact is the meeting of the three via Consciousness. Note, this is a qualified association which has internal media as its accessor


## Show role end details for non-obvious relationships
Note:
* A relationship is a link between two elements. A link has two ends (ie. start & end). Each end plays a role in the relationship 
* Role end's details can include:
  1. constraint within {}
  2. multiplcity
  3. role name

```plantuml
@startuml
Car o-- "{inflated} 1 spare" Wheel
Saṅgha o-- "*" Monks: consists of >
Teacher --> "0..*" Disciples: instructs >
Person --> "1..*" Quality: is endowed with >
@enduml
```

### How this example is to be read & understood
* There are classes named Car, Wheel, Saṅgha, Teacher & Person
* A Car has 1 spare wheel which must be inflated
* A Saṅgha typically consists of * (many) Monks
* A Teacher instructs 0..* (zero to many) Disciples
* A Person is endowed with 1..* (one or more) Quality


## Show relationships between specific members when necessary by using class-level associations or dependencies with explanatory labels that clarify the specific member interaction, avoiding direct lines within compartments

```plantuml
@startuml
class Practitioner {
  - develop concentration()
}

class Mind {
  # is calm
  # is joyful
}

Practitioner::develop concentration .up.> Mind::is calm: depends on
Practitioner::develop concentration .down.> Mind::is joyful: depends on
@enduml
```

### How this example is to be read & understood
* There are classes named Practitioner & Mind
* The Practitioner supports a private member operation named develop concentration()
* The Mind has two protected attributes named: is calm and is joyful
* The Practitioner's ability to develop concentration is dependent on the Mind possessing the qualities of being is calm and is joyful. This reflects how concentration is fostered through calm and joy arising from mental cultivation
