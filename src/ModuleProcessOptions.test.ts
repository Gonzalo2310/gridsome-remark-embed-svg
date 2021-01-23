import preprocessOptions from './ModuleProcessOptions'
import {OptionsSvg} from "./InterfaceOptions";
const optionsTest:Array<OptionsSvg> = [
    {embedKey: 'svg', subdirectory:'/image'},
    {embedKey: 'sv g  ', subdirectory:'./image'},
    {embedKey: 'misvg', subdirectory:'/image/svg'},
    {embedKey: 'mi svg', subdirectory:'/image /svg'}
]

test('Process Options test normal', () =>{
    expect(preprocessOptions(optionsTest[0])).toStrictEqual([ 'svg', '/image/' ])
})


test('Process Options test: space en embedKey and reference en local subdirectory', () =>{
    expect(preprocessOptions(optionsTest[1])).toStrictEqual([ 'svg', '/image/' ])
})


test('Process Options test: change embedKey and large subdirectory', () =>{
    expect(preprocessOptions(optionsTest[2])).toStrictEqual([ 'misvg', '/image/svg/' ])
})

test('Process Options test: space in subdirectory', () =>{
    expect(preprocessOptions(optionsTest[3])).toStrictEqual([ 'svg', '/image/svg/' ])
})
