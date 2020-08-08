import React, {Component} from 'react';
import {Footer} from "../Footer";
import axios from "axios";
import {Link} from "react-router-dom";

export class Requests extends Component {

    constructor(props) {
        super(props);
        this.state = {
            requests: [],
            isLoading: false,
            empty: false
        }
    }

    componentDidMount() {
        this.getRequests();
    }

    getRequests = () => {
        try {
            this.setState({isLoading: true});
            axios.get('http://api.xeroxi.com/api/requests').then(res => {
                const requests = res.data;
                this.setState({
                    requests: requests,
                    isLoading: false
                })
            }).catch(e => {
                console.error("[Fetch-API]", e);
            });
        } catch (e) {
            this.setState({isLoading: false});
            console.error('[Fetch-API]', e);
        }
    }

    render() {
        return (
            <>
                <div className="w-full p-10">
                    <h1 className="text-center font-bold uppercase tracking-widest text-xl border-b border-solid border-gray-300 pb-10">Proyectos</h1>
                    <table className="border-collapse w-full my-5">
                        <thead>
                        <tr>
                            <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">
                                Nombre del negocio
                            </th>
                            <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">EMAIl</th>
                            <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">Status</th>
                            <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">Estado</th>
                            <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">Paquete</th>
                            <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">Acciones</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.state.requests.map( request =>
                            <tr key={request.id} className="bg-white lg:hover:bg-gray-100 flex lg:table-row flex-row lg:flex-row flex-wrap lg:flex-no-wrap mb-10 lg:mb-0">
                                <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static">
                                    <span
                                        className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">Nombre del negocio</span>
                                    {request.nombre}
                                </td>
                                <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b text-center block lg:table-cell relative lg:static">
                                    <span
                                        className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">Email</span>
                                    {request.email}
                                </td>
                                <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b text-center block lg:table-cell relative lg:static">
                                    <span
                                        className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">Status</span>
                                    {(request.payed === 0 ? <p><span className="rounded bg-red-700 py-1 px-3 text-white text-xs uppercase font-semibold">Sin pagar</span></p> : <span className="rounded text-white bg-green-700 py-1 px-3 text-xs uppercase font-semibold">PAGADO</span>)}
                                </td>
                                <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b text-center block lg:table-cell relative lg:static">
                                    <span
                                        className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">Estado</span>
                                    {(request.completed === 0 ? <p><span className="rounded bg-orange-700 py-1 px-3 text-white text-xs uppercase font-semibold">INCOMPLETO</span></p> : <span className="rounded text-white bg-teal-700 py-1 px-3 text-xs uppercase font-semibold">TERMINADO</span>)}
                                </td>
                                <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b text-center block lg:table-cell relative lg:static">
                                    <span
                                        className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">Estado</span>
                                    {(request.type === 'completo' && <p><span className="rounded bg-pink-700 py-1 px-3 text-white text-xs uppercase font-semibold">Completo</span></p>)}
                                    {(request.type === 'basico' && <p><span className="rounded bg-indigo-700 py-1 px-3 text-white text-xs uppercase font-semibold">Básico</span></p>)}
                                    {(request.type === 'personalizado' && <p><span className="rounded bg-yellow-700 py-1 px-3 text-white text-xs uppercase font-semibold">Personalizado</span></p>)}

                                </td>
                                <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b text-center block lg:table-cell relative lg:static">
                                    <span
                                        className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">Acciones</span>
                                    <Link to={'/request/'+request.id} className="text-blue-400 hover:text-blue-600 underline">Ver</Link>
                                </td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                    {this.state.isLoading && <h1 className="font-bold text-lg text-center">Loading...</h1>}
                </div>
                <Footer sticky={false}/>
            </>
        );
    }
}
