import mongoose from "mongoose";

const { Schema } = mongoose;

const doctorSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  specialty: {
    type: String,
    required: true,
  },
  hospital: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  availability: {
    type: [{ time: String }],
  },
  booked: {
    type: [{ time: String, patient: String, patient_id: String }],
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    requred: true,
  },
});

export default mongoose.model("doctor", doctorSchema);
