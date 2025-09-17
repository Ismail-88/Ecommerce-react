import { createContext, useContext, useState } from "react";
import { toast } from "react-toastify";

//step 1
export const CartContext = createContext(null);
//step 2 : create provider
export const CartProvider = ({ children }) => {
  const [cartItem, setCartItem] = useState([]);
  const addToCart = (product) => {
    const itemInCart = cartItem.find((item) => item.id === product.id);
    if (itemInCart) {
      //increment quantity if already in cart
      const updatedCart = cartItem.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      );
      setCartItem(updatedCart);
      toast.success(" Product quantity increased!");
    } else {
      //add new item with quantity 1
      setCartItem([...cartItem, { ...product, quantity: 1 }]);
      toast.success(" Product is added to cart!");
    }
  };

  const updatedQuantity = (cartItem, productId, action) => {
    setCartItem(
      cartItem
        .map((item) => {
          if (item.id === productId) {
            let newUnit = item.quantity;
            if (action === "increment") {
              (newUnit = newUnit + 1), toast.success("Quantity increased!");
            } else if (action === "decrement") {
              (newUnit = newUnit - 1), toast.success("Quantity decreased!");
            }
            return newUnit > 0 ? { ...item, quantity: newUnit } : null;
          }
          return item;
        })
        .filter((item) => item !== null)
    );
  };

  const deleteCartItem = (productId) => {
    setCartItem(cartItem.filter((item) => item.id !== productId)); //remove item from cart`
    toast.success(" Product deleted from cart!");
  };
  return (
    <CartContext.Provider
      value={{
        cartItem,
        setCartItem,
        addToCart,
        updatedQuantity,
        deleteCartItem,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

//create custom hooks
export const useCart = () => useContext(CartContext);
