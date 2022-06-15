// let downloadImage = false; // To turn on/off image downloading 
// let inputValueForHash = 'hello world'; // Change this for new hashes - also used in image name
// let hashOutput = keccak256(inputValueForHash).toString('hex');
// // console.log(hashInput,hashInput.length);

export default function sketch(p) {

  const canvasSize = 300;//min(windowWidth,windowHeight)*0.8;
  const hashOutput = "47173285a8d7341e5e972fc677286384f802f8ef42a5ec5f03bbfa254cb01fad".toString('hex')
  let cnv;

  p.setup = () => {
    cnv = p.createCanvas(canvasSize,canvasSize);
    // cnv.parent("canvas")
    cnv.id("nft-image")
  
    // cnv.hide() // This hides it. (equivalent to display:none)
  
  }
  
  p.draw = () => {

    p.background(250);
    
    let numRows = 10;
    let numCols = 10;
    
    let ellipseWidth = 0.8*canvasSize / p.max(numRows,numCols);

    // translate(canvasSize/2,canvasSize/2);
    if(p.frameCount === 1){
      
      for(let rNum=0; rNum < numRows; rNum++){
        for(let cNum=0; cNum < numCols; cNum++){
          
          let colorIndex = (cNum+(rNum*numRows))%hashOutput.length;
          
          let redVal = parseInt(hashOutput.slice(colorIndex,colorIndex+2),16);
          let greenVal = parseInt(hashOutput.slice(colorIndex+2,colorIndex+4),16);
          let blueVal = parseInt(hashOutput.slice(colorIndex+4,colorIndex+6),16);
          let alphaVal = parseInt(hashOutput.slice(colorIndex+6,colorIndex+8),16);
          
          p.noStroke();
          p.fill(redVal,greenVal,blueVal,alphaVal);
          
          let centerX= (cNum+1) * canvasSize/numCols - canvasSize/numCols/2;
          let centerY= (rNum+1) * canvasSize/numRows - canvasSize/numRows/2;
          
          p.ellipse(centerX,centerY,ellipseWidth);
          // console.log(cNum+(rNum*numRows),rNum+cNum,colorIndex,redVal,greenVal,blueVal,alphaVal);
        }
      }
      // if(downloadImage) saveCanvas(cnv, inputValueForHash, 'jpg');
    }
  }
}
