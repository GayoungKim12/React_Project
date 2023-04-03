export function generateRandomNumber() {
  // 0 ~ 9까지 숫자를 이용
  const candidates = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
  const shuffleNumbers = shuffle(candidates);
  let pickedNumbers;
  if (shuffleNumbers[0] === 0) {
    pickedNumbers = shuffleNumbers.slice(1, 5);
  } else {
    pickedNumbers = shuffleNumbers.slice(0, 4);
  }

  return pickedNumbers;
}

// 랜덤하게 섞기
function shuffle(array) {
  // Math.random(), 0 ~ 1까지 랜덤한 숫자 반환
  // array.sort(): 음수를 반환하면 뒤에, 양수를 반환하면 앞에 정렬

  return array.sort(() => {
    return Math.random() - 0.5;
  });
}
