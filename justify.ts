
export function justifyText(text: string): string {
  const words = text.split(' '); // Division du texte en mots
  let currentLine = ''; 
  let justifiedText = ''; 

  // Justification du texte
  for (const word of words) {
    if (currentLine.length + word.length + 1 <= 80) {
      currentLine += (currentLine ? ' ' : '') + word; 
    } else {
      const extraSpaces = 80 - currentLine.length;

      if (extraSpaces > 1) {
        const spacesToAdd = extraSpaces / (currentLine.split(' ').length - 1);
        const remainder = extraSpaces % (currentLine.split(' ').length - 1);
        let justifiedLine = '';
        const wordsInLine = currentLine.split(' ');

        // Traitement des mots de la ligne courante
        for (let i = 0; i < wordsInLine.length; i++) {
          justifiedLine += wordsInLine[i];
          if (i < wordsInLine.length - 1) {
            const spaces = i < remainder ? spacesToAdd + 1 : spacesToAdd;
            justifiedLine += ' '.repeat(spaces);
          }
        }

        justifiedText += justifiedLine + '\n'; 
      } else {
        justifiedText += currentLine + '\n'; 
      }

      currentLine = word; 
    }
  }

  justifiedText += currentLine; 

  return justifiedText; // Renvoi du texte justifié
}
