import './App.css';
import {Switch, Route} from "react-router-dom";
import {Home} from "./pages/Home";
import {About} from "./pages/About";
import {Navbar} from "./components/Navbar";
import {Alert} from "./components/Alert";
import Login, {SignIn} from "./auth/Login";
import SignUp from "./auth/SignUp";
import PrivateRoute from "./auth/PrivateRoute";


function App() {
    return (
        <div className="App">
            <Navbar/>
            <div className="container pt-4">
                <Alert/>
                <Switch>
                    <PrivateRoute path={'/'} exact component={Home}/>
                    <Route path={'/about'} component={About}/>
                    <Route exact path={'/signIn'} component={SignIn}/>
                    <Route exact path={'/signUp'} component={SignUp}/>
                </Switch>
            </div>
        </div>


    );
}

export default App;
