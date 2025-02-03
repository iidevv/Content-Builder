import { NavLink } from "react-router-dom";
import { useState } from "react";
import LogoutButton from "../common/LogoutButton/LogoutButton";
import { menuItems } from '../../lib/constant';

const Sidebar = () => {
  const [menuActive, setMenuActive] = useState(false);
  const handleSetMenuActive = () => {
    setMenuActive((prevState) => !prevState);
  };
  let menuClass = menuActive
    ? "fixed right-0 top-0 z-40 h-screen my-4 ml-4 shadow-lg w-80 lg:block lg:relative"
    : "fixed hidden right-0 top-0 z-40 h-screen my-4 ml-4 shadow-lg w-80 lg:block lg:relative";
  return (
    <>
      <button
        onClick={handleSetMenuActive}
        className="bg-white p-1.5 z-20 rounded-sm fixed right-2 shadow-md top-4 lg:hidden"
      >
        <svg
          width="36"
          height="28"
          viewBox="0 0 36 28"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M2 2H34"
            stroke="black"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="stroke-blue-600"
          />
          <path
            d="M2 14H34"
            stroke="black"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="stroke-blue-600"
          />
          <path
            d="M2 26H34"
            stroke="black"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="stroke-blue-600"
          />
        </svg>
      </button>
      <div className={menuClass}>
        <button
          onClick={handleSetMenuActive}
          className="bg-white p-1.5 rounded-sm absolute right-4 text-red-600 top-0 lg:hidden text-4xl"
        >
          &times;
        </button>
        <div className="flex flex-col h-full bg-white rounded-2xl">
          <div className="flex items-center justify-center pt-6">
            {/* TODO: LOGO */}
          </div>
          <nav className="mt-6">
            <ul>
              {menuItems.map((item, i) => (
                <li key={i}>
                  <NavLink
                    to={item.url}
                    onClick={handleSetMenuActive}
                    className={({ isActive }) =>
                      isActive ? "active-menu-link" : "menu-link"
                    }
                  >
                    <span className="mx-4 text-sm font-normal">{item.title}</span>
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
          <div className="mt-auto mb-24 lg:mb-12 py-2 px-6">
            <LogoutButton />
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
