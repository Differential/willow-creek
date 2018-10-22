import withCloudinary, { cloudinary } from '../cloudinary';

const originalUrl =
  'https://apollosrock.newspring.cc/GetImage.ashx?guid=f54b0db0-95f5-44ad-b8f2-8bcd1b23cfdb';
describe('Cloudinary', () => {
  beforeEach(() => {
    process.env.CLOUDINARY_URL =
      'cloudinary://123456789012345:abcdeghijklmnopqrstuvwxyz12@n07t21i7';

    // force cloudinary to use the env variable.
    cloudinary.config(true);
    cloudinary.config({
      private_cdn: false,
      secure: true,
    });
  });
  afterEach(() => {
    delete process.env.CLOUDINARY_URL;
  });
  it('must return the URL if CLOUDINARY_URL is not specified', () => {
    delete process.env.CLOUDINARY_URL;
    cloudinary.config(true);

    const url = withCloudinary(originalUrl);

    expect(url).toEqual(originalUrl);
  });
  it('must return a cloudinary fetch URL if CLOUDINARY_URL is defined', () => {
    const url = withCloudinary(originalUrl);

    expect(url).toEqual(
      'https://res.cloudinary.com/n07t21i7/image/fetch/c_limit,f_auto,w_1600/https://apollosrock.newspring.cc/GetImage.ashx%3Fguid%3Df54b0db0-95f5-44ad-b8f2-8bcd1b23cfdb'
    );
  });
  it('must not double parse a cloudinary url.', () => {
    const url = withCloudinary(originalUrl);
    const doubledParsed = withCloudinary(url);

    expect(url).toEqual(doubledParsed);
  });
});
