import React, { PureComponent } from "react";

export default class WidgetShare extends PureComponent {
  render() {
    const { share, shareClass } = this.props;
    return (
      <div className={shareClass}>
        <div className="tb_wt_share_wrapper">
          {(share.facebook) && <div className="tb_wt_share_list"><div onClick={event => window.open(share.facebook, "_blank")} className="tb_wt_share_icon tb__icon tb-facebook tb_wt_cursor_pointer" title="facebook" rel="noopener noreferrer nofollow"></div></div>}
          {(share.twitter) && <div className="tb_wt_share_list"><div onClick={event => window.open(share.twitter, "_blank")} className="tb_wt_share_icon tb__icon tb-twitter tb_wt_cursor_pointer" title="twitter" rel="noopener noreferrer nofollow"></div></div>}
          {(share.linkedin) && <div className="tb_wt_share_list"><div onClick={event => window.open(share.linkedin, "_blank")} className="tb_wt_share_icon tb__icon tb-linkedin tb_wt_cursor_pointer" title="linkedin" rel="noopener noreferrer nofollow"></div ></div>}
        </div>
      </div>
    );
  }
}