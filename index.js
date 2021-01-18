const fs = require(`fs`)
const path = require(`path`)
const visit = require('unist-util-visit')

let localOptions = {}

const nextCaracter = (line_string, position) => {
  const regex = /[^\d\s]/
  let line = line_string.substring(position)
  let character_position = line.search(regex)
  return {
    character: character_position > -1 ? line.charAt(character_position) : '',
    position: character_position + position
  }
}

const process_node = (node) => {
  const {value} = node
  let length_embed_key = localOptions.embedKey.length
  let position_embed_key = value.indexOf(localOptions.embedKey)
  let position_embed_key_final = 0
  let filename = ''
  if (position_embed_key > -1) {
    let {character, position} = nextCaracter(value, position_embed_key + length_embed_key)
    if (character === ':') {
      position_embed_key_final = position
      let regex = /[A-Za-z.\S]+/
      let filename_position = value.substring(position_embed_key_final + 1).search(regex)
      if (filename_position !== -1) {
        filename = value.substring(position_embed_key_final + 1 + filename_position).split(' ', 1)[0]
        if (filename.charAt(0) === '.') {
          filename = filename.substring(1)
        }
        if (!fs.existsSync(localOptions.directory + filename)) {
          throw Error(`Invalid svg specified; no such file "${localOptions.directory + filename}"`)
        }
      }
    }
  }
  return filename
}

const embedCode = (node) => {
  try {
    if (!fs.existsSync(localOptions.directory)) {
      throw Error(`Invalid directory specified "${localOptions.directory}"`)
    }
    let filename = process_node(node)
    const code = fs.readFileSync(localOptions.directory + filename, 'utf8').trim()

    node.type = 'html'
    node.value = code
    node.lang = 'svg'
  } catch (error) {
    console.log(error)
    throw error
  }
}

const preprocessOptions = (options) => {
  let directory = options.subdirectory || ''
  let embedKey = options.embedKey || 'svg'

  if (directory) {
    let temp_directory = directory.trim()
    if (temp_directory.charAt(0) !== '/') {
      temp_directory = '/' + temp_directory
    }
    if (temp_directory.charAt(temp_directory.length - 1) !== '/') {
      temp_directory += '/'
    }
    directory = temp_directory
  }
  embedKey = embedKey.trim()
  if (embedKey.indexOf(' ') > -1) {
    embedKey = 'svg'
  }

  return {
    directory,
    embedKey
  }
}

module.exports = (options) => {
  return async (tree, file) => {
    localOptions = preprocessOptions(options)
    localOptions.directory = localOptions.directory ? path.dirname(file.path) + localOptions.directory : path.dirname(file.path)

    visit(tree, 'inlineCode', (node) => {
      const {value} = node
      if (value.includes(localOptions.embedKey)) {
        embedCode(node)
      }
    })

  }
}
