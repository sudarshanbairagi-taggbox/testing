import React, { PureComponent } from "react";
import moment from 'moment';

export default class Time extends PureComponent {
  render() {    
    const { postTime, timeClass, authorColor } = this.props;
    const momentTime = moment(new Date(postTime * 1000)).fromNow();
    const timeStyle = {
      color: authorColor
    };
    return (
      <div className={timeClass} style={timeStyle}>{momentTime}</div>
    );
  }
}
