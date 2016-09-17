import * as React from "react"

export interface FontIconProps {
  class: string;
}

export default class FontIcon extends React.Component<FontIconProps, {}> {
  render() {
    let style = {
      marginLeft: 5,
      marginRight: 5
    }

    return (
      <i className={"fa " + this.props.class}
        aria-hidden="true"
        style={style}/>
    );
  }
}
