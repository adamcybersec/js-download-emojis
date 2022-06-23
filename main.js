var https = require('https');
var fs = require('fs');

// converted yaml to json from here: https://github.com/lambtron/emojipacks/blob/master/packs/futurama.yaml
fs.readFile('/path/futurama.json', 'utf-8', (err,data) => {
  if (err) throw err;
  if (data) downloadEmojis(JSON.parse(data))
})

downloadEmojis = (data) => {
  
  for (i in data) {
    const url = `${data[i].src}`
    const item = `${data[i].name}`
    const path = `/path/emojis/${data[i].name}.png` //output path
    const filePath = fs.createWriteStream(path)

    https.get(url,(res) => {
      res.pipe(filePath)
      filePath.on('finish',() => {
          filePath.close()
          console.log(`Download completed for: ${item}`); 
      })
  })
  }
}