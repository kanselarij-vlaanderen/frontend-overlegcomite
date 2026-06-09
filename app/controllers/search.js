import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';

export default class SearchController extends Controller {
  @tracked searchText = '';

  @tracked sort = '';
  @tracked page = 0;
  @tracked size = 10;
}
