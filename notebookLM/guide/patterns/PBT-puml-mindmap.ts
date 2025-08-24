import { CauseAndEffectJson } from "./PBT-collaboration-API.ts";

class Node {
    public name: string;
    public children: Set<Node>;
    public parents: Set<Node|null>;

    constructor(name: string, parent: Node | null = null) {
        this.name = name
        this.children = new Set()
        this.parents = new Set()
        this.addParent(parent) 
    }

    public addParent(parent: Node| null = null) {
        this.parents.add(parent)
        if (parent) {
            parent.children.add(this)
        } else {
            this.children.delete(this)
        }
    }

    public dump(store: string[], forward: boolean, level: number = 0, visitedSet: Set<Node>|null = null) {
        if (!visitedSet)
            visitedSet = new Set()
        if (visitedSet.has(this))
            return
        const display = `* ${this.name}`
        // console.log(display.padStart(level * 2 + display.length))
        if (forward || !forward && level !== 0)
            store.push(display.padStart(level * 2 + display.length))
        visitedSet.add(this)
        const targetSet = forward ? this.children : this.parents
        for (const child of targetSet) {
            if (child)
                child.dump(store, forward, level + 1, visitedSet)
        }
    }
}

function getOrCreateNode(name: string, nodeMap: Map<string, Node>): Node {
    let node = nodeMap.get(name);
    if (!node) {
        node = new Node(name);
        nodeMap.set(name, node);
    }
    return node;
}


function buildCauseTree(src: CauseAndEffectJson[], root: string): Node {
    const nodeMap = new Map<string, Node>();
    const rootNode = getOrCreateNode(root, nodeMap);
    for (const causeAndEffect of src) {
        const parentNode = getOrCreateNode(causeAndEffect.cause, nodeMap);
        const childNode = getOrCreateNode(causeAndEffect.effect, nodeMap);
        childNode.addParent(parentNode);
    }

    return rootNode;
}

export function createPuml(src: CauseAndEffectJson[], root: string): string {
    const causeTree = buildCauseTree(src, root);
    const buffer: string[] = ["@startmindmap", "top to bottom direction"]
    causeTree.dump(buffer, true);
    buffer.push('left side')
    causeTree.dump(buffer, false);
    buffer.push("@endmindmap")
    return buffer.join("\n")
}

const testJson: CauseAndEffectJson[] = JSON.parse(`[
        {
            "cause": "m",
            "effect": "n",
            "quotation-index": 1
        },
        {
            "cause": "n",
            "effect": "m",
            "quotation-index": 1
        },
        {
            "cause": "n",
            "effect": "o",
            "quotation-index": 2
        },
        {
            "cause": "o",
            "effect": "p",
            "quotation-index": 1
        },
        {
            "cause": "p",
            "effect": "q",
            "quotation-index": 1
        },
        {
            "cause": "q",
            "effect": "r",
            "quotation-index": 1
        },
        {
            "cause": "l",
            "effect": "m",
            "quotation-index": 0
        },
        {
            "cause": "k",
            "effect": "l",
            "quotation-index": 0
        },
        {
            "cause": "j",
            "effect": "k",
            "quotation-index": 0
        },
        {
            "cause": "58",
            "effect": "j",
            "quotation-index": 1
        },
        {
            "cause": "59",
            "effect": "j",
            "quotation-index": 2
        },
        {
            "cause": "60",
            "effect": "k",
            "quotation-index": 2
        }]`);

// function main() {
//     console.log("Cause Tree:");
//     const string = createPuml(testJson, "m");
//     console.log(string)
// }

// main();
