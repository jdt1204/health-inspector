import React from 'react'
import moment from 'moment'

import GreenBadge from '../../assets/GreenBadge.png'
import RedBadge from '../../assets/RedBadge.png'
import YellowBadge from '../../assets/YellowBadge.png'

import './ListItem.css'
import NumbersLookup from '../../config/violationsLookup'

class ListItem extends React.Component {
  constructor() {
    super()

    this.state = {
      showMore: false
    }
  }

  generateMore = () => {
    if (this.props.restaurant.violations) {
      const violations = this.props.restaurant.violations.split(' | ')
      const formattedViolations = violations.map((violation) => {
        const endOfNum = violation.indexOf('.')
        const num = violation.substring(0, endOfNum)
        const beginComments = violation.indexOf('Comments: ')
        let comments = violation.substring(beginComments).toLowerCase()
        comments = `${comments.substring(0, 1).toUpperCase()}${comments.substring(1)}`
        return {
          number: num,
          comments
        }
      })
      return (
        <div className="result-list-item-more">
          <h3>Violations</h3>
          {formattedViolations.map((violation, i) => (
            <div key={i} className="result-list-item-more-violation-container">
              <h4>{NumbersLookup[violation.number]}</h4>
              <p>{violation.comments}</p>
            </div>
          ))}
        </div>
      )
    } else {
      return (
        <h3>No recorded violations!</h3>
      )
    }
  }

  toggleShowMore(e, showMore) {
    e.preventDefault()
    this.setState({ showMore })
  }

  render() {
    let badge
    if (this.props.restaurant.results === 'Fail') {
      badge = RedBadge
    } else if (this.props.restaurant.results === 'Pass') {
      badge = GreenBadge
    } else {
      badge = YellowBadge
    }

    let name = this.props.restaurant.aka_name
      ? this.props.restaurant.aka_name
      : this.props.restaurant.db_name

    name = name.toLowerCase()
    name = `${name.substring(0, 1).toUpperCase()}${name.substring(1)}`
    const date = moment(this.props.restaurant.inspection_date)
    const containerClasses = this.state.showMore
      ? 'result-list-item-container result-list-item-container-large'
      : 'result-list-item-container'

    const iconClass = this.state.showMore
      ? 'result-list-item-more-icon rotated'
      : 'result-list-item-more-icon'

    return (
      <div className={containerClasses} onClick={(e) => this.toggleShowMore(e, !this.state.showMore)}>
        <div className="result-list-item">
          <div className="result-list-item-description">
            <h2>{name}</h2>
            <p>{this.props.restaurant.address}</p>
            <p className="result-list-item-last-updated">Last Updated: {date.format('MMM D YYYY')}</p>
          </div>
          <div className="result-list-item-badge">
            <img src={badge}
              alt={this.props.restaurant.results}
              title={this.props.restaurant.results} />
          </div>
          <div className={iconClass}>
            <i className="fa fa-angle-down" />
          </div>
        </div>
        { this.state.showMore && this.generateMore() }
      </div>
    )
  }
}

ListItem.propTypes = {
  restaurant: React.PropTypes.object.isRequired
}

export default ListItem
