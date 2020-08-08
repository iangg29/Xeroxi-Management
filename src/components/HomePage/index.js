import React, {Component} from 'react';
import {Footer} from "../Footer";
import {Cards} from "../Cards";

export class HomePage extends Component {

    render() {
        return (
            <>
                <div className="w-full text-center py-10">
                    <h1 className="font-bold text-xl mb-10">Bienvenido, Ian.</h1>
                    <div className="flex flex-col md:flex-row">
                        <div className="w-full md:w-1/2 mb-10 md:mb-0">
                            <Cards/>
                        </div>
                        <div className="w-full md:w-1/2">
                            Card Example //TODO
                        </div>
                    </div>
                </div>
                <Footer sticky={true}/>
            </>
        );
    }
}
