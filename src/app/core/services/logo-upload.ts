import axios from "axios";

export const getAWSTokenForLogoUpload = async (jwtToken: string) => {
  let result;

  try {
    result = await axios.get(
      `${process.env.REACT_APP_SERVER_URL}/api/v1/upload-token/photo?file_extension=png`,
      {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      }
    );
  } catch (err) {
    console.log("errr", err);
  }

  console.log("result in aws token --> ", result?.data);
  return result?.data?.data;
};

export const uploadFileToAWS = async (
  url: string,
  formData: any,
  key: string
) => {
  return axios
    .post(url, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Accept: "application/json",
      },
    })
    .then((response) => {
      console.log("after file upload", response.data);
      return key;
    })
    .catch((err) => console.log(err));
};

export const updateServerWithLogoUploadData = async (
  jwtToken: string,
  logo_key: string,
  organization_id: number,
  name: string
) => {
  let result;

  try {
    result = await axios.put(
      `${process.env.REACT_APP_SERVER_URL}/api/v1/organization/${organization_id}/`,
      {
        organization: organization_id,
        // name,
        logo_key,
      },
      {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      }
    );
  } catch (err) {
    console.log("errr", err);
  }

  return result?.data;
};
