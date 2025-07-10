import mongoose, { Schema, Document, models, model } from 'mongoose';

interface Service {
  id: string;
  name: string;
  price: number;
}

export interface IBooking extends Document {
  name: string;
  email: string;
  phone: string;
  services: Service[];
  reference: string;
  total: number;
  date: Date;
  timeSlot: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  createdAt: Date;
  updatedAt: Date;
}

const BookingSchema = new Schema<IBooking>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    services: [
      {
        id: { type: String, required: true },
        name: { type: String, required: true },
        price: { type: Number, required: true },
      },
    ],
    reference: { type: String, required: true },
    total: { type: Number, required: true },
    date: { type: Date, required: true },
    timeSlot: { type: String, required: true },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'cancelled'],
      default: 'pending',
    },
  },
  {
    timestamps: true,
  }
);

export default models.Booking || model<IBooking>('Booking', BookingSchema);
