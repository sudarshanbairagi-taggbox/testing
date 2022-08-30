import React, { PureComponent } from "react";
import Author from "../../Elements/Author/Author";
import Time from "../../Elements/Time/Time";
import Network from "../../Elements/Network/Network";
import AuthorAvatar from "../../Elements/Author/Elements/AuthorAvatar";
export default class AuthorDetails extends PureComponent {
  render() {
    const { author, personalization, postTime, network, ThemeRule, font, ownerId } = this.props;
    const username = author.username ? author.username.length > 0 ? `@${author.username}` : `` : '';
    const authorNameStyle = {
      color: ThemeRule.authorColor
    };
    const sepratorStyle = {
      backgroundColor: ThemeRule.authorColor
    };
    const postAuthor = (personalization.postAuthor && !author.isInstaUser) ? true : false;
    const authorSeprator = (personalization.postAuthor && personalization.postTime && !author.isInstaUser) ? true : false;
    return (
      <div className="tb_cc_author_wrapper">
        <div className="tb_cc_author">

          {postAuthor ||  ownerId === 100231 ? <Author author={author} network={network} authorClass={'tb_cc_author_profile'} /> : ""}

          <div className="tb_cc_author_info">
            {postAuthor ||  ownerId === 100231 ? <div className="tb_cc_authorname" style={authorNameStyle}>{author.name}</div> : ''}
            <div className="tb_cc_post_info">
              {postAuthor ||  ownerId === 100231 ? <div className="tb_cc_username" style={authorNameStyle}>{username}</div> : ''}
              {authorSeprator ? <div className="tb_cc_seprator" style={sepratorStyle}> </div> : ''}
              {personalization.postTime ? <Time postTime={postTime} timeClass={'tb_cc_time'} authorColor={ThemeRule.authorColor} /> : ''}
            </div>
          </div>
        </div>
        <div className="tb_cc_social_">
          <Network networkClass={'tb_cc_social_ico'} network={network} ThemeRule={ThemeRule} font={font} />
        </div>
      </div>
    );
  }
}

