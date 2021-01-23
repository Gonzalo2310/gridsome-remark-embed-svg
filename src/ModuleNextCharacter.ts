/**
 * @description Delete spaces until a valid character is found.
 * @param line_string
 * @param position
 */
export const nextCharacter = (line_string: string, position: number) => {
    const regex = /[^\d\s]/
    const line: string = line_string.substring(position)
    const character_position:number = line.search(regex)
    return {
        character: character_position > -1 ? line.charAt(character_position) : '',
        position: character_position > -1 ? character_position + position : character_position
    }
}
