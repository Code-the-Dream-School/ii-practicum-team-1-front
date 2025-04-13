import { useMemo } from 'react';
import position from '../USCities.js';

export default function useZipCode(zipcode) {
  const coordinates = useMemo(() => {
    if (!zipcode) return null;

    const zipStr = String(zipcode).padStart(5, '0');

    const match = position.find(
      (entry) => String(entry.zip_code).padStart(5, '0') === zipStr
    );

    return match
      ? { lat: match.latitude, lng: match.longitude }
      : null;
  }, [zipcode]);

  return coordinates;
}
