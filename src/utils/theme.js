import axios from 'axios'
import color from 'css-color-function' // 基于主色生成不同好的白色程度
import rgbHex from 'rgb-hex' // 转化16进制

import { colorMap, colorTables } from '@/commom/commom.js'
// 生成的最终的样式
export const generateNewStyle = async (primary) => {
  if (!primary) return
  //  1.获取所有的element样式 请求css样式地址https://unpkg.com/element-plus@1.2.0-beta.3/dist/index.css
  const originalstyle = await getOriginalStyle()

  // 2.找出需要替换的样式做标记
  let newStyle = getStyleTemplate(originalstyle)
  // 3.根据主色生成相应的情景色
  const newColor = generateColor(primary)
  // 4.在newStyle中的模板中将标记都替换成生成的色值
  Object.keys(newColor).forEach(key => {
    newStyle = newStyle.replace(new RegExp('(:|\\s+)' + key, 'g'), '$1' + newColor[key])
  })
  return newStyle
}
export const getOriginalStyle = async () => {
  const version = require('element-plus/package.json').version
  const url = `https://unpkg.com/element-plus@${version}/dist/index.css`
  const { data } = await axios.get(url)
  return data
}
const getStyleTemplate = (Style) => {
  Object.keys(colorMap).forEach(key => {
    const value = colorMap[key]
    Style = Style.replace(new RegExp(key, 'gi'), value)
  })
  return Style
}
export const generateColor = (primary) => {
// 根据主色生成对应的情景色
  const colors = {
    primary: primary
  }
  Object.keys(colorTables).forEach(key => {
    // 将主色应用到color函数中
    const value = colorTables[key].replace(new RegExp(/primary/g), primary)
    // 生成16进制的颜色 列:color("#cc" tint(10%))
    colors[key] = '#' + rgbHex(color.convert(value))
  })
  return colors
}
// 将生成的样式写入到head标签中
export const writeStyleToHearTag = (newStyle) => {
  const style = document.createElement('style')
  style.innerHTML = newStyle
  document.head.appendChild(style)
}
