import { BootcampModel } from "../models/Bootcamp";
import { ErrorResponse } from "../utils/errorResponse";

// @access Public
export async function getBootcamps(req, res, next) {
  try {
    const bootcamps = await BootcampModel.find();
    res.status(200).json({ success: true, data: bootcamps });
  } catch (error) {
    next(error);
  }
}

// @access Public
export async function getBootcamp(req, res, next) {
  try {
    const bootcamp = await BootcampModel.findById(req.params.id);

    if (!bootcamp) {
      return next(
        new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404)
      );
    }

    res.status(200).json({ success: true, data: bootcamp });
  } catch (error) {
    next(error);
  }
}

// @access Private
export async function createBootcamp(req, res, next) {
  try {
    const bootcamp = await BootcampModel.create(req.body);
    res.status(200).json({ success: true, data: bootcamp });
  } catch (error) {
    next(error);
  }
}

// @access Private
export async function updateBootcamp(req, res, next) {
  try {
    const bootcamp = await BootcampModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        // For reture updated(new) data
        new: true,
        runValidators: true
      }
    );

    if (!bootcamp) {
      return next(
        new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404)
      );
    }
    res.status(200).json({ success: true, data: bootcamp });
  } catch (error) {
    next(error);
  }
}

// @access Private
export async function deleteBootcamp(req, res, next) {
  try {
    const bootcamp = await BootcampModel.findByIdAndDelete(req.params.id);

    if (!bootcamp) {
      return next(
        new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404)
      );
    }
    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    next(error);
  }
}
