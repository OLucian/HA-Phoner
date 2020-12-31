import { Request, Response } from 'express';
import { getPhones } from '../api/phones/getPhones';
import { getPageCount } from '../api/phones/getPageCount';
import { addNewPhone } from '../api/phones/addNewPhone';
import { updatePhones } from '../api/phones/updatePhones';
import { deletePhone } from '../api/phones/deletePhone';
import { log, expand } from '../utils/logs';
import { IPhone } from '../api/phones/types';
import { getMetadata } from '../utils/getMetadata';

const simpleValidation = (type: string, color: string, serial: string): boolean => {
  try {
    const typeIsValid = type && typeof type === 'string' && type.length > 2;
    const colorIsValid = color && typeof color === 'string' && color.length > 2;
    const serialIsValid = serial && typeof serial === 'string' && serial.length > 2;

    return typeIsValid && colorIsValid && serialIsValid;
  } catch (error) {
    log.error('Error validating phone inside controller: ', type, color, serial);
    return false;
  }
};

const getPhonesController = async (req: Request, res: Response): Promise<any> => {
  try {
    const { page: reqPage, size: reqSize } = req.query;
    let page = Number(reqPage);
    let size = Number(reqSize);
    if (typeof page !== 'number' || page < 0 || typeof size !== 'number' || size < 1) {
      page = 0;
      size = 100;
    }

    const data = await getPhones(page, size);

    res.json(data);
  } catch (error) {
    log.error('Error getting the list of phones inside controller: ', expand(req.query));
    res.sendStatus(500);
  }
};

const getPageCountController = async (req: Request, res: Response): Promise<any> => {
  try {
    const data = await getPageCount();

    res.json(data);
  } catch (error) {
    log.error('Error getting the page count of phones inside controller: ', expand(req.query));
    res.sendStatus(500);
  }
};

const addNewPhoneController = async (req: Request, res: Response): Promise<any> => {
  try {
    const {
      type,
      color,
      serial,
    } = req.body;

    log.info('ADDING: ', )

    const valid = simpleValidation(type, color, serial);
    if (!valid) {
      log.warn('AN INVALID ENTRY:', { type, serial, color })
      res.sendStatus(400);
      return;
    }

    const newPhone: any = { type, color, serial };
    const metadata = getMetadata(newPhone);
    newPhone.metadata = metadata;

    await addNewPhone(newPhone);
    res.sendStatus(200);
  } catch (error) {
    log.error('Error adding new phone inside controller: ', expand(req.params));
    res.sendStatus(500);
  }
};

const updatePhoneController = async (req: Request, res: Response): Promise<any> => {
  try {
    interface IPhoneExtended extends IPhone {
      id: string;
    }

    const updateData = req.body.editData as { [key: string]: IPhoneExtended };
    const floodUpdates = [];
    let notValid = false;
    // eslint-disable-next-line guard-for-in
    for (const id in updateData) {
      const { type, color, serial } = updateData[id];
      const data: any | IPhone = {
        type,
        serial,
        color,
      };
      const isItValid = simpleValidation(type, color, serial);
      if (!isItValid) notValid = true;
      const update = {
        ...data,
        metadata: getMetadata(data),
      };
      floodUpdates.push(updatePhones(id, update));
    }

    if (notValid) {
      res.sendStatus(400);
      return;
    }

    await Promise.all(floodUpdates);

    res.sendStatus(200);
  } catch (error) {
    log.error('Error updating phones inside controller: ', expand(req.body));
    res.sendStatus(500);
  }
};

const deletePhoneController = async (req: Request, res: Response): Promise<any> => {
  try {
    const ids: string[] = req.body.ids as unknown as string[];
    if (!ids || !Array.isArray(ids)) {
      log.error('ERROR DELETING IDs <bad array of strings> -> 400');
      res.sendStatus(400);
      return;
    }
    await deletePhone(ids);
    res.sendStatus(200);
  } catch (error) {
    log.error('Error deleting phones inside controller: ', expand(req.body));
    res.sendStatus(500);
  }
};

export {
  getPhonesController,
  getPageCountController,
  addNewPhoneController,
  updatePhoneController,
  deletePhoneController,
};
