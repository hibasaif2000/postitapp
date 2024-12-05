
import {createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const logout = createAsyncThunk(
  "/users/logout", 
  async () => {
  try {
    // Send a request to your server to log the user out
    const response = await axios.post(`${process.env.REACT_APP_API_URL}/logout`);
    const msg = response.data.msg
    console.log(msg)
    return {msg}
  } catch (error) {
      const msg = error.msg;
      return ({msg})
  }
});


export const login = createAsyncThunk(
  "users/login",
  async(userData)=>{
    try{
        const response= await axios.post(`${process.env.REACT_APP_API_URL}/login`,{
          email: userData.email,
          password: userData.password
        })
        const user = response.data.user;
        const msg = response.data.msg;

        return({user, msg}) /// ذلا جايات من صفحة الindex.js يعني انه كل المعلومات صحيحة ف يجيب لنا اليوزر و المسج

    }
    catch(error){
      console.log(error)
     }
  }
)

export const registerUser = createAsyncThunk(
    "users/registerUser", /// users is the name of slice
    async(userData)=> {
      try{
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/registerUser`,{ 
          name: userData.name,
          email: userData.email,
          password: userData.password
        })
        //console.log(response);

        const user = response.data.user;
        const msg = response.data.msg;
        return {user, msg};

      }
      catch(error){
        const msg = error.msg;
        return ({msg})
      }
    }

)

const initialState = {
  user: null,
  isLoading: false,
  isSuccess: false,
  isError: false,
  msg: null,
  isLogin: false

}


export const userSlice = createSlice({
  name: "users", //name of the state
  initialState, // initial value of the state
  reducers: {}, // there is no redusers to add
  extraReducers: (builder)=> {
    builder
    //// Register
      .addCase(registerUser.pending, (state)=>{
        state.isLoading= true;
      })
      .addCase(registerUser.fulfilled, (state, action)=>{ // if all values are correct then save it in the state (store)
        state.isSuccess= true;
        state.user= action.payload.user;
        state.msg= action.payload.msg;
      })
      .addCase(registerUser.rejected, (state, action)=>{
        state.isError= true;
        state.msg = action.payload.msg;
      })
      //////// Login

      .addCase(login.pending, (state)=>{
        state.isLoading= true;
      })
      .addCase(login.fulfilled, (state, action)=>{ // if all values are correct then save it in the state (store)
        state.isSuccess= true;
        state.user= action.payload.user;
        state.msg= action.payload.msg;
        state.isLogin = true;
      })
      .addCase(login.rejected, (state, action)=>{
        state.isError= true;
        state.msg = action.payload.msg;
      })

      ////////// Log Out
      .addCase(logout.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logout.fulfilled, (state, action) => {
        // Clear user data or perform additional cleanup if needed
        state.isLogin = false;
        state.user = null;
        state.msg = action.payload.msg;
      })
      .addCase(logout.rejected, (state) => {
        state.isError = true;
      });

  }
});


//export const { } = userSlice.actions; //export the function

export default userSlice.reducer;
