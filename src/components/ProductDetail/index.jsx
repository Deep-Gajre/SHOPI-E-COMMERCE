import { XMarkIcon } from "@heroicons/react/24/solid";
import { CSSTransition } from "react-transition-group";
import { useContext, useRef } from "react";
import { ShoppingCartContext } from "../../contexts";
import "./styles.css";

function ProductDetail() {
  const context = useContext(ShoppingCartContext);
  const nodeRef = useRef(null);

  const product = context.productToShow;

  return (
    <CSSTransition
      in={context.isProductDetailOpen}
      timeout={300}
      classNames="fade"
      nodeRef={nodeRef}
      unmountOnExit
    >
      <aside
        ref={nodeRef}
        className="product-detail flex flex-col fixed bg-white right-0 top-0 w-80 h-screen border border-black rounded-lg z-50 overflow-y-auto shadow-lg"
      >
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="font-medium text-xl">Product Details</h2>
          <XMarkIcon
            onClick={context.closeProductDetail}
            className="h-6 w-6 text-black cursor-pointer hover:text-red-500"
          />
        </div>

        {product ? (
          <div className="flex flex-col items-center p-4 gap-4">
            <img
              className="w-full h-48 object-cover rounded-lg"
              src={product.images?.[0] || "https://via.placeholder.com/300x200?text=No+Image"}
              alt={product.title || "Product image"}
            />

            <div className="text-center space-y-2">
              <h3 className="text-xl font-semibold">{product.title}</h3>
              <p className="text-sm text-gray-600">{product.description}</p>
              <p className="text-lg font-bold text-black">${product.price}</p>
            </div>
          </div>
        ) : (
          <div className="p-4 text-center text-gray-500">No product selected</div>
        )}
      </aside>
    </CSSTransition>
  );
}

export { ProductDetail };
