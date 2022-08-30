import React, { PureComponent } from "react";
import { Splide, SplideSlide, SplideTrack } from '@splidejs/react-splide';
import Card from "./Elements/Card";

export default class StoryTheme extends PureComponent {
  state = {
    arrowWidth: 0
  }
  componentDidMount() {
    this.onResponsiveCardItem()
    window.addEventListener("resize", () => this.onResponsiveCardItem());
  }
  onResponsiveCardItem = () => {
    const activeItem = document.querySelector(".splide__slide.is-active")
    if (activeItem) {
      const arrowWidth = activeItem.clientWidth + 30;
      this.setState({ arrowWidth })
    }
  }
  render() {
    const { postData, completeDataObject, wall, clickToShowPopUp, onClickToCTA } = this.props;
    const { arrowWidth } = this.state;

    const numberOfCoumn = wall.ThemeRule.numberOfCoumn;
    const mobileColumn = wall.ThemeRule.mobileColumn;
    const slidePost = wall.ThemeRule.slidePost;
    const slideDuration = wall.ThemeRule.slideDuration;
    const autoScrollStatus = wall.Personalization.autoScrollStatus;

    const settings = {
      type: autoScrollStatus === 1 ? false : 'loop',
      rewind: false,
      speed: 1000,
      interval: slidePost === 1 ? (parseInt(slideDuration) * 1000) : 5000,
      perPage: numberOfCoumn > 0 ? numberOfCoumn : 7,
      perMove: 1,
      gap: 0,
      autoplay: slidePost === 1 ? true : false,
      padding: "0",
      pagination: false,
      arrows: true,
      focus: 'center',
      breakpoints: {
        560: {
          perPage: mobileColumn > 0 ? mobileColumn : 1,
        },
        767: {
          perPage: mobileColumn > 0 ? mobileColumn : 3,
        },
        991: {
          perPage: mobileColumn > 0 ? mobileColumn : 3,
        },
        1200: {
          perPage: numberOfCoumn > 0 ? numberOfCoumn : 5,
        },
        1400: {
          perPage: numberOfCoumn > 0 ? numberOfCoumn : 5,
        },
        1600: {
          perPage: numberOfCoumn > 0 ? numberOfCoumn : 5,
        }
      },
      updateOnMove: true,
    };

    const mobileClass560 = settings.breakpoints[560].perPage === 1 ? 'tb_stt_center_mode560' : '';
    const mobileClass767 = settings.breakpoints[767].perPage === 1 ? 'tb_stt_center_mode767' : '';
    const mobileClass991 = settings.breakpoints[991].perPage === 1 ? 'tb_stt_center_mode991' : '';
    return (
      <div className="tb_stt_post_container">
        <Splide hasTrack={false} className={`tb_stt_post_slider ${mobileClass560} ${mobileClass767} ${mobileClass991}`} options={settings}>
          <SplideTrack>
            {
              ((postData && postData.length > 0)) && postData.map((item, index) => {
                const cardData = completeDataObject[item];
                return <SplideSlide style={{ margin: 0, padding: 0 }} data-index={index}>
                    <Card ownerId={wall.Wall.owner} itemData={cardData} key={index} itemIndex={index} personalization={wall.Personalization} ThemeRule={wall.ThemeRule} clickToShowPopUp={clickToShowPopUp} wallID={wall.Wall.id} onClickToCTA={onClickToCTA} />
                </SplideSlide>
              })}
          </SplideTrack>
          <div className="splide__arrows splide__arrows--ltr tb_stt_arrow  tb_stt_arrow_left__" onClick={this.onUpdateData} style={{ right: arrowWidth }}>
            <div className="splide__arrow splide__arrow--prev tb__icon tb-arrow-left-alt"> </div>
          </div>
          <div className="splide__arrows splide__arrows--ltr tb_stt_arrow tb_stt_arrow_right__" style={{ left: arrowWidth }}>
            <div className="splide__arrow splide__arrow--next tb__icon tb-arrow-right-alt"> </div>
          </div>
        </Splide>
      </div>
    );
  }
}
