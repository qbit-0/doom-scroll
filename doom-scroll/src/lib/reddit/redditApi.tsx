import { More } from "./redditData";

const REDDIT_ACCESS_TOKEN_URL = "https://www.reddit.com/api/v1/access_token";
const CLIENT_ID = "LAo7rLD7LwxNjuyP3V5-1w";
const APP_ONLY_GRANT_TYPE = "https://oauth.reddit.com/grants/installed_client";
const DO_NOT_TRACK_THIS_DEVICE = "DO_NOT_TRACK_THIS_DEVICE";

const REDDIT_FETCH_HOSTNAME = "https://oauth.reddit.com";

export default class RedditApi {
    static getAppToken = async () => {
        const url = new URL(REDDIT_ACCESS_TOKEN_URL);

        const headers = {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: `Basic ${window.btoa(`${CLIENT_ID}:`)}`,
        };

        const body = new URLSearchParams();
        body.append("grant_type", APP_ONLY_GRANT_TYPE);
        body.append("device_id", DO_NOT_TRACK_THIS_DEVICE);

        const response = await fetch(url.href, {
            method: "POST",
            headers: headers,
            body: body,
        });

        return await response.json();
    };

    static fetchReddit = async (
        accessToken: string,
        pathname: string,
        searchStr: string
    ) => {
        const url = new URL(`${REDDIT_FETCH_HOSTNAME}${pathname}`);

        const newSearchParams = new URLSearchParams(searchStr);
        newSearchParams.append("raw_json", "1");

        const stringUrl = `${url.href}?${newSearchParams.toString()}`;

        const headers = {
            Authorization: `bearer ${accessToken}`,
        };

        const response = await fetch(stringUrl, {
            method: "GET",
            headers: headers,
        });

        return await response.json();
    };

    static fetchMoreJson = async (
        accessToken: string,
        more: More,
        articleId: string,
        searchStr: string
    ) => {
        const searchParams = new URLSearchParams(searchStr);
        searchParams.append("api_type", "json");
        searchParams.append("children", more.data["children"].join(","));
        searchParams.append("id", more.data["name"]);
        searchParams.append("link_id", articleId);

        return await this.fetchReddit(
            accessToken,
            "/api/morechildren",
            searchParams.toString()
        );
    };

    static fetchProfileImg = async (accessToken: string, author: string) => {
        let json;
        json = await this.fetchReddit(accessToken, `/user/${author}/about`, "");

        return json.data.icon_img;
    };
}
