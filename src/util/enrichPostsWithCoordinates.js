import { getCoordinatesByZip } from './getCoordinatesByZip';

export function enrichPostsWithCoordinates(posts) {
  return posts
    .map((post) => {
      console.log("Single post in enrichPostsWithCoordinates", post);
      const coords = getCoordinatesByZip(post.location);
      if (!coords) return null;
      return {
        ...post,
        position: coords,
      };
    })
    .filter(Boolean);
}
