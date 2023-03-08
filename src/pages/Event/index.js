import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import styles from './styles.module.css'
import { getEvent, subscriptionForEvent } from './queries';
import Loading from '../../components/Loading';
import Participant from './Participant';
import NewParticipant from '../../components/NewParticipants';
import { Divider } from 'antd';

function Event() {

  const { id } = useParams();

  const { loading, error, data, subscribeToMore } = useQuery(getEvent,
    {
      variables: {
        id
      }
    }
  );

  useEffect(() => {

    subscribeToMore({
      document: subscriptionForEvent,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;

        const newParticipant = subscriptionData.data.participantCreated;
        return {
          event: {
            ...prev.event,
            participants: [...prev.event.participants, newParticipant],
          },
        };
      }
    });

  }, [subscribeToMore])


  if (loading) {
    return <Loading />
  }

  if (error) {
    return <div>{error}</div>
  }

  const { event } = data;

  return (
    <div className={styles.content}>
      <div className={styles.eventHeader}>
        <div className={styles.eventTitle}>
          {event.title}
        </div>

        <div className={styles.eventDate}>
          {event.date}
        </div>
      </div>

      <div className={styles.eventDescription}>
        {event.desc}
      </div>

      <strong>Event Owner</strong>
      <div className={styles.eventOwner}>
        <div style={{ display: 'flex', gap: 5, flex: 1 }}>
          <strong>User Name: </strong>
          {event.user.username}
        </div>

        <div style={{ display: 'flex', gap: 5, flex: 1 }}>
          <strong>E-mail: </strong>
          {event.user.email}
        </div>
      </div>

      <div className={styles.eventLocation}>
        <strong>Event Location:</strong>
        {event.location.name}
      </div>

      <Divider>Add Participant</Divider>
      <NewParticipant event_id={id} />

      <div style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 10, marginBottom: 10 }}>
        <strong>
          Participants
        </strong>
      </div>
      <div style={{ display: 'grid', gap: 10 }}>
        {event.participants.length !== 0 ?
          event.participants.map(participant => {
            return (
              <Participant key={participant.user.username} participantData={participant.user} />
            )
          }) :
          <div className={styles.participantsListError}>
            No participant found
          </div>
        }
      </div>
    </div>
  )
}

export default Event