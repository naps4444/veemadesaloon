// lib/models/Service.ts
import mongoose, { Schema, model, Document, Types } from "mongoose";
import { ICategory } from "./Category";

export interface IService extends Document {
  name: string;
  categoryId: Types.ObjectId | ICategory;
  subcategory?: string;
}

const serviceSchema = new Schema<IService>({
  name: { type: String, required: true },
  categoryId: { type: Schema.Types.ObjectId, ref: "Category", required: true },
  subcategory: { type: String },
});

// Export both the interface and the model
export const Service =
  mongoose.models.Service || model<IService>("Service", serviceSchema);
