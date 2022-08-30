import React, { PureComponent } from "react";
import { CloudUrl, BrandingLinks } from "../../../../constants";

export default class BrandingCard extends PureComponent {
  render() {
    const { brandingClass, personalization } = this.props;

    const brandingCardUrl = `${CloudUrl}/media/branding-cards/br_card5.svg?v=1`

    const brandingCard = {
      backgroundColor: '#fff'
    }
    return (
      <div className={brandingClass}
          ref={(el) => {
            if (el) {
              el.style.setProperty('display', 'block', 'important');
              el.style.setProperty('opacity', '1', 'important');
              el.style.setProperty('visibility', 'visible', 'important');
              el.style.setProperty('width', '100%', 'important');
              el.style.setProperty('height', 'auto', 'important');
            }
          }}>
          <a className="tb_stt_card_wrapper" href={BrandingLinks} target="_blank"
            ref={(el) => {
              if (el) {
                el.style.setProperty('background-image', `url(${brandingCardUrl})`, 'important');
                el.style.setProperty('padding-bottom', '200%', 'important');
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
