import React, { PureComponent } from "react";
import {CloudUrl} from "../../../../../constants";

export default class FilterNetworks extends PureComponent {
  render() {    
    const { filterIconClass, network, iconType, iconColor} = this.props;

    const NetworkSvg = `${CloudUrl}/media/social-icons/${network}.svg`;

    //const iconColorStyle = { backgroundImage: iconType == 12 ? `url(${NetworkSvg})`: '' };

    const iconColorStyle = { color:iconType === 1 ? '' : '' }
    
    //const iconClasses = iconType === 1 ?  `tb__icon tb-${network}` : `tb_filter_ico_default`
    const iconClasses = iconType === 1 ?  `tb__icon tb-${network}` : `tb__icon tb-${network}`

    return (<>
    {network == 'youtube' ?
      <div className={`${filterIconClass} tb__icon tb-youtube-icon`} style={iconColorStyle}>
        <div className="tb_color_icon__ tb_color_youtube_1"></div>
        <div className="tb_color_icon__ tb_color_youtube_2"></div>
      </div>
      : network == 'google'?
      <div className={`${filterIconClass} tb__icon tb-google-icon`} style={iconColorStyle}>
        <div className="tb_color_icon__ tb_color_google_1"></div>
        <div className="tb_color_icon__ tb_color_google_2"></div>
        <div className="tb_color_icon__ tb_color_google_3"></div>
        <div className="tb_color_icon__ tb_color_google_4"></div>
      </div>
      :
        <div className={`${filterIconClass} ${iconClasses}`} style={iconColorStyle}> </div>
      }
        </>
    );
  }
}
