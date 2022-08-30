import React, { PureComponent } from "react";
import { POPUP_IMAGE_RENEW_REQUEST } from '../../../../actions/themeActions'
import { loadImage } from '../../../../utils'

export default class Image extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      height: '100',
      width: '100',
      error: '',
      imgUrl: props.ImageUrl
    }
  }

  componentWillMount() {
    this.onMediaLoad(this.props)
  }

  onMediaLoad = async (props) => {
    const { item } = props;
    const { imgUrl } = this.state;

    if (item && Object.keys(item).length > 0 && [4, 5, 3].includes(item.type)) {
      if (item.mediaHeight && item.mediaHeight != "" && item.mediaWidth && item.mediaWidth != "") {
        this.setState({
          height: (parseInt(item.mediaHeight) * 100) / parseInt(item.mediaWidth),
          width: (parseInt(item.mediaWidth) * 100) / parseInt(item.mediaHeight)
        })
      }
      else {

        const image = await loadImage(imgUrl);

        this.setState({
          height: (image.height * 100) / image.width,
          width: (image.width * 100) / image.height
        })
      }

    }
  }
  onLoad = event => {
    if (event.target.getAttribute("data-load") == 1) this.setState({ imgUrl: event.target.src })
  }
  componentWillReceiveProps(nextProps) {
    const { ImageUrl } = nextProps
    this.setState({ imgUrl: ImageUrl }, () => this.onMediaLoad(nextProps))
  }
  render() {
    const { ImageClass, ImageUrl, item, wallID } = this.props
    const { height, imgUrl } = this.state

    const imageStyle = {
      backgroundImage: `url(${imgUrl})`, paddingBottom: height + '%', width: '100%'
    };

    return <>
      <div className={ImageClass} style={imageStyle}> </div>
      <img loading="lazy" src={imgUrl} style={{ display: `none` }} data-link={item.link} data-load="0" data-network={item.network.id} data-wall-id={wallID} data-item-id={item.id} data-filter-id={item.filterId} onLoad={this.onLoad} onError={(item.stories == 0) ? (e) => {
        POPUP_IMAGE_RENEW_REQUEST(e)
      } : null} />
    </>
  }
}
