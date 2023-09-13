import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const GetSubCategories = createAsyncThunk("get/subcategories", async (_, thunkAPI) => {
    try {
        const response = await axios.get("  http://localhost:3004/subcategories")
        return response.data
    }
    catch (error) {
        console.log(error);
    }
})
export const addSubCategory = createAsyncThunk('category/addSubCategory', async (data, thunkAPI) => {
    try {
        const response = await axios.post(`  http://localhost:3004/subcategories`, data);
        return response.data;
    } catch (error) {
        console.log(error);
    }
});

const SubCategorySlice = createSlice({
    name: "subcategories",
    initialState: {
        subcategories: [],
        loading: false,
        error: ""
    },
    extraReducers: {
        [GetSubCategories.pending]: (state) => {
            state.loading = true
        },
        [GetSubCategories.fulfilled]: (state, action) => {
            state.subcategories = action.payload
            state.loading = false
            state.error = ""
        },
        [GetSubCategories.rejected]: (state, action) => {
            state.loading = false
            state.error = action.payload
        }
    }
})
export default SubCategorySlice.reducer