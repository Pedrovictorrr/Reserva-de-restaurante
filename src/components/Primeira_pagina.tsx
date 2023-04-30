'use client'
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import React from "react";
import { useCookies } from "react-cookie";
import axios from 'axios';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { addDays, isSunday } from "date-fns";
import SkelectonPrimeiraPagina from './SkelectonPrimeiraPagina';

type CadastrarFormData = {
  QTDPessoas: number,
  Data: string,
  Nome: string,
  Sobrenome: string,
  Email: string,
  Telefone: string,
  Hora: string,
  Observacao: string,
};


function First_page() {
  const router = useRouter();
  useEffect(() => {
    if (!cookies.token) {
      router.push('/');
    }
  }, []);
  const [cookies] = useCookies(['token']);
  const [laravelData, setLaravelData] = React.useState([]);
  const [LoadingStore, setIsLoadingStore] = React.useState(true);
  const [FormStore, setIsFormStore] = React.useState(false);
  const [Skelecton, setIsSkelecton] = React.useState(false);
  const [table, setIstable] = React.useState(true);

  useEffect(() => {
    fetchLaravelData()
  }, []);

  async function fetchLaravelData() {

    const response = await axios.get('http://127.0.0.1:8000/api/getLastReservas', {
      headers: {
        Authorization: `Bearer ${cookies.token}`
      }
    });
    setLaravelData(response.data);
    setIsSkelecton(true)
    setIstable(false)
  }

  const [diaSelecionado, setDiaSelecionado] = React.useState([]);

  async function fetchReservas(event) {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/showReservasHrs', {
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

      setDiaSelecionado(data);

      console.log(data); // aqui você pode lidar com a resposta da API
    } catch (error) {
      console.error(error);
    }
  }


  const [formData, setFormData] = React.useState({
    QTDPessoas: '1',
    Data: '',
    Nome: '',
    Sobrenome: '',
    Email: '',
    Telefone: '',
    Hora: '',
    Observacao: '',
  });

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    field: keyof CadastrarFormData
  ) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [field]: event.target.value,
    }));
    fetchReservas;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsFormStore(true)
    setIsLoadingStore(false)

    axios.post('http://127.0.0.1:8000/api/reserva/store', formData, {
      headers: {
        Authorization: `Bearer ${cookies.token}`
      }
    })
      .then(response => {
        console.log(response.data);
        fetchLaravelData();
        setIsFormStore(false)
        setIsLoadingStore(true)
        setFormData({
          QTDPessoas: '1',
          Data: '',
          Nome: '',
          Sobrenome: '',
          Email: '',
          Telefone: '',
          Hora: '',
          Observacao: '',
        });
      })
      .catch(error => {
        console.log(error);
        setIsFormStore(false)
        setIsLoadingStore(true)
        setFormData({
          QTDPessoas: '1',
          Data: '',
          Nome: '',
          Sobrenome: '',
          Email: '',
          Telefone: '',
          Hora: '',
          Observacao: '',
        });
      });
  };


  return (
    <>
      <div className="p-3 lg:mt-24 sm:p-10 gap-6 lg:flex lg:flex-row columns-1">
        <div className=" p-5 shadow basis-0 lg:basis-1/2 justify-center h-auto mb-4 rounded-xl bg-gray-50 dark:bg-gray-800">
          <h1 className='text-center  mb-4 text-2xl'>Cadastro de reserva</h1>
          <div hidden={LoadingStore} role="status" className="flex items-center justify-center">
            <svg hidden={LoadingStore} aria-hidden="true" className="w-36 h-36 mr-2 my-24 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" /><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" /></svg>
            <span className="sr-only">Loading...</span>
          </div>
          <form hidden={FormStore} onSubmit={handleSubmit}>
            <div className="grid gap-6 mb-6 md:grid-cols-2">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Quantidade de pessoas</label>
                <select
                  id="QTDPessoas"
                  value={formData.QTDPessoas}
                  onChange={(event) => handleChange(event, "QTDPessoas")}
                  name='QTDPessoas'
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                </select></div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Data</label>

                <input
                  id="Data"
                  type='date'
                  name='Data'
                  value={formData.Data}
                  onChangeCapture={fetchReservas}
                  onChange={(event) => handleChange(event, "Data")}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                </input></div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nome</label>
                <input
                  value={formData.Nome}
                  onChange={(event) => handleChange(event, "Nome")}
                  type="text"
                  id="Nome"
                  name='Nome'
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Fast" required />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Sobrenome</label>
                <input
                  value={formData.Sobrenome}
                  onChange={(event) => handleChange(event, "Sobrenome")}
                  type="text"
                  id="Sobrenome"
                  name='Sobrenome'
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Food" required />
              </div>

            </div>
            <div className="mb-6">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email address</label>
              <input
                value={formData.Email}
                onChange={(event) => handleChange(event, "Email")}
                type="email"
                id="email"
                name='Email'
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Exemplo@exemplo.com" required />
            </div>
            <div className="grid gap-6 mb-6 md:grid-cols-2">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Telefone</label>
                <input
                  value={formData.Telefone}
                  onChange={(event) => handleChange(event, "Telefone")}
                  type="tel"
                  id="telefone"
                  name='Telefone'
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Telefone" required />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Hora</label>
                <select value={formData.Hora}
                  onChange={(event) => handleChange(event, "Hora")} id="Hora" name='Hora' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
                  <option selected>
                    --:--
                  </option>
                  {Object.keys(diaSelecionado).map((hora) => (
                    <>
                      {diaSelecionado[hora].total_reservas >= 15 ? (
                        <option value={hora} disabled>{hora} - Total de reservas: {diaSelecionado[hora].total_reservas} - {diaSelecionado[hora].status}</option>
                      ) : (
                        <option value={hora}>{hora} - Total de reservas: {diaSelecionado[hora].total_reservas} - {diaSelecionado[hora].status}</option>
                      )}
                    </>
                  ))}
                </select></div>
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Observação</label>
              <textarea value={formData.Observacao}
                onChange={(event) => handleChange(event, "Observacao")} id="message" name='Observacao' rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Quero mais uma cadeira..." required></textarea>
            </div>
            <div className='mt-5'>
              <button type='submit' className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-500 to-pink-500 group-hover:from-purple-500 group-hover:to-pink-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800">
                <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0" >
                  Enviar
                </span>
              </button>
            </div>
          </form>


        </div>
        <div className="md:flex basis-0  xl:basis-1/2 shadow justify-center  mb-4 rounded-xl bg-gray-50 dark:bg-gray-800">
          <div className="relative overflow-x-auto w-full  sm:rounded-lg">
            <h1 className='text-center mt-3   mb-4 text-2xl'>Ultimas reservas</h1>
            <div hidden={Skelecton} >
               <SkelectonPrimeiraPagina />
            </div>
           
            <table hidden={table} className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Telefone
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Data
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Horario
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Status
                  </th>
                </tr>
              </thead>

              <tbody >

                {laravelData.map((data) => (
                  <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      {data.Name}
                    </th>
                    <td className="px-6 py-4">
                      {data.Telefone}
                    </td>
                    <td className="px-6 py-4">
                      {data.Data}
                    </td>
                    <td className="px-6 py-4">
                      {data.Hora}
                    </td>
                    <td className="px-6 py-4">
                      {data.Status === 1 ? (
                        <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                          Check-in
                        </span>
                      ) : data.Status === 2 ? (
                        <span className="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/20">
                          Check-out
                        </span>
                      ) : data.Status === 3 ? (
                        <span className="inline-flex items-center rounded-md bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-700 ring-1 ring-inset ring-yellow-600/20">
                          Em andamento
                        </span>
                      ) : (
                        <span className="inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-700 ring-1 ring-inset ring-gray-600/20">
                          Desconhecido
                        </span>
                      )}
                    </td>
                  </tr>))}

              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default First_page;