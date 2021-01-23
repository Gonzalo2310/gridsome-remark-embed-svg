import {nextCharacter} from "./ModuleNextCharacter"

test('Next character test normal', () =>{
    expect(nextCharacter('svg:', 3)).toStrictEqual({
        character: ':',
        position: 3
    })
})

test('Next character test excess spaces', () =>{
    expect(nextCharacter('svg   :', 3)).toStrictEqual({
        character: ':',
        position: 6
    })
})

test('Next character test: error ', () =>{
    expect(nextCharacter('svg', 3)).toStrictEqual({
        character: '',
        position: -1
    })
})
