import { NFTStorage, File } from 'nft.storage'

function blobToFile(blob, fileName) {
    blob.lastModifiedDate = new Date();
    blob.name = fileName;
    return blob
  }

export async function uploadIPFS() {
    
    let canvas = document.querySelector("#nft-image");
    var metadata;

    canvas.toBlob(async function processBlob(blob) {
        console.log(blobToFile(blob, "img"));
        var newImg = document.createElement('img');
        var url = URL.createObjectURL(blob)

        newImg.onload = function() {
            // no longer need to read the blob so it's revoked
            URL.revokeObjectURL(url);
        };

        newImg.src = url;
        newImg.style.visibility = "hidden" 
        document.body.appendChild(newImg);

        console.log("uploading to IPFS...")

        const client = new NFTStorage({ token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweGZkNWJmN0U1MEZCYTBkYzViM0M0MEFhNDYwYmVkNzg4MkU0Yzk4Y2QiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY1NDc4ODQzMzE2OSwibmFtZSI6InllbGxvd191bWJyZWxsYSJ9.lzlxROur0gxA-mIRVGu4kQSdrNKzthaMj2y1tWFJjtE" }) 
        const imageFile = new File([ blob ], 'nft.png', { type: 'image/png' })
        metadata = await client.store({
            name: 'Yellow Umbrella Mandala',
            description: 'An NFT that evolves with your unique bio signature',
            image: imageFile
            })
    });

    setTimeout(() =>  console.log("metadata URL is", metadata.url), 5000) // TODO: remove later

    return metadata
}
