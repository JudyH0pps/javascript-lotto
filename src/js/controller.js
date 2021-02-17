import LottoModel from "./model.js";
import { $, getQuotient, getRandomNumber, sortByNumber } from "./util.js";
import LottoView from "./view.js";

class LottoController {
  constructor() {
    this.model = new LottoModel();
    this.view = new LottoView();
  }

  init() {
    this.view.reset();
    this.handlePrice();
  }

  getAndClearBuyValue() {
    const value = $("#buy-input").value;
    $("#buy-input").value = "";

    return value;
  }

  getCount(price) {
    return getQuotient(price, 1000);
  }

  generateLotto() {
    const lotto = new Set();
    while (lotto.size !== 6) {
      lotto.add(getRandomNumber(1, 45));
    }

    return sortByNumber([...lotto]);
  }

  renderPocketLotto() {
    const lottos = this.model.lottos;
    const pocketDetail = this.model.detail;
    this.view.renderPocketLottos(lottos, pocketDetail);
  }

  renderPocket() {
    const amount = this.model.amount;
    this.view.renderPocketSection(amount);
    this.handlePocket();
    this.renderPocketLotto();
    this.view.renderWinningSection();
  }

  manageLotto() {
    const price = parseInt(this.getAndClearBuyValue(), 10);
    const count = this.getCount(price);
    for (let i = 0; i < count; i++) {
      this.model.addLotto(this.generateLotto());
    }
    this.renderPocket();
  }

  manageDetail() {
    this.model.toggleDetail();
    this.renderPocketLotto();
  }

  handlePrice() {
    const $buyButton = $("#buy-button");
    $buyButton.addEventListener("click", () => {
      this.manageLotto();
    });
  }

  handlePocket() {
    const $pocketButton = $("#pocket-toggle-number");
    $pocketButton.addEventListener("click", () => {
      this.manageDetail();
    });
  }
}

export default LottoController;
