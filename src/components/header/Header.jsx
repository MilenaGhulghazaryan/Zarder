import style from './Header.module.css'
import { AiOutlineSearch } from 'react-icons/ai'
import { useDispatch, useSelector } from 'react-redux';
import { productSearch, setFind, valueChange } from '../../features/addImg/AddImgSlice';

const Header = () => {
    const search = useSelector(state => state.images.search)
    const val = useSelector(state => state.images.val)
    const dispatch = useDispatch()
    return (
        <div className={style.header}>
            <div className={style.whiteBox}>
                <input className={style.whiteBoxInput} type="text" placeholder='Поиск' value={val} onChange={(e) => {
                    dispatch(valueChange(e.target.value))
                }} />
                <div onClick={() => {
                    dispatch(productSearch(val))
                    dispatch(setFind())
                    console.log(search, 'search');
                }}>
                    <AiOutlineSearch className={style.icon} />
                </div>
            </div>
        </div>
    )
}
export default Header