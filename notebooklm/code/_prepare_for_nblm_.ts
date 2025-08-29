const filenames = [
    "./api/nblm-pattern-generator.ts",
    "./api/notebooklm-API.ts",
    "./api/pattern-API.ts", 
    "./api/pbt-catalog.json",
    "./api/pbt-utils.ts",
    "./example-usage/0.scope.ts"
]
for (const filename of filenames) {
    const copyTo = filename.replace('.ts', '.ts.txt')
    Deno.copyFileSync(filename, copyTo)
}
