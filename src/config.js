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
        let gridLayout;
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


        console.log("Artboard Width: " + artboardWidth);
        console.log("Artboard Height: " + artboardHeight);

        





        // for(let page of document.pages) {
        //     if(page.selected) {
        //         console.log("✅ Found Current Page");
        //         for(let artboard of page.layers) {
        //             if(artboard.selected) {
        //                 artboardWidth = artboard.frame.width;
        //                 artboardHeight = artboard.frame.height;

        //                 console.log("✅ Found Current Artboard");


        //             }
        //         }
        //     }
        // }
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