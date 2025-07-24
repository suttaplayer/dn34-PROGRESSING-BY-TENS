# text = """
# * Practitioners become **peaceful in their faculties and hearts**, leading to peaceful bodily, verbal, and mental actions [AN_nblm.txt, 5].
# * They lead to the **abandoning of passion, aversion, and delusion**, preventing one from doing anything unskillful or evil [AN_nblm.txt, 37, 38][MN_nblm.txt, 353].
# * Discernment is developed, and ignorance is abandoned [AN_nblm.txt, 3].
# * They help in **remaining uninjured and unimpaired**, being blameless, and generating much merit [AN_nblm.txt, 6].
# * The holy life lived with training, discernment, release, and mindfulness results in **gnosis** right here and now, or non-return [AN_nblm.txt, 63, 64, 65, 66][KN_Iti_nblm.txt, 311].
# * Here's the long one: [AN_nblm.txt, 9, 11, 12, 91, 92, 96, 97, 98, 99, 100, 105, 115, 116, 131, 137, 140, 141, 149, 152, 153, 177, 178, 179, 180].
# """
import re
import sys

def convert_citations_to_footnotes(match):
    """
    This function processes a single matched citation block
    and converts it into multiple markdown footnote references.
    """
    # Group 1: The book prefix (e.g., "AN", "KN_Iti", "MN")
    book_prefix = match.group(1)
    # Group 2: The numbers string (e.g., "5", "37, 38", "9, 11, ..., 180")
    numbers_str = match.group(2)

    # Split the numbers string by comma and strip any whitespace
    numbers = [num.strip() for num in numbers_str.split(',')]

    # Generate the footnote for each number
    footnotes = []
    for num in numbers:
        # Create a unique footnote identifier like ^AN_5 or ^KN_Iti_310
        footnotes.append(f"[^{book_prefix}_{num}]")

    # Join all generated footnotes for this block
    return "".join(footnotes)

# The main regex to find all citation blocks.
# The core change is in how the numbers are captured.
citation_pattern = re.compile(
    r'\[([A-Za-z_]+_nblm)\.txt,\s*(\d+(?:,\s*\d+)*)\]'
)

# Read all input from stdin
text = sys.stdin.read()

# Use re.sub() with a function to process each match
converted_text = citation_pattern.sub(convert_citations_to_footnotes, text)

# Write the converted text to stdout
sys.stdout.write(converted_text)