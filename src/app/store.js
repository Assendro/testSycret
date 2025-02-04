import { configureStore } from '@reduxjs/toolkit';
import certificateReducer from '../slices/certificates/certificatesSlice';
import formReducer from '../slices/form/formSlice';

const store = configureStore({
    reducer: {
        certificate: certificateReducer,
        form: formReducer,
    },
});


export default store;
