import { createAsyncThunk, createSlice } from  "@reduxjs/toolkit";
import axios from "axios";

const initialState={
    isAuthenticated:false,
    isLoading:true,
    user:null
}

export const loginUser=createAsyncThunk('/auth/login',async(formData)=>{
    const response=await axios.post('http://localhost:3000/auth/login',formData,{
        withCredentials:true
    });
    console.log(response.data,'rd')
    return response.data
})
export const registerUser=createAsyncThunk('/auth/register', async(formData)=>{
    const response=await axios.post('http://localhost:3000/auth/register',formData,{
        withCredentials:true
    });
    console.log(response.data)
    return  response.data;
})

export const logoutUser=createAsyncThunk('/auth/logout',async()=>{
    const response=await axios.post('http://localhost:3000/auth/logout',{},{
        withCredentials:true
    });
    // console.log(response.data)
    return response.data
})


const authSlice=createSlice({
    name:'auth',
    initialState,
    reducers:{
        setUser(state,action){

        }
    },
    extraReducers:(builder)=>{
        builder.addCase(registerUser.pending,(state)=>{
            state.isLoading=true
        }).addCase(registerUser.fulfilled,(state,action)=>{
            state.isLoading=false,
            state.user=action.payload,
            state.isAuthenticated=true
        }).addCase(registerUser.rejected,(state,action)=>{
            state.isLoading=false,
            state.user=null,
            state.isAuthenticated=false
        })
        builder.addCase(loginUser.pending,(state)=>{
            state.isLoading=true
        }).addCase(loginUser.fulfilled,(state,action)=>{
            state.isLoading=false,
            state.user=action.payload.success? action.payload.user : null,
            state.isAuthenticated=action.payload.success;
        }).addCase(loginUser.rejected,(state,action)=>{
            state.isLoading=false,
            state.user=null,
            state.isAuthenticated=false
        })
        builder.addCase(logoutUser.fulfilled,(state,action)=>{
            state.isLoading=false,
            state.user=null,
            state.isAuthenticated=false
        })
    }
})

export default authSlice.reducer