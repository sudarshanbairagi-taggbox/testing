import React, { PureComponent } from "react";

const NetworkLike = (networkID, postID, Link) => {
  switch (networkID) {
    case 1:
      return `https://twitter.com/intent/favorite?tweet_id=${atob(postID)}`
      break;
    default:
      return Link
      break;
  }
}

const NetworkComment = (networkID, postID, Link) => {
  switch (networkID) {
    case 1:
      return `https://twitter.com/intent/tweet?in_reply_to=${atob(postID)}`
      break;
    default:
      return Link
      break;
  }
}

export default class WidgetSocialActions extends PureComponent {
  render() {
    const { itemData, ThemeRule } = this.props;

    const iconColorStyle = { color: ThemeRule.fontColor }

    const networkID = itemData.network.id

    const likeIcon = (networkID === 3 || networkID === 10) ? 'like-alt' : 'heart-alt';

    return <>
      {(networkID !== 12 && networkID !== 15 && networkID !== 20 && networkID !== 21 && networkID !== 29) ?
        <div className="tb_wt_social_action__">
          <div className="tb_wt_social_action__list">
            <a href={NetworkLike(networkID, itemData.postId, itemData.link)} target="_blank" className="tb_wt_social_action__ico_wrap" rel="noopener noreferrer nofollow">
              <div className={`tb_wt_social_action_ico__ tb__icon tb-${likeIcon}`} style={iconColorStyle}> </div>
              {itemData.like_count > 0 ? <div className="tb_wt_social_action_counts__" style={iconColorStyle}>{itemData.like_count}</div> : ''}
            </a>
          </div>
          <div className="tb_wt_social_action__list">
            <a href={NetworkComment(networkID, itemData.postId, itemData.link)} target="_blank" className="tb_wt_social_action__ico_wrap" rel="noopener noreferrer nofollow">
              <div className="tb_wt_social_action_ico__ tb__icon tb-comment" style={iconColorStyle}> </div>
              {itemData.like_count > 0 ? <div className="tb_wt_social_action_counts__" style={iconColorStyle}>{itemData.like_count}</div> : ''}
            </a>
          </div>
          {networkID === 1 ?
            <div className="tb_wt_social_action__list">
              <a href={`https://twitter.com/intent/retweet?tweet_id=${atob(itemData.postId)}`} target="_blank" className="tb_wt_social_action__ico_wrap" rel="noopener noreferrer nofollow">
                <div className="tb_wt_social_action_ico__ tb__icon tb-retweet" style={iconColorStyle}> </div>
              </a>
            </div> : ''}
        </div>
        : ''}
    </>
  }
}