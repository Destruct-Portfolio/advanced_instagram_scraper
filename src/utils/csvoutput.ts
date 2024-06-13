import { ApiUSerResponse } from '../types/index.js'
import fs from 'node:fs'
export default function ExportCSV(
  filename: string,
  data: Array<ApiUSerResponse>,
) {}
//
// const TestingData = JSON.parse(
//   fs.readFileSync('./user.data.template.json', 'utf8'),
import { json2csv } from 'json-2-csv'

fs.readFile('test_data.json', 'utf8', (err, data) => {
  if (err) {
    console.error(err)
    return 'null'
  }

  const jsonData = JSON.parse(data)
  console.log(jsonData[0].data)
  let x = json2csv(jsonData)
  fs.writeFileSync('template.csv', x)
})
//console.log(TestingData)
