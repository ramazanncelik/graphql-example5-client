import { gql } from '@apollo/client';

export const getEvent = gql`
  query getEvent($id: ID!){
    event(id:$id){
      id
      title
      desc
      date
      user{
        username
        email
      }
      location{
        name
        desc
        lat
        lng
      }
      participants{
        user{
          id
          username
          email
        }
      }
      }
    }
`;

export const subscriptionForEvent = gql`
  subscription getParticipants($eventId: ID){
    participantCreated(event_id: $eventId) {
      id,
      event_id,
      user {
        id
        email
        username
      }
    }
  }
`;