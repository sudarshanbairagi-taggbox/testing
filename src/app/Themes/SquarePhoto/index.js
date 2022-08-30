import React, { PureComponent } from "react";
import Isotope, { data } from 'isotope-layout';
import Card from "./Elements/Card";
import BrandingCard from "./Elements/BrandingCard";
import { connect } from 'react-redux';
import { managePostHeight } from '../../../actions/themeActions';

class SquarePhoto extends PureComponent {
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
      var elem = document.querySelector('.tb_sp_post_container');
      var iso = new Isotope(elem, {
        itemSelector: '.tb_sp_post_wrapper',
        layoutMode: 'masonry',
        masonry: {
          columnWidth: 1,
          horizontalOrder: false,
        }
      });
      setTimeout(() => iso.arrange(), 200)
    }

    var span = document.querySelector('.tb_sp_post_container');
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
    const { postData, completeDataObject, adjustWidth, wall, clickToShowPopUp, cardNumber, onClickToCTA } = this.props;
    let totalPostBestFit = postData.length;


    if (wall && wall.Personalization.fitRow == 1) {
      if (postData.length >= parseInt(cardNumber)) {
        let bestFitEachRow = postData.length / parseInt(cardNumber);
        totalPostBestFit = (parseInt(cardNumber) * parseInt(bestFitEachRow));
      }
    }
    return (
      <div className="tb_sp_post_container">
        {((postData && postData.length > 0)) && postData.map((item, index) => {

          const cardData = completeDataObject[item];
          return parseInt(totalPostBestFit) >= parseInt((index + 1)) ?
             <Card ownerId={wall.Wall.owner} itemData={cardData} key={`square_photo_${item.id}`} itemIndex={index} adjustWidth={cardData.highlight == 1 ? adjustWidth * 2 : adjustWidth} personalization={wall.Personalization} ThemeRule={wall.ThemeRule} wallID={wall.Wall.id} clickToShowPopUp={clickToShowPopUp} onClickToCTA={onClickToCTA} />
           : null
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

export default connect(mapStateToProps, mapDispatchToProps)(SquarePhoto)