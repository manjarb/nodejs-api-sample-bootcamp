import { CourseModel } from "../models/Course";
import { ErrorResponse } from "../utils/errorResponse";
import { asyncHandler } from "../middleware/async";

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
    const courses = await CourseModel.find();

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

// @desc      Add course
// @route     POST /api/v1/bootcamps/:bootcampId/courses
// @access    Private

// @desc      Update course
// @route     PUT /api/v1/courses/:id
// @access    Private

// @desc      Delete course
// @route     DELETE /api/v1/courses/:id
// @access    Private
