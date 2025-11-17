import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

//step 1
export const CartContext = createContext(null);
//step 2 : create provider
export const CartProvider = ({ children }) => {
  const [cartItem, setCartItem] = useState(() => {
    const storedCart = localStorage.getItem("cartItems");
    return storedCart ? JSON.parse(storedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItem));
  }, [cartItem]);


  const addToCart = (product) => {
  const itemInCart = cartItem.find((item) => item._id === product._id);
  if (itemInCart) {
    // Increment quantity
    const updatedCart = cartItem.map((item) =>
      item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCartItem(updatedCart);
    toast.success("Product quantity increased!");
  } else {
    // Add new item
    setCartItem([...cartItem, { ...product, quantity: 1 }]);
    toast.success("Product added to cart!");
  }
};
  const updatedQuantity = (cartItem, productId, action) => {
    setCartItem(
      cartItem
        .map((item) => {
          if (item._id === productId) {
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
    setCartItem(cartItem.filter((item) => item._id !== productId)); 
    toast.success(" Product deleted from cart!");
  };

  const clearCart = () => {
  setCartItem([]);
  
  localStorage.removeItem('cartItems');
};

  return (
    <CartContext.Provider
      value={{
        cartItem,
        setCartItem,
        addToCart,
        updatedQuantity,
        deleteCartItem,
        clearCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

//create custom hooks
export const useCart = () => useContext(CartContext);
