import { Type } from '@warp-drive/core/types/symbols'

export default class DatetimeTransform {
  [Type] = 'datetime'

  hydrate(dehydrated) {
    return this.deserialize(dehydrated)
  }

  deserialize(serialized) {
    if (serialized) {
      return Temporal.Instant
        .from(serialized)
        .toZonedDateTimeISO(Temporal.Now.timeZoneId());
    } else {
      return null;
    }
  }

  serialize(deserialized) {
    return deserialized.toString();
  }

  defaultValue() {
    return null;
  }

  static create() {
    return new this();
  }
}
