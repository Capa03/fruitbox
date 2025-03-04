export interface fruit
{
  "genus": string,
  "name": string,
  "id": number,
  "family": string,
  "order": string,
  "nutritions": nutrition[],
  "image": string,
  "price": number,
}

interface nutrition
{
  "carbohydrates": number,
  "protein": number,
  "fat": number,
  "calories": number,
  "sugar": number
}


export interface cartItem
{
  id: number,
  name: string,
  price: number,
  quantity: number
}
