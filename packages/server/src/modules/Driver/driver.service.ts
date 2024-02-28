import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';

import { Driver } from '~schemas/Driver/Driver.schema';

@Injectable()
export class DriverService {
    constructor(@InjectModel(Driver.name) private driverModel: Model<Driver>) {}

    public async getAll(page: number, perPage: number) {
        const drivers = await this.driverModel
            .find()
            .populate(['winsCount', 'polesCount'])
            .skip((page - 1) * perPage)
            .limit(perPage)
            .exec();

        const count = await this.getCount();

        return {
            count: count,
            data: drivers,
        };
    }

    public async get(id: string) {
        return await this.driverModel.findById(id).populate(['winsCount', 'polesCount']).exec();
    }

    public async getCount() {
        return await this.driverModel.countDocuments().exec();
    }
}
