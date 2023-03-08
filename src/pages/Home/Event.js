import React from 'react'
import styles from './styles.module.css'
import { Link } from 'react-router-dom'

function Event({ eventData }) {
    return (
        <Link to={`event/${eventData.id}`} className={styles.event}>
            <div className={styles.eventHeader}>
                <div className={styles.eventTitle}>
                    {eventData.title}
                </div>
                <div className={styles.eventDate}>
                    {eventData.date}
                </div>
            </div>
            <div className={styles.eventDescription}>
                {eventData.desc}
            </div>
        </Link>
    )
}

export default Event