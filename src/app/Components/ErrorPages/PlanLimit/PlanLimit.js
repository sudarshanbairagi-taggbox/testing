import React, { PureComponent } from "react";
import { CloudUrl, AppUrl, WebUrl } from "../../../../constants";

export default class PlanLimit extends PureComponent {
  render() {    
    const ErrorImage = {
      backgroundImage: `url(${CloudUrl}/media/error/nopost.png)`
    }
    const LogoImage = {
      backgroundImage: `url(${CloudUrl}/media/logo/taggbox-widget.svg)`
    }
    return (
        <div className="tb_error_content">
          <div className="tb_error_title">You're Running Extra Widgets/Feeds!</div>
          <div className="tb_error_des">To enjoy uninterrupted services,kindly revoke the additional widget/feed or upgrade your plan.</div>
              <div className="tb_error_page_actions">
                  <div className="tb_error_action_list">
                      <a href={WebUrl} className="tb_error_btn_primary">Update Now</a>
                  </div>
              </div>
          </div>
    );
  }
}
