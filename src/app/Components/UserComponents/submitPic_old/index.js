import React, { Component, Fragment } from 'react';
import cookie from 'react-cookies'
import { connect } from 'react-redux';
import ReactStars from "react-rating-stars-component";
import ReactTooltip from 'react-tooltip';
import './assets/css/submit-pic.css'
import './assets/css/product-tab.css'
import Uploads from './upload'
import ProductTab from './productTab'
import { submitPostData, onSiteTokenUpdate } from '../../../../actions/themeActions'

const IMG_PATH = `https://test.taggbox.com/commerce/img/onsite-upload/`
const validateEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

class SubmitPic extends Component {
    state = {
        isOpen: true,
        step: 1,
        wall_id: null,
        name: null,
        email: null,
        upload_image: [
        ],
        receiveMail: false,
        tandc: true,
        nameError: false,
        emailError: false,
        submitErrorMessage: null,
        apiRequest: false
    }
    onShowCloseSubmitPicPopUp = event => {

        const { isOpen } = this.state;
        this.setState({ isOpen: !isOpen })

    }
    updateImageWithData = (data) => {
        const { upload_image } = this.state;
        if (upload_image && upload_image.length < 3) {
            upload_image.push(data);
            this.setState({ upload_image })
        }
    }
    onUpdateImageAddCaption = (index) => event => {
        const { upload_image } = this.state;
        if (upload_image && upload_image.length > 0 && upload_image[index]) {

            upload_image[index].caption = event.target.value;
            upload_image[index].review = "";
            upload_image[index].rating = 0;
            this.setState({ upload_image })
        }
    }
    onUpdateImageAddReview = (index) => event => {
        const { upload_image } = this.state;
        if (upload_image && upload_image.length > 0 && upload_image[index]) {
            upload_image[index].review = event.target.value;
            upload_image[index].caption = "";
            this.setState({ upload_image })
        }
    }

    onUpdateImageAddRatings = (rating, index) => {
        const { upload_image } = this.state;
        if (upload_image && upload_image.length > 0 && upload_image[index]) {
            upload_image[index].caption = "";
            upload_image[index].rating = rating;
            this.setState({ upload_image })
        }
    }
    onUpdateStep = (step) => event => {
        var isError = false;
        const { upload_image } = this.state;
        if (step == 2) {
            if (upload_image && upload_image.length > 0) {
                upload_image.map((item, index) => {
                    if (item.activeTab == 1) {
                        if (item.caption == "" || item.caption.length == 0) {
                            item.error = true;
                            isError = true;
                        }
                        else item.error = false

                    }
                    else if (item.activeTab == 2) {
                        if (item.review == "" || item.review.length == 0 || item.rating == 0) {
                            item.error = true;
                            isError = true;
                        }
                        else item.error = false
                    }
                })
            }

        }


        if (!isError) { this.setState({ step, submitErrorMessage: null }) }
        else this.setState({ upload_image })
    }
    onTextName = event => {
        this.setState({ name: event.target.value, nameError: false }, () => {
            if (this.state.name == null || this.state.name.length == 0) this.setState({ nameError: true })
        })
    }
    onTextEmail = event => {
        this.setState({ email: event.target.value, emailError: false }, () => {
            if (this.state.email == null || this.state.email.length == 0 || !validateEmail(this.state.email) || this.state.email.includes("mailinator")) this.setState({ emailError: true })
        })
    }
    onSubmitData = event => {
        const { name, email, upload_image, tandc, receiveMail, apiRequest } = this.state;
        const { wallId, onSite } = this.props;
        if (tandc && (name && name.length > 0) && (email && email.length > 0 && validateEmail(email) && !email.includes("mailinator")) && (upload_image && upload_image.length > 0) && tandc) {
            this.setState({ apiRequest: true })
            submitPostData({ wall_id: wallId, name, email, upload_file: upload_image, receive_mail: receiveMail, onsite_token: onSite. }).then((response) => {
                const { onsite_token } = response.data;
                this.props.onSiteTokenUpdate(onsite_token)

                this.setState({ step: 3, apiRequest: false }, () => setTimeout(() => {
                    if (window.location.href && window.location.href.includes("onsite-upload")) {
                        window.location.href = `https://widget.taggbox.com/${wallId}`;
                    }
                }, 2000))
            })
                .catch((error) => {
                    const { data } = error.response;
                    if (data.response_code == 404) {
                        this.setState({ submitErrorMessage: data.message, apiRequest: false })
                    }
                    console.error(error);
                });
        }
        else {
            if (this.state.name == null || this.state.name.length == 0) this.setState({ nameError: true, apiRequest: false })
            if (this.state.email == null || this.state.email.length == 0 || !validateEmail(this.state.email) || email.includes("mailinator")) this.setState({ emailError: true, apiRequest: false })
        }
    }
    onUpdatereceiveMail = event => {
        const { receiveMail } = this.state;
        this.setState({ receiveMail: !receiveMail })
    }
    onUpdatetandc = event => {
        const { tandc } = this.state;
        this.setState({ tandc: !tandc })
    }
    removeProductImage = (removeIndex) => event => {
        const { upload_image } = this.state;
        if (upload_image && upload_image.length > 0) {
            upload_image.splice(removeIndex, 1);
        }
        this.setState({ upload_image })
    }

    updateActiveTab = (updateIndex, activeTab) => {
        let { upload_image } = this.state;
        if (upload_image && upload_image.length > 0) {
            upload_image.map((item, index) => {
                if (index == updateIndex) {

                    upload_image[index].activeTab = activeTab;

                }
            })
        }
        this.setState({ upload_image });
    }

    render() {

        const { isOpen, upload_image, step, name, email, receiveMail, tandc, nameError, emailError, submitErrorMessage, apiRequest } = this.state;
        const { wall, onClosePopUp, onSite } = this.props;

        return <>


            {isOpen ?
                <div id="modalPost" className="modalId716 submit_pic_tb_modal_001 submit_pic_tb_fade submit_pic_modal-text-image  submit_pic_webModalPopup submit_pic_themeModal55 ">
                    <div className="submit_pic_tb_modal_dialog submit_pic_taggModal">
                        <div className="submit_pic_tb_conetent">


                            {step == 3 ? <div className="submit_pic_success_modal_body">
                                <div className="submit_pic_tb_close_wrap">
                                    <div className="submit_pic_tb_close_btn" data-dismiss="modal" onClick={onClosePopUp} >
                                        <svg xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                                            <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                                <g transform="translate(12.000000, 12.000000) rotate(-45.000000) translate(-12.000000, -12.000000) translate(4.000000, 4.000000)" fill="#000000">
                                                    <rect x="0" y="7" width="16" height="2" rx="1"></rect>
                                                    <rect transform="translate(8.000000, 8.000000) rotate(-270.000000) translate(-8.000000, -8.000000) " x="0" y="7" width="16" height="2" rx="1"></rect>
                                                </g>
                                            </g>
                                        </svg>
                                    </div>
                                </div>
                                <div className="submit_pic_success_modal_content">
                                    <div className="submit_pic_success_modal_content_h">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="65" height="65" viewBox="0 0 75 75">
                                            <g data-name="Group 7979" transform="translate(-1011 -411)">
                                                <circle id="Ellipse_454" data-name="Ellipse 454" cx="37.5" cy="37.5" r="37.5" transform="translate(1011 411)" fill="#6ac259" />
                                                <g id="Group_4566" data-name="Group 4566" transform="translate(1033.57 437.042)">
                                                    <path id="Path_5270" data-name="Path 5270" d="M275.762,248.9a3.647,3.647,0,0,0-5.134,0l-13.115,13.115-3.759-3.792a3.693,3.693,0,0,0-5.134,5.266l5.992,6.349a3.706,3.706,0,0,0,5.187,0L275.776,254.1a3.713,3.713,0,0,0-.013-5.206Z" transform="translate(-247.74 -247.84)" fill="#fff" />
                                                </g>
                                            </g>
                                        </svg>
                                    </div>
                                    <div className={`submit_pic_success_modal_content_p sGFfonte-${wall.UgcSettings.onsite_font_varient_btn}`} style={{ color: wall.UgcSettings.onsite_thank_txt_color, fontFamily: wall.UgcSettings.onsite_css_font_msg, fontSize: parseInt(wall.UgcSettings.onsite_thank_fontSize) }}>
                                        {wall.UgcSettings.onsite_status ? wall.UgcSettings.onsite_succ_msg : `Thank you for sharing your amazing content with us.`}
                                    </div>
                                    <div className="submit_pic_success_modal_close_btn" onClick={onClosePopUp}>Close</div>
                                </div>
                            </div> :

                                <div className="submit_pic_tb_modal_body">
                                    <div className="submit_pic_tb_close_wrap">
                                        <div className="submit_pic_tb_close_btn" data-dismiss="modal" onClick={onClosePopUp} >
                                            <svg xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                                                <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                                    <g transform="translate(12.000000, 12.000000) rotate(-45.000000) translate(-12.000000, -12.000000) translate(4.000000, 4.000000)" fill="#000000">
                                                        <rect x="0" y="7" width="16" height="2" rx="1"></rect>
                                                        <rect transform="translate(8.000000, 8.000000) rotate(-270.000000) translate(-8.000000, -8.000000) " x="0" y="7" width="16" height="2" rx="1"></rect>
                                                    </g>
                                                </g>
                                            </svg>
                                        </div>
                                    </div>
                                    <div className="submit_pic_tb_modal_body_wrap">
                                        <div className="submit_pic_tb_details_left">
                                            {step == 1 ? <div className="submit_pic_tb_media_wrap_002">
                                                <div className="submit_pic_h3">{wall.UgcSettings.onsite_status ? wall.UgcSettings.onsite_popup_title : `Share Your Images With Us`}</div>
                                                <div className="submit_pic_p"> {wall.UgcSettings.onsite_status ? wall.UgcSettings.onsite_popup_sub_heading : `Upload your image featuring our brand products and get a chance to feature in our UGC lookbook. `} </div>
                                                <div className="submit_pic_uploader_container">
                                                    <Uploads updateImageWithData={this.updateImageWithData} />
                                                </div>

                                                {/* <div className="submit_pic_help" data-multiline="true" data-className="hover-text" data-tip="Max. 3 Photos <br/>50MB Files Size JPG or PNG Only">
                                                    Help
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="14.897" height="14.897" viewBox="0 0 14.897 14.897">
                                                        <path id="Path_4755" data-name="Path 4755" d="M12.448,5A7.448,7.448,0,1,1,5,12.448,7.448,7.448,0,0,1,12.448,5ZM11.9,14.931a.865.865,0,0,0-.877.881.875.875,0,0,0,.877.892.886.886,0,0,0,.9-.892A.877.877,0,0,0,11.9,14.931Zm.563-6.739a2.509,2.509,0,0,0-2.671,2.42l0,.066a.219.219,0,0,0,.206.232h1.093a.291.291,0,0,0,.279-.209l.006-.025a1.089,1.089,0,0,1,1.079-.882.94.94,0,0,1,1.04.974,1,1,0,0,1-.667.91l-.462.179a1.721,1.721,0,0,0-1.207,2.064.257.257,0,0,0,.257.256h.873a.257.257,0,0,0,.255-.22l0-.024c0-.526.347-.654.834-.82a2.477,2.477,0,0,0,1.733-2.423A2.443,2.443,0,0,0,12.464,8.192Z" transform="translate(-5 -5)" fill="#cbcbcb" fill-rule="evenodd" />
                                                    </svg>
                                                </div>
                                                <ReactTooltip /> */}
                                            </div>
                                                : <div className="submit_pic_tb_media_wrap_002">
                                                    <div className="submit_pic_h3">Fill out the following information</div>
                                                    <div className="submit_pic_strong"><div className="submit_pic_required">*</div> Indicates required field</div>
                                                    <div className="submit_pic_post_submit_form_wrap">
                                                        <div className="submit_pic_post_submit_form">
                                                            <div className="submit_pic_form_group">
                                                                <label className="submit_pic_form_label" for="displayName">Your Name <div className="submit_pic_required">*</div></label>
                                                                <input className="submit_pic_input_box" type="text" id="displayName" name="firstname" placeholder="Enter your name.." onChange={this.onTextName} value={name} />
                                                                {nameError ? <div className="submit_pic_error_">* Please enter correct your name.</div> : null}
                                                            </div>
                                                            <div className="submit_pic_form_group">
                                                                <label className="submit_pic_form_label" for="emailID">Email Address <div className="submit_pic_required">*</div></label>
                                                                <input className="submit_pic_input_box" value={email} type="text" id="emailID" name="lastname" placeholder="Enter your email id.." onChange={this.onTextEmail} />
                                                                {emailError ? <div className="submit_pic_error_">* Please enter correct email.</div> : null}
                                                            </div>

                                                        </div>
                                                        <div className="submit_pic_form_terms">
                                                            <div className="submit_pic_email_updates">
                                                                <label class="submit_pic_checkbox_" for="receiveMail____">
                                                                    <input type="checkbox" id="receiveMail____" name="receiveMail" checked={receiveMail} onClick={this.onUpdatereceiveMail} />
                                                                    <div className="submit_pic_checkbox__in"></div>I want to receive email updates.
                                                            </label>
                                                            </div>
                                                            <div className="submit_pic_terms_conditions">
                                                                By clicking on Submit, you are agreeing to our <a href={wall.UgcSettings.onsite_term_url} target="_blank"> terms and conditions </a>
                                                                <div className="submit_pic_required">*</div>
                                                            </div>
                                                            {tandc == false ? <div className="submit_pic_error_" >* Please agree to the terms and conditions to submit your media.</div> : null}


                                                            {submitErrorMessage && submitErrorMessage.length > 0 ? <div className="submit_pic_limit_error">
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                                                                    <g id="Stockholm-icons-/-Code-/-Info-circle" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                                                        <rect id="bound" x="0" y="0" width="24" height="24" />
                                                                        <circle id="Oval-5" fill="#db4b20" opacity="0.3" cx="12" cy="12" r="10" />
                                                                        <rect id="Rectangle-9" fill="#db4b20" x="11" y="10" width="2" height="7" rx="1" />
                                                                        <rect id="Rectangle-9-Copy" fill="#db4b20" x="11" y="7" width="2" height="2" rx="1" />
                                                                    </g>
                                                                </svg>
                                                                {submitErrorMessage}
                                                            </div> : null}


                                                        </div>
                                                    </div>
                                                </div>
                                            }
                                        </div>
                                        <div className="submit_pic_tb_details_right">
                                            <div className="submit_pic_tb_content_wrap">
                                                <div className="submit_pic_tb_post_detail_wrap">
                                                    <div className="submit_pic_tb_post_wrapper tb_submit_pic_product">
                                                        {step == 1 ? <div className="tb_product_submit_scroll">
                                                            {
                                                                upload_image && upload_image.length > 0 ? <ProductTab upload_image={upload_image} onUpdateImageAddCaption={this.onUpdateImageAddCaption} onUpdateImageAddReview={this.onUpdateImageAddReview} onUpdateImageAddRatings={this.onUpdateImageAddRatings} onRemoveImage={this.removeProductImage} updateActiveTab={this.updateActiveTab} /> : <div className="submit_pic_tb_img_holder">
                                                                    <img className="submit_pic_content_no_img" src="https://cloud.taggbox.com/widget/widget-embed/image_icon.svg" />
                                                                    <div className="submit_pic_content_p">No content uploaded.</div>
                                                                </div>
                                                            }
                                                        </div>
                                                            : <div className="tb_product_submit_scroll">
                                                                {
                                                                    (upload_image && upload_image.length > 0) ? upload_image.map((viewItem, viewIndex) => <div key={viewIndex} className="submit_pic_post_data_wrap" key={viewIndex}>
                                                                        <div className="submit_pic_submit_post_wrap">
                                                                            <img className="submit_pic_submit_post" src={viewItem.thumb_file} />
                                                                            <div className="submit_pic_remove_post" onClick={this.removeProductImage(viewIndex)}>
                                                                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">
                                                                                    <g id="tb_close----" data-name="Group 1" transform="translate(1 1)">
                                                                                        <circle id="tb_Ellipse_1" data-name="Ellipse 1" cx="9" cy="9" r="9" transform="translate(-1 -1)" fill="#db4b20" />
                                                                                        <rect id="tb_Rectangle_1" data-name="Rectangle 1" width="11.893" height="1.487" rx="0.743" transform="translate(4.321 3.27) rotate(45)" fill="#fff" />
                                                                                        <rect id="tb_Rectangle_2" data-name="Rectangle 2" width="11.893" height="1.487" rx="0.743" transform="translate(12.73 4.321) rotate(135)" fill="#fff" />
                                                                                    </g>
                                                                                </svg>
                                                                            </div>
                                                                        </div>
                                                                        <div className="submit_pic_submit_post_content_wrap">
                                                                            <div className="submit_pic_submit_post_content">
                                                                                {
                                                                                    viewItem.caption && viewItem.caption.length > 0 ? viewItem.caption : viewItem.review && viewItem.review.length > 0 ? viewItem.review : null
                                                                                }
                                                                            </div>
                                                                            {(viewItem.caption == "" && viewItem.rating) || (viewItem.review && viewItem.review.length > 0) ? <ReactStars
                                                                                edit={false}
                                                                                count={5}
                                                                                size={16}
                                                                                color="#d1d1d1"
                                                                                activeColor="#F8B808"
                                                                                value={viewItem.rating} /> : null}
                                                                        </div>

                                                                    </div>)
                                                                        : <div className="submit_pic_tb_img_holder">
                                                                            <img className="submit_pic_content_no_img" src="https://cloud.taggbox.com/widget/widget-embed/no-camera.svg" />
                                                                            <div className="submit_pic_content_p">No content uploaded.</div>
                                                                        </div>}

                                                            </div>
                                                        }


                                                    </div>
                                                    <div className="submit_pic_tb_post_footer">
                                                        <div>
                                                            {
                                                                step == 2 ? <div className="submit_pic_btn_outline" onClick={this.onUpdateStep(1)}>Back</div> : ''
                                                            }
                                                        </div>
                                                        <div className={`submit_pic_btn ${upload_image.length > 0 ? `` : `submit_pic_disabled`}   ${step == 1 ? `` : apiRequest ? `submit_pic_spinner` : ``}`} onClick={upload_image.length > 0 ? step == 1 ? this.onUpdateStep(2) : this.onSubmitData : null}>
                                                            {step == 1 ? `Next` : `${wall.UgcSettings.onsite_popup_btn_txt}`}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                </div>
                : null
            }</>
    }
}

const mapStateToProps = state => {

    return {
        onSite: state.onSite
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onSiteTokenUpdate: (token) => dispatch(onSiteTokenUpdate(token)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SubmitPic);