import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, loading] = useAuthState(auth);
  const resetFormFields = () => {
    setEmail("");
    setPassword("");
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    await signInWithEmailAndPassword(auth, email, password).catch((e) => {
      alert("Error occured!");
      console.log(e);
    });
    resetFormFields();
  };
  if (loading) {
    return;
  }
  if (user) {
    navigate("/");
  }
  if (!user) {
    return (
      <>
        <div className="h-screen flex flex-col items-center justify-center bg-[#e0e0e0] dark:bg-[#141414]">
          <div className=" rounded-2xl p-12 pb-2 flex  flex-col items-center justify-center bg-white drop-shadow-lg dark:bg-black">
            <form className="flex flex-col items-center justify-center gap-4">
              <input
                required
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                value={email}
                type="email"
                className="border-1 border-black rounded-xl p-3 bg-[#ededed] font-bold placeholder:text-black lg:w-[300px]"
                placeholder="Email"
              />
              <input
                required
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                value={password}
                type="password"
                className="border-1 border-black rounded-xl p-3 bg-[#ededed] font-bold placeholder:text-black lg:w-[300px]"
                placeholder="Password"
              />

              <button
                type="submit"
                onClick={handleSubmit}
                className="w-full mt-4 mb-3 lg:w-[300px] bg-blue-500 hover:bg-blue-700 p-3 rounded-xl font-bold">
                Log In
              </button>
              <span className="dark:text-white">
                New user?{" "}
                <Link
                  className="font-bold underline hover:text-blue-500"
                  to={"/signup"}>
                  Sign Up
                </Link>
                .
              </span>
            </form>
          </div>
        </div>
      </>
    );
  }
}
