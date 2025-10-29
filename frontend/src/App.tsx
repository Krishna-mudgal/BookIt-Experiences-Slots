import Home from "./pages/HomePage";
import Navbar from "./components/NavBar";
import { createBrowserRouter, RouterContextProvider, RouterProvider } from "react-router-dom";
import DetailsPage from "./pages/DetailPage"
import CheckoutPage from "./pages/CheckoutPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  }, 
  {
    path: "/details/:id",
    element: <DetailsPage />
  },
  {
    path: "/checkout/:id",
    element: <CheckoutPage />
  }
]);

function App() {
  return (
    <>
      {/* <Navbar /> */}
      {/* <Home /> */}
      <RouterProvider router={router}>

      </RouterProvider>
    </>
  );
}

export default App;
