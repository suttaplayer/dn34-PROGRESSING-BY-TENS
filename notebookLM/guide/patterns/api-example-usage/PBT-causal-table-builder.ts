// file:PBT-local-causal-search.ts BEGIN

import { AbstractCausalTableBuilder, CauseAndEffectJson } from "../collaboration-api/PBT-collaboration-API.ts";
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

export class NotebookLMCausalTableBuilder extends AbstractCausalTableBuilder {
  /*
  purpose: transform fromExpression into a more generalised and common/frequent term if required,
          including identifying broader categories that encompass the expression or vice versa.

  eg

  "person of integrity" -> "admirable friendship"
  "restraint of the senses" -> "sense restraint"
  "three forms of right conduct" -> "right conduct"
  "mindfulness of in-&-out breathing's 'body' establishment" -> "mindfulness immersed in the body" (if used as an effect for hierarchical generalization)
  "body disposition" -> "mindfulness immersed in the body" (if contextually appropriate as a component being developed within it)

  *  **Prioritize exact matching for established terms** like "right view" and "wrong view," preventing their generalization.
  *  **Implement the specified generalizations** for descriptive phrases (e.g., "persistence aroused" to "persistence") to ensure consistency in the generated `cause` and `effect` fields of the `CauseAndEffectJson` entries.
  *  Continue to apply general abstraction and generalization principles for other terms as needed, always aiming for the **most frequent and common representation** in the sources while avoiding excessive simplification or over-specialization.
  */
  public override makeExpressionAsGeneralisedAndCommon(fromExpression: string): string {
    throw new Error("Method not implemented.");
  }  

  /*
  purpose: convert a quote with 1 or more causal relationships into a CauseAndEffectJson[] array. note unrelated entries will get dropped later

  eg.
  'Thus, when associating with people of integrity is made full, it fills [the conditions for] hearing the true Dhamma… conviction… appropriate attention… mindfulness & alertness… restraint of the senses… the three forms of right conduct… the four establishings of mindfulness… the seven factors for awakening. When the seven factors for awakening are made full, they fill [the conditions for] clear knowing & release.
  ->
  [{"cause": "admirable friendship", "effect": "hearing the true Dhamma", "quotation-index": 4},
  {"cause": "hearing the true Dhamma", "effect": "conviction", "quotation-index": 4},
  {"cause": "conviction", "effect": "appropriate attention", "quotation-index": 4},
  {"cause": "appropriate attention", "effect": "mindfulness & alertness", "quotation-index": 4},
  {"cause": "mindfulness & alertness", "effect": "sense restraint", "quotation-index": 4},
  {"cause": "sense restraint", "effect": "right conduct", "quotation-index": 4},
  {"cause": "right conduct", "effect": "four establishings of mindfulness", "quotation-index": 4},
  {"cause": "four establishings of mindfulness", "effect": "seven factors for awakening", "quotation-index": 4},
  {"cause": "seven factors for awakening", "effect": "clear knowing & release", "quotation-index": 4}]

  **Command:implement** `convertFromQuotationToCauseAndEffect` to parse the following types of relationships:
  1.  **Hierarchical/Compositional Relationships:** For statements like "X includes Y" or "Z encompasses Y," create a `CauseAndEffectJson` entry where X (or Z) is the `cause` and Y is the `effect`, with `co-arised-with: true`.
      *   Example: A statement "The four establishings of mindfulness encompasses mindfulness immersed in the body" would result in:
          `{"cause": "four establishings of mindfulness", "effect": "mindfulness immersed in the body", "co-arised-with": true, "quotation-index": [INDEX]}`
      *   Similarly, "Mindfulness immersed in the body includes contemplation of body disposition" would yield:
          `{"cause": "mindfulness immersed in the body", "effect": "contemplation of body disposition", "co-arised-with": true, "quotation-index": [INDEX]}`
    2.  **Benefits as Causal Effects:** Explicitly identify and process statements that describe positive outcomes or "benefits" as `effect`s of a practice.
        *   Example: A statement "One doesn't fault oneself; observant people, on close examination, praise one; one's good reputation gets spread about; one dies unconfused; and—on the break-up of the body, after death—one reappears in a good destination, a heavenly world" could result in multiple entries such as:
            `{"cause": "right conduct", "effect": "doesn't fault oneself", "quotation-index": [INDEX]}`
            `{"cause": "right conduct", "effect": "observant people praise one", "quotation-index": [INDEX]}`
            `{"cause": "right conduct", "effect": "good reputation gets spread about", "quotation-index": [INDEX]}`
    3.  **Prioritize exact matching for established terms** like "right view" and "wrong view," preventing their generalization.
    4.  **Implement the specified generalizations** for descriptive phrases (e.g., "persistence aroused" to "persistence") to ensure consistency in the generated `cause` and `effect` fields of the `CauseAndEffectJson` entries.
    5.  Continue to apply general abstraction and generalization principles for other terms as needed, always aiming for the **most frequent and common representation** in the sources while avoiding excessive simplification or over-specialization.
  */
  public override convertFromQuotationToCauseAndEffect(quote: string, quoteIndex: number): CauseAndEffectJson[] {
    throw new Error("Method not implemented.");
  }

  /*
  purpose: search *_nblm.txt sources ONLY for a causal or co-arising relationship quotations for the given searchTerm
      eg. searchTerm = "conviction"
      1. "Monks, as long as the monks have conviction… shame… compunction… learning… aroused persistence… established mindfulness… discernment, the monks' growth can be expected, not their decline"
      2. 'Thus, when associating with people of integrity is made full, it fills [the conditions for] hearing the true Dhamma… conviction… appropriate attention… mindfulness & alertness… restraint of the senses… the three forms of right conduct… the four establishings of mindfulness… the seven factors for awakening. When the seven factors for awakening are made full, they fill [the conditions for] clear knowing & release.
  */
  public override searchSourcesForCausalQuotations(searchTerm: string): string[] {
    throw new Error("Method not implemented.");
  }
}

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

const builder = new UnitTestCausalTableBuilder()
const causalTableResult = builder.build("m") // "m" is the subject at the centre of the catchment
const mindmap = MindMapDiagram.create(causalTableResult["cause-&-effect-table"], "m")
console.log("quotation-sheet[2..6]", causalTableResult["quotation-sheet"].slice(2,7))
console.log("cause-&-effect-table[0..5]", causalTableResult["cause-&-effect-table"].slice(0,5))
console.log(mindmap) // see output below:

/*


quotation-sheet[2..6] [
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