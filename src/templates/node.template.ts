import { Binding, GraphObject, Node, Panel, Part, Shape, Spot } from "gojs";
import CardPanel from "../panels/card.panel";
import ButtonPanel from "../panels/button.panel";


export default function NodeTemplate() {
    return GraphObject.make(
        
        Node, "Spot",

        {
            // Hover Event
            mouseEnter: (e, node) => setNodeOpacity(node, 1),
            mouseLeave: (e, node) => setNodeOpacity(node, 0),

            // DragEnter Event
            mouseDragEnter: (e, node, prev) => {
                if (!node.diagram) return;

                if (!canParent(node.diagram.selection.first(), (node as Node) )) return;
                let shape = (node as Panel).findObject("SHAPE");
                if (shape) (shape as Shape).fill = "#e1fff6";
            },

            // DragLeave Event
            mouseDragLeave: (e, node, next) => {
                let shape = (node as Panel).findObject("SHAPE");
                if (shape) (shape as Shape).fill = "white";
            },
        },

        // Move selected nodes to foreground
        new Binding("layerName", "isSelected", sel => sel ? "Foreground" : "").ofObject(),

        // Contents
        CardPanel(),

        // Buttons
        ButtonPanel()
    )
}

function setNodeOpacity(node: GraphObject, opacity: number) {
    if (node instanceof Panel) {
        let panel = node.findObject("BUTTONPANEL");

        if (panel) panel.opacity = opacity;
    }
}

// Check parentability of a node
function canParent(node: Part | null, target: Node) {
    if (!(node instanceof Node)) return false;
    if (node === target) return false;
    if (target.isInTreeOf(node)) return false;
    return true;
}
