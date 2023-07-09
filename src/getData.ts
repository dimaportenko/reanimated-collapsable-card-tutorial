// @ts-ignore
import faker from "faker";

export type ListItemType = {
  title: string;
  subtitle: string;
  details: string;
  image: string;
};

export const getData = (amount: number = 20): Array<ListItemType> => {
  const result = [];
  for (let i = 0; i < amount; ++i) {
    result.push({
      title: faker.commerce.productName(),
      subtitle: faker.commerce.department(),
      details: faker.lorem.paragraphs(2, "\n\n"),
      image: `https://picsum.photos/id/${Math.floor(
        Math.random() * 100 + 1
      )}/50/50.jpg`,
    });
  }
  return result;
};
