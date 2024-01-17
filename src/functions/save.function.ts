import { Model } from "gojs";


export default function SaveJson(model: Model, filename: string) {

    if( filename == "") filename = "OrgChart";

    // Create URL
    var jsonUrl = "data:text/json;charset=utf-8," + encodeURIComponent(model.toJson());

    createDownload(jsonUrl, filename + ".json")

}

function createDownload(url: string, filename: string) {

    // Create download link
    var link = document.createElement("a");
    link.href     = url;
    link.download = filename;

    // Download SVG
    link.click();
}

export function SaveSVG(svg: SVGElement | null, filename: string) {

    if (!svg) return;

    if( filename == "") filename = "OrgChart";

    var svgBlob = new Blob([svg.outerHTML], {type:"image/svg+xml;charset=utf-8"});

    // Create URL
    var svgUrl = URL.createObjectURL(
        new Blob(
            [svg.outerHTML],
            {type:"image/svg+xml;charset=utf-8"}
        )
    );

    createDownload(svgUrl, filename + ".svg")
}