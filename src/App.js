import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import { Root, ErrorPage } from "./routes/index";




const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        
      }
    ]
  }
])

function App() {
  return (
    <RouterProvider router={router} />
  );
}
export default App;
