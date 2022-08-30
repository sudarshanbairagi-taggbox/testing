import React, { PureComponent } from "react";
import { ERROR_ERROR } from "../../../../utils";

export default class Error212 extends PureComponent {
  render() {
    const { error_code, post_message, older_days, older_post } = this.props;
    return (
      <div className="tb_error_content">
        <div className="tb_error_title">No Posts!</div>
        <div className="tb_error_des">Only new posts from Instagram { ERROR_ERROR[older_post]}{older_days} will appear here. Existing posts from Instagram { ERROR_ERROR[older_post]}{older_days} can not be retrieved.</div>
      </div>
    );
  }
}

