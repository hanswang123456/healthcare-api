import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new mongoose.Schema({
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
  age: {
    type: Number,
    required: true,
    min: 0,
    max: 117,
  },
  address: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
    requred: true,
  },
  city: {
    type: String,
    required: true,
  },
  doctors: {
    type: [{ name: String, location: String, specialty: String, id: String }],
  },
  appointment: {
    type: [{ doctor: String, location: String, time: Date }],
  },
  symptom: {
    type: String,
  },
});

export default mongoose.model("user", userSchema);
