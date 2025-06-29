import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { BASE_URL } from "../services/auth/constants";
const API_URL = BASE_URL + "/projects";
console.log("api url", API_URL);

const initialState = {
  projects: [],
  editProject: {},
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: "",
};
// Ortak config fonksiyonu
const getConfig = (state, isMultipart = false) => {
  const token = state.auth?.user?.token;
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  if (!isMultipart) {
    headers["Content-Type"] = "application/json";
  }
  return { headers };
};

// GET ALL
export const fetchProjects = createAsyncThunk(
  "projects/fetchAll",
  async (_, thunkAPI) => {
    try {
      const config = getConfig(thunkAPI.getState());
      const res = await axios.get(API_URL, config);

      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Proje listesi alınamadı."
      );
    }
  }
);

// GET BY ID
export const fetchProjectById = createAsyncThunk(
  "projects/fetchById",
  async (id, thunkAPI) => {
    try {
      const config = getConfig(thunkAPI.getState());
      const res = await axios.get(`${API_URL}/${id}`, config);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue("Proje bulunamadı.", error);
    }
  }
);

// ADD
export const addProject = createAsyncThunk(
  "projects/add",
  async (data, thunkAPI) => {
    try {
      const config = getConfig(thunkAPI.getState(), true); // multipart desteği
      const form = new FormData();
      form.append("title", data.title);
      form.append("tag", data.tag);
      form.append("description", data.description);
      form.append("image", data.image); // 🔥 file burada
      form.append("liveview", data.liveview);
      form.append("github", data.github);

      const res = await axios.post(API_URL, form, config);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Proje eklenemedi"
      );
    }
  }
);

// UPDATE
export const updateProject = createAsyncThunk(
  "projects/update",
  async (data, thunkAPI) => {
    try {
      const config = getConfig(thunkAPI.getState());
      const res = await axios.put(`${API_URL}/${data.id}`, data, config);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue("Proje güncelleme başarısız.", error);
    }
  }
);

// DELETE
export const deleteProject = createAsyncThunk(
  "projects/delete",
  async (id, thunkAPI) => {
    try {
      const config = getConfig(thunkAPI.getState());

      await axios.delete(`${API_URL}/${id}`, config);
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue("Proje silinemedi.", error);
    }
  }
);

const projectSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    resetProjectState: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = "";
      state.project = {};
    },
  },
  extraReducers: (builder) => {
    builder
      // FETCH ALL
      .addCase(fetchProjects.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.isLoading = false;
        state.projects = action.payload;
      })
      .addCase(fetchProjects.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // FETCH BY ID
      .addCase(fetchProjectById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchProjectById.fulfilled, (state, action) => {
        state.project = action.payload;
        state.isSuccess = true;
        state.isLoading = false;
      })

      // ADD
      .addCase(addProject.fulfilled, (state, action) => {
        state.projects.push(action.payload);
        state.isSuccess = true;
      })

      // UPDATE
      .addCase(updateProject.fulfilled, (state, action) => {
        const index = state.projects.findIndex(
          (p) => p.id === action.payload.id
        );
        if (index !== -1) state.projects[index] = action.payload;
        state.isSuccess = true;
      })

      // DELETE
      .addCase(deleteProject.fulfilled, (state, action) => {
        state.projects = state.projects.filter((p) => p.id !== action.payload);
        state.isSuccess = true;
      })

      // Hata durumları
      .addCase(addProject.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateProject.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteProject.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { resetProjectState } = projectSlice.actions;
export default projectSlice.reducer;
