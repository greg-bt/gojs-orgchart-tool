import { Binding, GraphObject, Panel, Part, Shape, Spot } from "gojs";
import { addEmployee } from "../index";


export default function ButtonPanel() {
    return GraphObject.make(
        
        Panel, "Horizontal",

        {
            name: "BUTTONPANEL",
            alignment: Spot.Bottom,
            opacity: 0,
        },

        new Binding("opacity", "isSelected", s => s ? 1 : 0).ofObject(),

        expandButton,
        addButton
    )
}

const expandButton = GraphObject.make(
    "TreeExpanderButton",
    {
        "_treeExpandedFigure": "TriangleUp",
        "_treeCollapsedFigure": "TriangleDown"
    }
);

const addButton = GraphObject.make(
    "Button",
    {
        click: (e, button) => addEmployee(button.part)
    },

    GraphObject.make(
        Shape, "PlusLine",
        {
            width: 10,
            height: 10
        }
    )
)

