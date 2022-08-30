import React, { PureComponent } from "react";
import { CloudUrl, BrandingLinks } from "../../../../constants";

function importantCss(el){
  el.style.setProperty('visibility', 'visible', 'important');
  el.style.setProperty('opacity', '1', 'important');
  el.style.setProperty('display', 'flex', 'important');
}
export default class ThemeBranding extends PureComponent {
  render() {
    const {containerSize} = this.props
    return (
        <div ref={(el) => {
          if (el) {
              el.style.setProperty('align-items', 'center', 'important');
              el.style.setProperty('padding', '2px 8px', 'important');
              el.style.setProperty('justify-content', 'end', 'important');
              el.style.setProperty('width', '100%', 'important');
              el.style.setProperty('height', 'auto', 'important');
              importantCss(el)
            }
          }}>
          <a href={BrandingLinks} target={'_blank'}
            ref={(el) => {
              if (el) {
                  el.style.setProperty('background-color', 'rgba(255, 255, 255, 1)', 'important');
                  el.style.setProperty('border-radius', '3px', 'important');
                  el.style.setProperty('align-items', 'center', 'important');
                  el.style.setProperty('display', 'flex', 'important');
                  el.style.setProperty('width', 'auto', 'important');
                  el.style.setProperty('text-decoration', 'none', 'important');
                  importantCss(el)
                  if(containerSize.width < 480){
                    el.style.setProperty('padding', '2px 6px', 'important');
                  }else{
                    el.style.setProperty('padding', '4px 10px', 'important');
                  }
                }
              }}>
            <div ref={(el) => {
              if (el) {
                  el.style.setProperty('color', '#545454', 'important');
                  el.style.setProperty('width', '100%', 'important');
                  el.style.setProperty('height', 'auto', 'important');
                  el.style.setProperty('font-family', 'Inter', 'important');
                  importantCss(el)
                  if(containerSize.width < 480){
                    el.style.setProperty('font-size', '12px', 'important');
                    el.style.setProperty('margin-right', '4px', 'important');
                  }else{
                    el.style.setProperty('font-size', '14px', 'important');
                    el.style.setProperty('margin-right', '6px', 'important');
                  }
                }
              }}>Powered by</div>
            <div ref={(el) => {
                if (el) {
                    el.style.setProperty('background-image', `url(${CloudUrl}/media/images/taggbox.svg)`, 'important');
                    el.style.setProperty('background-size', 'contain', 'important');
                    el.style.setProperty('background-position', 'left center', 'important');
                    el.style.setProperty('background-repeat', 'no-repeat', 'important');
                    importantCss(el)
                    if(containerSize.width < 480){
                      el.style.setProperty('height', '22px', 'important');
                      el.style.setProperty('min-height', '22px', 'important');
                      el.style.setProperty('width', '82px', 'important');
                      el.style.setProperty('min-width', '82px', 'important');
                    }else{
                      el.style.setProperty('height', '26px', 'important');
                      el.style.setProperty('min-height', '26px', 'important');
                      el.style.setProperty('width', '96px', 'important');
                      el.style.setProperty('min-width', '96px', 'important');
                    }
                  }
                }}></div>
            </a>
          </div>
    );
  }
}
