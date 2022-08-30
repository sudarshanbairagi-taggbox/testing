import React, { PureComponent } from "react";
import { connect } from 'react-redux';
import PopUpMedia from './Elements/PopUpMedia'
import PopUpAuthor from './Elements/PopUpAuthor'
import PopUpShare from './Elements/PopUpShare'
import PopUpContent from './Elements/PopUpContent'
import { closePopUP, reportMediaPopUp } from '../../../actions/themeActions'
import PopUpBranding from "./Elements/PopUpBranding";


class PostPopUp extends PureComponent {
  state = {
    isEnable: 0,
    eventData: {},
    shareText: "SHARE",
    viewOnText: "View on",
    currentIndex: null,
    completeData: {},
    personalization: {},
    url: null,
    platform: null,
    imgData: [],
    type: ""
  }
  componentDidMount() {
    const { data, wall } = this.props;
    this.getWidgetPopUPEvent(data)
    setTimeout(() => {
      var addModal = document.querySelector(".tb_post_modal_modal");
      if (addModal) addModal.classList.add("tb_post_modal_show");

       if(data.personalization.widgetTheme!=undefined && data.personalization.widgetTheme==47){
          if (addModal) addModal.style.overflow="hidden";
       }
    })

    var taggBoxRoot = document.getElementsByTagName('html');
    if (taggBoxRoot && taggBoxRoot[0]) {
      taggBoxRoot[0].style.overflow = "hidden";
    }
  }
  closeWidgetPopUP = event => {
    const { wall } = this.props;
    var addModal = document.querySelector(".tb_post_modal_modal");
    if (addModal && addModal.classList.contains("tb_post_modal_show")) {
      addModal.classList.remove("tb_post_modal_show")
      this.setState({ isEnable: 0, currentIndex: null, type: "" });
      setTimeout(() => this.props.closePopUP(), 100)
    }

    var taggBoxRoot = document.getElementsByTagName('html');
    if (taggBoxRoot && taggBoxRoot[0]) {
      taggBoxRoot[0].style.overflow = "";
    }


  };

  getWidgetPopUPEvent = (data) => {
    if (data !== undefined && data != "" && data.card) {
      if (data.type == "post") {
        this.setState({
          url: "",
          isEnable: 1,
          eventData: data,
          currentIndex: data.index,
          completeData: data.idArray,
          viewOnText: data.viewOnText,
          shareText: data.shareText,
          imgData: data.imgData,
          personalization: data.personalization,
          type: data.type
        }, () => this.WidgetPopUPSlideWithArrowKey())
      }
      else if (data.type == "submit-pic") {
        this.setState({
          isEnable: 1,
          type: data.type,
          windowParent: data,
        })
      }
    }

  };
  featuredPopSliderChangeIndex = (currentIndex) => event => {
    const { eventData } = this.state;
    if (currentIndex === -1) this.setState({ currentIndex: eventData.idArray.length - 1 });
    else this.setState({ currentIndex: eventData.idArray.length == currentIndex ? 0 : currentIndex });
  };
  SliderWithKey = (currentIndex) => {
    const { eventData } = this.state;
    if (currentIndex === -1) this.setState({ currentIndex: eventData.idArray.length - 1 });
    else this.setState({ currentIndex: eventData.idArray.length == currentIndex ? 0 : currentIndex });
  };
  WidgetPopUPSlideWithArrowKey = e => {
    const { personalization } = this.state;

    if (personalization && personalization.popupSlideShow === 1) {
      e = e || window.event;
      let self = this;
      if (e && e.keyCode && e.keyCode != undefined) {
        if (e.keyCode == 37) self.SliderWithKey(self.state.currentIndex - 1)
        else if (e.keyCode == 39) self.SliderWithKey(self.state.currentIndex + 1)
      }
    }


  }
  render() {
    const { wall, reportMediaPopUp, languageSetting } = this.props;
    const { viewOnText, isEnable, currentIndex, personalization, completeData, eventData, url, platform, imgData, type } = this.state;
    let data = null;
    if (currentIndex === -1) data = completeData[eventData.idArray.length - 1];
    else data = completeData[currentIndex];
    const popupSlideShow = (wall.Personalization.popupSlideShow == 1) ? true : false
    return data && Object.keys(data).length > 0 ? <div className="tb_post_modal_modal">
      <div className="tb_post_modal_modal_dialog">
        <div className="tb_post_modal_conetent">
          <div className="tb_post_modal_modal_head">
            <div className="tb_post_modal_modal_header">
              <div className="tb_post_modal_post_link_small">
                <div className="tb_post_modal_post_address">
                  <div className="tb_post_modal_view_link" onClick={event => window.open(data.link, "_blank")}>
                    <div className="tb_post_modal_view">{languageSetting.viewOnText} {data.network.name}</div>
                    <div className="tb_post_view_ico tb__icon tb-arrow-right-alt"> </div>
                  </div>
                </div>
              </div>
              <div className="tb_post_modal_close_wrap">
                <div className="tb_post_modal_close_btn" onClick={this.closeWidgetPopUP}>
                  <div className="tb_post_close_ico tb__icon tb-close-alt"> </div>
                </div>
              </div>
            </div>
            {popupSlideShow ? <div className={`tb_post_modal_navigation tb_post_modal_nav_content ${data.type === 1 ? 'tb_post_modal_text_nav__' : null}`}>
              <div className="tb_post_modal_nav tb_post_modal_prev_btn" onClick={this.featuredPopSliderChangeIndex(currentIndex - 1)}>
                <div className="tb_post_nav tb__icon tb-arrow-left-alt"> </div>
              </div>
              <div className="tb_post_modal_nav tb_post_modal_nxt_btn" onClick={this.featuredPopSliderChangeIndex(currentIndex + 1)}>
                <div className="tb_post_nav tb__icon tb-arrow-right-alt"> </div>
              </div>
            </div> : null}
          </div>
          <div className="tb_post_modal_modal_body" style={{ backgroundColor: wall.ThemeRule.cardColor }}>
            {data.type != 1 ? <div className="tb_post_modal_details_left">
              {popupSlideShow ? <div className="tb_post_modal_navigation tb_post_modal_nav_img">
                <div className="tb_post_modal_nav tb_post_modal_prev_btn" onClick={this.featuredPopSliderChangeIndex(currentIndex - 1)}>
                  <div className="tb_post_nav tb__icon tb-arrow-left-alt"> </div>
                </div>
                <div className="tb_post_modal_nav tb_post_modal_nxt_btn" onClick={this.featuredPopSliderChangeIndex(currentIndex + 1)}>
                  <div className="tb_post_nav tb__icon tb-arrow-right-alt"> </div>
                </div>
              </div> : null}
              <PopUpMedia data={data} wall={wall} />
            </div> : null}
            <div className={`tb_post_modal_details_right ${data.type === 1 ? 'tb_post_modal_text__' : ''}`} style={{ backgroundColor: data.font.cardColor }}>
              <div className="tb_post_modal_content_wrap">
                <div className="tb_post_modal_post_detail_wrap">
                  <PopUpAuthor key={`author_${data.id}`} item={data} ThemeRule={wall.ThemeRule} Personalization={wall.Personalization} ownerId={wall.Wall.owner} />
                  <PopUpContent key={data.id} ThemeRule={wall.ThemeRule} Personalization={wall.Personalization} item={data} contentData={data.content} contentTitle={data.contentTitle} />
                </div>
                <div className="tb_post_modal_post_footer">
                  <div className="tb_post_modal_post_footer_report" onClick={event => reportMediaPopUp(data)}>
                    <div className="tb_post_modal_post_report_media_btn_wrap__">
                      <div className="tb_post_modal_post_report_media_btn__" style={{
                        color: data.font.fontColor
                      }}>Report</div>
                    </div>
                  </div>
                  <PopUpShare item={data} wall={wall} color={wall.ThemeRule.fontColor} />
                </div>
              </div>
            </div>
            {wall.UserRule.branding_lite && wall.UserRule.branding_lite == 1 ? <PopUpBranding /> : null}
          </div>
        </div>
      </div>
    </div> : null


  }
}
const mapStateToProps = state => {

  return {

  }
}
const mapDispatchToProps = dispatch => {
  return {
    closePopUP: (data) => dispatch(closePopUP(data)),
    reportMediaPopUp: (data) => dispatch(reportMediaPopUp(data)),

  }
}
export default connect(mapStateToProps, mapDispatchToProps)(PostPopUp);