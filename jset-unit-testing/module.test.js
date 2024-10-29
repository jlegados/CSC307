import mut from './module.js'; // MUT = Module Under Test

test('Testing sum -- success', () => {
  const expected = 30;
  const got = mut.sum(12, 18);
  expect(got).toBe(expected);
});

test('Testing division -- by zero', () => {
    expect(() => {
        mut.div(10, 0);
    }).toThrow('Division by zero isnt allowed');
})

test('Testing division -- negative', () => {
    const expected = -12;
    const got = mut.div(-24, 2);
    expect(got).toBe(expected);
})

test('Testing division -- normal divison', () => {
    const expected = 25;
    const got = mut.div(50, 2);
    expect(got).toBe(expected);
})

test('Testing division -- decimals', () => {
    const expected = 0.8333333333333334;
    const got = mut.div(10.0, 12.00);
    expect(got).toBe(expected);
})


test('Testing containingnums -- contains text & num', () => {
    const text = 'HelloWorld1012';
    const result = mut.containsNumbers(text);
    expect(result).toBe(true);
})

test('Testing containingnums -- contains text', () => {
    const text = 'HelloWorld';
    const result = mut.containsNumbers(text);
    expect(result).toBe(false);
})

test('Testing containingnums -- contains num', () => {
    const text = '1012';
    const result = mut.containsNumbers(text);
    expect(result).toBe(true);
})

test('Testing containingnums -- random special char with num&text', () => {
    const text = 'Hello@1012';
    const result = mut.containsNumbers(text);
    expect(result).toBe(true);
})

test('Testing containingnums -- random special char', () => {
    const text = '@#$!%^&*';
    const result = mut.containsNumbers(text);
    expect(result).toBe(false);
})

test('Testing containingnums -- empty ', () => {
    const text = '';
    const result = mut.containsNumbers(text);
    expect(result).toBe(false);
})




