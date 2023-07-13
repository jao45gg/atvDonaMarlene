import fruits from "../data/fruits";
import prisma from "../database/database";
import { FruitInput } from "../services/fruits-service";

export type Fruit = {
  id: number,
  name: string,
  price: number
}

async function getFruits() {
  return await prisma.fruits.findMany();
}

async function getSpecificFruit(id: number): Promise<Fruit | undefined> {
  return await prisma.fruits.findUnique({
    where: {
      id
    }
  })
}

async function getSpecificFruitByName(name: string): Promise<Fruit | undefined> {
  return await prisma.fruits.findUnique({
    where: {
      name
    }
  })
}

async function insertFruit(fruit: FruitInput) {
  await prisma.fruits.create({
    data: {
      name: fruit.name,
      price: fruit.price
    }
  })
}

const fruitsRepository = {
  getFruits,
  getSpecificFruit,
  getSpecificFruitByName,
  insertFruit
}

export default fruitsRepository;