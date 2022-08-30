import React, { PureComponent } from "react";
import HeaderType2 from "./HeaderType/HeaderType2";
import HeaderType3 from "./HeaderType/HeaderType3";
import HeaderType4 from "./HeaderType/HeaderType4";
import HeaderType5 from "./HeaderType/HeaderType5";
import HeaderTypeCustom from './HeaderType/HeaderTypeCustom';

const HeaderRender = ({ Banner }) => {
  switch (Banner.bannerType) {
    case 2:
      return <HeaderType2 Banner={Banner} />
      break;
    case 3:
      return <HeaderType3 Banner={Banner} />
      break;
    case 4:
      return <HeaderType4 Banner={Banner} />
      break;
    case 5:
      return <HeaderType5 Banner={Banner} />
      break;
    default:
    // code block
  }
}
export default class Header extends PureComponent {
  render() {
    const { Banner, BannerImage } = this.props
    return (
      <div className="tb_wall_header__">
        {Banner.status === 1 ? <HeaderRender Banner={Banner} /> : ''}
        {BannerImage.status === 1 && BannerImage.image !== '' ? <HeaderTypeCustom ImageUrl={BannerImage.image} /> : ''}
      </div>
    );
  }
}
