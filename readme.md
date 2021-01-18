#  Gridsome Remark Embed Svg

The purpose of this plugin is to embed the code of an svg in the rendered markdown.

### Installation

**Careful!:** This plugin depends on the [@gridsome/transformer-remark](https://github.com/gridsome/gridsome/tree/master/packages/transformer-remark)  plugin.

```bash
npm install gridsome-remark-embed-svg
yarn add gridsome-remark-embed-svg
```

#### Basic configuration.

The plugin must be **before** the **@gridsome/remark-prismjs** plugin in the **gridsome.config.js** configuration to work properly.

This is because the **primjs** will transpose the markdown code to html and then the markups necessary for the plugin to work will be lost.

Example:

```javascript
transformers: {
  remark: {
   ...
    plugins: [
        'gridsome-remark-embed-svg',
        ....
        '@gridsome/remark-prismjs',
      ....
    ]
  }
}
```

#### Basic operation:

Using this example structure the code added in our markdown would be:

```
`svg: ./images/vue-jquery.svg`
```

### Advanced. Usage. Configuration. Customization.

The plugin allows to configure 2 parameters.

#### Plugin configuration in Gridsome:

When we pass parameters to a plugin in **gridsome** the way to write it in the **gridsome.config.js** changes slightly:

```javascript
transformers: {
  remark: {
   ...
    plugins: [
        [
            'gridsome-remark-embed-svg',
            {
                parameter: value
            }
         ],
        ....
        '@gridsome/remark-prismjs',
      ....
    ]
  }
}
```

#### Configurable parameters:

* **embedKey: string** // String must be a word without spaces. By default the value is 'svg' but it can be changed by any other.

Example: 

 ```javascript
transformers: {
  remark: {
   ...
    plugins: [
        [
            'gridsome-remark-embed-svg',
            {
                embedKey: 'MyEmbed'
            }
         ],
        ....
        '@gridsome/remark-prismjs',
      ....
    ]
  }
}
 ```

This setting would change the code previously shown in the following way;

```
`MyEmbed: ./images/vue-jquery.svg`
```

* **subdirectory: string** // String is the default path to search for svg.

Example: 

 ```javascript
transformers: {
  remark: {
   ...
    plugins: [
        [
            'gridsome-remark-embed-svg',
            {
                subdirectory: 'images'
            }
         ],
        ....
        '@gridsome/remark-prismjs',
      ....
    ]
  }
}
 ```

This setting would change the code previously shown in the following way;

```
`svg: vue-jquery.svg`
```

In short, the following configuration: 

```javascript
transformers: {
  remark: {
   ...
    plugins: [
        'gridsome-remark-embed-svg',
        ....
        '@gridsome/remark-prismjs',
      ....
    ]
  }
}
```

is equal to:

```javascript
transformers: {
  remark: {
   ...
    plugins: [
        [
            'gridsome-remark-embed-svg',
         {
             embedKey: 'svg',
             subdirectory: ''
         }
        ],
        ....
        '@gridsome/remark-prismjs',
      ....
    ]
  }
}
```

### Collaboration.

Problems, comments, improvements, adaptations, etc. is open through the issues. PR will be welcome with appropriate commentary and/or documentation.
