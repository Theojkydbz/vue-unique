

const CRYSTAL_SIZE = 150;
const SIDES = 6;

//layout
const MARGIN = CRYSTAL_SIZE / 2
const COLUMNS = 3
const ROWS = 4
const PADDING = CRYSTAL_SIZE * 0.2
const GRIDBOX = CRYSTAL_SIZE + PADDING
const START = CRYSTAL_SIZE / 2 + MARGIN

let PALETTE = [];
ALL_CRYSTALS = []

const layers = []

function setup() {

    const totalX = START + GRIDBOX * COLUMNS
    const totalY = START + GRIDBOX * ROWS

    createCanvas(totalX,totalY,SVG);

    PALETTE = [
        color(104, 199, 250),    //beige
        color(255, 119, 0),       //salmon
    ]
    noLoop();
    angleMode(DEGREES);
    rectMode(CENTER);

}

function draw() { 


    for(let x = 0; x < COLUMNS; x++) {
        for(let y = 0; y < ROWS; y++) {
            const posX = START + (x * GRIDBOX)
            const posY = START + (y * GRIDBOX)
            const crystal = makeCrystal({x: posX, y: posY})
            ALL_CRYSTALS.push(crystal)
            //console.log(crystal)
        } 
    }
    
 
    ALL_CRYSTALS.forEach(crystal =>{
        drawCrystal(crystal)
    })

    // console.log(Circles({test: 'hello'}))

}



//Layer










const state = {
    sides: SIDES,
    stepsOut: 8,
    thinStroke: 1,
    thickStroke: 3
}

const setState = (state) => {
    state.numShapes = state.sides,
    state.angle = 360 / state.numShapes,
    state.singleStep = (CRYSTAL_SIZE / 2) / state.stepsOut,
    state.layerColor = getRandomFromPalette()
    state.weight = randomSelectTwo() ? state.thinStroke : state.thickStroke
    return (state)
}


const TestLines = (state) => {

    return ({
        name: 'Testlines',
        state,
        render: () => {

            noFill();
            stroke(PALETTE[0]);
            push();

                //translate(width/2, height/2);
                ellipse(0, 0, CRYSTAL_SIZE, CRYSTAL_SIZE)
        
                stroke(state.layerColor)
                for(let i = 0; i < state.numShapes; i++){

                    line(0, 0, 0, CRYSTAL_SIZE/2);
                    rotate(state.angle);

                }

            pop();
    
        }
    })
}

const Circles = (state) => {
 
    state.shapeSize = (CRYSTAL_SIZE/ 2) * 0.93
    state.position = (CRYSTAL_SIZE / 2) - (state.shapeSize / 2)

    return ({
        name: 'Circles',
        state,
        render: () => {
            noFill();
            stroke(state.layerColor)
            strokeWeight(1)

            push();
                //translate(width/2, height/2)
                for(let i = 0; i <= state.numShapes; i++){
                    ellipse(state.position,0,state.shapeSize,state.shapeSize)
                    rotate(state.angle);
                }
            pop();
        }
    })
} 

const SimpleLines = (state) => {
    
    state.numSteps = randomSelectTwo() ? state.stepsOut : state.stepsOut * 1.25
    state.step = (CRYSTAL_SIZE / 2) / state.numSteps
    state.start = floor(random(0, state.numSteps))
    state.stop = floor(random(state.start, state.numSteps + 1))
    state.numShapes = randomSelectTwo() ? SIDES : SIDES * 2

    return ({
        name: 'SimpleLines',
        state,
        render: () => {
            noFill();
            stroke(state.layerColor);
            strokeWeight(state.weight);

            push();
                //translate(width/2, height/2);

                for(let i =0;i<state.numShapes; i++){
                    line(state.start * state.step, 0, state.stop * state.step, 0);
                    rotate(state.angle);
                }
            pop();
        }
    })
} 

const OutlineShape = (state) => {

    state.hexagonTrue = randomSelectTwo();

    return ({
        name:'OutlineShape',
        state,
        render: () => {
            stroke(state.layerColor);
            strokeWeight(state.weight);
            push();
                //translate(width/2,height/2);
                if(state.hexagonTrue){
                    hexagon(0,0,CRYSTAL_SIZE / 2);
                } else {
                    ellipse(0,0,CRYSTAL_SIZE,CRYSTAL_SIZE);
                }
            pop();
        }
    })
}

const DottedLines = (state) => {

    state.numShapes = randomSelectTwo() ? SIDES : SIDES * 2
    state.angle = 360 / state.numShapes
    state.shapeSize = 3
    state.centerOffset = state.singleStep
  
    return ({
        name: 'DottedLines',
        state,
        render: () => {
            fill(state.layerColor);
            noStroke();
            push();
                //translate(width/2,height/2);
                for(let i = 0; i <= state.numShapes; i++){
                    for(let x = state.centerOffset; x < CRYSTAL_SIZE / 2;x += state.singleStep){
                        rect(x, 0, state.shapeSize, state.shapeSize);
                    }
                    rotate(state.angle);
                }
            pop();
        }
    })
}

const CenteredShape = (state) => {

    state.randomShape = random(0, 1)
    state.shapeSize = floor(random(state.stepsOut/2, state.stepsOut - 2)) * state.singleStep

    return ({
        name: 'CenteredShape',
        state,
        render: () => {
            fill(state.layerColor);
            noStroke();
            push();
                //translate(width / 2, height / 2)
                if (state.randomShape < 0.1) {

                    rect(0, 0, state.shapeSize * 2, state.shapeSize * 2)

                } else if (state.randomShape >= 0.1 && state.randomShape < 0.6) {

                    ellipse(0, 0, state.shapeSize * 2, state.shapeSize * 2)

                } else if (state.randomShape >= 0.6) {

                    rotate(state.angle / 2) 
                    hexagon(0, 0, state.shapeSize)

                }
            pop();
        }
    })
}

const RingOfShapes = (state) => {                    
    
    state.steps = floor(random(1, state.stepsOut))
    state.center = state.steps * state.singleStep
    state.randomShape = random(1)
    state.direction = randomSelectTwo() // used for triangle only
    state.fillColor = randomSelectTwo() ? state.layerColor : color(0, 1)
    state.weight = randomSelectTwo() ? state.thinStroke : state.thickStroke

    if (state.steps < state.stepsOut / 2) {

        state.radius = floor(random(1, state.steps)) * state.singleStep

    } else if (state.steps > state.stepsOut / 2) {

        state.radius = floor(random(1, state.stepsOut - state.steps)) * state.singleStep

    } else {

        state.radius = floor(random(1, (state.stepsOut / 2) + 1)) * state.singleStep
        
    }

    return ({
        name: 'RingOfShapes',
        state,
        render: () => {
            stroke(state.layerColor)
            fill(state.fillColor)
            strokeWeight(state.weight)
            push()
            //translate(width / 2, height / 2)
            for (let i = 0; i < state.numShapes; i++) {
                if (state.randomShape < 0.33) {
                    
                    ellipse(0, state.center, state.radius, state.radius)
                
                } else if (state.randomShape >= 0.33 && state.randomShape < 0.66) {
                    
                    rect(0, state.center, state.radius, state.radius)
                
                } else if (state.randomShape >= 0.66) {
                    
                    myTriangle(state.center, state.radius, state.direction)
                
                }
                rotate(state.angle)
            }
            pop()
        }
    })
}

const SteppedHexagons = (state) => {                 
    
    state.numSteps = randomSelectTwo() ? state.stepsOut : state.stepsOut * 1.25
    state.centerOffset = (CRYSTAL_SIZE / 2) * 0.15
    state.singleStep = ((CRYSTAL_SIZE / 2) - state.centerOffset) / state.numSteps
    state.weight = randomSelectTwo() ? state.thinStroke : state.thickStroke
    
    return ({
        name: 'SteppedHexagons',
        state,
        render: () => {
            stroke(state.layerColor)
            noFill()
            strokeWeight(state.weight)
            push()
            //translate(width / 2, height / 2)
            rotate(state.angle / 2) 
            for (let i = 1; i < state.numSteps + 1; i++) {
                hexagon(0, 0, state.centerOffset + (i * state.singleStep))
            }
            pop()
        }
    })
}













//HELPER




const hexagon = (posX, posY, radius) => {
    let rotAngle = 360 / 6;
    beginShape();
    for (let i = 0; i < 6; i++) {
      const thisVertex = pointOncircle(posX, posY, radius, i * rotAngle)
      vertex(thisVertex.x, thisVertex.y);
    }
    endShape(CLOSE);
}

const pointOncircle = (posX, posY, radius, angle) => {
    const x = posX + radius * cos(angle)
    const y = posY + radius * sin(angle)
    return createVector(x, y)
}

const randomSelectTwo = () => {

  const rando = random(1)
  if(rando > 0.5){
      return true
  } else {
      return false
  }

}

const getRandomFromPalette = () => {

  const rando2 = floor(random(0, PALETTE.length));
  return PALETTE[rando2];

}






const myTriangle = (center, radius, direction) => {
  if (direction) {
    beginShape();
    vertex(center + radius * cos(0), radius * sin(0));
    vertex(center + radius * cos(120), radius * sin(120));
    vertex(center + radius * cos(240), radius * sin(240));
    endShape(CLOSE); 
  } else {
    beginShape();
    vertex(center + radius * cos(180), radius * sin(180));
    vertex(center + radius * cos(300), radius * sin(300));
    vertex(center + radius * cos(60), radius * sin(60));
    endShape(CLOSE);
  }
}

const layerConstructor = [
  {
    name: 'Outline Shape',
    init: (props) => OutlineShape({
      ...props,
      ...setState(state)
    }),
    weight: 0.3
  },
  {
    name: 'Circles',
    init: (props) => Circles({
      ...props,
      ...setState(state)
    }),
    weight: 0.6
  },
  {
    name: 'SimpleLines',
    init: (props) => SimpleLines({
      ...props,
      ...setState(state)
    }),
    weight: 0.3
  },
  {
    name: 'CenteredShape',
    init: (props) => CenteredShape({
      ...props,
      ...setState(state)
    }),
    weight: 0.4
  }, 
  {
    name: 'DottedLines',
    init: (props) => DottedLines({
      ...props,
      ...setState(state)
    }),
    weight: 0.3
  },
  {
    name: 'SteppedHexagons',
    init: (props) => SteppedHexagons({
      ...props,
      ...setState(state)
    }),
    weight: 0.7
  },
  {
    name: 'RingOfShapes',
    init: (props) => RingOfShapes({
      ...props,
      ...setState(state)
    }),
    weight: 0.3
  },
  {
    name:'Test Lines',
    init: (props) => TestLines({
      ...props,
      ...setState(state)
    }),
    weight: 1
  },
]

const makeCrystal = (pos) => {
  const layers = layerConstructor.map(lcon => {
    let picker = random(1)
    const draw = picker > lcon.weight
        return lcon.init({
          pos: pos,
          draw: draw
        })
  })
  return layers
}

const drawCrystal = (crystal) => {
  crystal.forEach(layer => {
    if (layer.state.draw) {
      push()
        translate(layer.state.pos.x, layer.state.pos.y)
        layer.render()
      p5.pop()
    }
  })
}







//CRYSTAL


class Crystal {
    constructor(posX, posY) {
        this.x = posX
        this.y = posY
        this.layers = []

        layerConstructor.forEach(lcon => {
            let picker = random(1)
            if(picker>lcon.weight) {
                this.layers.push(lcon.init())
            }
        })
    }

    render(){
        push()
            translate(this.x, this.y)
            this.layers.forEach(Layer => {
                Layer.render()
            })
        pop()
    }
}