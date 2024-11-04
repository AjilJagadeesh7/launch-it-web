import { Modal } from "@mui/material";

function ImageView({
  image,
  open,
  handleClose,
}: {
  image?: string;
  open?: boolean;
  handleClose?: any;
}) {
  return (
    <Modal
      open={open ?? false}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      className="flex justify-center items-center"
    >
      <img
        src={image}
        alt=""
        className="relative aspect-video xl:w-[900px] xl:h-[500px] sm:w-[600px] sm:h-[350px] w-300 h-150 rounded-md"
      />
    </Modal>
  );
}

export default ImageView;
