import {nextCharacter} from "./ModuleNextCharacter";
import fs from 'fs'

/**
 * @description Resolves the value of the node by searching for the name of the file to be embedded.
 * @param value
 * @param embedKey
 * @param directory
 *
 * @return string
 */
export const process_node = (value: string, embedKey:string, directory:string):string => {
    const length_embed_key:number = embedKey.length
    const position_embed_key:number = value.indexOf(embedKey)
    let filename = ''
    if (position_embed_key > -1) {
        const {character, position} = nextCharacter(value, position_embed_key + length_embed_key)
        if (character === ':') {
            const regex = /[A-Za-z.\S]+/
            const filename_position:number = value.substring(position + 1).search(regex)
            if (filename_position !== -1) {
                filename = value.substring(position + 1 + filename_position).split(' ', 1)[0]
                if (filename.charAt(0) === '.'&& filename.charAt(1) === '/') {
                    filename = filename.substring(1)
                }
                if (!fs.existsSync(directory + filename)) {
                    throw Error(`Invalid svg specified; no such file "${directory + filename}"`)
                }
            }
        }
    }
    return filename
}
