import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const Vote = ({ score }) => {
  return (
    <div className="inline-block py-8 px-4 flex-shrink-0 flex-grow-0">
      <div className="w-fit mx-auto">
        <FontAwesomeIcon icon={solid("chevron-up")} size="xl" />
      </div>
      <p className="text-center font-bold">{score}</p>
      <div className="w-fit mx-auto">
        <FontAwesomeIcon icon={solid("chevron-down")} size="xl" />
      </div>
    </div>
  );
};
