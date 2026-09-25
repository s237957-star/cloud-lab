require("dotenv").config({
  path: require("path").resolve(__dirname, "../.env")
});

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const Student = require("./models/Student");

const app = express();

// ==============================
// MIDDLEWARE
// ==============================
app.use(cors());
app.use(express.json());

// ==============================
// TEST BACKEND
// ==============================
app.get("/api/hello", (req, res) => {
  res.json({
    message: "Backend is running!"
  });
});

// ==============================
// GET - LẤY DANH SÁCH SINH VIÊN
// ==============================
app.get("/api/students", async (req, res) => {
  try {
    const students = await Student.find();

    res.json(students);
  } catch (error) {
    console.error("GET students error:", error);

    res.status(500).json({
      message: "Lỗi lấy danh sách sinh viên",
      error: error.message
    });
  }
});

// ==============================
// POST - THÊM SINH VIÊN
// ==============================
app.post("/api/students", async (req, res) => {
  try {
    const student = await Student.create(req.body);

    res.status(201).json(student);
  } catch (error) {
    console.error("POST student error:", error);

    res.status(400).json({
      message: "Lỗi thêm sinh viên",
      error: error.message
    });
  }
});

// ==============================
// PUT - CẬP NHẬT SINH VIÊN
// ==============================
app.put("/api/students/:id", async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    if (!student) {
      return res.status(404).json({
        message: "Không tìm thấy sinh viên"
      });
    }

    res.json(student);
  } catch (error) {
    console.error("PUT student error:", error);

    res.status(400).json({
      message: "Lỗi cập nhật sinh viên",
      error: error.message
    });
  }
});

// ==============================
// DELETE - XÓA SINH VIÊN
// ==============================
app.delete("/api/students/:id", async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);

    if (!student) {
      return res.status(404).json({
        message: "Không tìm thấy sinh viên"
      });
    }

    res.json({
      message: "Xóa sinh viên thành công",
      student
    });
  } catch (error) {
    console.error("DELETE student error:", error);

    res.status(400).json({
      message: "Lỗi xóa sinh viên",
      error: error.message
    });
  }
});

// ==============================
// PORT
// ==============================
const PORT = process.env.PORT || 5000;

// ==============================
// START SERVER TRƯỚC
// ==============================
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});

// ==============================
// KẾT NỐI MONGODB
// ==============================
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("MongoDB Atlas connected successfully");
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error.message);
  });
