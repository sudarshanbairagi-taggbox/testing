import React, { PureComponent } from "react";
import { WebWidgetUrl } from "../../../../constants";

export default class ErrorMessage extends PureComponent {
  render() {
    const { error } = this.props;
    return error.errorWithMessage && Object.keys(error.errorWithMessage).length > 0 ? <div className="tb_error_content">
      {
        error.errorWithMessage.type == "VISITOR_LIMIT_EXCEEDED" ? <><div className="tb_error_title">Page Views Limit Exceeded</div>
          <div className="tb_error_des">Oops! Seems Page Views Limit for the plan exceeded. If you are the owner of this Taggbox account, please click below link to access your account.</div>
          <div className="tb_error_page_actions">
            <div className="tb_error_action_list">
              <a href={`https://app.taggbox.com/widget/accounts/login?utm_source=Upgrade_now_button&utm_medium=${window.location.href}&utm_campaign=page_views_exceeded`} target={'_blank'} className="tb_error_btn_primary">Upgrade Now</a>
            </div>

          </div>
        </> : <><div className="tb_error_title">{error.errorWithMessage.message}</div>
            <div className="tb_error_des">Oops! Seems like something went wrong. If you are the owner of this Taggbox account, please click below link to access your account.</div>
            <div className="tb_error_page_actions">
              <div className="tb_error_action_list">
                <a href={`https://app.taggbox.com/widget/accounts/login?utm_source=Access_now_button&utm_medium=${window.location.href}&utm_campaign=widget_not_active`} target={'_blank'} className="tb_error_btn_primary">Access Now</a>
              </div>

            </div>
          </>
      }
    </div> : null

  }
}
