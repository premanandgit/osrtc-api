import mongoose, { Schema, Document, Types } from 'mongoose';

export enum ledTypes {
    Aargee = "aargee",
    Sumith = "sumith",
    Microcraft = "microcraft",
    Masstrans = "masstrans"
}

export interface BusDocument extends Document {
    registrationNumber: string;
    routeNo: string;
    ledType: ledTypes;
    depot: Types.ObjectId; // Use Types.ObjectId from mongoose directly
}

const busSchema: Schema = new Schema({
    registrationNumber: {
        type: String,
        required: true,
        unique: true,
    },
    routeNo: {
        type: String,
        required: true,
    },
    ledType: {
        type: String,
        enum: Object.values(ledTypes),
    },
    depot: {
        type: Types.ObjectId, // Use Types.ObjectId from mongoose directly
        ref: 'Depot',
        required: true,
    },
});

export default mongoose.model<BusDocument>('Bus', busSchema);
