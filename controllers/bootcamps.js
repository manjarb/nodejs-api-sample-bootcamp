// @access Public
export function getBootcamps(req, res, next) {
  res.status(200).json({ success: true, msg: "Show all bootcamps" });
}

// @access Public
export function getBootcamp(req, res, next) {
  res
    .status(200)
    .json({ success: true, msg: `Get bootcamp id:${req.params.id}` });
}

// @access Private
export function createBootcamp(req, res, next) {
  res.status(200).json({ success: true, msg: "Create new bootcamps" });
}

// @access Private
export function updateBootcamp(req, res, next) {
  res
    .status(200)
    .json({ success: true, msg: `Update bootcamp id:${req.params.id}` });
}

// @access Private
export function deleteBootcamp(req, res, next) {
  res
    .status(200)
    .json({ success: true, msg: `Delete bootcamp id:${req.params.id}` });
}
