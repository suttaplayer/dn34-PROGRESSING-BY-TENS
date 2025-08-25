// file:PBT-local-causal-search.ts BEGIN

import { CausalTableSearch, CauseAndEffectJson } from "../collaboration-api/PBT-collaboration-API.ts";
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

export class LocalTestCausalTableSearch extends CausalTableSearch {
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

const searcher = new LocalTestCausalTableSearch()
const causalTableResult = searcher.search("m")
const mindmap = MindMapDiagram.create(causalTableResult["cause-&-effect-table"], "m")
console.log("quotation-sheet[2..6]", causalTableResult["quotation-sheet"].slice(2,7))
console.log("cause-&-effect-table[0..5]", causalTableResult["cause-&-effect-table"].slice(0,5))
console.log(mindmap) // see output below:

/*


quotation-sheet[2..7] [
  "(m) to (n)",
  "(n) to (m) cycle",
  "(n) to (o)",
  "(o) to (p)",
  "(p) to (q)"
]
cause-&-effect-table[0..5] [
  { cause: "m", effect: "n", "quotation-index": 2 },
  { cause: "n", effect: "m", "quotation-index": 3 },
  { cause: "n", effect: "o", "quotation-index": 4 },
  { cause: "o", effect: "p", "quotation-index": 5 },
  { cause: "p", effect: "q", "quotation-index": 6 }
]
@startmindmap
top to bottom direction
* m
  * n
    * o
      * p
        * q
          * r
            * s
              * t
                * u
                  * v
                    * w
                      * x
                        * y
                          * z
left side
  * n
  * i
    * h
      * g
        * f
          * e
            * d
              * c
                * b
                  * a
                    * 11
                    * 12
                    * 13
                    * 14
                  * 15
                  * 16
                  * 17
                  * 18
                  * 19
                  * 20
                * 21
                * 22
                * 23
                * 24
              * 25
              * 26
              * 27
              * 28
              * 29
            * 30
            * 31
            * 32
            * 33
            * 34
          * 35
          * 36
          * 37
          * 38
          * 39
        * 40
        * 41
        * 42
        * 43
        * 44
      * 45
      * 46
      * 47
      * 48
      * 49
    * 50
    * 51
    * 52
    * 53
    * 54
  * l
    * k
      * j
        * 55
        * 56
        * 57
        * 58
        * 59
      * 60
@endmindmap

*/
// file:PBT-local-causal-search.ts END