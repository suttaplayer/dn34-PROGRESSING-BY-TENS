const filenames = [
    "./code/api/nblm-pattern-generator.ts",
    "./code/api/notebooklm-API.ts",
    "./code/api/pattern-API.ts", 
    "./code/api/pbt-catalog.json",
    "./code/api/pbt-utils.ts",
    "./code/example-usage/0.scope.ts"
]
for (const filename of filenames) {
    const copyTo = filename.replace('.ts', '.ts.txt').replace('.json', '.json.txt').replace('./code/api', './upload').replace('./code/example-usage', './upload')
    Deno.copyFileSync(filename, copyTo)
}
