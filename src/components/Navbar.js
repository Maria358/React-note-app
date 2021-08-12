import {NavLink} from "react-router-dom";
import app from "../context/firebase/base";
import {useState} from "react";

export const Navbar = () => {
    const [disabled, setDisabled] = useState(false)

    return(
        <nav className="navbar navbar-dark navbar-expand-lg bg-secondary">
            <div className="container-fluid">
                <span className="navbar-brand ">Todo app</span>
                <div className="collapse navbar-collapse px-2">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <NavLink className="nav-link active" to={'/'}>Home</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to={'/about'}>About</NavLink>
                        </li>
                    </ul>
                </div>
                <form className="d-flex ">
                    <input className="form-control me-2"
                           type="search" placeholder="Search"
                           aria-label="Search"
                    />
                    <button className="btn btn-success m-2" type="submit">Search</button>
                </form>
                <button className="btn btn-warning" onClick={() => app.auth().signOut() }>Sign out</button>
            </div>
            {/*<Search/>*/}
        </nav>
    )
}