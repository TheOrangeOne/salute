import * as React from "react"
import FontIcon from "../components/fonticon"
import { Link } from "react-router"

export default class HeaderView extends React.Component<any, any> {
  render() {
    const { user } = this.props;

    let isNotLoggedIn = user.id == 0

    let profile = isNotLoggedIn ?
      <Link className="pseudo button" to="/profile">
        <span className="displayName">test user</span>
      </Link> :
      <Link className="pseudo button" to="/profile">
        <span className="displayName">{user.displayName}</span>
      </Link>


    let login = isNotLoggedIn ?
      <a className="pseudo button" href="/login/facebook">
        <FontIcon class="fa-facebook-official"/><span>log in</span>
      </a> :
      <a className="pseudo button" href="/logout">
        <span>log out</span>
      </a>

    return (
      <nav className="header">
        <Link className="brand" to="/">
          <span className="app-name">salute</span>
        </Link>
        <input id="bmenu" type="checkbox" className="show"/>
        <label htmlFor="bmenu" className="burger toggle pseudo button">
          <FontIcon class="fa-bars"/>
        </label>
        <div className="menu">
          <Link className="pseudo button" to="/about">
            <span>about</span>
          </Link>
          {profile}
          {login}
        </div>
      </nav>
    );
  }
}
