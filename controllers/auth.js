import User from "../model/user.js";
import Doctor from "../model/doctor.js";
import bcrypt from "bcryptjs";
import { createError } from "../routes/utils/error.js";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import axios from "axios";

export const register = async (req, res, next) => {
  try {
    // hash password with salt
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    if (req.body.specialty) {
      const newDoctor = new Doctor({ ...req.body, password: hash });
      await newDoctor.save();
      res.status(200).send("Doctor has been created.");
    } else {
      const newUser = new User({
        ...req.body,
        password: hash,
      });

      // add to db
      await newUser.save();
      res.status(200).send("User has been created.");
    }
  } catch (err) {
    next(err);
  }
};
export const login = async (req, res, next) => {
  try {
    //search for user in db
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      return next(createError(404, "User not found!"));
    }

    // compare password
    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordCorrect)
      return next(createError(400, "Wrong password or username!"));

    // set one time password
    OTP(user._id, user.email);

    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT
    );

    const { password, isAdmin, ...otherDetails } = user._doc;
    res
      .cookie("access_token", token, {
        httpOnly: true,
        secure: true,
      })
      .status(200)
      .json({ details: { ...otherDetails }, isAdmin });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

export const authenticate = async (req, res, next) => {
  //find the user again using username
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      return next(createError(404, "User not found!"));
    }

    // confirm mfa
    if (req.body.code != user.OTP || new Date() >= new Date(user.OTPEXP))
      return next(createError(405, "MFA Failed"));

    // set up JWT again
    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT
    );

    const { password, isAdmin, ...otherDetails } = user._doc;
    res
      .cookie("access_token", token, {
        httpOnly: true,
        secure: true,
      })
      .status(200)
      .json({ details: { ...otherDetails }, isAdmin });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

const OTP = async (_id, email, res) => {
  try {
    //get random code
    const CODE = Math.floor(100000 + Math.random() * 900000);
    let config = {
      service: "gmail",
      auth: {
        user: process.env.MAIL_SOURCE,
        pass: process.env.TEMP_PASSWORD,
      },
    };

    //send with nodemailer
    const transporter = nodemailer.createTransport(config);

    // set OTP
    const updatedUser = await User.findByIdAndUpdate(
      _id,
      {
        $set: {
          OTP: `${CODE}`,
          OTPEXP: `${new Date(new Date().getTime() + 5 * 60000)}`,
        },
      },
      { new: true }
    );

    const mailOptions = {
      from: process.env.MAIL_SOURCE,
      to: email,
      subject: "LOGIN VERIFICATION CODE",
      html: `<p>The CODE:${CODE} is the one time pass code!</p> <br><p>This code expires in 5 minutes!</p>`,
    };

    transporter.sendMail(mailOptions);
  } catch (err) {
    console.log(err);
  }
};

// find nearby hospitals with IP
export const getHospital = async (req, res, next) => {
  try {
    await axios
      .get(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/hospital.json?proximity=ip&access_token=${process.env.MAP_TOKEN}`
      )
      .then((response) => {
        res.send(response.data); // <= send data to the client
      });
  } catch (err) {
    next(err);
  }
};
