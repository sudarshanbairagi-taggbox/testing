import React, { PureComponent } from "react";
import { APPHOST } from '../../../../actions/api'
export default class Error204 extends PureComponent {
  render() {
    const { wall } = this.props
    return (
      <div className="tb_error_content">
        <div className="tb_error_title">Feed Not Authorized!</div>
        <div className="tb_error_des">It appears that you have not authorized any Feed. Please <a target="_blank" href={`${APPHOST}widget/wall/index/${wall.Wall.id}`}>Click here</a> to authorize now!</div>

      </div>
    );
  }
}
