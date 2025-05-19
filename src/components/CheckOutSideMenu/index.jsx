import { useContext, useRef } from "react";
import { Link } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import { XMarkIcon } from "@heroicons/react/24/solid";
import "./styles.css";
import { ShoppingCartContext } from "../../contexts";
import { OrderCard } from "../OrderCard";

function CheckOutSideMenu() {
  const context = useContext(ShoppingCartContext);
  const nodeRef = useRef(null);

  const handleDelete = (id) => {
    const filteredProducts = context.cartProducts.filter(
      (product) => product.id !== id
    );
    context.setCartProducts(filteredProducts);
  };

  const handleCheckout = () => {
    const orderToAdd = {
      date: "01.12.2024",
      products: context.cartProducts,
      totalProducts: context.cartProducts.length,
      totalPrice: context.totalPriceOfProducts,
    };

    context.setOrder([...context.order, orderToAdd]);
    context.setCartProducts([]);
  };

  return (
    <CSSTransition
      in={context.isCheckoutSideMenuOpen}
      classNames="fade"
      timeout={400}
      nodeRef={nodeRef}
      unmountOnExit
    >
      <aside
        ref={nodeRef}
        className="checkout-side-menu fixed top-0 right-0 w-80 h-screen bg-white border-l border-black rounded-l-lg z-50 flex flex-col justify-between shadow-lg"
      >
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="font-medium text-xl">My Order</h2>
          <XMarkIcon
            onClick={context.closeCheckOutSideMenu}
            className="h-6 w-6 text-black cursor-pointer hover:text-red-500"
          />
        </div>

        {/* Product list */}
        <div className="flex-1 overflow-y-auto p-4">
          {context.cartProducts.map((product) => (
            <OrderCard
              key={product.id}
              id={product.id}
              title={product.title}
              price={product.price}
              imgUrl={product.images[0]}
              handleDelete={handleDelete}
            />
          ))}
        </div>

        {/* Footer: Total + Checkout Button */}
        <div className="p-4 border-t">
          <div className="flex justify-between mb-4">
            <span className="font-medium">Total:</span>
            <span className="text-lg font-bold">
              ${context.totalPriceOfProducts}
            </span>
          </div>
          <Link to={"/Vite-E-commerce/my-orders/last"}>
            <button
              onClick={() => {
                handleCheckout();
                context.closeCheckOutSideMenu();
              }}
              className="w-full py-2 bg-black text-white rounded-md hover:bg-gray-800 transition"
            >
              Checkout
            </button>
          </Link>
        </div>
      </aside>
    </CSSTransition>
  );
}

export { CheckOutSideMenu };
