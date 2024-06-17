import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createUser, loginUser, resetPassword, resetPasswordRequest } from './AuthAPI';

const initialState = {
  status: 'idle',
  error: null,
  loggedInUser: null,
  mailSent: false,
  regMailSent: false,
  passwordReset: false,
  signupError: null,
  signinError: null,
  forgotPassErrror: null,
  changePassError: null,
  resetMailSent:false,
};

export const createUserAsync = createAsyncThunk(
  'user/createUser',
    async (userData, { rejectWithValue }) => {
      try {
        const response = await createUser(userData);
        return response.data;
      } catch (error) {
        console.log(error);
        return rejectWithValue(error);
      }
  },
);
export const loginUserAsync = createAsyncThunk(
  'user/loginUser',
  async (loginInfo, { rejectWithValue }) => {
    try {
      const response = await loginUser(loginInfo);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const resetPasswordRequestAsync = createAsyncThunk(
  'user/resetPasswordRequest',
  async (email, { rejectWithValue }) => {
    try {
      const response = await resetPasswordRequest(email);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const resetPasswordAsync = createAsyncThunk(
  'user/resetPassword',
  async (data, { rejectWithValue }) => {
    try {
      const response = await resetPassword(data);
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error);
    }
  },
);

export const authSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },

    logout: (state) => {
      state.loggedInUser = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createUserAsync.fulfilled, (state, action) => {
        state.signupError = null;
        state.status = 'idle';
        state.loggedInUser = action.payload;
        state.regMailSent = true;
      })
      .addCase(createUserAsync.rejected, (state, action) => {
        state.status = 'idle';
        state.signupError = action.payload;
      })
      .addCase(loginUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loginUserAsync.fulfilled, (state, action) => {
        state.signinError = null;
        state.status = 'idle';
        state.loggedInUser = action.payload;
      })
      .addCase(loginUserAsync.rejected, (state, action) => {
        state.status = 'idle';
        state.signinError = action.payload;
      })
      .addCase(resetPasswordRequestAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(resetPasswordRequestAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.resetMailSent = true;
        state.forgotPassErrror = null;
      })
      .addCase(resetPasswordRequestAsync.rejected, (state, action) => {
        state.status = 'idle';
        state.forgotPassErrror = action.payload;
      })
      .addCase(resetPasswordAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(resetPasswordAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.passwordReset = true;
        state.changePassError = null;
      })
      .addCase(resetPasswordAsync.rejected, (state, action) => {
        state.status = 'idle';
        state.changePassError = action.payload;
      });
  },
});
export const selectLoggedInUser = (state) => state.user.loggedInUser;
export const selectError = (state) => state.user.error;
export const selectMailSent = (state) => state.user.mailSent;
export const selectResetMailSent = (state) => state.user.resetMailSent;
export const selectRegMailSent = (state) => state.user.regMailSent;
export const selectPasswordReset = (state) => state.user.passwordReset;
export const selectSignupError = (state) => state.user.signupError;
export const selectSigninError = (state) => state.user.signinError;
export const selectForgotError = (state) => state.user.forgotPassErrror;
export const selectChangeError = (state) => state.user.changePassError;
export const selectPendingstatus = (state) => state.user.status;
export const { logout } = authSlice.actions;
export default authSlice.reducer;
