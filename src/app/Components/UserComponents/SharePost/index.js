import React, { PureComponent } from "react";
import { connect } from 'react-redux';
import { sharePostByEmail, sharePostClosePopUP } from '../../../../actions/themeActions';
import SharedSuccess from "./Elements/SharedSuccess";


const validateEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

class SharePostModal extends PureComponent {

    state = {
        email: null,
        emailError: false,
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
            if (this.state.email == null || this.state.email.length == 0 || !validateEmail(this.state.email) || this.state.email.includes("mailinator")) this.setState({ emailError: true })
        })

    }

    onSubmitData = event => {
        const { email } = this.state;
        const userName = this.props.userName;
        const postLink = this.props.postLink;

        if ((email && email.length > 0 && validateEmail(email) && !email.includes("mailinator"))) {
            this.setState({ loadbtn: true })
            sharePostByEmail({ email: email, username: userName, link: postLink }).then((response) => {
                this.setState({ successModal: true, loadbtn: false })
            })
                .catch((error) => {
                    this.setState({ loadbtn: false })
                    const { data } = error.response;
                    if (data.response_code == 404) {
                        this.setState({ submitErrorMessage: data.message })
                    } else {
                        this.setState({ submitErrorMessage: 'Something went wrong' })
                    }
                });
        }
        else {
            if (this.state.email == null || this.state.email.length == 0 || !validateEmail(this.state.email) || email.includes("mailinator")) this.setState({ emailError: true })
        }
    }

    onClose = event => {
        const { sharePostClosePopUP } = this.props;
        sharePostClosePopUP();
    }
    render() {
        const { email, emailError, submitErrorMessage, successModal, modalShow, loadbtn } = this.state;
        return (
            <div className={`tb_share_post_modal ${modalShow ? `tb_modal_show` : ``}`}>
                <div className="tb_share_post_container">
                    <div className="tb_share_post_body">
                        <div className="tb_share_post_close" onClick={this.onClose}>
                            <div className="tb_share_close_ico tb__icon tb-close-alt"> </div>
                        </div>
                        {successModal ?
                            <SharedSuccess />
                            :
                            <div className="tb_share_post_wrapper">
                                <div className="tb_share_post_title">Share This Social Post On Email</div>
                                <div className="tb_share_post_p">Share the social media post with anyone by entering the email address below.</div>

                                <div className="tb_share_post_form">
                                    <div className="tb_share_post_form_group">
                                        <div className="tb_share_post_label">Email <div className="tb_share_post_required">*</div></div>
                                        <input type="email" value={email} className="tb_share_post_input" onChange={this.onTextEmail} placeholder="Enter email address" />
                                        {emailError ? <div className="tb_share_post_error_">* Please enter correct email.</div> : null}
                                    </div>
                                    <div className="tb_share_post_buttons">
                                        <div className="tb_share_post_cancel" onClick={this.onClose}>
                                            Cancel
                                        </div>
                                        <div className={`tb_share_post_submit ${loadbtn ? 'tb_share_post_spinner' : ''}`} onClick={this.onSubmitData}>
                                            Submit
                                        </div>
                                    </div>
                                    {submitErrorMessage && submitErrorMessage.length > 0 ? <div className="tb_share_post_error">
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
        sharePostClosePopUP: () => dispatch(sharePostClosePopUP())
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(SharePostModal);