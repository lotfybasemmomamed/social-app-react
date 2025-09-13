import axios from "axios";

export const getRandomPhotos = () =>
  axios.get("https://picsum.photos/v2/list?page=2&limit=100").then((res) => {
    const randomPhotosUrls = [];
    for (let i = 0; i <= 100; i++) {
      randomPhotosUrls[i] = res.data[i]?.download_url;
    }
    console.log("randomPhotosUrls", randomPhotosUrls);
    return randomPhotosUrls
  });
