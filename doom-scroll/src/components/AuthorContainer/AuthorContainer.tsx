import { useAppDispatch } from "App/store";
import Author from "components/Author/Author";
import { selectAccessToken, updateAppToken } from "features/auth/authSlice";
import RedditApi from "lib/reddit/redditApi";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

type Props = {
    author: string;
    createdUtc: number;
};

const AuthorContainer: React.FC<Props> = ({ author, createdUtc }) => {
    const accessToken = useSelector(selectAccessToken);
    const [profileImg, setProfileImg] = useState(null);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (accessToken === null) {
            dispatch(updateAppToken());
        }
    }, [dispatch, accessToken]);

    useEffect(() => {
        if (accessToken !== null && author !== "[deleted]") {
            RedditApi.fetchProfileImg(accessToken, author).then(
                (fetchedProfileImg) => {
                    setProfileImg(fetchedProfileImg);
                }
            );
        }
    }, [accessToken, author]);

    return (
        <Author
            author={author}
            profileImg={profileImg}
            createdUtc={createdUtc}
        />
    );
};

export default AuthorContainer;
