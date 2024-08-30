import { Box, Modal, Typography, Button } from "@mui/material";
import React from "react";

type ViewModalProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  instructorData: any; // Data for the selected instructor
};

const ViewModal: React.FC<ViewModalProps> = ({
  open,
  setOpen,
  instructorData,
}) => {
  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      className="border-0"
      disableAutoFocus
    >
      <Box
        className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 bg-white text-black rounded-lg p-8 shadow-lg max-w-lg w-full"
        sx={{
          outline: "none",
        }}
      >
        <Typography
          variant="h6"
          component="h2"
          className="text-lg font-semibold mb-4"
        >
          Instructor Details
        </Typography>
        {instructorData ? (
          <div>
            <Typography variant="subtitle1" className="font-semibold mb-2">
              User Information
            </Typography>
            <Typography variant="body2" className="mb-1">
              <strong>Name:</strong> {instructorData.user?.name}
            </Typography>
            <Typography variant="body2" className="mb-1">
              <strong>Email:</strong> {instructorData.user?.email}
            </Typography>
            <Typography variant="body2" className="mb-4">
              <strong>Joined At:</strong>{" "}
              {new Date(instructorData.user?.createdAt).toLocaleDateString()}
            </Typography>

            <Typography variant="subtitle1" className="font-semibold mb-2 mt-4">
              Instructor Information
            </Typography>
            <Typography variant="body2" className="mb-1">
              <strong>Degree:</strong>{" "}
              {instructorData.instructorResponse?.degree}
            </Typography>
            <Typography variant="body2" className="mb-1">
              <strong>Institution:</strong>{" "}
              {instructorData.instructorResponse?.institution}
            </Typography>
            <Typography variant="body2" className="mb-1">
              <strong>Subject:</strong>{" "}
              {instructorData.instructorResponse?.subject}
            </Typography>
            <Typography variant="body2" className="mb-1">
              <strong>Certificate Date:</strong>{" "}
              {new Date(
                instructorData.instructorResponse?.certificateDate
              ).toLocaleDateString()}
            </Typography>
            <Typography variant="body2" className="mb-1">
              <strong>Certificate Name:</strong>{" "}
              {instructorData.instructorResponse?.certificateName}
            </Typography>
            <Typography variant="body2" className="mb-1">
              <strong>Certificate URL:</strong>{" "}
              <a
                href={instructorData.instructorResponse?.certificate}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline"
              >
                View Certificate
              </a>
            </Typography>
          </div>
        ) : (
          <Typography variant="body2" className="text-gray-500">
            No data available
          </Typography>
        )}
        <Box className="flex justify-end mt-6">
          <Button
            variant="contained"
            color="primary"
            onClick={() => setOpen(false)}
            className="text-sm"
          >
            Close
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default ViewModal;
