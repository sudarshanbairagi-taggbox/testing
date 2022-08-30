import React, { PureComponent } from "react";

export default class CTAButton extends PureComponent {
  render() {
    const { cta, ctaClass, postCta, onClickToCTA, item } = this.props;
    const ctaStyle = { color: cta.color, backgroundColor: cta.background }
    return <a className={ctaClass} rel="noreferrer" aria-label="CTA" href={cta.url} target={'_blank'} style={ctaStyle} onClick={onClickToCTA(item)}>{cta.text}</a>
  }
}