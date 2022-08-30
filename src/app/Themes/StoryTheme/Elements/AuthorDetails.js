import React, { PureComponent } from "react";
import Author from "../../Elements/Author/Author";
import Network from "../../Elements/Network/Network";

export default class AuthorDetails extends PureComponent {
  render() {    
    const { author, personalization, postTime, network, ThemeRule, font, ownerId } = this.props;
    const username = author.username ? author.username.length > 0 ? `@${author.username}` : `` : '';
    const authorNameStyle = {
      color: ThemeRule.authorColor
    };
    const hashtagStyle = {
      color: ThemeRule.fontColor,
      fontSize: ThemeRule.fontSize,
      fontFamily: ThemeRule.css_font,
    };
    const postAuthor = (personalization.postAuthor && !author.isInstaUser) ? true : false;
    return (
          <div className="tb_stt_content_wrap">
            <div className="tb_stt_author_img">

              {postAuthor ? <Author author={author} network={network} authorClass={'tb_stt_author_img_00'} /> : ' ' }
            </div>
            <div className="tb_stt_author_info">
              <Network networkClass={'tb_stt_social_icon'} network={network} ThemeRule={ThemeRule} font={font} />
              <div className="tb_stt_author_001">
                  {ThemeRule.hideContent === 0 ? <div className={`tb_stt_hashtag tb-sGFfonte-${ThemeRule.font_varient}`} style={hashtagStyle}>{username}</div>  : '' }
                  {postAuthor || ownerId === 100231 ? <div className="tb_stt_author_name" style={authorNameStyle}>{author.name}</div> : ''}
              </div>
            </div>
        </div>
    );
  }
}
