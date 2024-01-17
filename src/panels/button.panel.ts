import { Binding, Diagram, GraphObject, Panel, Part, Shape, Spot } from "gojs";
import Employee from "../employee";

/** Returns panel containing tree expand and node add buttons */
export default function ButtonPanel() {
    return GraphObject.make(
        
        Panel, "Horizontal",

        {
            name: "BUTTONPANEL",
            alignment: Spot.Bottom, // Anchor to bottom of card
            opacity: 0,             // Hide on first render
        },

        // Make buttons visible when card is selected
        new Binding("opacity", "isSelected", s => s ? 1 : 0).ofObject(),

        // Buttons
        expandButton,
        addButton
    )
}

// Expand tree button
const expandButton = GraphObject.make(
    "TreeExpanderButton",
    {
        "_treeExpandedFigure": "TriangleUp",
        "_treeCollapsedFigure": "TriangleDown"
    }
);

// Add new node button
const addButton = GraphObject.make(
    "Button",
    {
        click: (e, button) => addEmployee(button.diagram, button.part)
    },

    // Shape of add button
    GraphObject.make(
        Shape, "PlusLine",
        {
            width: 10,
            height: 10
        }
    )
)

// Add new employee to diagram
export function addEmployee(diagram: Diagram | null, node?: Part | null) {

    // Ensure node and diagram exist
    if (!diagram) return null;
    diagram.startTransaction("add employee");

    // Create new node
    let employeeData = new Employee();
    if (node) employeeData.parent = node.data.key;

    // Add node to diagram
    diagram.model.addNodeData(employeeData);
    const newNode = diagram.findNodeForData(employeeData);

    // Check for completeness and close transaction
    if (newNode && node) newNode.location = node.location;
    diagram.commitTransaction("add employee");
    diagram.select(newNode);
    diagram.commandHandler.scrollToPart( (newNode as Part ) );

    return newNode;
}
