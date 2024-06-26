import { Router, Request, Response } from "express";
import logger from "../lib/logger";
import FermentedController from "./controllers/fermented.controller";
import userController from "./controllers/user.controller";
import Authenticate from "./middlewares/authentication.middleware";
import FileController from "./controllers/file.controller";

const routes = Router();
const fermentedctrl = new FermentedController();
const userctrl = new userController();
const authentication = new Authenticate;
const filectrl = new FileController();

routes.post("/createProduct", async (req: Request, res: Response) =>{
    const { producto } = req.body;
    try {
        console.log(producto)
        const response = await fermentedctrl.createProduct(producto);
        return res.status(response.code).json(response);
    } catch (err: any) {
        return res.status(err.code ? err.code : 500).json(err);
    }
});

routes.get('/find_Products/:per_page/:page', async(req: Request, res: Response) => {
    const { per_page }: any = req.params
    const { page }: any = req.params
    try {
        const response = await fermentedctrl.findProducts(Number(per_page), Number(page))
        return res.status( response.code ).json( response )
    } catch(err: any) {
        return res.status(err.code ? err.code : 500).json(err)
    }
})

routes.get("/get_product_by_id/:id", async (req:  Request, res: Response) =>{
    const id = req.params.id;
    try {
        const response = await fermentedctrl.getProductbyid(id)
        return res.status(response.code).json(response);
    } catch (err : any) {
        return res.status(err.code ? err.code : 500).json(err);
    }
});

routes.put("/updateProduct/:id", async (req: Request, res: Response) =>{
    const product = req.body;
    const id = req.params.id;
    try {
        const response = await fermentedctrl.updateProduct(product, id);
        return res.status(response.code).json(response);
    } catch (err: any) {
        return res.status(err.code ? err.code : 500).json(err);
    }
});

routes.delete("/deleteProduct/:id", async (req: Request, res: Response) =>{
    const id = req.params.id;
    try {
        const response = await fermentedctrl.deleteProduct(id);
        return res.status(response.code).json(response);
    } catch (err : any) {
        return res.status(err.code ? err.code : 500).json(err); 
    }
})
//ruta para carga masiva
routes.post("/massive-load", async (req: Request, res: Response ) => {
    try {
        const fileCSV = req.files
        const response = await filectrl.massiveLoad(fileCSV)
        return res.status(response.code).json(response)
    } catch (err: any) {
        return res.status(err.code ? err.code: 500).json(err)   
    }
})
//rutas para CRUD de usuarios
routes.post("/createUser", async (req: Request, res: Response ) => {
    try {
        const { user } = req.body
        const response = await userctrl.createUser(user)
        return res.status(response.code).json(response)
    } catch (err: any) {
        return res.status(err.code ? err.code: 500).json(err)   
    }
})

routes.get('/find_Users/:per_page/:page', async(req: Request, res: Response) => {
    const { per_page }: any = req.params
    const { page }: any = req.params
    try {
        const response = await userctrl.findAllUsers(Number(per_page), Number(page))
        return res.status( response.code ).json( response )
    } catch(err: any) {
        return res.status(err.code ? err.code : 500).json(err)
    }
})

routes.get("/get_user_by_email/:email", async (req:  Request, res: Response) =>{
    const email = req.params.email;
    try {
        const response = await userctrl.getUserByEmail(email)
        return res.status(response.code).json(response);
    } catch (err : any) {
        return res.status(err.code ? err.code : 500).json(err);
    }
});

routes.put("/updateUser", async (req: Request, res: Response) =>{
    const user = req.body.user;
    try {
        const response = await userctrl.updateUser(user);
        return res.status(response.code).json(response);
    } catch (err: any) {
        return res.status(err.code ? err.code : 500).json(err);
    }
});

routes.delete("/deleteUser/:email", async (req: Request, res: Response) =>{
    const email = req.params.email;
    try {
        const response = await userctrl.deleteUser(email);
        return res.status(response.code).json(response);
    } catch (err : any) {
        return res.status(err.code ? err.code : 500).json(err); 
    }
})

routes.post("/login", async (req: Request, res: Response ) => {
    try {
        const user = req.body
        const response = await userctrl.login(user)
        return res.status(response.code).json(response)
    } catch (err: any) {
        return res.status(err.code ? err.code: 500).json(err)   
    }
})

routes.get("/hola", authentication.authentication, async(req: Request, res: Response) => {
    try {
        return res.status(200).json({message: "hola onichan"})
    } catch (err: any) {
        return res.status(err.code ? err.code: 500).json(err)   
    }
})

export default routes;
