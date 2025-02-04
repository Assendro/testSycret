import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React, { useState } from 'react';

import '../styles/global.scss';

import Certificates from '../pages/Certificates';
import Form from '../pages/Form';
import Payment from '../pages/Payment';

const App = () => {
    const [selectedCertificate, setSelectedCertificate] = useState(null);
    

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Certificates />} />
                <Route path="/form" element={<Form />} />
                <Route path="/payment" element={<Payment />} />
            </Routes>
        </Router>
    )
};

export default App;