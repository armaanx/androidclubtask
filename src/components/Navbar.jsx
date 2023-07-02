import { AiFillHome } from "react-icons/ai";
import { CgDarkMode } from "react-icons/cg";
import useThemeStore from "../stores/useThemeStore";
import { useTheme } from "../hooks/useTheme";
import { useLocation, useNavigate } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();
  let isHome = false;
  if (location.pathname == "/") {
    isHome = true;
  }
  const navigate = useNavigate();
  const toggleTheme = useThemeStore((state) => state.toggleTheme);
  useTheme();
  return (
    <div className="w-full h-[70px] absolute top-0 flex flex-row items-center justify-end p-4 pr-7 space-x-7 ">
      {!isHome ? (
        <AiFillHome
          title="Return Home"
          className="text-3xl cursor-pointer dark:text-white"
          onClick={() => {
            navigate("/");
          }}
        />
      ) : null}

      <CgDarkMode
        title="Toggle Theme"
        className="text-3xl cursor-pointer dark:text-white"
        onClick={toggleTheme}
      />
    </div>
  );
}
