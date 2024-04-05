import Hello from "./Hello.js";
import Lab5 from "./Lab5.js";
import express from "express"
import CourseRoutes from "./Kanbas/Courses/routes.js"
import cors from "cors";
import ModuleRoutes from "./Kanbas/Modules/routes.js";


const app = express();
app.use(cors());
app.use(express.json());
ModuleRoutes(app);
CourseRoutes(app);
Lab5(app);
Hello(app);
app.listen(process.env.PORT || 4000);
// app.listen(4000);