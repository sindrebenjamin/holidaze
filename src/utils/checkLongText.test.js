const checkLongText = (text, cutoff) => {
  if (text) {
    if (text.length > cutoff) {
      const cutText = text.slice(0, cutoff);
      return cutText + "...";
    }
    return text;
  }
};

describe("checkLongText", () => {
  test("returns the original text if its length is less than or equal to the cutoff", () => {
    const text = "Hello";
    const cutoff = 10;
    const result = checkLongText(text, cutoff);
    expect(result).toBe(text);
  });

  test("returns the truncated text with ellipsis if its length is greater than the cutoff", () => {
    const text = "Hello, world!";
    const cutoff = 5;
    const result = checkLongText(text, cutoff);
    expect(result).toBe("Hello...");
  });
});
