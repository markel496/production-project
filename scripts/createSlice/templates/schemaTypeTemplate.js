module.exports = (sliceName) =>
  `export interface ${sliceName}Schema {
    
}`.replace(/\n/g, '\r\n')
