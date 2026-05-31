import { Type } from '@warp-drive/core/types/symbols'

export default class IntegerTransform {
  [Type] = 'integer'

  hydrate(dehydrated) {
    return this.deserialize(dehydrated)
  }

  deserialize(serialized) {
    return Number.parseInt(serialized);
  }

  serialize(deserialized) {
    return deserialized.toString();
  }

  defaultValue() {
    return 0;
  }

  static create() {
    return new this();
  }
}
