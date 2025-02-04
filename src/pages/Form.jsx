import React, { useState, useEffect } from 'react';
import { OSSale } from '../app/api';
import { useSelector, useDispatch  } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import Button from '../components/Button';

import { setFormData, resetFormData } from '../slices/form/formSlice';
import { setSelectedCertificate } from '../slices/certificates/certificatesSlice';

import './form.scss';

const Form = () => {
    
    const selectedSertificate = useSelector((state) => state.certificate.selectedSertificate);
    const formData = useSelector((state) => state.form);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (!selectedSertificate) {
            const cachedCertificate = localStorage.getItem('selectedSertificate');
            if (cachedCertificate) {
                dispatch(setSelectedCertificate(JSON.parse(cachedCertificate)));
            }
        }
    }, [selectedSertificate, dispatch]);

    const [errors, setErrors] = useState({
        name: false,
        phone: false,
        email: false,
    });

    const isValidEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        dispatch(setFormData({ ...formData, [name]: value }))
    };

    const validateForm = () => {
        const newErrors = {
            name: formData.name.trim() === '',
            phone: formData.phone.trim() === '' || formData.phone.length < 11,
            email: formData.email.trim() === '' || !isValidEmail(formData.email),
        };
        setErrors(newErrors);
        return !Object.values(newErrors).some((error) => error);
    };

    const handleSubmit = async () => {
        if (validateForm()) {
            try {
                await OSSale({
                    id: parseInt(selectedSertificate.ID),
                    tableName: selectedSertificate.TABLENAME,
                    primaryKey: selectedSertificate.PRIMARYKEY,
                    price: parseFloat(selectedSertificate.PRICE),
                    summa: parseFloat(selectedSertificate.SUMMA),
                    clientName: formData.name,
                    phone: formData.phone.slice(1),
                    email: formData.email,
                });
                dispatch(resetFormData())
                navigate('/payment')
            } catch (error) {
                console.error('Ошибка при сохранении данных:', error)
            }
        }
    };

    if (!selectedSertificate) {
        return <div>Загрузка данных...</div>;
    }

    return (
        <div className="container">
            <h1>{selectedSertificate.NAME}</h1>
            <p className='form__header'>Заполните форму</p>
            <form className='form'
                onSubmit={(e) => {
                    e.preventDefault()
                    handleSubmit()
                }}
            
            >
                <div className="form__group">
                    <label htmlFor="name">Имя</label>
                    {errors.name && <span className="error-message">Имя обязательно</span>}
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name || ''}
                        onChange={handleChange}
                        className={errors.name ? 'error' : ''}
                        placeholder="Введите ваше имя"
                    />
                    
                </div>

                <div className="form__group">
                    <label htmlFor="phone">Телефон</label>
                    {errors.phone && (
                        <span className="error-message">Введите корректный телефон</span>
                    )}
                    <PhoneInput
                        country={'ru'}
                        value={formData.phone}
                        onChange={(phone) => dispatch(setFormData({ phone }))}
                        placeholder="+7 (999) 999-99-99"
                    />
                </div>

                <div className="form__group">
                    <label htmlFor="email">Почта</label>
                    {errors.email && (
                        <span className="error-message">Введите корректный email</span>
                    )}
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={errors.email ? 'error' : ''}
                        placeholder="Введите вашу почту"
                    />
                </div>

                <div className="form__group">
                    <Button 
                        onClick={() => {
                            navigate('/')
                        }}
                        text='Назад'
                        disabled={false}
                    />
                    <Button 
                        type="submit"
                        text='Оплатить'
                        disabled={false}
                    />
                </div>
            </form>
        </div>
    );
};

export default Form;
