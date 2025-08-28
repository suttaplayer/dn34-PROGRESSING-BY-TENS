const filenames = ["./PBT-collaboration-API.ts", "./PBT-puml-utils.ts"]
for (const filename of filenames) {
    const copyTo = filename.replace('.ts', '.ts.txt')
    Deno.copyFileSync(filename, copyTo)
}
