// justify.ts

function justifyText(text: string): string {
    const words = text.split(' ');
    let currentLine = '';
    let justifiedText = '';
  
    for (const word of words) {
      if (currentLine.length + word.length + 1 <= 80) {
        // Ajoutez le mot à la ligne actuelle avec un espace
        currentLine += (currentLine ? ' ' : '') + word;
      } else {
        // La ligne actuelle est pleine, ajoutez-la au texte justifié
        justifiedText += currentLine + '\n';
  
        // Réinitialisez la ligne actuelle avec le nouveau mot
        currentLine = word;
      }
    }
  
    // Ajoutez la dernière ligne au texte justifié
    justifiedText += currentLine;
  
    return justifiedText;
  }
  
  export { justifyText };
  