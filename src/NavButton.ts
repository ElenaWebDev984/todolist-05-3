import {styled} from "@mui/material";
import Button from "@mui/material/Button";

type Props = {
    background?: string
}


export const NavButton = styled(Button)<Props>(({background}) => ({
    minWidth: '110px',
    fontWeight: 'bold',
    boxShadow: '0 0 0 1px #054B62, 2px 2px 0 0 #054B62',
    borderRadius: '2px',
    margin: '0 10px',
    padding: '8px 24px',
    color: '#ffffff',
    background: background || '#1565C0',
}))