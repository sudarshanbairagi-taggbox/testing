import React, { PureComponent } from "react";
import reactImageSize from 'react-image-size';


export default class HeaderTypeCustom extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      height: '5',
      width: '100',
      error: ''
    };
  }
  componentWillMount() {
    const { ImageUrl } = this.props
    reactImageSize(ImageUrl)
      .then(({ width, height }) => this.setState({
        height: (height * 100) / width,
        width: (width * 100) / height
      }))
      .catch((errorMessage) =>
        this.setState({
          height: 5,
          width: 100,
          error: errorMessage
        })
      )
  }
  render() {
    const ImageUrl = {
      backgroundImage: `url(${this.props.ImageUrl})`, paddingBottom: this.state.height + '%', width: '100%'
    };
    return (
      <div className="tb_wall_custom_header_wrap__">
          <div className="tb_header_img_" style={ImageUrl}> </div>
      </div>
    );
  }
}
