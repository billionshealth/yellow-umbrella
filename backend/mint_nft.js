
const fs = require('fs');
const axios = require('axios')
const { mainModule } = require('process');
require('dotenv').config();
const { Web3Storage, getFilesFromPath } = require('web3.storage');

const token = process.env.WEB3_STORAGE_KEY;
const storage = new Web3Storage({ token });

// TODO: update NFT contract to our one (rather than dapplace one)
const nft_contract = '0x26b19ab85180874E118Cf949bAc3a801cc574B3c'

async function main()  {
    const png = await storage.put(await getFilesFromPath('images/nft.png'))
    console.log('PNG CID:', png)

    console.log('Uploading metadata...')
    const metadata = JSON.stringify({
      name: 'Yellow Umbrella NFT',
      description: 'Artwork that evolves with your unique bio signature',
      image: `https://${png}.ipfs.dweb.link/nft.png`
    })
    fs.writeFileSync('images/metadata.json', metadata)
    const met = await storage.put(await getFilesFromPath('images/metadata.json'))
    console.log('Metadata CID:', met)

    const uri = `https://${met}.ipfs.dweb.link/metadata.json`
    console.log("URI for JSON", uri)

    const url = 'https://api-eu1.tatum.io/v3/nft/mint'
    const headers = {
      'X-Api-Key': process.env.TATUM_KEY,
      'Content-Type': 'application/json'
    }
    const body = {
      url: uri,
      chain: 'MATIC',
      to: nft_contract 
    }

    const res = await axios.post(url, body, { headers })
    console.log(res.data)
}

main()
