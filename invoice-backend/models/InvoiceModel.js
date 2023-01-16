const mongoose = require("mongoose");

// invoice schema
const invoiceSchema = new mongoose.Schema(
  {
    //   user: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "User",
    //     required: true,
    //   },
    id: {
      type: String,
      required: true,
    },
    createdAt: {
      type: String,
      required: true,
    },
    paymentDue: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
    paymentTerms: {
      type: String,
      required: true,
    },
    clientName: {
      type: String,
      required: true,
    },
    clientEmail: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    senderAddress: {
      street: {
        type: String,
        required: true,
      },
      city: {
        type: String,
        required: true,
      },
      postCode: {
        type: String,
        required: true,
      },
      country: {
        type: String,
        required: true,
      },
    },
    clientAddress: {
      street: {
        type: String,
        required: true,
      },
      city: {
        type: String,
        required: true,
      },
      postCode: {
        type: String,
        required: true,
      },
      country: {
        type: String,
        required: true,
      },
    },
    items: [
      {
        name: {
          type: String,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
        total: {
          type: Number,
        },
      },
    ],
    total: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Invoice", invoiceSchema);
