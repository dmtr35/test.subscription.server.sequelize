import * as path from 'path'
import * as fs from 'fs'
import util from 'util'
const __dirname = path.resolve()


class FilesService {

    async createFile(file) {
        try {

            const fileWords = []
            const filePath = path.resolve(__dirname, 'static')
            if (!fs.existsSync(filePath)) {
                fs.mkdirSync(filePath, { recursive: true })
            }
            await file.mv(path.resolve(__dirname, 'static', 'dictionary.txt'))
            const readFile = util.promisify(fs.readFile)
            const result = await readFile(path.resolve(__dirname, './static/dictionary.txt'), 'utf-8')
            result.split(/\r?\n/).forEach(line => {
                if (line.length === 0) {
                    return
                } else {
                    const word = `${line}`.split(';')
                    const objWord = Object.assign({ eng: word[0], rus: word[1] })
                    fileWords.push(objWord)
                }
            })
            return fileWords
        } catch (e) {
            console.log(e)
            res.status(500).json({ message: 'Create file error ' + e })
        }
    }
}


export default new FilesService