import { hotWater, heating } from './state-model.enum';
export const features = {
  gas: 'ბუნებრივი აირი',
  fireplace: 'ბუხარი',
  furniture: 'ავეჯი',
  pass_elevator: 'სამგზავრო ლიფტი',
  serv_elevator: 'სატვირთო ლიფტი',
  telephone: 'ტელეფონი',
  internet: 'ინტერნეტი',
  tv: 'ტელევიზორი',
  air_conditioner: 'კონდიციონერი',
  washing_machine: 'სარეცხი მანქანა',
  road: 'ასფალტის გზა',
  sawage: 'კანალიზაცია',
  water: 'წყალი',
  electricity: 'ელექტროენერგია',
  ...hotWater,
  ...heating,
};