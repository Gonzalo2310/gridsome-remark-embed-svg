#  Gridsome Remark Embed Svg

La finalidad de este plugin es embeber el código de un svg en el markdown renderizado.

### Instalación

**¡¡Cuidado!!**: Este plugin depende del plugin [@gridsome/transformer-remark](https://github.com/gridsome/gridsome/tree/master/packages/transformer-remark).

```bash
npm install gridsome-remark-embed-svg
yarn add gridsome-remark-embed-svg
```

#### Configuración básica.

El plugin debe estar **antes** del plugin de **@gridsome/remark-prismjs** en la configuración del **gridsome.config.js** para funcionar correctamente.

Esto es porque el **primjs** transpilara el código markdown a html y entonces se perderán las marcas necesarias para que el plugin funcione.

Ejemplo:

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

#### Funcionamiento básico:

Usando esta estructura de ejemplo el código agregado en nuestro markdown seria:

```
`svg: ./images/vue-jquery.svg`
```

### Avanzado. Uso. Configuración. Personalización.

El plugin permite configurar 2 parámetros.

#### Configuración de un plugin en Gridsome:

Cuando pasamos parámetros a un plugin en **gridsome** la forma de escribirlo en el **gridsome.config.js** cambia levemente:

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

#### Parámetros configurables:

* **embedKey: string** // String debe ser una palabra sin espacios. por defecto el valor es 'svg' pero puede cambiarse por cualquier otro.

Ejemplo: 

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

Esta configuración cambiaría el código antes mostrado de la siguiente forma;

```
`MyEmbed: ./images/vue-jquery.svg`
```

* **subdirectory: string** // String es el camino por defecto para buscar los svg.

Ejemplo: 

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

Esta configuración cambiaría el código antes mostrado de la siguiente forma;

```
`svg: vue-jquery.svg`
```

En definitiva la configuración siguiente: 

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

es igual a:

```javascript
transformers: {
  remark: {
   ...
    plugins: [
        ['gridsome-remark-embed-svg',
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

### Colaboración.

Problemas, comentarios, mejoras, adaptaciones, etc. esta abierto a través de las issues. PR serán bienvenidos con el comentario adecuado y/o la documentación.