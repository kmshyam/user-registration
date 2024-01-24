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
import EditUserRegistration from "./components/Admin/MainSection/UserRegistration/EditUserRegistration/EditUserRegistration";
import EditPersonalInformation from "./components/Admin/MainSection/UserRegistration/EditUserRegistration/EditPersonalInformation/EditPersonalInformation";
import EditBoardingInformation from "./components/Admin/MainSection/UserRegistration/EditUserRegistration/EditBoardingInformation/EditBoardingInformation";
import EditLocationInformation from "./components/Admin/MainSection/UserRegistration/EditUserRegistration/EditLocationInformation/EditLocationInformation";
import EditDocuments from "./components/Admin/MainSection/UserRegistration/EditUserRegistration/EditDocuments/EditDocuments";

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
          path: "/user/registration/edit",
          element: <EditUserRegistration />,
          children: [
            {
              path: "personal_info",
              element: <EditPersonalInformation />,
            },
            {
              path: "boarding_info",
              element: <EditBoardingInformation />,
            },
            {
              path: "location_info",
              element: <EditLocationInformation />,
            },
            {
              path: "documents",
              element: <EditDocuments />,
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
