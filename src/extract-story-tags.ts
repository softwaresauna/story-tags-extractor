import * as fs from "fs";
import {parseArguments} from "./args";
import {extractStoryTags} from "./story-tag-extractor";

const args = parseArguments();

// tslint:disable-next-line:no-console
console.log("Extracting story tags with params: " + JSON.stringify(args));

const testResults = (fs.readFileSync(args.inputPath, 'utf8') as string).split("\n");

const storyTags = extractStoryTags(testResults, new RegExp(args.passingTestRegex));

if (storyTags.length === 0) {
    // tslint:disable-next-line:no-console
    console.log("No story tags found.");
    process.exit(0);
}

const storyTagsEntry = createStoryTagsEntry();

fs.writeFileSync(args.outputPath, storyTagsEntry + "\n", {flag: "a"});

function createStoryTagsEntry(): string {

    return [
        new Date().toISOString(),
        ...storyTags
    ]
        .join(" ");
}
