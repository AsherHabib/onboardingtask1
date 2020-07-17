import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import {Navbar, Nav} from 'react-bootstrap';

export class Navigation extends Component{
    render(){
        return(
            <Navbar bg="dark" expand = "lg">
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id = "basic-navbar-nav">
                    <Nav>
                        <NavLink className="d-inline p-2 bg-dark text-white"
                        to="/">React</NavLink>
                        <NavLink className="d-inline p-2 bg-dark text-white"
                        to="/customer">Customers</NavLink>
                        <NavLink className="d-inline p-2 bg-dark text-white"
                        to="/product">Products</NavLink>
                        <NavLink className="d-inline p-2 bg-dark text-white"
                        to="/store">Stores</NavLink>
                        <NavLink className="d-inline p-2 bg-dark text-white"
                        to="/sales">Sales</NavLink>
                    </Nav>
                </Navbar.Collapse>
                
            </Navbar>
        )
    }
}