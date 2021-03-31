# gatsby-plugin-graphql-image

## Description

Traverses a grapqhl schema sourced from the [gatsby-source-graphql](https://www.gatsbyjs.org/packages/gatsby-source-graphql) plugin and generates file nodes for use with [gatsby-plugin-sharp](https://www.gatsbyjs.org/packages/gatsby-plugin-sharp) and [gatsby-transformer-sharp](https://www.gatsbyjs.org/packages/gatsby-transformer-sharp).

### Dependencies

[gatsby-source-graphql](https://www.gatsbyjs.org/packages/gatsby-source-graphql)<br/>
[gatsby-source-filesystem](https://www.gatsbyjs.org/packages/gatsby-source-filesystem)<br/>
[gatsby-plugin-sharp](https://www.gatsbyjs.org/packages/gatsby-plugin-sharp)<br/>
[gatsby-transformer-sharp](https://www.gatsbyjs.org/packages/gatsby-transformer-sharp)


## How to install

```
npm i -D gatsby-plugin-graphql-image
```

## Available options

`images` - An array of objects with these options <br/>
  - `schemaName` - The typeName value of your graphql source from the gatsby-source-grapql plugin <br/>
  - `typeName` - The actual graphQL typeName (you can query `__typename` in GraphiQL to get the actual typeName)  <br/>
  - `fieldName` - The name of the field that contains your image URLs <br/>
  - `baseUrl` - (optional) A base url to use in case the values are not absolute paths

## Examples of usage

```js
{
  resolve: "gatsby-source-graphql",
  options: {
    typeName: "ROCKETMAKERS",
    fieldName: "rocketmakers",
    url: "https://rocketmakers.com/graphql"
  }
},
{
  resolve: 'gatsby-plugin-graphql-image',
  options: {
    images: [
      {
        schemaName: 'ROCKETMAKERS',
        typeName: 'ROCKETMAKERS_UploadFile',
        fieldName: 'url',
        baseUrl: 'https://rocketmakers.com',
      },
    ]
  }
}
```

