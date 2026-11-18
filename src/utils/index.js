const predict = () => {
  let count = 0;
  const arr = [];
  let timer = setInterval(() => {
    if (count < 10) {
      arr.push(Date.now() % 2 === 0);

      count += 1;
    } else {
      clearInterval(timer);
      console.log(arr);
      console.log(
        arr.reduce((a, b) => {
          if (b) {
            return a + 1;
          } else {
            return a + 0;
          }
        }, 0)
      );
    }
  }, 10);
};

// predict()

const simplePredict = () => {
  console.log(Date.now() % 2 === 0);
};

simplePredict();
