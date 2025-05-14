// const API_KEY_ZIP = import.meta.env.VITE_ZIPCODEBASE_API_KEY;

// export async function getCityStateByZip(zip) {
//   try {
//     const response = await fetch(
//       `https://app.zipcodebase.com/api/v1/search?apikey=${API_KEY_ZIP}&codes=${zip}&country=US`
//     );
//     const data = await response.json();
//     const result = data?.results?.[zip]?.[0];
//     if (!result) return null;
//     return `${result.city}, ${result.state_code}`;
//   } catch (error) {
//     console.error("Failed to get city/state:", error);
//     return null;
//   }
// }
//ZipCodeBase behaves strange, like we're out of credits, so here is a function for  Zippopatamus just in case 

export async function getCityStateByZip(zip) {
  try {
    const response = await fetch(`https://api.zippopotam.us/us/${zip}`);
    if (!response.ok) throw new Error("ZIP not found");

    const data = await response.json();
    const place = data.places?.[0];
    if (!place) return null;

    return `${place["place name"]}, ${place["state abbreviation"]}`;
  } catch (error) {
    console.error("Zippopotam.us error:", error);
    return null;
  }
}
