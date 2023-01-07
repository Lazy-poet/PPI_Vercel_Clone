import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import { Viewer } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";

export default function Claim({ open, handleOpen, fileURL }: any) {
  const defaultLayoutPluginInstance = defaultLayoutPlugin();
  return (
    <Dialog
      fullWidth={true}
      maxWidth="xl"
      open={open}
      onClose={handleOpen}
      PaperProps={{
        style: {
          minHeight: "90%",
          maxHeight: "90%",
        },
      }}
    >
      <DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleOpen}
          sx={{
            position: "absolute",
            right: -5,
            top: -5,
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Viewer
          fileUrl={`/${fileURL}`}
          plugins={[defaultLayoutPluginInstance]}
        />
        ;
      </DialogContent>
    </Dialog>
  );
}
