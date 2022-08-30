import React, { PureComponent } from "react";
import { connect } from 'react-redux';
import { filterPostDataAppendWebFilter } from '../../../../actions/themeActions'
import FilterNetworks from "./Elements/FilterNetworks";

class CircularFilter extends PureComponent {
  state = { networkID: null }
  onClickWebFilters = (networkID) => event => {
    const tstamp = Math.floor(Date.now() / 1000);
    const { appendData, wall, postData, wallId } = this.props;
    let postCount = wall.ThemeRule.numberOfPosts;
    this.props.filterPostDataAppendWebFilter(
      wall.Wall.id,
      tstamp,
      postCount,
      networkID,
      appendData.after,
      appendData.heightEvent,
    );
    this.setState({ networkID: networkID })
  }

  render() {
    const { webFilters, wall, languageSetting } = this.props;
    const { networkID } = this.state;
    return (
      <div className="tb_filter_circular_wrapper">
        <div className="tb_filter_circular_list" onClick={this.onClickWebFilters(0)}>
          <div className={`tb_filter_circular_button_text ${(networkID == 0) ? ` tb_filter_active` : ``}`}>{languageSetting.filterButton}</div>
        </div>
        {
          (webFilters && webFilters.length > 0) ? webFilters.map((item) => {
            return <div className="tb_filter_circular_list" onClick={this.onClickWebFilters(item.Network.id)}>
              <div className={`tb_filter_circular_button ${(networkID && networkID == item.Network.id) ? ` tb_filter_active` : ``}`}>
                <FilterNetworks filterIconClass={'tb_filter_round_edge_ico'} network={item.Network.icon} iconType={wall.ThemeRule.iconType} />
              </div>
            </div>
          }) : null
        }
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
  }
}
const mapDispatchToProps = dispatch => {
  return {
    filterPostDataAppendWebFilter: (wallID, timeStamp, postCount, networkId, after, heightEvent) => dispatch(filterPostDataAppendWebFilter(wallID, timeStamp, postCount, networkId, after, heightEvent))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(CircularFilter);