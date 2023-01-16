const router = require("express").Router();
const {
  getInvoices,
  getInvoiceByID,
  markAsPaid,
  postInvoice,
  putInvoice,
  deleteInvoice,
} = require("../controllers/invoiceControllers");

// GET all invoices
router.get("/", getInvoices);

// GET one invoice
router.get("/:id", getInvoiceByID);

// POST one invoice
router.post("/", postInvoice);

// PUT one invoice
router.put("/:id", putInvoice);

// PATCH mark as paid
router.patch("/mark/:id", markAsPaid);

// DELETE one invoice
router.delete("/:id", deleteInvoice);

// GET all invoices by user

module.exports = router;
