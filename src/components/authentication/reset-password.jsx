import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
const apiUrl = import.meta.env.VITE_API_URL;

const ResetPassword = () => {
  const passref = useRef();
  const conpassref = useRef();
  const location = useLocation();
  const navigate = useNavigate();

  const [valid, setValid] = useState(false);
  const [mes, setMes] = useState("");
  const [linktoken, setLinktoken] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const checkValidation = async () => {
      try {
        const token = location.pathname.split("/")[2];
        setLinktoken(token);
        const res = await axios.get(
          `${apiUrl}customer/resetpasswordvalidation/${token}`
        );

        if (res.status === 200) {
          setValid(true);
        } else {
          setValid(false);
        }
      } catch (err) {
        console.log(err.message);
      }
    };

    checkValidation();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setLoading(true);
      setMes("");
      if (passref.current.value !== conpassref.current.value) {
        return setMes("Passwords not matched");
      }
      const res = await axios.post(
        `${apiUrl}customer/changepassword`,
        { password: passref.current.value },
        {
          headers: {
            token: linktoken,
          },
        }
      );

      if (res.status === 200) {
        setMes("Password updated, redirecting to Login page...");
        navigate("/login");
      } else {
        setMes("Unable to update password");
      }
    } catch (err) {
      if (err.response) {
        console.log(err.response.data.message);
      } else {
        console.log(err.message);
      }
    }
  };

  return (
    <div className="login">
      <h2>Reset Password</h2>
      {valid ? (
        <>
          <form action="#" onSubmit={handleSubmit}>
            <input
              type="password"
              ref={passref}
              placeholder="New Password"
              required
            />
            <input
              type="password"
              ref={conpassref}
              placeholder="Confirm New Password"
              required
            />
            <input disabled={loading} type="submit" value="UPDATE PASSWORD" />
          </form>
          {mes && <div className={mes.includes("not matched") || mes.includes("Unable") ? "err" : "mes"}>{mes}</div>}
        </>
      ) : (
        <div className="err">
          Your link has expired. Please request a new password reset link.
        </div>
      )}
    </div>
  );
};

export default ResetPassword;
