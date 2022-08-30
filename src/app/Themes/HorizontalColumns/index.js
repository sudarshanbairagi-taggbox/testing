import React, { PureComponent } from "react";
import { isMobile } from 'react-device-detect';
import { connect } from "react-redux";
import { Splide, SplideSlide, SplideTrack } from '@splidejs/react-splide';
import Card from "./Elements/Card";
import { getDataNextSteps } from '../../../actions/themeActions'

class HorizontalColumn extends PureComponent {
  constructor(props) {
    super(props)
  }
  state = {
    windowWidth: window.innerWidth,
  }

  componentWillMount() {
    const { renderId } = this.props.renderId
    this.setState({
      windowWidth: renderId ? document.getElementById(renderId).clientWidth : window.innerWidth
    })
  }

  requestData = () => {
    const { appendData, wall, preRender, hasMoreData } = this.props;
    if (hasMoreData) {
      this.props.getDataNextSteps(
        wall.Wall.id,
        Math.floor(Date.now() / 1000),
        wall.ThemeRule.numberOfPosts,
        appendData.networkID,
        appendData.after,
        preRender,
        appendData.heightEvent
      );
    }
  };

  render() {
    const { postData, completeDataObject, wall, clickToShowPopUp, hasMoreData, onClickToCTA } = this.props;
    const { windowWidth } = this.state;
    const numberOfCoumn = wall.ThemeRule.numberOfCoumn;
    const mobileColumn = wall.ThemeRule.mobileColumn;
    const slidePost = wall.ThemeRule.slidePost;
    const slideDuration = wall.ThemeRule.slideDuration;
    const autoScrollStatus = wall.Personalization.autoScrollStatus;
    const trimContent = wall.Personalization.trimcontent === 1 ? true : false;
    const isMobileStatus = windowWidth < 768 || isMobile ? true : false
    const manageItemCount = (postData && postData.length) ? isMobileStatus ? 1 : postData.length > 3 ? 3 : postData.length : 3
    const desktopCount = (postData && postData.length) ? isMobileStatus ? 1 : postData.length > 4 ? 4 : postData.length : 4

    const settings = {
      type: autoScrollStatus === 1 ? false : 'loop',
      rewind: true,
      speed: 1000,
      interval: slidePost === 1 ? slideDuration * 1000 : 5000,
      perPage: numberOfCoumn > 0 ? numberOfCoumn : 5,
      perMove: 1,
      gap: 0,
      autoplay: slidePost === 1 ? true : false,
      padding: "0",
      pagination: false,
      arrows: true,
      fixedHeight: trimContent,
      breakpoints: {
        560: {
          perPage: mobileColumn > 0 ? mobileColumn : 1,
          perMove: mobileColumn > 0 ? mobileColumn : 1
        },
        767: {
          perPage: numberOfCoumn > 0 ? numberOfCoumn - 3 : manageItemCount,
          perMove: numberOfCoumn > 0 ? numberOfCoumn - 3 : manageItemCount
        },
        991: {
          perPage: numberOfCoumn > 0 ? numberOfCoumn - 2 : manageItemCount,
          perMove: numberOfCoumn > 0 ? numberOfCoumn - 2 : manageItemCount
        },
        1200: {
          perPage: numberOfCoumn > 0 ? numberOfCoumn - 1 : manageItemCount,
          perMove: numberOfCoumn > 0 ? numberOfCoumn - 1 : manageItemCount
        },
        1600: {
          perPage: numberOfCoumn > 0 ? numberOfCoumn : desktopCount,
          perMove: numberOfCoumn > 0 ? numberOfCoumn - 1 : desktopCount
        }
      }
    };

    return (
      <div className="tb_hc_post_container" ref={this.sliderHeight}>

        <Splide hasTrack={false} className={`tb_hc_post_slider ${trimContent ? 'tb_hc_fixed_height' : ''}`} options={settings}>
          <SplideTrack>
            {
              ((postData && postData.length > 0)) && postData.map((item, index) => {
                const cardData = completeDataObject[item];
                return <SplideSlide style={{ margin: 0, padding: 0 }} key={index}>
                  <Card ownerId={wall.Wall.owner} itemData={cardData} itemIndex={index} personalization={wall.Personalization} ThemeRule={wall.ThemeRule} clickToShowPopUp={clickToShowPopUp} wallID={wall.Wall.id} onClickToCTA={onClickToCTA} />
                </SplideSlide>
              })}
          </SplideTrack>
          <div className="splide__arrows splide__arrows--ltr tb_hc_arrow_wrapper_" role="navigation" aria-label="Slider Navigation Wrapper">
            <div role="navigation" className="tb_hc_arrow splide__arrow splide__arrow--prev tb_hc_arrow_left__ tb__icon tb-arrow-left-alt" aria-labelledby="Navigation Previous Slide"> </div>
            <div role="navigation" className="tb_hc_arrow splide__arrow splide__arrow--next tb_hc_arrow_right__ tb__icon tb-arrow-right-alt" onClick={hasMoreData ? this.requestData : null} aria-labelledby="Navigation Next Slide"> </div>
          </div>
        </Splide>
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
    getDataNextSteps: (wallID, timeStamp, postCount, networkId, after, postData, heightEvent, updateInStateNow) => dispatch(getDataNextSteps(wallID, timeStamp, postCount, networkId, after, postData, heightEvent, updateInStateNow)),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(HorizontalColumn);