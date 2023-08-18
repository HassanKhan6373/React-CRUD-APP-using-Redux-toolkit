import React from "react";
import { Button, Box, Dialog, DialogTitle } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { useState } from "react";
import DeleteiconS from "../../asset/DeleteiconS.jpg";

export default function DialogBox({
  Title,
  buttoncss,
  method,
  data,
  submitHandler,
}) {
  const [dialogState, setDialogState] = useState(false);
  const [customerName, setCustomerName] = useState(data ? data.first_name : "");
  const [customerEmail, setCustomerEmail] = useState(data ? data.email : "");

  return (
    <>
      <Button
        color="secondary"
        variant="contained"
        onClick={() => {
          setDialogState(true);
        }}
        style={buttoncss}
      >
        {Title}
      </Button>

      <Dialog
        maxWidth="xl"
        open={dialogState}
        onClose={() => {
          setDialogState(false);
          setCustomerEmail("");
          setCustomerName("");
        }}
      >
        <Box sx={{ width: "100%" }}>
          <Box
            style={{
              background:
                method !== "Delete"
                  ? "linear-gradient(to right, #419F7C, #015249)"
                  : null,
              
            }}
           
          >
            <DialogActions>
              <Button
                color="primary"
                onClick={() => {
                  setDialogState(false);
                }}
              >
                <CloseIcon
                  style={{ color: method === "Delete" ? "black" : "white" }}
                />
              </Button>
            </DialogActions>
          </Box>
          <Box>
            <DialogContent>
              {method !== "Delete" ? (
                <>
                  <div>
                    <input
                      type="text"
                      placeholder="Customer Name"
                      style={{ borderRadius: "10px" }}
                      className="input_field"
                      value={customerName}
                      onChange={(event) => setCustomerName(event.target.value)}
                    />
                    <input
                      type="text"
                      placeholder="Email"
                      className="input_field"
                      value={customerEmail}
                      onChange={(event) => setCustomerEmail(event.target.value)}
                    />
                  </div>
                </>
              ) : (
                <>
                  <div style={{ textAlign: "center", paddingInline: "10px" }}>
                    <div style={{ paddingBottom: "20px" }}>
                      <img
                        src={DeleteiconS}
                        alt="DeleteiconS"
                        width={20} // Adjust this width as needed
                        height={25} // Adjust this height as needed
                      />
                    </div>
                    <h4>Are You Sure</h4>
                    <p>Do you really want to delete this customer?</p>
                    <p>This process cannot be undone.</p>
                  </div>
                </>
              )}
            </DialogContent>
          </Box>
          <>
            {method === "Delete" && (
              <Box
                sx={{
                  display: "flex",
                  gap: "20px",
                  padding: "20px",
                  paddingBottom: "50px",
                }}
              >
                <Button
                  style={{
                    background: "gray",
                    color: "white",
                  }}
                  onClick={() => {
                    setDialogState(false);
                  }}
                  fullWidth
                >
                  Cancel
                </Button>

                <Button
                  style={{
                    backgroundColor: "red",
                    color: "white",
                  }}
                  onClick={() => {
                    setDialogState(false);
                    submitHandler(data);
                  }}
                  fullWidth
                >
                  Delete
                </Button>
              </Box>
            )}
            {method === "Edit" && (
              <Box
                sx={{
                  display: "flex",
                  gap: "20px",
                  padding: "0 20px",
                  paddingBottom: "35px",
                }}
              >
                <Button
                  style={{
                    color: "white",
                    background: "linear-gradient(to right, #419F7C, #015249)",
                    padding: "10px 0",
                    borderRadius: "8px",
                  }}
                  onClick={() => {
                    setDialogState(false);
                    submitHandler({
                      first_name: customerName,
                      email: customerEmail,
                      id: data.id,
                    });
                  }}
                  fullWidth
                >
                  Edit Customer
                </Button>
              </Box>
            )}
            {method === "Add" && (
              <Box
                sx={{
                  padding: "0 20px",
                  paddingBottom: "35px",
                }}
              >
                <Button
                  style={{
                    color: "white",
                    background: "linear-gradient(to right, #419F7C, #015249)",
                    padding: "10px 0",
                    borderRadius: "8px",
                  }}
                  onClick={() => {
                    setDialogState(false);
                    submitHandler({
                      first_name: customerName,
                      email: customerEmail,
                    });
                  }}
                  fullWidth
                >
                  Add Customer
                </Button>
              </Box>
            )}
          </>
        </Box>
      </Dialog>
    </>
  );
}
