import React from 'react'

import ListItem from '../ListItem/ListItem'

import './ResultsList.css'
import Arrow from '../../assets/arrow.png'
import Doge from '../../assets/Doge.jpg'
import LoadingGif from '../../assets/giphy.gif'

const ResultsList = (props) => {
  if (props.loading) {
    return (
      <div className="results-list-container">
        <img src={LoadingGif} className="loading-gif" />
      </div>
    )
  } else if (props.results.length > 0) {
    return (
      <div className="results-list-container">
        <div className="results-list">
          { props.results.map((item, i) => {
            if (item.results.toUpperCase() !== 'Out of Business'.toUpperCase() && (item.aka_name || item.db_name)) {
              let returnItem = false
              if (props.filter.toUpperCase() === 'All'.toUpperCase()) {
                returnItem = true
              } else if (props.filter.toUpperCase() === 'Pass'.toUpperCase() && item.results.toUpperCase() === 'Pass'.toUpperCase()) {
                returnItem = true
              } else if (props.filter.toUpperCase() === 'Fail'.toUpperCase() && item.results.toUpperCase() === 'Fail'.toUpperCase()) {
                returnItem = true
              }
              if (returnItem) {
                return (
                  <ListItem key={i} restaurant={item} />
                )
              }
            }
          })}
        </div>
      </div>
    )
  } else if (props.searched) {
    return (
      <div className="results-list-container">
        <div className="no-results-found">
          <h2>Wow, such empty...</h2>
          <img src={Doge} />
        </div>
      </div>
    )
  } else {
    return (
      <div className="results-list-container">
        <h2>Kick it off by searching up top!</h2>
        <img className="arrow" src={Arrow} />
      </div>
    )
  }
}

ResultsList.propTypes = {
  results: React.PropTypes.array.isRequired,
  searched: React.PropTypes.bool.isRequired,
  loading: React.PropTypes.bool.isRequired,
  filter: React.PropTypes.string.isRequired
}

export default ResultsList
