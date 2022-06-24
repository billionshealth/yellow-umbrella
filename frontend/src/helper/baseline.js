//TODO: clean up previous iterations of the code and modulerise hash components

import { rejects } from "assert";
import * as p5 from "p5";
import keyPressed from "p5";
import mousePressed from "p5";

export default function baseline(p){

    

    function decimalToHex(decimal, chars) {
        return (decimal + Math.pow(16, chars)).toString(16).slice(-chars).toUpperCase();
    }

    function keyPressed() {
        if (p.keyCode === 32) {
          p.setup();
          p.draw();
        }
      }
      
      function mousePressed() {
        playB = !playB;
      }

    let canvas;
    let hashText = "hash placeholder";

    let particles = [];
    let transAngles = [];

    var backgroundRGB = '#0f4c5c';
    var backgroundRGB = '#000000';
    // var strokeRGB = '#f77f00';
    var strokeRGB = '#0f4c5c';
    // var strokeA = '8f';
    var backgroundFade = decimalToHex(10, 2);

    var particleRadius;
    var particleVelocity;
    var rotationAngle;
    
    
    // var edgeRadius = p.width/2;
    let playB = true;
    let cnt = 1;

    let noiseScale = 6.3;
    
    let noiseZoom = 0.01;
    let noiseSeedVal = 2;

    var numParticles = 300;
    particleRadius = 1;
        
    let numTransAngles = 6; //round(random(3,9));
    let reflection = true;
    let rotation = true;
    let dimensional = false;
    let numDimensions = 6;
    var rotationMag = 3.14/8;
    var loopPeriod = 600;

    // let noiseAmp = 1;
    let noiseAmp = p.round(600/loopPeriod,2);



    for (let angleCount=0; angleCount<numTransAngles; angleCount++){
      transAngles[angleCount] = p.round(angleCount * p.TWO_PI / numTransAngles,3);
    }
    

    class Particle{
        constructor(s,r,v){
          // let probVal = 100*p.random();
          let particleFinder = p5.Vector.random2D().mult(p.random(s));
          // if (probVal < 10 ){
          //   particleFinder = p5.Vector.random2D().mult(s*0.9);
          // }
          
          // let px = 0;//p.width/2;
          this.initY = particleFinder.y;
          this.initX = particleFinder.x;
          this.pos = p.createVector(this.initX,this.initY);
          this.r = r;
          // this.vel = p.createVector(0,0);//p5.Vector.random2D().mult(v);
          this.moveCount = 0;
          // this.alphasVal = 0;
        }
        
        show(loopFactor){

          for (let transAngle of transAngles) {
            if (rotation) {transAngle += rotationAngle;}
            let px = this.pos.x * p.cos(transAngle) - this.pos.y * p.sin(transAngle);
            let py = this.pos.x * p.sin(transAngle) + this.pos.y * p.cos(transAngle);

            p.ellipse(px,py,this.r*2*loopFactor);
            
            if (reflection) p.ellipse(-px,py,this.r*2*loopFactor);
          }
        }
        move(loopFactor){
          let noiseVal = p.noise(this.pos.x*noiseZoom,this.pos.y*noiseZoom);

          if (dimensional){
            noiseVal = p.round(noiseVal*numDimensions) / numDimensions;        
          }

          // noiseAmp = 1/p.cos(noiseScale * noiseVal);
          

          this.velUpdateX = loopFactor* noiseAmp*p.cos(noiseScale * noiseVal);
          this.velUpdateY = loopFactor* noiseAmp*p.sin(noiseScale * noiseVal);
          // this.velUpdate = p.createVector();
          // this.vel.add(this.velUpdate);
          
          // if (this.moveCount == 200){
          //   this.pos.x = this.initX;
          //   this.pos.y = this.initY;
          //   this.moveCount=0;
          // }
          // this.moveCount++;
          if (p.int(100*loopFactor) == 0){
            this.pos.x = this.initX;
            this.pos.y = this.initY;
          }
          else this.pos.add(this.velUpdateX,this.velUpdateY);
        }
        
        circleEdges(edgeRadius){
          let probVal = 100*p.random();
          if ((probVal < 0)||(this.pos.x*this.pos.x + this.pos.y*this.pos.y)>=(edgeRadius-this.r)*(edgeRadius-this.r)){
              // let particleFinder = p5.Vector.random2D().mult(p.random(edgeRadius));
              // this.pos.x = particleFinder.x;
              // this.pos.y = particleFinder.y;

              this.pos.x = this.initX;
              this.pos.y = this.initY;
          
            }
          }

        wrapEdges(){

          if (this.pos.x > p.width/2) {
            this.pos.x =  -p.width/2;
            // this.vel.x = -this.vel.x;
          }
          if (this.pos.x < -p.width/2) {
            this.pos.x =  p.width/2;
            // this.vel.x = -this.vel.x;
          }
          if (this.pos.y > p.height/2) {
            this.pos.y = -p.height/2;
            // this.vel.y = -this.vel.y;
          }
          if (this.pos.y < -p.height/2) {
            this.pos.y =  p.height/2;
            // this.vel.y = -this.vel.y;
          }
        }


        squareEdges(edgeRadius){

          let probVal = 100*p.random();
          if ((probVal < 0)||(this.pos.x > p.width/2) || (this.pos.x < -p.width/2) || (this.pos.y > p.height/2) || (this.pos.y < -p.height/2)) {
            
            // this.pos.x = p.random(-edgeRadius,edgeRadius);
            // // this.pos.x = edgeRadius;
            // this.pos.y = p.random(-edgeRadius,edgeRadius);
          }
        }
      }

    p.setup = () => {
        p.noiseSeed(noiseSeedVal);
        canvas = p.createCanvas(500, 500);
        canvas.id("nft-image")
        
        // canvas.style('display', 'centre');


        p.textFont(40);
        // canvas.hide()

        p.noStroke();
        p.translate(p.height/2,p.width/2);
        // p.background(backgroundRGB);
        p.fill(backgroundRGB);
        p.ellipse(0,0,p.width);

        // p.stroke(strokeRGB);

        p.noStroke();
        
        for(let pnum=0; pnum<numParticles; pnum++) {
            // particleRadius = 3+20*pnum/numParticles;
            // particleRadius = 1;
            particleVelocity = 2*(1-pnum/numParticles);
            // particleVelocity = numParticles/(pnum+1);
            let particleScale = p.width/2
            ;
            particles[pnum] = new Particle(particleScale,particleRadius, particleVelocity);      
        }
    }

    p.updateWithProps = props => {
        if (props.hash) {
            hashText = props.hash;
        }
    };

    p.draw = () => {

      // if(p.frameCount == cnt*loopPeriod+1) {
      //   playB = !playB;
      //   cnt++
      // }
      // if(p.frameCount == cnt*loopPeriod+1) playB = !playB;
      if(playB){
        // p.background('blue');
        
        // p.noStroke();
        // p.fill(255);
        // p.rect(3,10,100,30);

        // p.fill(0);
        // p.textFont('Courier New');
        // p.text(hashText + p.height + p.width, 3,13);
        // p.text(p.frameCount + " " + p.frameCount%loopPeriod , 3,23);
        // p.text(p.int(p.frameCount/loopPeriod), 3,33);

        // p.stroke(250,0,0);
        // p.strokeWeight(100);
        p.translate(p.height/2,p.width/2);
        
        // p.point(100*p.sin(7*p.frameCount/100),100*p.sin(7*p.frameCount/100));  
        // let backgroundFade = p.int(10 + 5*p.sin(6*p.frameCount/5000));
        // let backgroundFadeVal = decimalToHex(backgroundFade, 2);
        // p.background(backgroundRGB+backgroundFadeVal);

        p.fill(backgroundRGB+backgroundFade);
        if (p.frameCount == loopPeriod) p.fill(backgroundRGB);
        p.ellipse(0,0,p.width);
        // p.rect(-p.width/2,-p.width/2,p.width);

        // let probVal = 100*p.random();
        // if(probVal < 4){p.background(backgroundRGB);}

        // p.push();
        // p.noFill();
        
        // p.pop();
    
    
        // p.strokeWeight(1);
        // p.noFill();
        // p.noStroke();
    
        for(let pnum=0; pnum<numParticles; pnum++) {
            let pnumDelay = pnum/numParticles;
            let loopFactor = -0.5*p.cos(6.28*(p.frameCount/loopPeriod-pnumDelay))+0.5;

            let strokeA = decimalToHex(p.int(255*loopFactor), 2);
        // strokeA = decimalToHex(int(0*(numParticles/(pnum+1)), 2));
            
            // if(pnum%2==0) var strokeRGB = '#f77f00';
            // else var strokeRGB = '#0f4c5c';

            // let strokeRGB = '#0f4c5c';
            strokeRGB = '#'+decimalToHex(p.int(16777000*pnum/numParticles)+1000,6);
            
            // if(pnum%10==2) strokeRGB = '#41ead4';
            // if(pnum%10==1) strokeRGB = '#ff206e';
            // if(pnum%5==1) strokeRGB = '#8338ec';
            // if(pnum%3==0) strokeRGB = '#fbff12';

            // p.stroke(strokeRGB + strokeA);
            // p.noStroke();
            p.fill(strokeRGB + strokeA);
            // p.point(particles[pnum].pos.x,particles[pnum].pos.y);
            

            
            particles[pnum].circleEdges(p.width/2);
            // particles[pnum].move(loopFactor);
            // particles[pnum].circleEdges(p.width/2);
            particles[pnum].show(p.round(loopFactor,2));
            
            // p.fill(0);
            // p.rect(100,(pnum-1)*20,100,30);
            // p.fill(strokeRGB);
            // p.text(p.round(loopFactor,2)+' '+strokeRGB+strokeA, 100,pnum*20);
            
        }

        let loopFactor = p.cos(6.28*(p.frameCount/loopPeriod));
        // if (p.int(100*loopFactor)==1) playB=false;

        rotationAngle = rotationMag * loopFactor;

      }

    }

        
}