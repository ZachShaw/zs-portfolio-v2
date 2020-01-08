import React from 'react'

import Layout from '../components/layout'
import Orbit from '../components/orbit'
import Content from '../components/content'
import Text from '../components/dummytext'

const IndexPage = () => (
  <Layout>
    <Orbit />
    <div id="backlayer" />
    <Content>
      <h1>Zach Shaw</h1>
      <Text />
    </Content>
  </Layout>
)

export default IndexPage
