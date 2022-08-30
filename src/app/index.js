import React, { PureComponent } from "react";
import Header from "./Header";
import Filters from "./Components/Filters";
import ThemeRoute from "./Themes";
import { WebUrl } from "../constants";
import OnsiteUploadButton from "./Components/UserComponents/OnsiteUploadButton";
import { managePostHeight } from '../actions/themeActions';
import { connect } from 'react-redux';
class App extends PureComponent {
  constructor() {
    super();
    this.state = {
      containerSize: {
        width: null,
        height: null,
      }
    };
  }
  
  componentDidMount () {
    const containerEle = document.querySelector('.tb_app_container');
    this.setState({
      containerSize: {
        width: containerEle.offsetWidth,
        height: containerEle.offsetHeight,
      }
    })
  }

  render() {
    const { wall, webFilters, postData, languageSetting } = this.props;
    const headerPositionTop = ((wall.Banner.status === 1 && wall.Banner.banner_position === 1) || wall.BannerImage.status === 1) ? true : false;
    const headerPositionBottom = wall.Banner.status === 1 && wall.Banner.banner_position === 2 ? true : false;
    const filters = (webFilters && webFilters.length > 1 && ![55, 52, 60].includes(wall.Personalization.widgetTheme)) ? true : false;

    const backgroundStyle = wall.Background.transparent === 0 ? {
      backgroundImage: (wall.Background.image) ? `url(${wall.Background.image})` : '',
      backgroundColor: wall.Background.color
    } : null
    return <div className="tb_app_container" style={{ minHeight:[47,16,49,55,60,52].includes(wall.Personalization.widgetTheme)? '100%':`${this.props.postHeight}px`}}>

      {headerPositionTop ? <Header Banner={wall.Banner} BannerImage={wall.BannerImage} /> : ''}
      <div className="tb_app_wrapper" style={backgroundStyle}>
        {(wall.UserRule.on_site_upload && wall.UgcSettings.onsite_status) ? <OnsiteUploadButton UgcSettings={wall.UgcSettings} id={wall.Wall.id} /> : null}
        {filters ? <Filters type={wall.Personalization.filter_type} webFilters={webFilters} appendData={postData.appendData} wall={wall} languageSetting={languageSetting} postData={postData} /> : ''}
        <ThemeRoute {...this.props} containerSize={this.state.containerSize} />
      </div>
      {headerPositionBottom ? <Header Banner={wall.Banner} BannerImage={wall.BannerImage} /> : ''}
      <a href={WebUrl} target="_blank" style={{ display: 'none', opacity: 0, visibility: "hidden" }}>Taggbox</a>
    </div>
  }
}
const mapStateToProps = state => {
  if (state.postHeight.manage_height == true) {
    let postHeight = state.postHeight.data.replace("px", "");
    return {
      postHeight,
      renderId: state.renderId
    }
  }
  else return { renderId: state.renderId }
}


const mapDispatchToProps = dispatch => {
  return {
    managePostHeight: (data) => dispatch(managePostHeight(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
