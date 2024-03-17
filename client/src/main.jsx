import React from 'react';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ReactDOM from 'react-dom';
import { ChakraProvider } from '@chakra-ui/react';
import { createStandaloneToast } from '@chakra-ui/toast';
import Login from "./components/login/Login";
import Signup from "./components/signup/Signup";
import { RequestDetails } from "./components/feedback/RequestDetails";
import AuthProvider from "./components/context/AuthContext";
import ProtectedRoute from "./components/shared/ProtectedRoute";
import Specks from './Dashboard';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';


const { ToastContainer } = createStandaloneToast();

const App = () => {
    const router = createBrowserRouter([
        { path: "/", element: <Login /> },
        { path: "/signup", element: <Signup /> },
        { path: "s/:code", element: <RequestDetails /> },
        { path: "s/:code/:id", element: <RequestDetails /> },
        //{ path: "dashboard", element:  <Specks />}
        { path: "dashboard", element: <ProtectedRoute> <Specks /> </ProtectedRoute> }
    ]);

    return (
        <React.StrictMode>
            <ChakraProvider>
                <AuthProvider>
                    <RouterProvider router={router}>
                    </RouterProvider>
                    <ToastContainer />
                </AuthProvider>
            </ChakraProvider>
        </React.StrictMode>
    );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);