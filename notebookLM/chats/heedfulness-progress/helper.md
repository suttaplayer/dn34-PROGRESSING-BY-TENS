remove citations in notebooklm markdown generation use:
    \s*\[.*?.txt\]

plantuml url linking (https://plantuml.com/link)
Example: [[http://plantuml.com{Optional tooltip} This label is printed]]
    markdown workaround regex: 
        find: \/(.*?)\/\((.*?)\)
        repl: [[$2 $1]]