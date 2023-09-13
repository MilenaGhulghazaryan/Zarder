import { configureStore } from '@reduxjs/toolkit';
import categoryReducer from '../features/category/CategorySlice';
import subcategoryReducer from '../features/subCategory/SubCategorySlice';
import imagesReducer from '../features/addImg/AddImgSlice';
import thunk from 'redux-thunk';

export const store = configureStore({
  reducer: {
    categories: categoryReducer,
    subcategories: subcategoryReducer,
    images: imagesReducer,
    woman: categoryReducer,
    man:categoryReducer,
    middleware: [thunk]
  },
});
