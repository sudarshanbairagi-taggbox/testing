import React, { PureComponent } from "react";
import ReactHtmlParser from 'react-html-parser';
import { STRING_TO_URL_CONVERT } from '../../../../utils'
import ContentWithOutSlack from './PostContentConvertion'
export default class PostContent extends PureComponent {
  render() {
    const { contentClass, content, ThemeRule, font, personalization, item, contentTitle } = this.props;
    const fontStyle = {
      fontFamily: ThemeRule.css_font,
      fontSize: font.fontsize,
      color: font.fontColor
    };
    const contentData = STRING_TO_URL_CONVERT(content)
    return (
      <div className={`${contentClass} tb-sGFfonte-${ThemeRule.font_varient}`} style={fontStyle} aria-label="Post Content">
        {contentTitle ? <div className="tb_bold_txt__">{ReactHtmlParser(contentTitle)}</div> : null}
        <ContentWithOutSlack data={item} content={contentData} Personalization={personalization} />
      </div>
    );
  }
}
