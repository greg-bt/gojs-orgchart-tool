import { Binding, GraphObject, Panel, Shape } from 'gojs';
import PicturePanel from './picture.panel';
import DetailsPanel from './details.panel';

/** Returns the layout of the employee card panel. */
export default function CardPanel() {
    return GraphObject.make(
        
        Panel, "Auto",

        // Shape of card
        GraphObject.make(
            Shape,
            "RoundedRectangle",
            {
                name: "SHAPE",
                fill: "#ffffff",
                stroke: "#d0d3d4",
                strokeWidth: .5
            },
            new Binding("fill", "bgcolor" )
        ),

        // Card contents
        GraphObject.make(
            Panel,
            "Horizontal",
            PicturePanel(), // Employee Picture
            DetailsPanel()  // Employee Details
        )
    )
}