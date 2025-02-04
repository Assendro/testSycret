import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setSelectedCertificate } from '../slices/certificates/certificatesSlice'

import { OSGetGoodList } from '../app/api'
import './certificates.scss'
import Carousel from '../components/Carousel';
import Button from '../components/Button';


const Certificates = () => {
    const [certificates, setCertificates] = useState([]);
    const [error, setError] = useState(null);
    const [disabled, setDisabled] = useState(true)

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const getCertificates = async () => {
            try {
                const data = await OSGetGoodList();

                setCertificates(data);
            } catch (err) {
                setError(err.message); 
            }
        };

        getCertificates();
        
    }, []);

    if (error) {
        return <p>Ошибка: {error}</p>; 
    }
    

    return (
        <div className="container">
            <h1>Выберите товар</h1>

            <Carousel
                items={certificates}
                onSelect={(item) => {
                    dispatch(setSelectedCertificate(item))
                    localStorage.setItem('selectedSertificate', JSON.stringify(item))
                    if (disabled) {
                        setDisabled(false)
                    }
                }}
            />
            <Button 
                onClick={() => {
                    navigate('/form')
                }}
                text='Оформить'
                disabled = {disabled}
            />
            
            
        </div>
    );
};

export default Certificates;