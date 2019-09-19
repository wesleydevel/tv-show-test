import React, {useState} from 'react'
import {
    Navbar,
    NavbarBrand,
    Collapse,
    Nav,
    NavItem,
    NavLink,
    NavbarToggler    
} from 'reactstrap'
import { Link } from 'react-router-dom'

const Header = () => {
    const [open, setOpen] = useState(false)
    const toggle = () => setOpen(!open)
    return(
        <Navbar color='light' light expand='md'>
            <div className='container'>
                <NavbarBrand tag={Link} to='/'>My Tv Shows</NavbarBrand>
                <NavbarToggler onClick={toggle}></NavbarToggler>
                <Collapse isOpen={open} navbar>
                    <Nav className='ml-auto' navbar>
                        <NavItem>
                            <NavLink tag={Link} to='/tv'>Tv Shows</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink tag={Link} to='/genres'>Genres</NavLink>
                        </NavItem>
                    </Nav>
                </Collapse>
            </div>
        </Navbar>
    )
}

export default Header