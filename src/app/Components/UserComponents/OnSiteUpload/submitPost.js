import React, { useState, Component } from 'react';
import OnSitePost from './Elements/onsitePost'



class SubmitPostField extends Component {

    render() {
        const { submitError, submitErrorMessage, wall, onClickToaddMore, onSubmitPostData, upload_image, onClickToRemove, isEdit, onTextName, onTextEmail, email, name, receiveMail, tandc, onUpdatereceiveMail, nameError, emailError, onClickToEdit, apiRequest } = this.props

        return <>
            <div className='tb_onsite_box_title'>
                <div className='tb_onsite_title'>Fill out the following information</div>
                <div className='tb_onsite_sub_heading'><div className="tb_onsite_sup">*</div> Indicates required field</div>
            </div>
            <div className='tb_onsite_box_body'>
                <div className='tb_onsite_tabs_content'>
                    {
                        (upload_image && upload_image.length > 0) ? <OnSitePost upload_image={upload_image} onClickToRemove={onClickToRemove} isEdit={isEdit} onClickToEdit={onClickToEdit} /> : null
                    }
                    <div className='tb_onsite_form'>
                        <div>
                            <div className='tb_onsite_form_group'>
                                <div className='tb_onsite_form_label'>Your Name<div className="tb_onsite_sup">*</div></div>
                                <input type="text" className='tb_onsite_form_control' placeholder='Enter Your Name' onChange={onTextName} value={name} />
                                {nameError ? <div className='tb_onsite_error'>Please enter correct your name.</div> : null}
                            </div>
                            <div className='tb_onsite_form_group'>
                                <div className='tb_onsite_form_label'>Email Address<div className="tb_onsite_sup">*</div></div>
                                <input type="email" className='tb_onsite_form_control' placeholder='Enter Your Email' onChange={onTextEmail} value={email} />
                                {emailError ? <div className='tb_onsite_error'>Please enter correct email.</div> : null}
                            </div>
                            <div className='tb_onsite_form_group'>
                                <label className='tb_onsite_checkbox'><input type="checkbox" checked={receiveMail} onClick={onUpdatereceiveMail} /><div className='tb_onsite_checkbox_ico'></div> I want to receive email updates.</label>
                            </div>
                            <div className='tb_onsite_terms_condition'>By clicking on Submit, you are agreeing to our <a href={wall.UgcSettings.onsite_term_url} target="_blank">terms and conditions *</a></div>
                            {submitError ? <div className='tb_onsite_error'>* {submitErrorMessage ? submitErrorMessage : upload_image && upload_image.length == 0 ? `Please include atleast one post.` : `Please check complete details.`}</div> : null}
                            <div className='tb_onsite_form_actions_footer'>
                                <div className='tb_onsite_btn_wrapper'>
                                    <div className='tb_onsite_btn_secondary' onClick={onClickToaddMore}>+ Add More Post</div>
                                    <div className='tb_onsite_post_limits'><div className="tb_onsite_sup">*</div> Max 3 Posts</div>
                                </div>
                                <div className={`tb_onsite_btn_primary${apiRequest ? ` tb_onsite_spinner` : ``}`} onClick={onSubmitPostData}>{wall.UgcSettings.onsite_popup_btn_txt}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    }
}

export default SubmitPostField;