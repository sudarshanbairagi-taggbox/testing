import React, { PureComponent } from "react";
import PopUpImage from "./PopUpImage";
import PopUpVideo from "./PopUpVideo";
import PopUpMediaSlider from "./PopUpMediaSlider";

export default class PopUpMedia extends PureComponent {
  render() {
    const { data } = this.props
    return <div className="tb_post_modal_media_wrapper_in">
      {
        data.imageList && data.imageList.length > 0 ? <PopUpMediaSlider imageList={data.imageList}  {...this.props} /> : (data.type === 2 || data.type === 4) ? <PopUpImage ImageUrl={data.postFileNew} {...this.props} /> : (data.type === 3 || data.type === 5) ? <PopUpVideo  {...this.props} />
          : null
      }
    </div>
  }
}