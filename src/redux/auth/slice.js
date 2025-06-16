import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { register, login, logout, refreshUser } from './operations';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: {
      name: null,
      email: null,
    },
    token: null,
    isLoggedIn: false,
    isRefreshing: false,
  },
  extraReducers: builder => {
    builder
      .addCase(logout.fulfilled, state => {
        state.user = {
          name: null,
          email: null,
        };
        state.token = null;
        state.isLoggedIn = false;
      })
      .addCase(refreshUser.pending, state => {
        state.isRefreshing = true;
      })
      .addCase(refreshUser.fulfilled, (state, action) => {
        // state.user = action.payload;
        state.token = action.payload.data.accessToken;
        console.log('action.payload in slice refresh', action.payload);
        state.isLoggedIn = true;
        state.isRefreshing = false;
      })
      .addCase(refreshUser.rejected, state => {
        state.isRefreshing = false;
      })
      // .addMatcher(
      //   isAnyOf(register.fulfilled, login.fulfilled),
      //   (state, action) => {
      //     state.user = action.payload.user;
      //     state.token = action.payload.token;
      //     state.isLoggedIn = true;
      //   }
      // )
      .addCase(register.fulfilled, (state, action) => {
        state.user.name = action.payload.data.name;
        state.user.email = action.payload.data.email;
        state.isLoggedIn = false;
        console.log('action.payload in slice', action.payload);
      })
      .addCase(login.fulfilled, (state, action) => {
        // state.user.name = action.payload.data.name;
        // state.user.email = action.payload.data.email;
        state.token = action.payload.data.accessToken;
        console.log(
          'action.payload.data.accessToken in slice login',
          action.payload.data.accessToken
        );
        console.log('state.token in slice login', state.token);

        state.isLoggedIn = true;
      });
  },
});

export default authSlice.reducer;
