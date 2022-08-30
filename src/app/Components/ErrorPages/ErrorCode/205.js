import React, { PureComponent } from "react";
import { ERROR_ERROR } from '../../../../utils'
export default class Error205 extends PureComponent {
  render() {
    const { error_code, post_message, older_days, older_post } = this.props;
    return (
      <div className="tb_error_content">
        <div className="tb_error_title">No Tweets/Posts!</div>
        <div className="tb_error_des">Currently, No Tweets/Posts are available on the entered <span className="tb_error_highlight">{ERROR_ERROR[`${older_post}`]}{older_days}</span>. The new Tweets/Posts will start appearing here.</div>
      </div>
    );
  }
}

