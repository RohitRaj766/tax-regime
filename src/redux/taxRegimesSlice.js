import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getAllTaxRegimes, addTaxRegime, deleteTaxRegime } from '../indexedDB';

export const fetchTaxRegimes = createAsyncThunk('taxRegimes/fetchAll', async () => {
  return await getAllTaxRegimes();
});

export const addTaxRegimeThunk = createAsyncThunk('taxRegimes/add', async (regime) => {
  await addTaxRegime(regime);
  return regime;
});

export const deleteTaxRegimeThunk = createAsyncThunk('taxRegimes/delete', async (id) => {
  await deleteTaxRegime(id);
  return id;
});

const taxRegimesSlice = createSlice({
  name: 'taxRegimes',
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTaxRegimes.fulfilled, (state, action) => {
        return action.payload;
      })
      .addCase(addTaxRegimeThunk.fulfilled, (state, action) => {
        state.push(action.payload);
      })
      .addCase(deleteTaxRegimeThunk.fulfilled, (state, action) => {
        return state.filter((regime) => regime.id !== action.payload);
      });
  },
});

export default taxRegimesSlice.reducer;
