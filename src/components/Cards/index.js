import React, {Component} from 'react';
import axios from 'axios';

export class Cards extends Component {

    constructor(props) {
        super(props);
        this.state = {
            requests: 0,
            isLoading: false
        }
    }

    componentDidMount() {
        this.getRequestNumber();
    }

    async getRequestNumber() {
        try {
            this.setState({isLoading: true});
            axios.get('http://api.xeroxi.com/api/requests').then(res => {
                this.setState({
                    requests: res.data.length,
                    isLoading: false
                });
            }).catch(e => {
                console.error("[FETCH-API]", e);
            });
        } catch (e) {
            console.error("[FETCH-API]", e);
        }
    }

    render() {
        return (
            <div className="flex flex-wrap mb-2 px-5 md:px-10">
                <div className="w-full md:w-1/2 pt-3 px-3 md:pr-2 mx-auto">
                    <div className="bg-gray-100 border rounded-lg shadow p-2">
                        <div className="flex flex-row items-center">
                            <div className="flex-shrink pl-1 pr-4">
                                <i className="fa fa-wallet fa-2x fa-fw fa-inverse"></i>
                            </div>
                            <div className="flex-1 text-right">
                                <h5 className="">Total Requests</h5>
                                <h3 className=" text-3xl">{this.state.requests}</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
