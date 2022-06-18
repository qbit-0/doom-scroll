import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { selectAccessToken } from "../features/auth/authSlice";
import { fetchReddit } from "../utility/redditAPI";

export const More = ({ more, link, setSelf }) => {
  const location = useLocation();
  const accessToken = useSelector(selectAccessToken);

  const handleClick = () => {
    const params = new URLSearchParams();
    params.append("api_type", "json");
    params.append("children", [...more.data.children].join(","));
    params.append("link_id", link);

    fetchReddit({
      accessToken: accessToken,
      pathname: "/api/morechildren",
      search: params.toString(),
    }).then((response) => {
      setSelf(response.json.data.things);
    });
  };

  if (more.data.count <= 0) {
    return <button onClick={handleClick}>Continue this thread</button>;
  } else
    return (
      <button onClick={handleClick}>{`${more.data.count} more ${
        more.data.count > 1 ? "replies" : "reply"
      }`}</button>
    );
};
