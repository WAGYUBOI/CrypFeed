import DetailPage from './pages/detail';
import FavPage from './pages/favorites';
import HomePage from './pages/home';
import React from "react";
import { createBrowserRouter, RouterProvider, } from "react-router-dom";

function App() {
    const router = createBrowserRouter([
        {
            path: "/",
            element: <HomePage />,
        },
        {
            path: "/detail/:coinUuid",
            element: <DetailPage />,
        },
        {
            path: "/fav",
            element: <FavPage />,
        },
    ]);

    return (
        <div>
            <RouterProvider router={router} />
        </div>
    )
}

export default App