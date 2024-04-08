import { useTheme } from "@mui/material/styles";

const RunningBadge = () => {
  const theme = useTheme();
    return (
      <div className="running-badge">
        <div className="dot"></div>
        <p style={theme.palette.mode === "dark" ? {color:"#000"} : {color:"#000"}}>Running</p>
      </div>
    );
  };
  
  export default RunningBadge;
  