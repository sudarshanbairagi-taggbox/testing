import React, { PureComponent } from "react";
import { v4 as uuidv4 } from 'uuid';
import Iframe from 'react-iframe';
import ReactPlayer from "react-player"
import PopUpTikTok from './PopUpTikTok'
import { POPUP_VIDEO_RENEW } from '../../../../actions/themeActions'
const videoIframeTyle = ["youtube", "youtu.be", "vimeo", "tumblr", "soundcloud", "linkedin"]

const isVideo = (videoLink) => {
    let isVideoStatus = false;
    if (String(videoLink)) {
        videoIframeTyle.map((item) => {
            if (String(videoLink).includes(item) && !isVideoStatus) isVideoStatus = true;
        })
    }
    return isVideoStatus;

}
export default class PopUpVideo extends PureComponent {
    constructor(props) {
        super(props);
    }

    render() {
        const { data, wall } = this.props;
        return <div className="tb_post_modal_media_holder">
            {
                isVideo(data.link) ? <Iframe
                    className="tb_post_modal_iframe_video"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    src={`${data.mediaUrl}`}
                    allowFullScreen="true"
                    data-filter-id={data.filterId} data-type="video"
                    data-network={data.network.id}
                    data-link={data.link}
                    data-wall-id={wall.Wall.id} data-item-id={data.id}
                    data-load={0}
                    height="1000"
                    width="1000"
                ></Iframe> : ["facebook"].includes(data.link) ? <ReactPlayer
                    className="tb_post_modal_iframe_video"
                    url={data.mediaUrl} controls data-type="video"
                    data-filter-id={data.filterId}
                    data-network={data.network.id}
                    data-link={data.link}
                    data-wall-id={wall.Wall.id} data-item-id={data.id}
                    data-load={0}
                    autoPlay
                /> : ((data.network.id == 30) && ["vk"].includes(data.link)) ? <Iframe
                    className="tb_post_modal_iframe_video"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    src={`${data.mediaUrl}&autoplay=1`}
                    allowFullScreen="true"
                    style={{ width: "100%!important" }}
                    data-filter-id={data.filterId}
                    data-type="video"
                    data-network={data.network.id}
                    data-link={data.link}
                    data-wall-id={wall.Wall.id} data-item-id={data.id}
                    data-load={0}
                ></Iframe> : data.network.id == 28 ? <div className="tb_post_modal_video">
                    <PopUpTikTok data={data} key={data.id} key={uuidv4()} />
                </div> :
                                <>
                                    {
                                        (window.navigator.userAgent.includes('Safari') && !window.navigator.userAgent.includes('Chrome')) && data.mediaUrl.includes('instagram') ? <img loading="lazy" className="tb_post_modal_video__"
                                            data-wall-id={wall.Wall.id} data-item-id={data.id}
                                            data-type="video"
                                            data-network={data.network.id}
                                            data-link={data.link}
                                            data-load={0}
                                            data-filter-id={data.filterId} src={data.mediaUrl} />
                                            :
                                            <video className="tb_post_modal_video"
                                                data-wall-id={wall.Wall.id} data-item-id={data.id}
                                                data-filter-id={data.filterId}
                                                src={data.mediaUrl}
                                                autoPlay={false}
                                                controls
                                                data-type="video"
                                                data-network={data.network.id}
                                                data-link={data.link}
                                                data-load={0}
                                                onError={(data.stories == 0) ? (e) => { POPUP_VIDEO_RENEW(e) } : null}
                                            ></video>
                                    }
                                </>
            }
        </div>
    }
}