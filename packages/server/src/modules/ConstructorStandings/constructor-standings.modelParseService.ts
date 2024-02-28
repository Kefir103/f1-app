import { InjectModel } from '@nestjs/mongoose';
import { ConstructorStandings } from '~schemas/ConstructorStandings/ConstructorStandings.schema';
import { Model } from 'mongoose';
import { ICSVParseModelParseService } from '~lib/csv-parse/CSVParse.modelParseService';
import { CSVParser } from '~lib/csv-parse/CSVParser';

export class ConstructorStandingsModelParseService implements ICSVParseModelParseService {
    constructor(
        @InjectModel(ConstructorStandings.name) private constructorStandingsModel: Model<any>,
    ) {}

    public async insertFromCsv(): Promise<ConstructorStandings[]> {
        try {
            await this.constructorStandingsModel.collection?.drop();

            return await this.constructorStandingsModel.insertMany(
                await new CSVParser().parse(ConstructorStandings),
            );
        } catch (error) {
            console.log(`Failed to parse ${ConstructorStandings.name}: `, error.message);

            return [];
        }
    }
}
