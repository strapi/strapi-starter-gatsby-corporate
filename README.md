# Strapi Starter Gatsby Corporate Site

Gatsby starter for creating a corporate site with Strapi.

## Getting started

Use our `create-strapi-starter` CLI to create your project.

```sh
# Using Yarn
yarn create strapi-starter my-site gatsby-corporate

# Or using NPM
npx create-strapi-starter my-site gatsby-corporate
```

The CLI will create a monorepo, install dependencies, and run your project automatically.

## Customize your corporate site

To edit this website, you'll need to run both the frontend and the backend in your development environment.

### Adding Sections

We have built sections for you, but you will likely want to add more to fit your needs. Follow these steps:

- Create a new component in Strapi in the "sections" category
- In the Content-Types Builder, open the Pages collection and check your new section on the `contentSections` field.
- Create a React component that takes a `data` prop in `/frontend/components/sections`
- To link your Strapi section to this React component, open `/frontend/components/sections.js`, and add an entry to the `sectionComponents` object.

### Custom theme

We use Tailwind CSS for styling. To modify your page's look, you can edit the theme in `/front/tailwind.config.js`. Read the [Tailwind docs](https://v1.tailwindcss.com/docs/theme) to view all the changes you can make. For example, you can change the primary color like this:

```js
const { colors } = require(`tailwindcss/defaultTheme`);

module.exports = {
  theme: {
    extend: {
      colors: {
        primary: colors.green,
      },
    },
  },
};
```
## Deploying to production

You will need to deploy the `frontend` and `backend` projects separately. Here are the docs to deploy each one:

* [Deploy Strapi](https://strapi.io/documentation/developer-docs/latest/admin-panel/deploy.html#deployment)
* [Deploy Gatsby](https://www.gatsbyjs.com/docs/deploying-and-hosting/)

Don't forget to set up your environment variables on your production apps.

Here are the required ones for the frontend:

- `GATSBY_STRAPI_URL`: URL of your Strapi backend, without trailing slash
- `PREVIEW_SECRET`: a random string used to protect your preview pages

And for the backend:

- `FRONTEND_URL`: URL of your frontend, without trailing slash

Have fun using this starter!
