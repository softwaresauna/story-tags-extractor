
export function extractStoryTags(results: string[], testPassingRegex: RegExp): string[] {
  return extractTags(
    results
      .filter(result => result.match(testPassingRegex) !== null)
  );
}

function extractTags(testNames: string[]): string[] {

  return testNames.reduce(
    (distinctTags, testName) =>
      distinctlyConcatenateArrays(distinctTags, extractValidTags(testName)),
    []
  );
}

function distinctlyConcatenateArrays(target: string[], source: string[]): string[] {
  return [
    ...target,
    ...(source
  // @ts-ignore
      .filter(tag => !target.includes(tag)))
  ];
}

function extractValidTags(testName: string): string[] {
  return testName.split(" ")
    .filter(tag => tag.startsWith("#"))
    .filter(isValidTag);
}

function isValidTag(tag: string): boolean {
  return (tag + " ").match(/#[a-zA-Z0-9]+[ ]+/) !== null;
}
