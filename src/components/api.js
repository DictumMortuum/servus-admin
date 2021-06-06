import MD5 from "crypto-js/md5";

//const endpoint = "http://localhost:1234"
const endpoint = "https://servus.dictummortuum.com"

const bggGetParser = ({
  id,
  image,
  published: {
    ratings: {
      average: {
        value : average
      },
      bayes: {
        value: bayes
      },
      ranks: {
        ranks
      }
    }
  },
  thumb
}) => ({
  id,
  image,
  thumb,
  average,
  bayes,
  ranks
})

const atlasSearchParser = ({
  bgg_id : id,
  thumb_url : thumb,
  name,
  year_published : published
}) => ({
  id,
  name,
  thumb,
  published
})

const bggSearchParser = ({
  id,
  name : {
    value : name
  },
  published : {
    value : published
  }
}) => ({
  id,
  name,
  thumb: "null",
  published
})

function bggGet(id) {
  return fetch(endpoint + "/boardgames/get/" + MD5(id + "").toString(), {
    method: 'post',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      id
    })
  })
  .then(res => res.json())
  .then(res => res.response.items[0])
  .then(bggGetParser)
}

async function getBggInfo(record) {
  const obj = await bggGet(record.id)
  return {...record, ...obj}
}

function bggSearch(term) {
  return fetch(endpoint + "/boardgames/bggsearch/" + MD5(term).toString(), {
    method: 'post',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      term
    })
  }).then(res => res.json())
  .then(res => res.response.items.map(bggSearchParser))
  .then(res => res.map(getBggInfo))
  .then(res => Promise.all(res))
  .then(res => {console.log(res); return res})
}

function atlasSearch(term) {
  return fetch(endpoint + "/boardgames/search/" + MD5(term).toString(), {
    method: 'post',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      term
    })
  })
  .then(res => res.json())
  .then(res => res.response.games.map(atlasSearchParser))
  .then(res => {console.log(res); return res})
}

function mapScrapedDataToSearch(data, search) {
  return fetch(endpoint + "/scrape/data", {
    method: 'post',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      id: parseInt(data.id),
      boardgame_id: parseInt(search.id)
    })
  })
  .then(res => res.json())
}

export {
  bggGet,
  bggSearch,
  atlasSearch,
  mapScrapedDataToSearch
}
