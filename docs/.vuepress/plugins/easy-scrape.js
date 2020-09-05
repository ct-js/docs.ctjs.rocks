let path = require('path');
let fs = require('fs');
const { sep } = require('path');

module.exports = (options = {}, context) => {
    console.log(__dirname);
    return {
        beforeDevServer(app, server) {
            app.get(/.+\.json/, (req, res) => {
                let mdName = req.url.slice(0,-5) + '.md'; // Swap out the file extension for md
                let mdPath = path.resolve(__dirname, `../..${mdName}`) // Get absolute path for markdown file

                // Read the markdown file
                if (fs.existsSync(mdPath)) {
                    fs.readFile(mdPath, { encoding: 'utf-8'}, (err, data) => {
                        if (err) return console.error(err);

                        markdownToJSON(data).then(json => {
                            res.json({ 
                                response: 200,
                                page: json
                            });
                        }).catch((err) => {
                            res.json({
                                response: 404,
                                page: err
                            }); 
                        })
                        
                    })
                } else {
                        res.json({
                            response: 404,
                            page: null
                        });
                }
            })
        }
    }
}

async function markdownToJSON(markdown) {
    return new Promise((resolve, reject) => {
        let seperator = '§';

        //markdown = markdown.replace(/\\n/g, '\n');
        // Find all header lines and add the seperator
        markdown = markdown.replace(/\n#/g, `\n${seperator}#`);

        let json = {};

        let mdJSON = markdown.split(seperator)
        mdJSON.forEach((value, index) => {
            // Get the first line for the header
            let header = value.split('\n')[0];
            
            let level = header.match(/#/g).length;

            // Seperate out the rest of it based on the title length
            let content = value.slice(header.length);

        })

        resolve({mdJSON});
    });
}

/*function buildSection(header, content) {
    let headerCount = header.substring(0, 5).match(/#/g).length;
    let section = {
        header: header.substring(headerCount),
        level: headerCount,
        content: 
    }
}*/