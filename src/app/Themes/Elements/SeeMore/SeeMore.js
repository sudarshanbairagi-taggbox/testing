import React, { PureComponent } from "react";
import { connect } from 'react-redux';
import { getDataNextSteps,managePostHeight } from '../../../../actions/themeActions'

class SeeMore extends PureComponent {
  onLoadeMore = event => {
    const { wall, appendData,postHeight} = this.props;
    const postCount = wall.ThemeRule.numberOfPosts;
    const timeStamp = Math.floor(Date.now() / 1000);
    this.props.managePostHeight(postHeight);

    this.props.getDataNextSteps(wall.Wall.id, timeStamp, postCount, appendData.networkID, appendData.after, appendData.heightEvent);
  }
  render() {
    
    const { languageSetting, loaderData, appendData, postData } = this.props;

    const hasMoreData = postData.hasMoreData && Object.keys(postData.hasMoreData).length > 0 ? postData.hasMoreData[0] && postData.hasMoreData[0].hasMoreData == false ? false : postData.hasMoreData[postData.appendData.networkID] ? postData.hasMoreData[postData.appendData.networkID].hasMoreData : true : true


    return (

      hasMoreData===true ?
          <div className="tb_see_more_btn_wrap">
            <div className={`tb_see_more_btn ${(loaderData && loaderData.isShowMoreLoading) ? `tb_more_btn_loading` : ``}`} onClick={this.onLoadeMore}>{hasMoreData ? languageSetting.buttonName : languageSetting.no_more}</div>
          </div>

          :  <></>
          
    );
  }
}


const mapStateToProps = state => {
  return {
    loaderData: state.loaderData,
    postHeight: state.postHeight.data
  }
}

const mapDispatchToProps = dispatch => {
  return {
    managePostHeight: (data) =>  dispatch(managePostHeight(data)), 
    getDataNextSteps: (wallID, timeStamp, postCount, networkId, after, heightEvent, updateInStateNow) => dispatch(getDataNextSteps(wallID, timeStamp,  postCount, networkId, after, heightEvent, updateInStateNow))  
   }
}

export default connect(mapStateToProps, mapDispatchToProps)(SeeMore);