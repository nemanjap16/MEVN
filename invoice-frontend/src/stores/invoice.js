import { defineStore } from "pinia";

export const useInvoiceStore = defineStore("invoice", {
  state: () => ({
    invoices: [],
    filteredInvoices: [],
    paidInvoices: [],
    pendingInvoices: [],
    draftInvoices: [],
    currentInvoice: {},
    editMode: false,
    formOpen: false,
    modalOpen: false,
    filterOpen: false,
    isLoading: false,
  }),
  getters: {},
  actions: {
    async getInvoices() {
      this.isLoading = true;
      const res = await fetch("http://localhost:5000/api/invoices");
      const data = await res.json();
      this.invoices = data;
      this.isLoading = false;
      this.filteredInvoices = this.invoices;
      this.isLoading = false;
    },
    async getInvoice(id) {
      try {
        this.isLoading = true;
        const res = await fetch(`http://localhost:5000/api/invoices/${id}`);
        const invoice = await res.json();
        this.currentInvoice = invoice;
        this.isLoading = false;
        console.log(invoice);
      } catch (error) {
        console.log(error);
      }
    },
    setEditModeTrue() {
      this.editMode = true;
    },
    setEditModeFalse() {
      this.editMode = false;
      this.currentInvoice = {
        id: "",
        createdAt: "",
        paymentDue: "",
        description: "",
        paymentTerms: 1,
        clientName: "",
        clientEmail: "",
        status: "",
        senderAddress: {
          street: "",
          city: "",
          postCode: "",
          country: "",
        },
        clientAddress: {
          street: "",
          city: "",
          postCode: "",
          country: "",
        },
        items: [
          {
            name: "",
            quantity: 1,
            price: 1,
            total: 1,
          },
        ],
        total: 1,
      };
    },
    toggleForm() {
      this.formOpen = !this.formOpen;
    },
    toggleFilter() {
      this.filterOpen = !this.filterOpen;
    },
    toggleModal() {
      this.modalOpen = !this.modalOpen;
    },
    // set filter
    setFilter(checkedCheckboxes) {
      let state = this.invoices.filter((invoice) =>
        checkedCheckboxes.includes(invoice.status)
      );
      this.filteredInvoices = [...state];
    },
    // set initial state
    setFilteredInvoices() {
      this.filteredInvoices = this.invoices;
    },
    setPaidInvoices(paid) {
      this.paidInvoices = paid;
    },
    setPendingInvoices(pending) {
      this.pendingInvoices = pending;
    },
    setDraftInvoices(draft) {
      this.draftInvoices = draft;
    },
    async deleteInvoice(id) {
      this.filteredInvoices = this.filteredInvoices.filter(
        (invoice) => invoice._id !== id
      );
      this.invoices = this.filteredInvoices;
      try {
        this.isLoading = true;
        const res = await fetch(`http://localhost:5000/api/invoices/${id}`, {
          method: "DELETE",
        });

        console.log(res);
        this.getInvoices();
        this.isLoading = false;
      } catch (error) {
        console.log(error);
      }
    },
    async markAsPaid(id) {
      const invoice = this.filteredInvoices.find((el) => el._id === id);
      invoice.status = "paid";
      this.currentInvoice.status = "paid";

      try {
        const res = await fetch(
          `http://localhost:5000/api/invoices/mark/${id}`,
          {
            method: "PATCH",
            body: JSON.stringify({ status: "paid" }),
            headers: { "Content-Type": "application/json" },
          }
        );
        console.log(res);
      } catch (error) {
        console.log(error);
      }
    },
    async editInvoice(invoice, id) {
      console.log(invoice, id);
      try {
        const res = await fetch(`http://localhost:5000/api/invoices/${id}`, {
          method: "PUT",
          body: JSON.stringify(invoice),
          headers: { "Content-Type": "application/json" },
        });
        this.getInvoice(id);
        console.log(res);
      } catch (error) {
        console.log(error);
      }
    },
    async addNewInvoice(invoice) {
      try {
        const res = await fetch(`http://localhost:5000/api/invoices`, {
          method: "POST",
          body: JSON.stringify(invoice),
          headers: { "Content-Type": "application/json" },
        });
        this.getInvoices();
        console.log(res);
      } catch (error) {
        console.log(error);
      }
    },
  },
  persist: true,
});
