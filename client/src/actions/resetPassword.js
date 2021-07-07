import * as api from "../api/api.js";

export const linkForPasswordReset =
  (userType, passResetMail) => async (dispatch) => {
    try {
      const { data } = await api.sendLinkForPasswordReset(
        userType,
        passResetMail
      );

      dispatch({
        type: "RESET_PASSWORD",
        payload: { userType, id: data.id, token: data.token },
      });
    } catch (error) {
      dispatch({ type: "ERROR", payload: error.response });
      console.log(error.response);
    }
  };

export const passwordReset =
  (userType, id, token, newPassword, history) => async (dispatch) => {
    try {
      await api.resetPassword(userType, id, token, newPassword);

      dispatch({ type: "RESET_PASSWORD_COMPLETED" });
      history.push("/auth");
    } catch (error) {
      dispatch({ type: "ERROR", payload: error.response });
      console.log(error.response);
    }
  };
