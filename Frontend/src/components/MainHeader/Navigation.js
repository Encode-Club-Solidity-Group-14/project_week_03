import React from 'react'

import classes from './Navigation.module.css'

const Navigation = (props) => {
  return (
    <nav className={classes.nav}>
      <ul>
        <li>
          <a href="/create">Create NFT</a>
        </li>

        <li>
          <a href="/list">List NFT</a>
        </li>
      </ul>
    </nav>
  )
}

export default Navigation
