import React, { PureComponent } from "react";
import ReactPlayer from 'react-player'
import Iframe from 'react-iframe';
import { POPUP_IMAGE_RENEW_REQUEST } from '../../../../actions/themeActions'
const VideoComponent = ({ data, WallId }) => {
  return (data.type === 3 || data.type === 5) && <>
    {
      (data.link.indexOf("youtube") >= 0 || data.link.indexOf("youtu.be") >= 0) &&

      <ReactPlayer url={`${data.mediaUrl}`} height='100%' width='100%' controls={true} allowFullScreen={true} playing
        muted
        config={{
          file: {
            attributes: {
              autoPlay: true,
              muted: true
            }
          }
        }} />
    }


    {
      (data.link.indexOf("vimeo") >= 0) &&
      <ReactPlayer url={`${data.mediaUrl}`} height='100%' width='100%' controls={true} allowFullScreen={true} playing
        muted
        config={{
          file: {
            attributes: {
              autoPlay: true,
              muted: false
            }
          }
        }} />
    }
    {
      ((data.network.id && data.network.id == 30) && data.link.indexOf("vk") >= 0) &&
      <Iframe
        className="tb-detail-image-iframe"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        src={`${data.mediaUrl}&autoplay=1`}
        allowFullScreen="true"
        style={{ width: "100%!important" }}
        data-filter-id={data.filterId}
        data-stories={data.stories}
        data-type="video"
        data-network={data.networkId}
        data-link={data.link}
        data-data-id={data.id}
        data-load={0}
      ></Iframe>

    }

    {

      (data.link.indexOf("soundcloud") >= 0) &&
      <Iframe
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        src={`${data.mediaUrl}`}
        allowFullScreen="true"
        style={{ width: "100%!important" }}
      ></Iframe>

    }

    {
      (data.link.indexOf("linkedin") >= 0 || data.link.indexOf("twitter") >= 0 || data.link.indexOf("instagram") >= 0 || data.link.indexOf("tumblr") >= 0 || data.link.indexOf("instagram") >= 0) && <video
        src={`${data.mediaUrl}`}
        autoPlay={true}
        muted={true}
        onError={(e) => { POPUP_IMAGE_RENEW_REQUEST(e) }}
        data-type="video"
        data-stories={data.stories}
        data-filter-id={data.filterId}
        data-network={data.networkId}
        data-postid={data.id}
        data-link={data.link}
        data-load={0}
        data-wall-id={WallId} data-item-id={data.id}
      ></video>
    }
  </>

}
export default class Media extends PureComponent {
  render() {
    const { itemData, wallID } = this.props;
    const mediaType = (itemData.type === 3 || itemData.type === 5) ? true : false
    const isYoutubePost = (itemData.network.id === 7) ? true : false
    const multiImages = (itemData.imageList && itemData.imageList.length > 0) ? true : false
    const multiImagesClass = ((itemData.imageList && itemData.imageList.length) > 0 && (itemData.type === 3 || itemData.type === 5)) ? 'tb_stt_multi_images_ico_bottom' : 'tb_stt_multi_images_ico'
    const imageStyle = {
      backgroundImage: `url(${itemData.postFileNew})`, paddingBottom: '200%', width: '100%'
    };
    return (
      <div className="tb_stt_media_wrap">
        {multiImages ? <div className={`${multiImagesClass} tb__icon tb-multiple`}> </div> : ''}
        {mediaType ? isYoutubePost ? <div className="tb_stt_youtube_ico tb__icon tb-youtube"> </div> : <div className="tb_stt_video_ico tb__icon tb-play-outline"> </div> : ''}
        <div className="tb_stt_image" style={imageStyle}> </div>
        {/* <VideoComponent data={itemData} WallId={wallID} /> */}
      </div>
    );
  }
}
