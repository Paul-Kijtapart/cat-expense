import {Button, Form, FormField, Input, Label, Message, Modal, ModalContent, ModalHeader} from "semantic-ui-react";
import {Category, Expense} from "./models/expense.js";
import {useState, useEffect} from "react";

const AppExpenseModal = ({showModal, setShowModal, expenses, setExpenses}) => {
    // form to add a new expense
    const baseExpense = {
        item: null, category: Category.Food.name, amount: null,
    };
    const [newExpense, setNewExpense] = useState(baseExpense);
    const handleFormInputChange = (name, value) => setNewExpense({...newExpense, [name]: value})
    const resetExpenseForm = () => {
        setNewExpense(baseExpense);
    };

    // form error
    const [expenseFormError, setExpenseFormError] = useState('')
    const checkFormInput = () => {
        let newError = '';
        if (!newExpense.item) {
            newError += 'Item name must be set. ';
        }
        if (!Number.isInteger(newExpense.amount)) {
            newError += 'Amount must be an integer. ';
        }
        setExpenseFormError(newError);
        return newError;
    };

    // show cat api
    useEffect(() => {
        console.log('load cat api');
    }, []);

    return (<>
            <Modal
                size="small"
                open={showModal}
                onClose={() => {
                    resetExpenseForm();
                    setShowModal(false);
                }}
                onOpen={() => setShowModal(true)}
            >
                <ModalHeader>Add a new expense</ModalHeader>
                <ModalContent>
                    <Form onSubmit={() => {
                        const newError = checkFormInput();
                        if (!newError) {
                            const expenseToAdd = new Expense(newExpense.item, newExpense.category, newExpense.amount);
                            setExpenses([...expenses, expenseToAdd]);
                            resetExpenseForm();
                            setShowModal(false);
                        }
                    }}
                          error={Boolean(expenseFormError)}
                    >
                        <FormField required={true}>
                            <label>Item</label>
                            <input placeholder='Item Name' value={newExpense.item} onChange={e => {
                                handleFormInputChange('item', e.target.value);
                                checkFormInput();
                            }}/>
                        </FormField>
                        <FormField required={true} label='Categroy' control='select' value={newExpense.category}
                                   onChange={e => {
                                       handleFormInputChange('category', e.target.value);
                                       checkFormInput();
                                   }}>
                            {Object.keys(Category).map(name => (<option key={name} value={name}>{name}</option>))}
                        </FormField>
                        <FormField required={true}>
                            <label>Amount</label>
                            <Input labelPosition='right' type='text' placeholder='Item amount'>
                                <Label basic>$</Label>
                                <input value={newExpense.amount} onChange={e => {
                                    handleFormInputChange('amount', parseInt(e.target.value));
                                    checkFormInput();
                                }}/>
                                <Label>.00</Label>
                            </Input>
                        </FormField>
                        <Message
                            error
                            header='Failed to submit a new expense'
                            content={expenseFormError}
                        />
                        <Button disabled={expenseFormError} type='submit'>Submit</Button>
                    </Form>
                </ModalContent>
            </Modal>
        </>)
};

export default AppExpenseModal;