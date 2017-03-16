import {observable} from 'mobx';

export default class SearchQuery {

  since = observable(null);
  till = observable(null);

}
