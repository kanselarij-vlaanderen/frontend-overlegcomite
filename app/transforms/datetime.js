// Disabled rule, because @ember/data import for transforms doesn't seem to work atm
import DS from 'ember-data'; // eslint-disable-line ember/use-ember-data-rfc-395-imports

export default class extends DS.DateTransform {
}
