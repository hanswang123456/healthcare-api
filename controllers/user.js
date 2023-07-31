// get user model
import User from "../model/user.js";

export const getUser = async (req, res, next) => {
  try {
    // find with ID
    const user = await User.findById(req.params.id);

    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

export const updateUser = async (req, res, next) => {
  try {
    // dynamic change with request params
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
    // get all
    const allusers = await User.find();
    res.status(200).json(allusers);
  } catch (err) {
    next(err);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    // remove by id
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("deleted User with id: " + req.params.id);
  } catch (err) {
    next(err);
  }
};
