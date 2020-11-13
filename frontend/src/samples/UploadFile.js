import React, {useRef} from 'react'

const FileUploader = ({onSelect}) => {


    const handleFileInput = (e) => {
        // handle validations
        //onFileSelect(e.target.files[0])

        console.log(e.target.files[0])
        onSelect(e.target.files[0])
    }

    return (
        <div className="file-uploader">
            <input type="file" onChange={handleFileInput}/>

        </div>
    )
}

export default FileUploader