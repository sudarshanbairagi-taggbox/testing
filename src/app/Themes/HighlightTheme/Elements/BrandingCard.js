import React, { PureComponent } from "react";
import { CloudUrl, BrandingLinks } from "../../../../constants";

export default class BrandingCard extends PureComponent {
  render() {
    const { adjustWidth, brandingClass, personalization } = this.props;
    const cardSize = {
      width: `${adjustWidth}%`, padding: personalization.padding / 2
    };
    const brandingCardUrl = `${CloudUrl}/media/branding-cards/br_card2.svg`

    const brandingCard = {
      backgroundImage: `url('${brandingCardUrl}')`,
      paddingBottom: '160%',
      backgroundSize: 'contain',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      boxShadow: '0 0 1.5px rgb(0 0 0 / 20%)'
    }
    return (
      <div style={cardSize} className={brandingClass}>
        <a href={BrandingLinks} target="_blank">
          <div style={brandingCard}> </div>
        </a>
      </div>
    );
  }
}
