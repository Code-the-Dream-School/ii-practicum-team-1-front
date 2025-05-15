export async function getCoordinatesByZipZippopotam(zip) {
    try {
      const response = await fetch(`https://api.zippopotam.us/us/${zip}`);
      if (!response.ok) throw new Error("ZIP not found");
  
      const data = await response.json();
      console.log("Zippopotam.us raw response data:", data);  
  
      const place = data.places?.[0];
      if (!place) return null;
  
      return {
        lat: parseFloat(place.latitude),
        lng: parseFloat(place.longitude),
        city: place["place name"],
        state_code: place["state abbreviation"],
        province: place.state,
        zip: data["post code"],
      };
    } catch (error) {
      console.error("Zippopotam.us error:", error);
      return null;
    }
  }
  