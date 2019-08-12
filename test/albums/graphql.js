const { gql } = require('apollo-server');

const getAlbum = id => gql`
    query {
        album(id: ${id}) {
          id,
          title,
          photos {
            albumId
            id
            title
            url
            thumbnailUrl
          }
        }
      }`;

const getAlbums = () => gql`
  query {
    albums {
      id
      title
      photos {
        albumId
        id
        title
        url
        thumbnailUrl
      }
    }
  }
`;

const buyAlbum = id => ({
  mutation: gql`
    mutation{
      buyAlbum (albumId: ${id}){
        title
        photos {
          title
        }
      }
    }`
});

module.exports = { getAlbum, getAlbums, buyAlbum };
