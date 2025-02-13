import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'

export default tseslint.config(
  { ignores: ['dist','node_modules'] },// 忽略 dist 和 node_modules 目录
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],//扩展推荐的 ESLint 配置
    files: ['**/*.{ts,tsx}'], // 适用于所有 .ts 和 .tsx 文件
    languageOptions: {
      ecmaVersion: 2020,// 使用 ECMAScript 2020 语法
      globals: globals.browser,// 使用浏览器全局变量
    },
    plugins: {
      'react-hooks': reactHooks,// 使用 react-hooks 插件
      'react-refresh': reactRefresh, // 使用 react-refresh 插件
    },
    rules: {
      ...reactHooks.configs.recommended.rules,// 使用 react-hooks 推荐的规则
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },// 允许常量导出
      ],

    },
  },
)
