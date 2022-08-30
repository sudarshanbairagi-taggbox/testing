import React, { PureComponent } from "react";
import { CloudUrl, BrandingLinks } from "../../../../constants";

function importantCss(el){
  el.style.setProperty('visibility', 'visible', 'important');
  el.style.setProperty('opacity', '1', 'important');
  el.style.setProperty('display', 'flex', 'important');
}
export default class PopUpBranding extends PureComponent {
  render() {

    return (
          <a href={BrandingLinks} target={'_blank'}
            ref={(el) => {
              if (el) {
                  el.style.setProperty('position', 'absolute', 'important');
                  el.style.setProperty('left', 'auto', 'important');
                  el.style.setProperty('right', '0', 'important');
                  el.style.setProperty('bottom', '-35px', 'important');
                  el.style.setProperty('align-items', 'center', 'important');
                  el.style.setProperty('padding', '4px 0', 'important');
                  el.style.setProperty('display', 'flex', 'important');
                  el.style.setProperty('width', 'auto', 'important');
                  el.style.setProperty('text-decoration', 'none', 'important');
                  importantCss(el)
                }
              }}>
            <div ref={(el) => {
              if (el) {
                  el.style.setProperty('font-size', '14px', 'important');
                  el.style.setProperty('color', '#fff', 'important');
                  el.style.setProperty('margin-right', '6px', 'important');
                  el.style.setProperty('width', '100%', 'important');
                  el.style.setProperty('height', 'auto', 'important');
                  el.style.setProperty('font-family', 'Inter', 'important');
                  importantCss(el)
                }
              }}>Powered by</div>
            <div ref={(el) => {
                if (el) {
                    el.style.setProperty('background-image', `url(${CloudUrl}/media/images/taggbox_logo-light.svg)`, 'important');
                    el.style.setProperty('background-size', 'contain', 'important');
                    el.style.setProperty('background-position', 'left center', 'important');
                    el.style.setProperty('background-repeat', 'no-repeat', 'important');
                    el.style.setProperty('height', '26px', 'important');
                    el.style.setProperty('min-height', '26px', 'important');
                    el.style.setProperty('width', '96px', 'important');
                    el.style.setProperty('min-width', '96px', 'important');
                    importantCss(el)
                  }
                }}></div>
            </a>
    );
  }
}
