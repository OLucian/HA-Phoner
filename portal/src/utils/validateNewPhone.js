import isAlpha from 'validator/lib/isAlpha';
import isAlphanumeric from 'validator/lib/isAlphanumeric';
import blacklist from 'validator/lib/blacklist';

const validateNewPhone = (type, serial, color) => {
  let errors = {
    type: false,
    serial: false,
    color: false,
  };
  const isTypeAlphanumeric = isAlphanumeric(blacklist(type, ' -'));
  const isSerialAlphanumeric = isAlphanumeric(blacklist(serial, '-'));
  const isColorAlpha = isAlpha(blacklist(color, ' '));

  if (type.trim().length < 3 || type.length > 128 || !isTypeAlphanumeric) {
    errors.type = true;
  }
  if (serial.trim().length < 3 || serial.length > 128 || !isSerialAlphanumeric) {
    errors.serial = true;
  }
  if (color.trim().length < 3 || color.length > 128 || !isColorAlpha) {
    errors.color = true;
  }

  return errors;
};

export { validateNewPhone };
