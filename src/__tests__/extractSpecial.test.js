import extractSpecial from '../js/extractSpecial';

describe('extractSpecial', () => {
  const character = {
    name: 'Лучник',
    type: 'Bowman',
    health: 50,
    level: 3,
    attack: 40,
    defence: 10,
    special: [
      {
        id: 8,
        name: 'Двойной выстрел',
        icon: 'http://...',
        description: 'Двойной выстрел наносит двойной урон',
      },
      {
        id: 9,
        name: 'Нокаутирующий удар',
        icon: 'http://...',
        // description отсутствует
      },
    ],
  };

  test('должен извлечь все поля с description из первого элемента', () => {
    const result = extractSpecial(character);
    expect(result[0]).toEqual({
      id: 8,
      name: 'Двойной выстрел',
      description: 'Двойной выстрел наносит двойной урон',
      icon: 'http://...',
    });
  });

  test('должен добавить default description для второго элемента', () => {
    const result = extractSpecial(character);
    expect(result[1]).toEqual({
      id: 9,
      name: 'Нокаутирующий удар',
      description: 'Описание недоступно',
      icon: 'http://...',
    });
  });

  test('должен вернуть массив из двух элементов', () => {
    const result = extractSpecial(character);
    expect(result).toHaveLength(2);
  });

  test('должен вернуть пустой массив, если special отсутствует', () => {
    const { special, ...characterWithoutSpecial } = character;
    const result = extractSpecial(characterWithoutSpecial);
    expect(result).toEqual([]);
  });

  test('должен вернуть пустой массив, если special не массив', () => {
    const invalidCharacter = {
      ...character,
      special: 'not an array',
    };
    const result = extractSpecial(invalidCharacter);
    expect(result).toEqual([]);
  });

  test('должен вернуть пустой массив, если передан пустой объект', () => {
    const result = extractSpecial({});
    expect(result).toEqual([]);
  });

  test('должен вернуть пустой массив, если аргумент не передан', () => {
    const result = extractSpecial();
    expect(result).toEqual([]);
  });

  test('должен корректно обрабатывать пустой массив special', () => {
    const characterWithEmptySpecial = {
      ...character,
      special: [],
    };
    const result = extractSpecial(characterWithEmptySpecial);
    expect(result).toEqual([]);
  });
});
