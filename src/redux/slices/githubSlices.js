import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchReposAction = createAsyncThunk(
  "repos/list",
  async (user, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axios.get(
        `https://api.github.com/users/${user}/repos?per_page=10&sort=asc`
        // `https://api.github.com/search/users?${user}`
      );
      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error.response);
    }
  }
);

export const fetchProfileAction = createAsyncThunk(
  "profile/list",
  async (user, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axios.get(
        `https://api.github.com/search/users?q=${user}`
      );
      console.log(data);
      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error.response);
    }
  }
);

const reposSlices = createSlice({
  name: "repos",
  initialState: {},
  extraReducers: (builder) => {
    builder.addCase(fetchReposAction.pending, (state, action) => {
      state.loding = true;
    });
    builder.addCase(fetchReposAction.fulfilled, (state, action) => {
      state.loding = false;
      state.reposList = action?.payload;
      state.error = undefined;
    });
    builder.addCase(fetchReposAction.rejected, (state, action) => {
      state.loding = false;
      state.reposList = undefined;
      state.error = action?.payload;
    });

    builder.addCase(fetchProfileAction.pending, (state, action) => {
      state.loding = true;
    });
    builder.addCase(fetchProfileAction.fulfilled, (state, action) => {
      state.loding = false;
      console.log("action?.payload", action?.payload);
      state.users = action?.payload?.items || [];
      state.error = undefined;
    });
    builder.addCase(fetchProfileAction.rejected, (state, action) => {
      state.loding = false;
      state.users = undefined;
      state.error = action?.payload;
    });
  },
});

export default reposSlices.reducer;
