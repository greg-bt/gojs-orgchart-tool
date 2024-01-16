import { Binding, GraphObject, Panel, Size, Spot, TextBlock } from 'gojs';

export default function DetailsPanel() {
    return GraphObject.make(

        Panel, "Vertical",

        {
            width: 150,
            height: 70,
            margin: 3,
            defaultAlignment: Spot.Left,
        },

        textBlock("NAME", titleStyle),
        textBlock("TITLE", textStyle),
        textBlock("TAG", textStyle),
        textBlock("LOCATION", textStyle),
    )
}

// Create GoJS text element
function textBlock(id : String, style: Style) {
    return GraphObject.make(

        TextBlock,
        style,
        id,

        {
            name: id.toUpperCase(),
            editable: true,
            isMultiline: false,
            maxSize: new Size(150, 20),
            margin: 0.5,
        },

        new Binding("text", id.toLowerCase()).makeTwoWay()
    )
}

type Style = { font: string }

const titleStyle = { font: "bold 13pt  Segoe UI,sans-serif" };
const textStyle  = { font: "10pt  Segoe UI,sans-serif" };