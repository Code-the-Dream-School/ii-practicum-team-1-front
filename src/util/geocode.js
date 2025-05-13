export async function getCoordinatesByZip(zip) {
    const API_KEY = import.meta.env.VITE_ZIPCODEBASE_API_KEY;
    const url = `https://app.zipcodebase.com/api/v1/search?apikey=${API_KEY}&codes=${zip}&country=us`;
  
    console.log("Calling ZIP API:", url);
  
    const res = await fetch(url);
    if (!res.ok) {
      console.error("ZIP API error:", res.status);
      throw new Error("Failed to fetch location data");
    }
  
    const data = await res.json();
    const locationData = data.results[zip]?.[0];
    if (!locationData) {
      throw new Error("No location data found for this ZIP");
    }
  
    return {
      lat: parseFloat(locationData.latitude),
      lng: parseFloat(locationData.longitude),
      city: locationData.city,
      state_code: locationData.state_code,
      province: locationData.province,
      zip: locationData.postal_code,
    };
  }
  