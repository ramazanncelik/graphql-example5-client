import React from 'react'
import styles from './styles.module.css'

function Participant({ participantData }) {
    return (
        <div className={styles.participant}>
            <div style={{ display: 'flex', gap: 5, flex: 1 }}>
                <strong>User Name: </strong>
                {participantData.username}
            </div>

            <div style={{ display: 'flex', gap: 5, flex: 1 }}>
                <strong>E-mail: </strong>
                {participantData.email}
            </div>
        </div>
    )
}

export default Participant