import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchStudentData, saveStudentData } from './FormAPI';


const initialState = {
  status: 'idle',
  error: null,
  formData: null,
  profileError: null,
  studentProfile :null
};

export const saveStudentDataAsync = createAsyncThunk(
  'form/saveStudentData',
  async (Data, { rejectWithValue }) => {
    try {
      const response = await saveStudentData(Data);
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error);
    }
  },
);

export const fetchStudentDataAsync = createAsyncThunk(
  'form/fetchStudentData',
  async (id, { rejectWithValue }) => {
    try {
      const response = await fetchStudentData(id);
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error);
    }
  },
);

export const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    logoutHandle: (state) => {
      state.studentProfile = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(saveStudentDataAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(saveStudentDataAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        // state.formData = action.payload;
        state.profileError = null;
        state.studentProfile = action.payload;
      })
      .addCase(saveStudentDataAsync.rejected, (state, action) => {
        state.status = 'idle';
        state.profileError = action.payload;
      })
      .addCase(fetchStudentDataAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchStudentDataAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.profileError = null;
        state.studentProfile = action.payload;
      })
      .addCase(fetchStudentDataAsync.rejected, (state, action) => {
        state.status = 'idle';
        state.profileError = action.payload;
      });
  },
});

export const selectError = (state) => state.form.error;
export const selectProfileError = (state) => state.form.profileError;
export const selectData = (state) => state.form.formData;
export const selectStudentProfile = (state) => state.form.studentProfile;
export const selectFormStatus = (state) => state.form.status;
export const { logoutHandle } = formSlice.actions;

export default formSlice.reducer;