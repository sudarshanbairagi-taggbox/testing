import React, { PureComponent } from "react";
import { isMobile } from 'react-device-detect';
import { Splide, SplideSlide, SplideTrack } from '@splidejs/react-splide';
import Card from "./Elements/Card";

export default class HighlightTheme extends PureComponent {
  onUpdateData = event => {

  }
  render() {
    const { postData, completeDataObject, wall, clickToShowPopUp, onClickToCTA } = this.props;

    const numberOfCoumn = wall.ThemeRule.numberOfCoumn;
    const mobileColumn = wall.ThemeRule.mobileColumn;
    const slidePost = wall.ThemeRule.slidePost;
    const slideDuration = wall.ThemeRule.slideDuration;
    const autoScrollStatus = wall.Personalization.autoScrollStatus;
    const rowCount = wall.ThemeRule.multiRow;

    const settings = {
      type: autoScrollStatus === 1 ? false : 'loop',
      rewind: false,
      speed: 1000,
      interval: slidePost === 1 ? (parseInt(slideDuration) * 1000) : 5000,
      perPage: numberOfCoumn > 0 ? numberOfCoumn : 6,
      perMove: 1,
      gap: 0,
      autoplay: slidePost === 1 ? true : false,
      padding: 0,
      pagination: false,
      arrows: true,
      breakpoints: {
        560: {
          perPage: mobileColumn > 0 ? mobileColumn : 1,
        },
        767: {
          perPage: mobileColumn > 0 ? mobileColumn : 2,
        },
        991: {
          perPage: mobileColumn > 0 ? mobileColumn : 3,
        },
        1200: {
          perPage: numberOfCoumn > 0 ? numberOfCoumn : 4,
        },
        1400: {
          perPage: numberOfCoumn > 0 ? numberOfCoumn : 5,
        },
        1600: {
          perPage: numberOfCoumn > 0 ? numberOfCoumn : 6,
        }
      }
    };
    return (
      <div className="tb_ht_post_container">

        <Splide hasTrack={false} className="tb_ht_post_slider" options={settings} ref={this.myRef}>
          <SplideTrack>
            {
              ((postData && postData.length > 0)) && postData.map((item, index) => {
                const cardData = completeDataObject[item];
                return <SplideSlide style={{ margin: 0, padding: 0 }}><Card itemData={cardData} key={index} itemIndex={index} personalization={wall.Personalization} ThemeRule={wall.ThemeRule} clickToShowPopUp={clickToShowPopUp} wallID={wall.Wall.id} onClickToCTA={onClickToCTA} /></SplideSlide>
              })}
          </SplideTrack>

          <div className="splide__arrows splide__arrows--ltr tb_ht_arrow_wrapper_">
            <div className="tb_ht_arrow splide__arrow splide__arrow--prev tb_ht_arrow tb_ht_arrow_left__ tb__icon tb-arrow-left-alt" onClick={this.onUpdateData} > </div>
            <div className="tb_ht_arrow splide__arrow splide__arrow--next  tb_ht_arrow_right__ tb__icon tb-arrow-right-alt"></div>

          </div>
        </Splide>
      </div>
    );
  }
}
