export interface fruit
{
  "genus": string,
  "name": string,
  "id": number,
  "family": string,
  "order": string,
  "nutritions": nutrition[]
}

interface nutrition
{
  "carbohydrates": number,
  "protein": number,
  "fat": number,
  "calories": number,
  "sugar": number
}
