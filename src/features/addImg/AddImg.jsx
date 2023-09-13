import style from './AddImg.module.css';
import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { GrClose } from 'react-icons/gr'
import TextField from '@mui/material/TextField';
import { GetImages, addNewImage } from './AddImgSlice';
import ImageUploadModal from './ImageUploadModal';
import axios from 'axios';
import Filter from "../filter/Filter";

const styles = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '860px',
    height: '505px',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    border: 'none',
    background: ' #FFFFFF',
    borderRadius: '5px'

};

const AddImg = () => {
    const dispatch = useDispatch()
    const [searchParams, setSearchParams] = useSearchParams()
    const [minPrice, setMinPrice] = useState(100)
    const [maxPrice, setMaxPrice] = useState(4000)
    const subCategoryImgQuery = +searchParams.get('subcategory')
    const images = useSelector(state => state.images.images)
    const PriceFilter = useSelector(state => state.images.filters)
    const [value, setValue] = useState([minPrice, maxPrice]);
    const subcategories = useSelector(state => state.subcategories.subcategories)
    const [productCode, setProductCode] = useState('')
    const [price, setPrice] = useState('')
    const [image, setImage] = useState([]);
    const newImages = useSelector(state => state.images.newImages)
    const [women, setWomen] = useState([])
    const [men, setMen] = useState([])
    const search = useSelector(state => state.images.search)

    useEffect(() => {

        axios.get("http://localhost:3004/woman")
            .then(res => {
                setWomen(res.data)
            })
            .catch(err => console.log(err, "error"))
    }, [])


    useEffect(() => {
        axios.get("http://localhost:3004/man")
            .then(res => {
                setMen(res.data)
            })
            .catch(err => console.log(err, "error"))
    }, [])


    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const genderQuery = searchParams.get('gender')
    const categories = useSelector(state => state.categories.categories)
    const find = useSelector(state => state.images.find)
    const [genderId, setGenderId] = useState('woman')
    const [categoryId, setCategoryId] = useState(null)
    const [subCategoryId, setSubCategoryId] = useState(null)

    const handleChange = (e) => {
        setValue(e.target.value);
    };
    useEffect(() => {
        dispatch(GetImages())
    }, [find])
    const val = useSelector(state => state.images.val)
    return (
        <>
            <Filter />
            {
                PriceFilter.length == 0 ? <div className={style.pictures}>
                    <div className={style.box} onClick={handleOpen}>+</div>
                    {
                        images?.map(({ id, productCode, price, image, categoryId, subCategoryId, gender }) => {
                            console.log(productCode.toLowerCase().includes(val.toLowerCase()), 'lllk');
                            if (categoryId === +searchParams.get('category') && subCategoryId === +searchParams.get('subcategory') && gender === searchParams.get('gender') && productCode.toLowerCase().includes(search.toLowerCase())) {
                                return (
                                    <div className={style.imgBackground}>
                                        <img src={image} alt="" />
                                        <div className={style.description}>
                                            <p className={style.title}>{productCode}</p>
                                            <p className={style.num}>{price}</p>
                                        </div>

                                    </div>
                                )
                            }
                        })

                    }</div> : <div className={style.pictures}>
                    {
                        PriceFilter.map(({ id, image, productCode, price, parentId, subCategoryId, gender }) => {

                            if (subCategoryId === +searchParams.get('subcategory') && +price >= +searchParams.get('min') && +price <= +searchParams.get('max')) {

                                return (
                                    <>
                                        <div key={id} className={style.imgBackground}>
                                            <img src={image} alt="" />
                                            <div className={style.description}>
                                                <p className={style.title}> {productCode}</p>
                                                <p className={style.num}>{price}</p>
                                            </div>
                                        </div>
                                    </>
                                )
                            }
                        })
                    }

                </div>

            }

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={styles}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <h1 style={{ fontFamily: 'Montserrat', fontStyle: 'normal', fontSize: '16px', lineHeight: ' 20px', textTransform: 'capitalize', color: '#2E2E2E' }}>добавить изделия</h1>
                        <GrClose className={style.closeBtn} onClick={() => {
                            handleClose()
                        }} />
                    </div>
                    <div style={{ display: 'flex' }}>
                        <div className={style.buttons}>
                            <div className="buttons">
                                <button onClick={() => {
                                    setGenderId('woman')
                                }} className={style.femaleBtn}>
                                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path style={{ fill: genderId === 'woman' ? 'blue' : 'grey' }} d="M3.19275 13.5375L6.06599 12.8196L6.23176 12.1564C5.16951 12.0125 4.13926 11.6902 3.18453 11.2032C3.07811 11.1394 3.01019 11.0272 3.00301 10.9034C2.99549 10.7796 3.04896 10.6598 3.14628 10.5827C3.15978 10.5737 4.50003 9.46762 4.50003 5.63532C4.50003 2.40326 5.25677 0.764386 6.75003 0.764386H6.97503C7.49309 0.208152 8.24431 -0.0698417 9.00002 0.0150247C10.4093 0.0150247 13.5 1.4306 13.5 5.63532C13.5 9.46762 14.8403 10.5737 14.85 10.5812C15.0158 10.7051 15.0497 10.9399 14.9257 11.1057C14.8966 11.1445 14.8602 11.1774 14.8185 11.2024C13.8646 11.694 12.833 12.0175 11.769 12.1586L11.9348 12.8203L14.8072 13.5382C16.6853 14.0051 18.0027 15.6915 18 17.6253C18 17.8322 17.8321 18 17.625 18H0.374987C0.167881 18 -2.47955e-05 17.8322 -2.47955e-05 17.6253C-0.00308418 15.6913 1.31436 14.0044 3.19275 13.5375Z" fill="#0008C1" />
                                    </svg>
                                </button>
                                <button onClick={() => {
                                    setGenderId('man')
                                }} className={style.maleBtn}>
                                    <svg width="19" height="18" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path style={{ fill: genderId === 'man' ? 'blue' : 'grey' }} d="M18.989 17.5343L18.514 15.7343C18.2887 14.861 17.6054 14.1588 16.705 13.875L13.2217 12.7755C12.3722 12.4403 11.9835 11.1443 11.8996 10.6522C12.5469 10.1423 12.9633 9.41685 13.0634 8.62499C13.0491 8.48974 13.0828 8.35383 13.1591 8.23873C13.2826 8.20944 13.3836 8.1257 13.4307 8.01373C13.6586 7.49088 13.8016 6.93837 13.855 6.37499C13.8551 6.34437 13.8512 6.31389 13.8431 6.28425C13.7864 6.06533 13.6506 5.87215 13.4592 5.73824V3.74998C13.4592 2.54173 13.0697 2.04599 12.6596 1.75873C12.5813 1.17675 11.9234 0 9.50089 0C7.35163 0.0819844 5.62909 1.71387 5.54255 3.75001V5.73827C5.35114 5.87218 5.21528 6.06537 5.15858 6.28429C5.15056 6.31392 5.14659 6.34444 5.1467 6.37502C5.19999 6.93868 5.34305 7.49145 5.57105 8.01453C5.60534 8.12053 5.69525 8.20206 5.80855 8.2298C5.85289 8.25078 5.93602 8.35956 5.93602 8.62506C6.03662 9.41917 6.45551 10.1463 7.10611 10.6561C7.02299 11.1473 6.63664 12.4426 5.81096 12.7696L2.29674 13.875C1.3971 14.1588 0.714283 14.8603 0.488584 15.7328L0.0135835 17.5328C-0.040188 17.7336 0.0879879 17.9376 0.299882 17.9885C0.331537 17.9962 0.364082 18 0.396738 18.0001H18.6051C18.8237 18 19.0009 17.8321 19.0008 17.625C19.0008 17.5943 18.9968 17.5639 18.989 17.5343Z" fill="#939393" />
                                    </svg>
                                </button>
                            </div>
                        </div>

                        <div className={style.images1}>
                            {
                                genderId === 'woman' ? (women?.map(({ id, title, img }) => {
                                    return (
                                        <div key={id} className={categoryId === id ? style.changeTitleImg : style.titleImg}
                                            onClick={() => {
                                                setCategoryId(id)
                                            }}
                                        >
                                            <img src={img} alt="" height='53px' />
                                            <p>{title}</p>
                                        </div>
                                    )
                                })) : men?.map(({ id, title, img }) => {
                                    console.log(id, 'id');
                                    return (
                                        <div key={id} className={categoryId === id ? style.changeTitleImg : style.titleImg} onClick={() => {
                                            setCategoryId(id)
                                        }}>
                                            <img src={img} alt="" height='53px' style={{ marginLeft: '21%' }} />
                                            <p>{title}</p>
                                        </div>
                                    )
                                })

                            }
                        </div>

                    </div>

                    <div className={style.subcategories}>
                        {
                            subcategories.map(({ id, title, parentId }) => {
                                if (categoryId === parentId) {
                                    return (
                                        <div key={id} style={{ color: 'gray' }} onClick={() => {
                                            setSubCategoryId(id)
                                        }}>
                                            <p className={id == subCategoryId ? style.border1 : style.border2}> {title}</p>
                                        </div>
                                    )
                                }
                            })
                        }
                    </div>

                    <div style={{ display: 'flex', marginTop: '12%' }}>

                        <div className={style.addImg}>
                            <ImageUploadModal image={image} setImage={setImage} />
                        </div>
                        <TextField style={{ marginLeft: '7%', marginTop: '-21px', width: '232px' }} id="standard-basic" label="артикул" variant="standard" type="text" className={style.modalInput} onChange={(e) => {
                            setProductCode(e.target.value)
                        }} />
                        <TextField style={{ marginLeft: '7%', marginTop: '-21px', width: '232px' }} id="standard-basic" label="цена " variant="standard" type="number" className={style.modalInput} onChange={(e) => {
                            setPrice(e.target.value)
                        }} />

                    </div>
                    <button className={style.add} onClick={() => {
                        if (productCode.trim() && price.trim() && image.length !== 0) {
                            dispatch(addNewImage({
                                gender: genderId,
                                categoryId: categoryId,
                                // subCategoryId, subCategoryId,
                                subCategoryId:subCategoryId,
                                price: price,
                                productCode: productCode,
                                image: image
                            })).then(() => {
                                dispatch(GetImages())
                                handleClose()
                                setImage([])
                            })

                        } else {
                            alert('Լրացրեք բոլոր դաշտերը')
                        }
                    }
                    }>
                        <p>добавить</p>
                    </button>
                </Box>
            </Modal>
        </>
    )
}
export default AddImg