import cloudinary from 'cloudinary';

cloudinary.config({
  private_cdn: false,
  secure: true,
});

const cleanUrl = (url) => url.replace(/:(443|80)/, '');

export default function withCloudinary(_url = '', options) {
  const url = cleanUrl(_url);
  // If we call this function twice, only the first transform will be applied
  if (url.startsWith('https://res.cloudinary.com')) {
    return url;
  }
  if (process.env.CLOUDINARY_URL) {
    return cloudinary.url(url, {
      type: 'fetch',
      fetch_format: 'auto',
      width: '1600',
      crop: 'limit',
      ...options,
    });
  }
  return url;
}

export { cloudinary };
