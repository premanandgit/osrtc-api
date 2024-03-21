import mongoose, { Schema, Document } from 'mongoose';

export interface DepotDocument extends Document {
  name: string;
  location: string;
}

const depotSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  location: {
    type: String,
    required: true,
  },
});

export default mongoose.model<DepotDocument>('Depot', depotSchema);
