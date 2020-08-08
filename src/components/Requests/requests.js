import React, {Component} from 'react';
import axios from 'axios';

class Requests extends Component {

    constructor(props) {
        super(props);
        this.state = {
            requests: null,
            isLoading: false
        }
    }

    componentDidMount() {
        this.getRequests();
    }

    async getRequests() {
        if (!this.state.requests) {
            try {
                this.setState({isLoading: true});
                axios.get('http://api.xeroxi.com/api/requests').then(res => {
                    const requests = res.data;
                    this.setState({
                        requests: requests,
                        isLoading: false
                    })
                });
            } catch (e) {
                this.setState({isLoading: false});
                console.error('[API]', e);
            }
        }
    }

    render() {
        return (
            <div>
                {this.state.isLoading && <h1>Loading requests...</h1>}
                {this.state.requests &&
                <div>
                    <ul>
                        {this.state.requests.map(
                            request =>
                                <>
                                    <li key={request.id}>{request.email} <br/><img src={request.logotipo} alt={request.email} height="100px" width="20px"/></li>

                                </>
                        )}
                    </ul>
                </div>
                }
            </div>
        );
    }
}
