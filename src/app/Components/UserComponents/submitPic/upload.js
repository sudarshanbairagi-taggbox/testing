import React, { Component } from 'react';
import Uppy from '@uppy/core';
import axios from 'axios'
import { DragDrop, ProgressBar, StatusBar } from '@uppy/react';
import '@uppy/core/dist/style.css'
import '@uppy/drag-drop/dist/style.css'
import '@uppy/status-bar/dist/style.css'
import UppyUploader from './uppyLoader'
import UppyUpload from './uppyUpload'
import { VIDEO_COMPRESS } from '../../../../actions/api'
import { bytesToSize } from '../../../../utils'
class Uploads extends Component {
    state = {
        isLoading: false,
        selectedFile: null,
        selectedUrl: null,
        type: null,
        thumb_file: "",
        fileSize: false,
        throwError: false,
        videoPath: "",
        fileSizeText: ""
    }
    beforeFileAdded = (currentFile, files) => {
        //console.log("before update", currentFile, files)
        const { size, sizeText } = bytesToSize(currentFile.size);
        //console.log("bytesToSize", size, sizeText)
        if (['GB', 'TB'].includes(sizeText)) this.setState({ fileSize: true, fileSizeText: `${size}${sizeText}` }, () => setTimeout(() => this.setState({ fileSize: false, fileSizeText: "" }), 2000))
        else if (sizeText == "MB") {
            if (size >= 100) this.setState({ fileSize: true, fileSizeText: `${size}${sizeText}` }, () => setTimeout(() => this.setState({ fileSize: false, fileSizeText: "" }), 2000))
        }
    }

    beforeUpload = (files) => {
        const fileKeys = Object.keys(files);

        if (fileKeys && fileKeys.length > 0 && files[fileKeys[0]] && files[fileKeys[0]].meta && files[fileKeys[0]].meta.type.includes("video")) {
            try {
                this.setState({ isLoading: true })
                const updateFiles = files[fileKeys[0]];
                //console.log("files", updateFiles)
                const data = new FormData();
                data.append("file", updateFiles.data);
                axios.post(VIDEO_COMPRESS, data).then((response) => {
                    const { responseData } = response.data;
                    if (responseData && responseData.length > 0) {
                        this.setState({ videoPath: responseData[0].sscode, isLoading: false, type: 5, selectedFile: responseData[0].s3Url, selectedUrl: responseData[0].s3Url, thumb_file: responseData[0].s3ThumbUrl }, () => this.onUpdateLocalState())
                    } console.log('ccc');
                    //console.log("VIDEO_COMPRESS response", response)
                }).catch((error) => { console.log('aaa');
                    this.setState({ isLoading: false, throwError: true }, () => setTimeout(() => this.setState({ throwError: false }), 2000))
                    this.uppyUploader.uppy.reset()
                })
            }
            catch (ex) { console.log('bbb');
                this.setState({ isLoading: false, throwError: true }, () => setTimeout(() => this.setState({ throwError: false }), 2000))
                this.uppyUploader.uppy.reset()
            }
            return false;
        }
    }
    uppyUploader = new UppyUpload(this.beforeFileAdded, this.beforeUpload)
    componentDidMount() {

        this.uppyUploader.uppy.on('transloadit:result', (stepName, result) => {
            this.setState({ type: result.mime.includes("video") ? 5 : 4, selectedFile: result.id, selectedUrl: `https://cloud.taggbox.com/onsiteupload/images/${result.id}` }, () => this.onUpdateLocalState())
        })

    }

    onUpdateLocalState = () => {
        const { addPostImage, isActiveIndex } = this.props;
        const { selectedUrl, type, thumb_file, videoPath } = this.state;
        addPostImage(selectedUrl, type == 5 ? thumb_file : selectedUrl, videoPath, type, isActiveIndex)
        this.setState({
            selectedFile: null,
            selectedUrl: null,
            type: null,
            thumb_file: "",
            fileSize: false,
            fileSizeText: "",
            videoPath: ""
        }, () => this.uppyUploader.uppy.reset())
    }
    render() {
        const { isLoading, fileSize, throwError, fileSizeText } = this.state;
        return <>
            <DragDrop

                note="Video Size : Max 100MB | Photo Size : Max 50MB | Max 3 Posts"
                uppy={this.uppyUploader.uppy}
                allowMultipleFiles={false}

                locale={{
                    strings: {
                        // Text to show on the droppable area.
                        // `%{browse}` is replaced with a link that opens the system file selection dialog.
                        dropHereOr: 'Drag a video / image to upload (optional)',
                        // Used as the label for the link that opens the system file selection dialog.
                        browse: '',
                    },
                }}
            />

            <div className="tb_onsite_uploader_status">
                <StatusBar
                    uppy={this.uppyUploader.uppy}
                    hideUploadButton
                    hideAfterFinish={false}
                    showProgressDetails
                />
                {isLoading ? <UppyUploader /> : null}
                {fileSize ? <div className="tb_onsite_uploader_limit_error submit_limit_size" style={{ marginTop: 5, display: `flex`, alignItems: `center` }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                        <g id="Stockholm-icons-/-Code-/-Info-circle" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                            <rect id="bound" x="0" y="0" width="24" height="24" />
                            <circle id="Oval-5" fill="#db4b20" opacity="0.3" cx="12" cy="12" r="10" />
                            <rect id="Rectangle-9" fill="#db4b20" x="11" y="10" width="2" height="7" rx="1" />
                            <rect id="Rectangle-9-Copy" fill="#db4b20" x="11" y="7" width="2" height="2" rx="1" />
                        </g>
                    </svg>
                    File Size ({fileSizeText}) Limit Exceeded.Video Size : Max 100MB
                </div> : null}
                {throwError ? <div className="tb_onsite_uploader_limit_error submit_limit_size" style={{ marginTop: 5, display: `flex`, alignItems: `center` }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                        <g id="Stockholm-icons-/-Code-/-Info-circle" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                            <rect id="bound" x="0" y="0" width="24" height="24" />
                            <circle id="Oval-5" fill="#db4b20" opacity="0.3" cx="12" cy="12" r="10" />
                            <rect id="Rectangle-9" fill="#db4b20" x="11" y="10" width="2" height="7" rx="1" />
                            <rect id="Rectangle-9-Copy" fill="#db4b20" x="11" y="7" width="2" height="2" rx="1" />
                        </g>
                    </svg>
                     Something went wrong , Please try again.
                </div> : null}
            </div>

        </>
    }
}

export default Uploads;