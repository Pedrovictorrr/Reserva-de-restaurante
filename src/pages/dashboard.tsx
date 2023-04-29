// pages/dashboard.tsx
'use client'
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import React from "react";
import { useCookies } from "react-cookie";
import axios from 'axios';
import { GetServerSideProps } from 'next';
import { parseCookies } from 'nookies';

interface Data {
  id: number;
  name: string;
  email: string;
}

  export default function Dashboard() {
    const [cookies] = useCookies(['token']);
    const [laravelData, setLaravelData] = React.useState([]);
  
    useEffect(() => {
      if (!cookies.token) {
        router.push('/');
      }
  
      async function fetchLaravelData() {
        const response = await axios.get('http://127.0.0.1:8000/api/getLastReservas', {
          headers: {
            Authorization: `Bearer ${cookies.token}`
          }
        });
        setLaravelData(response.data);
      }
  
      fetchLaravelData();
    }, []);



  const [Inicio, setIsInicio] = React.useState(true);
  const [Reserva, setIsReserva] = React.useState(false);
  const [Configuracao, setIsConfiguracao] = React.useState(false);
  const [Users, setIsUsers] = React.useState(false);
  const [BtnClick, setBtnClick] = React.useState("bg-blue-500");
  const router = useRouter();

  const MainComponent = () => {

    setIsInicio(true)
    setIsReserva(false)
    setIsConfiguracao(false)
    setIsUsers(false)
  };

  const ReservaComponent = () => {

    setIsInicio(false)
    setIsReserva(true)
    setIsConfiguracao(false)
    setIsUsers(false)
  };


  const ConfiguracaoComponent = () => {

    setIsInicio(false)
    setIsReserva(false)
    setIsConfiguracao(true)
    setIsUsers(false)
  };

  const UsersComponent = () => {

    setIsInicio(false)
    setIsReserva(false)
    setIsConfiguracao(false)
    setIsUsers(true)
  };



  return (
    <section>
      <button data-drawer-target="default-sidebar" data-drawer-toggle="default-sidebar" aria-controls="default-sidebar" type="button" className="inline-flex items-center p-2 mt-2 ml-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
        <span className="sr-only">Open sidebar</span>
        <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path clip-rule="evenodd" fill-rule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
        </svg>
      </button>

      <aside id="default-sidebar" className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform  -translate-x-full sm:translate-x-0" aria-label="Sidebar">
        <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
          <ul className="space-y-2 font-medium">
            <li>

              <button className="flex items-center  p-2 text-gray-900 rounded-lg ${BtnClick} dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700" onClick={MainComponent} >
                <svg aria-hidden="true" className="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path><path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path></svg>
                <span className="ml-3">Inicio</span>
              </button>
            </li>
            <li>
              <button className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700" onClick={ReservaComponent}>
                <svg aria-hidden="true" className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M5 4a3 3 0 00-3 3v6a3 3 0 003 3h10a3 3 0 003-3V7a3 3 0 00-3-3H5zm-1 9v-1h5v2H5a1 1 0 01-1-1zm7 1h4a1 1 0 001-1v-1h-5v2zm0-4h5V8h-5v2zM9 8H4v2h5V8z" clip-rule="evenodd"></path></svg>
                <span className="flex-1 ml-3 whitespace-nowrap">Reservas</span>
              </button>
            </li>
            <li>
              <button className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700" onClick={ConfiguracaoComponent}>
                <svg aria-hidden="true" className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path></svg>
                <span className="flex-1 ml-3 whitespace-nowrap">Configurações</span>

              </button>
            </li>

            <li>
              <button className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700" onClick={UsersComponent}>
                <svg aria-hidden="true" className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"></path></svg>
                <span className="flex-1 ml-3 whitespace-nowrap">Users</span>
              </button>
            </li>


            <li>
              <button className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                <svg aria-hidden="true" className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clip-rule="evenodd"></path></svg>
                <span className="flex-1 ml-3 whitespace-nowrap">Sair</span>
              </button>
            </li>

          </ul>
        </div>
      </aside>

      <div className="p-4 sm:ml-64">
        {Inicio ? (
          <>
            <div className="p-3 lg:mt-24 sm:p-10 gap-6 lg:flex lg:flex-row columns-1">



              <div className=" p-5 shadow basis-0 lg:basis-1/2 justify-center h-auto mb-4 rounded-xl bg-gray-50 dark:bg-gray-800">
                <h1 className='text-center  mb-4 text-2xl'>Cadastro de reserva</h1>
                <form>
                  <div className="grid gap-6 mb-6 md:grid-cols-2">
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Quantidade de pessoas</label>
                      <select id="QTDPessoas" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        <option selected>---------</option>
                        <option value="US">1</option>
                        <option value="CA">2</option>
                        <option value="FR">3</option>
                        <option value="DE">4</option>
                      </select></div>
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Data</label>
                      <select id="Data" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        <option selected>---------</option>
                        <option value="US">United States</option>
                        <option value="CA">Canada</option>
                        <option value="FR">France</option>
                        <option value="DE">Germany</option>
                      </select></div>
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nome</label>
                      <input type="text" id="Nome" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Fast" required />
                    </div>
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Telefone</label>
                      <input type="text" id="Sobrenome" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Food" pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}" required />
                    </div>

                  </div>
                  <div className="mb-6">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email address</label>
                    <input type="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Exemplo@exemplo.com" required />
                  </div>
                  <div className="grid gap-6 mb-6 md:grid-cols-2">
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nome</label>
                      <input type="tel" id="phone" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Telefone" required />
                    </div>
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Hora</label>
                      <select id="Hora" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        <option selected>--:--</option>
                        <option value="US">United States</option>
                        <option value="CA">Canada</option>
                        <option value="FR">France</option>
                        <option value="DE">Germany</option>
                      </select></div>
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Observação</label>
                    <textarea id="message" rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Quero mais uma cadeira..."></textarea>
                  </div>
                  <div className='mt-5'>
                    <button type="submit" className="text-white  bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-full px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Enviar</button>
                  </div>
                </form>


              </div>
              <div className="md:flex basis-0  xl:basis-1/2 shadow justify-center  mb-4 rounded-xl bg-gray-50 dark:bg-gray-800">
                <div className="relative overflow-x-auto w-full  sm:rounded-lg">
                  <h1 className='text-center mt-3   mb-4 text-2xl'>Ultimas reservas</h1>
                  <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                      <tr>
                        <th scope="col" className="px-6 py-3">
                          Name
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Mesa
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Telefone
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Data / Horario
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody>

                    {laravelData.map((data) => (
                      <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          {data.Name}
                        </th>
                        <td className="px-6 py-4">
                        {data.Mesa_id}
                        </td>
                        <td className="px-6 py-4">
                        {data.Data} / {data.Hora}
                        </td>
                        <td className="px-6 py-4">
                        {data.Data} / {data.Hora}
                        </td>
                        <td className="px-6 py-4">
                          <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                            Check-in
                          </span>
                        </td>
                      </tr>  ))}
                     
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </>
        ) : null}

        {Reserva ? (
          <>
            <div className="p-4 ">
              <div className="flex items-center shadow justify-center h-48 mb-4 rounded-xl bg-gray-50 dark:bg-gray-800">
              <div className="relative overflow-x-auto w-full  sm:rounded-lg">
                  <h1 className='text-center mt-3   mb-4 text-2xl'>Reservas</h1>
                  <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                      <tr>
                        <th scope="col" className="px-6 py-3">
                          Name
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Mesa
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Telefone
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Data / Horario
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody>

                    {laravelData.map((data) => (
                      <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          {data.Name}
                        </th>
                        <td className="px-6 py-4">
                        {data.Mesa_id}
                        </td>
                        <td className="px-6 py-4">
                        {data.Data} / {data.Hora}
                        </td>
                        <td className="px-6 py-4">
                        {data.Data} / {data.Hora}
                        </td>
                        <td className="px-6 py-4">
                          <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                            Check-in
                          </span>
                        </td>
                      </tr>  ))}
                     
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </>
        ) : null}
      </div>
    </section>
  )
}
