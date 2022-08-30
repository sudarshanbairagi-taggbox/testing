import React, { PureComponent } from "react";
import { CloudUrl, BrandingLinks } from "../../../../constants";

export default class BrandingCard extends PureComponent {
  render() {
    const { brandingClass } = this.props;
    const brandingCardUrl = `${CloudUrl}/media/branding-cards/br_card5.svg?var=2`

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
          <a className="tb_wt_post_in" href={BrandingLinks} target="_blank" style={brandingCard}
            ref={(el) => {
              if (el) {
                el.style.setProperty('background-image', `url(${brandingCardUrl})`, 'important');
                el.style.setProperty('padding-bottom', '130%', 'important');
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