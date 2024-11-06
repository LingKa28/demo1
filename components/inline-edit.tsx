import { useState } from "react";
import { Box, OutlinedInput, Typography } from "@mui/material";
import { Cancel, Check, Edit, Padding } from "@mui/icons-material";

type InlineEditProps = {
  value: string;
  onChange: (newValue: string) => void;
};

export const InlineEdit: React.FC<InlineEditProps> = ({ value, onChange }) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [newValue, setNewValue] = useState<string>(value);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleConfirm = () => {
    onChange(newValue);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setNewValue(value);
    setIsEditing(false);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewValue(event.target.value);
  };

  return (
    <Box className="flex items-center">
      {!isEditing ? (
        <Box className="w-full flex items-center justify-between">
          <Typography>{value}</Typography>
          <Edit className="cursor-pointer" onClick={handleEdit} />
        </Box>
      ) : (
        <OutlinedInput
          sx={{ input: { paddingBlock: "0.5rem" } }}
          value={newValue}
          onChange={handleInputChange}
          endAdornment={[
            <Check className="cursor-pointer" key="confirm" onClick={handleConfirm} />,
            <Cancel className="cursor-pointer" key="cancel" onClick={handleCancel} />,
          ]}
        />
      )}
    </Box>
  );
};
