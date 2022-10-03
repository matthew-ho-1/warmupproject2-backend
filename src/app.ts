import express from "express";
import session from "express-session";
import cors from "cors";
import MongoStore from "connect-mongo";
import mongoSanitize from "express-mongo-sanitize";
import helmet from "helmet";
import passport from "./util/passport-config";
import addUserRouter from "./routes/adduser";
import loginRouter from "./routes/login"
import logoutRouter from "./routes/logout"
import verifyRouter from "./routes/verify"
import tttRouter from "./routes/ttt"

const createApp = (mongo_uri: string, session_secret: string) => {
    const app = express();

    app.use(cors({ origin: true, credentials: true }));
    app.use(helmet());
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(mongoSanitize());
    app.use(
        session({
            cookie: {
                domain: process.env.ENV === "production" ? ".zomp.cse356.compas.cs.stonybrook.edu" : "localhost"
            },
            resave: true,
            saveUninitialized: true,
            secret: session_secret,
            store: new MongoStore({
                mongoUrl: mongo_uri,
                ttl: 14 * 24 * 60 * 60, // 14 Days
            }),
        })
    );
    app.use(passport.initialize());
    app.use(passport.session());
    app.use((req, res, next) => {
        res.locals.user = req.user;
        next();
    });

    //adduser
    app.use("/adduser", addUserRouter)
    //verify
    app.use("/verify", verifyRouter)
    //login
    app.use("/login", loginRouter)
    //logout
    app.use("/logout", logoutRouter)
    //ttt/play
    app.use('/ttt', tttRouter)
    //listgame
    //getgame
    //getscore

    // app.use("/account", accountRouter);
    // app.use("/comic", comicRouter);
    // app.use("/image", imageRouter);
    // app.use("/story", storyRouter);

    app.get("/", (req, res) => {
        res.send("Hello world!");
    });
    return app;
};

export default createApp;
