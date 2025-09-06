const filenames = [
"json-notebooklm-command-resolver.ts",
"json-pattern-generation-instructions.ts",
"json-problem-generation-instructions.ts",
"json-running-example-command-resolver.ts",
"json-scope-generation-instructions.ts",
"pattern-API.ts",
"pattern-generation-API.ts",
"pattern-generation-instructions-config.json",
"pbt-catalog.json",
"pbt-utils.ts",
]
for (const filename of filenames) {
    if (!filename)
            continue
    const copyFrom = `./manual/${filename}`
    const copyTo = `./upload/${filename.replace('.ts', '.ts.txt').replace('.json', '.json.txt')}`
    Deno.copyFileSync(copyFrom, copyTo)
}
