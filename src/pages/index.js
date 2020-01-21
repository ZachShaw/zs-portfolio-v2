import React, { useState, useEffect } from 'react'

import Layout from '../components/layout'
import Orbit from '../components/orbit'
import Content from '../components/content'
import Text from '../components/dummytext'

import { getOpacity } from '../util/opacity'

const IndexPage = () => {
  const [scrollY, setScrollY] = useState(0)
  const [opacity, setOpacity] = useState(0)

  const setScroll = () => {
    setScrollY(window.pageYOffset)
    setOpacity(getOpacity({ scrollY }))
  }

  useEffect(() => {
    const watchScroll = () => {
      window.addEventListener('scroll', setScroll)
    }
    watchScroll()
    return () => {
      window.removeEventListener('scroll', setScroll)
    }
  })

  return (
    <Layout>
      <Orbit />
      <div id="opacitylayer" style={{ opacity }} />
      <Content>
        <h1>Zach Shaw</h1>
        <Text />
      </Content>
    </Layout>
  )
}

export default IndexPage
