import { gql } from '@apollo/client';

const event = gql`
    fragment EventFragment on Event {
        id
        title
        desc
        date
    }
`;

export const getEvents = gql`
    query events{
        events{
            ...EventFragment
        }
    }
    ${event}
`;

export const eventSubscription = gql`
    subscription getUsers {
        eventCreated {
            ...EventFragment
        }
    }
  ${event}
`;