import React from 'react';
import {Route, Switch} from "react-router-dom";
import {HomePage} from "../components/HomePage";
import {Navigation} from "../components/Navigation";
import {Requests} from "../components/Requests";
import {SingleRequest} from "../components/SingleRequest";
import {Configuration} from "../components/Configuration";

function App() {
    return (
        <>
            <Navigation appname="Xeroxi Management"/>
            <Switch>
                <Route exact path="/" component={HomePage}/>
                <Route path="/requests" component={Requests}/>
                <Route path="/request/:id" component={SingleRequest}/>
                <Route path="/config" component={Configuration}/>
            </Switch>
        </>
    );
}

export default App;
