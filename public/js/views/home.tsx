import * as React from "react";
import { User } from "../models/user"

interface Props {
  user: User;
}

interface State {
  user: User;
}

export default class HomePageView extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
  }

  render() {
    const { user } = this.props

    return (
      <article className="full four-fifth-1000">
        <h2> new </h2>
      </article>
    );
  }
}
