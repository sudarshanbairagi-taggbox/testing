
import React from 'react'
const PreviewUploadImage = ({ item, isActiveIndex, onClickToImageRemove }) => {
    return <>

        <img className="tb_onsite_uploaded" src={item.thumb_file} height="200" width="300" alt="Post" />
        <div className='tb_onsite_remove_ico' onClick={onClickToImageRemove(isActiveIndex)}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <g data-name="Group 4331" transform="translate(10956 -4533)">
                    <rect id="Rectangle_2069" data-name="Rectangle 2069" width="24" height="24" transform="translate(-10956 4533)" fill="none" opacity="0"></rect>
                    <g id="Group_4324" data-name="Group 4324" transform="translate(-10952 4536)">
                    <path id="Path_5188" data-name="Path 5188" d="M2.722,16.328A2,2,0,0,0,4.694,18h6.612a2,2,0,0,0,1.972-1.672L14,6H2ZM9,9.5A.5.5,0,0,1,9.5,9h1a.5.5,0,0,1,.5.5v5a.5.5,0,0,1-.5.5h-1a.5.5,0,0,1-.5-.5Zm-4,0A.5.5,0,0,1,5.5,9h1a.5.5,0,0,1,.5.5v5a.5.5,0,0,1-.5.5h-1a.5.5,0,0,1-.5-.5ZM15,2H11A2,2,0,0,0,9,0H7A2,2,0,0,0,5,2H1A1,1,0,0,0,1,4H15a1,1,0,0,0,0-2Z" fill="#545454" fill-rule="evenodd"></path>
                    </g>
                </g>
            </svg>
        </div>

    </>

}
export default PreviewUploadImage