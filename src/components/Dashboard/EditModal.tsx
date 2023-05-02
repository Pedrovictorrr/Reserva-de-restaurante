'use client'

import React from "react";
import axios from 'axios';
import { useCookies } from "react-cookie";
import ErroModal from './ModalErro';



interface Props {
    show: boolean;
    user?: {
      id: number;
      Name: string;
      Sobrenome:string;
      Email: string;
      Observacao: string;
      Data: string;
      Hora: string;
      QTD_Pessoas: number;
      User_id: number;
      Mesa_id: number;
      Status: number;
      Telefone: string;
      created_at: string;
      updated_at: string;
    };
    handleCloseModal: () => void;
  }
interface DiaSelecionado {
    [key: string]: {
        total_reservas: number;
        status: string;
    };
}

// ...

function EditModal(props: Props) {
    
    const [cookies] = useCookies(['token']);
    const [diaSelecionado, setDiaSelecionado] = React.useState<DiaSelecionado>({});
    const [MensagemErro, setMensagemErro] = React.useState('');
    const [ErrorModal, setErrorModal] = React.useState(false);
    const [selectedDate, setSelectedDate] = React.useState('');
    const [formData, setFormData] = React.useState({
        id: '0',
        Nome: '',
        Sobrenome:'',
        Email: '',
        Observacao: '',
        Data: '',
        Hora: '',
        QTD_Pessoas: '0',
        User_id: '0',
        Mesa_id: '0',
        Status: '0',
        Telefone: '',
        created_at: '',
        updated_at: '',
    });
    function handleErrorCloseModal() {
        setErrorModal(false)
    }

    function handleDateChange(event: React.ChangeEvent<HTMLInputElement>) {
        const selectedDate = new Date(event.target.value);
        const dayOfWeek = selectedDate.getDay();

        if (dayOfWeek === 6) {
            setMensagemErro('Por favor, selecione uma data entre segunda e sabado.');
            setErrorModal(true)

        } else {
            setSelectedDate(event.target.value);
        }
    }
    async function fetchReservas(event: React.ChangeEvent<HTMLInputElement>) {
        try {
            handleDateChange(event);
            const response = await fetch('http://18.230.194.84/api/showReservasHrs', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${cookies.token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    dia: event.target.value,
                }),
            });
            const data = await response.json();
            setDiaSelecionado(data); // aqui você pode lidar com a resposta da API
        } catch (error) {

            console.error(error);
        }
    }
    function handleChange(event: React.ChangeEvent<HTMLSelectElement> | React.ChangeEvent<HTMLInputElement>, field: string) {
        setFormData((prevFormData) => ({
            ...prevFormData,
            [field]: event.target.value,
        }));
        fetchReservas;
    };
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>, id?: number) => {
        event.preventDefault();
        axios.post(`http://127.0.0.1:8000/api/reserva/update/${props.user?.id}`, formData, {
            headers: {
                Authorization: `Bearer ${cookies.token}`
            }
        })
            .then(response => {
                props.handleCloseModal()
                setFormData({
                    id: '',
                    Nome: '',
                    Sobrenome:'',
                    Email: '',
                    Observacao: '',
                    Data: '',
                    Hora: '',
                    QTD_Pessoas: '',
                    User_id: '',
                    Mesa_id: '',
                    Status: '',
                    Telefone: '',
                    created_at: '',
                    updated_at: '',
                });
            })
            .catch(error => {
                console.log(error);
            });
    };
    return (
        <div>
            {props.show ? (

                <>
                    <div
                        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                    >
                        <div className="relative w-1/2 my-6 mx-auto max-w-3xl">
                            {/*content*/}
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                {/*header*/}
                                <div className="flex items-center text-center justify-center p-5 border-b border-solid border-slate-200 rounded-t">
                                    <h3 className="text-3xl text-center  font-semibold">
                                        {props.user?.Name}
                                    </h3>
                                    <button
                                        className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                        onClick={props.handleCloseModal}
                                    >
                                        <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                                            ×
                                        </span>
                                    </button>
                                </div>
                                {/*body*/}
                                <div className="relative p-6 flex-auto">
                                    <form onSubmit={handleSubmit}>

                                        <div className="grid gap-6 mb-6 md:grid-cols-2">
                                            <div>
                                                <label className="block mb-2 text-sm font-medium text-gray-900 -text-white">Quantidade de pessoas</label>
                                                <select
                                                    id="QTDPessoas"
                                                    value={formData.QTD_Pessoas}
                                                    onChange={(event) => handleChange(event, "QTD_Pessoas")}
                                                    name='QTDPessoas'
                                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 -bg-gray-700 -border-gray-600 -placeholder-gray-400 -text-white -focus:ring-blue-500 -focus:border-blue-500">
                                                
                                                    <option value="1">1</option>
                                                    <option value="2">2</option>
                                                    <option value="3">3</option>
                                                    <option value="4">4</option>
                                                </select></div>
                                            <div>
                                                <label className="block mb-2 text-sm font-medium text-gray-900 -text-white">Data</label>

                                                <input
                                                    id="Data"
                                                    type='date'
                                                    name='Data'
                                                    value={formData.Data}
                                                    onChangeCapture={fetchReservas}
                                                    onChange={(event) => handleChange(event, "Data")}
                                                    placeholder={props.user?.Data}
                                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 -bg-gray-700 -border-gray-600 -placeholder-gray-400 -text-white -focus:ring-blue-500 -focus:border-blue-500" required>
                                                </input></div>
                                            <div>
                                                <label className="block mb-2 text-sm font-medium text-gray-900 -text-white">Nome</label>
                                                <input
                                                    value={formData.Nome}
                                                    onChange={(event) => handleChange(event, "Nome")}
                                                    type="text"
                                                    id="Nome"
                                                    name='Nome'
                                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 -bg-gray-700 -border-gray-600 -placeholder-gray-400 -text-white -focus:ring-blue-500 -focus:border-blue-500" placeholder={props.user?.Name} required />
                                            </div>
                                            <div>
                                                <label className="block mb-2 text-sm font-medium text-gray-900 -text-white">Sobrenome</label>
                                                <input
                                                    value={formData.Sobrenome}
                                                    onChange={(event) => handleChange(event, "Sobrenome")}
                                                    type="text"
                                                    id="Sobrenome"
                                                    name='Sobrenome'
                                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 -bg-gray-700 -border-gray-600 -placeholder-gray-400 -text-white -focus:ring-blue-500 -focus:border-blue-500" placeholder={props.user?.Sobrenome} required />
                                            </div>

                                        </div>
                                        <div className="grid gap-6 mb-6 md:grid-cols-2">
                                            <div>
                                                <label className="block mb-2 text-sm font-medium text-gray-900 -text-white">Email</label>
                                                <input
                                                    value={formData.Email}
                                                    onChange={(event) => handleChange(event, "Email")}
                                                    type="Email"
                                                    id="telefone"
                                                    name='Telefone'
                                                    placeholder={props.user?.Email}
                                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 -bg-gray-700 -border-gray-600 -placeholder-gray-400 -text-white -focus:ring-blue-500 -focus:border-blue-500" required />
                                            </div>
                                            <div>
                                                <label className="block mb-2 text-sm font-medium text-gray-900 -text-white">Status</label>
                                                <select value={formData.Status}
                                                    onChange={(event) => handleChange(event, "Status")} id="Status" name='Status' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 -bg-gray-700 -border-gray-600 -placeholder-gray-400 -text-white -focus:ring-blue-500 -focus:border-blue-500" required>

                                                    <option value="1" className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                                                        Check-in
                                                    </option>

                                                    <option value="2" className="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/20">
                                                        Check-out
                                                    </option>

                                                    <option value="3" className="inline-flex items-center rounded-md bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-700 ring-1 ring-inset ring-yellow-600/20">
                                                        Em andamento
                                                    </option>
                                                </select></div>
                                        </div>
                                        <div className="grid gap-6 mb-6 md:grid-cols-2">
                                            <div>
                                                <label className="block mb-2 text-sm font-medium text-gray-900 -text-white">Telefone</label>
                                                <input
                                                    value={formData.Telefone}
                                                    onChange={(event) => handleChange(event, "Telefone")}
                                                    type="tel"
                                                    id="telefone"
                                                    name='Telefone'
                                                    placeholder={props.user?.Telefone}
                                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 -bg-gray-700 -border-gray-600 -placeholder-gray-400 -text-white -focus:ring-blue-500 -focus:border-blue-500" required />
                                            </div>
                                            <div>
                                                <label className="block mb-2 text-sm font-medium text-gray-900 -text-white">Hora</label>
                                                <select
                                                    value={formData.Hora}
                                                    onChange={(event) => handleChange(event, "Hora")}
                                                    id="Hora"
                                                    name="Hora"
                                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 -bg-gray-700 -border-gray-600 -placeholder-gray-400 -text-white -focus:ring-blue-500 -focus:border-blue-500"
                                                    required
                                                >
                                                    {Object.keys(diaSelecionado).map((hora: keyof typeof diaSelecionado, index: number) => (
                                                        <>
                                                            {diaSelecionado[hora].total_reservas >= 15 ? (
                                                                <option value={hora} disabled>{hora} - Total de reservas: {diaSelecionado[hora].total_reservas} - {diaSelecionado[hora].status}</option>
                                                            ) : (
                                                                <option value={hora}>{hora} - Total de reservas: {diaSelecionado[hora].total_reservas} - {diaSelecionado[hora].status}</option>
                                                            )}
                                                        </>
                                                    ))}
                                                </select>

                                            </div>
                                        </div>
                                        <div>
                                            <label className="block mb-2 text-sm font-medium text-gray-900 -text-white">Observação</label>
                                            <input value={formData.Observacao}
                                                onChange={(event) => handleChange(event, "Observacao")} type="text" id="message" name='Observacao'  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 -bg-gray-700 -border-gray-600 -placeholder-gray-400 -text-white -focus:ring-blue-500 -focus:border-blue-500" placeholder={props.user?.Observacao} required></input>
                                        </div>
                                        <div className='mt-5'>
                                            <button type="submit" className="text-white  bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-full px-5 py-2.5 text-center -bg-blue-600 -hover:bg-blue-700 -focus:ring-blue-800">Enviar</button>
                                        </div>
                                    </form>
                                </div>
                                {/*footer*/}
                                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                                    <button
                                        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="button"
                                        onClick={props.handleCloseModal}
                                    >
                                        Close
                                    </button>

                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                    <ErroModal show={ErrorModal} mensagem={MensagemErro} handleCloseModal={handleErrorCloseModal} />
                </>
            ) : null}
        </div>
    );
}

export default EditModal;