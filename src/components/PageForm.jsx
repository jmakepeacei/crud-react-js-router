import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PageService from '../services/PageService';

const PageForm = ({ initialData, onSubmit }) => {

    const [formData, setFormData] = useState(initialData);
    const navigate = useNavigate();

    useEffect(() => {
        setFormData(initialData)
    }, [initialData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (formData.id) {
                await PageService.update(formData);
            } else {
                await PageService.create(formData);
            }
            //setEditingPage(null);
            onSubmit();
            navigate('/list');
        } catch (error) {
            console.error("Error saving page", error);
        }

    };

    const handleCancel = () => {
        navigate('/list');
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="titulo">Title:</label>
                <input type="text" name="titulo" value={formData.titulo} onChange={handleChange} required />
            </div>
            <div className="form-group">
                <label htmlFor="descripcion">Description:</label>
                <textarea name="descripcion" value={formData.descripcion} onChange={handleChange} rows="5" required></textarea>
            </div>
            <div className="form-group">
                <label htmlFor="imagen">Image:</label>
                <input type="text" name="imagen" value={formData.imagen} onChange={handleChange} required />
            </div>
            <button type="submit">Save</button>
            <button type="button" onClick={handleCancel}>Cancel</button>
        </form>

    )
}

export default PageForm;