import {nodeRecept} from "./InterfaceNode";
import {process_node} from "./ModuleProcessNode";
import fs from 'fs';


/**
 * @description It is sent to the function that resolves the file name and the complete path is resolved. Then the node is reconstructed.
 * @param node
 * @param embedKey
 * @param directory
 * @return nodeRecept
 */
export const embedCode = (node: nodeRecept, embedKey: string, directory: string) => {
        if (!fs.existsSync(directory)) {
                throw Error(`Invalid directory specified "${directory}"`)
        }
        const filename = process_node(node.value, embedKey, directory)
        const code = fs.readFileSync(directory + filename, 'utf8').trim()

        node.type = 'html'
        node.value = code
        node.lang = 'svg'
}
