import React, { PureComponent } from "react";
import Author from "../../Elements/Author/Author";
import Time from "../../Elements/Time/Time";
import Network from "../../Elements/Network/Network";
import Rating from "../../Elements/Rating/Rating";

export default class AuthorDetails extends PureComponent {
  render() {
    const { author, personalization, postTime, network, ThemeRule, font, rating, ownerId } = this.props;
    const username = author.username ? author.username.length > 0 ? `@${author.username}` : `` : '';
    const authorNameStyle = {
      color: ThemeRule.authorColor
    };
    const sepratorStyle = {
      backgroundColor: ThemeRule.authorColor
    };
    const postAuthor = (personalization.postAuthor && !author.isInstaUser) ? true : false;
    const authorSeprator = (personalization.postAuthor && personalization.postTime && !author.isInstaUser) ? true : false;
    const networkIcon = (network.id !== null && network.id !== '') ? true : false
    return (
      <div className="tb_hc_author_wrapper">

        {postAuthor || ownerId === 100231 ? <Author network={network} author={author} authorClass={'tb_hc_author_profile'} /> : ''}

        <div className="tb_hc_author_info">
          {postAuthor || ownerId === 100231 ? <div className="tb_hc_authorname" style={authorNameStyle}>{author.name}</div> : ''}
          <div className="tb_hc_post_info">
            {postAuthor || ownerId === 100231 ? <div className="tb_hc_username" style={authorNameStyle}>{username}</div> : ''}
            {authorSeprator ? <div className="tb_hc_seprator" style={sepratorStyle}> </div> : ''}
            {personalization.postTime ? <Time postTime={postTime} timeClass={'tb_hc_time'} authorColor={ThemeRule.authorColor} /> : ''}
          </div>
        </div>
        {network.id === 29 && rating > 0 ? <div className="tb_hc_onsite_rating__"><Rating rating={rating} network={network} /> </div> : null}
        {networkIcon ?
          <div className="tb_hc_social_">
            <Network networkClass={'tb_hc_social_ico'} network={network} ThemeRule={ThemeRule} font={font} />
          </div>
          : null}
      </div>
    );
  }
}
