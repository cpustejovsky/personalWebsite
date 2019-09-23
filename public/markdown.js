window.onload = function() {
  const converter = new showdown.Converter();
  const pad = document.getElementById("pad");
  const markdownArea = document.getElementById("markdown");

  const convertTextAreaToMarkdown = function() {
    let markdownText = pad.value;
    html = converter.makeHtml(markdownText);
    markdownArea.innerHTML = html;
  };

  pad.addEventListener("input", convertTextAreaToMarkdown);

  convertTextAreaToMarkdown();
};
