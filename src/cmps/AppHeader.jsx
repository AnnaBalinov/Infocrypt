import { NavLink } from "react-router-dom"
import { useState } from 'react'

export function AppHeader() {

    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const toggleModal = () => {
        setIsMenuOpen(current => !current)
    }
    
    return (
        <header className="app-header">
            <section className="container">
                <NavLink activeClassName="my-active" exact to='/'>
                    <div className="logo-container">
                        <div className="logo-img">
                            <img src={require(`../assets/img/crypto-logo-header.png`)} alt="logo" />
                        </div>
                    </div>
                </NavLink>
                <nav className="main-nav">
                    <NavLink activeClassName="my-active" exact to='/'>Home</NavLink>
                    <NavLink activeClassName="my-active" to='/contact/'>Contacts</NavLink>
                    <NavLink activeClassName="my-active" to='/cryptoInfo/'>Crypto</NavLink>
                </nav>

                <div className="menu-bar" onClick={toggleModal}>
                    {
                        isMenuOpen ?
                            <span className="material-icons">close</span>
                            :
                            <span className="material-icons">menu</span>
                    }
                </div>
                {
                    isMenuOpen ?
                        <div className="small-screen-nav-container">
                            <nav className="small-screen-nav">
                                <NavLink onClick={toggleModal} activeClassName="my-active" exact to='/'>Home</NavLink>
                                <NavLink onClick={toggleModal} activeClassName="my-active" to='/contact/'>Contacts</NavLink>
                                <NavLink onClick={toggleModal} activeClassName="my-active" to='/cryptoInfo/'>Crypto</NavLink>
                            </nav>
                        </div>
                        :
                        null
                }
            </section>
        </header>
    )
}
