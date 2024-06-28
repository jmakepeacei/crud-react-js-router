import React, { useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import MainComponent from './components/MainComponent';
import PageForm from './components/PageForm';
import PageList from './components/PageList';
import OtherPage from './pages/OtherPage';
import IndexPage from './pages/IndexPage';

const App = () => {
  const [editingPage, setEditingPage] = useState(null);
  const navigate = useNavigate();

  const handleEditPage = (page) => {
    setEditingPage(page);
    navigate('/edit');
  };

  const handleSubmit = () => {
    setEditingPage(null);
  };

  return (
    <Routes>
      <Route path="/" element={<MainComponent />}>
        <Route index element={<IndexPage />} />
        <Route path="/list" element={<PageList onEditPage={handleEditPage} />} />
        <Route path="/other" element={<OtherPage />} />
        <Route path="/add" element={<PageForm initialData={{ id: undefined, titulo: '', descripcion: '', imagen: '' }} onSubmit={handleSubmit} />} />
        <Route path="/edit" element={<PageForm initialData={editingPage || { id: undefined, titulo: '', descripcion: '', imagen: '' }} onSubmit={handleSubmit} />} />
      </Route>
    </Routes>
  )
}

export default App;
