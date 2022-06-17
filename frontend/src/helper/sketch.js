import * as p5 from "p5";
import keyPressed from "p5";
import mousePressed from "p5";

export default function sketch(p){

    

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
    var backgroundRGB = '#0f4c5c';
    // var backgroundRGB = '#ffffff';
    var strokeRGB = '#f77f00';
    // var strokeRGB = '#0f4c5c';
    var strokeA = '8f';
    var backgroundFade = decimalToHex(5, 2);
    var particleRadius;
    var particleVelocity;
    var numParticles = 200;
    var edgeRadius = p.width/2;
    let playB = true;
    let noiseScale = 6.3;
    let noiseAmp = 0.5;
    let noiseZoom = 0.02;
    let noiseSeedVal = 3;
    let transAngles = [];    
    let numTransAngles = 6; //round(random(3,9));
    for (let angleCount=0; angleCount<numTransAngles; angleCount++){
      transAngles[angleCount] = p.round(angleCount * p.TWO_PI / numTransAngles,3);
    }
    let reflection = true;
    let rotation = true;
    let dimensional = true;
    let numDimensions = 6;
    var rotationAngle = 0;

    class Particle{
        constructor(s,r,v){
          
          let particleFinder = p5.Vector.random2D().mult(p.random(s));
          this.pos = p.createVector(particleFinder.x,particleFinder.y);
          this.r = r;
          this.vel = p.createVector(0,0);//p5.Vector.random2D().mult(v);
        }
        
        show(){

          for (let transAngle of transAngles) {
            if (rotation) {transAngle += rotationAngle;}
            let px = this.pos.x * p.cos(transAngle) - this.pos.y * p.sin(transAngle);
            let py = this.pos.x * p.sin(transAngle) + this.pos.y * p.cos(transAngle);

            p.ellipse(px,py,this.r*2);
            if (reflection) p.ellipse(py,px,this.r*2);
          }
        }
        move(){
          let noiseVal = p.noise(this.pos.x*noiseZoom,this.pos.y*noiseZoom);
          if (dimensional){
            noiseVal = p.round(noiseVal*numDimensions) / numDimensions;        
          }

          this.velUpdateX = noiseAmp*p.cos(noiseScale * noiseVal);
          this.velUpdateY = noiseAmp*p.sin(noiseScale * noiseVal);
          // this.velUpdate = p.createVector();
          // this.vel.add(this.velUpdate);
          this.pos.add(this.velUpdateX,this.velUpdateY);
        }
        
        edges(edgeRadius){

            if ((this.pos.x*this.pos.x + this.pos.y*this.pos.y)>=(edgeRadius-this.r)*(edgeRadius-this.r)){
              let particleFinder = p5.Vector.random2D().mult(p.random(edgeRadius));
              this.pos.x = particleFinder.x;
              this.pos.y = particleFinder.y;
            }


          // if (this.pos.x > p.width/2) {
          //   this.pos.x =  -p.width/2;
          //   // this.vel.x = -this.vel.x;
          // }
          // if (this.pos.x < -p.width/2) {
          //   this.pos.x =  p.width/2;
          //   // this.vel.x = -this.vel.x;
          // }
          // if (this.pos.y > p.height/2) {
          //   this.pos.y = -p.height/2;
          //   // this.vel.y = -this.vel.y;
          // }
          // if (this.pos.y < -p.height/2) {
          //   this.pos.y =  p.height/2;
          //   // this.vel.y = -this.vel.y;
          // }

          // if ((this.pos.x > p.width/2) || (this.pos.x < -p.width/2) || (this.pos.y > p.height/2) || (this.pos.y < -p.height/2)) {
          //   let particleFinder = p5.Vector.random2D().mult(p.random(edgeRadius));
          //   this.pos.x = particleFinder.x;
          //   this.pos.y = particleFinder.y;
          // }

        }
      }

    p.setup = () => {
        p.noiseSeed(noiseSeedVal);
        canvas = p.createCanvas(500, 500);
        canvas.id("nft-image")
        p.textFont(40);
        // canvas.hide()
        
        p.background(backgroundRGB);
        

        p.stroke(strokeRGB + strokeA);

        p.noStroke();
        
        for(let pnum=0; pnum<numParticles; pnum++) {
            // particleRadius = 3+20*pnum/numParticles;
            particleRadius = 1.5;
            particleVelocity = 2*(1-pnum/numParticles);
            // particleVelocity = numParticles/(pnum+1);
            let particleScale = 300;
            particles[pnum] = new Particle(particleScale,particleRadius, particleVelocity);      
        }
    }

    p.updateWithProps = props => {
        if (props.hash) {
            hashText = props.hash;
        }
    };

    p.draw = () => {
        // p.background('blue');
        
        p.noStroke();
        p.fill(strokeRGB);
        p.textFont('Courier New');
        p.text(hashText + p.height + p.width, 3,13);

        // p.stroke(250,0,0);
        // p.strokeWeight(100);
        p.translate(p.height/2,p.width/2);
        
        // p.point(100*p.sin(7*p.frameCount/100),100*p.sin(7*p.frameCount/100));  
        
        p.background(backgroundRGB+backgroundFade);
        // p.push();
        // p.noFill();
        
        // p.pop();
    
    
        // p.strokeWeight(1);
        // p.noFill();
        // p.noStroke();
    
        for(let pnum=0; pnum<numParticles; pnum++) {
            strokeA = decimalToHex(p.int(50*(1-pnum/numParticles)), 2);
        // strokeA = decimalToHex(int(0*(numParticles/(pnum+1)), 2));
            
            // if(pnum%2==0) var strokeRGB = '#f77f00';
            // else var strokeRGB = '#0f4c5c';

            // let strokeRGB = '#0f4c5c';

            // p.stroke(strokeRGB + strokeA);
            // p.noStroke();
            p.fill(strokeRGB + strokeA);
            // p.point(particles[pnum].pos.x,particles[pnum].pos.y);
            
            particles[pnum].move();
            particles[pnum].edges(p.width/2);
            particles[pnum].show();
        }

        rotationAngle += 0.001;


    }

    
}