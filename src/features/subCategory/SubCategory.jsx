import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetSubCategories, addSubCategory } from "./SubCategorySlice";
import { AiOutlinePlus } from 'react-icons/ai'
import style from './SubCategory.module.css'
import { useSearchParams } from "react-router-dom";
import TextField from '@mui/material/TextField';
import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { GrClose } from 'react-icons/gr';
const styles = {
    position: 'absolute',
    top: '43%',
    left: '52%',
    transform: 'translate(-50%, -50%)',
    width: '345px',
    height: '163px',
    bgcolor: '#FFFFFF',
    border: 'none',
    boxShadow: 24,
    p: 4,
    padding: 0,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    borderRadius: '5px'
};

const SubCategory = () => {
    const dispatch = useDispatch()
    const subcategories = useSelector(state => state.subcategories.subcategories)
    const [searchParams, setSearchParams] = useSearchParams()
    const categoryQuery = +searchParams.get('category')
    useEffect(() => {
        dispatch(GetSubCategories())
    }, [])
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [subCategoryTitle, setSubCategoryTitle] = useState('')
    const categories = useSelector(state => state.categories.categories)

    return (
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: "17px", marginLeft: '8.6%', height: '63px' }}>
            <div className={style.categories}>
                {
                    subcategories?.map(({ id, title, parentId }) => {
                        if (parentId === categoryQuery) {
                            return (
                                <>
                                    <div key={id} onClick={() => {
                                        setSearchParams({
                                            gender: searchParams.get('gender'),
                                            category: +searchParams.get('category'),
                                            subcategory: id
                                        })
                                    }}>
                                        <p className={id == searchParams.get('subcategory') ? style.border1 : style.border2}> {title}</p>
                                    </div>
                                </>
                            )
                        }
                    })
                }
            </div>
            {
                subcategories ? <div className={style.addSubcategory}>
                    <AiOutlinePlus onClick={handleOpen} />
                </div> : null
            }

            <Modal style={{ backgroundColor: '#00000026' }}
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description">
                <Box sx={styles} className={style.subCategoryModal}>
                    <div style={{ display: 'flex', 'alignItems': 'center' }}>
                        <h2 >
                            {
                                categories?.map(({ id, title, parentId }) => {
                                    if (+searchParams.get('category') === id) {
                                        return <span>{title}</span>
                                    }
                                })
                            }:добавить подкатегория</h2>
                        <GrClose className={style.closeBtn} onClick={() => {
                            handleClose()
                        }} />
                    </div>
                    <TextField style={{ width: '80%', margin: 'auto', height: '96px', marginTop: '-16px', marginLeft: '15px' }} id="standard-basic" label="подкатегория" variant="standard" type="text" onChange={(e) => {
                        setSubCategoryTitle(e.target.value)
                    }} />
                    <button className={style.addBtn} onClick={() => {
                        dispatch(addSubCategory({
                            gender: searchParams.get('gender'),
                            parentId: categoryQuery,
                            title: subCategoryTitle
                        })).then(() => {
                            dispatch(GetSubCategories(categoryQuery))
                            handleClose()
                        })
                    }}>добавить</button>
                </Box>
            </Modal>
            <div className={style.pagination}></div>
        </div>
    )
}
export default SubCategory



