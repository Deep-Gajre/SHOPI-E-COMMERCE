import PropTypes from "prop-types";
import { PlusIcon, CheckIcon } from "@heroicons/react/24/solid";
import { useContext } from "react";
import { ShoppingCartContext } from "../../contexts";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../pages/Firebase/firebase";
import "./styles.css";

function Card({ data }) {
  const context = useContext(ShoppingCartContext);
  const navigate = useNavigate();
  const [user] = useAuthState(auth);

  const showProduct = (productData) => {
    if (!user) {
      navigate("/Vite-E-commerce/login");
      return;
    }

    // Properly set the selected product before opening the detail
    context.setProductToShow(productData);
    context.openProductDetail();
  };

  const addProductToCart = (event, productData) => {
    event.stopPropagation();

    if (!user) {
      navigate("/Vite-E-commerce/login");
      return;
    }

    productData.count = 1;
    context.setCartProducts([...context.cartProducts, productData]);

    // KEEP the product detail open after adding to cart
    context.openCheckOutSideMenu();
    // ❌ DO NOT close product detail if you want to keep it visible
    // context.closeProductDetail();
  };

  const renderIcon = (id) => {
    const isInCart = context.cartProducts.some((product) => product.id === id);

    if (isInCart) {
      return (
        <button
          className="absolute m-2 top-0 right-0 flex justify-center items-center bg-black w-6 h-6 rounded-full"
          onClick={(e) => e.stopPropagation()}
          aria-label="Product already in cart"
        >
          <CheckIcon className="h-6 w-6 text-stone-100 p-1" />
        </button>
      );
    }

    return (
      <button
        onClick={(event) => addProductToCart(event, data)}
        className="absolute m-2 top-0 right-0 flex justify-center items-center bg-white w-6 h-6 rounded-full"
        aria-label="Add product to cart"
      >
        <PlusIcon className="h-6 w-6 text-black" />
      </button>
    );
  };

  return (
    <div
      onClick={() => showProduct(data)}
      className="Card bg-white cursor-pointer w-56 h-60 rounded-lg active:scale-110 transition ease duration-75"
      role="button"
      tabIndex={0}
      onKeyPress={(e) => {
        if (e.key === "Enter") showProduct(data);
      }}
    >
      <figure className="relative mb-2 w-full h-4/5">
        <span className="absolute bottom-0 left-0 bg-white/60 rounded-lg text-black text-sm m-1 px-2">
          {data.category?.name}
        </span>
        <img
          src={data.images?.[0] || "https://via.placeholder.com/300x200?text=No+Image"}
          alt={data.title || "Product image"}
          className="w-full h-48 object-cover rounded-t-lg"
        />
        {renderIcon(data.id)}
      </figure>
      <p className="flex justify-between">
        <span className="text-sm font-light truncate w-32">{data.title}</span>
        <span className="text-lg font-medium">{data.price}$</span>
      </p>
    </div>
  );
}

Card.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    category: PropTypes.shape({
      name: PropTypes.string,
    }),
    images: PropTypes.arrayOf(PropTypes.string),
    title: PropTypes.string.isRequired,
    price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  }).isRequired,
};

export { Card };
