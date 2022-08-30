import React, { PureComponent } from "react";

export default class Error209 extends PureComponent {
  render() {
    const { error_code, post_message, older_days, older_post } = this.props;
    return (
      <div className="tb_error_content">
        <div className="tb_error_title">No Posts!</div>
        <div className="tb_error_des">It appears that there are no posts available with images or videos. The theme doesn’t support text content.</div>
      </div>
    );
  }
}
