import React, { PureComponent } from "react";
import { connect } from 'react-redux';
import { sharePostPopUP, themePostTracking } from '../../../../actions/themeActions'
//import { FacebookShareButton, FacebookIcon } from 'react-share';
let link = window.location.href;

class PopUpShare extends PureComponent {


    componentDidMount() {
        if (window.twttr) window.twttr.ready((twttr) => {
            window.twttr.events.bind('tweet', this.onTwitterClick);
        });
        if (window.twttr) window.twttr.ready((twttr) => {
            window.twttr.events.bind('tweet', this.onTwitterClick);
        });
    }

    componentWillReceiveProps(nextProps) {
        if (window.twttr) window.twttr.ready((twttr) => {
            window.twttr.events.bind('tweet', this.onTwitterClick);
        });
        if (window.twttr) window.twttr.ready((twttr) => {
            window.twttr.events.bind('tweet', this.onTwitterClick);
        });
    }


    onShareFacebooklink = (shareURL) => event => {

        window.open(shareURL, "_target")
        const { item, wall } = this.props;
        themePostTracking({
            type: 2,
            action: 2,
            wall: wall.Wall.id,
            feed: item.feedId,
            post: item.referenceId ? item.referenceId : item.id,
        })

    }


    onTwitterClick = event => {
        const { item, wall } = this.props;
        if (event) {
            themePostTracking({
                type: 2,
                action: 2,
                wall: wall.Wall.id,
                feed: item.feedId,
                post: item.referenceId ? item.referenceId : item.id,
            })
        }
        window.open(item.share.twitter, "_target")
    }

    linkedinShareCount = (shareURL) => event => {
        const { item, wall } = this.props;
        themePostTracking({
            type: 2,
            action: 2,
            wall: wall.Wall.id,
            feed: item.feedId,
            post: item.referenceId ? item.referenceId : item.id,
        })
        window.open(shareURL, "_target")

    }


    render() {

        const { sharePostPopUP, item, color } = this.props;

        const fontStyle = {
            color: color
        };


        return (
            <div className="tb_post_modal_post_footer_social_">
                <div className="tb_post_modal_share_ico">

                    <div className="tb_post_modal_social_ico_list___">
                        <div onClick={this.onShareFacebooklink(item.share.facebook)}>
                            <div className="tb_post_modal_share_button tb__icon tb-facebook" style={fontStyle}> </div>
                        </div>
                    </div>

                    <div className="tb_post_modal_social_ico_list___" >
                        <div className="tb_post_modal_share_button tb__icon tb-twitter" onClick={this.onTwitterClick} style={fontStyle}> </div>
                    </div>
                    <div className="tb_post_modal_social_ico_list___">
                        <div className="tb_post_modal_share_button tb__icon tb-linkedin" onClick={this.linkedinShareCount(item.share.linkedin)} style={fontStyle}></div>
                    </div>
                    <div className="tb_post_modal_social_ico_list___" onClick={event => sharePostPopUP(item)}>
                        <div className="tb_post_modal_share_button tb__icon tb-Mail" style={fontStyle}> </div>
                    </div>
                    <div className="tb_post_modal_social_ico_list___ tb_post_link__" onClick={event => window.open(item.link, "_blank")}>
                        <div className="tb_post_modal_share_button tb__icon tb-link" style={fontStyle}> </div>
                    </div>
                </div>
            </div >
        );
    }
}

const mapStateToProps = state => {
    return {


    }
}
const mapDispatchToProps = dispatch => {
    return {
        sharePostPopUP: (data) => dispatch(sharePostPopUP(data)),

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(PopUpShare);