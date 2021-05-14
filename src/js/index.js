const $showResultButton = document.querySelector('.open-result-modal-button');
const $modalClose = document.querySelector('.modal-close');
const $modal = document.querySelector('.modal');
const $lottoNumbersToggleButton = document.querySelector('.lotto-numbers-toggle-button');
const $buyInput = document.querySelector('#buyInput');
const $buyButton = document.querySelector('#buyButton');
const $wallet = document.querySelector('#wallet');
const $walletLabel = document.querySelector('#walletLabel');

let state = {
  lottos: [],
}

const onModalShow = () => {
  $modal.classList.add('open');
}

const onModalClose = () => {
  $modal.classList.remove('open');
}

const createLotto = (auto = false) => {
  const lotto = [];
  if (!auto) {
    while (lotto.length < 6) {
      let number = Math.floor(Math.random() * 45 + 1);
      if (!lotto.includes(number)) lotto.push(number);
    }
    lotto.sort((a, b) => a - b);
  } else { }
  return lotto;
}

const onBuy = () => {
  let newLottos = parseInt($buyInput.value / 1000);
  $buyInput.value = '';
  for (let i = 0; i < newLottos; i++) {
    let newLotto = createLotto();
    state.lottos.push(newLotto);
  }
  render();
}

const render = () => {
  for (let i = 0; i < state.lottos.length; i++) {
    let $lotto = document.createElement('span');
    $lotto.classList.add('mx-1', 'text-4xl');
    $lotto.innerText = '🎟️ ';
    $wallet.appendChild($lotto);
  }
  $walletLabel.innerText = `총 ${state.lottos.length}개를 구매하였습니다.`;
}

$showResultButton.addEventListener('click', onModalShow);
$modalClose.addEventListener('click', onModalClose);
$buyButton.addEventListener('click', onBuy);