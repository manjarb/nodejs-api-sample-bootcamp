import path from "path";
import { BootcampModel } from "../models/Bootcamp";
import { ErrorResponse } from "../utils/errorResponse";
import { asyncHandler } from "../middleware/async";
import { geocoder } from "../utils/geocoder";

// @desc      Get all bootcamps
// @route     GET /api/v1/bootcamps
// @access Public
export const getBootcamps = asyncHandler(async function(req, res, next) {
  res.status(200).json(res.advancedResults);
});

// @desc      Get single bootcamp
// @route     GET /api/v1/bootcamps/:id
// @access Public
export const getBootcamp = asyncHandler(async function(req, res, next) {
  const bootcamp = await BootcampModel.findById(req.params.id);

  if (!bootcamp) {
    return next(
      new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({ success: true, data: bootcamp });
});

// @desc      Create new bootcamp
// @route     POST /api/v1/bootcamps
// @access Private
export const createBootcamp = asyncHandler(async function(req, res, next) {
  // Add user to req, body
  req.body.user = req.user.id;

  // Check for published bootcamp
  const publishedBootcamp = await BootcampModel.findOne({ user: req.user.id });

  // If user not admin, they can only add one bootcamp
  if (publishedBootcamp && req.user.role !== "admin") {
    return next(
      new ErrorResponse(
        `The user with ID ${req.user.id} has already published bootcamp`,
        400
      )
    );
  }

  const bootcamp = await BootcampModel.create(req.body);
  res.status(200).json({ success: true, data: bootcamp });
});

// @desc      Update bootcamp
// @route     PUT /api/v1/bootcamps/:id
// @access Private
export const updateBootcamp = asyncHandler(async function(req, res, next) {
  let bootcamp = await BootcampModel.findById(req.params.id);

  if (!bootcamp) {
    return next(
      new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404)
    );
  }

  // Make sure user is bootcamp owner
  if (bootcamp.user.toString() !== req.user.id && req.user.role !== "admin") {
    return next(
      new ErrorResponse(
        `User ${req.params.id} is not authorized to update this bootcamp`
      )
    );
  }

  bootcamp = await BootcampModel.findOneAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({ success: true, data: bootcamp });
});

// @desc      Delete bootcamp
// @route     DELETE /api/v1/bootcamps/:id
// @access Private
export const deleteBootcamp = asyncHandler(async function(req, res, next) {
  const bootcamp = await BootcampModel.findById(req.params.id);

  if (!bootcamp) {
    return next(
      new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404)
    );
  }

  // Make sure user is bootcamp owner
  if (bootcamp.user.toString() !== req.user.id && req.user.role !== "admin") {
    return next(
      new ErrorResponse(
        `User ${req.params.id} is not authorized to delete this bootcamp`
      )
    );
  }

  bootcamp.remove();

  res.status(200).json({ success: true, data: {} });
});

// @desc      Get bootcamps within a radius
// @route     GET /api/v1/bootcamps/radius/:zipcode/:distance
// @access Private
export const getBootcampsInRadius = asyncHandler(async function(
  req,
  res,
  next
) {
  const { zipcode, distance } = req.params;

  // Get lat/lng from geocoder
  const loc = await geocoder.geocode(zipcode);
  const lat = loc[0].latitude;
  const lng = loc[0].longitude;

  // Calc radius using radians
  // Divide dist by radius of Earth
  // Earth Radius = 3,963 mi / 6,378 km
  const radius = distance / 3963;
  const bootcamps = await BootcampModel.find({
    location: { $geoWithin: { $centerSphere: [[lng, lat], radius] } },
  });

  res.status(200).json({
    success: true,
    count: bootcamps.length,
    data: bootcamps,
  });
});

// @desc      Upload photo for bootcamp
// @route     PUT /api/v1/bootcamps/:id/photo
// @access Private
export const bootcampPhotoUpload = asyncHandler(async function(req, res, next) {
  const bootcamp = await BootcampModel.findById(req.params.id);

  if (!bootcamp) {
    return next(
      new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404)
    );
  }

  // Make sure user is bootcamp owner
  if (bootcamp.user.toString() !== req.user.id && req.user.role !== "admin") {
    return next(
      new ErrorResponse(
        `User ${req.params.id} is not authorized to update this bootcamp`
      )
    );
  }

  if (!req.files) {
    return next(new ErrorResponse(`Please upload a file`, 400));
  }

  const file = req.files.file;

  // Make sure the image is a photo
  if (!file.mimetype.startsWith("image")) {
    return next(new ErrorResponse(`Please upload an image file`, 400));
  }

  // Check filesize
  if (file.size > process.env.MAX_FILE_UPLOAD) {
    return next(
      new ErrorResponse(
        `Please upload an image less than ${process.env.MAX_FILE_UPLOAD}`,
        400
      )
    );
  }

  // Create custom filename
  file.name = `photo_${bootcamp._id}${path.parse(file.name).ext}`;
  file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, async (err) => {
    if (err) {
      console.error(err);
      return next(new ErrorResponse(`Problem with file upload`, 500));
    }

    await BootcampModel.findByIdAndUpdate(req.params.id, { photo: file.name });

    res.status(200).json({
      success: true,
      data: file.name,
    });
  });
});
