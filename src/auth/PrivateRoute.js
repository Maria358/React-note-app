import {AuthContext} from "./AuthProvider";
import {useContext} from "react";
import {Route, Redirect } from "react-router-dom";

const PrivateRoute = ({component: RouteComponent, ...rest}) => {
    const {currentUser} = useContext(AuthContext)

    return(
        <Route
            {...rest}
            render={routeProps =>
                !!currentUser ? (
                    <RouteComponent {...routeProps} />
                ) : (
                    <Redirect to={"/signIn"} />
                )
            }
        />
    )
}
export default PrivateRoute;