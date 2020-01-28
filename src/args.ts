export interface Args {
    readonly inputPath: string;
    readonly outputPath: string;
    readonly passingTestRegex: string;
}

export function parseArguments(): Args {

    if (process.argv.length !== 5) {
        // tslint:disable-next-line:no-console
        console.log(`Required arguments:
  1) path of source file (1 line per test result)
  2) path of output file (will be appended)
  3) regular expression to determine passing test
`);
        process.exit(1);
    }

    return {
        inputPath: process.argv[2],
        outputPath: process.argv[3],
        passingTestRegex: process.argv[4],
    };
}
