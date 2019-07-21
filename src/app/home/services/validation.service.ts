import { Injectable } from '@angular/core';
import * as Ajv from 'ajv';
import { defs } from './definitions';
const defsSchema = defs;
const ajv = new Ajv();


@Injectable({
  providedIn: 'root'
})
export class ValidationService {
validate: any;

constructor() {
  this.validate = ajv.addSchema(defsSchema);
}

isRequestBodyValid = async (data, schema, name): Promise<boolean> => {
    return new Promise ((resolve, reject) => {
     try {
       let valid = false;
       const oldSchema = ajv.getSchema('http://example.com/schemas/' + name + '.json');
       if (oldSchema === undefined) {
        valid = this.validate.compile({
        ...{ $id: 'http://example.com/schemas/' + name + '.json'},
        ...schema})(data) as boolean;
      }  else {

        valid = oldSchema(data) as boolean;
      }
       resolve(valid);

     } catch (error) {
       console.log(error);
       resolve(false);
     }


    });
  }

}
