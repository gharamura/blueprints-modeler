const fs = require("fs");
const { Table } = require('console-table-printer');
const { format } = require('date-fns');

const env1 = process.argv[2] || 'me';
const env2 = process.argv[3] || 'qa';

let bps1;
let bps2;

const getfiles = async () => {
  fs.readFile(`./download/${env1}/summary.json`, "utf8", async (err, data) => {
    bps1 = JSON.parse(data);
    
    fs.readFile(`./download/${env2}/summary.json`, "utf8", async (err, data) => {
      bps2 = JSON.parse(data);

      const t = new Table();

      await bps1.map((wf) => {
        const match = bps2.find((item) => item.name === wf.name);
        const exactMatch = bps2.find((item) => item.hash === wf.hash);
        let color;
        let version;
        if(match) {
          if(exactMatch) {
            color = 'green',
            version = exactMatch.version
          } else {
            color = 'yellow',
            version = match.version
          }
        } else {
          color = 'red'
        }

        let row = {};
        row.name = wf.name;
        row.created_at = format(new Date(wf.created_at), 'dd/MM/yyyy');
        row[`version @ ${env1}`] = wf.version
        row[`version @ ${env2}`] = version

        t.addRow(row, { color: color })

        return {
          name: wf.name,
          match: match?.version
        }
      });
        
      console.log(t.render());
    });    
  });    
}

getfiles();
