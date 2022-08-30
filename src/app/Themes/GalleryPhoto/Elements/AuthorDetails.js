import React, { PureComponent } from "react";
import Author from "../../Elements/Author/Author";
import Time from "../../Elements/Time/Time";

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
    //console.log(personalization, author, ThemeRule)
    const authorSeprator = (personalization.postAuthor && personalization.postTime && !author.isInstaUser) ? true : false;
    return (
      <div className="tb_gp_author_wrapper">
        <div className="tb_gp_author">
          {postAuthor || ownerId === 100231 ? <Author author={author} authorClass={'tb_gp_author_profile'} network={network} /> : ''}
          <div className="tb_gp_author_info">
            {postAuthor || ownerId === 100231 ? <div className="tb_gp_authorname" style={authorNameStyle}>{author.name}</div> : ''}
            <div className={`tb_gp_post_info${!authorSeprator ? ' tb_gp_post_info__' : ''}`}>
              {postAuthor || ownerId === 100231 ? <div className="tb_gp_username" style={authorNameStyle}>{username}</div> : ''}
              {authorSeprator ? <div className="tb_gp_seprator" style={sepratorStyle}> </div> : ''}
              {personalization.postTime ? <Time postTime={postTime} timeClass={'tb_gp_time'} authorColor={ThemeRule.authorColor} /> : ''}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
