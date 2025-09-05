export default async function handler(req, res) {
  try {
    const response = await fetch(
      "https://www.swiggy.com/dapi/restaurants/list/v5?lat=26.2124&lng=78.1772&page_type=DESKTOP_WEB_LISTING",
      {
        headers: {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
          Accept: "application/json",
        },
      }
    );

    if (!response.ok) {
      return res.status(500).json({ error: "Failed to fetch restaurants" });
    }

    const data = await response.json();
    console.log(data);
    res.status(200).json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
