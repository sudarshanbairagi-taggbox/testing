import React, { PureComponent } from "react";
import { connect } from 'react-redux';
import { reportMedia, reportMediaClosePopUp } from '../../../../actions/themeActions'
import ReportSuccess from "./Elements/ReportSuccess";

const validateEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
class ReportMediaModal extends PureComponent {
    state = {
        email: '',
        reason: '',
        emailError: false,
        reasonError: false,
        submitErrorMessage: null,
        modalShow: false,
        successModal: false,
        loadbtn: false
    }

    componentDidMount() {
        setTimeout(() => this.setState({ modalShow: true }), 100);
    }

    onTextEmail = event => {
        this.setState({ email: event.target.value, emailError: false }, () => {
            if (this.state.email == null || this.state.email.length === 0 || !validateEmail(this.state.email) || this.state.email.includes("mailinator")) this.setState({ emailError: true })
        })
    }

    onTextReason = event => {
        this.setState({ reason: event.target.value, reasonError: false }, () => {
            if (this.state.reason == null || this.state.reason.length < 50) this.setState({ reasonError: true })
        })
    }

    onSubmitData = event => {
        const { email, reason } = this.state;
        const { item, wall } = this.props;
        const postId = item.id;
        const wallId = wall.Wall.id;


        if ((email && email.length > 0 && validateEmail(email) && !email.includes("mailinator"))) {
            if (reason != null && reason.length > 50) {
                this.setState({ loadbtn: true })
                reportMedia({ wall_id: wallId, post_id: postId, email: email, reason: reason }).then((response) => {
                    this.setState({ successModal: true })
                })
                    .catch((error) => {
                        const { data } = error.response;
                        if (data.response_code === 404) {
                            this.setState({ submitErrorMessage: data.message })
                        } else {
                            this.setState({ submitErrorMessage: 'Something went wrong' })
                        }
                        this.setState({ loadbtn: false })
                    });
            } else {
                this.setState({ reasonError: true })
            }
        } else {
            if (this.state.email == null || this.state.email.length === 0 || !validateEmail(this.state.email) || email.includes("mailinator")) this.setState({ emailError: true })
        }
    }
    onClose = event => {
        const { reportMediaClosePopUp } = this.props;
        reportMediaClosePopUp();
    }

    render() {
        const { email, reason, emailError, reasonError, submitErrorMessage, successModal, modalShow, loadbtn } = this.state;
        const { item, wall } = this.props;
        const mediaType = (item.type === 3 || item.type === 5) ? true : false
        const isYoutubePost = (item.network.id === 7) ? true : false

        return (
            <div className={`tb_report_media_modal ${modalShow ? `tb_modal_show` : ``}`}>
                <div className="tb_report_media_container">
                    <div className="tb_report_media_body">
                        <div className="tb_report_media_close" onClick={this.onClose}>
                            <svg xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                                <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd" >
                                    <g transform="translate(12.000000, 12.000000) rotate(-45.000000) translate(-12.000000, -12.000000) translate(4.000000, 4.000000)" fill="#000000">
                                        <rect x="0" y="7" width="16" height="2" rx="1" />
                                        <rect transform="translate(8.000000, 8.000000) rotate(-270.000000) translate(-8.000000, -8.000000)" x="0" y="7" width="16" height="2" rx="1" />
                                    </g>
                                </g>
                            </svg>
                        </div>
                        {successModal ? <ReportSuccess />
                            : <div className="tb_report_media_wrapper">
                                <div className="tb_report_media_title">Report This Post</div>
                                <div className="tb_report_media_p">This means it is inappropriate, it has violated a law, or it infringes upon someone's rights. Reporting this post will flag it for further review.</div>
                                {item.filename !== '' && item.filename != null ? <div className="tb_report_media__">
                                    <div className="tb_report_media_img" style={{ backgroundImage: `url(${item.filename})` }}>
                                        {mediaType ? isYoutubePost ? <div className="tb_report_media_youtube_ico tb__icon tb-youtube"> </div> : <div className="tb_report_media_video_ico tb__icon tb-play"> </div> : ''}
                                    </div>
                                </div> : null}
                                <div className="tb_report_media_form">
                                    <div className="tb_report_media_form_group">
                                        <div className="tb_report_media_label">Email <div className="tb_report_media_required">*</div> </div>
                                        <input type="email" value={email} className="tb_report_media_input" onChange={this.onTextEmail} placeholder="Enter email address" />
                                        {emailError ? <div className="tb_report_media_error_">* Please enter correct email.</div> : null}
                                    </div>
                                    <div className="tb_report_media_form_group">
                                        <div className="tb_report_media_label">Reason <div className="tb_report_media_required">*</div> </div>
                                        <textarea className="tb_report_media_input tb_report_media_textarea" value={reason} onChange={this.onTextReason} placeholder="I am reporting this media because..."></textarea>
                                        {reasonError ? <div className="tb_report_media_error_">* Please enter minimun 50 characters</div> : null}
                                    </div>
                                    <div className="tb_report_media_buttons">
                                        <div className="tb_report_media_cancel" onClick={this.onClose}>
                                            Cancel
                                    </div>
                                        <div className={`tb_report_media_submit ${loadbtn ? 'tb_report_media_spinner' : ''}`} onClick={this.onSubmitData}>
                                            Report
                                    </div>
                                    </div>
                                    {submitErrorMessage && submitErrorMessage.length > 0 ? <div className="tb_report_media_error">
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
                        }
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {

    }
}
const mapDispatchToProps = dispatch => {
    return {
        reportMediaClosePopUp: () => dispatch(reportMediaClosePopUp())
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ReportMediaModal);