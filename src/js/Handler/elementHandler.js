import { ELEMENT } from "../Util/constants.js";
import { $ } from "../Util/querySelector.js";

export const showPurchaseResult = () => {
  $(ELEMENT.RECEIPT_CONTAINER).classList.remove(ELEMENT.HIDDEN);
  $(ELEMENT.WIN_NUMBER_CONTAINER).classList.remove(ELEMENT.HIDDEN);
};

export const hidePurchaseResult = () => {
  $(ELEMENT.RECEIPT_CONTAINER).classList.add(ELEMENT.HIDDEN);
  $(ELEMENT.WIN_NUMBER_CONTAINER).classList.add(ELEMENT.HIDDEN);
};