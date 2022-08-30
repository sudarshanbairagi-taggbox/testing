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
      backgroundColor: '#fff'
    }
    return (
      <div className={brandingClass} style={cardSize}
          ref={(el) => {
            if (el) {
              el.style.setProperty('display', 'block', 'important');
              el.style.setProperty('opacity', '1', 'important');
              el.style.setProperty('visibility', 'visible', 'important');
              el.style.setProperty('width', `${adjustWidth}%`, 'important');
              el.style.setProperty('height', 'auto', 'important');
            }
        }}>
          <a className="tb_cc_post_in" href={BrandingLinks} target="_blank" style={brandingCard}
            ref={(el) => {
              if (el) {
                el.style.setProperty('background-image', `url(${brandingCardUrl})`, 'important');
                el.style.setProperty('padding-bottom', '139.7%', 'important');
                el.style.setProperty('background-size', 'contain', 'important');
                el.style.setProperty('background-position', 'center', 'important');
                el.style.setProperty('background-repeat', 'no-repeat', 'important');
                el.style.setProperty('display', 'block', 'important');
                el.style.setProperty('opacity', '1', 'important');
                el.style.setProperty('visibility', 'visible', 'important');
                el.style.setProperty('width', '100%', 'important');
                el.style.setProperty('height', 'auto', 'important');
              }
          }}>
          </a>
      </div>
    );
  }
}
