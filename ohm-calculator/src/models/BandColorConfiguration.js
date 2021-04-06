class BandColorConfiguration {
    constructor(name, colors, position) {
        if (!colors.length) {
            throw new Error('There should be at least one color');
        }

        this.name = name;
        this.colors = colors;
        this.selectedColor = this.colors[0];
        this.position = position;
    }
}

export default BandColorConfiguration;