import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const GetCategories = createAsyncThunk("get/categories", async (gender, thunkAPI) => {
    try {
        const response = await axios.get(`http://localhost:3004/${gender}`)
        return response.data
    }
    catch (error) {
        console.log(error);
    }
});

export const addCategory = createAsyncThunk('genders/addCategory', async (data, thunkAPI) => {
    try {
        const response = await axios.post(`  http://localhost:3004/${data.gender}`, data);
        return response.data;
    } catch (error) {
        console.log(error);
    }
});

export const deleteCategory = createAsyncThunk('delete/deleteCategory', async (data) => {
    try {
        const response = await axios.delete(`http://localhost:3004/${data.gender}/${data.id}`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
});


const CategoriesSlice = createSlice({
    name: "categories",
    initialState: {
        categories: [],
        loading: false,
        error: ""
    },
    extraReducers: {
        [GetCategories.pending]: (state) => {
            state.loading = true
        },
        [GetCategories.fulfilled]: (state, action) => {
            state.categories = action.payload
            state.loading = false
            state.error = ""
        },
        [GetCategories.rejected]: (state, action) => {
            state.loading = false
            state.error = action.payload
        }
    }
})
export const { genderChange, setTitle } = CategoriesSlice.actions
export default CategoriesSlice.reducer

