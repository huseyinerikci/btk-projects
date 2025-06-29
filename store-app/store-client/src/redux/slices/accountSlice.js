import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import requests from "../../api/apiClient";

const initialState = {
  user: null,
  status: "idle",
};

export const loginUser = createAsyncThunk(
  "account/login",
  async (data, thunkAPI) => {
    try {
      const user = await requests.account.login(data);
      localStorage.setItem("user", JSON.stringify(user));
      return user;
    } catch (error) {
      return thunkAPI.rejectWithValue({ message });
    }
  }
);

export const registerUser = createAsyncThunk(
  "account/register",
  async (data, thunkAPI) => {
    try {
      await requests.account.register(data);
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue({ message });
    }
  }
);

export const getUser = createAsyncThunk(
  "account/getUser",
  async (_, thunkAPI) => {
    thunkAPI.dispatch(setUser(JSON.parse(localStorage.getItem("user"))));
    try {
      const user = await requests.account.getUser();
      localStorage.setItem("user", JSON.stringify(user));
      return user;
    } catch (error) {
      return thunkAPI.rejectWithValue({ message });
    }
  },
  {
    condition: () => {
      if (!localStorage.getItem("user")) return false;
    },
  }
);

export const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
      localStorage.removeItem("user");
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.user = action.payload;
      state.status = "idle";
    });
    builder.addCase(loginUser.rejected, (state) => {
      state.status = "idle";
    });

    builder.addCase(registerUser.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.status = "idle";
    });
    builder.addCase(registerUser.rejected, (state) => {
      state.status = "idle";
    });

    builder.addCase(getUser.fulfilled, (state, action) => {
      state.user = action.payload;
    });

    builder.addCase(getUser.rejected, (state) => {
      state.user = null;
      localStorage.removeItem("user");
    });
  },
});

export const { setUser, logout } = accountSlice.actions;
