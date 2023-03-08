import { gql } from '@apollo/client';

export const getUsers = gql`
    query getUsers{
        users{
            id
            username
        }
    }
`;

export const addParticipant = gql`
    mutation addParticipant($data: CreateParticipant){
        addParticipant(data: $data) {
            id
            user_id
            event_id
        }
    }
`;
