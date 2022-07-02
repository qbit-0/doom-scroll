import React from "react";
import { FC } from "react";

import ImagePreview from "components/ImagePreview/ImagePreview";
import SanitizeHTML from "components/SanitizeHTML/SanitizeHTML";
import Gallery from "components/Gallery/Gallery";

type Props = {
    post: any;
};

const Body: FC<Props> = ({ post }) => {
    if (post.data["selftext_html"]) {
        return (
            <div className="flex max-h-96 overflow-auto overflow-ellipsis px-4 ">
                <SanitizeHTML dirty={post.data["selftext_html"]} />
            </div>
        );
    }

    if (post.data?.["media"]?.["oembed"]?.["html"]) {
        return (
            <div className="flex max-h-96 overflow-auto overflow-ellipsis px-4">
                <SanitizeHTML dirty={post.data["media"]["oembed"]["html"]} />
            </div>
        );
    }

    if (post.data?.["media"]?.["reddit_video"]?.["dash_url"]) {
        return (
            <div className="flex h-96 justify-center overflow-auto bg-neutral-700">
                <video
                    playsInline
                    width={post.data["media"]["reddit_video"]["width"]}
                    height={post.data["media"]["reddit_video"]["height"]}
                    muted
                    loop
                    preload="auto"
                    controls
                    poster={
                        post.data["preview"]["images"]["0"]["source"]["url"]
                    }
                >
                    <source
                        src={post.data["media"]["reddit_video"]["dash_url"]}
                    />
                    <source
                        src={post.data["media"]["reddit_video"]["hls_url"]}
                    />
                    <source
                        src={post.data["media"]["reddit_video"]["fallback_url"]}
                    />
                    <source
                        src={
                            post.data["media"]["reddit_video"][
                                "scrubber_media_url"
                            ]
                        }
                    />
                    Your browser does not support the video tag.
                </video>
            </div>
        );
    }

    if (post.data?.["gallery_data"]?.["items"]) {
        return (
            <div className="flex justify-center bg-neutral-700">
                <Gallery
                    srcs={Object.values(post.data["gallery_data"]["items"]).map(
                        ({ media_id }: any) =>
                            post.data["media_metadata"][media_id]["s"]["u"]
                    )}
                />
            </div>
        );
    }

    if (post.data?.["preview"]?.["images"]?.["0"]?.["source"]?.["url"]) {
        return (
            <div className="flex justify-center bg-neutral-700">
                <ImagePreview
                    src={post.data["preview"]["images"]["0"]["source"]["url"]}
                    href={post.data["url_overridden_by_dest"]}
                />
            </div>
        );
    }

    if (post.data["post_hint"] === "image") {
        return (
            <div className="flex justify-center bg-neutral-700">
                <ImagePreview
                    src={post.data["url_overridden_by_dest"]}
                    href={post.data["url_overridden_by_dest"]}
                />
            </div>
        );
    }

    if (
        post.data?.["thumbnail"] !== "default" &&
        post.data?.["thumbnail"] !== "self"
    ) {
        return (
            <div className="flex justify-center bg-neutral-700">
                <ImagePreview
                    src={post.data["thumbnail"]}
                    href={post.data["url_overridden_by_dest"]}
                />
            </div>
        );
    }

    return null;
};

export default Body;
