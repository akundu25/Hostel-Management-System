const resetPassword = (
  state = { resetPasswordData: null, error: null },
  action
) => {
  switch (action.type) {
    case "RESET_PASSWORD":
      localStorage.setItem(
        "passwordResetInfo",
        JSON.stringify(action?.payload)
      );
      return { ...state, resetPasswordData: action?.payload };
    case "ERROR":
      return { ...state, error: action?.payload };
    case "ERROR_REMOVE":
      return { ...state, error: null };
    case "RESET_PASSWORD_COMPLETED":
      localStorage.clear();
      return { ...state, resetPasswordData: null, error: null };
    default:
      return state;
  }
};

export default resetPassword;
