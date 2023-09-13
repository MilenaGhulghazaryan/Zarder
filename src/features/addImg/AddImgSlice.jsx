import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const GetImages = createAsyncThunk("get/images", async (_, thunkAPI) => {
    try {
        const response = await axios.get(`http://localhost:3004/images `)
        return response.data
    }
    catch (error) {
        console.log(error);
    }
})

export const addNewImage = createAsyncThunk('post/newImages', async (data, thunkAPI) => {
    try {
        const response = await axios.post(` http://localhost:3004/images`, data);
        return response.data;
    } catch (error) {
        console.log(error);
    }

});


const ImagesSlice = createSlice({
    name: "images",
    initialState: {
        images: [],
        loading: false,
        error: "",
        filters: [],
        search: '',
        val: '',
        find: false,
        modalGender: ''
    },
    extraReducers: {
        [GetImages.pending]: (state) => {
            state.loading = true
        },
        [GetImages.fulfilled]: (state, action) => {
            state.images = action.payload
            state.loading = false
            state.error = ""
        },
        [GetImages.rejected]: (state, action) => {
            state.loading = false
            state.error = action.payload
        }
    },
    reducers: {
        filteredItems: (state, action) => {
            const PriceFilter = state.images.filter(product => +product.price >= action.payload.min && +product.price <= action.payload.max)
            state.filters = PriceFilter
        },
        valueChange: (state, action) => {
            state.val = action.payload
        },
        productSearch: (state, action) => {
            state.search = action.payload
        },
        setFind: (state, action) => {
            state.find = !state.find
        }
    }
})
export const { filteredItems, valueChange, productSearch, setFind, changeModalGender } = ImagesSlice.actions
export default ImagesSlice.reducer

