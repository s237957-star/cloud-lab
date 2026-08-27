import { useEffect, useState } from "react";

function App() {
  const [students, setStudents] = useState([]);
  const [form, setForm] = useState({
    studentId: "",
    name: "",
    email: "",
  });
  const [editId, setEditId] = useState(null);

  const load = async () => {
    try {
      const res = await fetch("/api/students");
      setStudents(await res.json());
    } catch {
      alert("Không thể tải danh sách!");
    }
  };

  useEffect(() => {
    load();
  }, []);

  const change = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();

    const url = editId
      ? `/api/students/${editId}`
      : "/api/students";

    const res = await fetch(url, {
      method: editId ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (!res.ok) {
      alert(editId ? "Cập nhật thất bại!" : "Thêm thất bại!");
      return;
    }

    alert(editId ? "Cập nhật thành công!" : "Thêm thành công!");

    setForm({ studentId: "", name: "", email: "" });
    setEditId(null);
    load();
  };

  const edit = (s) => {
    setEditId(s._id);
    setForm({
      studentId: s.studentId,
      name: s.name,
      email: s.email,
    });
  };

  const remove = async (id) => {
    if (!confirm("Bạn có chắc muốn xóa?")) return;

    const res = await fetch(`/api/students/${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      alert("Xóa thành công!");
      load();
    } else {
      alert("Xóa thất bại!");
    }
  };

  return (
    <div style={{ maxWidth: 800, margin: "40px auto" }}>
      <h1>Quản lý sinh viên</h1>

      <form onSubmit={submit}>
        <input
          name="studentId"
          placeholder="MSSV"
          value={form.studentId}
          onChange={change}
        />

        <input
          name="name"
          placeholder="Họ tên"
          value={form.name}
          onChange={change}
        />

        <input
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={change}
        />

        <button type="submit">
          {editId ? "Cập nhật" : "Thêm sinh viên"}
        </button>

        {editId && (
          <button
            type="button"
            onClick={() => {
              setEditId(null);
              setForm({
                studentId: "",
                name: "",
                email: "",
              });
            }}
          >
            Hủy
          </button>
        )}
      </form>

      <h2>Danh sách sinh viên</h2>

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>MSSV</th>
            <th>Họ tên</th>
            <th>Email</th>
            <th>Thao tác</th>
          </tr>
        </thead>

        <tbody>
          {students.map((s) => (
            <tr key={s._id}>
              <td>{s.studentId}</td>
              <td>{s.name}</td>
              <td>{s.email}</td>
              <td>
                <button onClick={() => edit(s)}>Sửa</button>
                <button onClick={() => remove(s._id)}>Xóa</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
