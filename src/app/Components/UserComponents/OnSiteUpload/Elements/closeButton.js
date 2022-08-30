
import React from 'react'
const CloseButton = ({ onClosePopUp }) => {
    return <div className="tb_onsite_close_btn_wrapper" onClick={onClosePopUp}>
        <div className='tb_onsite_close_btn tb__icon tb-close-alt'><div></div></div>
        </div>
}
export default CloseButton