import React, { PureComponent } from "react";
import { WebWidgetUrl } from "../../../../constants";

export default class Error202 extends PureComponent {
  render() {    
    return (
      <div className="tb_error_content">
          <div className="tb_error_title">No Feeds!</div>
          <div className="tb_error_des">Seems like you have not added any feed. Kindly add feed from your preferred social network</div>
          <div className="tb_error_page_actions">
              <div className="tb_error_action_list">
                <a href={WebWidgetUrl} target={'_blank'} className="tb_error_btn_primary">Access Now</a>
              </div>
          </div>
      </div>
    );
  }
}
