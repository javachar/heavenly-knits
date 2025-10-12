// app/sitemap.js
export default async function sitemap() {
  const base = 'https://heavenlyknits.com';
  return [
    { url: `${base}/`, lastModified: new Date() },
    { url: `${base}/privacy`, lastModified: new Date() },
    { url: `${base}/terms`, lastModified: new Date() },
  ];
}
