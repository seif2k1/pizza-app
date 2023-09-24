"use client";
import { createClient } from "@sanity/preview-kit/client";
import imageUrlBuilder from "@sanity/image-url";

export const client = createClient({
  projectId: "k9cx9iux",
  dataset: "production",
  apiVersion: "2023-05-26",
  token:
    "skMzpwXRtW0I60Iut4n9zADfvu9DRAYbYSB5AefM4weN4qhaa6g5W6bz2rbaKwUyUAT22djDMnU2Ab7hv7z8D7zyMc4q49W2cD7oTuRYOPeWgH1ZTUlWzTTUdc3wreyaep4KW5jwbQl3xGTkV5iOL1UEX8jtc9oSwyuCcc38AjtHM2ECzixi",
  useCdn: true,

  ignoreBrowserTokenWarning: true,
});
const builder = imageUrlBuilder(client);
export async function handler({
  name,
  phone,
  address,
  total,
  descriptions,
  id,
  method,
}) {
  try {
    const response = await client.create({
      _type: `order`,
      id: id,
      method: method,
      descriptions: descriptions,
      name: name,
      number: phone,
      address: address,
      total: parseFloat(total),
      status: 1,
    });
    console.log(response);
  } catch (error) {
    console.log(error);
  }
}
export function urlFor(source) {
  return builder.image(source).url();
}
export async function getStaticProps() {
  const pets = await client.fetch(`*[_type=='pizza']`);
  return pets;
}
const Client = () => {
  return <div>client</div>;
};

export default Client;
