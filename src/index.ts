import {OptionsSvg} from "./InterfaceOptions";
import ProcessTree from "./ModuleProcessTree";

/**
 * @description The nodes that fulfill the condition are searched. They are processed if they meet the conditions and their value is modified. The nodes arrive from Remark
 * @param options
 */
module.exports = (options: OptionsSvg) => {
    return async (tree: any, file: any) => ProcessTree(tree, file, options)
}

/**
 * doc: Plugin Remark: https://swizec.com/blog/how-to-build-a-remark-plugin-to-supercharge-your-static-site
 **/
