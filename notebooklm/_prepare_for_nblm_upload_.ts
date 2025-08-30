const filenames = [
    "./code/api/nblm-pattern-generator.ts",
    "./code/api/notebooklm-API.ts",
    "./code/api/pattern-API.ts", 
    "./code/api/pbt-catalog.json",
    "./code/api/pbt-utils.ts",
    "./code/example-usage/0.scope.ts",

    "./spec/json-pattern-generation-instruction-manual.md",
    "./spec/json-0-scope-generation-instruction-manual.md"
]
for (const filename of filenames) {
    const copyTo = filename.replace('.ts', '.ts.txt').replace('.json', '.json.txt').replace('./code/api', './upload').replace('./code/example-usage', './upload').replace('./spec', './upload')
    Deno.copyFileSync(filename, copyTo)
}
