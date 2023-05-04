import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import EmissionSchema from './emission.schema';
import EmissionController from './emission.controller';

@Module({
  imports: [MongooseModule.forFeature([{
    name: EmissionSchema.name,
    schema: EmissionSchema
}])],
  controllers: [EmissionController],
  providers: [],
})
export class AppModule {}
