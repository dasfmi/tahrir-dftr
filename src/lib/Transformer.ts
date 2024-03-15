export enum FormatType {
    h1,
    h2,
    h3,
    h4,
    h5,
    h6,
    bold,
    italic,
    stroke,
    link,
    image,
    code,
    quote,
}


export const transform = (formatType: FormatType, text: string) => {
    let delta = 0;
    let cursorPosition = 0;
    let newText = '';

    switch (formatType) {
        case FormatType.bold: {
            if (
                text.startsWith("**") &&
                text.endsWith("**")
            ) {
                text = text.slice(
                    2,
                    text.length - 2
                );
                delta = -4;
                break;
            }
            newText = `**${text}**`;
            delta = 4;
            cursorPosition = newText.length;
            break;
        }
        case FormatType.italic: {
            newText = `*${text}*`;
            delta = 2;
            cursorPosition = newText.length;
            break;
        }
        case FormatType.h1: {
            newText = `# ${text}`;
            delta = 3;
            cursorPosition = newText.length;
            break;
        }
        case FormatType.h2: {
            newText = `## ${text}`;
            delta = 3;
            cursorPosition = newText.length;
            break;
        }
        case FormatType.h3: {
            newText = `### ${text}`;
            delta = 3;
            cursorPosition = newText.length;
            break;
        }
        case FormatType.h4: {
            newText = `#### ${text}`;
            delta = 3;
            cursorPosition = newText.length;
            break;
        }
        case FormatType.h5: {
            newText = `##### ${text}`;
            delta = 3;
            cursorPosition = newText.length;
            break;
        }
        case FormatType.h6: {
            newText = `###### ${text}`;
            delta = 3;
            cursorPosition = newText.length;
            break;
        }
        case FormatType.stroke: {
            newText = `~~${text}~~`;
            delta = 4;
            cursorPosition = newText.length;
            break;
        }
        case FormatType.link: {
            newText = `[${text}](https://)`;
            delta = 11;
            cursorPosition = 1; // set cursor at in between []
            if (text != '') {
                // if text is set already, move the cursor after https://
                cursorPosition = newText.length - 1
            }
            
            break;
        }
        case FormatType.image: {
            newText = `![${text}](https://)`;
            delta = 12;
            cursorPosition = 2; // set cursor at in between []
            if (text != '') {
                // if text is set already, move the cursor after https://
                cursorPosition = newText.length - 1
            }
            break;
        }
        case FormatType.quote: {
            if (text == '') {
                text = 'اقتباس'
            }
            newText = `> ${text}`;
            delta = 2;
            cursorPosition = newText.length;
            break;
        }
        case FormatType.code: {
            newText = "```\n"+text+"\n```\n";
            cursorPosition = 2;
            break;
        }
    }

    return { text: newText, delta, cursorPosition };
};