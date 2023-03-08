import React from 'react'
import { Menu } from 'antd'
import styles from './styles.module.css'
import { Link,useLocation } from 'react-router-dom'

function HeaderMenu() {

    const location = useLocation();

    return (
        <Menu mode='horizontal' selectedKeys={location.pathname} className={styles.headerMenu}>
            <Menu.Item key="/" className={styles.menuItem}>
                <Link to="/">
                    Home
                </Link>
            </Menu.Item>

            <Menu.Item key="/newEvent" className={styles.menuItem}>
                <Link to="/newEvent">
                    New Event
                </Link>
            </Menu.Item>
        </Menu>
    )
}

export default HeaderMenu