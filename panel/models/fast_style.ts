import { HTMLBox, HTMLBoxView } from "@bokehjs/models/layouts/html_box"

import * as p from "@bokehjs/core/properties"

const win=<any>window;

export class FastStyleView extends HTMLBoxView {
    model: FastStyle
    provider: any;

    connect_signals(): void {
        super.connect_signals()

        this.connect(this.model.properties.provider.change, () => {this.setProvider(), this.getProperties()})
        this.connect(this.model.properties.background_color.change, () => {this.setBackgroundColor();this.getProperties();console.log("background_color")})
        this.connect(this.model.properties.neutral_color.change, () => {this.setNeutralColor();this.getProperties();console.log("neutral_color")})
        this.connect(this.model.properties.accent_base_color.change, () => {this.setAccentColor();this.getProperties();console.log("background_color");})
        this.connect(this.model.properties.corner_radius.change, () => {this.provider.cornerRadius=this.model.corner_radius;console.log("corner_radius");})
        this.connect(this.model.properties.body_font.change, () => {this.setBodyFont();this.getProperties();console.log("body_font");})
    }

    render(): void {
        super.render()
        this.el.style.display = "hide"

        this.setProvider();
        this.setBackgroundColor();
        this.setAccentColor();
        this.setNeutralColor();
        this.getProperties();
    }
    setProvider(): void {
        console.log("set provider")
        console.log(this.model.provider)
        this.provider = <HTMLElement>document.getElementById(this.model.provider);
        console.log(this.provider)
    }
    setBackgroundColor(): void {
        if (this.model.background_color){
            win.fastStyle.setBackgroundColor(this.model.background_color, "#" + this.model.provider)
        }
    }
    setAccentColor(): void {
        if (this.model.accent_base_color){
            win.fastStyle.setAccentColor(this.model.accent_base_color, "#" + this.model.provider)
        }
    }
    setNeutralColor(): void {
        if (this.model.neutral_color){
            console.log(this.model.neutral_color)
            win.fastStyle.setNeutralColor(this.model.neutral_color, "#" + this.model.provider)
            console.log("neutralColor set")
        }
    }
    setBodyFont(): void {
        document.getElementsByTagName("body")[0].style.setProperty("--body-font", this.model.body_font)
    }

    getProperties(): void {
        console.log("getProperties")
        const model = this.model;
        const provider = <any>this.provider;

        console.log(provider.backgroundColor, model.background_color)
        if (provider.backgroundColor && model.background_color!==provider.backgroundColor){
            model.background_color = provider.backgroundColor;console.log("set background")
        }
        if (provider.accentBaseColor && model.accent_base_color!==provider.accentBaseColor){
            model.accent_base_color = provider.accentBaseColor
        }

        let palette = provider.accentPalette
        let index = palette.indexOf(this.provider.accentBaseColor.toUpperCase())

        if (provider.accentFillActiveDelta!==undefined){model.accent_fill_active = palette[index+provider.accentFillActiveDelta];}
        if (provider.accentFillHoverDelta!==undefined){model.accent_fill_hover = palette[index+provider.accentFillHoverDelta]}
        if (provider.accentFillRestDelta!==undefined){model.accent_fill_rest = palette[index+provider.accentFillRestDelta]}
        if (provider.accentForegroundActiveDelta!==undefined){model.accent_foreground_active = palette[index+provider.accentForegroundActiveDelta]}
        if (provider.accentForegroundCutDelta!==undefined){model.accent_foreground_cut_rest = palette[index+provider.accentForegroundCutDelta]}
        if (provider.accentForegroundHoverDelta!==undefined){model.accent_foreground_hover = palette[index+provider.accentForegroundHoverDelta]}
        if (provider.accentForegroundRestDelta!==undefined){model.accent_foreground_rest = palette[index+provider.accentForegroundRestDelta]}

        let value: string
        value=window.getComputedStyle(provider).getPropertyValue('--body-font').trim()
        if (value!==""){model.body_font = value}

        value=window.getComputedStyle(provider).getPropertyValue('--accent-foreground-cut-rest').trim()
        if (value!==""){model.accent_foreground_cut_rest = value}

        value=window.getComputedStyle(provider).getPropertyValue('--neutral-outline-active').trim()
        if (value!==""){model.neutral_outline_active = value}
        value=window.getComputedStyle(provider).getPropertyValue('--neutral-outline-hover').trim()
        if (value!==""){model.neutral_outline_hover = value}
        value=window.getComputedStyle(provider).getPropertyValue('--neutral-outline-rest').trim()
        if (value!==""){model.neutral_outline_rest = value}
        value= window.getComputedStyle(provider).getPropertyValue('--neutral-focus').trim()
        if (value!==""){model.neutral_focus = value}
        console.log("neutral_focus", value, model.neutral_focus)
        value=window.getComputedStyle(provider).getPropertyValue('--neutral-foreground-rest').trim()
        if (value!==""){model.neutral_foreground_rest = value}
        console.log("--neutral-foreground-rest", value, model.neutral_foreground_rest)

        this.model.updates +=1;
    }
}

export namespace FastStyle {
    export type Attrs = p.AttrsOf<Props>
    export type Props = HTMLBox.Props & {
        provider: p.Property<string>,

        background_color: p.Property<string>,
        neutral_color: p.Property<string>,
        accent_base_color: p.Property<string>,
        corner_radius: p.Property<number>,
        body_font: p.Property<string>,

        accent_fill_active: p.Property<string>,
        accent_fill_hover: p.Property<string>,
        accent_fill_rest: p.Property<string>,

        accent_foreground_active: p.Property<string>,
        accent_foreground_cut_rest: p.Property<string>,
        accent_foreground_hover: p.Property<string>,
        accent_foreground_rest: p.Property<string>,

        neutral_outline_active: p.Property<string>,
        neutral_outline_hover: p.Property<string>,
        neutral_outline_rest: p.Property<string>,

        neutral_focus: p.Property<string>,
        neutral_foreground_rest: p.Property<string>,

        updates: p.Property<number>,
    }
}

export interface FastStyle extends FastStyle.Attrs { }

// The Bokeh .ts model corresponding to the Bokeh .py model
export class FastStyle extends HTMLBox {
    properties: FastStyle.Props

    constructor(attrs?: Partial<FastStyle.Attrs>) {
        super(attrs)
    }

    static __module__ = "panel.models.fast_style"

    static init_FastStyle(): void {
        this.prototype.default_view = FastStyleView;

        this.define<FastStyle.Props>({
            provider: [p.String, ],

            background_color: [p.String, ],
            neutral_color: [p.String, ],
            accent_base_color: [p.String, ],
            corner_radius: [p.Int, ],
            body_font: [p.String, ],

            accent_fill_active: [p.String, ],
            accent_fill_hover: [p.String, ],
            accent_fill_rest: [p.String, ],

            accent_foreground_active: [p.String, ],
            accent_foreground_cut_rest: [p.String, ],
            accent_foreground_hover: [p.String, ],
            accent_foreground_rest: [p.String, ],

            neutral_outline_active: [p.String, ],
            neutral_outline_hover: [p.String, ],
            neutral_outline_rest: [p.String, ],

            neutral_focus: [p.String, ],
            neutral_foreground_rest: [p.String, ],
            updates: [p.Int, 0],

        })
    }
}