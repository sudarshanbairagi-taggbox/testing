import React, { PureComponent } from "react";
import { CloudUrl } from "../../../../constants";

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

export default class SocialAction extends PureComponent {
  render() {
    const { itemData, ThemeRule, actionClass, ThemeID } = this.props;

    const iconColorStyle = { color: ThemeID === 3 ? ThemeRule.iconType === 1 ? ThemeRule.iconColor : itemData.network.color : ThemeRule.fontColor }

    const networkID = itemData.network.id
    const likeIcon = (networkID === 3 || networkID === 10 || networkID === 7) ? 'like-alt' : 'heart-alt';
    const likeIconStatus = [1, 2, 3, 7, 8, 9, 10, 18].includes(networkID) ? true : false
    const commentIconStatus = [29, 19].includes(networkID) ? false : true
    const networkName = itemData.network.name ? itemData.network.name : "";
    return <>
      {(networkID !== 29 && networkID !== 26 && networkID !== 23 && networkID !== 6 && networkID !== 5 && networkID !== 11 && networkID !== 12 && networkID !== 15 && networkID !== 20 && networkID !== 21) ?
        <div className={actionClass}>
          <div className="tb_social_action__">
            {likeIconStatus ? <div className="tb_social_action__list">
              <a aria-label={networkName} href={NetworkLike(networkID, itemData.postId, itemData.link)} target="_blank" className="tb_social_action__ico_wrap" rel="noopener noreferrer nofollow">
                <div className={`tb_social_action_ico__ tb__icon tb-${likeIcon}`} style={iconColorStyle}> </div>
                {itemData.like_count > 0 ? <div className="tb_social_action_counts__" style={iconColorStyle}>{itemData.like_count}</div> : ''}
              </a>
            </div> : null}
            {commentIconStatus ? <div className="tb_social_action__list">
              <a aria-label={networkName} href={NetworkComment(networkID, itemData.postId, itemData.link)} target="_blank" className="tb_social_action__ico_wrap" rel="noopener noreferrer nofollow">
                <div className="tb_social_action_ico__ tb__icon tb-comment" style={iconColorStyle}> </div>
                {itemData.comment_count > 0 ? <div className="tb_social_action_counts__" style={iconColorStyle}>{itemData.comment_count}</div> : ''}
              </a>
            </div> : null}
            {networkID === 1 ?
              <div className="tb_social_action__list">
                <a aria-label={networkName} href={`https://twitter.com/intent/retweet?tweet_id=${atob(itemData.postId)}`} target="_blank" className="tb_social_action__ico_wrap" rel="noopener noreferrer nofollow">
                  <div className="tb_social_action_ico__ tb__icon tb-retweet" style={iconColorStyle}> </div>
                  {itemData.comment_count > 0 ? <div className="tb_social_action_counts__" style={iconColorStyle}>{itemData.comment_count}</div> : ''}
                </a>
              </div> : ''}
            <div className="tb_social_action__list">
              <a aria-label={networkName} href={itemData.link} target="_blank" className="tb_social_action__ico_wrap" rel="noopener noreferrer nofollow">
                <div className="tb_social_action_ico__ tb__icon tb-eye-alt" style={iconColorStyle}> </div>
              </a>
            </div>
          </div>
        </div> : ''}
    </>
  }
}