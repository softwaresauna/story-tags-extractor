# Story tags extractor

## Usage

- `yarn build`
- `node out/extract-story-tags inputFilePath outputFilePath testPassingRegex`

### Arguments

`inputFilePath` - a path to a text file which contains one line per passing test with story tags in hashtag format & an indication of whether the test passed or not.

`outputFilePath` - a path to a text file which will be *appended* with a single story tag entry of the format: `currentTimeInIsoFormat #tag1 #tag2 ...`

`testPassingRegex` - a regular expression used to match lines with passing tests. When on command line, put it in quotes.

### Example

`node out/extract-story-tags ./test-results.txt ./story-tags.txt "[ ]*PASS .*"`
