import React, { PureComponent } from "react";
import ReactHtmlParser from 'react-html-parser';
import Rating from "./PopUpRating";
import { isMobile, isTablet } from 'react-device-detect';
import { STRING_TO_URL_CONVERT } from '../../../../utils'
import ContentWithOutSlack from '../../../Themes/Elements/PostContent/PostContentConvertion'

export default class PopUpContent extends PureComponent {
  render() {
    const { contentTitle, item, Personalization, ThemeRule } = this.props;
    const fontSize = isMobile ? item.font.fontsize : isTablet ? item.font.fontsize + 2 : item.font.fontsize + 5;
    const fontStyle = {
      fontFamily: ThemeRule.css_font,
      fontSize: fontSize,
      color: item.font.fontColor

    };

    let contentData = STRING_TO_URL_CONVERT(this.props.contentData)
    const contentDecorateClass = Personalization.textDecorate ? ' tb_post_modal_text_decorate' : ''

    if(Personalization.widgetTheme==47){
       document.querySelector('html').style.overflow="auto";
    }

    return <div className="tb_post_modal_post_wrapper" key={`content_${item.id}`}>
      {ThemeRule.hideContent !== 1 || item.type === 1 ? <div className="tb_post_modal_post_wrap_in">
        <div className={`tb_post_modal_post_content tb-sGFfonte-${ThemeRule.font_varient}`} style={fontStyle}>
          {item.rating ? <Rating rating={item.rating} network={item.network} /> : null}
          <div className={`tb_post_modal_content ${contentDecorateClass}`}>
            {contentTitle ? <div className="tb_post_bold_txt">{ReactHtmlParser(contentTitle)}</div> : null}

            <ContentWithOutSlack data={item} content={contentData} Personalization={Personalization} />
          </div>
        </div>
      </div> : null}
    </div>
  }
}
