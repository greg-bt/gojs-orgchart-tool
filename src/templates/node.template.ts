import { Binding, GraphObject, Node, Panel, Part, Shape, Spot } from "gojs";
import CardPanel from "../panels/card.panel";
import ButtonPanel from "../panels/button.panel";
import SelectProps from "../functions/properties.function";

/**
 * Defines the layout and function of orgchart node elements
*/
export default function NodeTemplate() {
    let node = GraphObject.make(
        
        Node, "Spot",

        {
            // Hover Event
            mouseEnter: (e, node) => setNodeOpacity(node, 1),
            mouseLeave: (e, node) => setNodeOpacity(node, 0),

            // Click Event
            click: (e, node) => SelectProps(node.part),

            // DragEnter Event
            mouseDragEnter: (e, node, prev) => {
                if (!node.diagram) return;

                if (!canParent(node.diagram.selection.first(), (node as Node) )) return;
                let shape = (node as Panel).findObject("SHAPE");
                (shape as Shape).fill = "#e1fff6";
            },

            // DragLeave Event
            mouseDragLeave: (e, node, next) => {
                let shape = (node as Panel).findObject("SHAPE");
                (shape as Shape).fill = "white";
            },

            // Drop Event
            mouseDrop: (e, node) => {
                if (!node.diagram) return;
                let selected = node.diagram.selection.first();

                // Check if selected node can be parented to target
                if (canParent(selected, (node as Node) )) {
                    const link = (selected as Node).findTreeParentLink();

                    // Create new link between nodes
                    if (link == null) {
                        node.diagram.toolManager.linkingTool.insertLink(
                            (node as Node),
                            (node as Node).port,
                            (selected as Node),
                            (selected as Node).port
                        );
                       
                    // Remove existing link if exists
                    } else link.fromNode = (node as Node)
                }
            }
        },

        // Move selected nodes to foreground
        new Binding("layerName", "isSelected", sel => sel ? "Foreground" : "").ofObject(),

        // Contents
        CardPanel(),

        // Buttons
        ButtonPanel()
    );

    return node
}

// Change panel opacity
function setNodeOpacity(node: GraphObject, opacity: number) {
    if (node instanceof Panel) {
        let panel = node.findObject("BUTTONPANEL");

        // Update opacity if panel exists
        if (panel) panel.opacity = opacity;
    }
}

// Check parentability of a node
function canParent(node: Part | null, target: Node) {
    if (!(node instanceof Node)) return false;
    if (node === target) return false;
    if (target.isInTreeOf(node)) return false;
    if (node.findTreeParentNode() === target) return false;
    return true;
}
