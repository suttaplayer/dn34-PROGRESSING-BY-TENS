# Help > Activity Diagrams

## Purpose

* To illustrate:
    1. Classifications and their respective
    2. Relationships


## Syntax & Semantics

1. Class
===
A classifier that represents a concept illustrated as a rectangle. This rectangle may have zero or more compartments which are seperated by a solid line divider. The compartments can be used to provide details of attributes, methods or any other features. (eg. Mother, Father, Child, Car, Wheel, Hand, Finger, etc)


2. Relationship
===

    1. Association (ie. is related to)
===
    The most basic relationship to imply that two classifiers are related is illustrated with a solid line between them. Associations may be given a name which is typically found near the centre of the line. At each end of an association the modeler may chose to indicate the rolename, the multiplicity and/or a directional arrow at that end. If no arrow head is illustrated on an association, then it implies a bi-directional relationship. Finally, associations may also include a constraint annotation expressed in {} brackets which serves to limit to scope of the association. (eg. A Person has an Email-Address & An Email-Address is associated to a Person) 


    2. Aggregation (ie. has)
===
    Aggregation denotes the weaker form of the whole/part relationship between two classifiers and is illustrated as an open diamond on an association end. It's weaker because it implies that the parts may survive the destruction of the whole or be transferred to a different whole entity. (eg. A Car has 4 Wheels; A Car may also carry a space Wheel; note, both active Wheels and spare Wheels can be moved to other cars)


    3. Composition (ie. embodies)
===
    Composition denotes the stronger form of the whole/part relationship between two classifiers and is illustrated as a solid diamond on an association end. It's stronger because it implies that the parts will **not** survive the destruction of the whole, nor can they be transferred to other whole entities. (eg. A Hand embodies five Fingers; the Hand cannot be dismembered and the Fingers cannot be attached to another Hand)


    4. Generalisation (ie. inheritance/is a kind of)
===
    Generalisation is a convenience feature that enables abstract classifiers to establish relationships and features which can then be specialised in sub-classifications. Generalisations are illustrated with an open triangle on the association end of the relationship at the generalised classification. The sub-classifications inheret all those qualities from the generalised classifier. Hence, those rules and relationships all equally apply to the subclasses. (eg. A Car is a kind of Vehicle; A Motorbike is a kind of Vehicle; Road rules apply to Vehicles; All Vehciles have a VIN and a registration number; Which means that Road rules apply to both Cars & Motorbikes, both of which also have a VIN and registration-number.)


    5. Classified association (ie. born out of an association)
===
    Classified associations denote a classifier that arises or is born out of a relationship between two other classifiers. It too is a convenience feature which serves to reduce the complexity of diagrams. The classified association is illustrated as a dashed line from the child classifier to the association between it's parent classifiers. (eg. biological Child is born out of the relatioship between Mother and Father; thus adopted Child is not valid in this context)


## Examples

<embed src="./multi-concept-example.drawio.svg" type="image/svg+xml" width="804" height="603" alt="Example class diagram">




