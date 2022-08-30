import React, { PureComponent } from "react";
import { APPHOST, APPURL } from '../../../../actions/api'
export default class Error203 extends PureComponent {
  render() {
    const { wall } = this.props;
    return (
      <div className="tb_error_content">
        <div className="tb_error_title">Feed Not Activated!</div>
        <div className="tb_error_des">Looks like your feed status is off. <a href={`${APPHOST}widget/wall/index/${wall.Wall.id}`} target="blank">Click here</a> to turn the status on! Or add another feed 
             </div>
             <div className="tb_error_page_actions">
              <div className="tb_error_action_list">
                <a href={APPURL} target={'_blank'} className="tb_error_btn_primary">Access Now</a>
              </div>
          </div>
      </div>
    );
  }
}

