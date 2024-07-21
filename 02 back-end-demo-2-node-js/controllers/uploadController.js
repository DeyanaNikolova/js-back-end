const fs = require('fs/promises');
const formidable = require('formidable');

module.exports = (req, res) => {
    const form = new formidable.IncomingForm();

    form.parse(req, async (err, fields, files) => {
    
       let filePath = files.uploaded.path;
        const name = files.uploaded.name;
        const targetPath = './uploads/' + name;

        await fs.rename(filePath, targetPath);

        res.writeHead(301, {
            'Location': '/catalog'
        });
        res.end();
    });
    // const target = fs.createWriteStream('./uploads/text.txt');
    // req.on('data', data => console.log('>>>', data.toString()));
    // req.pipe(target);

    // res.writeHead(301, {
    //     'Location': '/catalog'
    // });
    // res.end();

};