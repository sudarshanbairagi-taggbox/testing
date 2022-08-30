import React, { PureComponent } from "react";
import Masonry from "react-masonry-component";
// import imagesLoaded from 'imagesloaded'
import { v4 as uuidv4 } from 'uuid';
// import Isotope from 'isotope-layout';
import Card from "./Elements/Card";
import { connect } from 'react-redux';
import { managePostHeight } from '../../../actions/themeActions';

class ClassicPhoto extends PureComponent {
  state = {
    postData: []
  }
  componentDidMount() {
    const { postData } = this.props;
    this.setState({ postData }, () => this.onLoadMasonry())

  }
  onLoadMasonry = () => {
    // const { adjustWidth } = this.props;
    // if (adjustWidth) {
    //   var elem = document.querySelector('.tb_cp_post_container');
    //   var iso = new Isotope(elem, {
    //     itemSelector: '.tb_cp_post_wrapper',
    //     layoutMode: 'masonry',
    //     stagger: 15,
    //     percentPosition: true,
    //     masonry: {
    //       columnWidth: 1,
    //       horizontalOrder: true
    //     }
    //   });

    //   imagesLoaded(elem, (instance) => {
    //     iso.layout();
    //   });
    //   setTimeout(() => iso.arrange(), 200)
    // }

    var span = document.querySelector('.tb_cp_post_container');
    if (span) {
      const styleStr = span.getAttribute('style');
      this.props.managePostHeight(span.style.height)
    }
  }
  componentWillReceiveProps(nextProps) {
    const { postData } = nextProps;
    this.setState({ postData }, () => this.onLoadMasonry())
  }

  render() {
    const { postData, completeDataObject, adjustWidth, wall, clickToShowPopUp, onClickToCTA } = this.props;
    var BrandingPosition = 4

    return (
      // <div className="tb_cp_post_container">
      <Masonry

        className={`tb_cp_post_container`}
        elementType={"div"}
        options={{
          transitionDuration: 0,
          percentPosition: true,
          horizontalOrder: false,
          itemSelector: ".tb_cp_post_wrapper",
          resize: true
        }}
        disableImagesLoaded={false}
        updateOnEachImageLoad={false}
        imagesLoadedOptions={{}}
        style={{ width: "100%!important" }}
        enableResizableChildren={true}
      >
        {
          ((postData && postData.length > 0)) && postData.map((item, index) => {

            const cardData = completeDataObject[item];
            const IsBrandingCard = (BrandingPosition === index) ? false : false
            IsBrandingCard ? BrandingPosition += parseInt(index) + 10 : parseInt(BrandingPosition)
            return <Card ownerId={wall.Wall.owner} key={`Classic_Card_${index}_${item.id}`} itemData={cardData} itemIndex={index} adjustWidth={cardData.highlight == 1 ? adjustWidth * 2 : adjustWidth} personalization={wall.Personalization} ThemeRule={wall.ThemeRule} wallID={wall.Wall.id} clickToShowPopUp={clickToShowPopUp} onClickToCTA={onClickToCTA} />
          })
        }
      </Masonry>
    );
  }
}

const mapStateToProps = state => {
  return {}
}
const mapDispatchToProps = dispatch => {
  return {
    managePostHeight: (data) => dispatch(managePostHeight(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ClassicPhoto)