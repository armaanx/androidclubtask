/* eslint-disable no-unused-vars */
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, createUserDocumentFromAuth } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";

export default function Signup() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [user, loading] = useAuthState(auth);
  const resetFormFields = () => {
    setEmail("");
    setName("");
    setConfirmPass("");
    setPassword("");
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPass) {
      alert("Passwords do not match");
      resetFormFields();
      return;
    }
    await createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        const user = userCredential.user;
        console.log(user);
        await createUserDocumentFromAuth(user, { name }).catch((error) => {
          console.log(error);
        });
      })
      .catch((error) => {
        alert("Error occured!");
        console.log(error);
        resetFormFields();
      });
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
          <div className=" rounded-2xl p-12 pb-2 flex  flex-col items-center justify-center bg-white dark:bg-black drop-shadow-lg">
            <form className="flex flex-col items-center justify-center gap-4">
              <input
                required
                onChange={(e) => {
                  setName(e.target.value);
                }}
                value={name}
                type="text"
                className="border-1 border-black rounded-xl p-3 bg-[#ededed] font-bold placeholder:text-black lg:w-[300px]"
                placeholder="Name"
              />
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
              <input
                required
                onChange={(e) => {
                  setConfirmPass(e.target.value);
                }}
                value={confirmPass}
                type="password"
                className="border-1 border-black rounded-xl p-3  bg-[#ededed] font-bold placeholder:text-black lg:w-[300px]"
                placeholder="Confirm Password"
              />
              <button
                type="submit"
                onClick={handleSubmit}
                className="w-full mt-4 mb-3 lg:w-[300px] bg-blue-500 hover:bg-blue-700 p-3 rounded-xl font-bold">
                Sign Up
              </button>
              <span className="dark:text-white">
                Already an user?{" "}
                <Link
                  className="font-bold underline hover:text-blue-500"
                  to={"/login"}>
                  Log In
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
