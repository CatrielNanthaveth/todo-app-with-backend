import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import { Root, ErrorPage, Register } from "./routes/index";




const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        
      }
    ]
  },
  {
    path: "/register",
    element: <Register />,
  }
])

function App() {
  return (
    <RouterProvider router={router} />
  );
}
export default App;
