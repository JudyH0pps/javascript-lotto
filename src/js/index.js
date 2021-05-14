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
  renderLotto();
}

const deleteAll = () => {
  while ($wallet.hasChildNodes()) {
    $wallet.removeChild($wallet.firstChild);
  }
}

const renderLotto = () => {
  deleteAll();
  let $lotto;
  for (let i = 0; i < state.lottos.length; i++) {
    if (!$lottoNumbersToggleButton.checked) {
      $lotto = document.createElement('span')
      $lotto.classList.add('mx-1', 'text-4xl');
      $lotto.innerText = '🎟️ ';
    } else {
      $lotto = document.createElement('p')
      $lotto.style = 'width: 50%';
      $lotto.innerText = '🎟️ ' + state.lottos[i];
    }
    $wallet.appendChild($lotto);
  }
  $walletLabel.innerText = `총 ${state.lottos.length}개를 구매하였습니다.`;
}

const showResult = () => {
  const winMoney = [5000, 50000, 1500000, 30000000, 2000000000];
  const $winningNumbers = document.querySelectorAll('.winning-number');
  const bonusNumber = document.querySelector('.bonus-number').value * 1;
  const winningNumbers = [];
  const winners = new Array(5).fill(0);
  $winningNumbers.forEach($winningNumber => winningNumbers.push($winningNumber.value * 1));
  state.lottos.forEach(lotto => {
    let matchCnt = 0;
    lotto.forEach(num => {
      if (winningNumbers.includes(num)) matchCnt++;
    });
    if (matchCnt >= 6) winners[4]++;
    else if (matchCnt >= 5 && lotto.includes(bonusNumber)) winners[3]++;
    else if (matchCnt >= 5) winners[2]++;
    else if (matchCnt >= 4) winners[1]++;
    else if (matchCnt >= 3) winners[0]++;
  });
  let revenue = winMoney.reduce((acc, val, idx) => acc + val * winners[idx], 0) / (state.lottos.length * 1000);
  renderResult(winners, revenue);
}

const renderResult = (winners, revenue) => {
  const $match3 = document.querySelector('#match3');
  const $match4 = document.querySelector('#match4');
  const $match5 = document.querySelector('#match5');
  const $matchBonus = document.querySelector('#matchBonus');
  const $match6 = document.querySelector('#match6');
  const $revenue = document.querySelector('#revenue');
  $match3.innerText = winners[0] + '개';
  $match4.innerText = winners[1] + '개';
  $match5.innerText = winners[2] + '개';
  $matchBonus.innerText = winners[3] + '개';
  $match6.innerText = winners[4] + '개';
  $revenue.innerText = `당신의 총 수익률은 ${revenue}%입니다.`;
}

$showResultButton.addEventListener('click', onModalShow);
$modalClose.addEventListener('click', onModalClose);
$buyButton.addEventListener('click', onBuy);
$lottoNumbersToggleButton.addEventListener('change', renderLotto);
$showResultButton.addEventListener('click', showResult);