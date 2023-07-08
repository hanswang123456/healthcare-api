import Doctor from "../model/doctor.js";

export const getDoctor = async (req, res, next) => {
  try {
    const user = await Doctor.findById(req.params.id);

    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

export const updateDoctor = async (req, res, next) => {
  try {
    const updatedDoctor = await Doctor.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );

    res.status(200).json(updatedDoctor);
  } catch (err) {
    next(err);
  }
};

export const getDoctors = async (req, res, next) => {
  try {
    const users = await Doctor.find();
    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
};

export const deleteDoctor = async (req, res, next) => {
  try {
    await Doctor.findByIdAndDelete(req.params.id);
    res.status(200).json("deleted Doctor with id: " + req.params.id);
  } catch (err) {
    next(err);
  }
};
