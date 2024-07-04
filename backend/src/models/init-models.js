var AdminBudget = require("../models/AdminBudget");
var Department = require("../models/adminDepartments");
var AdminProduct = require("../models/AdminProduct");
var AdminTicket = require("../models/AdminTicket");
var CartProduct = require("../models/CartProduct");
var ManagerLicense = require("../models/ManagerLicense");
var Admin = require("../models/admins");
var Buyer = require("../models/buyer");
var Cart = require("../models/cart");
var Bill = require("../models/bills");
var BudgetStatus = require("../models/budgetStatus");
var Budget = require("../models/budget");
var Category = require("../models/categories");
var LicenseStatus = require("../models/licenseStatus");
var LicenseUser = require("../models/licenseUser");
var License = require("../models/licenses");
var Manager = require("../models/manager");
var Package = require("../models/package");
var Product = require("../models/products");
var TicketDepartment = require("../models/ticketDepartment");
var TicketStatus = require("../models/ticketStatus");
var Ticket = require("../models/tickets");
var BudgetProduct = require("../models/budgetProduct");
var ManagerProduct = require("../models/ManagerProducts");

(async () => {

  try {
    await Department.sync({ alter: true });
    await BudgetStatus.sync({ alter: true });
    await LicenseStatus.sync({ alter: true });
    await LicenseUser.sync({ alter: true });
    await TicketDepartment.sync({ alter: true });
    await TicketStatus.sync({ alter: true });
    await Package.sync({ alter: true });
    await Buyer.sync({ alter: true });
    await Manager.sync({ alter: true });
    await Product.sync({ alter: true });
    await Category.sync({ alter: true });
    await Admin.sync({ alter: true });
    await Cart.sync({ alter: true });
    await Bill.sync({ alter: true });
    await Budget.sync({ alter: true });
    await License.sync({ alter: true });
    await Ticket.sync({ alter: true });
    await AdminBudget.sync({ alter: true });
    await AdminProduct.sync({ alter: true });
    await AdminTicket.sync({ alter: true });
    await CartProduct.sync({ alter: true });
    await ManagerLicense.sync({ alter: true });
    await BudgetProduct.sync({ alter: true});
    await ManagerProduct.sync({ alter: true});
    

    console.log("All models were synchronized successfully.");
  } catch (error) {
    console.error("An error occurred while syncing models:", error);
  }
})();
