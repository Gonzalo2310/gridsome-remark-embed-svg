import {OptionsSvg} from "./InterfaceOptions";

/**
 * @description It includes the functions to resolve the key and the directory of the parameters.
 * @param options
 * @return [string, string]
 */
const preprocessOptions: (options: OptionsSvg) => [ embedKey: string, directory: string ] = (options:OptionsSvg) => {
    return [
        processEmbedkey(options.embedKey),
        processDirectory(options.subdirectory)
    ]
}
/**
 * @description Validate the key. If it does not meet the conditions, 'svg' is assigned by default.
 * @param embedkey
 * @return string
 */
const processEmbedkey = (embedkey:string):string => {
   if (!embedkey || embedkey.trim().indexOf(' ') > -1) {
       return  'svg'
   }
   return embedkey.trim()
}
/**
 * @description if the directory parameter exists, it is verified that if it does not have the initial and final '/' it is placed. (more info README.MD)
 * @param directory
 * @return string
 */
const processDirectory =(directory: string):string => {
    const regex = /[/\s][\s/]/gm
    if (directory) {
        directory.trim()
        const char1 = directory.charAt(0)
        const char2 = directory.charAt(1)
        switch(char1) {
            case '/':
                break
            case '.':
                if (char2=== '/') directory=directory.substring(1)
                else directory='/' + directory.substring(1)
                break

        }
        if (directory.charAt(directory.length - 1) !== '/') directory += '/'
        directory = directory.replace(regex, '/')
    }
    return directory
}

export default preprocessOptions
