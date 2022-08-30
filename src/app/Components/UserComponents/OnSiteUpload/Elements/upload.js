
import React, { useState, Component } from 'react';
import Uploads from '../../submitPic/upload'
import PreviewUploadImage from './previewImage'

class AddUpload extends Component {

    render() {
        const { updateImageWithData, isActiveIndex, addPostImage, item, onClickToImageRemove } = this.props
        return <div className='tb_onsite_add_caption_tab'>
            <div className='tb_onsite_image_upload_box'>
                <div className='tb_onsite_upload_box_content'>
                    {
                        (item && Object.keys(item).length > 0 && item.thumb_file) ? <PreviewUploadImage item={item} isActiveIndex={isActiveIndex} onClickToImageRemove={onClickToImageRemove} /> : <Uploads updateImageWithData={updateImageWithData} isActiveIndex={isActiveIndex} addPostImage={addPostImage} />
                    }
                </div>
            </div>
        </div>
    }

}


export default AddUpload;