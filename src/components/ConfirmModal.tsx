import { Box, Button, Modal, Typography } from "@mui/material";
import { useCallback } from "react";
import { ButtonGroup } from "styles";

export interface FnProps__ConfirmModal {
  title: string;
  open: boolean;
  setOpen: (openState: boolean) => void;
  onOk: () => void;
  okText: string;
}

export function ConfirmModal({
  open,
  setOpen,
  onOk,
  title,
  okText,
}: FnProps__ConfirmModal) {
  const onCancelClick = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  return (
    <Modal
      open={open}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography
          id="modal-modal-title"
          variant="h6"
          component="h2"
          sx={{ marginBottom: "4rem" }}
        >
          {title}
        </Typography>

        <ButtonGroup>
          <Button
            variant="outlined"
            color="primary"
            onClick={onCancelClick}
            size="large"
          >
            Cancel
          </Button>
          <Button
            variant="outlined"
            color="primary"
            onClick={onOk}
            size="large"
          >
            {okText}
          </Button>
        </ButtonGroup>
      </Box>
    </Modal>
  );
}

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
