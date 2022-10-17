import React from 'react'
import {
  Genealogy,
} from '../components'

const Home = () => {
  return (
    <div class='body genealogy-body genealogy-scroll'>
      <div class='genealogy-tree'>
        <Genealogy />
      </div>
    </div>
  )
}

export default Home
