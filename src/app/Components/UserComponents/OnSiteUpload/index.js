import React, { useState, Component } from 'react';
import { connect } from 'react-redux';
import AddCaption from './addCaption';
import SubmitPostField from './submitPost';
import SubmitReview from './submitReview';
import { submitPostData, onSitePopup, onsiteTokenUpdate } from '../../../../actions/themeActions'
import CloseButton from './Elements/closeButton';
import OnsiteLogo from './Elements/onSitelogo';
import AddUpload from './Elements/upload';
import Success from './success';

const validateEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}


const postInitialData = {
    file: null,
    caption: null,
    review: null,
    rating: 0,
    error: false,
    activeTab: 1,
    type: 1,
    thumb_file: "",
    videoPath: ""
}
class OnSiteUpload extends Component {


    state = {
        submitPost: true,
        activeTab: 1,
        isOpen: true,
        step: 1,
        wall_id: null,
        name: null,
        email: null,
        upload_image: [{
            file: null,
            caption: null,
            review: null,
            rating: 0,
            error: false,
            activeTab: 1,
            type: 1,
            thumb_file: "",
            videoPath: ""
        }],
        receiveMail: false,
        tandc: true,
        nameError: false,
        emailError: false,
        submitErrorMessage: null,
        apiRequest: false,
        isActiveIndex: 0,
        isAddMoreActive: false,
        isEdit: false,
        submitError: false
    }

    handleNext = event => this.setState({ submitPost: false })
    hanleTab1 = event => this.setState({ activeTab: 1 })
    hanleTab2 = event => this.setState({ activeTab: 2 })

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


    onClickToaddMore = event => {
        const { upload_image, isActiveIndex } = this.state;
        //console.log("onClickToaddMore upload_image", upload_image.length)
        if (upload_image && upload_image.length < 3) {
            upload_image.push({ file: null, caption: null, review: null, rating: 0, error: false, activeTab: 1, type: 1, thumb_file: "", videoPath: "" })
            // console.log("onClickToaddMore", upload_image.length, isActiveIndex, upload_image.length == 0 || upload_image.length == 1 ? 0 : parseInt(upload_image.length) - 1)
            this.setState({ isAddMoreActive: true, upload_image, isActiveIndex: upload_image.length == 0 || upload_image.length == 1 ? 0 : parseInt(upload_image.length) - 1, step: 1, activeTab: 1, submitError: false })
        }

    }
    onClickToUpdateMoreStep = (step) => event => {
        const { isAddMoreActive, isActiveIndex, upload_image } = this.state;
        if (isAddMoreActive && upload_image[isActiveIndex]) {
            upload_image.splice(isActiveIndex, 1);
        }
        this.setState({ isAddMoreActive: false, upload_image, step, isEdit: false, isActiveIndex: upload_image && upload_image.length > 0 && (parseInt(upload_image.length) - 1) > 0 ? (parseInt(upload_image.length) - 1) : 0, activeTab: 1 })
    }
    onClickToUpdateStep = (step) => event => {
        var isError = false;
        const { upload_image, isActiveIndex, activeTab } = this.state;
        if (upload_image && upload_image[isActiveIndex]) {
            if (activeTab == 1) {
                if (upload_image[isActiveIndex].caption == null || upload_image[isActiveIndex].caption == "" || upload_image[isActiveIndex].caption.length == 0) {
                    upload_image[isActiveIndex].error = true;
                    isError = true;
                }
                else upload_image[isActiveIndex].error = false

            }
            else if (activeTab == 2) {
                if (upload_image[isActiveIndex].review == null || upload_image[isActiveIndex].review == "" || upload_image[isActiveIndex].review.length == 0 || upload_image[isActiveIndex].rating == 0) {
                    upload_image[isActiveIndex].error = true;
                    isError = true;
                }
                else upload_image[isActiveIndex].error = false
            }

        }
        if (!isError) this.setState({ isAddMoreActive: false, upload_image, step, isEdit: false, activeTab: 1, submitErrorMessage: null })
        else this.setState({ upload_image })
    }


    onSubmitPostData = event => {
        const { name, email, upload_image, tandc, receiveMail, apiRequest } = this.state;
        const { wallId, onSite, modalPop } = this.props;


        this.setState({ submitError: false })
        if (tandc && (name && name.length > 0) && (email && email.length > 0 && validateEmail(email) && !email.includes("mailinator")) && (upload_image && upload_image.length > 0) && tandc) {
            this.setState({ apiRequest: true })
            submitPostData({ wall_id: wallId, name, email, upload_file: upload_image, receive_mail: receiveMail, onsite_token: modalPop.onsite_token }).then((response) => {
                const { onsite_token } = response.data;
                this.props.onsiteTokenUpdate(onsite_token)
                this.setState({ step: 3, apiRequest: false }, () => setTimeout(() => 
                this.props.onSitePopup(false) , 50000),document.querySelector('html').style.overflow="auto")
             })

                .catch((error) => {
                    const { data } = error.response;

                    if (data.response_code == 404) {
                        this.setState({ submitError: true, submitErrorMessage: data.message, apiRequest: false })
                    }
                    console.error(error);
                });
        }
        else {
            if (this.state.name == null || this.state.name.length == 0) this.setState({ nameError: true, apiRequest: false })
            if (this.state.email == null || this.state.email.length == 0 || !validateEmail(this.state.email) || email.includes("mailinator")) this.setState({ emailError: true, apiRequest: false })
            if (upload_image && upload_image.length == 0) this.setState({ submitError: true })

        }
    }



    addCaption = (activeIndex) => event => {
        const { upload_image } = this.state;

        if (upload_image && upload_image[activeIndex]) {

            upload_image[activeIndex].caption = event.target.value;
            upload_image[activeIndex].review = "";
            upload_image[activeIndex].rating = 0;
            upload_image[activeIndex].error = false;
            upload_image[activeIndex].activeTab = 1;


            this.setState({ upload_image })
        }
    }
    addReview = (activeIndex) => event => {
        const { upload_image } = this.state;
        if (upload_image && upload_image[activeIndex]) {
            upload_image[activeIndex].review = event.target.value;
            upload_image[activeIndex].caption = "";
            upload_image[activeIndex].error = false;
            upload_image[activeIndex].activeTab = 2;
            this.setState({ upload_image })
        }
    }



    addRatings = (rating, activeIndex) => {
        const { upload_image } = this.state;
        if (upload_image && upload_image[activeIndex]) {
            upload_image[activeIndex].caption = "";
            upload_image[activeIndex].rating = rating;
            upload_image[activeIndex].error = false;
            upload_image[activeIndex].activeTab = 2;
            this.setState({ upload_image })
        }
    }
    addPostImage = (file, thumb_file, videoPath, type, activeIndex) => {
        const { upload_image } = this.state;
        if (upload_image && upload_image[activeIndex]) {
            upload_image[activeIndex].file = file;
            upload_image[activeIndex].thumb_file = thumb_file;
            upload_image[activeIndex].videoPath = videoPath;
            upload_image[activeIndex].type = type;
            this.setState({ upload_image })
        }
    }

    onClickToRemove = (activeIndex) => event => {
        const { upload_image } = this.state;
        if (upload_image && upload_image.length > 0) {
            upload_image.splice(activeIndex, 1);
        }
        this.setState({ upload_image })
    }


    onClickToImageRemove = (activeIndex) => event => {
        const { upload_image } = this.state;
        if (upload_image && upload_image[activeIndex]) {
            upload_image[activeIndex].file = null;
            upload_image[activeIndex].thumb_file = "";
            upload_image[activeIndex].videoPath = "";
            upload_image[activeIndex].type = 1;
            this.setState({ upload_image })
        }
    }
    onClickToEdit = (activeIndex) => event => {
        const { upload_image } = this.state;
        let isActiveTab = 1;
        if (upload_image && upload_image[activeIndex]) {
            isActiveTab = upload_image[activeIndex].activeTab;
        }
        this.setState({ isActiveIndex: activeIndex, isEdit: true, step: 1, activeTab: isActiveTab })
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

    onUpdatereceiveMail = event => {
        const { receiveMail } = this.state;
        this.setState({ receiveMail: !receiveMail })
    }
    onUpdatetandc = event => {
        const { tandc } = this.state;
        this.setState({ tandc: !tandc })
    }


    onClosePopUp = () => {
        this.props.onSitePopup(false)
        document.querySelector('html').style.overflow = "auto";
    }

    render() {
        const { submitPost, activeTab, isActiveIndex, step, upload_image, isAddMoreActive, isEdit, name, email, receiveMail, tandc, nameError, emailError, apiRequest, submitError, submitErrorMessage } = this.state;
        const { wall } = this.props;

        const { onClosePopUp } = this;

        return (wall && wall.UgcSettings && Object.keys(wall.UgcSettings).length > 0) ? <div className='onsite_submit_post_main' style={{ backgroundImage: `url(${wall.UgcSettings.onsite_background_image})`, backgroundColor: wall.UgcSettings.onsite_background_color }}>
            <div className='tb_onsite_post_inner'>
                <div className='tb_onsite_upload_post'>
                    <div className='tb_onsite_box'>
                        <div className='tb_onsite_box_header'>
                            <CloseButton onClosePopUp={onClosePopUp} />
                            <OnsiteLogo wall={wall} />
                        </div>
                        {step == 1 ? <>
                            <div className='tb_onsite_box_title'>
                                <div className='tb_onsite_title'>{wall.UgcSettings.onsite_status ? wall.UgcSettings.onsite_popup_title : `Share Your Images With Us`}</div>
                                <div className='tb_onsite_sub_heading'>{wall.UgcSettings.onsite_status ? wall.UgcSettings.onsite_popup_sub_heading : `Upload your image featuring our brand products and get a chance to feature in our UGC lookbook. `}</div>
                            </div>
                            <div className='tb_onsite_box_body'>
                                <div className='tb_onsite_post_tabs'>
                                    <div className='tb_onsite_separator'>OR</div>
                                    <div className='tb_onsite_tabs_nav'>
                                        <div className={`tb_onsite_tabs${activeTab == 1 ? " active" : ""}`} onClick={this.hanleTab1}>Add Caption</div>
                                        <div className={`tb_onsite_tabs${activeTab == 2 ? " active" : ""}`} onClick={this.hanleTab2}>Submit Review</div>
                                    </div>
                                </div>
                                <div className='tb_onsite_tabs_content'>
                                    <AddUpload key={isActiveIndex} updateImageWithData={this.updateImageWithData} isActiveIndex={isActiveIndex} addPostImage={this.addPostImage} item={upload_image[isActiveIndex]} onClickToImageRemove={this.onClickToImageRemove} />
                                    {activeTab == 1 ? <AddCaption hasActive={this.handleNext} isActiveIndex={isActiveIndex} onClickToUpdateStep={this.onClickToUpdateStep} onClickToUpdateMoreStep={this.onClickToUpdateMoreStep} isAddMoreActive={isAddMoreActive} addCaption={this.addCaption} item={upload_image[isActiveIndex]} /> : <SubmitReview isActiveIndex={isActiveIndex} onClickToUpdateStep={this.onClickToUpdateStep} onClickToUpdateMoreStep={this.onClickToUpdateMoreStep} isAddMoreActive={isAddMoreActive} addReview={this.addReview} item={upload_image[isActiveIndex]} addRatings={this.addRatings} />}
                                </div>
                            </div>
                        </> : step == 2 ? <SubmitPostField submitError={submitError} submitErrorMessage={submitErrorMessage} onClickToaddMore={this.onClickToaddMore} onSubmitPostData={this.onSubmitPostData} upload_image={upload_image} isEdit={isEdit} onClickToRemove={this.onClickToRemove} onTextName={this.onTextName} onTextEmail={this.onTextEmail} name={name} email={email} receiveMail={receiveMail} tandc={tandc} onUpdatereceiveMail={this.onUpdatereceiveMail} nameError={nameError} emailError={emailError} wall={wall} onClickToEdit={this.onClickToEdit} apiRequest={apiRequest} /> : step == 3 ? <Success wall={wall} onClosePopUp={onClosePopUp} /> : null}
                    </div>
                </div>
            </div>
        </div> : null

    }
}
const mapStateToProps = state => {

    if (state.modalPop != undefined && state.modalPop.onSiteIsShowPopUp == true) {
        document.querySelector('html').style.overflow = "hidden";
    }

    return {
        modalPop: state.modalPop
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onSitePopup: (status) => dispatch(onSitePopup(status)),
        onsiteTokenUpdate: (token) => dispatch(onsiteTokenUpdate(token)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(OnSiteUpload);
