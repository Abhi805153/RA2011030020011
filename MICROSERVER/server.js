const express = require("express")
const app = express()
const port = 8008

const fetchJsonData = async (url, timeout) => {
  return Promise.race([
    fetch(url),
    new Promise((resolve) => setTimeout(() => resolve(null), timeout)),
  ]).then((response) => {
    if (!response) {
      console.error(`Timeout for ${url}`)
      return null
    }
    if (!response.ok) {
      console.error(`Failed to fetch data from ${url}`)
      return null
    }
    return response.json().numbers
  })
}

app.get("/numbers", async (req, res) => {
  const urls = req.query.url
  try {
    const jsonDataArray = await Promise.all(urls.map((url) => fetchJsonData(url, 500)))

    const validDataArray = jsonDataArray.filter((data) => data !== null)

    const mergedData = [].concat(...validDataArray)

    const uniqueData = Array.from(new Set(mergedData))

    uniqueData.sort()

    res.json(uniqueData)
  } catch (error) {
    console.error("Error fetching JSON data:", error)
    res
      .status(500)
      .json({ error: "An error occurred while fetching, processing, or sorting data." })
  }
})

app.listen(port, () => {
  console.log(`app listening on port ${port}`)
})
