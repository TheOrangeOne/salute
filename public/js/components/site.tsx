iimport * as React from "react"
import * as classNames from "classnames"
import FontIcon from "./fonticon"
import { User } from "../models/user"
import { Transaction, TransactionType } from "../models/transaction"

export interface SiteCardProps {
  user: User;
  transaction: Transaction
}

export default class TransactionCard extends React.Component<TransactionCardProps, {}> {
  render() {
    const { user, transaction } = this.props

    let moneyClass = classNames({
      'good-money': user.id == transaction.to,
      'bad-money': user.id == transaction.from
    })

    let iconClass = classNames({
      'fa-long-arrow-right': user.id == transaction.from,
      'fa-long-arrow-left': user.id == transaction.to
    })

    let labelClass = classNames('label', {
      'warning': transaction.type == TransactionType.LOAN
    })

    let other = user.id == transaction.to ? transaction.from : transaction.to

      return (
          <article className="card">
          <header>
          <h3>
          <span className={moneyClass}>
          {"$" + transaction.amount/100 + " "}
          </span>
          <FontIcon class={iconClass}/>
          {" " + other}
          </h3>
          <span className={labelClass} style={{float: "right"}}>
          {transaction.category}
          </span>
          </header>
          <p>{transaction.description}</p>
          <footer>
          </footer>
          </article>
          )
  }
}
