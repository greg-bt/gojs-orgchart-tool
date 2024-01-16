import { Binding, GraphObject, Panel, Size, Spot, TextBlock } from 'gojs';

/** Returns panel showing the details of an employee */
export default function DetailsPanel() {
    return GraphObject.make(

        Panel, "Vertical",

        {
            width: 150,
            height: 70,
            margin: 3,
            defaultAlignment: Spot.Left, // Align text left
        },

        // Show details
        textBlock("NAME", titleStyle),
        textBlock("TITLE", textStyle),
        textBlock("TAG", textStyle),
        textBlock("LOCATION", textStyle),
    )
}

// Create editable text blocks
function textBlock(id : String, style: Style) {
    return GraphObject.make(

        TextBlock,
        style,
        id,

        {
            name: id.toUpperCase(),
            editable: true,             // Text can be edited
            isMultiline: false,         // Single line
            maxSize: new Size(150, 20), // Hide overflow
            margin: 0.5,
        },

        // Update tree data if changed
        new Binding("text", id.toLowerCase()).makeTwoWay()
    )
}

// Text styles
type Style = { font: string }
const titleStyle = { font: "bold 13pt  Segoe UI,sans-serif" };
const textStyle  = { font: "10pt  Segoe UI,sans-serif" };