import re
import sys

def process_markdown_footnotes():
    """
    Reads markdown text from stdin, identifies orphaned footnote references,
    removes them, and prints the cleaned text to stdout.
    """
    # Read the entire input text from stdin
    markdown_text = sys.stdin.read()

    # --- Step 1: Identify all existing footnote definitions ---
    # Regex to find footnote definitions:
    # ^\[\^([a-zA-Z0-9_]+)\]:
    # - ^: Matches the start of a line (due to re.M flag)
    # - \[\^: Matches the literal "[^"
    # - ([a-zA-Z0-9_]+): Captures the footnote ID (letters, numbers, underscores)
    # - \]: Matches the literal "]:"
    footnote_definition_pattern = re.compile(r'^\[\^([a-zA-Z0-9_]+)\]:', re.MULTILINE)

    # Use a set for efficient lookup of defined IDs
    defined_footnote_ids = set()
    for match in footnote_definition_pattern.finditer(markdown_text):
        defined_footnote_ids.add(match.group(1)) # Add the captured ID to the set

    # --- Step 2: Process and remove orphaned footnote references ---
    # Regex to find footnote references:
    # \[\^([a-zA-Z0-9_]+)\]
    # - \[\^: Matches the literal "[^"
    # - ([a-zA-Z0-9_]+): Captures the footnote ID
    # - \]: Matches the literal "]"
    footnote_reference_pattern = re.compile(r'\[\^([a-zA-Z0-9_]+)\]')

    def replace_orphan_reference(match):
        """
        Callback function for re.sub.
        If the reference's ID is defined, keeps the reference.
        Otherwise, removes it by returning an empty string.
        """
        reference_id = match.group(1) # The captured ID from the reference
        if reference_id in defined_footnote_ids:
            return match.group(0) # Return the original matched string (keep it)
        else:
            return "" # Return an empty string (delete the reference)

    # Apply the replacement function to all footnote references
    # This single re.sub call effectively checks and removes all orphaned references
    # in one pass, as it iterates through all matches.
    cleaned_markdown_text = footnote_reference_pattern.sub(replace_orphan_reference, markdown_text)

    # --- Step 3: Dump the modified text to stdout ---
    sys.stdout.write(cleaned_markdown_text)

if __name__ == "__main__":
    process_markdown_footnotes()