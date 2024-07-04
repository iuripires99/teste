const express = require("express");
const app = express();
const bodyParser = require("body-parser");

const adminRoutes = require('./routes/adminRoute.js');
const adminBudgetRoutes = require('./routes/AdminBudgetRoute.js');
const adminDepartmentRoutes = require("./routes/adminDepartmentRoute.js");
const adminProductRoutes = require('./routes/AdminProductRoute.js');
const buyerRoutes = require('./routes/buyerRoute.js');
const managerRoutes = require('./routes/managerRoute.js');
const budgetStatusRoutes = require('./routes/budgetStatusRoute.js');
const AdminTicketRoutes = require('./routes/AdminTicketRoute.js');
const cartRoutes = require('./routes/cartRoute.js');
const billingRoutes = require('./routes/billingRoute.js');
const budgetRoutes = require('./routes/budgetRoute.js');
const CartProductRoutes = require('./routes/CartProductRoute.js');
const categoryRoutes = require('./routes/categoryRoute.js');
const licenseStatusRoutes = require('./routes/licenseStatusRoute.js');
const licenseUserRoutes = require('./routes/licenseUserRoute.js');
const licenseRoutes = require('./routes/licenseRoute.js');
const ManagerLicenseRoutes = require('./routes/ManagerLicenseRoute.js');
const messageRoutes = require('./routes/messageRoute.js');
const packageRoutes = require('./routes/packageRoute.js');
const productRoutes = require('./routes/productRoute.js');
const ticketDepartmentRoutes = require('./routes/ticketDepartmentRoute.js');
const ticketPrintRoutes = require('./routes/ticketPrintRoute.js');
const ticketRoutes = require('./routes/ticketRoute.js');
const ticketStatusRoutes = require('./routes/ticketStatusRoute.js'); 
const ManagerProductRoutes = require('./routes/ManagerProductRoute.js')



// Configurar CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
  }); 

//Configurações
app.set("port", process.env.PORT || 8080);
//Middlewares
app.use(express.json());
//Rotas
app.use('/adminDepartment', adminDepartmentRoutes) 
app.use('/admin',adminRoutes)

app.use('/adminBudget', adminBudgetRoutes)
app.use('/adminProduct', adminProductRoutes)
app.use('/buyer',buyerRoutes)
app.use('/manager',managerRoutes)
app.use('/adminTicket',AdminTicketRoutes)
app.use('/cart',cartRoutes)
app.use('/billing',billingRoutes)
app.use('/budgetStatus',budgetStatusRoutes)
app.use('/budget',budgetRoutes)
app.use('/cartProduct', CartProductRoutes)
app.use('/category',categoryRoutes)
app.use('/licenseStatus',licenseStatusRoutes)
app.use('/licenseUser',licenseUserRoutes)
app.use('/license',licenseRoutes)
app.use('/ManagerLicense',ManagerLicenseRoutes)
app.use('/message',messageRoutes)
app.use('/package',packageRoutes)
app.use('/product',productRoutes)
app.use('/ticketDepartment',ticketDepartmentRoutes)
app.use('/ticketPrint',ticketPrintRoutes)
app.use('/ticket',ticketRoutes)
app.use('/ticketStatus',ticketStatusRoutes)
app.use('/managerProduct',ManagerProductRoutes) 

app.listen(app.get("port"), () => {
  console.log("Start server on port " + app.get("port"));
});
