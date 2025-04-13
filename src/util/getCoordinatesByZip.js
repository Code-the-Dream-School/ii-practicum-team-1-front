import position from '../components/USCities.js';

export function getCoordinatesByZip(zipcode) {
  // console.log("ZipCode", zipcode);
  const zipStr = String(zipcode).padStart(5, '0');
  const match = position.find(
    (entry) => String(entry.zip_code).padStart(5, '0') === zipStr
  );
  return match ? { lat: match.latitude, lng: match.longitude } : null;
}
