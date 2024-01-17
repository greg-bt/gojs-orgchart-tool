import { Part } from "gojs";

export const textarea = (document.getElementById("textArea") as HTMLInputElement);

export default function OpenComments(part: Part | null) {

    textarea.disabled = !part;
    textarea.value = (part ? part.data.comments : "")    

}

export function CommentChange(part: Part | null) {
    console.log("CHANGED")
    if (part) part.data.comments = textarea.value;
}