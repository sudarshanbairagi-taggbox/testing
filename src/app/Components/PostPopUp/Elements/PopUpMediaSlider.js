import React, { PureComponent } from "react";
import PopUpImage from "./PopUpImage";
import PopUpVideo from "./PopUpVideo";
import { Splide, SplideSlide, SplideTrack } from '@splidejs/react-splide';

export default class PopUpMediaSlider extends PureComponent {

  render() {
    const { imageList, data, wall } = this.props

    const settings = {
      //type:'loop',
      rewind: true,
      speed: 1000,
      gap: 0,
      autoplay: false,
      padding: 0,
      pagination: true,
      arrows: true,
      focus: 'center',
      classes: {
        pagination: 'splide__pagination tb_modal_slider_dots',
        page: 'splide__pagination__page tb_modal_slider_dot',
      },
    };
    return <div className="tb_post_modal_slide_holder_">
      <Splide hasTrack={false} className="tb_post_modal_media_slider" options={settings} ref={this.myRef}>
        <SplideTrack>
          {imageList.map((imageItem, index) => <SplideSlide style={{ margin: 0, padding: 0 }}>
            <div className="tb_post_modal_slide_list">
              {(imageItem.type == 2 || imageItem.type == 4) ? <PopUpImage key={`multi-slider${index}`} ImageUrl={imageItem.postFile} data={{ link: imageItem.link, network: { id: imageItem.networkId }, id: imageItem.id, filterId: data.filterId, stories: imageItem.stories }} wall={wall} /> : (imageItem.type === 3 || imageItem.type === 5) ? <PopUpVideo data={{ mediaUrl: imageItem.mediaFile, link: imageItem.link, network: { id: imageItem.networkId }, id: imageItem.id, filterId: data.filterId, stories: imageItem.stories }} wall={wall} /> : null}
            </div>
            
          </SplideSlide>
          )}
        </SplideTrack>
        <div className="splide__arrows splide__arrows--ltr tb_post_modal_arrow_wrapper_">
          <div className="splide__arrow splide__arrow--prev tb_post_modal_arrow tb_post_modal_arrow_left__ tb__icon tb-arrow-left-alt"><div></div></div>
          <div className="splide__arrow splide__arrow--next  tb_post_modal_arrow tb_post_modal_arrow_right__ tb__icon tb-arrow-right-alt"><div></div></div>
        </div>
      </Splide>
    </div>
  }
}