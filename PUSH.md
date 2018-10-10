# Instructions for Sending a Push Message

1. Login to [One Signal](https://onesignal.com/)

- For access, contact Conrad, Vincent, or Dan

2. Open the App in a device capable of receiving push notifications.

- You can use
  - Genymotion _after_ installing Google Play Services
  - The iOS app running on an actual device
  - The Android Simulator launched through Android Studio

3. In the ["Users -> View All Users"](https://onesignal.com/apps/b6e75a77-003f-4466-95ca-82cc5cdc407b/segments) section of OneSignal, add your device to the test devices.

- Your device is probably at the top of the list. Double check that the model matches your device.
- Click "Options -> Add To Test Users"

4. One the Messages Tab, create a [New Push](https://onesignal.com/apps/b6e75a77-003f-4466-95ca-82cc5cdc407b/notifications/new)

- Select your Test Device as the recipient. ("Send To Test Devices -> 'Test Device Name'")

5. Fill in the Push Details.

- Use anything you want as the Title/Message
- Under "Additional Properties", add "url" : "apolloschurchapp://AppStackNavigator/Connect" to navigate when the notification is received. Any deep linking URL is supported.
- Other test urls: "apolloschurchapp://AppStackNavigator/ContentSingle?ItemId=DevotionalContentItem:bdc2c29b85949e4ca8232b373a07953d"

6. Send the Push!
