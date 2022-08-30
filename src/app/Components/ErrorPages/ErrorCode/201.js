import React, { PureComponent } from "react";
import { WebWidgetUrl } from "../../../../constants";

export default class Error201 extends PureComponent {
  render() {
    return (
      <div className="tb_error_content">
        <div className="tb_error_title">No Posts!</div>
        <div className="tb_error_des">If the Moderation is ON, approve the posts from the moderation section to make them appear on your widget. Else, there won’t be any posts on your added feeds.</div>
        <div className="tb_error_page_actions">
          <div className="tb_error_action_list">
            <a href={WebWidgetUrl} target={'_blank'} className="tb_error_btn_primary">Access Now</a>
          </div>
        </div>
      </div>
    );
  }
}
