import type { NodePlopAPI } from 'node-plop';
import { CSS_PROCESSORS } from '../shared.js';
export default function (plop: NodePlopAPI) {
  plop.setGenerator('v3-ts-component', {
    description: 'generate vue3 component with typescript',
    prompts: [
      {
        type: 'input',
        name: 'componentName',
        message: '请输入组件名',
      },
      {
        type: 'checkbox',
        name: 'blocks',
        message: '请选择组件中要包含的模块',
        choices: [
          {
            name: '<template>',
            value: 'template',
            checked: true,
          },
          {
            name: '<script>',
            value: 'script',
            checked: true,
          },
          {
            name: '<style>',
            value: 'style',
            checked: false,
          },
        ],
        validate(value) {
          if (
            value.indexOf('script') === -1 &&
            value.indexOf('template') === -1
          ) {
            return 'Component require at least a <script> or <template> tag';
          }
          return true;
        },
      },
      {
        type: 'list',
        name: 'processor',
        message: '请选择CSS预处理器',
        choices: CSS_PROCESSORS,
        when({ blocks }) {
          return blocks.includes('style');
        },
      },
      {
        type: 'confirm',
        name: 'isGlobal',
        message: '是否为全局组件?',
        default: false,
      },
    ],
    actions: (data: any) => {
      const name = '{{properCase componentName}}';
      const path = data.isGlobal
        ? `src/components/global/${name}/index.vue`
        : `src/components/${name}/index.vue`;

      return [
        {
          type: 'add',
          path: path,
          templateFile: './template.hbs',
          data: {
            name: name,
            template: data.blocks.includes('template'),
            script: data.blocks.includes('script'),
            style: data.blocks.includes('style'),
            lang: data.processor,
          },
        },
      ];
    },
  });
}
