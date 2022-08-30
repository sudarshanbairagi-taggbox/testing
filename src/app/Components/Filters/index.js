import React, { PureComponent } from "react";
import CircularFilter from "./FilterType/CircularFilter";
import RectangularFilter from "./FilterType/RectangularFilter";
import RoundEdgedFilter from "./FilterType/RoundEdgedFilter";
import SquareFilter from "./FilterType/SquareFilter";

export default class Filters extends PureComponent {

  render() {
    const { type } = this.props;
    return (
      <div className="tb_filter_container">
        {type == 1 ? <CircularFilter {...this.props} /> : type == 4 ? <RectangularFilter {...this.props} /> : type == 2 ? <RoundEdgedFilter {...this.props} /> : type == 3 ? <SquareFilter {...this.props} /> : null}
      </div>
    );
  }
}
