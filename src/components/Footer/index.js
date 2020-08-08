import React, {Component} from 'react';
import '../../assets/xeroxi.css';

export class Footer extends Component {

    render() {
        const data = <p>Copyright &copy; Xeroxi {new Date().getFullYear()}</p>;
        if (this.props.sticky) {
            return (
                <footer className="w-full gradient text-center text-white font-medium py-8 absolute bottom-0">
                    {data}
                </footer>
            );
        } else {
            return (
                <footer className="w-full gradient text-center text-white font-medium py-8 relative bottom-0">
                    {data}
                </footer>
            );
        }
    }
}
