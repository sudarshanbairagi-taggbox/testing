import React, { PureComponent } from "react";
import imagesLoaded from 'imagesloaded'
import Isotope from 'isotope-layout';
import Card from "./Elements/Card";
import { connect } from 'react-redux';
import { managePostHeight } from '../../../actions/themeActions';

class ModernCard extends PureComponent {
  state = {
    postData: []
  }
  componentDidMount() {
    const { postData } = this.props;
    this.setState({ postData }, () => this.onLoadMasonry())

  }
  onLoadMasonry = () => {
    const { adjustWidth } = this.props;
    if (adjustWidth) {
      var elem = document.querySelector('.tb_mc_post_container');
      var iso = new Isotope(elem, {
        itemSelector: '.tb_mc_post_wrapper',
        layoutMode: 'masonry',
        masonry: {
          columnWidth: 1,
          horizontalOrder: false
        }
      });
      //setTimeout(() => iso.arrange(), 200)
      imagesLoaded(elem, (instance) => {
        iso.layout();
      });
    }

    var span = document.querySelector('.tb_mc_post_container');
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
    const { completeDataObject, adjustWidth, wall, clickToShowPopUp, onClickToCTA } = this.props;
    var BrandingPosition = 4
    const { postData } = this.props;

    return (
      <div className="tb_mc_post_container">
        {((postData && postData.length > 0)) && postData.map((item, index) => {
          const cardData = completeDataObject[item];
          return  <Card ownerId={wall.Wall.owner} itemData={cardData} key={`moder_${item.id}`} itemIndex={index} adjustWidth={cardData.highlight == 1 ? adjustWidth * 2 : adjustWidth} personalization={wall.Personalization} ThemeRule={wall.ThemeRule} clickToShowPopUp={clickToShowPopUp} wallID={wall.Wall.id} onClickToCTA={onClickToCTA} />
        })}
      </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(ModernCard)