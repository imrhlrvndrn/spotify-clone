class ColorConverter {
    constructor(lighten = 5, darken = 0) {
        this.rgb = {
            values: { r: 0, g: 0, b: 0 },
            text_format: `rgb(0, 0, 0)`,
        };
        this.hsl = {
            values: { h: 0, s: 0, l: 0 },
            text_format: `hsl(0, 0%, 0%)`,
        };
        this.hex = { text_format: '#000000' };
        this.lighten = lighten;
        this.darken = darken;
    }

    convert = ({ hex = null, rgb = null, hsl = null }) => {
        if (hex)
            this.hex = {
                text_format: hex,
            };
        else if (rgb)
            this.rgb = {
                values: { r: rgb.r, g: rgb.g, b: rgb.b },
                text_format: `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`,
            };
        else
            this.hsl = {
                values: { h: hsl.h, s: hsl.s, l: hsl.l },
                text_format: `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`,
            };

        return this;
    };

    hexToRgb = () => {
        let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(this.hex.text_format);
        const rgbValues = {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16),
        };

        if (result)
            this.rgb = {
                values: rgbValues,
                text_format: `rgb(${rgbValues.r}, ${rgbValues.g}, ${rgbValues.b})`,
            };

        return this;
    };

    rgbToHsl = () => {
        let { r, g, b } = this.rgb.values;
        r /= 255;
        g /= 255;
        b /= 255;
        let max = Math.max(r, g, b),
            min = Math.min(r, g, b);
        let h,
            s,
            l = (max + min) / 2;

        if (max == min) {
            h = s = 0; // achromatic
        } else {
            let d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
            switch (max) {
                case r:
                    h = (g - b) / d + (g < b ? 6 : 0);
                    break;
                case g:
                    h = (b - r) / d + 2;
                    break;
                case b:
                    h = (r - g) / d + 4;
                    break;
            }
            h /= 6;
        }

        h = Math.round(360 * h);
        s = s * 100;
        s = Math.round(s);
        l = l * 100;
        l = Math.round(l);

        this.hsl = {
            values: { h, s, l },
            text_format: `hsl(${h}, ${s}%, ${l + this.lighten}%)`,
        };

        return this;
    };
}

export const colorConversion = new ColorConverter();
