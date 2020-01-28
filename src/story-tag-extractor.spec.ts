import {extractStoryTags} from "./story-tag-extractor";

describe("extracts valid tags", () => {

    const examples: Array<[string[], string[]]> = [
        [[], []],
        [["", "", ""], []],
        [["a", "b", "c"], []],

        [["a", "b #foo", "c", "d #bar"],
            ["#foo", "#bar"]],
        [["#foo", "d #bar"],
            ["#foo", "#bar"]],
        [["#foo", "", "#bar"],
            ["#foo", "#bar"]],
        [["    #foo    ", "", "    ", "    #bar     "],
            ["#foo", "#bar"]],
        [["ab #foo #bar"],
            ["#foo", "#bar"]],
        [["#foo", "#", "# #", "##", "#a.,ds!-a2", "#bar"],
            ["#foo", "#bar"]],
        [["#foo # ## #####", "#### #a.,ds!-a2 #bar"],
            ["#foo", "#bar"]],
        [["#foo", "#foo"], ["#foo"]],
        [["#bar #foo", "#bar", "#foo #bar #bar"], ["#bar", "#foo"]],

        [["#123", "#Foo", "#FOO", "#foo123", "#123FOO"], ["#123", "#Foo", "#FOO", "#foo123", "#123FOO"]],
        [["#12.3", "#F-o-o", "#_FOO", "#foo/123", "#(123)FOO"], []],

    ];

    examples.forEach(example => it(JSON.stringify(example), () => {

        const [testResults, expectedTags] = example;

        expect(extractStoryTags(testResults, /.*/))
            .toEqual(expectedTags);
    }));
});

describe("extracts only tags of passed tests", () => {

    const testPassingRegex: RegExp = /[ ]*passed .*/;

    const examples: Array<[string, string[]]> = [

        ["#foo", []],
        ["passed #foo", ["#foo"]],
        ["passed#foo", []],
        ["Passed #foo", []],
        [" passed #foo", ["#foo"]],
        ["    passed #foo", ["#foo"]],
        ["passed    the test name #foo", ["#foo"]],
        [" passedthe test name #foo", []],
        [" passedthe test name #foo", []],
    ];

    examples.forEach(example => it(JSON.stringify(example), () => {

        const [testResult, expectedTags] = example;

        expect(extractStoryTags([testResult], testPassingRegex)).toEqual(expectedTags);
    }));
});
