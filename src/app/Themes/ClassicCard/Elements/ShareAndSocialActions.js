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
export default class ShareAndSocialActions extends PureComponent {
  render() {
    const { itemData, ThemeRule } = this.props;

    const iconColorStyle = { color: ThemeRule.fontColor }

    const networkID = itemData.network.id

    const likeIcon = (networkID === 3 || networkID === 10) ? 'like-alt' : 'heart-alt';

    const commentIcon = (networkID === 1) ? 'reply-alt' : 'comment';

    const onlyShareActive = itemData.share.status && ![29, 1, 3, 4, 7, 8, 10, 11].includes(networkID) ? true : false;
    const likeIconStatus = [1, 2, 3, 7, 8, 9, 10, 18, 19, 23, 26, 29, 30].includes(networkID) ? true : false
    const commentIconStatus = [29, 11, 19, 23, 26, 29, 30].includes(networkID) ? false : true
    const socialActionStatusNetwork = [12, 15, 20, 21, 29, 11, 19, 23, 26, 29, 30].includes(networkID) ? false : true

    return <>
      {likeIconStatus || itemData.share.status ?
        <div className={`tb_cc_social_actions_ ${onlyShareActive ? 'tb_cc_social_share_only__' : 'tb_cc_social_actions_only__'}`} style={(!ThemeRule.socialAction || !socialActionStatusNetwork) ? { justifyContent: `flex-end` } : null}>
          {ThemeRule.socialAction ? <>
            {(socialActionStatusNetwork) ? <>
              {likeIconStatus ? <div className="tb_cc_social_action__list">
                <div onClick={event => window.open(NetworkLike(networkID, itemData.postId, itemData.link), "_blank")} className="tb_social_action__ico_wrap">
                  <div className={`tb_cc_social_action_ico__ tb__icon tb-${likeIcon}`} style={iconColorStyle}> </div>
                  <div className="tb_cc_social_action_counts__" style={iconColorStyle}>Like</div>
                </div>
              </div> : null}
              {commentIconStatus ? <div className="tb_cc_social_action__list">
                <div onClick={event => window.open(NetworkComment(networkID, itemData.postId, itemData.link), "_blank")} className="tb_social_action__ico_wrap">
                  <div className={`tb_cc_social_action_ico__ tb__icon tb-${commentIcon}`} style={iconColorStyle}> </div>
                  <div className="tb_cc_social_action_counts__" style={iconColorStyle}>{networkID === 1 ? 'Reply' : 'Comment'}</div>
                </div>
              </div> : null}
              {networkID === 1 ?
                <div className="tb_cc_social_action__list">
                  <div onClick={event => window.open(`https://twitter.com/intent/retweet?tweet_id=${atob(itemData.postId)}`, "_blank")} className="tb_social_action__ico_wrap">
                    <div className="tb_cc_social_action_ico__ tb__icon tb-retweet" style={iconColorStyle}> </div>
                    <div className="tb_cc_social_action_counts__" style={iconColorStyle}>Retweet</div>
                  </div>
                </div>
                : ''}
              {onlyShareActive ?
                <div className="tb_cc_social_action__list">
                  <div onClick={event => window.open(itemData.link, "_blank")} className="tb_social_action__ico_wrap">
                    <div className="tb_cc_social_action_ico__ tb__icon tb-eye-alt" style={iconColorStyle}> </div>
                    <div className="tb_cc_social_action_counts__" style={iconColorStyle}>View</div>
                  </div>
                </div>
                : ''}
            </> : ''}
          </> : ''}
          {itemData.share.status ?
            <div className={`tb_cc_action_counts_wrap${!ThemeRule.socialAction ? ` tb_cc_action_share_wrap` : ``}`}>
              <div className="tb_cc_action_ico tb__icon tb-share-outline" style={iconColorStyle}> </div>
              <div className="tb_cc_action_counts" style={iconColorStyle}>Share</div>
              <div className="tb_cc_share_wrapper_dropdown">
                <div className="tb_cc_share_icon_list">
                  {(itemData.share.facebook) && <div onClick={event => window.open(itemData.share.facebook, "_blank")} className="tb_cc_share_list_in">
                    <div className="tb_cc_share_ico__ tb__icon tb-facebook"> </div>
                    <div className="tb_cc_share_ico_txt">Facebook</div>
                  </div>}
                  {(itemData.share.twitter) && <div onClick={event => window.open(itemData.share.twitter, "_blank")} className="tb_cc_share_list_in">
                    <div className="tb_cc_share_ico__  tb__icon tb-twitter"> </div>
                    <div className="tb_cc_share_ico_txt">Twitter</div>
                  </div>}
                  {(itemData.share.linkedin) && <div onClick={event => window.open(itemData.share.linkedin, "_blank")} className="tb_cc_share_list_in">
                    <div className="tb_cc_share_ico__ tb__icon tb-linkedin"> </div>
                    <div className="tb_cc_share_ico_txt">LinkedIn</div>
                  </div>}
                </div>
              </div>
            </div> : ''}
        </div>
        : null}
    </>
  }
}