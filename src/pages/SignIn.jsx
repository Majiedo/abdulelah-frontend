import { Link, useNavigate } from "react-router-dom";
import BackButton from "../components/BackButton";
import { Button } from "../components/ui/button";
import { useState } from "react";
import toast from "react-hot-toast";

const SignIn = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignIn = async () => {
    const resposne = await fetch(
      "https://abdulelah-nest-js-production.up.railway.app/auth/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      },
    );

    const data = await resposne.json();

    if (!data.accessToken)
      return toast.error("كلمة المرور او اسم المستخدم غير صحيح");

    const userReq = await fetch(
      "https://abdulelah-nest-js-production.up.railway.app/user",
      {
        headers: {
          Authorization: `Bearer ${data.accessToken}`,
        },
      },
    );

    const user = await userReq.json();

    localStorage.setItem("token", data.accessToken);
    localStorage.setItem("user", JSON.stringify(user));

    navigate("/books");
  };

  return (
    <main className="form">
      <BackButton />
      <h2>تسجيل الدخول</h2>
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
      <Button disabled={!username || !password} onClick={handleSignIn}>
        تسجيل الدخول
      </Button>
      <Link to="/sign-up">
        <p>ليس لديك حساب؟</p>
      </Link>
    </main>
  );
};

export default SignIn;
