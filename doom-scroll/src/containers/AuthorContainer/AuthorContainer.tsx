import Author from "components/Author/Author";
import { selectAccessToken } from "features/auth/authSlice";
import RedditApi from "lib/reddit/redditApi";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

type Props = {
    author: string;
    createdUtc: number;
};

const AuthorComponent: React.FC<Props> = ({ author, createdUtc }) => {
    const accessToken = useSelector(selectAccessToken);
    const [profileImg, setProfileImg] = useState(null);

    useEffect(() => {
        if (accessToken !== null && author !== "[deleted]") {
            try {
                RedditApi.fetchProfileImg(accessToken, author).then(
                    (fetchedProfileImg) => {
                        setProfileImg(fetchedProfileImg);
                    }
                );
            } catch (err) {
                console.log(err);
            }
        }
    }, [accessToken, author]);

    return (
        <Author
            username={author}
            profileImg={profileImg}
            createdUtc={createdUtc}
        />
    );
};

export default AuthorComponent;
