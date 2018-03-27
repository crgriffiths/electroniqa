// Setting Variables
let checklistText = document.getElementById('checklist-text');
let submitButton = document.getElementById('submit');
let outputContainer = document.getElementById('output-text');
let removeLast = document.getElementById('remove-last');
let removeAll = document.getElementById('remove-all');
let selectAll = document.getElementById('select-all');
let copyContent = document.getElementById('copy-cnt');

// Adding Item Function
function addItem() {
  let text = checklistText.value;
  if (text !== '') {
    if (text.match(/[\n\r]/).length > 0){
      let str = '\n';
      let lt = '<'
      let gt = '>'
      text = text.replace(/</g, '&lt;');
      text = text.replace(/>/g, '&gt;');
      text = text.split(str);
      for (var i = 0; i < text.length; i++) {
        if (text[i] != '') {
          text[i] = '- [ ] ' + text[i] + '\r\n'
        }
        else {
          text.splice(i, 1);
        }
      }
      text = text.join("");
      outputContainer.textContent += text;
      checklistText.value = ''; 
    } else {
      outputContainer.textContent += '- [ ] ' + encodeURIComponent(text);
      checklistText.value = '';
    }
  } else {
    alert('Please add content.')
  }
}

// Adding Items to Checklist via enter key
checklistText.addEventListener('keyup', function(e){
  if (e.keyCode === 13) {
    addItem();
  }
});
// Adding Items to Checklist via submit button click
//submitButton.addEventListener('click', addItem);

// Remove Last Item from Checklist
removeLast.addEventListener('click', () => {
  let text = outputContainer.textContent;
  let textArray = text.split('\n');
  if (textArray[textArray.length-1] == '') {
    textArray = textArray.slice(0,-2);
  } else {
    textArray = textArray.slice(0,-1);
  }
  text = textArray.join('\n');
  outputContainer.textContent = text;
});

// Remove All Items from Checklist
removeAll.addEventListener('click', () => {
  if (confirm('Remove all checklist content?')) {
    outputContainer.textContent = '';
  }
});

// Select All Content
selectAll.addEventListener('click', () => {
  window.getSelection().selectAllChildren(outputContainer);
  document.execCommand('copy',false,null);
});