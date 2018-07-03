import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { RestService } from './rest.service';
import 'rxjs/add/operator/map';

@Injectable()
export class SearchService {

constructor(private restService : RestService) { }
  search(queryString: string, type : string) {
      const body = {
        type : type,
        query : queryString,
        name : name
      }
      return this.restService.post( 'SEARCH', null, body );
  }
}
