import { Part, Shape } from "gojs";

export const textarea = (document.getElementById("textArea") as HTMLInputElement);
export const colorselector = (document.getElementById("colorSelect") as HTMLInputElement);

export default function SelectProps(part: Part | null) {

    if (part && part.data.comments == undefined) part.data.comments = "";
    if (part && part.data.bgcolor == undefined) part.data.bgcolor = "#ffffff";

    // Set enabled if a part is selected
    textarea.disabled = !part;
    textarea.value = (part ? part.data.comments : "");

    colorselector.disabled = !part;
    colorselector.value = (part ? part.data.bgcolor : "#ffffff")    

}

export function ChangeProps(part: Part | null) {
    console.log("CHANGED")
    if (!part) return;
    part.data.comments = textarea.value;
    part.data.bgcolor = colorselector.value;
    (part.findObject("SHAPE") as Shape).fill = colorselector.value;
}