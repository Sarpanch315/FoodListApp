export default async function handler(req, res) {
  const { id } = req.query; // Restaurant ID from query parameter

  if (!id) {
    return res.status(400).json({ error: "Restaurant ID is required" });
  }

  try {
    // Fetch menu data from Swiggy
    const response = await fetch(
      `https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=26.2124&lng=78.1772&restaurantId=${id}`,
      {
        headers: {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
          Accept: "application/json",
        },
      }
    );

    if (!response.ok) {
      return res.status(500).json({ error: "Failed to fetch menu" });
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (err) {
    console.error("Menu API error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
