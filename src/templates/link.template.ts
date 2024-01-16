import { GraphObject, Link, Shape } from "gojs";

/** Returns template defining the style of the node links. */
export default function LinkTemplate() {
    return GraphObject.make(
        Link,
        Link.Orthogonal,

        {
            layerName: "Background",    // Ensure always shown behind nodes
            corner: 5                   // Corner radius of links
        },

        GraphObject.make(
            Shape,

            {
                strokeWidth: 3,     // Thinkness of link
                stroke: "#d0d3d4"   // Color of link
            }
        )
    )
}