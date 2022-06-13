import { NFTStorage, File } from 'nft.storage'

export async function uploadIPFS() {
    
    let canvas = document.querySelector("#nft-image");

    const blob = await new Promise((callback) => canvas.toBlob(callback))
    const client = new NFTStorage({ token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweGZkNWJmN0U1MEZCYTBkYzViM0M0MEFhNDYwYmVkNzg4MkU0Yzk4Y2QiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY1NDc4ODQzMzE2OSwibmFtZSI6InllbGxvd191bWJyZWxsYSJ9.lzlxROur0gxA-mIRVGu4kQSdrNKzthaMj2y1tWFJjtE" }) 
    const imageFile = new File([ blob ], 'nft.png', { type: 'image/png' })
    const metadata = await client.store({
        name: 'Yellow Umbrella Mandala',
        description: 'An NFT that evolves with your unique bio signature',
        image: imageFile
        })
        
    return metadata
}
