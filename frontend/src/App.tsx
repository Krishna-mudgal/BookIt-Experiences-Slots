import Home from "./pages/HomePage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import DetailsPage from "./pages/DetailPage"
import CheckoutPage from "./pages/CheckoutPage";
import ResultPage from "./pages/ResultPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  }, 
  {
    path: "/detail/:id",
    element: <DetailsPage />
  },
  {
    path: "/checkout",
    element: <CheckoutPage />
  },
  {
    path: "/booking-complete",
    element: <ResultPage />
  }
]);

function App() {
  return (
    <>
      <RouterProvider router={router}>

      </RouterProvider>
    </>
  );
}

export default App;
