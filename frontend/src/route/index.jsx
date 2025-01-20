import React, {useLayoutEffect} from "react";
import {Navigate, Route, Routes, useLocation} from "react-router-dom";
import Layout from "../layout";
import LayoutNoSidebar from "../layout/NoSidebar"
import {APICore} from "../utils/api/APICore";
import {protectedRoutes, publicRoutes} from "./Routes";

const Router = ({...props }) => {
    const api = new APICore();
    const location = useLocation();
    useLayoutEffect(() => {
        window.scrollTo(0, 0);
    }, [location]);

    return (
        <React.Fragment>
            <Routes>
                <Route>
                    {publicRoutes.map((route, idx) => (
                        <Route key={idx} path={route.path} element={
                            <LayoutNoSidebar {...props}>
                                {route.element}
                            </LayoutNoSidebar>
                        }/>
                    ))}
                </Route>
                <Route>
                    {protectedRoutes.map((route, idx)  => (
                        <Route key={idx} path={route.path} element={
                            api.isUserAuthenticated() === false
                                ? (<Navigate to={{pathname: '/auth/masuk'}}/>)
                                : (<Layout {...props}>{route.element}</Layout>)
                        }/>
                    ))}
                </Route>
            </Routes>
        </React.Fragment>
    )
}

export default Router;