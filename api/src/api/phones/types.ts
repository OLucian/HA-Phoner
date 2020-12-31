interface IPhone {
  type: string;
  serial: string;
  color: string;
  metadata?: { Data: string; Signature: string };
}

export {
  IPhone,
};
