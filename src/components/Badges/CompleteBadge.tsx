import { useTheme } from "@mui/material/styles"

const CompleteBadge = () => {
  const theme = useTheme();
  return (
    <div className="success-badge">
        <div className="dot"></div>
        <p style={theme.palette.mode === "dark" ? {color:"#000"} : {color:"#000"}}>Success</p>
    </div>
  )
}

export default CompleteBadge
