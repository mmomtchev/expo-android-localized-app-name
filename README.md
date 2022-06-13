# expo-android-localized-app-name

Support a localized application name with expo on Android

# Usage

```shell
yarn add -D @mmomtchev/expo-android-localized-app-name
```

Then add to your `app.config.js`:
```js
import withAndroidLocalizedName from '@mmomtchev/expo-android-localized-app-name';

export default {
    name: 'my app',
    locales: {
        fr: './fr.json'
    },
    ios: {
        // iOS support is built-in in expo
        infoPlist: {
            CFBundleAllowMixedLocalizations: true
        }
    },
    plugins: [
        withAndroidLocalizedName
    ]
};
```

Your `fr.json` should look like:
```json
{
    "CFBundleDisplayName": "mon app", // iOS
    "app_name": "mon app"             // Android
}
```