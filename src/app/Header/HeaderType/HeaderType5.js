import React, { PureComponent } from "react";
import { CloudUrl } from '../../../constants'
import { styleHeaderBanner } from "./Elements/HeaderConstant";

export default class HeaderType5 extends PureComponent {
  render() {
    const { Banner} = this.props;
    const { bannerStyle, subTitleStyle, bannerStyleBgRight, titleStyle, iconAreaStyle, iconStyle, isFacebook, isTwitter, isInstagram, facebookIconStyle, twitterIconStyle, instagramIconStyle, subTitleVarentClass, titleVarentClass } = styleHeaderBanner(Banner);
    return (
      <div className="tb_wall_header_wrap__" style={bannerStyle}>
        <div className="tb_header5_row__">
          <div className="tb_header5_column_logo__">
            {Banner.LogoImage ?
              <div className="tb_header5_logo__">
                <img loading="lazy" className="tb_header5_logo_img__" src={Banner.LogoImage} width={180} height={52} />
              </div>
              : ''}
          </div>
          <div className="tb_header5_column_content__">
            <div className="tb_header5_content__">
              <div className={`tb_header5_subtitle__ tb-sGFfonte-${subTitleVarentClass}`} style={subTitleStyle}>{Banner.subTitle}</div>
              <div className={`tb_header5_title__ tb-sGFfonte-${titleVarentClass}`} style={titleStyle}>{Banner.title}</div>
            </div>
          </div>
          <div className="tb_header5_column_icons__">
            {Banner.social_icon_status == 1 ?<div className="tb_header5_right_bg" style={bannerStyleBgRight}> </div> : ''}
            {Banner.social_icon_status == 1 ? <div className="tb_header5_social_icons__">
              {isFacebook ?
                <a href={Banner.facebook_url} target="_blank" className="tb_header5_social_icon_list__">
                  <div className={`tb_header5_social_icon__ tb__icon tb-facebook`} style={{ ...iconStyle, ...facebookIconStyle }}> </div>
                </a> : ''}
              {isTwitter ?
                <a href={Banner.twitter_url} target="_blank" className="tb_header5_social_icon_list__">
                  <div className="tb_header5_social_icon__ tb__icon tb-twitter" style={{ ...iconStyle, ...twitterIconStyle }}> </div>
                </a> : ''}
              {isInstagram ?
                <a href={Banner.instagram_url} target="_blank" className="tb_header5_social_icon_list__">
                  <div className="tb_header5_social_icon__ tb__icon tb-instagram" style={{ ...iconStyle, ...instagramIconStyle }}> </div>
                </a> : ''}
            </div>
              : null} </div>
        </div>
      </div>
    );
  }
}
