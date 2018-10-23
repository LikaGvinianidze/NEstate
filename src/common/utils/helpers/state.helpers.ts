import { hasKeys, buildLikeStatement } from '../utils';
import { IObject } from '../interfaces/object.interface';
import { Between, Raw, In, MoreThan, LessThan, Like } from 'typeorm';

export class StateHelper {

  private conditions: IObject = {};

  // constructor() {
  //   const conditions: IObject = {};
  // }

  getSearchFields(data): object {
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        const value = data[key];

        if (key === 'area_from' || key === 'area_to') {
          this.setBetweenFilters(['area_from', 'area_to'], data, 'area');
          continue;
        }

        if (key === 'floor_from' || key === 'floor_to') {
          this.setBetweenFilters(['floor_from', 'floor_to'], data, 'floor');
          continue;
        }

        if (key === 'pricefrom_per_m' || key === 'priceto_per_m') {
          this.setBetweenFilters(['pricefrom_per_m', 'priceto_per_m'], data, 'square_price');
          continue;
        }

        if (key === 'price_from' || key === 'price_to') {
          this.setBetweenFilters(['price_from', 'price_to'], data, 'total_price');

          // Ignore if aquare price is indicated in search filters
          if (hasKeys(['pricefrom_per_m', 'priceto_per_m'], data)) {
            delete data.pricefrom_per_m;
            delete data.priceto_per_m;
          }
          continue;
        }

        if (key === 'any_name') {
          if (this.isCadastralCode(value)) {
            this.conditions.cadastral_code = value;
            continue;
          }
          if (this.isSlug(value)) {
            this.conditions.slug = value;
            continue;
          }
          this.conditions.comment = Like(this.getCommentLikeStatement(value));
          continue;
        }

        switch (key) {
          case 'state_type': this.conditions.state_type = value; break;
          case 'transaction_type': this.conditions.transaction_type = value; break;
          case 'municipality': this.conditions.municipality = value; break;
          case 'village': this.conditions.village = In([...value]); break;
          case 'features': this.conditions.features = Like(buildLikeStatement(value)); break;
          case 'currency': this.conditions.currency = In([...value]); break;
          case 'area_type': this.conditions.area_type = value; break;
          case 'restrooms_quantity': this.conditions.restrooms_quantity = In([...value]); break;
          case 'rooms_quantity': this.setRoomsFilter(value, 'rooms_quantity'); break;
          case 'bedrooms_quantity': this.setRoomsFilter(value, 'bedrooms_quantity'); break;
          case 'project': this.conditions.project = In([...value]); break;
          case 'condition': this.conditions.condition = In([...value]); break;
          case 'exchange': this.conditions.exchange = In([...value]); break;
          case 'status': this.conditions.status = In([...value]); break;
          case 'flat_type': this.conditions.flat_type = In([...value]); break;
          // default: continue;
        }
      }
    }

    return this.conditions;
  }

  private setRoomsFilter(values: Array<any>, property: string) {
    if (values.includes('5') || values.includes('3')) {
      const min = Math.max(...values);
      this.conditions[property] = MoreThan(min - 0.1);
      return;
    } else {
      this.conditions[property] = In([...values]);
      return;
    }
  }

  private setBetweenFilters(keys: Array<string>, data, property): void {
    if (hasKeys([...keys], data)) {
      const from = Number(data[keys[0]]);
      const to = Number(data[keys[1]]);

      this.conditions[property] = Between(from, to);

      delete data[keys[0]];
      delete data[keys[1]];
    } else {
      const [from, to] = keys;

      if (data[from]) {
        this.conditions[property] = MoreThan(Number(data[from]) - 0.1);
      } else if (data[to]) {
        this.conditions[property] = LessThan(Number(data[to]) + 0.1);
      }
    }
  }

  private isCadastralCode(value: string): boolean {
    const pattern = '^[0-9]{1,9}([.][0-9]{1,9})+?$';
    const regex = new RegExp(pattern);

    return regex.test(value);
  }

  private isSlug(value: string): boolean {
    const pattern = '^([A-Z,0-9]{12,12})?$';
    const regex = new RegExp(pattern);

    return regex.test(value);
  }

  private getCommentLikeStatement(sentence: string): string {
    const wordsArr = sentence.split(' ');
    return buildLikeStatement(wordsArr);
  }
}