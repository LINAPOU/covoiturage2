import AxiosApi from "./AxiosApi";

export const PublicationLoader = async ({ request, params }) => {
  const res = await AxiosApi("/trajet/" + params.id);
  return res.data;
};

