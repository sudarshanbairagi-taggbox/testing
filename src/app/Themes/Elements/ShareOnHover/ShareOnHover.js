import React, { PureComponent } from "react";
import { themePostTracking } from '../../../../actions/themeActions'
export default class ShareOnHover extends PureComponent {


  onClickData = (shareURL) => event => {
    const { item, wallID } = this.props;
    themePostTracking({
      type: 2,
      action: 2,
      wall: wallID,
      feed: item.feedId,
      post: item.referenceId ? item.referenceId : item.id,
    })
    window.open(shareURL, "_blank")
  }

  render() {
    const { share, shareClass, item } = this.props;
    return (
      <div className={shareClass}>
        <div className="tb_share_wrapper">
          <div className="tb_share_button_ tb__icon tb-share-hover"> </div>
          <div className="tb_share_icon_list_wrap">
            {share.facebook ? <div className="tb_share_icon_list"><div onClick={this.onClickData(share.facebook)} className="tb_share_ico__ tb__icon tb-facebook" title="facebook" rel="noopener noreferrer nofollow"></div></div> : ''}
            {share.twitter ? <div className="tb_share_icon_list"><div onClick={this.onClickData(share.twitter)} className="tb_share_ico__  tb__icon tb-twitter" title="twitter" rel="noopener noreferrer nofollow"></div></div> : ''}
            {share.linkedin ? <div className="tb_share_icon_list"><div onClick={this.onClickData(share.linkedin)} className="tb_share_ico__ tb__icon tb-linkedin" title="linkedin" rel="noopener noreferrer nofollow"></div></div> : ''}
          </div>
        </div>
      </div>
    );
  }
}
