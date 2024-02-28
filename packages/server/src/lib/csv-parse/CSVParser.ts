import * as fs from 'node:fs';
import 'reflect-metadata';
import { finished } from 'node:stream/promises';

import { Parser } from 'csv-parse';
import { parse } from 'csv-parse';

import { CSVParserStore } from '~lib/csv-parse/CSVParser.store';

const NULL_VALUE_FLAG = '\\N';

export class CSVParser {
    public async parse(model: any): Promise<object[]> {
        let parsedModels: Array<{}> = [];

        const parser = fs
            .createReadStream(CSVParserStore.getSchema(model).filePath, { encoding: 'utf-8' })
            .pipe(
                parse({
                    delimiter: ',',
                    columns: true,
                }),
            );

        parser.on('readable', () => {
            parsedModels.push(...this.onRead(parser, model));
        });

        parser.on('error', this.onError);

        await finished(parser);

        return parsedModels;
    }

    private onRead(parser: Parser, model: any): object[] {
        const parsedModels = [];
        let currentData = [];

        while ((currentData = parser.read()) !== null) {
            const record = {};

            Object.entries(currentData).forEach(([column, value]) => {
                const propKey = CSVParserStore.getProperty(model, column)?.propertyKey || null;

                if (propKey === null) {
                    return;
                }

                record[propKey] = this.getTypedValue(model, propKey, value);
            });

            if (Object.keys(record).length) {
                parsedModels.push(record);
            }
        }

        return parsedModels;
    }

    private onError(error: Error) {
        console.error(error.message);
    }

    private getTypedValue(model: any, propKey: string, value: string) {
        const typeFunction = Reflect.getMetadata('design:type', model.prototype, propKey);

        try {
            if (value === NULL_VALUE_FLAG) {
                return null;
            }

            if (typeFunction.name === 'Date') {
                return new typeFunction(value);
            }

            return typeFunction(value);
        } catch {
            return value;
        }
    }
}
