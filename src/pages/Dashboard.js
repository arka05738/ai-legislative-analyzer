import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import "../styles/dashboard.css"; // 🔥 CSS file

function Dashboard() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("uid");
    navigate("/");
  };

const uploadFile = async () => {
  try {
    setLoading(true);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("email", localStorage.getItem("uid"));

    // STEP 1: Upload
    const uploadRes = await API.post("/upload", formData);

    console.log("Upload:", uploadRes.data);

    const docId = uploadRes.data.document_id;

    // STEP 2: Process (🔥 IMPORTANT)
    const processRes = await API.post(`/process/${docId}`);

    console.log("Process:", processRes.data);

    // Merge both responses
    setResult({
      ...uploadRes.data,
      ...processRes.data
    });

    setLoading(false);

  } catch (err) {
    console.log(err.response?.data || err);
    setLoading(false);
    alert("Upload failed");
  }
};
  return (
    <div className="dashboard-container">

      {/* HEADER */}
      <div className="header">
        <h2>🚀 AI Legislative Analyzer</h2>
        <button className="logout-btn" onClick={logout}>Logout</button>
      </div>

      {/* UPLOAD SECTION */}
      <div className="upload-box">
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
        />

        {file && <p className="file-name">📁 {file.name}</p>}

        <button className="upload-btn" onClick={uploadFile}>
          Upload & Analyze
        </button>

        {loading && <p className="loading">⏳ Processing...</p>}
      </div>

      {/* RESULT */}
{/* RESULT */}
{result && (
  <div className="result-card">
    <h3>📄 {result.filename}</h3>

    <p>
      <b>Status:</b>{" "}
      <span className="status">{result.message}</span>
    </p>

    {/* 🔥 ADD HERE (IMPORTANT) */}
    {result.compressed_length && (
      <p>📉 <b>Compressed Length:</b> {result.compressed_length}</p>
    )}

    {result.compression_ratio && (
      <p>⚡ <b>Compression Ratio:</b> {result.compression_ratio}%</p>
    )}

    {/* SUMMARY */}
    {result.summary && (
      <>
        <h4>🧠 Summary:</h4>

        <div className="summary-box">
          {result.summary}
        </div>

        <button
          className="download-btn"
          onClick={() => {
            const blob = new Blob([result.summary], { type: "text/plain" });
            const link = document.createElement("a");
            link.href = URL.createObjectURL(blob);
            link.download = "summary.txt";
            link.click();
          }}
        >
          ⬇ Download Summary
        </button>
      </>
    )}
  </div>
)}
      
    </div>
  );
}

export default Dashboard;