import JSONAPISerializer from '@ember-data/serializer/json-api';
import DataTableSerializerMixin from 'ember-data-table/mixins/serializer'; // eslint-disable-line ember/no-mixins

export default class ApplicationSerializer extends JSONAPISerializer.extend(DataTableSerializerMixin) {
}
