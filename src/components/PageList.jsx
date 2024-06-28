import React, { useState, useEffect } from 'react';
import PageService from '../services/PageService';
import MenuHeader from './MenuHeader';

const PageList = ({ onEditPage }) => {

  const [pages, setPages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pagesPerPage] = useState(5);

  useEffect(() => {
    getPages();
  }, []);

  const getPages = async () => {
    try {
      const data = await PageService.list();
      setPages(data);
    }
    catch (error) {
      console.error("Error getting pages", error);
    }
  };

  const handleEdit = (page) => {
    onEditPage(page);
  };

  const handleDelete = async (id) => {
    try {
      await PageService.remove(id);
      setPages(pages.filter(page => page.id !== id));
    }
    catch (error) {
      console.error("Errro al eliminar", error);
    }
  };

  const indexOfLastPage = currentPage * pagesPerPage;
  const indexOfFirstPage = indexOfLastPage - pagesPerPage;
  const currentPages = pages.slice(indexOfFirstPage, indexOfLastPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <div className="contenedor">
        <div className='fila'>
          <MenuHeader />
        </div>
        <div className="fila">
          <h2>Page List</h2>

        </div>
        <div className="fila">
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Title</th>
                <th>Description</th>
                <th>Image</th>
                <th colSpan="2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentPages.map((page) => (
                <tr key={page.id}>
                  <td>{page.id}</td>
                  <td>{page.titulo}</td>
                  <td>{page.descripcion}</td>
                  <td>{page.imagen}</td>
                  <td>
                    <button onClick={() => handleEdit(page)}>Edit</button>
                  </td>
                  <td>
                    <button onClick={() => handleDelete(page.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Pagination
            pagesPerPage={pagesPerPage}
            totalPages={pages.length}
            paginate={paginate}
          />
        </div>
      </div>
    </div>
  )
}

const Pagination = ({ pagesPerPage, totalPages, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPages / pagesPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className='pagination'>
        {pageNumbers.map(number => (
          <li key={number} className='page-item'>
            <button type="button" onClick={() => paginate(number)} className='page-link'>
              {number}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default PageList;