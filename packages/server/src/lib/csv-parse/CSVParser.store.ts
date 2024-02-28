interface CSVPropInterface {
    target: any;
    propertyName: string;
    propertyKey: string;
}

interface CSVSchemaInterface {
    target: any;
    filePath: string;
}

export class CSVParserStoreHost {
    private schemas = new Array<CSVSchemaInterface>();
    private properties = new Array<CSVPropInterface>();

    public addProperty(metadata: CSVPropInterface) {
        this.properties.push(metadata);
    }

    public addSchema(metadata: CSVSchemaInterface) {
        this.schemas.push(metadata);
    }

    public getProperty(target: any, propertyName: string): CSVPropInterface {
        return this.properties.find(
            (property) =>
                property.target.constructor.name === target.name &&
                property.propertyName === propertyName,
        );
    }

    public getSchema(target: any): CSVSchemaInterface {
        return this.schemas.find((schema) => schema.target.name === target.name);
    }
}

const globalRef = global as any;

export const CSVParserStore: CSVParserStoreHost =
    globalRef.CSVParserStore || (globalRef.CSVParserStore = new CSVParserStoreHost());
