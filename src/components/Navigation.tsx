import React, { FC, useState } from "react"
import { Nav, Navbar } from "react-bootstrap"
import { useAuth } from "../context/AuthContext";
import LogIn from "../pages/LogIn";


const Navigation: FC = () => {
    
    const { token, username, logout } = useAuth();
    const [ showLogin, setShowLogin] = useState(false)
    
    
    return (
        <>
            <Navbar bg="light" expand="lg">
                <Navbar.Brand href="/" className="mx-2">Tnx Kalimba Tabs</Navbar.Brand>

                <Nav className="ms-auto">
                    { !token ? 
                        <Navbar>
                            <Nav.Link href='# ' className="mx-2" onClick={() => setShowLogin(true)}>
                                Sign In
                            </Nav.Link>
                        </Navbar> 
                        : 
                        <Navbar>
                            <Navbar.Text>
                                {username}
                            </Navbar.Text>
                            <Nav.Link href='# ' className="mx-2" onClick={logout}>
                                Log out
                            </Nav.Link>
                        </Navbar> 
                    }
                </Nav>
            </Navbar>
            { showLogin ? <LogIn onLogin={() => setShowLogin(false) } /> : ''} 
        </>
    )
}

export default Navigation