# Storybook Addon: Component source

Storybook Addon Component source allows you to view your component template in [storybook](https://storybook.js.org) addon panel.

Framework Support : Vue, React(Coming soon...)

![Storybook Addon Notes Demo](docs/demo.png)

## Getting Started

```sh
yarn add -D component-source
```

Then create a file called `addons.js` in your Storybook config.

Add following content to it:

```js
// register the notes addon as a tab
import 'component-source/register';
```

Now, you can use the `source` parameter to add a note to each story.

### Vue

```js
import { storiesOf } from '@storybook/vue';

import MyButton from '../src/components/MyButton.vue';

storiesOf('MyButton', module).add(
  'with some emoji',
  () => ({
    components: { MyButton },
    template: '<my-button>😀 😎 👍 💯</my-button>',
  }),
  { 
      source: {
        // Note: Path should be start from /src/ and must be end with file extension
           publicPath:'/src/components/MyButton.vue'
      },
  }
);
```