import React, {Component} from 'react';
import '../../assets/style.css';

export class Index extends Component {

    constructor(props) {
        super(props);

        this.usernameInput = React.createRef();
        this.passwordInput = React.createRef();
    }


    render() {
        return (
            <section className="h-screen w-screen gradient">
                <header
                    className="w-full text-center absolute tracking-wide text-white font-bold top-0 mt-20 text-3xl">
                    Xeroxi
                </header>
                <div className="container mx-auto h-full flex flex-col md:flex-row justify-center items-center">
                    <div className="w-1/3">
                        <h1 className="font-semibold mb-6 text-white text-center">Login | UCO Informática</h1>
                    </div>
                    <div className="border-blue-500 p-8 border-t-4 bg-white mt-10 md:mt-0 rounded-lg shadow-lg">
                        <form autoComplete="off" onSubmit={this.handleSubmit}>
                            <div className="mb-4">
                                <input className="focus:outline-none bg-gray-200 px-4 py-2 rounded-lg" id="username"
                                       placeholder="Username" ref={this.usernameInput} autoComplete="off"
                                       onChange={this.handleChange} type="text" name="username"
                                       required
                                       autoFocus/>
                            </div>
                            <div className="mb-4">
                                <input className="focus:outline-none bg-gray-200 px-4 py-2 rounded-lg" id="password"
                                       placeholder="Password" ref={this.passwordInput} autoComplete="off"
                                       onChange={this.handleChange} type="password" name="password"
                                       required/>
                            </div>
                            <div className="mb-4">
                                <button className="bg-blue-500 px-5 py-2 rounded-lg text-white">
                                    Login
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
                <footer
                    className="w-full text-center absolute tracking-wide mx-auto text-white font-normal bottom-0 mb-10 md:mb-20">
                    Copyright &copy; Xeroxi 2020
                </footer>
            </section>
        );
    }
}
