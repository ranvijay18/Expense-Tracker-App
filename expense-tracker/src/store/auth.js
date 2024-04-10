import { createSlice } from '@reduxjs/toolkit'

const initialAuthState = {isAuthenticated : false , token: null};

const authSlice = createSlice({
    name: 'auth',
    initialState:initialAuthState,
    reducers: {
      login(state, action){
        state.isAuthenticated = true;
        state.token = action.payload;
        // console.log(action.payload);
      },
      logout(state){
        state.isAuthenticated = false;
        state.token = null;
      }
    }
  })
  
  export const authActions = authSlice.actions;
  export default authSlice;