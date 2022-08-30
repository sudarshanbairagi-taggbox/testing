import React, { Component } from 'react'
import ReactStars from "react-rating-stars-component";
class OnSitePost extends Component {

    render() {
        const { isEdit, upload_image, onClickToRemove, onClickToEdit } = this.props;
        //console.log("upload_imageupload_imageupload_image",upload_image)
        return <>
            {
                upload_image && upload_image.map((viewItem, viewIndex) => <>
                    <div className='tb_onsite_post_area'>
                        <div className='tb_onsite_post_info'>
                            {viewItem.thumb_file ? <div className='tb_onsite_post_media' style={{backgroundImage:`url(${viewItem.thumb_file})`}}>
                            </div> : null}
                            <div className='tb_onsite_post_content_wrap'>
                                <div className='tb_onsite_post_content__'> {
                                    viewItem.caption && viewItem.caption.length > 0 ? viewItem.caption : viewItem.review && viewItem.review.length > 0 ? viewItem.review : null
                                }</div>
                                {(viewItem.caption == "" && viewItem.rating) || (viewItem.review && viewItem.review.length > 0) ? <ReactStars
                                    edit={false}
                                    count={5}
                                    size={20}
                                    value={viewItem.rating} /> : null}
                            </div>
                        </div>
                        <div className='tb_onsite_post_actions'>
                            <div className='tb_onsite_edit_post' onClick={onClickToEdit(viewIndex)}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                    <g data-name="Group 4328" transform="translate(10956 -4501)">
                                        <rect id="Rectangle_2068" data-name="Rectangle 2068" width="24" height="24" transform="translate(-10956 4501)" fill="none" opacity="0"></rect>
                                        <g id="Group_3906" data-name="Group 3906" transform="translate(-10953.868 4503.559)">
                                        <path id="Path_5042" data-name="Path 5042" d="M3.2,14.952,2.3,18.872a.985.985,0,0,0,.956,1.195,1.023,1.023,0,0,0,.206,0L7.4,19.158l7.571-7.543L10.746,7.4Z" transform="translate(0 -2.914)" fill="#AAAAAA"></path>
                                        <path id="Path_5043" data-name="Path 5043" d="M27.5,4.926l-2.82-2.82a.989.989,0,0,0-1.4,0L21.72,3.673l4.221,4.221,1.568-1.568a.989.989,0,0,0,0-1.4Z" transform="translate(-10.152 0)" fill="#AAAAAA"></path>
                                        </g>
                                    </g>
                                </svg>
                            </div>
                            <div className='tb_onsite_remove_post' onClick={onClickToRemove(viewIndex)}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                    <g data-name="Group 4331" transform="translate(10956 -4533)">
                                        <rect id="Rectangle_2069" data-name="Rectangle 2069" width="24" height="24" transform="translate(-10956 4533)" fill="none" opacity="0"></rect>
                                        <g id="Group_4324" data-name="Group 4324" transform="translate(-10952 4536)">
                                        <path id="Path_5188" data-name="Path 5188" d="M2.722,16.328A2,2,0,0,0,4.694,18h6.612a2,2,0,0,0,1.972-1.672L14,6H2ZM9,9.5A.5.5,0,0,1,9.5,9h1a.5.5,0,0,1,.5.5v5a.5.5,0,0,1-.5.5h-1a.5.5,0,0,1-.5-.5Zm-4,0A.5.5,0,0,1,5.5,9h1a.5.5,0,0,1,.5.5v5a.5.5,0,0,1-.5.5h-1a.5.5,0,0,1-.5-.5ZM15,2H11A2,2,0,0,0,9,0H7A2,2,0,0,0,5,2H1A1,1,0,0,0,1,4H15a1,1,0,0,0,0-2Z" fill="#AAAAAA" fill-rule="evenodd"></path>
                                        </g>
                                    </g>
                                </svg>
                            </div>
                        </div>
                    </div>
                </>)
            }
        </>
    }
}


export default OnSitePost;