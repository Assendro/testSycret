import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    selectedSertificate: null,
};

const certificatesSlice = createSlice({
    name: 'certificate',
    initialState,
    reducers: {
        setSelectedCertificate: (state, action) => {
            state.selectedSertificate = action.payload;
        },
    },
});

export const { setSelectedCertificate } = certificatesSlice.actions;

export default certificatesSlice.reducer;
