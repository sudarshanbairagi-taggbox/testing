import React, { PureComponent } from "react";
import { POPUP_IMAGE_RENEW_REQUEST } from '../../../../actions/themeActions'
export default class Media extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      imgUrl: props.itemData.postFileNew
    }
  }
  onLoad = event => {
    if (event.target.getAttribute("data-load") == 1) this.setState({ imgUrl: event.target.src })
  }
  render() {
    const { imgUrl } = this.state;
    const { itemData, wallID } = this.props;
    const mediaType = (itemData.type === 3 || itemData.type === 5) ? true : false
    const isYoutubePost = (itemData.network.id === 7) ? true : false
    const multiImages = (itemData.imageList && itemData.imageList.length > 0) ? true : false
    const multiImagesClass = ((itemData.imageList && itemData.imageList.length) > 0 && (itemData.type === 3 || itemData.type === 5)) ? 'tb_hs_multi_images_ico_bottom' : 'tb_hs_multi_images_ico'
    const imageStyle = {
      backgroundImage: `url(${imgUrl})`, paddingBottom: '100%', width: '100%'
    };
    return (
      <div className="tb_hs_media_wrap">
        {multiImages ? <div className={`${multiImagesClass} tb__icon tb-multiple`}> </div> : ''}
        {mediaType ? isYoutubePost ? <div className="tb_hs_youtube_ico tb__icon tb-youtube"> </div> : <div className="tb_hs_video_ico tb__icon tb-video"> </div> : ''}
        <div className="tb_hs_image" style={imageStyle}> </div>

        <img loading="lazy" src={imgUrl} style={{ display: `none` }} data-link={itemData.link} data-load="0" data-network={itemData.network.id} data-wall-id={wallID} data-item-id={itemData.id} data-filter-id={itemData.filterId} onLoad={this.onLoad} onError={(itemData.stories == 0) ? (e) => {
          POPUP_IMAGE_RENEW_REQUEST(e)
        } : null} />
      </div>
    );
  }
}



