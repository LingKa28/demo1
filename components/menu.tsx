import {
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { Star } from "@mui/icons-material";

export const Menu = () => {
  return (
    <>
      <Typography variant={"h4"} className="text-center py-2">
        LOGO
      </Typography>
      <List>
        {["ITEM ONE", "ITEM TWO", "ITEM THREE"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon sx={{ minWidth: 36 }}>
                <Star />
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
        <Divider />
        {["ITEM FOUR", "ITEM FIVE", "ITEM SIX", "ITEM SEVEN"].map(
          (text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemIcon sx={{ minWidth: 36 }}>
                  <Star />
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          )
        )}
        <Divider />
      </List>
    </>
  );
};
