import { useState } from "react";
import PropTypes from "prop-types";
import { assets } from "../../assets/assets";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { ShopContext } from "../../context/ShopContext";
import authService from "../../Utils/authService";

const Navbar = ({ setMenuOpen }) => {
  const [visible, setVisible] = useState(false);
  const { setShowSearch, getCartCount } = useContext(ShopContext);
  const handleMenuToggle = () => {
    setVisible(!visible);
    setMenuOpen(visible); // Inform App of menu state
  };
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-between py-5 font-medium">
      <Link to="/">
        <img src={assets.logo} alt="logo" className="w-36" />
      </Link>
      <ul className="hidden sm:flex gap-5 text-sm text-gray-700">
        <NavLink to="/" className="flex flex-col items-center gap-1">
          <p>HOME</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
        <NavLink
          to="/user/collection"
          className="flex flex-col items-center gap-1"
        >
          <p>COLLECTION</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
        <NavLink to="/user/about" className="flex flex-col items-center gap-1">
          <p>ABOUT</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
        <NavLink
          to="/user/contact"
          className="flex flex-col items-center gap-1"
        >
          <p>CONTACT</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
        <NavLink
          to="/user/wishlist"
          className="flex flex-col items-center gap-1"
        >
          <p>WISHLIST</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
        <div
          className="flex flex-col items-center gap-1"
          onClick={() => {
            authService.logout();
            navigate("/login");
          }}
        >
          <p>LOGOUT</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </div>
      </ul>
      <div className="flex items-center gap-6">
        <img
          onClick={() => setShowSearch(true)}
          src={assets.search_icon}
          className="w-5 cursor-pointer"
          alt=""
        />{" "}
        <div className="group relative">
          <Link to="/login">
            {" "}
            <img
              src={assets.profile_icon}
              className="w-5 cursor-pointer"
              alt=""
            />{" "}
          </Link>

          <div className="group-hover:block hidden absolute dropdown-menu right-0 pt-4">
            <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded">
              <NavLink
                className="cursor-pointer hover:text-black"
                to="/user/profile"
              >
                My Profile
              </NavLink>
              <p className="cursor-pointer hover:text-black">Others</p>
              <p className="cursor-pointer hover:text-black">Logout</p>
            </div>
          </div>
        </div>
        <Link to="/user/cart" className="relative">
          <img src={assets.cart_icon} className="w-5 min-w-5" alt="" />
          <p className="absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]">
            {getCartCount()}
          </p>
        </Link>
        <img
          onClick={handleMenuToggle}
          src={assets.menu_icon}
          className="w-5 cursor-pointer sm:hidden"
          alt=""
        />
      </div>
      {/* Sidebar Menu For Smaller Screens */}
      <div
        className={`fixed top-0 right-0 bottom-0 z-50 overflow-y-auto bg-white transition-all ${
          visible ? "w-full" : "w-0"
        }`}
      >
        <div className="flex flex-col text-gray-600">
          <div
            onClick={() => setVisible(false)}
            className="flex items-center gap-4 p-3 cursor-pointer"
          >
            <img className="h-4 rotate-180" src={assets.dropdown_icon} alt="" />
            <p>Back</p>
          </div>
          {/* Sidebar NavLinks */}
          <NavLink
            to="/"
            onClick={() => setVisible(false)}
            className="py-2 pl-6 border"
          >
            HOME
          </NavLink>
          <NavLink
            to="/user/collection"
            onClick={() => setVisible(false)}
            className="py-2 pl-6 border"
          >
            COLLECTION
          </NavLink>
          <NavLink
            to="/user/about"
            onClick={() => setVisible(false)}
            className="py-2 pl-6 border"
          >
            ABOUT
          </NavLink>
          <NavLink
            to="/user/contact"
            onClick={() => setVisible(false)}
            className="py-2 pl-6 border"
          >
            CONTACT
          </NavLink>
          <NavLink
            to="/user/wishlist"
            onClick={() => setVisible(false)}
            className="py-2 pl-6 border"
          >
            WISHLIST
          </NavLink>
        </div>
      </div>
    </div>
  );
};

Navbar.propTypes = {
  setMenuOpen: PropTypes.func.isRequired,
};

export default Navbar;
