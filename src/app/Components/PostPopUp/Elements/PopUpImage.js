import React, { PureComponent } from "react";
import reactImageSize from 'react-image-size';
import { POPUP_IMAGE_RENEW_REQUEST } from '../../../../actions/themeActions'

export default class PopUpImage extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      height: '100',
      width: '100',
      error: '',
      imgUrl: props.ImageUrl
    };
  }

  componentDidMount() {
    // const { ImageUrl } = this.props
    const { imgUrl } = this.state;
    reactImageSize(imgUrl)
      .then(({ width, height }) => this.setState({
        height: (height * 100) / width,
        width: (width * 100) / height
      }))
      .catch((errorMessage) =>
        this.setState({
          height: 100,
          width: 100,
          error: errorMessage
        })
      )
  }
  componentWillReceiveProps(nextProps) {
    const { ImageUrl } = nextProps;
    this.setState({ imgUrl: ImageUrl })
  }
  onLoad = event => {
    if (event.target.getAttribute("data-load") == 1) this.setState({ imgUrl: event.target.src })
  }
  render() {
    const { data, wall } = this.props
    const { height, imgUrl } = this.state


    return (
      <div className="tb_post_modal_media_holder">
        <div className="tb_post_modal_img_holder_blur" style={{ backgroundImage: `url(${imgUrl})` }}><div></div></div>
        <div className="tb_post_modal_img_holder" style={{ backgroundImage: `url(${imgUrl})`}}><div></div></div>
        <img loading="lazy" src={imgUrl} style={{ display: `none` }} data-link={data.link} data-load="0" data-network={data.network.id} data-wall-id={wall.Wall.id} data-item-id={data.id} data-filter-id={data.filterId} onLoad={this.onLoad} onError={(data.stories == 0) ? (e) => {
          POPUP_IMAGE_RENEW_REQUEST(e)
        } : null} />
      </div>
    );
  }
}

