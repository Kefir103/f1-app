import 'reflect-metadata';
import { CSVParserStore } from '~lib/csv-parse/CSVParser.store';

export function CSVProp(propertyName: string) {
    return function (target: any, propertyKey: string) {
        CSVParserStore.addProperty({
            target: target,
            propertyName: propertyName,
            propertyKey: propertyKey,
        });
    };
}
