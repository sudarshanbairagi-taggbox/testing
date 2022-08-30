import React, { PureComponent } from "react";

export default class Media extends PureComponent {
  render() {
    const { itemData } = this.props;
    const mediaType = (itemData.type === 3 || itemData.type === 5) ? true : false
    const isYoutubePost = (itemData.network.id === 7) ? true : false
    const multiImages = (itemData.imageList && itemData.imageList.length > 0) ? true : false
    const multiImagesClass = ((itemData.imageList && itemData.imageList.length) > 0 && (itemData.type === 3 || itemData.type === 5)) ? 'tb_ht_multi_images_ico_bottom' : 'tb_ht_multi_images_ico'
    const imageStyle = {
      backgroundImage: `url(${itemData.postFileNew})`, paddingBottom: '100%', width: '100%'
    };
    return (
      <div className="tb_ht_media_wrap">
        {multiImages ? <div className={`${multiImagesClass} tb__icon tb-multiple`}> </div> : ''}
        {mediaType ? isYoutubePost ? <div className="tb_ht_youtube_ico tb__icon tb-youtube"> </div> : <div className="tb_ht_video_ico tb__icon tb-play-circle"> </div> : ''}
        <div className="tb_ht_image" style={imageStyle}> </div>
      </div>
    );
  }
}
