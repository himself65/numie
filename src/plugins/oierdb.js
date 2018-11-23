import axios from 'axios'

const oierdbURL = 'http://bytew.net/OIer/search.php'

export async function queryOIerDB (name) {
  if (!name || name === '') {
    return undefined
  }
  try {
    const res = await axios.get(`${oierdbURL}?p=${name}`)
    return res['result']
  } catch (err) {
    console.error(err)
  }
}
