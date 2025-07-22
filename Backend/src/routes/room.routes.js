import { Router } from "express";

const router = Router();

router.route("/create-room").post();

router.route("/join-room").post();

router.route("/exit-room").post();

router.route("/room/:id/edit").post();

router.route("/room/:id/settings").post();

router.route("/room/:id/discussion-forum").post();
