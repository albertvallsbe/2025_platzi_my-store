import passport from "passport";
import { LocalStrategy } from "./strategies/localStrategy.js";
import { JwtStrategy } from "./strategies/jwtStrategy.js";

passport.use(LocalStrategy);
passport.use(JwtStrategy);
