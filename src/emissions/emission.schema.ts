import { Prop, Schema, raw } from '@nestjs/mongoose';

@Schema()
export default class EmissionSchema {
    @Prop(raw({
        interval_start: { type: String },
        min: { type: String },
        max: { type: String }
    }))
    time: Record<string, string>;

    @Prop(raw({
        average: { type: Number },
        count: { type: Number },
        max: { type: Number },
        min: { type: Number },
        'standard deviation': { type: Number }
    }))
    value: Record<string, number>;
}
