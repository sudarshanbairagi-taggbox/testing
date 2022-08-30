import React, { PureComponent, Component } from "react";
import Masonry from 'react-masonry-component';
import Isotope from 'isotope-layout';
import imagesLoaded from 'imagesloaded'
import { v4 as uuidv4 } from 'uuid';
import Card from "./Elements/Card";
import { connect } from 'react-redux';
import { managePostHeight } from '../../../actions/themeActions';
class ClassicCard extends PureComponent {

  state = {
    postData: [],
    windowWidth: window.innerWidth
  }
  componentDidMount() {
    const { postData, renderId } = this.props;
    this.setState({ postData }, () => this.onLoadMasonry())

    if (renderId.renderId) {
      this.setState({
        windowWidth: document.getElementById(renderId.renderId).clientWidth
      })
    }

  }
  onLoadMasonry = () => {
    // const { adjustWidth } = this.props;
    // if (adjustWidth) {
    //   var elem = document.querySelector('.tb_gp_post_container');
    //   var iso = new Isotope(elem, {
    //     itemSelector: '.tb_gp_post_wrapper',
    //     layoutMode: 'masonry',
    //     masonry: {
    //       columnWidth: 1,
    //     }
    //   });
    //   //setTimeout(() => iso.arrange(), 200)
    //   var imgLoad = imagesLoaded(elem);
    //   imgLoad.on('always', (instance) => {
    //     iso.layout();
    //   });
    //   // imagesLoaded(elem, (instance) => {
    //   //   iso.layout();
    //   // });
    // }

    var span = document.querySelector('.tb_gp_post_container');
    if (span) {
      const styleStr = span.getAttribute('style');
      this.props.managePostHeight(span.style.height)
    }

  }
  componentWillReceiveProps(nextProps) {
    const { postData } = nextProps;
    this.setState({ postData }, () => this.onLoadMasonry())
  }

  calculationData = (length, cardNumber1, columnCount, totalPostBestFit) => {
    if (length > totalPostBestFit && length > (totalPostBestFit + columnCount)) return { totalPostBestFit: (totalPostBestFit + columnCount), isLastRow: true };
    else return { totalPostBestFit: totalPostBestFit, isLastRow: false };
  }
  render() {
    const { postData, completeDataObject, adjustWidth, wall, clickToShowPopUp, cardNumber, onClickToCTA } = this.props;
    const { windowWidth } = this.state;

    var totalPostBestFit = { totalPostBestFit: 0, isLastRow: false };;

    if (postData.length > parseInt(cardNumber)) {
      let columnCountValue = wall.Personalization.columnCount;
      let cardNumber1 = parseInt(cardNumber);
      if (columnCountValue == 4) {
        cardNumber1 = 9;
      }
      else if (columnCountValue == 2) {
        cardNumber1 = 3;
      }
      else if (columnCountValue == 3) {
        cardNumber1 = 6;
      }
      else if (columnCountValue == 5) {
        cardNumber1 = 12;
      }
      if (windowWidth < 768) cardNumber1 = parseInt(cardNumber);

      let bestFitEachRow = postData.length / parseInt(cardNumber1);
      totalPostBestFit = (parseInt(cardNumber1) * parseInt(bestFitEachRow));

      totalPostBestFit = this.calculationData(postData.length, cardNumber1, columnCountValue, totalPostBestFit)
    }

    let columnCount = wall.Personalization.columnCount + 1;


    return (
      <Masonry
        className={`tb_gp_post_container`}
        elementType={'div'}
        options={{
          transitionDuration: 0,
          percentPosition: true,
          itemSelector: '.tb_gp_post_wrapper',
          resize: true,
        }}
        disableImagesLoaded={false}
        updateOnEachImageLoad={false}
        imagesLoadedOptions={{}}
        style={{ width: '100%!important' }}
        enableResizableChildren={true}
      >
        {
          ((postData && postData.length > 0)) && postData.map((item, index) => {
            const cardData = completeDataObject[item];


            let actualPostWidth = adjustWidth;
            if (wall.Personalization.columnCount == 3 && columnCount === (index + 1)) {
              actualPostWidth = (adjustWidth * 2);
              let nextCount = columnCount + (wall.Personalization.columnCount * 2);
              columnCount = nextCount;
            }
            else if (wall.Personalization.columnCount == 2 && columnCount === (index + 1)) {
              actualPostWidth = (adjustWidth * 2);
              let nextCount = columnCount + (wall.Personalization.columnCount + 1);
              columnCount = nextCount;

            }
            else if (wall.Personalization.columnCount == 4 && columnCount === (index + 1)) {
              actualPostWidth = (adjustWidth * 2);
              let nextCount = columnCount + ((wall.Personalization.columnCount * 2) + 1);
              columnCount = nextCount;

            }
            else if (wall.Personalization.columnCount == 5 && columnCount === (index + 1)) {
              actualPostWidth = (adjustWidth * 2);
              let nextCount = columnCount + ((wall.Personalization.columnCount * 2) + 2);
              columnCount = nextCount;
            }
            if (windowWidth < 768) actualPostWidth = adjustWidth;

            return parseInt(totalPostBestFit.totalPostBestFit) >= parseInt((index + 1)) ?
              <Card ownerId={wall.Wall.owner} itemData={cardData} key={`card_${index}_${item.id}`} itemIndex={index} adjustWidth={actualPostWidth} personalization={wall.Personalization} ThemeRule={wall.ThemeRule} clickToShowPopUp={clickToShowPopUp} wallID={wall.Wall.id} onClickToCTA={onClickToCTA} />
            : parseInt(totalPostBestFit.totalPostBestFit) == 0 ? <Card ownerId={wall.Wall.owner} itemData={cardData} key={`card_${index}_${item.id}`} itemIndex={index} adjustWidth={actualPostWidth} personalization={wall.Personalization} ThemeRule={wall.ThemeRule} clickToShowPopUp={clickToShowPopUp} wallID={wall.Wall.id} onClickToCTA={onClickToCTA} /> : null
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

export default connect(mapStateToProps, mapDispatchToProps)(ClassicCard)