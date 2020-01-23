import { CourseModel } from "../models/Course";
import { ErrorResponse } from "../utils/errorResponse";
import { asyncHandler } from "../middleware/async";
import { BootcampModel } from "../models/Bootcamp";

// @desc      Get courses
// @route     GET /api/v1/courses
// @route     GET /api/v1/bootcamps/:bootcampId/courses
// @access    Public
export const getCourses = asyncHandler(async function(req, res, next) {
  if (req.params.bootcampId) {
    const courses = await CourseModel.find({ bootcamp: req.params.bootcampId });

    return res.status(200).json({
      success: true,
      count: courses.length,
      data: courses
    });
  } else {
    // res.status(200).json(res.advancedResults);
    const courses = await CourseModel.find().populate({
      path: "bootcamp",
      select: "name description"
    });

    return res.status(200).json({
      success: true,
      count: courses.length,
      data: courses
    });
  }
});

// @desc      Get single course
// @route     GET /api/v1/courses/:id
// @access    Public
export const getCourse = asyncHandler(async function(req, res, next) {
  const course = await CourseModel.findById(req.params.id).populate({
    path: "bootcamp",
    select: "name description"
  });

  if (!course) {
    return next(
      new ErrorResponse(`No course with the id of ${req.params.id}`),
      404
    );
  }

  return res.status(200).json({
    success: true,
    data: course
  });
});

// @desc      Add course
// @route     POST /api/v1/bootcamps/:bootcampId/courses
// @access    Private
export const addCourse = asyncHandler(async function(req, res, next) {
  req.body.bootcamp = req.params.bootcampId;

  const bootcamp = await BootcampModel.findById(req.params.bootcampId).populate(
    {
      path: "bootcamp",
      select: "name description"
    }
  );

  if (!bootcamp) {
    return next(
      new ErrorResponse(`No bootcamp with the id of ${req.params.bootcampId}`),
      404
    );
  }

  const course = await CourseModel.create(req.body);

  return res.status(200).json({
    success: true,
    data: course
  });
});

// @desc      Update course
// @route     PUT /api/v1/courses/:id
// @access    Private

// @desc      Delete course
// @route     DELETE /api/v1/courses/:id
// @access    Private
