'use client'
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import React from "react";
import { useCookies } from "react-cookie";
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';

import ReactPaginate from 'react-paginate';
import SkelectonReservas from './SkelectonReservas';
import ShowModal from './ModalShow';
import EditModal from './EditModal';
import DatePicker from "react-datepicker";



interface Reservation {
  id: number;
  Name: string;
  Email: string;
  Observacao: string;
  Data: string;
  Hora: string;
  QTD_Pessoas: number;
  User_id: number;
  Mesa_id: number;
  Status: string;
  Telefone: string;
  created_at: string;
  updated_at: string;
}
function Reservas() {


  const router = useRouter();
  useEffect(() => {
    if (!cookies.token) {
      router.push('/');
    }
  });

  const [currentPage, setCurrentPage] = React.useState(0);
  const [cookies] = useCookies(['token']);
  const [laravelData, setLaravelData] = React.useState([]);
  const [Skelecton, setIsSkelecton] = React.useState(false);
  const [table, setIstable] = React.useState(true);
  const [showModal, setShowModal] = React.useState(false);
  const [showEditModal, setEditShowModal] = React.useState(false);
  const [selectedItemFromLaravelData, setSelectedItemFromLaravelData] = React.useState<Reservation | null>(null);
  const itemsPerPage = 9;
  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = laravelData.slice(startIndex, endIndex);


  useEffect(() => {
    fetchLaravelData()
  },[ [cookies.token, router,fetchLaravelData]]);

  

  function DeleteDatabyId(id: number) {
    if (window.confirm('Tem certeza que deseja excluir esse usuário?')) {
      axios.delete(`http://18.230.194.84/api/reserva/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${cookies.token}`
        }
      })
        .then(response => {
          console.log(response.data);
          fetchLaravelData()
          // Atualize a lista de usuários após a exclusão bem-sucedida
        })
        .catch(error => {
          console.log(error);
          fetchLaravelData()
        });
    }
  }



  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };


  async function fetchLaravelData() {
    setIsSkelecton(false)
    setIstable(true)
    const response = await axios.get('http://18.230.194.84/api/reserva/getAll', {
      headers: {
        Authorization: `Bearer ${cookies.token}`
      }
    });
    setLaravelData(response.data);
    setIsSkelecton(true)
    setIstable(false)
  }

  const handleCloseModal = () => {
    fetchLaravelData()
    setShowModal(false);
  };
  const handleCloseEditModal = () => {
    fetchLaravelData()
    setEditShowModal(false);
  };


  function findDataById(id: number) {
    const item = laravelData.find((item) => item.id == id);
    setSelectedItemFromLaravelData(item);
    setShowModal(true);
  }
  function findEditDataById(id: number) {
    const item = laravelData.find((item) => item.id == id);
    setSelectedItemFromLaravelData(item);
    setEditShowModal(true);
  }



  return (
    <>
      <div className="p-4 mt-96">

        <div className="flex items-center shadow justify-center h-48 mb-4 rounded-xl bg-gray-50 xxxbg-gray-800">
          <div className="relative overflow-x-auto w-full bg-gray-50    sm:rounded-lg">
            <h1 className='text-center mt-3    mb-4 text-2xl'>Reservas</h1>
            <div hidden={Skelecton}>
              <SkelectonReservas />
            </div>
            <table hidden={table} className="w-full text-sm rounded-xl text-left text-gray-500 xxxtext-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 xxxbg-gray-700 xxxtext-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Email
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Telefone
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Observação
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Data / Horario
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Status
                  </th>
                  <th scope="col" className="text-center px-6 py-3">
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((data) => (
                  <tr className="bg-white border-b xxxbg-gray-900 xxxborder-gray-700">
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap xxxtext-white">
                      {data.Name}
                    </th>
                    <td className="px-6 py-4">
                      {data.Email}
                    </td>
                    <td className="px-6 py-4">
                      {data.Telefone}
                    </td>
                    <td className="px-6 py-4">
                      {data.Observacao}
                    </td>
                    <td className="px-6 py-4">
                      {data.Data} - <strong>{data.Hora}</strong>
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
                    <td className="px-6 py-4 flex justify-center">
                      <button
                        type="button"
                        onClick={() => findDataById(data.id)}
                        className="text-white transition ease-in-out delay-150  hover:-translate-y-1 hover:scale-110 h duration-300 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 xxxbg-blue-600 xxxhover:bg-blue-700 focus:outline-none xxxfocus:ring-blue-800"
                      >
                        <FontAwesomeIcon className="text-white" icon={faEye} />
                      </button>
                      <button
                        onClick={() => DeleteDatabyId(data.id)}
                        type="button" className="transition ease-in-out delay-150  hover:-translate-y-1 hover:scale-110 h duration-300 focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 xxxbg-red-600 xxxhover:bg-red-700 xxxfocus:ring-red-900"><FontAwesomeIcon className='text-white' icon={faTrash} /></button>
                      <button onClick={() => findEditDataById(data.id)} type="button" className="transition ease-in-out delay-150  hover:-translate-y-1 hover:scale-110 h duration-300 focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 xxxfocus:ring-yellow-900"><FontAwesomeIcon className='text-white' icon={faPenToSquare} /></button>
                    </td>

                  </tr>
                ))}


              </tbody>
            </table>
            <div className=' p-3 mb-3'>
              <ReactPaginate
                pageCount={Math.ceil(laravelData.length / itemsPerPage)}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={handlePageChange}
                containerClassName={'pagination'}
                subContainerClassName={'pages pagination'}
                activeClassName={'active'}
              />
            </div>
          </div>

        </div>
            <ShowModal show={showModal} user={selectedItemFromLaravelData} handleCloseModal={handleCloseModal} />            
            <EditModal showEdit={showEditModal} user={selectedItemFromLaravelData} handleCloseModal={handleCloseEditModal}  refresh={fetchLaravelData} />
      </div >
    </>
  );
}

export default Reservas;