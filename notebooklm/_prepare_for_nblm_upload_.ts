const filenames = [
    "./manual/generation-API.ts",
    "./manual/generation-instructions-config.json",
    "./manual/json-pattern-generation-instructions.ts",
    "./manual/json-scope-generation-instructions.ts",
    "./manual/pattern-API.ts",
    "./manual/pbt-catalog.json",
    "./manual/pbt-utils.ts",
]
for (const filename of filenames) {
    if (!filename)
            continue
    const copyTo = filename.replace('.ts', '.ts.txt').replace('.json', '.json.txt').replace('./manual', './upload')
    Deno.copyFileSync(filename, copyTo)
}
