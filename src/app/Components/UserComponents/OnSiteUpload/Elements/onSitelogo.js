
import React from 'react'
const OnsiteLogo = (props) => {
    const { wall } = props
    return wall.UgcSettings && wall.UgcSettings.onsite_logo && wall.UgcSettings.onsite_logo != "" ? <div className='tb_onsite_logo_wrap'>
        <img src={wall.UgcSettings.onsite_logo} className='tb_onsite_popup_logo' width="400" height="50" alt='logo' />
    </div> : null
}
export default OnsiteLogo