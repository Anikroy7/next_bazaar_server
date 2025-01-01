import express from "express";
import auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";
import { NewsLetterControllers } from "./newLetter.controller";

const router = express.Router();

router.get('/', NewsLetterControllers.getAllLetters)
router.post('/', NewsLetterControllers.createLetter)
router.post('/sendEmail/:email', auth(UserRole.ADMIN), NewsLetterControllers.sendEmailToSubscriber)
router.delete('/:letterId', auth(UserRole.ADMIN), NewsLetterControllers.deleteLetter)

export const LetterRoutes = router;
