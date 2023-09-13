import React from 'react';

const ImageUpload = ({ img, setImg }) => {
    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile) {
            setImg(URL.createObjectURL(selectedFile));
        }
    };
    return (
        <div className="App">
            <div>
                <input
                    type="file"
                    accept=".png,.svg,.jpg"
                    onChange={handleFileChange}
                    style={{ display: 'none' }}
                    id="fileInput"
                />
                {img.length === 0 ? (
                    <label htmlFor="fileInput">
                        <div variant="contained" component="span">
                            <img src="./images/Group 42.png" alt="" />
                            <p>загрузить фото</p>
                        </div>
                    </label>) :
                    img && (
                        <img height="135px" style={{ marginTop: "2%" }} src={img} />
                    )}
            </div>
        </div>
    );
}
export default ImageUpload