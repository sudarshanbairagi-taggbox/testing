import React from 'react';

function Success(props) {
    const { wall } = props;
    return (
        <div className='tb_success_post'>
            <div className={`tb_success_post_box`}>
                <svg width="70" height="70" version="1.1" viewBox="0 0 700 700" xmlns="http://www.w3.org/2000/svg" fill="#6DC05E">
                    <path d="m350 536.67c68.07 0 133.36-27.043 181.49-75.176 48.133-48.137 75.176-113.42 75.176-181.49s-27.043-133.36-75.176-181.49c-48.137-48.133-113.42-75.176-181.49-75.176s-133.36 27.043-181.49 75.176c-48.133 48.137-75.176 113.42-75.176 181.49s27.043 133.36 75.176 181.49c48.137 48.133 113.42 75.176 181.49 75.176zm-133.23-249.9c4.3711-4.3438 10.285-6.7852 16.449-6.7852 6.168 0 12.078 2.4414 16.453 6.7852l53.664 53.668 135.1-135.1c6.0078-5.1445 14.211-6.8945 21.793-4.6523 7.5859 2.2422 13.516 8.1758 15.758 15.758 2.2461 7.5859 0.49219 15.789-4.6523 21.797l-151.67 151.67 0.003907-0.003906c-4.375 4.3477-10.285 6.7852-16.453 6.7852-6.1641 0-12.078-2.4375-16.449-6.7852l-70-70c-4.418-4.3789-6.9023-10.344-6.9023-16.566 0-6.2188 2.4844-12.184 6.9023-16.566z" />
                </svg>
                <div className={`tb_onsite_success_title sGFfonte-${wall.UgcSettings.onsite_font_varient_btn}`} style={{ color: wall.UgcSettings.onsite_thank_txt_color, fontFamily: wall.UgcSettings.onsite_css_font_msg, fontSize: parseInt(wall.UgcSettings.onsite_thank_fontSize) }}> {wall.UgcSettings.onsite_status ? wall.UgcSettings.onsite_succ_msg : `Thank you for sharing your amazing content with us.`}</div>
                <button className='tb_onsite_btn_primary' onClick={props.onClosePopUp}>Close</button>
            </div>
        </div >
    )
}

export default Success;