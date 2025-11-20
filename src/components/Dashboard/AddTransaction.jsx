import { Formik, Form, Field, ErrorMessage } from "formik";
import { useTransactions } from "../../hooks/useTransactions";
import { TransactionContext } from "../../store/transaction-context";
import { useContext } from "react";

function AddTransaction() {
  const { addTransaction } = useContext(TransactionContext);

  return (
    <div className="add-transaction-section">
      <h4>Add Transaction</h4>
      <Formik
        className="add-transaction-form"
        initialValues={{ description: "", amount: "" }}
        validate={(values) => {
          const errors = {};
          if (!values.description) {
            errors.description = "Required";
          }

          if (!values.amount) {
            errors.amount = "Required";
          }
          return errors;
        }}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          setTimeout(() => {
            const newTransaction = {
              description: values.description,
              amount: Number(values.amount),
              date: new Date(),
            };
            addTransaction(newTransaction);
            setSubmitting(false);
            resetForm();
          }, 400);
        }}
      >
        {({ isSubmitting }) => (
          <Form className="add-transaction-form">
            <label className="add-transaction-form-label" htmlFor="description">
              Description
            </label>
            <Field
              className="add-transaction-form-input"
              type="text"
              name="description"
              placeholder="Enter description..."
            />
            <label className="add-transaction-form-label" htmlFor="amount">
              Amount
            </label>
            <Field
              className="add-transaction-form-input"
              type="number"
              name="amount"
              placeholder="Enter amount..."
            />
            <legend>Use (-) for expenses</legend>
            <button
              className="add-transaction-submit-button"
              type="submit"
              disabled={isSubmitting}
            >
              Add Transaction
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default AddTransaction;
