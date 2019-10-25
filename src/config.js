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
    opacity: (layers) => {
        console.log("Layers@OpacityCall: ", layers);
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