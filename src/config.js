// Config model
let data =  {
    selectedLayers: [],
    layout: {
        rows: 0,
        columns: 0
    },
    options: {
        random: {
            opacity: false,
            size: false,
            rotation: false,
            flip: false
        }
    },
}

const methods = {
    execute: function (data, document) {
        // Determine wich options function has to be called
        if (data.options.random.opacity) {
            this.opacity(document.selectedLayers);
        }
        if (data.options.random.size) {
            this.size(document.selectedLayers);
        }
        if (data.options.random.rotation) {
            this.rotation(document.selectedLayers);
        }
        if (data.options.random.flip) {
            this.flip(document.selectedLayers);
        }

        if(data.layout.columns || data.layout.rows) {
            this.generateGrid(document, data.layout);
        }
    },
    generateGrid: (document, layout) => {
        // Sketch API Requirements
        var Rectangle = require('sketch/dom').Rectangle
        const page = document.selectedPage;

        let artboardWidth, artboardHeight;

        let layer = document.selectedLayers.layers[0];
        let layerID = layer.id;
        let ArtboardFound = false;
        if(layer.type == "Artboard") {
            console.log("✅ Artboard found");
        } else {
            while (!ArtboardFound) {
                let parent = document.getLayerWithID(layerID).parent;
                if(parent.type == "Artboard") {
                    artboardWidth = parent.frame.width;
                    artboardHeight = parent.frame.height;

                    ArtboardFound = true;
                    console.log("✅ Artboard found deep");
                } else {
                    layerID = parent.id;
                }
            }
        }
        
        

        let grid = {
            layout: {
                width: artboardWidth,
                height: artboardHeight,
                columnWidth: artboardWidth / layout.columns,
                rowHeight:   artboardHeight / layout.rows,
            },
            cells: []
        }

        let counter = layout.columns * layout.rows;
        for (let cell = 0;  cell < counter; cell++) {
            let x = cell % layout.columns;
            let y = cell / layout.rows;


            grid.cells.push({
                name: "Cell",
                cell: cell,
                position: {
                    x: x * grid.layout.columnWidth,
                    y: (Math.floor(y)) * grid.layout.rowHeight
                }
            })
        }

        console.log("Grid Properties:", grid.cells);

        // DRAW RECTS for measurement

        for (let cell = 0; cell < grid.cells.length; cell++) {
            document.selectedLayers.layers[cell].frame.x = grid.cells[cell].position.x
            document.selectedLayers.layers[cell].frame.y = grid.cells[cell].position.y
        }

        console.log("done alla");

        



        // ITERATE OVER LAYERS AND GIVE NEW POSITIONS
        
        
        

    },
    opacity: (selectedLayers) => {
        for (let layer of selectedLayers.layers) {
            // generates a value between 0.7 and 1.0 for each layer
            let randomOpacity = (Math.floor(Math.random() * 30) + 70) / 100;
            layer.style.opacity = randomOpacity;
        }
    },
    size: (selectedLayers) => {
        for(let layer of selectedLayers.layers) {
            // generates a value between 70% and 130% of the layer scaling
            let randomSize = (Math.floor(Math.random() * 60) - 30) / 100;
            layer.frame.width = (layer.frame.width) * (1 - randomSize);
            layer.frame.height = (layer.frame.height) * (1 - randomSize);
        }
    },
    rotation: (selectedLayers) => {
        for (let layer of selectedLayers.layers) {
            // generates a value between -30° and 30° of the layer rotation
            let randomRotation = (Math.floor(Math.random() * 60) - 30);
            layer.transform.rotation = randomRotation;
        }
    },
    flip: (selectedLayers) => {
        for (let layer of selectedLayers.layers) {
            // generates a boolean, if the layer should be flipped or not
            var randomFlipVertically = Math.random() >= 0.5;
            var randomFlipHorizontally = Math.random() >= 0.5;
            layer.transform.flippedVertically   = randomFlipVertically;
            layer.transform.flippedHorizontally = randomFlipHorizontally;
        }        
    }
}

export default { data, methods }