import React, { PureComponent } from "react";
import { ERROR_ERROR } from '../../../../utils'
export default class Error211 extends PureComponent {
    render() {
        const { error_code, post_message, older_days, older_post } = this.props;
        return (
            <div className="tb_error_content">
                <div className="tb_error_title">No Posts!</div>
                <div className="tb_error_des">It seems there are no posts available on the entered {ERROR_ERROR[`${older_post}`]}{older_days}. All Upcoming posts will appear here.</div>
                <div className="tb_error_des">Post are older than 24 hours.</div>
            </div>
        );
    }
}
