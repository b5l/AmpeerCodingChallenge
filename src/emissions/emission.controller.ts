import { Controller, Get, Post, Req } from '@nestjs/common';
import EmissionService from './emission.service';
import EmissionSchema from './emission.schema';

@Controller('emissions')
export default class EmissionController {
    constructor(
        private emissionService: EmissionService
    ) {}

    @Get()
    getEmissions(@Req() request): Promise<{ emissions: EmissionSchema[], aggregate: number | null }> {
        return this.emissionService.findAll({
            startDate: request.query.startDate,
            endDate: request.query.endDate,
            minAvg: request.query.minAvg,
            aggregate: request.query.aggregate
        });
    }

    @Post()
    async pushEmissions(@Req() request): Promise<{ message: string }> {
        await this.emissionService.pushEmissions(request.body);
        return { message: 'ok' };
    }
}