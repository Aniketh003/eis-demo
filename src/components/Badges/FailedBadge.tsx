import { useTheme } from "@mui/material/styles";

const FailedBadge = () => {
  const theme = useTheme();
  return (
    <div className="failed-badge">
      <div className="dot"></div>
      <p style={theme.palette.mode === "dark" ? {color:"#000"} : {color:"#000"}}>Failed</p>
    </div>
  );
};

export default FailedBadge;
