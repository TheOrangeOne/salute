import * as React from "react"
import FontIcon from "../components/fonticon"
import { Link } from "react-router"

import * as className from "classnames"

export default class SideBarView extends React.Component<any, any> {
  render() {
    let itemClass = className(
      "pseudo",
      "button"
    )
    
    return (
      <aside className="full fifth-1000">
        <Link className={itemClass} to="/">
          <FontIcon class="fa-home"/>
          home
        </Link>
        <Link className={itemClass} to="/new">
          <FontIcon class="fa-angle-double-up"/>
          new
        </Link>
        <Link className={itemClass} to="/top">
          <FontIcon class="fa-long-arrow-up"/>
          top
        </Link>
      </aside>
    );
  }
}
