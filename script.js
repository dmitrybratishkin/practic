document.getElementById('file1').addEventListener('change', handleFileSelect);
document.getElementById('file2').addEventListener('change', handleFileSelect);

function handleFileSelect(event) {
    const file = event.target.files[0];
    if (!file) return;

    if (file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
        const reader = new FileReader();
        reader.onload = function(e) {
            convertToHTML(e.target.result, event.target.id === 'file1' ? 'content1' : 'content2');
        };
        reader.readAsArrayBuffer(file);
    } else {
        alert('Пожалуйста, выберите файл формата .docx');
    }
}

function convertToHTML(arrayBuffer, targetId) {
    mammoth.convertToHtml({ arrayBuffer: arrayBuffer })
        .then(function(result) {
            document.getElementById(targetId).innerHTML = result.value;
        })
        .catch(function(err) {
            console.log(err);
        });
}
