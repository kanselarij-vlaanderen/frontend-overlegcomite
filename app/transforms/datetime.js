import { Type } from '@warp-drive/core/types/symbols'

export default class DatetimeTransform {
  [Type] = 'datetime'

  hydrate(dehydrated) {
    return this.deserialize(dehydrated)
  }

  deserialize(serialized) {
    return Temporal.Instant
      .from(serialized)
      .toZonedDateTimeISO(Temporal.Now.timeZoneId());
  }

  serialize(deserialized) {
    return deserialized.toString({
      timeZoneName: "never"
    });
  }

  defaultValue() {
    return Temporal.Now.zonedDateTimeISO()
  }

  static create() {
    return new this();
  }
}
