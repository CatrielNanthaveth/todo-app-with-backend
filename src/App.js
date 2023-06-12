import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import { Root, ErrorPage, Register, Create } from "./routes/index";
import { RequireAuth } from "./components/requireAuth";
import { Todo } from "./routes/todo";
import { Edit } from "./routes/edit";

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
  },
  {
    path: "/edit-task/:id",
    element: <RequireAuth><Edit /></RequireAuth>,
  },
  {
    path: "/create",
    element: <RequireAuth><Create /></RequireAuth>,
  }
])

function App() {
  return (
    <RouterProvider router={router} />
  );
}
export default App;
