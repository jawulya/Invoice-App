import { OPEN_FORM, CLOSE_FORM } from "../../constants/action.constans";

const initialState = {
  open: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case OPEN_FORM:
      return {
        ...state,
        open: true
      };
    case CLOSE_FORM:
      return {
        ...state,
        open: false
      };
    default:
      return state;
  }
}
