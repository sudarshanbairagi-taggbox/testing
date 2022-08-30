import React, { PureComponent } from "react";
import { ERROR_ERROR } from '../../../../utils'
export default class Error206 extends PureComponent {
  render() {
    const { error_code, post_message, older_days, older_post } = this.props;
    return (
      <div className="tb_error_content">
        <div className="tb_error_title">No Tweets!</div>
        <div className="tb_error_des">No Tweets are available on the entered <span className="tb_error_highlight">{ERROR_ERROR[`${older_post}`]}{older_days}</span> All the upcoming tweets will appear here. <p>The Tweets are older than your chosen {older_post === 2 ? 7 : older_post === 1 ? 30 : null} days.</p>
        </div>

      </div>
    );
  }
}
