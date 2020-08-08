import React, {Component} from "react";
import {Footer} from "../Footer";
import axios from "axios";

export class Configuration extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            pageEnabled: null
        }
        this.enabledInput = React.createRef();
    }

    handleChange = e => {
        if (e.target.checked) {
            if (!this.state.pageEnabled) {
                try {
                    axios.put('http://api.xeroxi.com/api/config/2', {open: 1});
                } catch (e) {
                    console.error('[API-Fetch]', e);
                }
            }
        } else {
            if (this.state.pageEnabled) {
                try {
                    axios.put('http://api.xeroxi.com/api/config/2', {open: 0});
                } catch (e) {
                    console.error('[API-Fetch]', e);
                }
            }
        }
    }

    getConfig = () => {
        try {
            this.setState({isLoading: true});
            axios.get('http://api.xeroxi.com/api/config').then(res => {
                this.setState({
                    pageEnabled: (res.data[0].open === 1),
                    isLoading: false
                });
                this.enabledInput.current.checked = (res.data[0].open === 1);
            });
        } catch (e) {
            console.log(e);
        }
    }

    componentDidMount() {
        this.getConfig();
    }

    render() {
        return (
            <>
                <div className="w-full p-10">
                    <h1 className="font-bold text-center tracking-wider">Xeroxi Informática | Configuration</h1>
                    <div className="w-full p-10">
                        {this.state.isLoading && <h1>Loading ...</h1>}
                        {!this.state.isLoading &&
                        <div>
                            <input type="checkbox" onChange={this.handleChange} ref={this.enabledInput} id="pageEnabled"
                                   name="vepageEnabledhicle1"
                                   value="pageEnabled"/><label htmlFor="pageEnabled">Website enabled</label>
                            <input type="hidden" name="_method" value="PUT"/>
                        </div>
                        }
                    </div>
                </div>
                <Footer sticky={true}/>
            </>
        );
    }
}
