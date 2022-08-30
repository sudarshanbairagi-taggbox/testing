import React, { PureComponent } from "react";
import Card from "./Elements/Card";

export default class WidgetTheme extends PureComponent {
  render() {
    const { postData, completeDataObject, adjustWidth, wall, clickToShowPopUp, onClickToCTA } = this.props;
    return (
      <div className="tb_wt_post_container">
        {
          ((postData && postData.length > 0)) && postData.map((item, index) => {
            const cardData = completeDataObject[item];
            return <Card ownerId={wall.Wall.owner} itemData={cardData} key={index} itemIndex={index} adjustWidth={adjustWidth} personalization={wall.Personalization} ThemeRule={wall.ThemeRule} wallID={wall.Wall.id} clickToShowPopUp={clickToShowPopUp} onClickToCTA={onClickToCTA} />
          })
        }
      </div>
    );
  }
}
