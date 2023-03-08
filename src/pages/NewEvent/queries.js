import { gql } from '@apollo/client';

export const getUsers = gql`
    query getUsers{
        users{
            id
            username
        }
    }
`;

export const getLocations = gql`
    query getLocations{
        locations {
            id
            name
        }
    }
`;

export const addEvent = gql`
    mutation addEvent($data: CreatedEventInput!){
        createdEvent(data: $data) {
            id
            title
        }
    }
`;