import { Router } from "express";
const bootcampRoutes = Router();

bootcampRoutes.get("/", (req, res) => {
  res.status(200).json({ success: true, msg: "Show all bootcamps" });
});

bootcampRoutes.get("/:id", (req, res) => {
  res
    .status(200)
    .json({ success: true, msg: `Get bootcamp id:${req.params.id}` });
});

bootcampRoutes.post("/", (req, res) => {
  res.status(200).json({ success: true, msg: "Create new bootcamps" });
});

bootcampRoutes.put("/:id", (req, res) => {
  res
    .status(200)
    .json({ success: true, msg: `Update bootcamp id:${req.params.id}` });
});

bootcampRoutes.delete("/:id", (req, res) => {
  res
    .status(200)
    .json({ success: true, msg: `Delete bootcamp id:${req.params.id}` });
});

export { bootcampRoutes };
