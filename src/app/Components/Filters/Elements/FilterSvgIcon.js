import React, { PureComponent } from "react";

export default class FilterSvgIcon extends PureComponent {
  render() {
    const { icon } = this.props;
    const functionWithSwitch = () => {
        switch(icon){
          case "instagram":
            return "+"
          case "negative": 
            return "-"
          default:
            return "neutral"
        }
    }
    return (
        <div>{functionWithSwitch()}</div>
    );
  }
}
