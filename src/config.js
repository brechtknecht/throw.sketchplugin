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
    execute: function (data, selectedLayers) {
        // Determine wich options function has to be called
        if (data.options.random.opacity) {
            this.opacity(selectedLayers);
        }
        if (data.options.random.size) {
            this.size(selectedLayers);
        }
        if (data.options.random.rotation) {
            this.rotation(selectedLayers);
        }
        if (data.options.random.flip) {
            this.flip(selectedLayers);
        }
    },
    opacity: (selectedLayers) => {
        for (let layer of selectedLayers.layers) {
            // generates a value between 0.7 and 1.0 for each layer
            let randomOpacity = (Math.floor(Math.random() * 30) + 70) / 100;

            layer.style.opacity = randomOpacity;
        }
    },
    size: (layers) => {
        console.log("Layers@SizeCall: ", layers);
    },
    rotation: (layers) => {
        console.log("Layers@RotationCall: ", layers);
    },
    flip: (layers) => {
        console.log("Layers@FlipCall: ", layers);
    }
}

export default { data, methods }