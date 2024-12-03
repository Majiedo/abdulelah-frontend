import { Link, useNavigate } from "react-router-dom";
import BackButton from "../components/BackButton";
import { Button } from "../components/ui/button";
import { useState } from "react";
import toast from "react-hot-toast";

const SignUp = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleSignIn = async () => {
    const resposne = await fetch("http://localhost:4000/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ phoneNumber, username, password }),
    });

    const data = await resposne.json();

    if (!data.accessToken)
      return toast.error("كلمة المرور او اسم المستخدم غير صحيح");

    const userReq = await fetch("http://localhost:4000/user", {
      headers: {
        Authorization: `Bearer ${data.accessToken}`,
      },
    });

    const user = await userReq.json();

    localStorage.setItem("token", data.accessToken);
    localStorage.setItem("user", JSON.stringify(user));

    navigate("/books");
  };

  return (
    <main className="form">
      <BackButton />
      <h2>انشاء حساب</h2>
      <input
        maxLength={10}
        type="number"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
        placeholder="رقم الجوال"
      />
      <input
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="اسم المستخدم"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="كلمة المرور"
      />
      <input
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        placeholder="تأكيد كلمة المرور"
      />

      <Button
        disabled={!username || !phoneNumber || password !== confirmPassword}
        onClick={handleSignIn}
      >
        انشاء الحساب
      </Button>
      <Link to="/sign-in">
        <p>لديك حساب؟</p>
      </Link>
    </main>
  );
};

export default SignUp;
