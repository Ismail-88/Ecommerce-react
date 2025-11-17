import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ClerkProvider } from "@clerk/clerk-react";
import { DataProvider } from "./context/DataContext.jsx";
import { CartProvider } from "./context/CartContext.jsx";
import { ThemeProvider } from "./context/ThemeContext.jsx";
import { ToastContainer } from "react-toastify";
import CustomScrollToTop from "./components/CustomScrollToTop.jsx";

// Import your Publishable Key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
        <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
        
    <DataProvider>
      <CartProvider>
      <ThemeProvider>  
          <App />
          <CustomScrollToTop />
          {/* <ScrollToTop smooth color="white" style={{backgroundColor:'#fa2d37', display:'flex',alignItems:'center', justifyContent:'center'}}/> */}
          <ToastContainer
            position="bottom-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick={false}
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
       </ThemeProvider>
      </CartProvider>
    </DataProvider>
        </ClerkProvider>
       
  </StrictMode>
);
