import { Col, Row } from 'antd'
import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Event from '../../pages/Event'
import Home from '../../pages/Home'
import styles from './styles.module.css'
import HeaderMenu from '../HeaderMenu'
import NewEvent from '../../pages/NewEvent'

function App() {
  return (
    <div className={styles.content}>
      <Row justify={"center"}>
        <Col span={24}>
          <Row>
            <Col span={18}>
              <HeaderMenu />
            </Col>
          </Row>
          <div>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/event/:id' element={<Event />} />
              <Route path='/newEvent' element={<NewEvent />} />
            </Routes>
          </div>
        </Col>
      </Row>
    </div>
  )
}

export default App