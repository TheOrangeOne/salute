import * as React from "react";
import { User } from "../models/user"

interface Props {
  user: User;
  sites: any;
}

interface State {
  user: User;
  sites: any;
}

export default class HomePageView extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
  }

  render() {
    const { user, sites } = this.props

    return (
      <article className="full four-fifth-1000">
        <h2> new </h2>
        {sites.sort((x: any, y: any) => x.flips < y.flips).map((x: any, i: Number) => 
          <p key={i}>
          <b> {x.flips}: </b> {x.url}
          </p>)}
      </article>
    );
  }
}
