import { h } from "preact";
import { useState, useEffect, useRef } from 'preact/hooks';
import logo from "../assets/img/logo-pddikti.svg";
import * as Icons from "lucide-react";
function useClickOutside(ref, handler) {
  useEffect(() => {
    const listener = (event) => {
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }
      handler(event);
    };
    document.addEventListener('mousedown', listener);
    return () => {
      document.removeEventListener('mousedown', listener);
    };
  }, [ref, handler]);
}

function UserAvatar({ name }) {
  // Ambil inisial dari nama (huruf pertama setiap kata)
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <div className="flex items-center justify-center w-6 h-6 rounded-full bg-gradient-to-r from-[#6317c3] to-[#d942c0] text-white font-bold text-md">
      {initials}
    </div>
  );
}

function UserDropdown({onLogout}) {
  const [open, setOpen] = useState(false);
  const ref = useRef();

  useClickOutside(ref, () => setOpen(false));

  return (
    <div className="user-dropdown dark:hover:text-gray-600" ref={ref}>
      <button
        className="user-button"
        onClick={() => setOpen(!open)}
        aria-haspopup="true"
        aria-expanded={open}
        type="button"
      >
        <span className="user-avatar">
          <UserAvatar name="Egi Ferdian" />
        </span>
        <span className="user-name dark:text-white">egi.ferdians11@gmail.com as Tim Manajemen [Semua Unit]</span>
        <span className="arrow">{open ? <Icons.ChevronUp className="w-3 h-3"/> : <Icons.ChevronDown className="w-3 h-3"/>}</span>
      </button>
      {open && (
        <ul className="user-menu">
          <li className="border-b border-gray-200 mb-2 pb-2"><a href="#"><Icons.UserPen className="w-4 h-4"/>Edit Profile</a></li>
          <li><a href="#"><Icons.CircleStar className="w-4 h-4"/>Login As</a></li>
          <li><a href="#"><Icons.GraduationCap className="w-4 h-4"/>Login As PT</a></li>
          <li className="border-t border-gray-200 mt-2 pt-2"><button onClick={onLogout}><Icons.LogOut className="w-4 h-4 "/>Logout</button></li>
        </ul>
      )}
    </div>
  );
}

export default function Navbar({onLogout}) {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);
  return (
    <div className="user-top-bar dark:bg-gray-600">
      <div className="user-top-bar-container flex items-center justify-between px-4 py-2 overflow-visible">
        <div className="logo flex items-center gap-2" role="banner" tabIndex={0}>
          <img
            src={logo}
            alt="Logo PDDikti"
            className="h-10 w-auto object-contain"
            onError={(e) => {
              e.target.style.display = "none";
              e.target.nextSibling.style.display = "flex";
            }}
          />
          <span className="logo-text text-[#6317c3] font-bold">PDDikti</span>
        </div>

        <div className="flex items-center gap-2">
          <UserDropdown onLogout={onLogout} />

          {/* Tooltip wrapper */}
          <div className="relative group inline-flex">
            <button
              type="button"
              onClick={() => setDarkMode(!darkMode)}
              aria-label={darkMode ? "Sembunyikan mode gelap" : "Tampilkan mode gelap"}
              aria-describedby="darkmode-tooltip"
              title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"} // fallback for touch
              className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:opacity-80 transition"
            >
              {darkMode ? (
                <Icons.Sun className="w-4 h-4 text-yellow-400" />
              ) : (
                <Icons.Moon className="w-4 h-4 text-gray-800" />
              )}
            </button>

            {/* Tooltip */}
            <span
              id="darkmode-tooltip"
              role="tooltip"
              className="absolute top-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-black rounded opacity-0 translate-y-2
                        group-hover:opacity-100 group-hover:translate-y-0
                        group-focus:opacity-100 group-focus:translate-y-0
                        pointer-events-none z-50
                        transition-all duration-150 ease-out"
            >
              {darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}