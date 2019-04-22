var axios = require('axios')

axios.get('/api/data/coinlist')
  .then(({ data }) => {
    console.log(data.Data.ETH)
  }).catch(err => console.log(err))

