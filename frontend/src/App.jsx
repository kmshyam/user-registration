import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import SigninForm from "./components/Auth/SigninForm";
import { checkAuthLoader } from "./components/Utils/auth";
import AuthContextProvider from "./store/AuthContext/AuthContextProvider";
import PageNotFound from "./components/UI/NotFound/PageNotFound";
import AdminMainNavigation from "./components/Admin/MainNavigation/AdminMainNavigation";
import Dashboard from "./components/Admin/MainSection/Dashboard/Dashboard";
import UserRegistration from "./components/Admin/MainSection/UserRegistration/UserRegistration";
import RegisteredUsers from "./components/Admin/MainSection/RegisteredUsers/RegisteredUsers";
import PersonalInformation from "./components/Admin/MainSection/UserRegistration/PersonalInformation/PersonalInformation";
import BoardingInformation from "./components/Admin/MainSection/UserRegistration/BoardingInformation/BoardingInformation";
import LocationInformation from "./components/Admin/MainSection/UserRegistration/LocationInformation/LocationInformation";
import Documents from "./components/Admin/MainSection/UserRegistration/Documents/Documents";
import UsersContextProvider from "./store/UsersContext/UserContextProvider";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <AdminMainNavigation />,
      loader: checkAuthLoader,
      children: [
        {
          path: "/dashboard",
          element: <Dashboard />,
        },
        {
          path: "/user/registration",
          element: <UserRegistration />,
          children: [
            {
              path: "personal_info",
              element: <PersonalInformation />,
            },
            {
              path: "boarding_info",
              element: <BoardingInformation />,
            },
            {
              path: "location_info",
              element: <LocationInformation />,
            },
            {
              path: "documents",
              element: <Documents />,
            },
          ],
        },
        {
          path: "/user/all",
          element: <RegisteredUsers />,
        },
      ],
    },
    {
      path: "/auth/signin",
      element: <SigninForm />,
    },
    {
      path: "*",
      element: <PageNotFound />,
    },
  ]);

  return (
    <AuthContextProvider>
      <UsersContextProvider>
        <RouterProvider router={router} />
      </UsersContextProvider>
    </AuthContextProvider>
  );
};

export default App;
