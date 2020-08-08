import React, {Component} from 'react';
import {Footer} from "../Footer";
import axios from "axios";
import Swal from "sweetalert2";

var moment = require('moment-timezone');


export class SingleRequest extends Component {

    constructor(props) {
        super(props);
        this.state = {
            request: [],
            isLoading: false,
            id: this.props.match.params.id
        }
    }

    //this.props.match.params.id

    componentDidMount() {
        this.getRequest(this.state.id);
    }

    toTimeZone = (time) => {
        const format = 'DD/MM/YYYY HH:mm:ss';
        const date = new Date(time);
        let created = {
            year: date.getFullYear(),
            month: date.getMonth(),
            day: date.getDate(),
            hour: date.getHours(),
            minutes: date.getMinutes(),
            seconds: date.getSeconds()
        }
        return moment(created).tz("America/Mexico_City").format(format);
    }

    async getRequest(id) {
        try {
            this.setState({isLoading: true});
            axios.get(`http://api.xeroxi.com/api/requests/${id}`).then(res => {
                const request = res.data;
                this.setState({
                    request: request,
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

    payNow = (e) => {
        e.preventDefault();
        try {
            axios.put(`http://api.xeroxi.com/api/requests/${this.state.request.id}`, {payed: 1}).then(() => {
                Swal.fire({
                    title: '¡Pagado!',
                    text: `El proyecto con ID:${this.state.request.id}, ha sido pagado.`,
                    icon: 'success',
                    confirmButtonColor: '#434190'
                });
            });
        } catch (e) {
            console.error('[API-Fetch]', e);
        }
    }

    completeNow = e => {
        e.preventDefault();
        try {
            axios.put(`http://api.xeroxi.com/api/requests/${this.state.request.id}`, {completed: 1}).then(() => {
                Swal.fire({
                    title: '¡Completado!',
                    text: `El proyecto con ID:${this.state.request.id}, ha sido completado.`,
                    icon: 'success',
                    confirmButtonColor: '#434190'
                });
            }).catch(e => {
                Swal.fire({
                    title: '¡Error!',
                    text: e,
                    icon: 'error',
                    confirmButtonColor: '#434190'
                });
            });
        } catch (e) {
            console.error('[API-Fetch]', e);
        }
    }

    render() {
        return (
            <>
                <div className="w-full py-10 px-10 md:px-20 relative">
                    <div className="flex flex-col text-center">
                        <h1 className="text-center font-bold uppercase tracking-widest text-xl pb-5">Solicitud
                            [ID: {this.state.id}]
                        </h1>
                        {!this.state.isLoading &&
                        <h4 className="text-sm text-gray-500 text-center pb-5">Creado
                            el: {this.toTimeZone(this.state.request.created_at)}</h4>
                        }
                        {(this.state.request.completed === 0 && <p className="border-b border-solid border-gray-300 pb-5"><span
                            className="uppercase bg-teal-700 text-white text-xs px-8 py-2 rounded-lg ml-2">Sin completar</span><br/><button onClick={this.completeNow} className="text-blue-500 mt-5 text-sm hover:underline">Terminar proyecto</button></p>)}
                        {(this.state.request.completed === 1 && <p className="border-b border-solid border-gray-300 pb-5"><span
                            className="uppercase bg-purple-700 text-white text-xs px-8 py-2 rounded-lg ml-2">Completado</span></p>)}
                        {this.state.isLoading && <h1 className="font-bold text-lg text-center">Loading...</h1>}
                    </div>
                    <div className="flex flex-col md:flex-row">
                        <div className="w-full md:w-1/2">
                            <p className="my-10"><b>Paquete:</b> <span
                                className="uppercase bg-indigo-800 text-white text-xs px-8 py-2 rounded-lg ml-2">{this.state.request.type}</span>
                            </p>
                            <p className="my-10"><b>Email:</b> <a
                                href={`mailto:${this.state.request.email}`}>{this.state.request.email}</a></p>
                            <p className="my-10"><b>Nombre del negocio:</b> {this.state.request.nombre}</p>
                            <p className="my-10"><b>Audiencia:</b> {this.state.request.audiencia}</p>
                            <p className="my-10"><b>Objetivos:</b> {this.state.request.objetivos}</p>
                            <p className="my-10"><b>Logotipo:</b></p>
                            <a target="_blank" href={this.state.request.logotipo}><img style={{maxHeight: 300}}
                                                                                       src={this.state.request.logotipo}
                                                                                       alt={this.state.request.nombre}/></a>
                            <p className="my-10"><b>Descripción:</b> {this.state.request.descripcion}</p>
                            <p className="my-10"><b>Misión:</b> {this.state.request.mision}</p>
                            <p className="my-10"><b>Vision:</b> {this.state.request.vision}</p>
                            <p className="my-10"><b>Valores:</b> {this.state.request.valores}</p>
                        </div>
                        <div className="w-full md:w-1/2">
                            <div>
                                {(this.state.request.payed === 0) && <p className="my-10"><span
                                    className="uppercase bg-red-700 text-white text-xs px-8 py-2 rounded-lg ml-2">Sin pagar</span>
                                    <button onClick={this.payNow}
                                            className="text-xs font-bold px-8 py-2 ml-2 hover:underline">Pagar
                                        ahora
                                    </button>
                                </p>}
                                {(this.state.request.payed === 1) && <p className="my-10"><span
                                    className="uppercase bg-green-700 text-white text-xs px-8 py-2 rounded-lg ml-2">Pagado</span>
                                </p>}
                            </div>
                            <p className="my-10"><b>Imágenes:</b> {(!this.state.request.imagenes) ? 'Sin imágenes' :
                                <a className="text-blue-500 hover:underline"
                                   href={this.state.request.imagenes}>Descargar</a>}</p>
                            <p className="my-10"><b>Spot:</b> {this.state.request.spot}</p>
                            <p className="my-10"><b>Organigrama:</b></p>
                            <a target="_blank" href={this.state.request.organigrama}><img style={{maxHeight: 300}}
                                                                                          src={this.state.request.organigrama}
                                                                                          alt={this.state.request.nombre}/></a>
                            <p className="my-10"><b>Colores:</b> {this.state.request.colores}</p>
                            <p className="my-10"><b>Tipografía:</b> {this.state.request.tipografia}</p>
                            <p className="my-10"><b>Boceto:</b></p>
                            <a target="_blank" href={this.state.request.boceto}><img style={{maxHeight: 300}}
                                                                                     src={this.state.request.boceto}
                                                                                     alt={this.state.request.nombre}/></a>
                        </div>
                    </div>
                </div>
                <Footer sticky={false}/>
            </>
        );
    }
}
