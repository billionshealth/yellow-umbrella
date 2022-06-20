export default function sketch(p){
    let canvas;
    let hashText = "hash placeholder";

    p.setup = () => {
        canvas = p.createCanvas(300, 200);
        canvas.id("nft-image")
        // canvas.parent("nft-image-container")
        p.textFont(40);
        // canvas.hide()
        p.noStroke();
    }

    p.updateWithProps = props => {
        if (props.hash) {
            hashText = props.hash;
        }
    };

    p.draw = () => {
        p.background('orangered');
        p.text(hashText, 200*0.5,80)        
    }
}