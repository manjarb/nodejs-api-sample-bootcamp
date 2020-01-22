import { BootcampModel } from "../models/Bootcamp";
import { ErrorResponse } from "../utils/errorResponse";
import { asyncHandler } from "../middleware/async";
import { geocoder } from "../utils/geocoder";

// @access Public
export const getBootcamps = asyncHandler(async function(req, res, next) {
  const reqQuery = { ...req.query };

  // Fields to exclude
  const removeFields = ["select"];

  // Loop over removeFields and delete them from reqQuery
  removeFields.forEach(param => {
    delete reqQuery[param];
  });

  // Create query String
  let queryStr = JSON.stringify(reqQuery);

  // Create Operators ($gt, $gte, etc) for Mongob search
  queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`);

  // Finding Resource
  let query = BootcampModel.find(JSON.parse(queryStr));

  // Select Fields
  if (req.query.select) {
    const fields = req.query.select.split(",").join(" ");
    query = query.select(fields);
  }

  const bootcamps = await query;
  res.status(200).json({ success: true, data: bootcamps });
});

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

// @access Private
export const createBootcamp = asyncHandler(async function(req, res, next) {
  const bootcamp = await BootcampModel.create(req.body);
  res.status(200).json({ success: true, data: bootcamp });
});

// @access Private
export const updateBootcamp = asyncHandler(async function(req, res, next) {
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
});

// @access Private
export const deleteBootcamp = asyncHandler(async function(req, res, next) {
  const bootcamp = await BootcampModel.findByIdAndDelete(req.params.id);

  if (!bootcamp) {
    return next(
      new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404)
    );
  }
  res.status(200).json({ success: true, data: {} });
});

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
    location: { $geoWithin: { $centerSphere: [[lng, lat], radius] } }
  });

  res.status(200).json({
    success: true,
    count: bootcamps.length,
    data: bootcamps
  });
});
