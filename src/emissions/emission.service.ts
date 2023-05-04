import { Model, FilterQuery } from 'mongoose';
import { Injectable } from "@nestjs/common";
import { InjectModel } from '@nestjs/mongoose';
import { EventEmitter2 } from '@nestjs/event-emitter';
import EmissionSchema from "./emission.schema";

@Injectable()
export default class EmissionService {
    constructor(
        @InjectModel(EmissionSchema.name) private emissionModel: Model<EmissionSchema>,
        private eventEmitter: EventEmitter2
    ) {}

    async findAll({
        startDate,
        endDate,
        minAvg,
        aggregate
    }: {
        startDate?: Date,
        endDate?: Date,
        minAvg?: number,
        aggregate?: string
    }) {
        const filterOptions: FilterQuery<EmissionSchema> = {
            'time.interval_start': {},
            'value.average': {}
        };

        if (startDate) filterOptions['time.interval_start'].$gte = startDate;
        if (endDate) filterOptions['time.interval_start'].$lte = endDate;
        if (minAvg) filterOptions['value.average'].$gte = minAvg;

        // I'd like to use MongoDB's own aggregation, but I don't have time to do the research.

        const emissions = await this.emissionModel.find(filterOptions).exec();
        if (!aggregate) return { emissions, aggregate: null };

        let aggregatedEmissions;
        switch (aggregate) {
            case 'sum':
                aggregatedEmissions = emissions.reduce((acc, emission) => acc += emission.value.average, 0)
                break;
            case 'avg':
                aggregatedEmissions = emissions.reduce((acc, emission) => acc += emission.value.average, 0) / emissions.length
                break;
        }

        return { emissions, aggregate: aggregatedEmissions }
    }

    async pushEmissions(emissions: EmissionSchema) {
        await this.emissionModel.create(emissions);
    
        // If websockets were implemented, the listening side of this event would be able to push the new emissions to the client.
        this.eventEmitter.emit('emission.pushed', emissions);
    }
}
