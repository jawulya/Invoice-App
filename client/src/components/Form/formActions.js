import { OPEN_FORM, CLOSE_FORM } from "../../constants/action.constans";

export const openForm = () => {
  return {
    type: OPEN_FORM
  };
};
export const closeForm = () => {
  return {
    type: CLOSE_FORM
  };
};
