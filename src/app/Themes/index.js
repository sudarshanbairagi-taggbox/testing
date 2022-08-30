import React, { PureComponent } from "react";
import { connect } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { isMobile } from 'react-device-detect';
import NewsCard from "./NewsCard";
import ClassicPhoto from "./ClassicPhoto";
import ClassicCard from "./ClassicCard";
import ModernCard from "./ModernCard";
import SquarePhoto from "./SquarePhoto";
import HorizontalSlider from "./HorizontalSlider"
import HorizontalColumns from "./HorizontalColumns";
import WidgetTheme from "./WidgetTheme";
import GalleryPhoto from "./GalleryPhoto";
import SinglePost from "./SinglePost";
import HighlightTheme from "./HighlightTheme";
import StoryTheme from "./StoryTheme";
import SeeMore from "./Elements/SeeMore/SeeMore";
import { THEME_WIDTH_ADJUSTMENT_MODERN, URLDATA, findFromArray } from '../../utils'
import { AutoScrollThemeEnableLoadData, ShowMoreVisibleThemes } from '../../constants'
import { showPopUP, getDataNextSteps, themePostTracking } from '../../actions/themeActions'
import ThemeBranding from "./Elements/Branding/ThemeBranding";



const ThemeRender = ({ renderId, wall, postData, adjustWidth, languageSetting, clickToShowPopUp, cardNumber, onClickToCTA }) => {
  const hasMoreData = postData.hasMoreData[0] ? postData.hasMoreData[0].hasMoreData == false ? false : postData.hasMoreData[postData.appendData.networkID] ? postData.hasMoreData[postData.appendData.networkID].hasMoreData : true : true




  switch (wall.Personalization.widgetTheme) {
    case 20:
      return adjustWidth ? <ModernCard {...postData} hasMoreData={hasMoreData} wall={wall} adjustWidth={adjustWidth} languageSetting={languageSetting} clickToShowPopUp={clickToShowPopUp} onClickToCTA={onClickToCTA} /> : null
    case 5:
      return adjustWidth ? <ClassicCard {...postData} hasMoreData={hasMoreData} wall={wall} adjustWidth={adjustWidth} languageSetting={languageSetting} clickToShowPopUp={clickToShowPopUp} onClickToCTA={onClickToCTA} /> : null
    case 3:
      return adjustWidth ? <ClassicPhoto {...postData} hasMoreData={hasMoreData} wall={wall} adjustWidth={adjustWidth} languageSetting={languageSetting} clickToShowPopUp={clickToShowPopUp} onClickToCTA={onClickToCTA} /> : null
    case 4:
      return adjustWidth ? <SquarePhoto {...postData} hasMoreData={hasMoreData} wall={wall} adjustWidth={adjustWidth} languageSetting={languageSetting} clickToShowPopUp={clickToShowPopUp} cardNumber={cardNumber} onClickToCTA={onClickToCTA} /> : null
    case 19:
      return adjustWidth ? <NewsCard {...postData} hasMoreData={hasMoreData} wall={wall} adjustWidth={adjustWidth} languageSetting={languageSetting} clickToShowPopUp={clickToShowPopUp} onClickToCTA={onClickToCTA} /> : null
    case 50:
      return <GalleryPhoto {...postData} hasMoreData={hasMoreData} wall={wall} adjustWidth={adjustWidth} languageSetting={languageSetting} clickToShowPopUp={clickToShowPopUp} cardNumber={cardNumber} renderId={renderId} onClickToCTA={onClickToCTA} />
    case 52:
      return <SinglePost {...postData} hasMoreData={hasMoreData} wall={wall} adjustWidth={adjustWidth} languageSetting={languageSetting} clickToShowPopUp={clickToShowPopUp} onClickToCTA={onClickToCTA} />
    case 16:
      return <HorizontalSlider {...postData} hasMoreData={hasMoreData} wall={wall} adjustWidth={adjustWidth} languageSetting={languageSetting} clickToShowPopUp={clickToShowPopUp} onClickToCTA={onClickToCTA} />
    case 55:
      return <HighlightTheme {...postData} hasMoreData={hasMoreData} wall={wall} adjustWidth={adjustWidth} languageSetting={languageSetting} clickToShowPopUp={clickToShowPopUp} onClickToCTA={onClickToCTA} />
    case 49:
      return <WidgetTheme {...postData} hasMoreData={hasMoreData} wall={wall} adjustWidth={adjustWidth} languageSetting={languageSetting} clickToShowPopUp={clickToShowPopUp} onClickToCTA={onClickToCTA} />
    case 47:
      return <HorizontalColumns {...postData} wall={wall} adjustWidth={adjustWidth} languageSetting={languageSetting} clickToShowPopUp={clickToShowPopUp} hasMoreData={hasMoreData} renderId={renderId} onClickToCTA={onClickToCTA} />
    case 60:
      return <StoryTheme {...postData} wall={wall} hasMoreData={hasMoreData} adjustWidth={adjustWidth} languageSetting={languageSetting} clickToShowPopUp={clickToShowPopUp} onClickToCTA={onClickToCTA} />
    default:
    // code block
  }
}

class ThemeRoute extends PureComponent {
  state = {
    windowWidth: window.innerWidth,
    windowHeight: window.innerHeight,
    adjustWidth: 0,
    cardNumber: 0
  }
  componentWillMount() {
    const { renderId } = this.props.renderId
    this.setState({
      windowWidth: renderId ? document.getElementById(renderId).clientWidth : window.innerWidth
    })
  }
  componentDidMount() {
    const { renderId } = this.props.renderId
    this.onResponsiveTheme();
    window.addEventListener("resize", () => {
      this.setState({ windowWidth: renderId ? document.getElementById(renderId).clientWidth : window.innerWidth, windowHeight: window.innerHeight }, () => this.onResponsiveTheme())
    });
    window.addEventListener("scroll", this.autoLoadScrollData);
  }

  autoLoadScrollData = event => {
    const { wall, postData, loaderData } = this.props;
    const postCount = wall.ThemeRule.numberOfPosts;
    const body = document.body;
    const html = document.documentElement;
    if (wall.Personalization.autoScrollStatus == 1 && AutoScrollThemeEnableLoadData.includes(wall.Personalization.widgetTheme)) {
      const height = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
      if ((window.innerHeight + window.pageYOffset) >= (parseInt(height) - parseInt(50))) {
        if (!(loaderData && loaderData.isShowMoreLoading)) {
          const timeStamp = Math.floor(Date.now() / 1000);
          this.props.getDataNextSteps(wall.Wall.id, timeStamp, postCount, postData.appendData.networkID, postData.appendData.after, postData.appendData.heightEvent);
        }
      }
    }
  }
  onResponsiveTheme = () => {
    const { wall } = this.props;
    const { windowWidth } = this.state;
    let { adjustWidth, cardNumber } = THEME_WIDTH_ADJUSTMENT_MODERN(windowWidth, wall);
    let postWidth = 100 / windowWidth * adjustWidth;
    adjustWidth = postWidth.toFixed(2);
    this.setState({ adjustWidth, cardNumber })
  }
  onClickToShowPopup = (currentIndex, item) => event => {
    const { wall, languageSetting, postData } = this.props;
    if (isMobile && wall.Personalization.mobilePopup === 0) window.open(item.link, '_blank')
    else {
      let updatePostData = postData.postData.map(pItem => postData.completeDataObject[pItem])
      let filteredPostData = updatePostData.filter((filterData) => !String(filterData.id).includes("free_add_"))
      let nIndex = findFromArray(filteredPostData, item.id, currentIndex)

      if (wall.Personalization.postFeatured === 2) window.open(item.link, '_blank');
      else {
        if (wall.Personalization.postFeatured === 1) this.props.showPopUP({ type: 'post', card: item, idArray: filteredPostData, index: nIndex, viewOnText: languageSetting.viewOnText, shareText: languageSetting.shareText, personalization: wall.Personalization, imgData: URLDATA, ThemeRule: wall.ThemeRule, wall: wall })
      }
    }

    themePostTracking({ action: 2, wall: wall.Wall.id, feed: item.feedId, post: item.referenceId ? item.referenceId : item.id })

  }
  onClickToCTA = (item) => event => {
    const { wall } = this.props;
    themePostTracking({ action: 2, wall: wall.Wall.id, type: 1, feed: item.feedId, post: item.referenceId ? item.referenceId : item.id })
  }
  render() {
    const { wall, languageSetting, postData, containerSize } = this.props;
    return <>
      <div className="tb_theme_container">
        <ThemeRender {...this.props} {...this.state} clickToShowPopUp={this.onClickToShowPopup} onClickToCTA={this.onClickToCTA} />
        {wall.Personalization.loadMoreStatus === 1 && ShowMoreVisibleThemes.includes(wall.Personalization.widgetTheme) ? <SeeMore languageSetting={languageSetting} wall={wall} appendData={postData.appendData} postData={postData} /> : null}
        {postData.isFreeAdsStatus ? <ThemeBranding containerSize={containerSize} /> : null}
      </div>
    </>
  }
}


const mapStateToProps = state => {
  return {
    loaderData: state.loaderData,
    renderId: state.renderId
  }
}
const mapDispatchToProps = dispatch => {
  return {
    showPopUP: (data) => dispatch(showPopUP(data)),
    getDataNextSteps: (wallID, timeStamp, postCount, networkId, after, heightEvent, updateInStateNow) => dispatch(getDataNextSteps(wallID, timeStamp, postCount, networkId, after, heightEvent, updateInStateNow)),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(ThemeRoute);