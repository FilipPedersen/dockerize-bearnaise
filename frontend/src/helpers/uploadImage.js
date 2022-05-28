import axios from 'axios';

/**
 * @summary helper for uploading files
 * @param {*} file
 * @usage
 * <template>
 *  ...
 *  <input type="file" @change="uploadRecipeThumbnail($event.target.files)" />
 *  ...
 * </template>
 *
 * <script>
 *  ...
 *  async function uploadRecipeThumbnail(files) {
 *    if (files?.length) {
 *      const result = await uploadImage(files[0]);
 *      console.log(result);
 *    }
 *  }
 *  ...
 * </script>
 * @returns {{ msg: string, file_name: string, bucket_name: string, error: string }}
 */
export default async function uploadImage(file) {
  const formData = new FormData();

  formData.append('image', file);

  const headers = { 'Content-Type': 'multipart/form-data' };

  return axios
    .post(`${process.env.VUE_APP_IMAGE_SERVICE}/upload-image`, formData, { headers })
    .then((res) => res?.data)
    .catch((error) => {
      console.error('uploadImage error', error);
      return error;
    });
}
