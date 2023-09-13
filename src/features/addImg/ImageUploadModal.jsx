// // import React from 'react';

// // const ImageUploadModal = ({ image, setImage }) => {
// //     const handleFileChange = (event) => {
// //         const selectedFile = event.target.files[0];
// //         if (selectedFile) {
// //             setImage(URL.createObjectURL(selectedFile));
// //         }
// //     };
// //     return (

// //             <div>
// //                 <input
// //                     type="file"
// //                     accept=".png,.svg,.jpg"
// //                     onChange={handleFileChange}
// //                     style={{ display: 'none' }}
// //                     id="fileInput"
// //                 />
// //                 {image.length === 0 ? (
// //                     <label htmlFor="fileInput">
// //                         <div variant="contained" component="span" style={{  display: 'flex', flexDirection: 'column',width: '100%', alignItems:'center',marginTop:'7%',height:'68px'}}>
// //                             <img src="./images/Group 42.png" alt="" /> 

// //                             <p>загрузить фото</p>
// //                         </div>
// //                     </label>) :
// //                     image && (
// //                         <img   src={image} />
// //                     )}
// //             </div>

// //     );
// // }
// // export default ImageUploadModal


// // import React, { useState } from 'react';
// // import Button from '@mui/material/Button';

// // const FileUploader = ({image,setImage}) => {
// //     // const [image, setImage] = useState([]);
// //     const maxNumber = 5;
// //     const handleFileChange = (event) => {
// //         const selectedFile = event.target.files[0];
// //         if (selectedFile) {
// //             setImage(URL.createObjectURL(selectedFile));
// //         }
// //     };

// //     return (
// //         <div>
// //             <input
// //                 type="file"
// //                 accept=".png,.svg,.jpg"
// //                 onChange={handleFileChange}
// //                 style={{ display: 'none' }}
// //                 id="fileInput"
// //                 maxNumber={maxNumber}
// //             />
// //             {/* {
// //                 image.length === 0 ? (
// //                     <label htmlFor="fileInput">
// //                         <div variant="contained" component="span" style={{ display: 'flex', flexDirection: 'column', width: '100%', alignItems: 'center', marginTop: '7%', height: '68px' }}>
// //                             <img src="./images/Group 42.png" alt="" />

// //                             <p>загрузить фото</p>
// //                         </div>
// //                     </label>
// //                 ) : image && (
// //                     <img src={image} width={'173px'} height={'112x'} />
// //                 )
// //             } */}


// //                     <label htmlFor="fileInput">
// //                         <div variant="contained" component="span" style={{ display: 'flex', flexDirection: 'column', width: '100%', alignItems: 'center', marginTop: '7%', height: '68px' }}>
// //                             <img src="./images/Group 42.png" alt="" />

// //                             <p>загрузить фото</p>
// //                         </div>
// //                     </label>
// //                {
// //                 image && (
// //                     <img src={image} width={'173px'} height={'112x'} />
// //                 )
// //                } 


// //         </div>
// //     );
// // };

// // export default FileUploader;



// import React from 'react';
// import ImageUploading from 'react-images-uploading';
// import style from './AddImg.module.css'
// const ImageUploadModal = ({image,setImage}) => {
//     // const [image, setImage] = React.useState([]);
//     const maxNumber = 4;

//     const onChange = (imageList, addUpdateIndex) => {
   
//         // console.log(imageList, addUpdateIndex);
//         setImage(imageList);
//        console.log(image,'newimage');
//     };

//     return (
//         <>
//             <div >
//                 <ImageUploading
//                     multiple
//                     value={image}
//                     onChange={onChange}
//                     maxNumber={maxNumber}
//                     dataURLKey="data_url"
//                 >
//                     {({
//                         imageList,
//                         onImageUpload,
//                         //   onImageRemoveAll,
//                         onImageUpdate,
//                         //   onImageRemove,
//                         isDragging,
//                         dragProps,
//                     }) => (

//                         <div className="upload__image-wrapper">
//                             <div style={{ display: 'flex', flexDirection: 'column', width: '100%', alignItems: 'center', marginTop: '7%', height: '68px' }}
//                                 // style={isDragging ? { color: 'red' } : undefined}
//                                 onClick={onImageUpload}
//                                 {...dragProps}
//                             >
//                                 <img src="./images/Group 42.png" alt="" />
//                                 <p>загрузить фото</p>
//                             </div>

//                             &nbsp;
//                             <div className={style.images}>
//                                 {imageList.map((image, index) => (

//                                     <div key={index} >
//                                         <img src={image['data_url']} alt="" style={{ borderRadius: '5px', height: '34px', width: '34px' }} />

//                                     </div>

//                                 ))}
//                             </div>
//                         </div>


//                     )}
//                 </ImageUploading>

//             </div>
//             <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '17px' }}>
//                 <div className={style.box1}></div>
//                 <div className={style.box2}></div>
//                 <div className={style.box3}></div>
//                 <div className={style.box4}></div>
//             </div>
//         </>
//     );
// }
// export default ImageUploadModal



import React from 'react';

const ImageUploadModal = ({ image, setImage }) => {
    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile) {
            setImage(URL.createObjectURL(selectedFile));
        }
    };
    return (

            <div>
                <input
                    type="file"
                    accept=".png,.svg,.jpg"
                    onChange={handleFileChange}
                    style={{ display: 'none' }}
                    id="fileInput"
                />
                {image.length === 0 ? (
                    <label htmlFor="fileInput">
                        <div variant="contained" component="span" style={{  display: 'flex', flexDirection: 'column',width: '100%', alignItems:'center',marginTop:'7%',height:'68px'}}>
                            <img src="./images/Group 42.png" alt="" /> 

                            <p>загрузить фото</p>
                        </div>
                    </label>) :
                    image && (
                        <img   src={image} />
                    )}
            </div>

    );
}
export default ImageUploadModal