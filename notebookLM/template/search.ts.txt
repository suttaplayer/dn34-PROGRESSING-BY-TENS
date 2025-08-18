/**
 * @file A Deno script to search for a pattern title in the configuration file.
 */

/**
 * Defines the structure of the pattern configuration JSON file.
 * This is expanded to the full structure to allow for direct property access.
 */
interface PatternConfig {
  "index-keys": string[];
  "catagory-keys": string[];
  "catagory-breadcrumb-labels": string[];
  "pattern-names": {
    [categoryKey: string]: string[];
  };
  "answer-excerpts": {
    [categoryKey: string]: string[];
  };
}

/**
 * Defines the structure for a successful search result.
 */
interface SearchReference {
  categoryKey: string;
  index: number;
}

/**
 * A handler class to load, parse, and interact with the pattern configuration JSON file.
 * This class loads the configuration once and provides methods to access its data,
 * improving efficiency for multiple operations.
 */
export class PatternConfigHandler {
  private config: PatternConfig | null = null;
  public readonly configPath: string;

  /**
   * @param configPath The absolute path to the JSON config file.
   */
  constructor(configPath: string) {
    this.configPath = configPath;
  }

  /**
   * Asynchronously loads and parses the JSON configuration file.
   * This method must be called and awaited before other methods can be used.
   */
  public async load(): Promise<void> {
    try {
      const fileContent = await Deno.readTextFile(this.configPath);
      this.config = JSON.parse(fileContent);
    } catch (error) {
      console.error(`Error loading or parsing file at ${this.configPath}:`, error);
      this.config = null;
    }
  }

  /**
   * Provides direct access to the loaded JSON configuration object.
   * Returns null if the configuration has not been loaded successfully.
   */
  public get data(): PatternConfig | null {
    if (!this.config) {
      console.error("Configuration not loaded. Call load() before accessing data.");
    }
    return this.config;
  }

  /**
   * Searches for a specific title within the "answer-excerpts" of the loaded config.
   *
   * @param title The exact title string to search for.
   * @returns A SearchReference object containing the category and index if found, otherwise null.
   */
  public searchAnswerExcerpts(title: string): SearchReference | null {
    if (!this.config) {
      console.error("Configuration not loaded. Call load() before searching.");
      return null;
    }

    const answerExcerpts = this.config["answer-excerpts"];

    // Iterate over each category (e.g., "helpful", "developed")
    for (const categoryKey in answerExcerpts) {
      const excerptsArray = answerExcerpts[categoryKey];
      // Find the index of the title in the current category's array
      const index = excerptsArray.findIndex((excerpt) => excerpt === title);

      if (index !== -1) {
        // If found, return the result object
        return { categoryKey, index };
      }
    }

    // If the loop completes without finding the title
    return null;
  }
}

// --- Example Usage ---
if (import.meta.main) {
  const configFilePath =
    "/home/ash/prj/dn34-PROGRESSING-BY-TENS/notebookLM/template/DN34-param-pattern-request-config.json";

  // 1. Create an instance of the handler
  const patternCfg = new PatternConfigHandler(configFilePath);

  // 2. Load the configuration data
  await patternCfg.load();

  // 3. Use the search method
  const searchResult = patternCfg.searchAnswerExcerpts("Four nutriments");
  console.log("Search Result:", searchResult); // Expected output: { categoryKey: "comprehended", index: 3 }

  // 4. Example of direct property access
  if (patternCfg.data) {
    const patternName = patternCfg.data["pattern-names"]["comprehended"][3];
    console.log("Direct Access Example - Pattern Name:", patternName); // Expected: "Nutriments"
  }
}