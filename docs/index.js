const fs = require('fs');
const path = require('path');

const resolve = (dirname) => path.resolve(__dirname, dirname);
// 在slidebar.json写入sidebarItems
const slideBarJson = require('./docs/slidebar.json')
slideBarJson.length = 0;

/**
 * 是否存在目录
 * @param {*} docsPath 
 * @returns 
 */
const isExitFirDir = (docsPath) => fs.existsSync(docsPath)


// 读取指定目录下面的文件，来读取下一级的readme.md文件，然后将它移动到对应目录的下面，当作是docs的一个文件夹

/**
 * 自动生成slidebar.json文件
 * @param {*} dirName 目录名称
 * @param {*} index 索引
 * @param {*} title 一级标题
 */
const autoGenrateSlidebarJson = (dirName, title, assetsDirName = 'assets') => {
  // let dirName = 'vue3-analysis'

  // 拼接源码的路径
  const originPath = resolve(`./../${dirName}`)

  const dirFiles = fs.readdirSync(originPath)

  // 构建docs 目录的路径
  const docsPath = resolve(`./docs/${dirName}`)

  if (!isExitFirDir(docsPath)) {
    // 创建目录
    fs.mkdirSync(docsPath)
  }

  const sidebarItems = []
  dirFiles.forEach(subFile => {
    if (subFile.endsWith('.md')) {
      fs.copyFileSync(`${originPath}/${subFile}`, `${docsPath}/${subFile}`)
      sidebarItems.push({ text: subFile.split('.md')[0], link: `/${dirName}/${subFile}` })
    }

    // 判断是否存在静态资源文件assets
    const assertsPath = `${originPath}/${subFile}`
    if (subFile === assetsDirName) {
      if (fs.existsSync(assertsPath)) {
        // 建立目录
        const subDirName = resolve(`./docs/${dirName}/${subFile}`)
        if (!isExitFirDir(subDirName)) {
          // 创建目录
          fs.mkdirSync(subDirName)
        }
        // 把里面的所有文件文件夹都copy到docs目录下面
        copyAllFiles(assertsPath, `${docsPath}/${subFile}`)
      }
    }

  })


  // 对sidebar进行排序
  sidebarItems.sort((a, b) => {
    // 拿到 9-init-comp-mount 进行排序
    const aText = a.text.split('-')[0]
    const bText = b.text.split('-')[0]
    return Number(aText) > Number(bText) ? 1 : -1
  })



  let index = slideBarJson.length;
  let obj = {
    items: sidebarItems,
    collapsible: true,
    title: title
  }
  slideBarJson[index] = obj
  fs.writeFileSync(resolve(`./docs/slidebar.json`), JSON.stringify(slideBarJson))
}




(() => {
  //
  autoGenrateSlidebarJson('概念', '概念')
  autoGenrateSlidebarJson('数据认知', '数据认知')
  autoGenrateSlidebarJson('坐标系', '坐标系')
})()


// node 递归拷贝所有的文件和文件夹
function copyAllFiles(dirPath, targetPath) {
  // 判断dirPath是文件还是文件夹
  const stats = fs.statSync(dirPath)
  if (stats.isFile()) {
    // 判断targetPath的上一级是不是文件夹
    const targetDirPathArr = targetPath.split('/')
    const targetDirPath = targetDirPathArr.slice(0, targetDirPathArr.length - 1).join('/')
    if (!isExitFirDir(targetDirPath)) {
      // 创建目录
      fs.mkdirSync(targetDirPath)
    }
    // 直接copy到targetPath目录下面
    fs.copyFileSync(dirPath, targetPath)
    return
  } else if (stats.isDirectory()) {
    // 读取所有的文件
    const files = fs.readdirSync(dirPath)
    files.forEach(file => {
      copyAllFiles(`${dirPath}/${file}`, `${targetPath}/${file}`)
    })
  } else {
    console.log(`${dirPath}不是文件也不是文件夹`)
  }
}
