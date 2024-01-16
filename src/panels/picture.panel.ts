import { Binding, GraphObject, Picture, Size } from 'gojs';

/** Returns panel showing 70x70 picture of employee. */
export default function PicturePanel() {
    return GraphObject.make(
        Picture,
        {
            desiredSize: new Size(70, 70),
            source: blankPhoto,
            margin: 3
        },
        new Binding("source", "email", retrievePhoto)
    )
}

// Retrieve photo
function retrievePhoto(email: string) {
    if (!email) return blankPhoto;

}

// Base64 blank profile photo
const blankPhoto = " data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEYAAABGCAYAAABxLuKEAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAVuSURBVHhe7ZpfaFt1FMdzW7CrRWubFsGHjW0KwmiiYwlpFBRlzUaZig/6YNkEH6y4FeyGIJtvE1Gsk1bnfBCcuvfpKK71DwqaXJKx2RQfV1AfFNqktJJ1Fdb6/d6eSZE1uek9v9uk3g9cbs7pze+c8/2d+8svNw0FBAQEBAQEBARsLiw5+04um92az+cTy8vLD8LcgeNO5w+h0DyOKcuyrkQiETsWj/+24vYX34WBIPtt2+4vFAqPLi0t3RTjljQ0NMyHw+HvE4nEGQj0lbh9wTdhIMgDEORtCLIXgojXHRAoBIG+gUCvQqAr4jaKL8KMj429lE6nhyBIs7jWBQS6nkwmB3tSqQ/FZYwGORsDopyEKKe9ikIwxhaOxTHFZQyjwqCA4yjkeLW3Tjk4Fsfk2OIygrFbCYk/iQLOa4qyGq47uK2ewm31hbhUMdIxWGjDEGXYlChEOmeYscSlihFh8OlzDIlvFdMYjMFYYqqiLgxm8G58JL8gpnEYizHFVENdGOxmD2AmO8U0DmMxpphqqAtTKpWekJe+YSKmqjBo6TuKxWJUTN9gTMYWUwVVYdDS96C11e/3SjAmY4upgqow+KbcjlPTiuUrTRJbDe01ZoucNwLV2NrCLMp5I1CNrSqMZVkFnDZCnEWJrYaqMJFI5A98h5kW0zcYk7HFVEFVmFg8Pt/e3v6zmL7BmIwtpgraa0yopaXlS3npGyZiqguDlr6A1p4R0ziMxZhiqqEuDFr6z3A4/LGYxmEsxhRTDXVhSCKRGMJM/i6mMRiDscRUxYgwmMHpZDI5gMTFow/HZgzGEpcqxjLvSaXOI/ETJsQRUU4whrjUMTelAIm/0d3dfVJTHI7FMTm2uIxg7GE4vtQ1YTfq7ILHLl58MZPJnMK3YK+/K12DKIOpffs+or06hjbqwuSy2dts2x6cm5t7Ph6Pv4KZdX5atTOZaDabHSoWi49DIOdat7BLsIn7FuMdTXR3T9A3Pja2H+Odam1t/QQL8LtYa/52LlZCVRgkG0+n0x+g8D20UdAiZvgYZvh95wIAgXpRUD8EegTXlX24hPf/BUF+gCBnIMiouNmBh9GB7+D9ziMOXHcJa87LmISsc4ECasJAlMMQ5d9kb4JW517jAop7DcX9Im4KtG1ycpL/7bAb5q3+2+FyV1eXjff8uuJ23rMLor5ZKBQO4H3iXQHi8OfboxDntLg8oSIMRBmGKEfK3SJIfAGz/7nM/mVxuwKC7JYu60OMNdcpxOCn1QjEGRDXuvEkzNTVq42jo6NnZ2ZmnvvvDK4Fkr/R1taWa25u/hrmTzimcKx+XMGO449o7KKHFhYW9s7OzsYgSCP/WAl2aEdHx7ne3t5DO3buvCHuqvEkzMjw8Nnp6emDYq6X6zjmcFxzrFDodhytODw9kevs7Pz0yMDAITGrZt0bDNw+b6FTvIpCKAAfoG+Xg689P6ZkbsxRzKpZV8cgYB/WlM/KrSm1gKw5fVhzzonLNVV3DPYp90GUkVoXhTBH5oqc7xWXa6oWRnawd4lZ8yDXNuT8npiuqUoY3ELPYg/RK2bdwJyZu5iucC3MpVyuCW35utuP5VqCOTN31iCuirgWZmJi4hm05S4x6w7mzhrErIhrYUqlUr+8rFuqqcGVMFjV49iOJ8WsW1gDaxGzLK6EsW37aX701TusgbWIWZaKwkDhRqzqPWLWPayFNYm5JhWFyefz26H0/WLWPayFNYm5JhWFwUddF06e/6u7hmiWmsriZo2pOEgd4l0Yy7K2yctNg5uaKgoTjUbH+S11s8BaWJOYa+LqsQO20o9h1/gw7s26VgidsgRRftwTi30nroCAgICAgICAgID/NaHQP54RXEXtR+z1AAAAAElFTkSuQmCC";
