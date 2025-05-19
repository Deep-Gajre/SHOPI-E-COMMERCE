import {
  ArchiveBoxIcon,
  InboxIcon,
  ShoppingCartIcon,
  UserCircleIcon,
} from "@heroicons/react/24/solid";
import { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { ShoppingCartContext } from "../../contexts";
import { CSSTransition } from "react-transition-group";
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
import "../../index.css";

function Navbar() {
  const activeStyle = "underline underline-offset-8";
  const context = useContext(ShoppingCartContext);
  const [userMenuIsActive, setUserMenuIsActive] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const closeEveryThing = () => {
    context.closeCheckOutSideMenu();
    context.closeProductDetail();
    setUserMenuIsActive(false);
  };

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    const auth = getAuth();
    try {
      await signOut(auth);
      setCurrentUser(null);
      closeEveryThing();
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <nav className="bg-white border-b-2 flex justify-between items-center fixed top-0 z-10 w-full py-5 px-8 text-sm font-light">
      <ul className="flex items-center gap-4">
        <li className="font-semibold text-lg hidden md:inline">
          <NavLink
            to="/Vite-E-commerce/"
            onClick={() => {
              context.cleanTitlebarState();
              context.setSearchByCategory("");
              closeEveryThing();
            }}
          >
            <p>Shopi</p>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/Vite-E-commerce/"
            onClick={() => {
              context.setSearchByCategory("");
              closeEveryThing();
            }}
            className={({ isActive }) => (isActive ? activeStyle : undefined)}
          >
            <p>All</p>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/Vite-E-commerce/clothes"
            onClick={() => {
              context.setSearchByCategory("clothes");
              closeEveryThing();
            }}
            className={({ isActive }) => (isActive ? activeStyle : undefined)}
          >
            <p>Clothes</p>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/Vite-E-commerce/electronics"
            onClick={() => {
              context.setSearchByCategory("electronics");
              closeEveryThing();
            }}
            className={({ isActive }) => (isActive ? activeStyle : undefined)}
          >
            <p>Electronics</p>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/Vite-E-commerce/furnitures"
            onClick={() => {
              context.setSearchByCategory("furniture");
              closeEveryThing();
            }}
            className={({ isActive }) => (isActive ? activeStyle : undefined)}
          >
            <p>Furnitures</p>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/Vite-E-commerce/toys"
            onClick={() => {
              context.setSearchByCategory("toys");
              closeEveryThing();
            }}
            className={({ isActive }) => (isActive ? activeStyle : undefined)}
          >
            <p>Toys</p>
          </NavLink>
        </li>
      </ul>

      {/* Desktop Menu */}
      <ul className="items-center gap-4 hidden md:flex">
        <li>
          {currentUser ? (
            <p className="text-black/60">{currentUser.email}</p>
          ) : (
            <NavLink
              to="/Vite-E-commerce/login"
              className={({ isActive }) => (isActive ? activeStyle : undefined)}
            >
              <p className="text-black/60">Login</p>
            </NavLink>
          )}
        </li>

        {currentUser && (
          <li>
            <button onClick={handleLogout} className="text-black/60 hover:underline">
              Logout
            </button>
          </li>
        )}

        <li>
          <NavLink
            to="/Vite-E-commerce/my-orders"
            onClick={() => {
              context.cleanTitlebarState();
              closeEveryThing();
            }}
            className={({ isActive }) => (isActive ? activeStyle : undefined)}
          >
            <p>My Orders</p>
          </NavLink>
        </li>

        <li>
          <p className="flex gap-2">
            <ShoppingCartIcon
              onClick={() => {
                context.cleanTitlebarState();
                context.isCheckoutSideMenuOpen
                  ? context.closeCheckOutSideMenu()
                  : context.openCheckOutSideMenu();
                setUserMenuIsActive(false);
              }}
              className="h-6 w-6 text-black-500 cursor-pointer"
            />
            {context.cartProducts.length}
          </p>
        </li>
      </ul>

      {/* Mobile Menu */}
      <ul className="md:hidden relative">
        <UserCircleIcon
          className="h-6 w-6 text-black-500 cursor-pointer"
          onClick={(event) => {
            context.cleanTitlebarState();
            setUserMenuIsActive(!userMenuIsActive);
            context.closeCheckOutSideMenu();
            context.closeProductDetail();
            event.stopPropagation();
          }}
        />
        <CSSTransition
          in={userMenuIsActive}
          nodeRef={null}
          timeout={1000}
          classNames={"fade"}
        >
          <div
            className={`${
              userMenuIsActive ? "inline-block" : "hidden"
            } w-64 h-auto absolute bg-white border border-black rounded-lg right-0 p-2`}
          >
            <ul className="flex flex-col items-center w-full justify-around gap-2">
              <li className="flex gap-2 w-full">
                <InboxIcon className="h-6 w-6 text-black-500" />
                <p className="text-black/60">
                  {currentUser ? currentUser.email : "Not Logged In"}
                </p>
              </li>
              <li className="flex gap-2 w-full">
                <ArchiveBoxIcon className="h-6 w-6 text-black-500" />
                <NavLink
                  to="/Vite-E-commerce/my-orders"
                  onClick={() => {
                    context.cleanTitlebarState();
                    closeEveryThing();
                  }}
                  className={({ isActive }) =>
                    isActive ? activeStyle : undefined
                  }
                >
                  <p>My Orders</p>
                </NavLink>
              </li>
              <li className="w-full flex gap-2">
                <ShoppingCartIcon
                  onClick={() => {
                    context.cleanTitlebarState();
                    context.isCheckoutSideMenuOpen
                      ? context.closeCheckOutSideMenu()
                      : context.openCheckOutSideMenu();
                    closeEveryThing();
                  }}
                  className="h-6 w-6 text-black-500 cursor-pointer"
                />
                {context.cartProducts.length}
              </li>
              <li className="w-full">
                {currentUser ? (
                  <button onClick={handleLogout} className="text-black/60 hover:underline">
                    Logout
                  </button>
                ) : (
                  <NavLink to="/Vite-E-commerce/login" onClick={closeEveryThing}>
                    <p className="text-black/60 hover:underline">Login</p>
                  </NavLink>
                )}
              </li>
            </ul>
          </div>
        </CSSTransition>
      </ul>
    </nav>
  );
}

export { Navbar };
