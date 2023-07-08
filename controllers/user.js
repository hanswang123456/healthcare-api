import User from "../model/user.js";
import axios from "axios";
export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

export const updateUser = async (req, res, next) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );

    res.status(200).json(updatedUser);
  } catch (err) {
    next(err);
  }
};

export const getUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("deleted User with id: " + req.params.id);
  } catch (err) {
    next(err);
  }
};

export const getHospital = async (req, res, next) => {
  try {
    const locate = await axios.get(
      "https://api.mapbox.com/geocoding/v5/mapbox.places/hospital.json?proximity=ip&access_token=pk.eyJ1IjoiaDQzd2FuZyIsImEiOiJjbGowbnZvNnEweHV1M2RxbDcwcmd6aTcwIn0.jZDHjVxj0f5m_-VokUEvyA"
    );
    res.status(200).json(locate);
  } catch (err) {
    next(err);
  }
};
