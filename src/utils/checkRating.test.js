function checkRating(num) {
  if (Number.isInteger(num)) {
    return num;
  } else {
    return num.toFixed(2);
  }
}

describe("checkRating", () => {
  test("returns the number as is if it is an integer", () => {
    const num = 5;
    const result = checkRating(num);
    expect(result).toBe(5);
  });

  test("returns the number formatted to two decimal places if it is a floating-point number", () => {
    const num = 4.56789;
    const result = checkRating(num);
    expect(result).toBe("4.57");
  });

  test("returns the number formatted to two decimal places if it is a floating-point number with one decimal place", () => {
    const num = 4.5;
    const result = checkRating(num);
    expect(result).toBe("4.50");
  });

  test("returns the number formatted to two decimal places if it is a floating-point number with exactly two decimal places", () => {
    const num = 4.56;
    const result = checkRating(num);
    expect(result).toBe("4.56");
  });

  test("returns the number formatted to two decimal places if it is a floating-point number with more than two decimal places", () => {
    const num = 4.55555;
    const result = checkRating(num);
    expect(result).toBe("4.56");
  });
});
