/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import chai from 'chai';
import { log } from '../src/utils/logs';
import { getPhones } from '../src/api/phones/getPhones';
import { addNewPhone } from '../src/api/phones/addNewPhone';
import { updatePhones } from '../src/api/phones/updatePhones';
import { deletePhone } from '../src/api/phones/deletePhone';
import { phoneSeeder } from '../src/utils/phoneSeeder';
import { IPhone } from '../src/api/phones/types';

chai.should();

describe('TPS API', () => {
  it('should get all phones', async () => {
    const data = await getPhones(0, 10);
    log.info('JOB DONE', data);
  });

  it('should add a new phone', async () => {
    const [newPhone] = phoneSeeder(1);
    newPhone.type = 'Samsung Galaxy';
    await addNewPhone(newPhone);
    log.info('JOB DONE');
  });

  it('should update a phone by id', async () => {
    const id = '679f877e-5b1a-4146-ad1b-054bc8b9c4b6';
    const update = {
      type: 'Samsung Galaxy II',
      serial: 'cnNtKfvxn5w4oC63D5tW15',
      color: 'red',
    };
    await updatePhones(id, update);
    log.info('JOB DONE');
  });

  it('delete a phone by id', async () => {
    const ids = ['679f877e-5b1a-4146-ad1b-054bc8b9c4b6'];
    await deletePhone(ids);
    log.info('JOB DONE');
  });
});
