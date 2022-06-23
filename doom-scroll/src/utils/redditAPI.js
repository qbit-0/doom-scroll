const REDDIT_ACCESS_TOKEN_URL = "https://www.reddit.com/api/v1/access_token";
const CLIENT_ID = "LAo7rLD7LwxNjuyP3V5-1w";
const APP_ONLY_GRANT_TYPE = "https://oauth.reddit.com/grants/installed_client";
const DO_NOT_TRACK_THIS_DEVICE = "DO_NOT_TRACK_THIS_DEVICE";

const REDDIT_FETCH_BASE_URL = "https://oauth.reddit.com";

export const getAppToken = async () => {
  const url = new URL(REDDIT_ACCESS_TOKEN_URL);

  const headers = {
    "Content-Type": "application/x-www-form-urlencoded",
    Authorization: `Basic ${window.btoa(`${CLIENT_ID}:`).toString("base64")}`,
  };

  const body = new URLSearchParams();
  body.append("grant_type", APP_ONLY_GRANT_TYPE);
  body.append("device_id", DO_NOT_TRACK_THIS_DEVICE);

  const response = await fetch(url.href, {
    method: "POST",
    headers: headers,
    body: body,
  });

  const json = await response.json();

  return json;
};

export const fetchReddit = async ({ accessToken, pathname, search }) => {
  const url = new URL(`${REDDIT_FETCH_BASE_URL}${pathname}`);

  const params = new URLSearchParams(search);
  params.append("raw_json", "1");

  const stringUrl = `${url.href}?${params.toString()}`;

  const headers = {
    Authorization: `bearer ${accessToken}`,
  };

  const response = await fetch(stringUrl, {
    method: "GET",
    headers: headers,
  });

  const json = await response.json();
  return json;
};

export const fetchProfileImg = async (accessToken, author) => {
  const json = await fetchReddit({
    accessToken: accessToken,
    pathname: `/user/${author}/about`,
    search: "",
  });

  return json.data.icon_img;
};
