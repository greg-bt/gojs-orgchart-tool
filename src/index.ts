import { ClickCreatingTool, Diagram, Part, Point, ToolManager, TreeLayout, TreeModel } from "gojs";
import LinkTemplate from "./templates/link.template";
import NodeTemplate from "./templates/node.template";

const diagram = new Diagram("diagramContainer",
    {
        "toolManager.mouseWheelBehavior": ToolManager.WheelZoom,
        "commandHandler.zoomFactor": 1.3,
        "undoManager.isEnabled": true,
        allowCopy: false,
        allowDelete: true,
        maxSelectionCount: 1,

        // Add new nodes on double click
        "clickCreatingTool.archetypeNodeData": { // allow double-click in background to create a new node

        },
        "clickCreatingTool.insertPart": function ( loc: Point ) {  // method override must be function, not =>
            const node = ClickCreatingTool.prototype.insertPart.call(this, loc);
            if (node == null) return null;

            
            /* @ts-ignore */
            this.diagram.select(node);
            /* @ts-ignore */
            this.diagram.commandHandler.scrollToPart(node);

            return node;
        },

        linkTemplate: LinkTemplate(),
        nodeTemplate: NodeTemplate(),
        layout: new TreeLayout({ angle: 90, layerSpacing: 35 })
    }
);

window.onbeforeunload = () => {return true;}




diagram.model = new TreeModel(
    [ // the nodeDataArray
        { key: "A", name:"greg-bt", title: "Engineer", tag: "B02", location: "UK" },
        { key: "B", parent: "A" },
        { key: "D", parent: "A" },
        { key: "C", parent: "B" }
    ]
);