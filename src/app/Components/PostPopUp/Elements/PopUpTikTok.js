import React, { Component } from 'react'
import { Helmet } from "react-helmet";


class PopUpTikTok extends Component {

    state = {
        data: null
    }
    componentDidMount() {
        this.onLoad();
        const { data } = this.props
        this.setState({ data });
    }
    onLoad = () => {
        const scriptList = document.querySelectorAll("script[type='text/javascript']")
        const convertedNodeList = Array.from(scriptList)
        const testScript = convertedNodeList.find(script => script.id === "tiktok-embed")
        if (testScript) {
            // var element = document.getElementById("tagembedPopup");
            // element.classList.remove("tiktopPopupwrap");
            testScript.remove()
        }

    }
    componentWillReceiveProps(nextProps) {
        this.onLoad();
        const { data } = nextProps
        setTimeout(() => {
            // var element = document.getElementById("tagembedPopup");
            // element.classList.add("tiktopPopupwrap");
            this.setState({ data })
        }, 1000)
    }

    componentWillUnmount() {
        this.setState({ data: null });
    }
    render() {
        const { data } = this.state;
        let tiktokHeight = 'auto'
        let tiktokWidth = 'auto'
        let tb_media_wrapper_in = document.querySelector(".tb_post_modal_video")
        if (tb_media_wrapper_in) {
            tiktokHeight = tb_media_wrapper_in.clientHeight;
            tiktokWidth = tb_media_wrapper_in.clientWidth - 10;
        }
        return data && <>
            <blockquote style={{ height: '100%' }} key={data.id} className="tiktok-embed tb_tiktok_embed" cite={data.link} data-video-id={data.link.substring(data.link.lastIndexOf('/') + 1)}>
                <section></section>
            </blockquote>
            <Helmet>
                <script id="tiktok-embed" async src="https://www.tiktok.com/embed.js" type="text/javascript"></script>
            </Helmet>
        </>
    }
}

export default PopUpTikTok;