import { gql } from '@apollo/client';

export const GET_ME = gql`
{
    me {
        _id
        username
        email
        bookCount
        savedBooks {
            authors
            description
            bookId
            image
            link
            title
        }
    }
}
`;

export const QUERY_ME_BASIC = gql`
{
    me {
        _id
        username
        email
        bookCount
        savedBooks {
            title
            description
        }
    }
}
`;

export const QUERY_USER = gql`
query user($username: String!) {
    user(username: $username) {
        _id
        username
        email
        bookCount
        savedBooks {
            bookId
            title
            description
        }
    }
}
`;