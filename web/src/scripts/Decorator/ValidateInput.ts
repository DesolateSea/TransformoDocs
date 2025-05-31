import { IValidCheck } from "../../scripts/validator/IValidCheck";
export function ValidateInput(paramIndex = 0): MethodDecorator {
  return function (
    target: Object,
    _propertyKey: string | symbol,
    descriptor: PropertyDescriptor
  ) {
    const originalMethod = descriptor.value;

    descriptor.value = function (this: IValidCheck, ...args: any[]) {
      // Defensive check: make sure 'validate' exists on `this`
      if (typeof this.validate !== "function") {
        throw new Error(
          `No 'validate' method found on ${target.constructor.name}`
        );
      }

      const input = args[paramIndex];
      const validation = this.validate(input);

      if (!validation || !validation.valid) {
        throw new Error(validation?.error ?? "Validation failed.");
      }

      return originalMethod.apply(this, args);
    };

    return descriptor;
  };
}
