import React, { PureComponent } from "react";
import Author from "../../Elements/Author/Author";
import Time from "../../Elements/Time/Time";
import Network from "../../Elements/Network/Network";

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
      <div className="tb_hs_author_wrapper">
        <div className="tb_hs_author">

          {postAuthor || ownerId === 100231 ? <Author network={network} author={author} authorClass={'tb_hs_author_profile'} /> : ''}
          <div className="tb_hs_author_info">
            {postAuthor || ownerId === 100231 ? <div className="tb_hs_authorname" style={authorNameStyle}>{author.name}</div> : ''}
            <div className="tb_hs_post_info">
              {postAuthor || ownerId === 100231 ? <div className="tb_hs_username" style={authorNameStyle}>{`@${author.username}`}</div> : ''}
              {authorSeprator ? <div className="tb_hs_seprator" style={sepratorStyle}> </div> : ''}
              {personalization.postTime ? <Time postTime={postTime} timeClass={'tb_hs_time'} authorColor={ThemeRule.authorColor} /> : ''}
            </div>
          </div>
        </div>
        <div className="tb_hs_social_">
          <Network networkClass={'tb_hs_social__ico'} network={network} ThemeRule={ThemeRule} font={font} />
        </div>
      </div>
    );
  }
}
