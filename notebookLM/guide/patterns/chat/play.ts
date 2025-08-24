import { CauseAndEffectJson } from "../PBT-collaboration-API.ts";
import { createPuml } from "../PBT-puml-mindmap.ts";

const fake_quotations = `(a) to (b)
(b) to (c)
(c) to (d)
(d) to (e)
(e) to (f)
(f) to (g)
(g) to (h)
(h) to (i)
(i) to (j)
(i) to (m) cycle
(j) to (k)
(k) to (l)
(l) to (m)
(m) to (n)
(n) to (m) cycle
(n) to (o)
(o) to (p)
(p) to (q)
(q) to (r)
(r) to (s)
(s) to (t)
(t) to (u)
(u) to (v)
(v) to (w)
(w) to (x)
(x) to (y)
(y) to (z)
(1) to (2)
(2) to (3)
(3) to (4)
(4) to (5)
(5) to (6)
(6) to (7)
(7) to (8)
(8) to (9)
(9) to (10)
(11) to (a)
(12) to (a)
(13) to (a)
(14) to (a)
(15) to (b)
(16) to (b)
(17) to (b)
(18) to (b)
(19) to (b)
(20) to (b)
(21) to (c)
(22) to (c)
(23) to (c)
(24) to (c)
(25) to (d)
(26) to (d)
(27) to (d)
(28) to (d)
(29) to (d)
(30) to (e)
(31) to (e)
(32) to (e)
(33) to (e)
(34) to (e)
(35) to (f)
(36) to (f)
(37) to (f)
(38) to (f)
(39) to (f)
(40) to (g)
(41) to (g)
(42) to (g)
(43) to (g)
(44) to (g)
(45) to (h)
(46) to (h)
(47) to (h)
(48) to (h)
(49) to (h)
(50) to (i)
(51) to (i)
(52) to (i)
(53) to (i)
(54) to (i)
(55) to (j)
(56) to (j)
(57) to (j)
(58) to (j)
(59) to (j)
(60) to (k)`.split("\n");

function getAsMoreGeneralisedAndFrequentlyUsedTerm(fromTerm: string): string {
    const toTerm = fromTerm // stub
    return toTerm
}

function parseQuotationsAsCauseAndEffects(quote: string, quoteIndex: number): CauseAndEffectJson[] {
    const ret: CauseAndEffectJson[] = []
    const regEx = /\((.*?)\) to \((.*?)\)/gm
    let m: RegExpExecArray | null;
    while ((m = regEx.exec(quote)) !== null) {
        if (m.index === regEx.lastIndex) 
            regEx.lastIndex++;
        const causeAndEffect: CauseAndEffectJson = {
            "cause": getAsMoreGeneralisedAndFrequentlyUsedTerm(m[1]),
            "effect": getAsMoreGeneralisedAndFrequentlyUsedTerm(m[2]),
            "quotation-index": quoteIndex
        }
        ret.push(causeAndEffect)
    }
    return ret
}

function searchNotebookLmSources(searchTerm: string): string[] {
    const ret: string[] = []
    for (const quote of fake_quotations) {
        if (quote.includes(`(${searchTerm})`)) 
            ret.push(quote)
    }
    return ret
}

function isCyclicReference(cycleStore: Set<string>, toCheck: CauseAndEffectJson): boolean {
    const ref = `${toCheck.cause}->${toCheck.effect}`
    if (cycleStore.has(ref)) 
        return true
    cycleStore.add(ref)
    return false 
}

function searchRecursively(searchTerm: string, store: CauseAndEffectJson[], forward: boolean, level: number, cycleStore: Set<string>, maxDepth = 12) {
    if (level > maxDepth) 
        return;
    const quotationMatches = searchNotebookLmSources(searchTerm);
    for (let i = 0; i < quotationMatches.length; i++) {
        const quote = quotationMatches[i]
        const causeAndEffects = parseQuotationsAsCauseAndEffects(quote, i);
        for (const causeAndEffect of causeAndEffects) {
            if ((forward && causeAndEffect.cause === searchTerm) || (!forward && causeAndEffect.effect === searchTerm)) {
                if (!isCyclicReference(cycleStore, causeAndEffect)) {
                    store.push(causeAndEffect);
                    const nextTerm = forward ? causeAndEffect.effect : causeAndEffect.cause;
                    searchRecursively(nextTerm, store, forward, level + 1, cycleStore, maxDepth);
                }
            }
        }
    }
}


function main() {
    const store = [] as CauseAndEffectJson[];
    const cycleStore = new Set<string>()
    for (const direction of [true, false]) { // true = forward, false = backward
        searchRecursively(`m`, store, direction, 1, cycleStore, 50);
    }
    // console.log(JSON.stringify(store, null, 2));
    // console.log(cycleStore)
    const test = createPuml(store, "m")
    console.log(test)
}

main()
