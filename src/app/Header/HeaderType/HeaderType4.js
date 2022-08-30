import React, { PureComponent } from "react";
import { styleHeaderBanner } from "./Elements/HeaderConstant";

export default class HeaderType4 extends PureComponent {
  render() {
    const { Banner } = this.props;
    const { bannerStyle, subTitleStyle, titleStyle, iconAreaStyle, iconStyle, isFacebook, isTwitter, isInstagram, facebookIconAreaStyle, facebookIconStyle, twitterIconAreaStyle, twitterIconStyle, instagramIconAreaStyle, instagramIconStyle, subTitleVarentClass, titleVarentClass } = styleHeaderBanner(Banner);

    return (
      <div className="tb_wall_header_wrap__" style={bannerStyle}>
        <div className="tb_header4_row__">
          <div className="tb_header4_column_content__">
            <div className="tb_header4_content__">
              <div className={`tb_header4_subtitle__ tb-sGFfonte-${subTitleVarentClass}`} style={subTitleStyle}>{Banner.subTitle}</div>
              <div className={`tb_header4_title__ tb-sGFfonte-${titleVarentClass}`} style={titleStyle}>{Banner.title}</div>
            </div>
          </div>
          <div className="tb_header4_column_icons__">
            {Banner.social_icon_status == 1 ? <div className="tb_header4_social_icons__">
              {isFacebook ?
                <a href={Banner.facebook_url} target="_blank" className="tb_header4_social_icon_list__" style={{ ...iconAreaStyle, ...facebookIconAreaStyle }}>
                  <div className={`tb_header4_social_icon__ tb__icon tb-facebook`} style={{ ...iconStyle, ...facebookIconStyle }}> </div>
                </a> : ''}
              {isTwitter ?
                <a href={Banner.twitter_url} target="_blank" className="tb_header4_social_icon_list__" style={{ ...iconAreaStyle, ...twitterIconAreaStyle }}>
                  <div className="tb_header4_social_icon__ tb__icon tb-twitter" style={{ ...iconStyle, ...twitterIconStyle }}> </div>
                </a> : ''}
              {isInstagram ?
                <a href={Banner.instagram_url} target="_blank" className="tb_header4_social_icon_list__" style={{ ...iconAreaStyle, ...instagramIconAreaStyle }}>
                  <div className="tb_header4_social_icon__ tb__icon tb-instagram" style={{ ...iconStyle, ...instagramIconStyle }}> </div>
                </a> : ''}
            </div>
              : null}</div>
        </div>
      </div>
    );
  }
}
