import { AbstractCausalTableBuilder, CauseAndEffectJson, patternResponseJson } from "../collaboration-api/PBT-collaboration-API.ts";
import { MindMapDiagram } from "../collaboration-api/PBT-puml-utils.ts";

const fake_causal_quotations = `(a) to (b)
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
(AA) to (BB)
(ZZ) to (AA)
(54) to (i)
(55) to (j)
(56) to (j)
(57) to (j)
(58) to (j)
(59) to (j)
(60) to (k)`.split("\n");


export class UnitTestCausalTableBuilder extends AbstractCausalTableBuilder {
  public override makeExpressionAsGeneralisedAndCommon(fromExpression: string): string {
    const toTerm = fromExpression // stub
    return toTerm
  }
  
  public override convertFromQuotationToCauseAndEffect(quote: string, quoteIndex: number): CauseAndEffectJson[] {
    const ret: CauseAndEffectJson[] = []
    const regEx = /\((.*?)\) to \((.*?)\)/gm
    let m: RegExpExecArray | null;
    while ((m = regEx.exec(quote)) !== null) {
        if (m.index === regEx.lastIndex) 
            regEx.lastIndex++;
        const causeAndEffect: CauseAndEffectJson = {
            "cause": this.makeExpressionAsGeneralisedAndCommon(m[1]),
            "effect": this.makeExpressionAsGeneralisedAndCommon(m[2]),
            "quotation-index": quoteIndex
        }
        ret.push(causeAndEffect)
    }
    return ret
  }

  public override searchSourcesForCausalQuotations(searchTerm: string): string[] {
    const ret: string[] = []
    for (const quote of fake_causal_quotations) {
        if (quote.includes(`(${searchTerm})`)) 
            ret.push(quote)
    }
    return ret
  }
}



function main() {
    const builder = new UnitTestCausalTableBuilder()
    for (const subject of patternResponseJson.scope.subject) {
        builder.build(subject["name"])
    }
    const causalTableResult = builder.results
    console.log("quotation-sheet", causalTableResult["quotation-sheet"]) 
    console.log("cause-&-effect-table[", causalTableResult["cause-&-effect-table"])
    patternResponseJson["building-blocks"]["Causal-Table"] = causalTableResult["cause-&-effect-table"]
    patternResponseJson["quotations"]["Causal-Table"] = causalTableResult["quotation-sheet"]
}

main()
