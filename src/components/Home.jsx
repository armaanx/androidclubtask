import Typewriter from "typewriter-effect";
import { Link } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
export default function Home() {
  const [user, loading] = useAuthState(auth);
  const handleLogOut = () => {
    signOut(auth)
      .then(console.log("Logged Out"))
      .catch((error) => {
        console.log(error);
      });
  };
  if (loading) {
    return <h1 className="text-5xl font-bold text-black">Loading</h1>;
  }
  if (user) {
    return (
      <div className="flex flex-col items-center justify-center h-screen dark:bg-[#141414] dark:text-white ">
        <span className="text-5xl font-bold p-3 mb-5 dark:text-white text-black">
          <h1>Hi</h1>
        </span>
        <img
          className="border-4 rounded-3xl border-black dark:border-none"
          src="kitty.jpg"
        />
        <button
          onClick={handleLogOut}
          className="border-2 border-black p-2 rounded-lg mt-3 mb-5 bg-red-600 font-bold">
          Log Out
        </button>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center h-screen dark:bg-[#141414] dark:text-white ">
        <span className="text-5xl font-bold p-3 mb-5 dark:text-white text-black  ">
          <Typewriter
            options={{ loop: true, autoStart: true, strings: ["Welcome..."] }}
          />
        </span>

        <div className="flex flex-row items-center justify-center gap-5 font-medium text-xl p-3 mb-5">
          <span>
            To enter,{" "}
            <Link
              className="underline font-extrabold  hover:text-blue-500"
              to="/login">
              Login
            </Link>
          </span>
        </div>
      </div>
    );
  }
}
