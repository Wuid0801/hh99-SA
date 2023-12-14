const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
console.log("컴퓨터가 숫자를 생성하였습니다. 답을 맞춰보세요!");
// 컴퓨터가 생성한 3자리 난수 함수
const RandomNumber = function () {
    let digits = [];
    while (digits.length < 3) {
        let randomDigit = Math.floor(Math.random() * 10);
        // 이 숫자가 중복되어 있는지 확인
        if (!digits.includes(randomDigit)) {
            digits.push(randomDigit);
        }
    }
    return digits[0] * 100 + digits[1] * 10 + digits[2];
};

let AttemptCount = 0;
// 숫자 문자열로 변환 후 다시 숫자로 변환
const computerNumber = RandomNumber().toString().split('').map(Number);

function CheckNumber(UserNumber) {
    let sCount = 0; // 스트라이크 개수
    let bCount = 0; // 볼 개수
    AttemptCount++; // 시도 횟수
    const userDigits = UserNumber.split('').map(Number);
    for (let i = 0; i < userDigits.length; i++) {
        if (userDigits[i] === computerNumber[i]) {
            sCount++;
        } else if (computerNumber.includes(userDigits[i])) {
            bCount++;
        }
    }
    console.log(`s: ${sCount}, b: ${bCount}`);
    console.log(`${AttemptCount}번째 시도입니다.`);
    // 3스트라이크까지 반복
    if (sCount != 3) {
        rl.question('3자리 숫자를 추측하세요 : ', (input) => {
            CheckNumber(input);
        });
    }
    else {
        console.log("축하합니다. 맞추셨습니다.");
        rl.close();
    }
}
// 첫 번째 입력 받기
rl.question('3자리 숫자를 추측하세요 : ', (input) => {
    CheckNumber(input);
});
// RandomNumber()로 생성된 난수를 문자열로 변환합니다. (toString())
// 문자열을 한 글자씩 분리하여 배열로 만듭니다. (split(''))
// 배열의 각 요소를 숫자로 다시 변환합니다. (map(Number))