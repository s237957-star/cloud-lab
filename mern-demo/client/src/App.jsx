import { useEffect, useState } from "react";

function App() {
  const [students, setStudents] = useState([]);

  const [studentId, setStudentId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  // =========================
  // GET STUDENTS
  // =========================
  const getStudents = async () => {
    try {
      const response = await fetch("/api/students");

      if (!response.ok) {
        throw new Error("Không thể lấy danh sách sinh viên");
      }

      const data = await response.json();
      setStudents(data);
    } catch (error) {
      console.error("Lỗi lấy danh sách sinh viên:", error);
    }
  };

  // Lấy danh sách khi mở trang
  useEffect(() => {
    getStudents();
  }, []);

  // =========================
  // POST STUDENT
  // =========================
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/students", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          studentId,
          name,
          email,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Không thể thêm sinh viên");
      }

      console.log("Sinh viên vừa thêm:", data);

      // Xóa form
      setStudentId("");
      setName("");
      setEmail("");

      // Tải lại danh sách
      await getStudents();

      alert("Thêm sinh viên thành công!");
    } catch (error) {
      console.error("Lỗi thêm sinh viên:", error);
      alert("Thêm sinh viên thất bại!");
    }
  };

  return (
    <div
      style={{
        maxWidth: "800px",
        margin: "40px auto",
        padding: "20px",
        fontFamily: "Arial",
      }}
    >
      <h1>Quản lý sinh viên</h1>

      <h2>Thêm sinh viên</h2>

      <form onSubmit={handleSubmit}>
        {/* MSSV */}
        <div style={{ marginBottom: "15px" }}>
          <label>
            <strong>MSSV:</strong>
          </label>

          <br />

          <input
            type="text"
            placeholder="Nhập MSSV"
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
            required
            style={{
              width: "100%",
              padding: "8px",
              marginTop: "5px",
              boxSizing: "border-box",
            }}
          />
        </div>

        {/* Họ tên */}
        <div style={{ marginBottom: "15px" }}>
          <label>
            <strong>Họ tên:</strong>
          </label>

          <br />

          <input
            type="text"
            placeholder="Nhập họ tên"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            style={{
              width: "100%",
              padding: "8px",
              marginTop: "5px",
              boxSizing: "border-box",
            }}
          />
        </div>

        {/* Email */}
        <div style={{ marginBottom: "15px" }}>
          <label>
            <strong>Email:</strong>
          </label>

          <br />

          <input
            type="email"
            placeholder="Nhập email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{
              width: "100%",
              padding: "8px",
              marginTop: "5px",
              boxSizing: "border-box",
            }}
          />
        </div>

        <button
          type="submit"
          style={{
            padding: "10px 20px",
            cursor: "pointer",
          }}
        >
          Thêm sinh viên
        </button>
      </form>

      <hr style={{ margin: "30px 0" }} />

      <h2>Danh sách sinh viên</h2>

      {students.length === 0 ? (
        <p>Chưa có sinh viên.</p>
      ) : (
        <table
          border="1"
          cellPadding="10"
          style={{
            width: "100%",
            borderCollapse: "collapse",
          }}
        >
          <thead>
            <tr>
              <th>MSSV</th>
              <th>Họ tên</th>
              <th>Email</th>
            </tr>
          </thead>

          <tbody>
            {students.map((student) => (
              <tr key={student._id}>
                <td>{student.studentId}</td>
                <td>{student.name}</td>
                <td>{student.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default App;