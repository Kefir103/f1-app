import { Controller, Get } from '@nestjs/common';
import { CsvService } from '~modules/CSV/csv.service';

@Controller('csv')
export class CsvController {
    constructor(private csvService: CsvService) {}
    @Get('fetch')
    async fetchDataFromCsv() {
        await this.csvService.parseCsv();
    }
}
