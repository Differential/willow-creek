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

## Creating a new release

Creating a release within the Apollos Church application is pretty simple! After you have pulled down the master branch and made sure every PR has been merged, the process is short:

#### Create the release

Checkout to a release branch first
```bash
# For example, version 2.7.1
git checkout -b release-v2.7.1
```

Then, run the release script
```bash
yarn release
```

After creating a release, changelog files will be updated. Make sure to read over the changelog messages, and make any edits necessary. If you make any edits, you'll want to amend the commit created by `yarn release`:

```bash
git commit --amend
```

Lastly, push up the new tag:

```bash
git push --tags
```

...And that is it! Create your new PR and set it for review.

## Inline Documentation

We're using the [JSDoc](http://usejsdoc.org/index.html) standard for comments in our code. Generally speaking, we just want to make
sure that anyone coming into the code can understand what is happening in any particular component or function.

#### A Few Standards

- Add a comment just above your class/component definition describing what the component does:

```javascript
/**
 * This is where the component description lives
 * A FeedView wrapped in a query to pull content data.
 */
class ContentFeed extends PureComponent {
```

- Add a comment just ahead of any functions:

```javascript
/** Function that is called when a card in the feed is pressed.
 * Takes the user to the ContentSingle
 */
handleOnPress = item =>
  this.props.navigation.navigate("ContentSingle", {
    itemId: item.id,
    itemTitle: item.title,
  })
```

- Add comments around your prop types:

```javascript
static propTypes = {
  /** Functions passed down from React Navigation to use in navigating to/from
   * items in the feed.
   */
  navigation: PropTypes.shape({
    getParam: PropTypes.func,
    navigate: PropTypes.func,
  }),
};
```

🍕🍕🍕