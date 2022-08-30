import React, { PureComponent } from "react";

export default class Error207 extends PureComponent {
  render() {
    const { wall } = this.props;
    return (
      <div className="tb_error_content">
        <div className="tb_error_title">No Posts!</div>
        <div className="tb_error_des">It appears that all your posts are private. Please go to <a href={`https://app.taggbox.com/moderation/index/${wall.Wall.id}`} target="_blank" rel="noopener noreferrer">Moderation</a> and make them public.</div>
      </div>
    );
  }
}
