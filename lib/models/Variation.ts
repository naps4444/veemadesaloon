// lib/models/Variation.ts
import mongoose, { Schema, model, Document, Types } from "mongoose";
import { IService } from "./Service";

export interface IVariation extends Document {
  name: string;
  price: number;
  serviceId: Types.ObjectId | IService;
}

const variationSchema = new Schema<IVariation>({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  serviceId: { type: Schema.Types.ObjectId, ref: "Service", required: true },
});

export const Variation =
  mongoose.models.Variation || model<IVariation>("Variation", variationSchema);
