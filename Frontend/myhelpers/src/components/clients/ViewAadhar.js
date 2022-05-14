import React from 'react'
import PDFViewer from 'pdf-viewer-reactjs'
const ViewAadhar = (props) => {
    console.log("view AAdhar file")
    return (

        <PDFViewer
        document={{
            url: props.url
        }}
    />)
}

export default ViewAadhar