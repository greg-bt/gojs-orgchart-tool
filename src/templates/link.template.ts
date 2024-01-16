import { GraphObject, Link, Shape } from "gojs";

export default function LinkTemplate() {
    return GraphObject.make(
        Link,
        Link.Orthogonal,

        {
            layerName: "Background",
            corner: 5
        },

        GraphObject.make(
            Shape,

            {
                strokeWidth: 3,
                stroke: "#d0d3d4"
            }
        )
    )
}