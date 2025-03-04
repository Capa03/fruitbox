export interface fruit
{
  "genus": string,
  "name": string,
  "id": number,
  "family": string,
  "order": string,
  "nutritions": nutrition[],
  "image": string
}

interface nutrition
{
  "carbohydrates": number,
  "protein": number,
  "fat": number,
  "calories": number,
  "sugar": number
}
