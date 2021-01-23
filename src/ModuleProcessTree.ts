import preprocessOptions from "./ModuleProcessOptions";
import path from "path";
import visit from "unist-util-visit";
import {embedCode} from "./ModuleEmbedCode";
import {OptionsSvg} from "./InterfaceOptions";



const ProcessTree = (tree: any, file: any,  options: OptionsSvg) => {
    const [l_embedKey, l_directory] = preprocessOptions(options);
    const directory = l_directory ? path.dirname(file.path) + l_directory : path.dirname(file.path)
    visit(tree, 'inlineCode', function (node: { type: string, value: string, lang: string }) {
        const {value} = node
        if (value.includes(l_embedKey)) {
            embedCode(node, l_embedKey, directory)
        }
    })
}

export default ProcessTree
