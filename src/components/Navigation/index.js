import React, {Component} from 'react';
import {NavLink} from "react-router-dom";

export class Navigation extends Component {
    render() {
        return (
            <header
                className="lg:px-16 px-6 bg-white flex flex-wrap items-center md:py-4 py-6 border-b border-gray-200 border-solid">
                <div className="flex-1 flex justify-between items-center font-bold text-lg">
                    <NavLink exact to="/" className="text-gradient">{this.props.appname}</NavLink>
                </div>
                <label htmlFor="menu-toggle" className="cursor-pointer lg:hidden block">
                    <svg className="fill-current text-gray-900" xmlns="http://www.w3.org/2000/svg" width="20"
                         height="20" viewBox="0 0 20 20"><title>menu</title>
                        <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
                    </svg>
                </label>
                <input type="checkbox" className="hidden" id="menu-toggle"/>
                <div className="hidden lg:flex lg:items-center lg:w-auto w-full" id="menu">
                    <nav>
                        <ul className="lg:flex items-center justify-between text-base text-gray-900 pt-4 lg:pt-0">
                            <li>
                                <NavLink className="lg:p-4 py-3 px-0 block border-b-2 border-transparent" exact to="/" activeStyle={{fontWeight: "bold", color: "#090979" }}>
                                    Inicio
                                </NavLink>
                            </li>
                            <li>
                                <NavLink className="lg:p-4 py-3 px-0 block border-b-2 border-transparent" exact to="/requests" activeStyle={{fontWeight: "bold", color: "#090979" }}>
                                    Solicitudes
                                </NavLink>
                            </li>
                            <li>
                                <NavLink className="lg:p-4 py-3 px-0 block border-b-2 border-transparent" exact to="/config" activeStyle={{fontWeight: "bold", color: "#090979" }}>
                                    Configuración
                                </NavLink>
                            </li>
                        </ul>
                    </nav>
                </div>
            </header>
        );
    }
}
