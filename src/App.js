import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import { Root, ErrorPage, Register } from "./routes/index";
import { RequireAuth } from "./components/requireAuth";
import { Todo } from "./routes/todo";

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
  },
  {
    path: "/todo",
    element: <RequireAuth><Todo /></RequireAuth>,
  }
])

function App() {
  return (
    <RouterProvider router={router} />
  );
}
export default App;
