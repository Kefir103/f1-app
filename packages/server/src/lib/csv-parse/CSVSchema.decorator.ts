import { CSVParserStore } from '~lib/csv-parse/CSVParser.store';

export function CSVSchema(filePath: string) {
    return function (target: any) {
        CSVParserStore.addSchema({
            target: target,
            filePath: filePath,
        });
    };
}
