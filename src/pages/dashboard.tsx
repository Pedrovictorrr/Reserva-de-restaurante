// pages/dashboard.tsx
'use client'
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import React from "react";
import { useCookies } from "react-cookie";
import First_page from '../components/Dashboard/Primeira_pagina';
import Reservas from '@/components/Dashboard/Reservas';
import Users from '@/components/Dashboard/Users';
import axios from 'axios';
import { Transition } from '@headlessui/react';


export default function Dashboard() {
  const [cookies] = useCookies(['token']);
 console.log(cookies.token)

  useEffect(() => {
      axios.post('http://18.230.194.84/api/token', {}, {
        headers: {
          Authorization: `Bearer ${cookies.token}`
        }
      })
        .then(response => { 
          console.log(response.data)
        })
        .catch(error => {
          console.log(error);
          router.push('/');
          // redirecionar para a página de login ou página inicial
        },);
  }, [cookies.token, router]);

  const handleLogout = () => {
    axios.post('http://18.230.194.84/api/logout', {}, {
      headers: {
        Authorization: `Bearer ${cookies.token}`
      }
    })
      .then(response => {
        console.log(response.data);
        removeCookie('token');
        router.push('/');
        // redirecionar para a página de login ou página inicial
      })
      .catch(error => {
        console.log(error);
        router.push('/');
      });
  };
  

  const [Inicio, setIsInicio] = React.useState(true);
  const [Reserva, setIsReserva] = React.useState(false);


  const [User, setIsUser] = React.useState(false);
  const router = useRouter();


  const MainComponent = () => {

    setIsInicio(true)
    setIsReserva(false)
    setIsUser(false)
  };

  const ReservaComponent = () => {

    setIsInicio(false)
    setIsReserva(true)
    setIsUser(false)
  };


  const UsersComponent = () => {

    setIsInicio(false)
    setIsReserva(false)
    setIsUser(true)
  };



  return (
    <section>
      <button data-drawer-target="default-sidebar" data-drawer-toggle="default-sidebar" aria-controls="default-sidebar" type="button" className="inline-flex items-center p-2 mt-2 ml-3 text-sm text-white rounded-lg sm:hidden hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-200 xxxtext-gray-400 xxxhover:bg-gray-700 xxxfocus:ring-gray-600">
        <span className="sr-only">Open sidebar</span>
        <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path clip-rule="evenodd" fill-rule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
        </svg>
      </button>

      <aside id="default-sidebar" className="fixed top-0 left-0 z-40 w-48 text-white h-screen transition-transform  -translate-x-full sm:translate-x-0" aria-label="Sidebar">
        <div className="h-full flex items-center   px-3 py-4 overflow-y-auto ">
          <ul className="space-y-2 font-medium">
            <li>
              {Inicio ? (
                <button className="flex items-center transition ease-in-out delay-150  hover:-translate-y-1 hover:scale-110 h duration-300  p-2 text-white rounded-lg ${BtnClick} xxxtext-white  border border-white xxxhover:bg-gray-700" onClick={MainComponent} >
                  <svg aria-hidden="true" className="w-6 h-6 text-white transition duration-75 xxxtext-gray-400 group-hover:text-white xxxgroup-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path><path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path></svg>
                  <span className="ml-3">Inicio</span>
                </button>
              ) : (
              <button className="flex items-center transition ease-in-out delay-150  hover:-translate-y-1 hover:scale-110 h duration-300  p-2 text-white rounded-lg ${BtnClick} xxxtext-white  hover:border hover:border-white xxxhover:bg-gray-700" onClick={MainComponent} >
                <svg aria-hidden="true" className="w-6 h-6 text-white transition duration-75 xxxtext-gray-400 group-hover:text-white xxxgroup-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path><path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path></svg>
                <span className="ml-3">Inicio</span>
              </button>)}

            </li>
            <li>
            {Reserva ? (
              <button className="flex items-center p-2 transition ease-in-out delay-150  hover:-translate-y-1 hover:scale-110 h duration-300 text-white rounded-lg xxxtext-white border border-white xxxhover:bg-gray-700" onClick={ReservaComponent}>
                <svg aria-hidden="true" className="flex-shrink-0 w-6 h-6 text-white transition duration-75 xxxtext-gray-400 group-hover:text-white xxxgroup-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M5 4a3 3 0 00-3 3v6a3 3 0 003 3h10a3 3 0 003-3V7a3 3 0 00-3-3H5zm-1 9v-1h5v2H5a1 1 0 01-1-1zm7 1h4a1 1 0 001-1v-1h-5v2zm0-4h5V8h-5v2zM9 8H4v2h5V8z" clip-rule="evenodd"></path></svg>
                <span className="flex-1 ml-3 whitespace-nowrap">Reservas</span>
              </button>
              ) : (
                <button className="flex items-center p-2 transition ease-in-out delay-150  hover:-translate-y-1 hover:scale-110 h duration-300 text-white rounded-lg xxxtext-white hover:border hover:border-white xxxhover:bg-gray-700" onClick={ReservaComponent}>
                <svg aria-hidden="true" className="flex-shrink-0 w-6 h-6 text-white transition duration-75 xxxtext-gray-400 group-hover:text-white xxxgroup-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M5 4a3 3 0 00-3 3v6a3 3 0 003 3h10a3 3 0 003-3V7a3 3 0 00-3-3H5zm-1 9v-1h5v2H5a1 1 0 01-1-1zm7 1h4a1 1 0 001-1v-1h-5v2zm0-4h5V8h-5v2zM9 8H4v2h5V8z" clip-rule="evenodd"></path></svg>
                <span className="flex-1 ml-3 whitespace-nowrap">Reservas</span>
              </button>
                )}
            </li>
            {/* <li>
              <button className="flex items-center p-2 text-white rounded-lg xxxtext-white  hover:border hover:border-white xxxhover:bg-gray-700" onClick={UsersComponent}>
                <svg aria-hidden="true" className="flex-shrink-0 w-6 h-6 text-white transition duration-75 xxxtext-gray-400 group-hover:text-white xxxgroup-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"></path></svg>
                <span className="flex-1 ml-3 whitespace-nowrap">Users</span>
              </button>
            </li> */}
            <li>
              <button onClick={handleLogout} className="flex transition ease-in-out delay-150  hover:-translate-y-1 hover:scale-110 h duration-300 items-center p-2 text-white rounded-lg xxxtext-white  hover:border hover:border-white xxxhover:bg-gray-700">
                <svg aria-hidden="true" className="flex-shrink-0 w-6 h-6 text-white transition duration-75 xxxtext-gray-400 group-hover:text-white xxxgroup-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clip-rule="evenodd"></path></svg>
                <span className="flex-1 ml-3 whitespace-nowrap">Sair</span>
              </button>
            </li>

          </ul>
        </div>
      </aside>

      <div className="p-4 sm:ml-48">
        {Inicio ? (
          <div>
          
          <First_page />
         
          </div>
        ) : null}

        {Reserva ? (

          <Reservas />

        ) : null}

        {User ? (

          <Users />

        ) : null}
      </div>
    </section>
  )
}
