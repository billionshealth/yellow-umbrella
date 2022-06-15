let downloadImage = false; // To turn on/off image downloading 
let inputValueForHash = 'hello world'; // Change this for new hashes - also used in image name
let hashOutput = keccak256(inputValueForHash).toString('hex');
// console.log(hashInput,hashInput.length);

function setup(){
  canvasSize = 300;//min(windowWidth,windowHeight)*0.8;
  cnv = createCanvas(canvasSize,canvasSize);
  cnv.parent("canvas")
  cnv.id("nft-image")

  cnv.hide() // This hides it. (equivalent to display:none)

  background(250);
  
  numRows = 10;
  numCols = 10;
  
  ellipseWidth = 0.8*canvasSize / max(numRows,numCols);
}

function draw(){
  // translate(canvasSize/2,canvasSize/2);
  if(frameCount == 1){
    
    for(let rNum=0; rNum < numRows; rNum++){
      for(let cNum=0; cNum < numCols; cNum++){
        
        colorIndex = (cNum+(rNum*numRows))%hashOutput.length;
        
        redVal = parseInt(hashOutput.slice(colorIndex,colorIndex+2),16);
        greenVal = parseInt(hashOutput.slice(colorIndex+2,colorIndex+4),16);
        blueVal = parseInt(hashOutput.slice(colorIndex+4,colorIndex+6),16);
        alphaVal = parseInt(hashOutput.slice(colorIndex+6,colorIndex+8),16);
        
        noStroke();
        fill(redVal,greenVal,blueVal,alphaVal);
        
        centerX= (cNum+1) * canvasSize/numCols - canvasSize/numCols/2;
        centerY= (rNum+1) * canvasSize/numRows - canvasSize/numRows/2;
        
        ellipse(centerX,centerY,ellipseWidth);
        // console.log(cNum+(rNum*numRows),rNum+cNum,colorIndex,redVal,greenVal,blueVal,alphaVal);
      }
    }
    // if(downloadImage) saveCanvas(cnv, inputValueForHash, 'jpg');
  }
}