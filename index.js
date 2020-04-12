const { ipcRenderer } = require('electron')
const printBtn = document.getElementById('print-btn')
const printPdfBtn = document.getElementById('print-pdf-btn')
// const printContent = document.getElementById('printContent')

printBtn.addEventListener('click', (event) => {
	console.log('点击打印测试')
	ipcRenderer.send('get-printers')
	ipcRenderer.on('printerList', (event, data) => {
        console.log(data)
        ipcRenderer.send('do-print', {
            deviceName: data[0].name
        })
	})
})
printPdfBtn.addEventListener('click', (event) => {
    ipcRenderer.send('print-to-pdf')
})
