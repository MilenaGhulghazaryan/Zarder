import React, { useEffect, useState } from 'react';
import style from './Filter.module.css'
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { IoIosArrowBack } from 'react-icons/io';
import { IoIosArrowForward } from 'react-icons/io';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { GetImages, filteredItems } from '../addImg/AddImgSlice';

const Filter = () => {
  const dispatch = useDispatch()
  const subcategories = useSelector(state => state.subcategories.subcategories)
  const [searchParams, setSearchParams] = useSearchParams()
  const subCategoryImgQuery = +searchParams.get('subcategory')
  const [minPrice, setMinPrice] = useState(100)
  const [maxPrice, setMaxPrice] = useState(4000)
  const [value, setValue] = useState([minPrice, maxPrice]);
  let images = useSelector(state => state.images.images)
  const handleChange = (e) => {
    setValue(e.target.value);
  };

  useEffect(() => {
    setMinPrice(value[0])
    setMaxPrice(value[1])
    dispatch(GetImages())
  }, [])
  const [showDiv, setShowDiv] = useState(false);
  const categoryQuery = +searchParams.get('category');

  return (
    <>
      <div>
        {
          showDiv ?
            <div>
              <div className={style.filter}>
                <Box sx={{ width: 270 }} className={style.range}>
                  <p className={style.price}>цена</p>
                  <Slider style={{ color: "#0008C1" }}
                    value={value}
                    min={minPrice}
                    max={maxPrice}
                    onChange={handleChange}
                    valueLabelDisplay="off"
                  />
                  <div className={style.inputs}>
                    <input className={style.ot} placeholder='от' type="number" value={value[0]}
                      onChange={e => dispatch(setMinPrice(e.target.value))} />
                    <p>—</p>
                    <input className={style.do} placeholder='до' type="number" value={value[1]}
                      onChange={e => dispatch(setMaxPrice(e.target.value))} />
                  </div>
                  <button onClick={() => {
                    setSearchParams({
                      gender: searchParams.get('gender'),
                      category: +searchParams.get('category'),
                      subcategory: +searchParams.get('subcategory'),
                      min: value[0],
                      max: value[1],
                    })
                    setShowDiv(false)
                    dispatch(filteredItems({
                      min: searchParams.get('min'),
                      max: searchParams.get('max'),
                      min: value[0],
                      max: value[1],

                    }))
                    setValue([minPrice, maxPrice])
                  }}>сохранить</button>
                </Box>
              </div>
              <div className={style.close}>
                <IoIosArrowBack className={style.arrow} onClick={() => {
                  setShowDiv(false)
                }} />
              </div>
            </div> : <div className={style.filterBtn} onClick={() => setShowDiv(true)}>
              <div>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16.172 5.73484H16.9543C17.2411 5.73484 17.4758 5.47678 17.4758 5.16137C17.4758 4.84596 17.2411 4.58789 16.9543 4.58789H16.172C15.8852 4.58789 15.6505 4.84596 15.6505 5.16137C15.6505 5.47678 15.8852 5.73484 16.172 5.73484Z" fill="white" />
                  <path d="M23.8902 0.630824C23.7077 0.229391 23.3427 0 22.9515 0H1.04846C0.657335 0 0.292284 0.258064 0.109758 0.630824C-0.0727673 1.03226 -0.0206171 1.49104 0.214059 1.83513L9.41857 14.5663V22.853C9.41857 23.2832 9.62717 23.6559 9.96614 23.8566C10.1226 23.9427 10.279 24 10.4616 24C10.6702 24 10.8788 23.9427 11.0613 23.7993L13.9556 21.5914C14.3728 21.2473 14.6075 20.7312 14.6075 20.1864V14.5376L23.7859 1.83513C24.0206 1.49104 24.0728 1.03226 23.8902 0.630824ZM13.6688 13.9928C13.6167 14.0789 13.5645 14.1935 13.5645 14.3369V20.1577C13.5645 20.3584 13.4863 20.5305 13.3559 20.6452L10.4616 22.853V14.3369C10.4616 14.1362 10.3833 13.9642 10.253 13.8781L4.36 5.73477H13.8253C14.1121 5.73477 14.3468 5.4767 14.3468 5.16129C14.3468 4.84588 14.1121 4.58781 13.8253 4.58781H3.65597C3.6299 4.58781 3.57775 4.58781 3.55167 4.58781L1.04846 1.14695H22.9515L13.6688 13.9928Z" fill="white" />
                </svg>
                <p> фильтр </p>
              </div>
              <IoIosArrowForward style={{ marginLeft: "-17px" }} />
            </div>
        }
      </div>
    </>
  );
};

export default Filter;





























