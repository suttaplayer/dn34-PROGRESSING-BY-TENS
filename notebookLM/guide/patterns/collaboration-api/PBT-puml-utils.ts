import { CauseAndEffectJson } from "./PBT-collaboration-API.ts";

class MindMapNode {
    public name: string;
    public children: Set<MindMapNode>;
    public parents: Set<MindMapNode|null>;

    constructor(name: string, parent: MindMapNode | null = null) {
        this.name = name
        this.children = new Set()
        this.parents = new Set()
        this.addParent(parent) 
    }

    public addParent(parent: MindMapNode| null = null) {
        this.parents.add(parent)
        if (parent) 
            parent.children.add(this)
        else 
            this.children.delete(this)
    }

    public dump(store: string[], forward: boolean, level: number = 0, visitedSet: Set<MindMapNode>|null = null) {
        if (!visitedSet)
            visitedSet = new Set()
        if (visitedSet.has(this))
            return
        const display = `* ${this.name}`
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

export class MindMapDiagram {
    private getOrCreateNode(name: string, nodeMap: Map<string, MindMapNode>): MindMapNode {
        let node = nodeMap.get(name);
        if (!node) {
            node = new MindMapNode(name);
            nodeMap.set(name, node);
        }
        return node;
    }

    public build(src: CauseAndEffectJson[], root: string): MindMapNode {
        const nodeMap = new Map<string, MindMapNode>();
        const rootNode = this.getOrCreateNode(root, nodeMap);
        for (const causeAndEffect of src) {
            const parentNode = this.getOrCreateNode(causeAndEffect.cause, nodeMap);
            const childNode = this.getOrCreateNode(causeAndEffect.effect, nodeMap);
            childNode.addParent(parentNode);
        }
        return rootNode;
    }

    public static create(src: CauseAndEffectJson[], root: string): string {
        const diagram = new MindMapDiagram();
        const causeTree = diagram.build(src, root);
        const buffer: string[] = ["@startmindmap", "top to bottom direction"]
        causeTree.dump(buffer, true);
        buffer.push('left side')
        causeTree.dump(buffer, false);
        buffer.push("@endmindmap")
        return buffer.join("\n")
    }
}

/* MindMapDiagram example usage

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

function main() {
    console.log("Cause Tree:");
    const string = MindMapDiagram.create(testJson, "m");
    console.log(string)
}

main();

*/