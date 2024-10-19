import { useNavigate } from "react-router-dom";

const BackButton = () => {
  const navigate = useNavigate();
  return (
    <button className="back-btn" onClick={() => navigate("/")}>
      <svg viewBox="0 0 512 512" fill="currentColor" height="1em" width="1em">
        <path
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={48}
          d="M244 400L100 256l144-144M120 256h292"
        />
      </svg>
    </button>
  );
};

export default BackButton;
