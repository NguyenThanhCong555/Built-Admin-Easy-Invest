export function getTextFromHtmlString(text: string): string {
  var temporalDivElement = document.createElement('div');
  temporalDivElement.innerHTML = text;
  return temporalDivElement.textContent || temporalDivElement.innerText || '';
}
