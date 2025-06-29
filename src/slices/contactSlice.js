import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../api/axiosIntance"; // token'lı axios burada olsun

const API_URL = import.meta.env.VITE_API_URL + "/contacts";
console.log("contact", API_URL);

const initialState = {
  contactTable: [],
  editContact: {},
  isError: false,
  isLoading: false,
  isSuccess: false,
  isUpdate: false,
  message: "",
};

export const getAllContact = createAsyncThunk(
  "contact/getAllContact",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(API_URL);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

export const getContactById = createAsyncThunk(
  "contact/getContactById",
  async (id, thunkAPI) => {
    try {
      const response = await axios.get(`${API_URL}/${id}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

export const addContact = createAsyncThunk(
  "contact/addContact",
  async (data, thunkAPI) => {
    try {
      const response = await axios.post(API_URL, data);
      //console.log("Contact added:", response.data); // Başarılı ekleme sonrası log
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

export const contactSlice = createSlice({
  name: "contact",
  initialState,
  reducers: {
    resetContactState: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
      state.editContact = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllContact.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllContact.fulfilled, (state, action) => {
        state.isLoading = false;
        state.contactTable = action.payload;
        state.isSuccess = true;
      })
      .addCase(getAllContact.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      .addCase(addContact.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addContact.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.contactTable.push(action.payload); // yeni contact ekleniyor
      })
      .addCase(addContact.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { resetContactState } = contactSlice.actions;
export default contactSlice.reducer;
