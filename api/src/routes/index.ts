import express from 'express';
import {
    getPhonesController,
    addNewPhoneController,
    updatePhoneController,
    deletePhoneController,
    getPageCountController,
} from '../controllers/phones.controller';

const router = express.Router();

router.route('/phones/').get(getPhonesController);
router.route('/phones/pagination').get(getPageCountController);
router.route('/phones/add').post(addNewPhoneController);
router.route('/phones/update').post(updatePhoneController);
router.route('/phones/delete').post(deletePhoneController);

export { router as routes };
