const filenames = ["./PBT-causal-table-builder.ts"]
for (const filename of filenames) {
    const copyTo = filename.replace('.ts', '.ts.txt')
    Deno.copyFileSync(filename, copyTo)
}
