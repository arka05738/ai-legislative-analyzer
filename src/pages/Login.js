import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate(); // ✅ inside component

  const login = async () => {
    try {
      const res = await API.post("/auth/login", {
        email: email,
        password: password,
      });

      localStorage.setItem("uid", res.data.uid);

      alert("Login Success");

      navigate("/dashboard"); // ✅ redirect

    } catch (err) {
      console.log(err.response?.data || err);
      alert("Login Failed");
    }
  };

  return (
    <div style={{ padding: "50px" }}>
      <h2>Login</h2>

      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <br /><br />

      <input
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <br /><br />

      <button onClick={login}>Login</button>
    </div>
  );
}

export default Login;