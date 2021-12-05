class ProbabilityArray {
  constructor() {
    this.populate();
  }

  populate() {
    const data = [
      [7, 'greaterThanTen'],
      [3, 'betweenMinusFiveAndTen'],
    ];

    this.data = [];
    data.forEach((elemen) => {
      for (let i = 0; i < elemen[0]; i += 1) {
        this.data.push(elemen[1]);
      }
    });
  }

  pop() {
    if (!this.data.length) this.populate();
    const index = Math.floor(Math.random() * this.data.length);
    const result = this.data[index];
    this.data.splice(index, 1);
    return result;
  }
}

export default ProbabilityArray;
