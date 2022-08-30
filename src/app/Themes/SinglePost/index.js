import React, { PureComponent } from "react";
import { Splide, SplideSlide, SplideTrack } from '@splidejs/react-splide';
import Card from "./Elements/Card";

export default class HorizontalColumns extends PureComponent {
  render() {
    const { postData, completeDataObject, wall, clickToShowPopUp, onClickToCTA } = this.props;
    const slidePost = wall.ThemeRule.slidePost;
    const slideDuration = wall.ThemeRule.slideDuration;

    const settings = {
      type: 'loop',
      rewind: true,
      speed: 500,
      gap: 0,
      autoplay: false,
      padding: 0,
      pagination: false,
      arrows: true,
    };

    return <div className="tb_spt_post_container">
      <Splide hasTrack={false} className="tb_spt_post_slider" options={settings} ref={this.myRef}>
        <SplideTrack>
          {
            ((postData && postData.length > 0)) && postData.map((item, index) => {
              const cardData = completeDataObject[item];
              return <SplideSlide style={{ margin: 0, padding: 0 }}>
                <Card ownerId={wall.Wall.owner} itemData={cardData} key={index} itemIndex={index} personalization={wall.Personalization} ThemeRule={wall.ThemeRule} wallID={wall.Wall.id} clickToShowPopUp={clickToShowPopUp} onClickToCTA={onClickToCTA} />
              </SplideSlide>
            })
          }
        </SplideTrack>
        <div className="splide__arrows splide__arrows--ltr tb_spt_arrow_wrapper_">
          <div className="splide__arrow splide__arrow--prev tb_spt_arrow tb_spt_arrow_left__ tb__icon tb-arrow-left-alt"><div></div></div>
          <div className="splide__arrow splide__arrow--next tb_spt_arrow tb_spt_arrow_right__ tb__icon tb-arrow-right-alt"><div></div></div>
        </div>
      </Splide>
    </div>
  }
}
