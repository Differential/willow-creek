import gql from 'graphql-tag';
import ImagePicker from 'react-native-image-picker';
import { client } from 'apolloschurchapp/src/client';
import { ReactNativeFile } from 'apollo-upload-client';

const options = {
  title: 'Select Profile Image',
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};

function showImagePicker() {
  return new Promise((resolve, reject) => {
    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {
        resolve({ cancelled: true });
      } else if (response.error) {
        reject(response.error);
      } else {
        resolve(response);
      }
    });
  });
}

export default async ({ onUpload = () => ({}) }) => {
  const image = await showImagePicker();
  const file = new ReactNativeFile({
    uri: image.uri,
    name: image.fileName,
    type: 'image/jpeg',
  });
  onUpload();
  return client.mutate({
    mutation: gql`
      mutation uploadProfileImage($file: Upload!, $size: Int!) {
        uploadProfileImage(file: $file, size: $size) {
          firstName
          lastName
        }
      }
    `,
    variables: { file, size: image.fileSize },
  });
};
