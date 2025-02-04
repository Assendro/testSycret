import { createSlice } from '@reduxjs/toolkit';

const formSlice = createSlice({
    name: 'form',
    initialState: {
        phone: '',
        email: '',
        name: '',
    },
    reducers: {
        setFormData: (state, action) => {
            return { ...state, ...action.payload };
        },
        resetFormData: () => {
            return { phone: '', email: '', name: '' };
        },
    },
});

export const { setFormData, resetFormData } = formSlice.actions;
export default formSlice.reducer;