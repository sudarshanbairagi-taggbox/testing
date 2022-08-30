import React, { PureComponent } from "react";
import moment from 'moment'
export default class Error208 extends PureComponent {
  render() {
    const { error_code, post_message, older_days, older_post } = this.props;
    return (
      <div className="tb_error_content">
        <div className="tb_error_title">No Posts!</div>
        <div className="tb_error_des">It appears that the available posts are older than your chosen {older_days !== 8 ? `${older_days} Days` : moment(new Date(older_post * 1000)).format('LL')}
          {'. '} All the new posts will start to appear here.</div>
      </div>
    );
  }
}

