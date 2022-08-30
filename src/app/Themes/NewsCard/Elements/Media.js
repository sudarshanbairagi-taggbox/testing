import React, { PureComponent } from "react";
import Image from "../../Elements/Media/Image";

export default class Media extends PureComponent {
  render() {
    const { itemData, wallID } = this.props;
    const mediaType = (itemData.type === 3 || itemData.type === 5) ? true : false
    const isYoutubePost = (itemData.network.id === 7) ? true : false
    const multiImages = (itemData.imageList && itemData.imageList.length > 0) ? true : false
    const multiImagesClass = ((itemData.imageList && itemData.imageList.length) > 0 && (itemData.type === 3 || itemData.type === 5)) ? 'tb_nc_multi_images_ico_bottom' : 'tb_nc_multi_images_ico'

    return <div className="tb_nc_media_wrap">
      {multiImages ? <div className={`${multiImagesClass} tb__icon tb-multiple`}> </div> : ''}
      {mediaType ? isYoutubePost ? <div className="tb_nc_youtube_ico tb__icon tb-youtube"> </div> : <div className="tb_nc_video_ico tb__icon tb-video"> </div> : ''}
      <Image ImageClass="tb_nc_image" ImageUrl={itemData.postFileNew} item={itemData} wallID={wallID} />
    </div>
  }
}


