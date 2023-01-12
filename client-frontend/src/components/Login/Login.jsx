import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import { Fragment, useState } from "react";
import { Snackbar, TextField, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { api_url, login, register, resetPass, updatePass } from "../../private";
import { forwardRef } from "react";
import MuiAlert from "@mui/material/Alert";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};
const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
function ChildModal() {
  const [open, setOpen] = useState(false);

  const [err, setError] = useState("");
  const [data, setData] = useState({ name: "", email: "", password: "" });
  const [color, setColor] = useState("red");
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const [open2, setOpen2] = useState(false);
  const handleClose2 = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen2(false);
  };

  const handleClick = () => {
    fetch(`${api_url}/${register}`, {
      method: "POST",
      headers: {
        "Content-Type": "Application/json",
      },
      body: JSON.stringify(data),
    }).then((res) => {
      res.json().then((msg) => {
        if (msg.message == "signup successfully...") {
          setColor("green");
          setOpen2(true);
          setTimeout(() => {
            setOpen(false);
            setOpen2(false);
          }, 2000);
        } else {
          setColor("red");
        }
        setError(msg.message);
      });
    });
  };
  return (
    <Fragment>
      <Typography
        sx={{ textAlign: "center", cursor: "pointer", marginTop: "10px" }}
        onClick={handleOpen}
      >
        Not have an account ? click here
      </Typography>
      <Modal
        hideBackdrop
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...style, width: "100%", maxWidth: "450px" }}>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="h6">Register</Typography>
            <CloseIcon sx={{ cursor: "pointer" }} onClick={handleClose} />
          </Box>
          <TextField
            required
            sx={{ width: "100%" }}
            id="standard-error-helper-text"
            label="Name"
            defaultValue=""
            name="name"
            variant="standard"
            onChange={handleChange}
          />
          <TextField
            required
            sx={{ width: "100%" }}
            id="standard-error-helper-text"
            label="Email"
            defaultValue=""
            name="email"
            variant="standard"
            onChange={handleChange}
          />
          <TextField
            required
            sx={{ width: "100%" }}
            id="standard-error-helper-text"
            label="Password"
            defaultValue=""
            name="password"
            variant="standard"
            onChange={handleChange}
          />
          <Typography color={color}>{err}</Typography>
          <Button
            onClick={handleClick}
            variant="contained"
            sx={{ display: "block", margin: "auto", marginTop: "16px" }}
          >
            SIGNUP
          </Button>
          <Snackbar open={open2} autoHideDuration={6000} onClose={handleClose2}>
            <Alert
              onClose={handleClose2}
              severity="success"
              sx={{ width: "100%" }}
            >
              Signup Successfully...
            </Alert>
          </Snackbar>
        </Box>
      </Modal>
    </Fragment>
  );
}

//LOGIN
export default function NestedModal({ open, handleClose }) {
  const [err, setError] = useState("");
  const [data, setData] = useState({ email: "", password: "" });
  const [color, setColor] = useState("red");
  const [open2, setOpen2] = useState(false);
  const handleClose2 = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen2(false);
  };

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const handleClick = () => {
    fetch(`${api_url}/${login}`, {
      method: "POST",
      headers: {
        "Content-Type": "Application/json",
      },
      body: JSON.stringify(data),
    }).then((res) => {
      res.json().then((msg) => {
        if (msg.token) {
          localStorage.setItem("relax-token", msg.token);
          setOpen2(true);
          setColor("green");
          setTimeout(() => {
            handleClose();
          }, 2000);
        } else {
          setColor("red");
        }
        setError(msg.message);
      });
    });
  };
  return (
    <div>
      <Modal
        open={open}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style, width: "100%", maxWidth: "450px" }}>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="h6">LOGIN</Typography>
            <CloseIcon sx={{ cursor: "pointer" }} onClick={handleClose} />
          </Box>
          <Box>
            <TextField
              sx={{ width: "100%" }}
              id="standard-error-helper-text"
              label="Email"
              defaultValue=""
              variant="standard"
              name="email"
              onChange={handleChange}
            />
            <TextField
              sx={{ width: "100%" }}
              id="standard-error-helper-text"
              label="Password"
              defaultValue=""
              variant="standard"
              name="password"
              onChange={handleChange}
            />
            <Typography color={color}>{err}</Typography>
            <ForgetPassword />
            <Button
              onClick={handleClick}
              variant="contained"
              sx={{ display: "block", margin: "auto", marginTop: "16px" }}
            >
              LOGIN
            </Button>
          </Box>
          <ChildModal />
          <Snackbar open={open2} autoHideDuration={6000} onClose={handleClose2}>
            <Alert
              onClose={handleClose2}
              severity="success"
              sx={{ width: "100%" }}
            >
              Login Successfully...
            </Alert>
          </Snackbar>
        </Box>
      </Modal>
    </div>
  );
}

//Forget Password

function ForgetPassword() {
  const [open, setOpen] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [pass, setPass] = useState("");
  const [matchOtp, setMatchOtp] = useState("");
  const [email, setEmail] = useState("");
  const [btn, setBtn] = useState("SEND OTP");
  const [err, setError] = useState("");
  const [color, setColor] = useState("red");
  const [otp, setOpt] = useState(null);
  const [userId, setUserId] = useState(null);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const sendOTP = () => {
    fetch(`${api_url}/${resetPass}`, {
      method: "POST",
      headers: {
        "Content-Type": "Application/json",
      },
      body: JSON.stringify({ email: email }),
    }).then((res) => {
      res.json().then((data) => {
        if (data.OTP) {
          setColor("green");
          setOpt(data.OTP);
          setUserId(data._id);
          setDisabled(false);
          setBtn("UPDATE");
        } else {
          setColor("red");
        }
        setError(data.message);
      });
    });
  };
  const updatePassw = () => {
    if (matchOtp != otp) {
      setError("invalid otp...");
      setColor("red");
    } else if (pass.length < 6) {
      setError("password should be atleast 6 length");
      setColor("red");
    } else {
      fetch(`${api_url}/${updatePass}/${userId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "Application/json",
        },
        body: JSON.stringify({
          password: pass,
        }),
      }).then((res) => {
        res.json().then((data) => {
          setError(data.message);
          setColor("green");
          setTimeout(() => {
            setOpen(false);
          }, 2000);
        });
      });
    }
  };
  return (
    <Fragment>
      <Typography
        onClick={handleOpen}
        sx={{ textAlign: "end", marginTop: "4px", cursor: "pointer" }}
      >
        Forget password ?
      </Typography>
      <Modal
        hideBackdrop
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...style, width: "100%", maxWidth: "450px" }}>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="h6">Reset Password</Typography>
            <CloseIcon sx={{ cursor: "pointer" }} onClick={handleClose} />
          </Box>

          <TextField
            sx={{ width: "100%" }}
            id="standard-error-helper-text"
            label="Email"
            defaultValue=""
            variant="standard"
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            sx={{ width: "100%" }}
            id="standard-error-helper-text"
            label="OTP"
            defaultValue=""
            variant="standard"
            disabled={disabled}
            onChange={(e) => setMatchOtp(e.target.value)}
          />
          <TextField
            sx={{ width: "100%" }}
            id="standard-error-helper-text"
            label="New Password"
            defaultValue=""
            variant="standard"
            disabled={disabled}
            onChange={(e) => setPass(e.target.value)}
          />
          <Typography color={color}>{err}</Typography>
          <Button
            onClick={disabled ? sendOTP : updatePassw}
            variant="contained"
            sx={{ display: "block", margin: "auto", marginTop: "16px" }}
          >
            {btn}
          </Button>
        </Box>
      </Modal>
    </Fragment>
  );
}
