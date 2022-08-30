import React, { PureComponent } from "react";
import { CloudUrl } from "../../../../constants";
import { fontColorIfWhite } from '../../../../utils'
export default class Network extends PureComponent {
  render() {
    const { network, networkClass, ThemeRule, font, isPopUp } = this.props;
    const NetworkSvg = `${CloudUrl}/media/social-icons/${network.icon}.svg`

    const iconColorStyle = ThemeRule.iconType === 1 ? { color:font.iconColor } : { backgroundImage: `url(${NetworkSvg})` }

    const iconClasses = ThemeRule.iconType === 1 ? `tb__icon tb-${network.icon}` : `tb__icon_default`;
    return (
      <>
        {network.icon == 'youtube' ?
          <div className={`${networkClass} tb__icon tb-youtube-icon`}>
            <div className="tb_color_icon__ tb_color_youtube_1"></div>
            <div className="tb_color_icon__ tb_color_youtube_2"></div>
          </div>

          : network.icon == 'google' ?
            <div className={`${networkClass} tb__icon tb-google-icon`}>
              <div className="tb_color_icon__ tb_color_google_1"></div>
              <div className="tb_color_icon__ tb_color_google_2"></div>
              <div className="tb_color_icon__ tb_color_google_3"></div>
              <div className="tb_color_icon__ tb_color_google_4"></div>
            </div>
            :

            <div className={`${networkClass} ${iconClasses}`} style={iconColorStyle}> </div>}


      </>
    );
  }
}
