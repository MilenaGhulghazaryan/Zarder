import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { GetCategories, addCategory, deleteCategory } from "./CategorySlice";
import style from './Category.module.css'
import { AiOutlinePlus } from 'react-icons/ai'
import { GrClose } from 'react-icons/gr'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import ImageUpload from "../ImagesUpload/ImagesUpload";
import * as React from 'react';
import TextField from '@mui/material/TextField';
import { BsThreeDots } from 'react-icons/bs';

const styles = {
    border: 'none',
    boxShadow: 24,
    width: "301px",
    height: "360px",
    background: "#FFFFFF",
    position: "absolute",
    left: '71%',
    top: '22%',
    borderRadius: '5px'
}

const Categories = () => {
    const [searchParams, setSearchParams] = useSearchParams()
    const [img, setImg] = useState([]);
    const genderQuery = searchParams.get('gender')
    const dispatch = useDispatch()
    const categories = useSelector(state => state.categories.categories)
    const [del, setDel] = useState(false)
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    useEffect(() => {
        dispatch(GetCategories(genderQuery))
    }, [genderQuery, del])

    const [title, setTitle] = useState('')
    const [isShown, setIsShown] = useState(false);
    const [iconId, seticonId] = useState(null)

    return (
        <>
            <div style={{ display: 'flex' }}>
                <div className={style.buttons}>
                    <button onClick={() => {
                        setSearchParams({
                            gender: 'woman'
                        })
                    }} className={style.femaleBtn}>
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path style={{ fill: searchParams.get('gender') === 'woman' ? 'blue' : 'grey' }} d="M3.19275 13.5375L6.06599 12.8196L6.23176 12.1564C5.16951 12.0125 4.13926 11.6902 3.18453 11.2032C3.07811 11.1394 3.01019 11.0272 3.00301 10.9034C2.99549 10.7796 3.04896 10.6598 3.14628 10.5827C3.15978 10.5737 4.50003 9.46762 4.50003 5.63532C4.50003 2.40326 5.25677 0.764386 6.75003 0.764386H6.97503C7.49309 0.208152 8.24431 -0.0698417 9.00002 0.0150247C10.4093 0.0150247 13.5 1.4306 13.5 5.63532C13.5 9.46762 14.8403 10.5737 14.85 10.5812C15.0158 10.7051 15.0497 10.9399 14.9257 11.1057C14.8966 11.1445 14.8602 11.1774 14.8185 11.2024C13.8646 11.694 12.833 12.0175 11.769 12.1586L11.9348 12.8203L14.8072 13.5382C16.6853 14.0051 18.0027 15.6915 18 17.6253C18 17.8322 17.8321 18 17.625 18H0.374987C0.167881 18 -2.47955e-05 17.8322 -2.47955e-05 17.6253C-0.00308418 15.6913 1.31436 14.0044 3.19275 13.5375Z" fill="#0008C1" />
                        </svg>
                    </button>
                    <button onClick={() => {
                        setSearchParams({
                            gender: 'man'
                        })
                    }} className={style.maleBtn}>
                        <svg width="19" height="18" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clip-path="url(#clip0_312_187)">
                                <path style={{ fill: searchParams.get('gender') === 'man' ? 'blue' : 'grey' }} d="M18.989 17.5343L18.514 15.7343C18.2887 14.861 17.6054 14.1588 16.705 13.875L13.2217 12.7755C12.3722 12.4403 11.9835 11.1443 11.8996 10.6522C12.5469 10.1423 12.9633 9.41685 13.0634 8.62499C13.0491 8.48974 13.0828 8.35383 13.1591 8.23873C13.2826 8.20944 13.3836 8.1257 13.4307 8.01373C13.6586 7.49088 13.8016 6.93837 13.855 6.37499C13.8551 6.34437 13.8512 6.31389 13.8431 6.28425C13.7864 6.06533 13.6506 5.87215 13.4592 5.73824V3.74998C13.4592 2.54173 13.0697 2.04599 12.6596 1.75873C12.5813 1.17675 11.9234 0 9.50089 0C7.35163 0.0819844 5.62909 1.71387 5.54255 3.75001V5.73827C5.35114 5.87218 5.21528 6.06537 5.15858 6.28429C5.15056 6.31392 5.14659 6.34444 5.1467 6.37502C5.19999 6.93868 5.34305 7.49145 5.57105 8.01453C5.60534 8.12053 5.69525 8.20206 5.80855 8.2298C5.85289 8.25078 5.93602 8.35956 5.93602 8.62506C6.03662 9.41917 6.45551 10.1463 7.10611 10.6561C7.02299 11.1473 6.63664 12.4426 5.81096 12.7696L2.29674 13.875C1.3971 14.1588 0.714283 14.8603 0.488584 15.7328L0.0135835 17.5328C-0.040188 17.7336 0.0879879 17.9376 0.299882 17.9885C0.331537 17.9962 0.364082 18 0.396738 18.0001H18.6051C18.8237 18 19.0009 17.8321 19.0008 17.625C19.0008 17.5943 18.9968 17.5639 18.989 17.5343Z" fill="#939393" />
                            </g>
                        </svg>
                    </button>

                </div>

                <div className={style.images1}>
                    {
                        categories?.map((el) => {
                            return (
                                <div key={el?.id} onClick={() => {
                                    setSearchParams({
                                        gender: searchParams.get('gender'),
                                        category: el.id
                                    })
                                }}
                                    className={el.id === +searchParams.get('category') ? style.changeTitleImg : style.titleImg}>

                                    <BsThreeDots style={{ marginLeft: '79%' }} onClick={() => {
                                        setIsShown(!isShown)
                                        seticonId(el?.id)
                                    }} />

                                    {isShown && el.id === iconId ? (
                                        <div className={style.deleteDiv} onClick={() => {
                                            dispatch(deleteCategory({
                                                gender: searchParams.get('gender'),
                                                id: el.id
                                            }))
                                            setDel(!del)
                                        }}>
                                            <h5 style={{ marginTop: '3px' }}>Delete</h5>
                                        </div>

                                    ) : null}

                                    <img src={el?.img} alt="" height="41px" />
                                    <p>{el?.title}</p>
                                </div>
                            )
                        })
                    }
                </div>
                <div>
                    <div className={style.plusIcon} >
                        <AiOutlinePlus className={style.sum} onClick={handleOpen} />
                    </div>
                </div>

                <Modal style={{ backgroundColor: '#00000026' }}
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description">
                    <Box sx={styles} >
                        <div style={{ display: "flex", justifyContent: "space-between", width: "265px", margin: "auto", alignItems: "center" }}>
                            <Typography style={{ marginTop: '7%' }} variant="h6" component="h2" className={style.modalTitle}>
                                добавить категория
                            </Typography>
                            <GrClose className={style.closeBtn} onClick={() => {
                                handleClose()
                            }} />
                        </div>
                        <div className={style.modalStyle}>
                            <div>
                                <div className={style.btns}>
                                    <button className={style.modalFemaleBtn} onClick={() => {
                                        setSearchParams({
                                            gender: "woman"
                                        })
                                    }}>
                                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path style={{ fill: searchParams.get('gender') === 'woman' ? 'blue' : 'grey' }} d="M3.19275 13.5375L6.06599 12.8196L6.23176 12.1564C5.16951 12.0125 4.13926 11.6902 3.18453 11.2032C3.07811 11.1394 3.01019 11.0272 3.00301 10.9034C2.99549 10.7796 3.04896 10.6598 3.14628 10.5827C3.15978 10.5737 4.50003 9.46762 4.50003 5.63532C4.50003 2.40326 5.25677 0.764386 6.75003 0.764386H6.97503C7.49309 0.208152 8.24431 -0.0698417 9.00002 0.0150247C10.4093 0.0150247 13.5 1.4306 13.5 5.63532C13.5 9.46762 14.8403 10.5737 14.85 10.5812C15.0158 10.7051 15.0497 10.9399 14.9257 11.1057C14.8966 11.1445 14.8602 11.1774 14.8185 11.2024C13.8646 11.694 12.833 12.0175 11.769 12.1586L11.9348 12.8203L14.8072 13.5382C16.6853 14.0051 18.0027 15.6915 18 17.6253C18 17.8322 17.8321 18 17.625 18H0.374987C0.167881 18 -2.47955e-05 17.8322 -2.47955e-05 17.6253C-0.00308418 15.6913 1.31436 14.0044 3.19275 13.5375Z" fill="#0008C1" />
                                        </svg>
                                        <p>женский</p>
                                    </button>
                                    <button className={style.modalMaleBtn} onClick={() => {
                                        setSearchParams({
                                            gender: "man"
                                        })
                                    }}>
                                        <svg width="19" height="18" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <g clip-path="url(#clip0_312_187)">
                                                <path style={{ fill: searchParams.get('gender') === 'man' ? 'blue' : 'grey' }} d="M18.989 17.5343L18.514 15.7343C18.2887 14.861 17.6054 14.1588 16.705 13.875L13.2217 12.7755C12.3722 12.4403 11.9835 11.1443 11.8996 10.6522C12.5469 10.1423 12.9633 9.41685 13.0634 8.62499C13.0491 8.48974 13.0828 8.35383 13.1591 8.23873C13.2826 8.20944 13.3836 8.1257 13.4307 8.01373C13.6586 7.49088 13.8016 6.93837 13.855 6.37499C13.8551 6.34437 13.8512 6.31389 13.8431 6.28425C13.7864 6.06533 13.6506 5.87215 13.4592 5.73824V3.74998C13.4592 2.54173 13.0697 2.04599 12.6596 1.75873C12.5813 1.17675 11.9234 0 9.50089 0C7.35163 0.0819844 5.62909 1.71387 5.54255 3.75001V5.73827C5.35114 5.87218 5.21528 6.06537 5.15858 6.28429C5.15056 6.31392 5.14659 6.34444 5.1467 6.37502C5.19999 6.93868 5.34305 7.49145 5.57105 8.01453C5.60534 8.12053 5.69525 8.20206 5.80855 8.2298C5.85289 8.25078 5.93602 8.35956 5.93602 8.62506C6.03662 9.41917 6.45551 10.1463 7.10611 10.6561C7.02299 11.1473 6.63664 12.4426 5.81096 12.7696L2.29674 13.875C1.3971 14.1588 0.714283 14.8603 0.488584 15.7328L0.0135835 17.5328C-0.040188 17.7336 0.0879879 17.9376 0.299882 17.9885C0.331537 17.9962 0.364082 18 0.396738 18.0001H18.6051C18.8237 18 19.0009 17.8321 19.0008 17.625C19.0008 17.5943 18.9968 17.5639 18.989 17.5343Z" fill="#939393" />
                                            </g>
                                        </svg>
                                        <p>мужской</p>
                                    </button>
                                </div>

                                <TextField style={{ marginLeft: '7%', marginTop: '-21px', width: '87%' }} id="standard-basic" label="категория" variant="standard" type="text" className={style.modalInput} onChange={(e) => {
                                    setTitle(e.target.value)
                                }} />

                                <div className={style.rectangle}>
                                    <div>
                                        <ImageUpload img={img} setImg={setImg} />
                                    </div>
                                </div>

                                <button className={style.addBtn} onClick={() => {
                                    if (title.trim() && img.length !== 0) {
                                        dispatch(addCategory({
                                            gender: genderQuery,
                                            title: title,
                                            img: img
                                        })).then(() => {
                                            dispatch(GetCategories(genderQuery))
                                            handleClose()
                                            setImg([])
                                        })
                                    } else {
                                        alert('Լրացրեք բոլոր դաշտերը')
                                    }
                                }}>добавить</button>
                            </div>
                        </div>
                    </Box>
                </Modal>
            </div>
        </>
    )
}
export default Categories