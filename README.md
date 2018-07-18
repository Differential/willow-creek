# apollos-prototype

iOS - [![Build status](https://build.appcenter.ms/v0.1/apps/7371d424-46b8-4202-9e79-46eafa64081a/branches/master/badge)](https://appcenter.ms)

Android - [![Build status](https://build.appcenter.ms/v0.1/apps/042a93dd-9ade-4695-9b41-8307c9acf4b9/branches/master/badge)](https://appcenter.ms)

## Contributing to the Apollos Project

Open Source development is a key piece in the mission of the Apollos Project. We promote and encourage individuals to help contribute to this project, but we want to make sure you contribute within certain guidelines to keep unity within the community and the codebase.

Below you will find the tools and rules we use when developing within the Apollos Project.

### ESLint

We use ESLint in collaboration with Prettier to keep code clean and free of potential errors. Our ESLint configuration is dependent on the [eslint-config-airbnb](https://github.com/airbnb/javascript/tree/master/packages/eslint-config-airbnb) package.

ESLint and all required packages are built-in so once you `yarn`, you'll have the linter enabled. However, Prettier will need to be downloaded using your preferred code editor.

#### Install/Configure using Atom

- Prettier is a package you can download by going to Preferences > Install > search "Prettier"
- Download the package, "prettier-atom"
- In the settings menu for the package, make sure `ESLint Integration` is checked.

#### Install/Configure using VS Code

- You actually don't need the Prettier extension on VS code, just the ESLint extension
- Download the ESLint extension by clicking the `Extension` icon and searching for `ESLINT`
- Open up your `USER_SETTINGS` by going to Preferences > Settings
- Make sure your settings have the following:

```json
{
  "editor.formatOnSave": true,
  "[javascript]": {
    "editor.formatOnSave": false
  },
  "eslint.autoFixOnSave": true,
  "eslint.alwaysShowStatus": true
}
```

#### Install/Configure using Sublime

- You will need to install the [sublime-prettier](https://github.com/danreeves/sublime-prettier) plugins
- Make sure you go through the above links instructions to correctly install this plugin.
